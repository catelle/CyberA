import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listCohortsFromDatabase } from "@/lib/db/cybera";
import { CohortNameForm } from "@/components/admin/CohortNameForm";

export default async function AdminCohortsPage() {
  const user = await requireRole(["admin"]);
  const cohorts = await listCohortsFromDatabase();

  return (
    <DashboardShell user={user} title="Cohortes">
      <section className="grid gap-4 md:grid-cols-2">
        {cohorts.length === 0 ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm font-medium text-slate-500 md:col-span-2">
            Aucune cohorte enregistrée.
          </p>
        ) : null}
        {cohorts.map((cohort) => (
          <article className="rounded-lg bg-white p-5 shadow-sm" key={cohort.name}>
            <p className="text-sm font-black uppercase text-brand-gold">{cohort.type}</p>
            <h2 className="mt-2 text-xl font-black text-brand-blue">{cohort.name}</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Début: {cohort.start_date ?? "Non planifié"} · {cohort.is_active ? "Active" : "Inactive"}
            </p>
            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-brand-gold"
                style={{ width: `${Math.min(100, Math.round((cohort.enrolled / Math.max(cohort.max_size, 1)) * 100))}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-500">
              {cohort.enrolled}/{cohort.max_size} inscrits
            </p>
            <CohortNameForm id={cohort.id} name={cohort.name} />
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
