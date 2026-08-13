import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  LockKeyhole,
  MessageCircleQuestion,
  Route,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound
} from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { cyberaProgramme } from "@/lib/curriculum/cybera-kit";
import { getCyberaFellowKit } from "@/lib/db/cybera";

const commitment = [
  "progresser régulièrement dans le parcours d'apprentissage",
  "terminer les 4 modules et les 40 leçons",
  "réserver un temps suffisant à l'apprentissage",
  "participer aux Weekly Reviews obligatoires du samedi",
  "prendre part aux challenges et activités pratiques",
  "poser des questions et prévenir l'équipe lorsque je suis bloqué(e)",
  "respecter les Fellows et l'équipe programme",
  "donner un retour sincère et soumettre mon Capstone Project"
];

const support = [
  "des ressources d'apprentissage structurées",
  "des activités et challenges pratiques",
  "l'accompagnement de l'équipe programme et les Weekly Reviews",
  "un espace pour poser tes questions et recevoir du feedback",
  "une aide lorsque tu es bloqué(e)",
  "une expérience qui évolue grâce aux retours des Fellows"
];

export default async function CyberaKitPage() {
  const user = await requireRole(["student"]);
  const kit = await getCyberaFellowKit(user.supabaseUserId);
  const firstName = user.profile.fullName.trim().split(/\s+/)[0] || "Fellow";
  const fellowship = kit.fellowshipName ?? "Nom de Fellowship à venir";
  const learningStarted = kit.lessonsCompleted > 0;
  const learningDone = kit.moduleCount > 0 && kit.completedModules >= kit.moduleCount;
  const currentStage = kit.certified ? 6 : kit.capstoneSubmitted ? 5 : kit.hasChallengeActivity ? 3 : learningStarted ? 1 : 0;
  const spaces = [
    { title: "Apprendre", detail: "Modules et leçons", href: "/student/modules", Icon: BookOpen },
    { title: "Mes challenges", detail: "Activités pratiques", href: "/student/challenges", Icon: ClipboardCheck },
    { title: "Ma progression", detail: `${kit.lessonsCompleted}/${kit.lessonsTotal || 40} leçons`, href: "/student/status", Icon: Trophy },
    { title: "Calendrier", detail: "Dates et Weekly Reviews", href: "#calendrier", Icon: CalendarDays },
    { title: "Besoin d'aide ?", detail: "Questions et assistance", href: "#aide", Icon: CircleHelp }
  ];

  return (
    <DashboardShell title="Mon Kit CyberA" user={user}>
      <div className="grid gap-6">
        <section className="overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.07)]">
          <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">CyberA Fellow · {fellowship} · {cyberaProgramme.year}</p>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.04em] text-brand-ink sm:text-5xl">Bonjour, {firstName}</h2>
              <p className="mt-4 text-xl font-extrabold text-primary">Ton parcours CyberAmbassador commence ici.</p>
              <div className="mt-6 max-w-3xl border-l-4 border-primary pl-4">
                <p className="font-display text-xl font-extrabold text-brand-ink">Comprendre le monde numérique, c&apos;est un superpouvoir.</p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">Derrière chaque écran, il y a des algorithmes, des données, des décisions, des risques et des opportunités. Plus tu comprends comment le numérique fonctionne, plus tu peux faire des choix éclairés, te protéger et aider les autres.</p>
              </div>
            </div>
            <div className="w-full rounded-2xl border-2 border-primary bg-white p-5 text-center shadow-[0_5px_0_#b5123f] lg:w-72">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-fixed text-primary"><UserRound className="h-8 w-8" /></div>
              <p className="mt-4 font-display text-xl font-extrabold text-brand-ink">{user.profile.fullName}</p>
              <p className="mt-1 text-sm font-extrabold uppercase tracking-wider text-primary">CyberA Fellow</p>
              <p className="mt-3 text-sm font-bold text-slate-600">{fellowship} · 2026</p>
              <p className="mt-4 border-t border-slate-200 pt-4 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">Lead · Protect · Inspire</p>
              <p className="mt-2 text-[11px] font-medium text-slate-400">Carte d&apos;identité de parcours — ce n&apos;est pas un certificat officiel.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3"><Route className="h-6 w-6 text-primary" /><div><p className="text-xs font-extrabold uppercase tracking-widest text-primary">Mon parcours CyberA</p><h2 className="font-display text-2xl font-extrabold text-brand-ink">CyberA Fellow → CyberAmbassador</h2></div></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {cyberaProgramme.stages.map((stage, index) => {
              const completed = index < currentStage || (index === 1 && learningDone) || (index === 6 && kit.certified);
              const current = index === currentStage && !completed;
              return <div className={`rounded-xl border p-3 ${completed ? "border-emerald-200 bg-emerald-50" : current ? "border-primary bg-primary-fixed" : "border-slate-200 bg-slate-50"}`} key={stage.id}><span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-black ${completed ? "bg-emerald-600 text-white" : current ? "bg-primary text-white" : "bg-white text-slate-400"}`}>{completed ? <Check className="h-4 w-4" /> : index + 1}</span><p className="mt-3 text-sm font-extrabold text-brand-ink">{stage.label}</p><p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">{completed ? "Terminé" : current ? "Étape actuelle" : "À venir"}</p></div>;
            })}
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {spaces.map(({ Icon, ...space }) => <Link className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-md" href={space.href} key={space.title}><span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-fixed text-primary"><Icon className="h-5 w-5" /></span><h3 className="mt-4 font-display text-lg font-extrabold text-brand-ink">{space.title}</h3><p className="mt-1 text-sm font-medium text-slate-500">{space.detail}</p><ArrowRight className="mt-4 h-4 w-4 text-primary transition group-hover:translate-x-1" /></Link>)}
        </section>

        <section className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" id="calendrier">
          <div className="flex items-center gap-3"><CalendarDays className="h-6 w-6 text-primary" /><div><p className="text-xs font-extrabold uppercase tracking-widest text-primary">Calendrier du programme</p><h2 className="font-display text-2xl font-extrabold text-brand-ink">Les rendez-vous de ta Fellowship</h2></div></div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {cyberaProgramme.calendar.map((item) => <article className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={`${item.date}-${item.title}`}><p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary"><Clock3 className="h-4 w-4" />{item.date}</p><h3 className="mt-2 font-display text-lg font-extrabold text-brand-ink">{item.title}</h3><p className="mt-2 text-sm font-medium leading-6 text-slate-600">{item.detail}</p></article>)}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-rose-200 bg-[#fff8fa] p-5 sm:p-7"><div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-primary" /><h2 className="font-display text-2xl font-extrabold text-brand-ink">Mon engagement en tant que CyberA Fellow</h2></div><ul className="mt-5 grid gap-3">{commitment.map((item) => <li className="flex gap-3 text-sm font-semibold leading-6 text-slate-700" key={item}><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{item}</li>)}</ul><p className="mt-6 rounded-xl bg-white p-4 font-extrabold leading-7 text-brand-ink">Nous n&apos;attendons pas que tu saches déjà tout. Nous attendons que tu sois prêt(e) à apprendre, essayer et progresser.</p></article>
          <article className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 sm:p-7"><div className="flex items-center gap-3"><Sparkles className="h-6 w-6 text-tertiary" /><h2 className="font-display text-2xl font-extrabold text-brand-ink">Et nous, qu&apos;est-ce qu&apos;on te doit ?</h2></div><p className="mt-4 font-semibold leading-7 text-slate-700">L&apos;équipe programme est là pour t&apos;aider à terminer le parcours, pas seulement pour surveiller ta progression.</p><ul className="mt-5 grid gap-3">{support.map((item) => <li className="flex gap-3 text-sm font-semibold leading-6 text-slate-700" key={item}><Check className="mt-1 h-4 w-4 shrink-0 text-tertiary" />{item}</li>)}</ul></article>
        </section>

        <section className="scroll-mt-6 grid gap-5 lg:grid-cols-[1.2fr_.8fr]" id="aide">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-center gap-3"><MessageCircleQuestion className="h-6 w-6 text-primary" /><h2 className="font-display text-2xl font-extrabold text-brand-ink">Besoin d&apos;aide ?</h2></div><p className="mt-4 text-lg font-extrabold text-primary">Tu es bloqué(e) ? Ne reste pas seul(e) avec le problème.</p><ol className="mt-5 grid gap-3">{["Relis la leçon ou la ressource concernée.", "Pose ta question dans l'espace Forum.", "Contacte l'équipe programme pour un problème technique ou lié au programme."].map((item, index) => <li className="flex gap-3 rounded-xl bg-slate-50 p-3 font-semibold text-slate-700" key={item}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-black text-white">{index + 1}</span>{item}</li>)}</ol><Link className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 font-extrabold text-white" href="/student/forum">Ouvrir le Forum <ArrowRight className="h-4 w-4" /></Link></article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-center gap-3"><LockKeyhole className="h-6 w-6 text-slate-400" /><h2 className="font-display text-xl font-extrabold text-brand-ink">CyberAmbassador Toolkit</h2></div><span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-500">Verrouillé</span><p className="mt-4 font-semibold leading-7 text-slate-600">Complète ton parcours CyberA pour débloquer les ressources CyberAmbassador.</p><div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-500"><GraduationCap className="h-7 w-7" /><p className="text-sm font-bold">Les ressources diplômées ne sont pas encore accessibles aux Fellows.</p></div></article>
        </section>
      </div>
    </DashboardShell>
  );
}
