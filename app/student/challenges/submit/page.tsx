import { DashboardShell } from "@/components/layout/DashboardShell";
import { ChallengeSubmissionForm } from "@/components/forms/ChallengeSubmissionForm";
import { requireRole } from "@/lib/auth/guards";
import { weeklyChallenges } from "@/lib/program";

export default async function ChallengeSubmitPage() {
  const user = await requireRole(["student"]);
  const activeChallenge = weeklyChallenges[0];

  return (
    <DashboardShell user={user} title="Soumettre un defi">
      <ChallengeSubmissionForm challenge={activeChallenge} userId={user.id} />
    </DashboardShell>
  );
}
