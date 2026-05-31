// ============================================================================
//  POST /api/newsletter-subscribe
//  Fonction serverless Vercel (runtime Node). Ajoute un abonné à MailerLite.
//
//  - La clé API MailerLite reste 100 % côté serveur (variable d'env Vercel),
//    jamais exposée au navigateur.
//  - Simple opt-in (status: "active") — décision verrouillée (JOURNAL §8).
//    Pour repasser en double opt-in plus tard : status "unconfirmed" + activer
//    le double opt-in dans le compte MailerLite.
//  - Anti-spam : honeypot "website" (champ caché rempli = bot → faux succès).
//  - Consentement (case CASL) obligatoire côté serveur aussi.
//
//  Variables d'environnement attendues (Vercel → Settings → Environment Variables) :
//    MAILERLITE_API_KEY   (requis)  — jeton API MailerLite
//    MAILERLITE_GROUP_ID  (optionnel) — ID du groupe. Si absent, on le résout
//                                       par son nom (ci-dessous) au runtime.
// ============================================================================

const ML_API = 'https://connect.mailerlite.com/api';
const GROUP_NAME = 'Envol Voyage – Newsletter';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Méthode non autorisée.' });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error('MAILERLITE_API_KEY manquante.');
    return res.status(500).json({ ok: false, error: 'Configuration serveur incomplète.' });
  }

  // Body : Vercel parse le JSON automatiquement, mais on sécurise le cas string.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot : si rempli, c'est un bot → on simule un succès sans rien faire.
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  const email = String(body.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Adresse courriel invalide.' });
  }

  // Consentement CASL obligatoire (la case doit être cochée).
  const consent = body.consent_marketing;
  const consentGiven = consent === true || consent === 'on' || consent === 'true' || consent === '1';
  if (!consentGiven) {
    return res.status(400).json({ ok: false, error: 'Le consentement est requis.' });
  }

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  try {
    // 1. Déterminer le groupe (ID via env, sinon résolution par nom).
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
        console.error('Échec résolution du groupe MailerLite:', gRes.status, await gRes.text());
      }
    }

    // 2. Créer/mettre à jour l'abonné (upsert : pas de doublon).
    const payload = {
      email,
      status: 'active', // simple opt-in
    };
    if (groupId) payload.groups = [String(groupId)];

    const sRes = await fetch(`${ML_API}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (sRes.ok) {
      return res.status(200).json({ ok: true });
    }

    // MailerLite renvoie 422 si l'abonné existe déjà dans certains cas — on le
    // traite comme un succès idempotent (l'inscription est de toute façon faite).
    if (sRes.status === 422) {
      return res.status(200).json({ ok: true });
    }

    const errText = await sRes.text();
    console.error('Erreur MailerLite subscribers:', sRes.status, errText);
    return res.status(502).json({ ok: false, error: 'Service d’inscription momentanément indisponible.' });
  } catch (err) {
    console.error('Exception newsletter-subscribe:', err);
    return res.status(500).json({ ok: false, error: 'Erreur serveur. Réessayez dans un instant.' });
  }
}
