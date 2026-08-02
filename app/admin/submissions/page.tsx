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
        {submissions.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <h2 className="font-display text-xl font-black text-brand-ink">
              Aucune soumission pour le moment
            </h2>
            <p className="mt-2 font-semibold text-slate-500">
              Les rapports envoyes par les eleves apparaitront ici.
            </p>
          </div>
        ) : null}
        {submissions.map((submission: any) => (
          <article className="rounded-lg bg-white p-4 shadow-sm" key={submission.id}>
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-black uppercase text-brand-gold">
                  {submission.challenges?.points ?? 50} points
                </p>
                <h2 className="mt-2 text-xl font-black text-brand-blue">
                  {submission.challenges?.title ?? "Soumission defi"}
                </h2>
                <p className="mt-2 max-h-24 overflow-y-auto leading-7 text-slate-600">
                  {submission.report_text ?? "Aucun rapport."}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {submission.users?.full_name ?? "Eleve"} /{" "}
                  {submission.users?.city ?? "Ville inconnue"} /{" "}
                  {submission.ambassador_profiles?.total_points ?? 0} pts
                </p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500">
                {submission.status}
              </span>
            </div>
            {submission.photo_signed_url ? (
              <figure className="mt-4 w-full max-w-md overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50 p-2">
                <img
                  alt={`Preuve envoyee par ${submission.users?.full_name ?? "l'eleve"}`}
                  className="h-48 w-full rounded-lg object-cover"
                  src={submission.photo_signed_url}
                />
                <figcaption className="flex flex-wrap items-center justify-between gap-2 px-2 pb-1 pt-3 text-sm font-bold text-slate-500">
                  <span>Photo soumise comme preuve</span>
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href={submission.photo_signed_url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Ouvrir en plein ecran
                  </a>
                </figcaption>
              </figure>
            ) : submission.photo_url ? (
              <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm font-bold text-amber-900">
                La photo existe, mais son apercu est temporairement indisponible.
              </p>
            ) : null}
            {submission.status === "pending" ? (
              <AdminReviewActions
                defaultPoints={submission.challenges?.points ?? 50}
                id={submission.id}
                target="submission"
              />
            ) : (
              <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-600">
                <p className="font-black text-brand-ink">
                  Revision terminee · {submission.status === "approved" ? `${submission.points_awarded ?? 0} XP attribues` : "Nouvelle tentative possible apres 3 jours"}
                </p>
                {submission.reviewer_note ? <p className="mt-1">{submission.reviewer_note}</p> : null}
              </div>
            )}
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
