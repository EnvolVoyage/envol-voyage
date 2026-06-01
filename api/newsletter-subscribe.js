// ============================================================================
//  POST /api/newsletter-subscribe
//  Fonction serverless Vercel (runtime Node). Ajoute un abonne a MailerLite.
//
//  Securite :
//  - Cle API MailerLite 100 % cote serveur (variable d'env Vercel).
//  - Rate limiting en memoire (5 req/min par IP).
//  - Verification Turnstile (si TURNSTILE_SECRET_KEY est configuree).
//  - Verification d'origine (CORS + header Origin).
//  - Anti-spam : honeypot "website".
//  - Consentement CASL obligatoire cote serveur.
//  - Validation email stricte avec limite de longueur.
//
//  Variables d'environnement attendues (Vercel > Settings > Environment Variables) :
//    MAILERLITE_API_KEY      (requis)    — jeton API MailerLite
//    MAILERLITE_GROUP_ID     (optionnel) — ID du groupe
//    TURNSTILE_SECRET_KEY    (optionnel) — cle secrete Cloudflare Turnstile
//    ALLOWED_ORIGIN          (optionnel) — origine autorisee (defaut: https://envolvoyage.com)
// ============================================================================

const ML_API = 'https://connect.mailerlite.com/api';
const GROUP_NAME = 'Envol Voyage \u2013 Newsletter';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LEN = 254; // RFC 5321

// --- Rate limiting en memoire (par instance serverless) ---------------------
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;               // 5 requetes par fenetre
const ipRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = ipRequests.get(ip);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipRequests.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  record.count += 1;
  if (record.count > RATE_LIMIT_MAX) return true;
  return false;
}

// Nettoyage periodique pour eviter les fuites memoire
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequests) {
    if (now - record.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      ipRequests.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS * 2);

// --- Verification Turnstile ------------------------------------------------
async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile non configure, on laisse passer

  if (!token) return false;

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  });

  if (!res.ok) return false;
  const data = await res.json();
  return data.success === true;
}

// --- Handler principal -----------------------------------------------------
export default async function handler(req, res) {
  // Methode
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Methode non autorisee.' });
  }

  // Verification d'origine
  const allowedOrigin = process.env.ALLOWED_ORIGIN || 'https://envolvoyage.com';
  const origin = req.headers['origin'];
  if (origin && origin !== allowedOrigin) {
    return res.status(403).json({ ok: false, error: 'Origine non autorisee.' });
  }

  // Rate limiting
  const clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ ok: false, error: 'Trop de requetes. Reessayez dans une minute.' });
  }

  // Cle API
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error('MAILERLITE_API_KEY manquante.');
    return res.status(500).json({ ok: false, error: 'Configuration serveur incomplete.' });
  }

  // Body
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot : si rempli, c'est un bot -> on simule un succes sans rien faire.
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  // Validation email (stricte + limite de longueur)
  const email = String(body.email || '').trim().toLowerCase();
  if (email.length > MAX_EMAIL_LEN || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Adresse courriel invalide.' });
  }

  // Consentement CASL obligatoire
  const consent = body.consent_marketing;
  const consentGiven = consent === true || consent === 'on' || consent === 'true' || consent === '1';
  if (!consentGiven) {
    return res.status(400).json({ ok: false, error: 'Le consentement est requis.' });
  }

  // Verification Turnstile (si configuree)
  const turnstileToken = body['cf-turnstile-response'] || '';
  const turnstileOk = await verifyTurnstile(turnstileToken, clientIp);
  if (!turnstileOk) {
    return res.status(403).json({ ok: false, error: 'Verification anti-bot echouee.' });
  }

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  try {
    // 1. Determiner le groupe (ID via env, sinon resolution par nom).
    let groupId = process.env.MAILERLITE_GROUP_ID || null;
    if (!groupId) {
      const gRes = await fetch(
        `${ML_API}/groups?filter[name]=${encodeURIComponent(GROUP_NAME)}&limit=50`,
        { headers }
      );
      if (gRes.ok) {
        const gData = await gRes.json();
        const match = (gData.data || []).find((g) => g.name === GROUP_NAME);
        groupId = match ? match.id : null;
      } else {
        console.error('Echec resolution du groupe MailerLite:', gRes.status, await gRes.text());
      }
    }

    // 2. Creer/mettre a jour l'abonne (upsert : pas de doublon).
    const payload = { email, status: 'active' };
    if (groupId) payload.groups = [String(groupId)];

    const sRes = await fetch(`${ML_API}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (sRes.ok || sRes.status === 422) {
      return res.status(200).json({ ok: true });
    }

    const errText = await sRes.text();
    console.error('Erreur MailerLite subscribers:', sRes.status, errText);
    return res.status(502).json({ ok: false, error: 'Service momentanement indisponible.' });
  } catch (err) {
    console.error('Exception newsletter-subscribe:', err);
    return res.status(500).json({ ok: false, error: 'Erreur serveur. Reessayez dans un instant.' });
  }
}
