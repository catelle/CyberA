import { ParentChallengeForm } from "@/components/forms/ParentChallengeForm";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listParentChallengeInvitations } from "@/lib/db/cybera";

const labels: Record<string, string> = {
  invited: "Invitation recue",
  submitted: "En attente de validation",
  approved: "Approuve",
  rejected: "A corriger"
};

export default async function ParentChallengePage() {
  const user = await requireRole(["parent"]);
  const invitations = await listParentChallengeInvitations(user.supabaseUserId);

  return (
    <DashboardShell user={user} title="Defis recus">
      <section className="grid gap-4">
        {invitations.length === 0 ? (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-brand-ink">Aucune invitation pour le moment</h2>
            <p className="mt-2 text-slate-600">Votre enfant pourra vous inviter apres la revision de son propre defi.</p>
          </div>
        ) : null}
        {invitations.map((invitation: any) => (
          <article className="rounded-lg bg-white p-5 shadow-sm" key={invitation.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase text-brand-gold">Defi lance par {invitation.child?.full_name ?? "votre enfant"}</p>
                <h2 className="mt-2 text-2xl font-black text-brand-ink">{invitation.challenge?.title ?? "Defi famille"}</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-600">{labels[invitation.status] ?? invitation.status}</span>
            </div>
            <p className="mt-3 leading-7 text-slate-600">{invitation.challenge?.description}</p>
            {invitation.message ? <p className="mt-3 rounded-lg bg-rose-50 p-3 font-bold text-primary">{invitation.message}</p> : null}
            {invitation.status === "invited" || invitation.status === "rejected" ? <ParentChallengeForm invitationId={invitation.id} /> : null}
            {invitation.report_text ? <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600"><strong>Rapport:</strong> {invitation.report_text}</p> : null}
            {invitation.reviewer_note ? <p className="mt-3 text-sm font-bold text-slate-600">Note admin: {invitation.reviewer_note}</p> : null}
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
