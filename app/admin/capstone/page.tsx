import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listCapstoneProjectsFromDatabase } from "@/lib/db/cybera";

export default async function AdminCapstonePage() {
  const user = await requireRole(["admin"]);
  const capstoneSubmissions = await listCapstoneProjectsFromDatabase();

  return (
    <DashboardShell user={user} title="Capstone">
      <section className="grid gap-4">
        {capstoneSubmissions.length === 0 ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm font-medium text-slate-500">
            Aucun projet capstone soumis.
          </p>
        ) : null}
        {capstoneSubmissions.map((submission: any) => (
          <article className="rounded-lg bg-white p-5 shadow-sm" key={submission.id}>
            <p className="text-sm font-black uppercase text-brand-gold">
              {submission.action_type}
            </p>
            <h2 className="mt-2 text-xl font-black text-brand-blue">
              {submission.title}
            </h2>
            <p className="mt-2 text-sm font-bold text-slate-500">
              {submission.users?.full_name ?? "Eleve"} / {submission.reach_count ?? 0} personnes
            </p>
            <span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500">
              {submission.status}
            </span>
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
