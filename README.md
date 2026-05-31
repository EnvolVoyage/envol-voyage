# Envol Voyage

Landing page de l'infolettre **Envol Voyage** — aubaines de vols au départ du Québec, livrées par courriel. Nos algorithmes surveillent les prix aériens en continu et alertent les abonnés dès qu'une vraie aubaine apparaît. L'abonné réserve lui-même, directement chez la compagnie aérienne.

> **Envol Voyage n'est pas une agence de voyage.** Aucun billet n'est vendu. Service 100 % gratuit, financé par affiliation.

## Stack

- **Next.js 16** (App Router) + React 19
- **Tailwind CSS v4** (tokens de marque définis dans `app/globals.css`)
- **MailerLite** comme source de vérité des abonnés (email-only + double opt-in)

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis remplir les clés MailerLite
npm run dev                  # http://localhost:3000
```

Sans clé MailerLite, la page s'affiche normalement mais le formulaire renvoie une erreur explicite (« service non configuré ») — c'est attendu.

## Variables d'environnement

Voir `.env.example`. La clé `MAILERLITE_API_KEY` est lue **côté serveur uniquement** (dans `app/api/newsletter-subscribe/route.ts`) — jamais exposée au navigateur. Ne jamais committer de vraie clé (`.env.local` est dans `.gitignore`).

## Identité visuelle

| Rôle | Couleur |
|---|---|
| Fond | Crème `#F7F4EE` |
| Texte / titres | Navy `#1A2942` |
| Accents | Teal `#76A5AF` |
| Fonds de cartes / séparateurs | Cyan grisé `#A3C1C7` |
| CTA / alertes | Carmin `#BA1B2B` |

Typo : **Poppins** (titres) + **Inter** (corps).

## Historique des modifications de recadrage

Le dossier [`docs-modifications/`](./docs-modifications/) journalise tous les changements apportés pour aligner le projet sur le cadrage produit (et comment les annuler au besoin).
