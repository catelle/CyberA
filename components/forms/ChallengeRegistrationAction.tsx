"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { WeeklyChallenge } from "@/lib/program";

export function ChallengeRegistrationAction({ challenge }: { challenge: WeeklyChallenge }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (challenge.registrationStatus === "registered") {
    return (
      <div>
        <Link className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-blue px-4 font-black text-white" href="/student/challenges/submit">Completer et envoyer le rapport</Link>
        <p className="mt-2 text-xs font-bold text-slate-500">Echeance: {challenge.registrationDeadline ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(challenge.registrationDeadline)) : "3 jours"}</p>
      </div>
    );
  }
  if (challenge.registrationStatus === "submitted") {
    if (!challenge.submissionStatus || challenge.submissionStatus === "pending") {
      return <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm font-black text-amber-900">Soumis · En attente de revision</p>;
    }

    return (
      <details className={challenge.submissionStatus === "approved" ? "rounded-lg bg-emerald-50 p-3 text-emerald-900" : "rounded-lg bg-rose-50 p-3 text-rose-900"}>
        <summary className="cursor-pointer text-sm font-black">
          {challenge.submissionStatus === "approved" ? "Approuve · Voir la revision" : "A ameliorer · Voir la revision"}
        </summary>
        <div className="mt-3 border-t border-current/15 pt-3 text-sm font-semibold leading-6">
          <p>{challenge.reviewerNote || (challenge.submissionStatus === "approved" ? "Excellent travail. Continue ainsi pour le prochain defi." : "Relis les consignes et applique les recommandations au prochain defi.")}</p>
          <p className="mt-2 font-black">XP attribue: {challenge.pointsAwarded ?? 0}</p>
          {challenge.reviewedAt ? <p className="mt-1 text-xs opacity-70">Revise le {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(challenge.reviewedAt))}</p> : null}
        </div>
      </details>
    );
  }
  if (challenge.registrationStatus === "cooldown") {
    return <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm font-black text-amber-900">Inscription fermee jusqu&apos;au {challenge.cooldownUntil ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(challenge.cooldownUntil)) : "terme du delai"}</p>;
  }

  return (
    <div>
      <button
        className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-4 font-black text-white disabled:opacity-60"
        disabled={isSubmitting}
        onClick={async () => {
          setIsSubmitting(true);
          setError(null);
          const response = await fetch("/api/student/challenge-registrations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ challengeId: challenge.id })
          });
          const result = (await response.json().catch(() => null)) as { message?: string } | null;
          if (!response.ok) setError(result?.message ?? "Inscription impossible.");
          else router.refresh();
          setIsSubmitting(false);
        }}
        type="button"
      >
        {isSubmitting ? "Inscription..." : "S'inscrire au defi"}
      </button>
      {error ? <p className="mt-2 text-sm font-bold text-red-700">{error}</p> : null}
    </div>
  );
}
