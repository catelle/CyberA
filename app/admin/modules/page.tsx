import { AdminModuleManager } from "@/components/forms/AdminModuleManager";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listModulesWithFallback } from "@/lib/db/cybera";

export default async function AdminModulesPage() {
  const user = await requireRole(["admin"]);
  const modules = await listModulesWithFallback();

  return (
    <DashboardShell user={user} title="CMS modules">
      <AdminModuleManager modules={modules} />
    </DashboardShell>
  );
}
