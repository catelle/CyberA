import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getSupabaseUserRoleCounts } from "@/lib/db/cybera";
import { getDictionary } from "@/lib/i18n/dictionary";
import { cohorts, getAdminMetrics, programModules } from "@/lib/program";

export default async function AdminDashboardPage() {
  const user = await requireRole(["admin"]);
  const t = getDictionary(user.language);
  const counts = await getSupabaseUserRoleCounts();
  const metrics = getAdminMetrics();

  const stats = [
    { label: "Eleves", value: counts.students },
    { label: "Parents", value: counts.parents },
    { label: "Admins", value: counts.admins },
    { label: "Certifies", value: metrics.certifiedAmbassadors },
    { label: "Soumissions", value: metrics.pendingChallengeSubmissions },
    { label: "Forum", value: metrics.pendingForumReports },
    { label: "Cohortes", value: metrics.activeCohorts },
    { label: "Liens parents", value: metrics.parentAccountsLinked },
    { label: "Actifs semaine", value: metrics.weeklyActiveUsers },
    { label: "Consentements", value: counts.consented }
  ];

  return (
    <DashboardShell user={user} title={t.adminDashboard}>
      <div className="grid gap-5">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <article className="rounded-lg bg-white p-5 shadow-sm" key={stat.label}>
              <p className="text-sm font-bold text-slate-500">{stat.label}</p>
              <p className="mt-2 text-4xl font-black text-brand-blue">{stat.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-black uppercase text-brand-gold">Modules</p>
            <h2 className="mt-2 text-2xl font-black text-brand-ink">
              Etat de publication du parcours
            </h2>
            <div className="mt-5 grid gap-3">
              {programModules.map((module) => (
                <div
                  className="flex flex-col justify-between gap-2 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center"
                  key={module.id}
                >
                  <div>
                    <p className="text-sm font-black text-brand-gold">
                      Semaine {module.week}
                    </p>
                    <h3 className="font-black text-brand-blue">{module.title}</h3>
                  </div>
                  <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500">
                    {module.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-brand-blue p-5 text-white shadow-sm">
            <p className="text-sm font-black uppercase text-brand-gold">Cohortes</p>
            <h2 className="mt-2 text-2xl font-black">Parcours disponibles</h2>
            <div className="mt-5 grid gap-3">
              {cohorts.map((cohort) => (
                <div className="rounded-lg bg-white/10 p-4" key={cohort.name}>
                  <h3 className="font-black">{cohort.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    {cohort.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
