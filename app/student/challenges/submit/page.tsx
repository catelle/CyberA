import { DashboardShell } from "@/components/layout/DashboardShell";
import { ChallengeSubmissionForm } from "@/components/forms/ChallengeSubmissionForm";
import { requireRole } from "@/lib/auth/guards";
import { listActiveChallengesWithFallback } from "@/lib/db/cybera";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function ChallengeSubmitPage() {
  const user = await requireRole(["student"]);
  const activeChallenge = (await listActiveChallengesWithFallback(1))[0];
  const onlineSubmissionsEnabled = uuidPattern.test(activeChallenge.id);

  return (
    <DashboardShell user={user} title="Soumettre un defi">
      <ChallengeSubmissionForm
        challenge={activeChallenge}
        onlineSubmissionsEnabled={onlineSubmissionsEnabled}
        userId={user.id}
      />
    </DashboardShell>
  );
}
