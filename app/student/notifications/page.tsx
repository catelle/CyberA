import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listNotificationsForUser } from "@/lib/db/cybera";

export default async function NotificationsPage() {
  const user = await requireRole(["student"]);
  const notifications = await listNotificationsForUser(user.supabaseUserId);

  return (
    <DashboardShell user={user} title="Notifications">
      <section className="grid gap-3">
        {notifications.length === 0 ? <p className="rounded-xl bg-white p-5 text-slate-500">{user.language === "en" ? "No notifications yet." : "Aucune notification pour le moment."}</p> : null}
        {notifications.map((notification: any) => (
          <article
            className={
              notification.read
                ? "rounded-lg bg-white p-5 shadow-sm"
                : "rounded-lg border border-brand-gold bg-white p-5 shadow-sm"
            }
            key={notification.id}
          >
            <p className="text-sm font-black uppercase text-brand-gold">
              {notification.type}
            </p>
            <h2 className="mt-2 text-xl font-black text-brand-blue">
              {notification.title}
            </h2>
            <p className="mt-2 leading-7 text-slate-600">{notification.body}</p>
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
