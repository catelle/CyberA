import { DashboardShell } from "@/components/layout/DashboardShell";
import { ParentLinkForm } from "@/components/forms/ParentLinkForm";
import { requireRole } from "@/lib/auth/guards";

export default async function ParentLinkPage() {
  const user = await requireRole(["parent"]);

  return (
    <DashboardShell user={user} title="Lien enfant">
      <ParentLinkForm />
    </DashboardShell>
  );
}
