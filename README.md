# Envol Voyage

Landing page de l'infolettre **Envol Voyage** — aubaines de vols au départ du Québec, livrées par courriel. Nos systèmes surveillent les prix aériens en continu et alertent les abonnés dès qu'une vraie aubaine apparaît. L'abonné réserve lui-même, directement chez la compagnie aérienne.

> **Envol Voyage n'est pas une agence de voyage.** Aucun billet n'est vendu. Service 100 % gratuit.

## Stack

**Site statique** — zéro build :
- `index.html` à la racine (sert d'accueil)
- `assets/` — images (logo + photos de destinations)
- Tailwind CSS + polices (Poppins/Inter) via CDN
- Déployé sur **Vercel** (config dans `vercel.json` : `framework: null`, aucun build, racine servie telle quelle)

## Développement local

Aucune dépendance à installer. Pour prévisualiser :

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

ou ouvrez simplement `index.html` dans un navigateur.

## Formulaire d'inscription

Le formulaire est en **mode prototype** (`SIMULATE = true` dans le `<script>` en bas de `index.html`) : il simule un succès sans appel réseau.

**Pour le brancher en production :**
1. Mettre en place un endpoint `POST /api/newsletter-subscribe` (fonction serverless — voir l'historique git, commit `8780814`, pour une implémentation Next.js de référence ; à porter en fonction Vercel autonome pour rester sans build).
2. Passer `SIMULATE = false`.
3. L'endpoint ajoute le contact au groupe MailerLite « Envol Voyage – Newsletter » (clé API **côté serveur uniquement**).

## À compléter avant lancement public

- **Adresse postale réelle** dans le footer (placeholder actuel : `1234, rue de la Montagne…`) — exigence LCAP/CASL.
- **Liens légaux** (`href="#"`) : politique de confidentialité, conditions, contact.
- **Tailwind compilé** (le CDN n'est pas recommandé en prod).

## Identité visuelle

Crème `#F7F4EE` · Navy `#1A2942` · Teal `#76A5AF` · Cyan grisé `#A3C1C7` · Carmin `#BA1B2B`. Typo : Poppins (titres) + Inter (corps).

## Historique

Le dossier [`docs-modifications/`](./docs-modifications/) journalise l'évolution du projet (recadrage initial, puis remplacement par ce site statique) et comment revenir en arrière.
