import { DashboardShell } from "@/components/layout/DashboardShell";
import { StrikeGame } from "@/components/strike/StrikeGame";
import { requireAmbassadorTrack, requireRole } from "@/lib/auth/guards";

export default async function StrikePage() {
  const user = requireAmbassadorTrack(await requireRole(["student"]));

  return (
    <DashboardShell user={user} title="Strike">
      <StrikeGame />
    </DashboardShell>
  );
}
