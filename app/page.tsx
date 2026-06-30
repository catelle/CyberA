import Image from "next/image";
import Link from "next/link";

import { ambassadorActions, cohorts, programModules } from "@/lib/program";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-brand-ink">
      <section className="relative min-h-[92vh] overflow-hidden bg-brand-ink text-white">
        <Image
          alt="Jeunes Cyberambassadeurs en formation"
          className="object-cover opacity-30"
          fill
          priority
          src="/img/cybera.jpg"
        />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col px-5 py-6">
          <header className="flex items-center justify-between gap-4">
            <Link className="flex items-center gap-3 font-black" href="/">
              <Image alt="" height={42} src="/img/logo.png" width={42} />
              <span>Cyberambassadeurs</span>
            </Link>
            <nav className="flex items-center gap-3 text-sm font-bold">
              <Link className="hidden text-white/80 hover:text-white sm:inline" href="#cohortes">
                Cohortes
              </Link>
              <Link className="hidden text-white/80 hover:text-white sm:inline" href="#programme">
                Programme
              </Link>
              <Link
                className="rounded-lg bg-white px-4 py-2 text-brand-ink transition hover:bg-brand-gold"
                href="/login"
              >
                Connexion
              </Link>
            </nav>
          </header>

          <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1fr_0.78fr]">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full bg-brand-gold px-4 py-2 text-sm font-black text-brand-ink">
                Formation interactive de 4 modules
              </p>
              <h1 className="text-4xl font-black leading-tight sm:text-6xl">
                Devenez un CyberAmbassadeur
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
                Une plateforme PWA pour former les jeunes a reconnaitre les risques en
                ligne, proteger leurs donnees et guider leur communaute avec des reflexes
                simples.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="rounded-lg bg-brand-gold px-5 py-3 font-black text-brand-ink transition hover:bg-white"
                  href="/register/student"
                >
                  Inscrire un eleve
                </Link>
                <Link
                  className="rounded-lg border border-white/35 px-5 py-3 font-black text-white transition hover:bg-white/10"
                  href="/register/parent"
                >
                  Espace parent
                </Link>
              </div>
            </div>

            <div className="grid gap-4 rounded-lg bg-white/10 p-4 backdrop-blur">
              {ambassadorActions.map((action) => (
                <div className="rounded-lg bg-white p-4 text-brand-ink" key={action.title}>
                  <p className="text-sm font-black uppercase text-brand-gold">{action.owner}</p>
                  <h2 className="mt-1 text-xl font-black">{action.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16" id="cohortes">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase text-brand-gold">Cohortes</p>
            <h2 className="mt-2 text-3xl font-black text-brand-blue">
              Trois parcours pour apprendre, agir et transmettre.
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {cohorts.map((cohort) => (
              <article className="overflow-hidden rounded-lg bg-white shadow-sm" key={cohort.name}>
                <div className="relative h-44">
                  <Image
                    alt={cohort.name}
                    className="object-cover"
                    fill
                    src={cohort.image}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black text-brand-blue">{cohort.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{cohort.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" id="programme">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase text-brand-gold">Programme</p>
              <h2 className="mt-2 text-3xl font-black text-brand-blue">
                Modules progressifs, suivis par l&apos;eleve, le parent et l&apos;equipe.
              </h2>
            </div>
            <Link
              className="rounded-lg bg-brand-blue px-5 py-3 text-center font-black text-white transition hover:bg-brand-ink"
              href="/login"
            >
              Acceder a la plateforme
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {programModules.map((module) => (
              <article className="rounded-lg border border-slate-200 bg-white p-5" key={module.id}>
                <p className="text-sm font-black text-brand-gold">Semaine {module.week}</p>
                <h3 className="mt-2 text-lg font-black text-brand-ink">{module.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{module.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
