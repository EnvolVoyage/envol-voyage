import SignupForm from "./components/SignupForm";

export default function Home() {
  return (
    <>
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold tracking-tight text-white">
            Envol<span className="text-cyan-400">Voyage</span>
          </span>
          <div className="hidden sm:flex items-center gap-8 text-sm text-white/70">
            <a href="#comment" className="hover:text-white transition">
              Comment ca marche
            </a>
            <a href="#avantages" className="hover:text-white transition">
              Avantages
            </a>
            <a
              href="#hero"
              className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-white hover:bg-cyan-400 transition"
            >
              S&apos;inscrire
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black via-gray-950 to-gray-900 px-6 pt-24 pb-20 text-center"
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <p className="relative mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-medium tracking-wide text-cyan-300 uppercase">
          Alertes de vols propulsees par IA
        </p>
        <h1 className="relative mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Des vols a bas prix,
          <br />
          <span className="text-cyan-400">livres dans votre boite courriel</span>
        </h1>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/60 leading-relaxed">
          Notre agent IA surveille les prix en continu et vous alerte des
          qu&apos;une aubaine correspond a votre ville de depart. Plus besoin de
          chercher, les deals viennent a vous.
        </p>

        <div className="relative mt-10 w-full max-w-md">
          <SignupForm />
        </div>

        <p className="relative mt-4 text-xs text-white/30">
          Gratuit. Aucune carte de credit requise.
        </p>
      </section>

      {/* ===== COMMENT CA MARCHE ===== */}
      <section id="comment" className="bg-white py-24 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-2 text-xs font-semibold tracking-widest text-cyan-500 uppercase">
            Simple comme bonjour
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Comment ca marche
          </h2>

          <div className="mt-16 grid gap-10 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-3xl">
                1
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Inscrivez-vous
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Creez votre compte en quelques secondes avec votre courriel et un
                mot de passe.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-3xl">
                2
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Indiquez votre ville
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Dites-nous d&apos;ou vous partez pour que nos alertes soient
                pertinentes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-3xl">
                3
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Recevez les alertes
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Notre IA vous envoie les meilleures aubaines directement dans
                votre boite courriel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AVANTAGES ===== */}
      <section id="avantages" className="bg-gray-50 py-24 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-2 text-xs font-semibold tracking-widest text-cyan-500 uppercase">
            Pourquoi Envol Voyage
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Voyagez plus, depensez moins
          </h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-left transition hover:shadow-lg hover:border-cyan-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500 text-2xl text-white">
                $
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Economies reelles
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Nos membres economisent en moyenne 40 a 70% sur leurs billets
                d&apos;avion grace a nos alertes ciblees.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-left transition hover:shadow-lg hover:border-cyan-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500 text-2xl text-white">
                &#9201;
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Gain de temps
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Fini les heures passees a comparer les prix. L&apos;IA fait le
                travail et vous recevez uniquement le meilleur.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-left transition hover:shadow-lg hover:border-cyan-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500 text-2xl text-white">
                &#9992;
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Destinations variees
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Europe, Caraibes, Asie, Amerique du Sud... Nous couvrons toutes
                les destinations populaires au depart du Canada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black py-12 px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <span className="text-lg font-bold text-white">
            Envol<span className="text-cyan-400">Voyage</span>
          </span>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/envolvoyage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/50 hover:text-white transition"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/envolvoyage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/50 hover:text-white transition"
            >
              Facebook
            </a>
            <a
              href="https://x.com/envolvoyage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/50 hover:text-white transition"
            >
              X
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-5xl border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/30">
            &copy; 2026 Envol Voyage. Tous droits reserves.
          </p>
        </div>
      </footer>
    </>
  );
}
