import { DashboardShell } from "@/components/layout/DashboardShell";
import { CapstoneSubmissionForm } from "@/components/forms/CapstoneSubmissionForm";
import { requireRole } from "@/lib/auth/guards";

export default async function CapstonePage() {
  const user = await requireRole(["student"]);

  return (
    <DashboardShell user={user} title="Capstone">
      <CapstoneSubmissionForm userId={user.id} />
    </DashboardShell>
  );
}
