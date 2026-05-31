# Journal des modifications de recadrage

> Date : 2026-05-31. Auteur : recadrage assisté, sur la base du cadrage produit d'Edouard.
> Chaque ligne = un fichier touché, la raison (décision de cadrage), et comment annuler.

---

## 1. Formulaire d'inscription — de « compte + mot de passe + ville » à « courriel seulement »

- **Fichier** : `app/components/SignupForm.tsx` (réécrit)
- **Avant** : 3 champs (courriel, mot de passe, ville de départ) + appel `supabase.auth.signUp()`.
- **Après** : 1 champ courriel + case de consentement (non précochée) ; POST vers `/api/newsletter-subscribe`.
- **Pourquoi** : décision verrouillée « **email seulement** = conversion max » ; le mot de passe transforme une infolettre en app à comptes (friction + données sensibles inutiles). CASL exige une case de consentement non précochée.
- **Revenir en arrière** : restaurer la version Supabase depuis `AVANT-APRES.md` §1, et réintégrer `lib/supabase.ts` (§4) + les deps (§5).

## 2. Backend — de Supabase à MailerLite

- **Fichiers** : `app/api/newsletter-subscribe/route.ts` (créé), `lib/supabase.ts` (supprimé)
- **Avant** : inscription via Supabase Auth (base maison + comptes).
- **Après** : Route Handler serveur qui ajoute l'abonné à un groupe MailerLite (clé API côté serveur, double opt-in géré par MailerLite).
- **Pourquoi** : décision verrouillée « **MailerLite = source de vérité + double opt-in** » ; Supabase explicitement exclu du cadrage (« sur-ingénierie au stade MVP », ne gère ni consentement ni délivrabilité).
- **Revenir en arrière** : supprimer la route, recréer `lib/supabase.ts` (voir `AVANT-APRES.md` §4), réinstaller les deps.

## 3. Dépendances — retrait de Supabase

- **Fichier** : `package.json`
- **Avant** : `@supabase/ssr`, `@supabase/supabase-js`.
- **Après** : retirées.
- **Pourquoi** : plus utilisées après le passage à MailerLite.
- **Revenir en arrière** : `npm install @supabase/ssr@^0.10.3 @supabase/supabase-js@^2.106.2`.

## 4. Identité visuelle — du thème dark générique aux tokens de marque

- **Fichiers** : `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/confidentialite/page.tsx`, `app/conditions/page.tsx`
- **Avant** : fond noir, accents `cyan-400/500`, police Inter seule (variable mal nommée `--font-geist-sans`).
- **Après** : fond crème `#F7F4EE`, navy `#1A2942`, teal `#76A5AF`, cyan grisé `#A3C1C7`, carmin `#BA1B2B` (CTA) ; Poppins (titres) + Inter (corps).
- **Pourquoi** : direction « tech-éditorial chaud » verrouillée ; le thème dark était exactement le « slate froid » écarté.
- **Revenir en arrière** : restaurer `globals.css` et les classes Tailwind d'origine depuis `AVANT-APRES.md` §2.

## 5. Copy — voix institutionnelle + honnêteté légale

- **Fichier** : `app/page.tsx`, `app/layout.tsx`
- **Changements** :
  - « notre agent IA » / « propulsées par IA » → « **nos algorithmes** » (voix institutionnelle, pas de hype IA prématurée).
  - **Suppression** de la stat inventée « économisent en moyenne 40 à 70 % » (risque de publicité trompeuse + contredit le flag d'honnêteté).
  - Hero : « 100 % gratuit, 0 frais caché » (sans jurer « gratuit à vie »).
  - « Comment ça marche » : étapes réécrites pour le flux email-only (plus de « compte/mot de passe » ni « indiquez votre ville »).
- **Pourquoi** : voix de marque institutionnelle décidée ; flags d'honnêteté du cadrage (OVERVIEW §9).
- **Revenir en arrière** : voir les formulations d'origine dans `AVANT-APRES.md` §3.

## 6. Conformité — ajout Loi 25 / CASL

- **Fichiers** : `app/page.tsx` (footer), `app/confidentialite/page.tsx` (créé), `app/conditions/page.tsx` (créé)
- **Ajouts** : footer légal avec « pas une agence de voyage », adresse postale + responsable des RP (placeholders `[À COMPLÉTER]`), liens vers les deux pages légales ; ébauches de politique de confidentialité et de conditions d'utilisation.
- **Pourquoi** : exigences Loi 25 (Québec) + CASL (Canada) ; positionnement « pas une agence » pour éviter le permis OPC.
- **À FAIRE (Edouard)** : remplacer les `[À COMPLÉTER]` (adresse, nom du RP, courriel de contact) et faire valider juridiquement avant lancement.
- **Revenir en arrière** : supprimer les deux pages et le bloc footer légal.

## 7. README racine + .env.example

- **Fichiers** : `README.md` (réécrit), `.env.example` (créé)
- **Pourquoi** : le README était le boilerplate `create-next-app` ; documentation du setup MailerLite et de l'identité.

## 8. Opt-in — démarrage en simple opt-in (double = ajout futur)

- **Fichiers** : `app/api/newsletter-subscribe/route.ts`, `app/confidentialite/page.tsx`
- **Décision (Edouard)** : démarrer en **simple opt-in** (`status: "active"`) pour maximiser le volume au lancement. Le **double opt-in** reste recommandé pour la délivrabilité (défi #3) et sera **ajouté plus tard**.
- **Réactiver le double opt-in (≈2 min)** : dans `route.ts`, remettre `status: "unconfirmed"`, activer le double opt-in dans le compte MailerLite, et restaurer le message de succès « Vérifiez votre boîte courriel pour confirmer ». La case de consentement (preuve CASL) reste en place dans les deux cas.

## 9. Remplacement complet : app Next.js → site statique (nouvelle version d'Edouard)

- **Date** : 2026-05-31 (plus tard dans la journée).
- **Quoi** : tout le projet Next.js (recadrage des entrées #1 à #8) est **remplacé** par un nouveau site statique fourni par Edouard (généré via Claude Design), bien plus abouti.
- **Retiré** : `app/`, `public/`, `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `AGENTS.md`, `CLAUDE.md` (toute la stack Next.js, dont la route API `/api/newsletter-subscribe`).
- **Ajouté** : `index.html` (racine) + `assets/` (5 images) + `vercel.json` (déploiement statique, zéro build).
- **Pourquoi** : nouvelle landing nettement meilleure (sections preuve sociale, FAQ, double CTA, accessibilité, honeypot anti-spam) ; conserve l'identité de marque et les décisions du cadrage (email-only, consentement non précoché, « pas une agence », aucun concurrent nommé).
- **Conséquence** : la route serveur `/api/newsletter-subscribe` n'existe plus dans la version statique. Le formulaire tourne en `SIMULATE = true`. Pour le brancher : recréer une fonction serverless `/api` (réf. implémentation Next.js dans le commit `8780814`) puis passer `SIMULATE = false`.
- **À compléter avant lancement** : adresse postale réelle (placeholder factice `1234 rue de la Montagne`), liens légaux `href="#"`, Tailwind compilé (CDN actuellement).
- **Revenir en arrière** : `git revert` du commit de remplacement, ou `git checkout 8780814 -- .` pour restaurer la version Next.js recadrée.

---

## Points en suspens (non bloquants)

- ⚠️ **Le repo GitHub est public.** Pas de secret commité (`.env*` ignoré), mais à discuter : le passer privé si souhaité.
- Compte MailerLite à créer (Phase 1) → la clé activera le formulaire.
- Placeholders légaux `[À COMPLÉTER]` à remplir.
