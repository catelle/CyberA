import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { capstoneSubmissions } from "@/lib/program";

export default async function AdminCapstonePage() {
  const user = await requireRole(["admin"]);

  return (
    <DashboardShell user={user} title="Capstone">
      <section className="grid gap-4">
        {capstoneSubmissions.map((submission) => (
          <article className="rounded-lg bg-white p-5 shadow-sm" key={submission.id}>
            <p className="text-sm font-black uppercase text-brand-gold">
              {submission.actionType}
            </p>
            <h2 className="mt-2 text-xl font-black text-brand-blue">
              {submission.title}
            </h2>
            <p className="mt-2 text-sm font-bold text-slate-500">
              {submission.ambassadorName} / {submission.reachCount} personnes
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
