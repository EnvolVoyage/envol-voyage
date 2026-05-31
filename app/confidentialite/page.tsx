import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Envol Voyage",
};

export default function Confidentialite() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/" className="text-sm text-teal hover:underline">
        ← Retour à l&apos;accueil
      </Link>

      <h1 className="font-titre mt-6 text-3xl font-bold text-navy sm:text-4xl">
        Politique de confidentialité
      </h1>

      <p className="mt-3 rounded-lg border border-carmin/30 bg-carmin/5 p-4 text-sm text-navy/70">
        ⚠️ <strong>Ébauche de travail</strong> — ce texte est une orientation
        conforme à la Loi 25 (Québec) et à la LCAP/CASL, <strong>pas un avis
        juridique</strong>. À faire valider par un professionnel avant le
        lancement commercial.
      </p>

      <div className="mt-8 space-y-6 text-navy/80">
        <section>
          <h2 className="font-titre text-xl font-semibold text-navy">
            1. Renseignements que nous recueillons
          </h2>
          <p className="mt-2">
            Nous recueillons uniquement votre <strong>adresse courriel</strong>,
            que vous nous fournissez volontairement pour vous abonner à notre
            infolettre d&apos;aubaines de vols. Aucune autre information
            personnelle n&apos;est exigée à l&apos;inscription.
          </p>
        </section>

        <section>
          <h2 className="font-titre text-xl font-semibold text-navy">
            2. Finalité
          </h2>
          <p className="mt-2">
            Votre adresse sert exclusivement à vous envoyer nos alertes
            d&apos;aubaines et les communications liées au service. Nous ne
            vendons ni ne louons vos renseignements à des tiers.
          </p>
        </section>

        <section>
          <h2 className="font-titre text-xl font-semibold text-navy">
            3. Consentement et désabonnement
          </h2>
          <p className="mt-2">
            Votre inscription repose sur un consentement exprès : une case à
            cocher non précochée, dont la date est enregistrée. Chaque courriel
            contient un lien de désabonnement fonctionnel ; vous pouvez vous
            retirer en tout temps, sans frais.
          </p>
        </section>

        <section>
          <h2 className="font-titre text-xl font-semibold text-navy">
            4. Conservation et hébergement
          </h2>
          <p className="mt-2">
            Votre adresse est conservée par notre fournisseur d&apos;envoi de
            courriels (MailerLite) tant que vous restez abonné, puis supprimée
            sur demande de retrait. La preuve du consentement (date de la case
            cochée) est conservée conformément à la LCAP.
          </p>
        </section>

        <section>
          <h2 className="font-titre text-xl font-semibold text-navy">
            5. Vos droits (Loi 25)
          </h2>
          <p className="mt-2">
            Vous avez le droit d&apos;accéder à vos renseignements, de les
            rectifier et d&apos;en demander la suppression. Pour exercer ces
            droits, contactez le responsable de la protection des renseignements
            personnels : <strong>[NOM ET COURRIEL À COMPLÉTER]</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-titre text-xl font-semibold text-navy">
            6. Coordonnées
          </h2>
          <p className="mt-2">
            Envol Voyage · [ADRESSE POSTALE À COMPLÉTER] · [COURRIEL DE CONTACT À
            COMPLÉTER]
          </p>
        </section>
      </div>
    </main>
  );
}
