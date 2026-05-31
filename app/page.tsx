import Link from "next/link";
import SignupForm from "./components/SignupForm";

export default function Home() {
  return (
    <>
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-navy/10 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-titre text-xl font-bold tracking-tight text-navy">
            Envol<span className="text-teal">Voyage</span>
          </span>
          <div className="hidden items-center gap-8 text-sm text-navy/70 sm:flex">
            <a href="#comment" className="transition hover:text-navy">
              Comment ça marche
            </a>
            <a href="#avantages" className="transition hover:text-navy">
              Avantages
            </a>
            <a
              href="#hero"
              className="rounded-lg bg-carmin px-5 py-2 font-semibold text-cream transition hover:bg-carmin/90"
            >
              S&apos;inscrire
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center bg-cream px-6 pt-24 pb-20 text-center"
      >
        <div className="pointer-events-none absolute top-1/4 left-1/2 h-[460px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/15 blur-[120px]" />

        <p className="font-titre relative mb-4 inline-block rounded-full border border-teal/40 bg-teal/10 px-4 py-1 text-xs font-medium tracking-wide text-navy uppercase">
          Aubaines de vols au départ du Québec
        </p>
        <h1 className="font-titre relative mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl md:text-6xl">
          Des vols à prix imbattables,
          <br />
          <span className="text-teal">livrés dans votre boîte courriel</span>
        </h1>
        <p className="relative mx-auto mt-5 max-w-xl text-lg leading-relaxed text-navy/70">
          Nos algorithmes surveillent les prix aériens en continu et repèrent les
          erreurs de tarification et les baisses exceptionnelles. Dès qu&apos;une
          vraie aubaine apparaît, on vous alerte par courriel.
        </p>

        <div className="relative mt-10 w-full max-w-md">
          <SignupForm />
        </div>

        <p className="relative mt-4 text-xs text-navy/40">
          100 % gratuit, 0 frais caché. Aucune carte de crédit requise.
        </p>
      </section>

      {/* ===== COMMENT CA MARCHE ===== */}
      <section id="comment" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-titre mb-2 text-xs font-semibold tracking-widest text-teal uppercase">
            Simple comme bonjour
          </p>
          <h2 className="font-titre text-3xl font-bold text-navy sm:text-4xl">
            Comment ça marche
          </h2>

          <div className="mt-16 grid gap-10 sm:grid-cols-3">
            {[
              {
                n: "1",
                titre: "Entrez votre courriel",
                texte:
                  "Une seule adresse courriel suffit. Pas de compte à créer, pas de mot de passe.",
              },
              {
                n: "2",
                titre: "Confirmez votre inscription",
                texte:
                  "Vous recevez un courriel de confirmation à valider en un clic. C'est tout.",
              },
              {
                n: "3",
                titre: "Recevez les aubaines",
                texte:
                  "Dès qu'une aubaine réelle est repérée, on vous l'envoie. Vous réservez vous-même, directement chez la compagnie aérienne.",
              },
            ].map((etape) => (
              <div key={etape.n} className="flex flex-col items-center">
                <div className="font-titre flex h-16 w-16 items-center justify-center rounded-2xl bg-teal/15 text-3xl font-bold text-navy">
                  {etape.n}
                </div>
                <h3 className="font-titre mt-5 text-lg font-semibold text-navy">
                  {etape.titre}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">
                  {etape.texte}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AVANTAGES ===== */}
      <section id="avantages" className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-titre mb-2 text-xs font-semibold tracking-widest text-teal uppercase">
            Pourquoi Envol Voyage
          </p>
          <h2 className="font-titre text-3xl font-bold text-navy sm:text-4xl">
            Voyagez plus, dépensez moins
          </h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                icone: "$",
                titre: "De vraies aubaines",
                texte:
                  "On ne relaie que les erreurs de prix et les baisses exceptionnelles repérées par nos algorithmes — pas du remplissage.",
              },
              {
                icone: "⏱",
                titre: "Gain de temps",
                texte:
                  "Fini les heures à comparer les prix. La surveillance se fait en continu et vous recevez uniquement le meilleur.",
              },
              {
                icone: "✈",
                titre: "Destinations variées",
                texte:
                  "Europe, Caraïbes, Asie, Amérique du Sud… au départ du Québec. Vous réservez où vous voulez.",
              },
            ].map((carte) => (
              <div
                key={carte.titre}
                className="rounded-2xl border border-cyan-grise/50 bg-white p-8 text-left transition hover:border-teal/60 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/15 text-2xl text-navy">
                  {carte.icone}
                </div>
                <h3 className="font-titre text-lg font-semibold text-navy">
                  {carte.titre}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">
                  {carte.texte}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-navy px-6 py-12 text-cream">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <span className="font-titre text-lg font-bold">
            Envol<span className="text-teal">Voyage</span>
          </span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/confidentialite" className="text-cream/60 transition hover:text-cream">
              Confidentialité
            </Link>
            <Link href="/conditions" className="text-cream/60 transition hover:text-cream">
              Conditions d&apos;utilisation
            </Link>
            <a
              href="https://www.instagram.com/envolvoyage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/60 transition hover:text-cream"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/envolvoyage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/60 transition hover:text-cream"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl border-t border-cream/10 pt-6 text-center text-xs leading-relaxed text-cream/40">
          <p>
            Envol Voyage est un service de curation d&apos;aubaines de vols —{" "}
            <strong className="text-cream/60">pas une agence de voyage</strong>.
            Nous ne vendons aucun billet ; vous réservez directement chez la
            compagnie aérienne.
          </p>
          <p className="mt-2">
            {/* TODO Edouard : compléter avant lancement (exigence CASL / Loi 25) */}
            [ADRESSE POSTALE À COMPLÉTER] · Responsable de la protection des
            renseignements personnels : [NOM À COMPLÉTER]
          </p>
          <p className="mt-3">&copy; 2026 Envol Voyage. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
}
