import { Star } from "lucide-react";

import { AdminFeedbackReviewActions } from "@/components/forms/AdminFeedbackReviewActions";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listModuleFeedbackForAdmin } from "@/lib/db/module-feedback";

const labels = { pending: "En attente", approved: "Publie", rejected: "Rejete" };
const paceLabels: Record<string, string> = { too_slow: "Trop lent", just_right: "Bon rythme", too_fast: "Trop rapide" };

export default async function AdminFeedbackPage() {
  const user = await requireRole(["admin"]);
  const feedback = await listModuleFeedbackForAdmin();
  return (
    <DashboardShell user={user} title="Avis et temoignages">
      <div className="grid gap-4">
        {feedback.length === 0 ? <p className="rounded-xl bg-white p-5 font-semibold text-slate-500">Aucun avis recu.</p> : null}
        {feedback.map((item) => (
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" key={item.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><h2 className="font-display text-xl font-black text-brand-blue">{item.learnerName}</h2><p className="text-sm font-bold text-slate-500">{item.moduleTitle}</p></div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase">{labels[item.status]}</span>
            </div>
            <div className="mt-3 flex gap-1" aria-label={`${item.rating} etoiles`}>{[1,2,3,4,5].map((star) => <Star className={star <= item.rating ? "h-5 w-5 fill-brand-gold text-brand-gold" : "h-5 w-5 text-slate-300"} key={star} />)}</div>
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-rose-50 p-3"><dt className="text-xs font-black uppercase text-slate-500">Comprehension</dt><dd className="mt-1 font-black text-brand-blue">{item.understandingRating ? `${item.understandingRating}/5` : "Ancien avis"}</dd></div>
              <div className="rounded-lg bg-rose-50 p-3"><dt className="text-xs font-black uppercase text-slate-500">Utilite</dt><dd className="mt-1 font-black text-brand-blue">{item.usefulnessRating ? `${item.usefulnessRating}/5` : "Ancien avis"}</dd></div>
              <div className="rounded-lg bg-rose-50 p-3"><dt className="text-xs font-black uppercase text-slate-500">Rythme</dt><dd className="mt-1 font-black text-brand-blue">{item.pace ? paceLabels[item.pace] ?? item.pace : "Ancien avis"}</dd></div>
            </dl>
            <blockquote className="mt-3 rounded-lg bg-slate-50 p-4 font-semibold leading-7 text-slate-700">“{item.feedback}”</blockquote>
            {item.suggestions ? <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4"><p className="text-xs font-black uppercase text-amber-800">Suggestions</p><p className="mt-2 font-semibold leading-7 text-slate-700">{item.suggestions}</p></div> : null}
            <p className="mt-2 text-xs font-bold text-slate-500">Publication autorisee: {item.publishConsent ? "oui" : "non"}</p>
            {item.status === "pending" ? <AdminFeedbackReviewActions id={item.id} /> : null}
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
