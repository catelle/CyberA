import { AdminBroadcastForm } from "@/components/forms/AdminBroadcastForm";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";

export default async function AdminNotificationsPage() {
  const user = await requireRole(["admin"]);

  return (
    <DashboardShell user={user} title="Broadcast">
      <AdminBroadcastForm />
    </DashboardShell>
  );
}
