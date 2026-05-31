import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation — Envol Voyage",
};

export default function Conditions() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/" className="text-sm text-teal hover:underline">
        ← Retour à l&apos;accueil
      </Link>

      <h1 className="font-titre mt-6 text-3xl font-bold text-navy sm:text-4xl">
        Conditions d&apos;utilisation
      </h1>

      <p className="mt-3 rounded-lg border border-carmin/30 bg-carmin/5 p-4 text-sm text-navy/70">
        ⚠️ <strong>Ébauche de travail</strong> — orientation, <strong>pas un
        avis juridique</strong>. À faire valider avant le lancement commercial.
      </p>

      <div className="mt-8 space-y-6 text-navy/80">
        <section>
          <h2 className="font-titre text-xl font-semibold text-navy">
            1. Nature du service
          </h2>
          <p className="mt-2">
            Envol Voyage est un <strong>service de curation et d&apos;alerte
            d&apos;aubaines de vols</strong>. Nous repérons des tarifs aériens
            avantageux et vous en informons par courriel.{" "}
            <strong>
              Envol Voyage n&apos;est pas une agence de voyage
            </strong>{" "}
            : nous ne vendons aucun billet et n&apos;effectuons aucune
            réservation. Vous réservez vous-même, directement auprès de la
            compagnie aérienne ou du marchand concerné.
          </p>
        </section>

        <section>
          <h2 className="font-titre text-xl font-semibold text-navy">
            2. Aucune garantie de prix ni de disponibilité
          </h2>
          <p className="mt-2">
            Les tarifs signalés sont exacts au moment du repérage, mais les prix
            aériens changent en continu et certaines offres (notamment les
            erreurs de prix) disparaissent en quelques heures. Nous ne
            garantissons ni la disponibilité, ni le maintien d&apos;un prix, ni
            l&apos;honneur d&apos;une réservation par un tiers.
          </p>
        </section>

        <section>
          <h2 className="font-titre text-xl font-semibold text-navy">
            3. Liens d&apos;affiliation
          </h2>
          <p className="mt-2">
            Notre service est gratuit. Pour le financer, certaines pages ou
            certains courriels peuvent contenir des liens d&apos;affiliation
            (par exemple vers des cartes de crédit voyage ou des assurances)
            dont nous tirons une commission, sans coût supplémentaire pour vous.
            Ces liens sont divulgués et n&apos;influencent pas le choix
            éditorial des aubaines.
          </p>
        </section>

        <section>
          <h2 className="font-titre text-xl font-semibold text-navy">
            4. Gratuité
          </h2>
          <p className="mt-2">
            L&apos;abonnement est offert à 100 % gratuitement, sans frais caché.
            Nous nous réservons la possibilité de faire évoluer le service à
            l&apos;avenir.
          </p>
        </section>

        <section>
          <h2 className="font-titre text-xl font-semibold text-navy">
            5. Coordonnées
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
