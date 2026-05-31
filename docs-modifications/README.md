# docs-modifications/

Ce dossier journalise les **modifications de recadrage** apportées au projet Envol Voyage pour l'aligner sur le cadrage produit (documents de référence : `OVERVIEW.md`, `CHALLENGES.md`, `ROADMAP.md` du workspace de cadrage).

## Pourquoi ce dossier existe

Le projet initial (livré par un cofondateur) partait dans une direction technique et éditoriale différente du cadrage décidé. Plutôt que de jeter le travail, on l'a **recadré** — et on documente chaque changement ici pour que, **si on change d'avis**, le retour en arrière soit simple et explicite.

## Contenu

| Fichier | Rôle |
|---|---|
| `JOURNAL.md` | Tableau chronologique : chaque fichier touché, ce qui a changé, pourquoi, et comment revenir en arrière |
| `AVANT-APRES.md` | Snapshots du code clé supprimé/remplacé (formulaire Supabase, palette dark, copy IA) pour restauration rapide |

## Principe de réversibilité

Tout changement est aussi dans l'historique git (`git log`, `git revert`). Ce dossier ajoute le **pourquoi** et un mode d'emploi de restauration en langage clair, ce que `git` seul ne donne pas.
