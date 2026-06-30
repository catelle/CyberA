import { DashboardShell } from "@/components/layout/DashboardShell";
import { AdminReviewActions } from "@/components/forms/AdminReviewActions";
import { requireRole } from "@/lib/auth/guards";
import { listChallengeSubmissionsWithFallback } from "@/lib/db/cybera";

export default async function AdminSubmissionsPage() {
  const user = await requireRole(["admin"]);
  const submissions = await listChallengeSubmissionsWithFallback();

  return (
    <DashboardShell user={user} title="Soumissions">
      <section className="grid gap-4">
        {submissions.map((submission: any) => (
          <article className="rounded-lg bg-white p-5 shadow-sm" key={submission.id}>
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-black uppercase text-brand-gold">
                  {submission.challenges?.points ?? 50} points
                </p>
                <h2 className="mt-2 text-xl font-black text-brand-blue">
                  {submission.challenges?.title ?? "Soumission defi"}
                </h2>
                <p className="mt-2 leading-7 text-slate-600">
                  {submission.report_text ?? "Aucun rapport."}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {submission.users?.full_name ?? "Ambassadeur"} /{" "}
                  {submission.users?.city ?? "Ville inconnue"} /{" "}
                  {submission.ambassador_profiles?.total_points ?? 0} pts
                </p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500">
                {submission.status}
              </span>
            </div>
            {submission.photo_url ? (
              <p className="mt-3 text-sm font-bold text-brand-blue">
                Photo: {submission.photo_url}
              </p>
            ) : null}
            <AdminReviewActions
              defaultPoints={submission.challenges?.points ?? 50}
              id={submission.id}
              target="submission"
            />
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
