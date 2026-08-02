import Link from "next/link";
import { ArrowLeft, Target } from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { ChallengeSubmissionForm } from "@/components/forms/ChallengeSubmissionForm";
import { requireRole } from "@/lib/auth/guards";
import { listActiveChallengesWithFallback } from "@/lib/db/cybera";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function ChallengeSubmitPage() {
  const user = await requireRole(["student"]);
  const activeChallenge = (await listActiveChallengesWithFallback(20, user.supabaseUserId)).find(
    (challenge) => challenge.registrationStatus === "registered"
  );

  if (!activeChallenge) {
    return (
      <DashboardShell user={user} title="Soumettre un défi">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
          <Target aria-hidden className="mx-auto h-10 w-10 text-slate-400" />
          <h2 className="mt-4 font-display text-2xl font-extrabold text-slate-900">
            Aucune inscription active
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600">
            Inscris-toi d&apos;abord à un défi. Tu disposeras ensuite de 3 jours pour envoyer ton rapport.
          </p>
          <Link
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-bold text-primary transition hover:bg-primary-fixed"
            href="/student/challenges"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Retour aux défis
          </Link>
        </section>
      </DashboardShell>
    );
  }

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
