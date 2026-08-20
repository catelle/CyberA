import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listNotificationsForUser } from "@/lib/db/cybera";
import { NotificationCards } from "@/components/notifications/NotificationCards";

export default async function NotificationsPage() {
  const user = await requireRole(["student"]);
  const notifications = await listNotificationsForUser(user.supabaseUserId);

  return (
    <DashboardShell user={user} title="Notifications">
      <section className="grid gap-3">
        {notifications.length === 0 ? <p className="rounded-xl bg-white p-5 text-slate-500">{user.language === "en" ? "No notifications yet." : "Aucune notification pour le moment."}</p> : null}
        <NotificationCards notifications={notifications as any} />
      </section>
    </DashboardShell>
  );
}
