import { AdminBroadcastForm } from "@/components/forms/AdminBroadcastForm";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listAdminBroadcasts } from "@/lib/db/cybera";

export default async function AdminNotificationsPage() {
  const user = await requireRole(["admin"]);
  const broadcasts = await listAdminBroadcasts();

  return (
    <DashboardShell user={user} title="Broadcast">
      <div className="grid gap-6">
        <AdminBroadcastForm />
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-black uppercase text-brand-gold">Historique</p>
          <h2 className="mt-2 text-2xl font-black text-brand-ink">Notifications envoyees</h2>
          <div className="mt-5 grid gap-3">
            {broadcasts.length === 0 ? <p className="text-slate-500">Aucune notification envoyee.</p> : null}
            {broadcasts.map((broadcast: any) => (
              <article className="rounded-lg border border-slate-200 p-4" key={broadcast.data?.broadcast_id ?? broadcast.id}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-black text-brand-blue">{broadcast.title}</h3>
                  <span className="text-xs font-bold text-slate-500">{broadcast.recipientCount} destinataire(s) · {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(broadcast.created_at))}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{broadcast.body}</p>
                <p className="mt-2 text-xs font-black uppercase text-brand-gold">Audience: {broadcast.data?.audience ?? "inconnue"}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
