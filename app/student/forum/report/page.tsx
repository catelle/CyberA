import { DashboardShell } from "@/components/layout/DashboardShell";
import { ForumReportForm } from "@/components/forms/ForumReportForm";
import { requireAmbassadorTrack, requireRole } from "@/lib/auth/guards";

export default async function ForumReportPage() {
  const user = requireAmbassadorTrack(await requireRole(["student"]));

  return (
    <DashboardShell user={user} title="Nouveau rapport forum">
      <ForumReportForm userId={user.id} />
    </DashboardShell>
  );
}
