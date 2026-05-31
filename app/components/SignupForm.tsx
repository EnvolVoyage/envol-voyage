"use client";

import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState(false);
  const [enCours, setEnCours] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnCours(true);
    setMessage("");
    setErreur(false);

    try {
      const res = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErreur(true);
        setMessage(data.error ?? "Une erreur est survenue.");
      } else {
        setMessage(data.message ?? "Inscription reçue.");
        setEmail("");
        setConsent(false);
      }
    } catch {
      setErreur(true);
      setMessage("Une erreur réseau est survenue. Réessayez.");
    } finally {
      setEnCours(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="votre@courriel.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Votre adresse courriel"
          className="w-full flex-1 rounded-lg border border-navy/15 bg-white px-4 py-3 text-navy placeholder-navy/40 outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/40"
        />
        <button
          type="submit"
          disabled={enCours}
          className="rounded-lg bg-carmin px-6 py-3 font-semibold text-cream transition hover:bg-carmin/90 disabled:opacity-50"
        >
          {enCours ? "Un instant…" : "Recevoir les aubaines"}
        </button>
      </div>

      <label className="flex items-start gap-2 text-left text-xs text-navy/60">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-teal"
        />
        <span>
          J&apos;accepte de recevoir les aubaines de vols d&apos;Envol Voyage par
          courriel. Je peux me désabonner en tout temps.
        </span>
      </label>

      {message && (
        <p
          className={`text-sm ${erreur ? "text-carmin" : "text-teal"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
