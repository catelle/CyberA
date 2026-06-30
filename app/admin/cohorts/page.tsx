import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { cohorts } from "@/lib/program";

export default async function AdminCohortsPage() {
  const user = await requireRole(["admin"]);

  return (
    <DashboardShell user={user} title="Cohortes">
      <section className="grid gap-4 md:grid-cols-2">
        {cohorts.map((cohort) => (
          <article className="rounded-lg bg-white p-5 shadow-sm" key={cohort.name}>
            <p className="text-sm font-black uppercase text-brand-gold">{cohort.type}</p>
            <h2 className="mt-2 text-xl font-black text-brand-blue">{cohort.name}</h2>
            <p className="mt-3 leading-7 text-slate-600">{cohort.description}</p>
            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-brand-gold"
                style={{ width: `${Math.round((cohort.enrolled / cohort.maxSize) * 100)}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-500">
              {cohort.enrolled}/{cohort.maxSize} inscrits
            </p>
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
