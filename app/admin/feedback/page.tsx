import { Star } from "lucide-react";

import { AdminFeedbackReviewActions } from "@/components/forms/AdminFeedbackReviewActions";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listModuleFeedbackForAdmin } from "@/lib/db/module-feedback";

const labels = { pending: "En attente", approved: "Publie", rejected: "Rejete" };

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
            <blockquote className="mt-3 rounded-lg bg-slate-50 p-4 font-semibold leading-7 text-slate-700">“{item.feedback}”</blockquote>
            <p className="mt-2 text-xs font-bold text-slate-500">Publication autorisee: {item.publishConsent ? "oui" : "non"}</p>
            {item.status === "pending" ? <AdminFeedbackReviewActions id={item.id} /> : null}
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
