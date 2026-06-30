import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getProgramCompletionPercent, programModules } from "@/lib/program";

export default async function StudentDashboardPage() {
  const user = await requireRole(["student"]);
  const t = getDictionary(user.language);
  const completion = getProgramCompletionPercent();
  const readyModule = programModules.find((module) => module.status === "ready");

  return (
    <DashboardShell user={user} title={t.studentDashboard}>
      <div className="grid gap-5">
        <section className="grid gap-4 rounded-lg bg-white p-5 shadow-sm lg:grid-cols-[1fr_16rem]">
          <div>
            <p className="text-sm font-bold text-slate-500">{t.nextStep}</p>
            <h2 className="mt-2 text-2xl font-black text-brand-blue">
              {readyModule ? readyModule.title : "Programme CyberAmbassadeur"}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              {readyModule?.summary ??
                "Les modules seront actives progressivement par l'equipe programme."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(readyModule?.outcomes ?? []).map((outcome) => (
                <span
                  className="rounded-full bg-brand-sky px-3 py-1 text-sm font-bold text-brand-blue"
                  key={outcome}
                >
                  {outcome}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-brand-blue p-5 text-white">
            <p className="text-sm font-black text-white/70">Progression</p>
            <p className="mt-3 text-5xl font-black">{completion}%</p>
            <div className="mt-4 h-2 rounded-full bg-white/20">
              <div
                className="h-2 rounded-full bg-brand-gold"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-white/75">
              {user.consentGiven
                ? "Consentement parent confirme."
                : "Consentement parent a confirmer."}
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {programModules.map((module) => (
            <article className="rounded-lg bg-white p-5 shadow-sm" key={module.id}>
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-black text-brand-gold">Semaine {module.week}</p>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-black uppercase text-slate-500">
                  {module.status}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-black text-brand-ink">{module.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{module.summary}</p>
            </article>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
