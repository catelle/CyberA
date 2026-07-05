import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ClipboardCheck, MessageCircle, Trophy, UsersRound } from "lucide-react";

const homepageModules = [
  {
    title: "Risques en ligne",
    subtitle: "Online Risks",
    summary:
      "Identifier les arnaques, le phishing, le cyberharcelement, la desinformation et les situations qui demandent de l'aide."
  },
  {
    title: "Opportunites numeriques",
    subtitle: "Digital Opportunities",
    summary:
      "Utiliser internet pour apprendre, creer, trouver des opportunites utiles et construire une presence numerique positive."
  },
  {
    title: "Hygiene numerique",
    subtitle: "Digital Hygiene",
    summary:
      "Installer des reflexes concrets: mots de passe solides, confidentialite, double verification, gestion du temps et protection des donnees."
  },
  {
    title: "Leadership citoyen numerique",
    subtitle: "Digital Citizen Leadership",
    summary:
      "Passer de l'apprentissage a l'action: sensibiliser, aider d'autres eleves, documenter ses preuves et inspirer sa communaute."
  }
];

const platformHighlights = [
  {
    title: "Defis hebdomadaires avec preuve",
    description:
      "Chaque eleve accomplit une action reelle, soumet une preuve et gagne des points apres validation.",
    Icon: ClipboardCheck
  },
  {
    title: "Parents challenges par leur enfant",
    description:
      "Un enfant certifie peut inviter son parent a relever un defi similaire et prolonger l'apprentissage a la maison.",
    Icon: UsersRound
  },
  {
    title: "Classement mensuel et recompenses",
    description:
      "Les points alimentent un leaderboard mensuel qui valorise l'effort, l'impact et la constance.",
    Icon: Trophy
  },
  {
    title: "Badge verifiable et forum d'entraide",
    description:
      "La certification officielle donne acces a un badge verifiable et a une communaute ou les ambassadeurs aident d'autres eleves.",
    Icon: Award
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-brand-ink">
      <section className="relative min-h-[92vh] overflow-hidden bg-brand-ink text-white">
        <Image
          alt="Jeunes Cyberambassadeurs en formation"
          className="object-cover opacity-40"
          fill
          priority
          src="/img/cybera.jpg"
        />
        <div className="absolute inset-0 bg-brand-ink/60" />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col px-5 py-6">
          <header className="flex items-center justify-between gap-4">
            <Link className="flex items-center gap-3 font-black" href="/">
              <Image alt="" height={42} src="/img/logo.png" width={42} />
              <span>Cyberambassadeurs</span>
            </Link>
            <nav className="flex items-center gap-3 text-sm font-bold">
              <Link className="hidden text-white/80 hover:text-white sm:inline" href="#programme">
                Programme
              </Link>
              <Link
                className="rounded-lg bg-white px-4 py-2 text-brand-blue shadow-sm transition hover:bg-brand-rose"
                href="/login"
              >
                Connexion
              </Link>
            </nav>
          </header>

          <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1fr_0.78fr]">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full bg-brand-rose px-4 py-2 text-sm font-black text-brand-blue">
                Formation certifiante en 4 modules
              </p>
              <h1 className="text-4xl font-black leading-tight sm:text-6xl">
                Former les Cyberambassadeurs qui changent leur communaute
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                Sur un continent ou des millions de jeunes utilisent internet sans
                connaitre ses dangers ni sa puissance, Cyberambassadeurs forme des jeunes
                certifies qui apprennent a l&apos;utiliser pour grandir, se proteger, inspirer
                et changer leurs communautes.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                Across a continent where millions of young people use the internet without
                knowing its dangers or its power, we train certified cyberambassadors who
                use it to grow, protect, inspire, and change their communities.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
                Le parcours combine quatre modules structures, des defis de leadership
                hebdomadaires avec preuves, un systeme de points, un classement mensuel,
                des recompenses et un badge officiel verifiable.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand-blue px-5 py-3 font-black text-white shadow-glow transition hover:bg-white hover:text-brand-blue"
                  href="/register/student"
                >
                  Je suis eleve
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-black text-white transition hover:bg-white hover:text-brand-blue"
                  href="/register/parent"
                >
                  Je suis parent
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {platformHighlights.map(({ Icon, description, title }) => (
                <article className="rounded-lg border border-white/70 bg-white/95 p-4 text-brand-ink shadow-soft" key={title}>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-rose text-brand-blue">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-black">{title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16" id="programme">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase text-brand-blue">Programme certifiant</p>
              <h2 className="mt-2 text-3xl font-black text-brand-blue">
                Quatre modules pour apprendre, pratiquer et devenir un leader numerique.
              </h2>
            </div>
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 py-3 text-center font-black text-white shadow-glow transition hover:bg-brand-ink"
              href="/login"
            >
              Acceder a la plateforme
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {homepageModules.map((module, index) => (
              <article className="rounded-lg border border-rose-100 bg-white p-5 shadow-soft" key={module.title}>
                <p className="text-sm font-black text-brand-gold">
                  Module {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-black text-brand-ink">{module.title}</h3>
                <p className="mt-1 text-sm font-bold text-brand-blue">{module.subtitle}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{module.summary}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-lg bg-brand-sky p-5 shadow-sm">
              <ClipboardCheck aria-hidden className="h-6 w-6 text-brand-gold" />
              <h3 className="mt-3 text-lg font-black text-brand-blue">Pas seulement apprendre</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Les eleves doivent agir sur le terrain, documenter leurs preuves et recevoir
                une validation.
              </p>
            </article>
            <article className="rounded-lg bg-brand-sky p-5 shadow-sm">
              <UsersRound aria-hidden className="h-6 w-6 text-brand-gold" />
              <h3 className="mt-3 text-lg font-black text-brand-blue">Parents impliques</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Les parents peuvent etre challenges par leur enfant certifie et suivre les
                progres via leur espace.
              </p>
            </article>
            <article className="rounded-lg bg-brand-sky p-5 shadow-sm">
              <MessageCircle aria-hidden className="h-6 w-6 text-brand-gold" />
              <h3 className="mt-3 text-lg font-black text-brand-blue">Ambassadeurs actifs</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Les certifies rejoignent un forum ou ils aident d&apos;autres eleves et partagent
                des alertes utiles.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
