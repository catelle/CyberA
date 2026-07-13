import { redirect } from "next/navigation";

import { dashboardForRole } from "@/lib/auth/roles";
import { requireAuthenticatedUser } from "@/lib/auth/guards";

export default async function DashboardAliasPage() {
  const user = await requireAuthenticatedUser();
  redirect(dashboardForRole(user.role));
}
