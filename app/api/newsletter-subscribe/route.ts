import { NextResponse } from "next/server";

// Validation courriel basique côté serveur (la validation fine est faite par MailerLite).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAILERLITE_ENDPOINT = "https://connect.mailerlite.com/api/subscribers";

export async function POST(request: Request) {
  let email: string | undefined;
  let consent: boolean | undefined;

  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim() : undefined;
    consent = body.consent === true;

    // RFC 5321 : une adresse courriel ne dépasse pas 254 caractères.
    // Garde-fou contre les payloads abusifs et le backtracking de la regex.
    if (email && email.length > 254) {
      email = undefined;
    }
  } catch {
    return NextResponse.json(
      { error: "Requête invalide." },
      { status: 400 }
    );
  }

  // CASL : le consentement exprès est obligatoire (case non précochée côté client).
  if (!consent) {
    return NextResponse.json(
      { error: "Vous devez accepter de recevoir nos courriels." },
      { status: 400 }
    );
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Adresse courriel invalide." },
      { status: 400 }
    );
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  // Clé absente = projet pas encore branché à MailerLite (Phase 1 non faite).
  if (!apiKey) {
    console.error(
      "[newsletter-subscribe] MAILERLITE_API_KEY manquante — voir .env.example"
    );
    return NextResponse.json(
      { error: "Le service d'inscription n'est pas encore configuré." },
      { status: 500 }
    );
  }

  try {
    const mlResponse = await fetch(MAILERLITE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        // Force le double opt-in côté API (indépendant du réglage du compte) :
        // MailerLite envoie alors le courriel de confirmation, requis par CASL.
        status: "unconfirmed",
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    });

    // 200/201 = créé, 422 = déjà existant ou validation MailerLite.
    if (mlResponse.ok || mlResponse.status === 422) {
      return NextResponse.json(
        {
          message:
            "Presque terminé ! Vérifiez votre boîte courriel pour confirmer votre inscription.",
        },
        { status: 200 }
      );
    }

    // 401 = clé erronée : ne pas fuiter la cause au client.
    console.error(
      `[newsletter-subscribe] MailerLite a répondu ${mlResponse.status}`
    );
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez dans un instant." },
      { status: 502 }
    );
  } catch (err) {
    console.error("[newsletter-subscribe] Erreur réseau MailerLite :", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez dans un instant." },
      { status: 502 }
    );
  }
}
