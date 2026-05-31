# Avant / Après — snapshots pour restauration

Snapshots du code clé **avant** recadrage, pour un retour en arrière rapide sans fouiller l'historique git.

---

## §1. Formulaire d'inscription (avant : Supabase, 3 champs)

```tsx
// app/components/SignupForm.tsx (VERSION ORIGINALE)
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [villeDepart, setVilleDepart] = useState("");
  const [message, setMessage] = useState("");
  const [enCours, setEnCours] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnCours(true);
    setMessage("Création du compte...");

    const { error } = await supabase.auth.signUp({
      email: email,
      password: motDePasse,
      options: { data: { ville_depart: villeDepart } },
    });

    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("Bienvenue ! Votre compte est créé.");
      setEmail(""); setMotDePasse(""); setVilleDepart("");
    }
    setEnCours(false);
  }
  // ... 3 <input> (email, password, text ville) + bouton
}
```

## §2. Identité visuelle (avant : thème dark + cyan)

- `globals.css` d'origine : `--background: #ffffff; --foreground: #0a0a0a;` + `font-family: "Inter"...`, variables `--font-geist-sans` / `--font-geist-mono`.
- Classes de `page.tsx` d'origine : `bg-black/80`, `from-black via-gray-950 to-gray-900`, `text-cyan-400`, `bg-cyan-500`, `text-white/70`, glow `bg-cyan-500/10`.
- Layout d'origine : seulement `Inter` chargé, variable `--font-geist-sans`.

## §3. Copy supprimée / remplacée (avant)

- Badge hero : « **Alertes de vols propulsees par IA** ».
- Sous-titre hero : « Notre **agent IA** surveille les prix en continu et vous alerte des qu'une aubaine correspond a votre ville de depart. »
- Carte avantage : « Nos membres **economisent en moyenne 40 a 70%** sur leurs billets… » → **SUPPRIMÉE** (stat inventée).
- « Comment ça marche » étape 1 : « Creez votre **compte** en quelques secondes avec votre courriel et un **mot de passe**. »
- Étape 2 : « **Indiquez votre ville** de depart… »
- Note hero : « Gratuit. Aucune carte de credit requise. »

## §4. Client Supabase (avant : supprimé)

```ts
// lib/supabase.ts (SUPPRIMÉ)
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

## §5. Dépendances (avant)

```json
"@supabase/ssr": "^0.10.3",
"@supabase/supabase-js": "^2.106.2",
```

---

> Pour la version exacte ligne par ligne d'origine : `git show f7d19a2` et `git show 47d225b` (commits de l'ami avant recadrage).
