import { DashboardShell } from "@/components/layout/DashboardShell";
import { AdminChallengeManager } from "@/components/forms/AdminChallengeManager";
import { requireRole } from "@/lib/auth/guards";
import { listChallengesForAdmin } from "@/lib/db/cybera";

export default async function AdminChallengesPage() {
  const user = await requireRole(["admin"]);
  const challenges = await listChallengesForAdmin();

  return (
    <DashboardShell user={user} title="Defis">
      <AdminChallengeManager challenges={challenges} />
    </DashboardShell>
  );
}
