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
      options: {
        data: { ville_depart: villeDepart },
      },
    });

    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("Bienvenue ! Votre compte est créé.");
      setEmail("");
      setMotDePasse("");
      setVilleDepart("");
    }
    setEnCours(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md">
      <input
        type="email"
        placeholder="Votre courriel"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
      />
      <input
        type="password"
        placeholder="Mot de passe (6 caractères min.)"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        required
        minLength={6}
        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
      />
      <input
        type="text"
        placeholder="Ville de départ (ex: Montréal)"
        value={villeDepart}
        onChange={(e) => setVilleDepart(e.target.value)}
        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
      />
      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400 disabled:opacity-50 cursor-pointer"
      >
        {enCours ? "Patientez..." : "Recevoir les alertes"}
      </button>
      {message && (
        <p className={`text-sm text-center ${message.startsWith("Erreur") ? "text-red-400" : "text-emerald-400"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
