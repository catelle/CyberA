import Link from "next/link";
import { ArrowRight, Camera, CheckCircle2, Clock, Target } from "lucide-react";

import { MascotCoach } from "@/components/gamified/CyberMascot";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listActiveChallengesWithFallback } from "@/lib/db/cybera";

const statusLabels = {
  open: "Disponible",
  submitted: "Envoye",
  reviewed: "Valide"
};

export default async function ChallengesPage() {
  const user = await requireRole(["student"]);
  const challenges = await listActiveChallengesWithFallback();
  const activeChallenge = challenges[0];

  return (
    <DashboardShell user={user} title="Defis">
      <div className="grid gap-5 sm:gap-6">
        <section className="grid gap-5 overflow-hidden rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5 lg:grid-cols-[1fr_21rem] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-black uppercase text-primary">Defi actif</p>
            <h2 className="mt-2 break-words font-display text-2xl font-black leading-tight text-brand-ink sm:text-3xl">
              {activeChallenge.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">
              {activeChallenge.description}
            </p>
            <div className="mt-5 grid gap-3">
              {activeChallenge.instructions.map((instruction, index) => (
                <p
                  className="grid grid-cols-[auto_1fr] gap-3 rounded-lg border-2 border-secondary bg-surface-container-low p-3 text-sm font-bold text-slate-700 shadow-[0_3px_0_0_rgba(88,96,98,1)]"
                  key={instruction}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </p>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <span className="inline-flex min-h-10 items-center gap-2 rounded-full border-2 border-secondary bg-primary-fixed px-3 text-sm font-black text-brand-blue shadow-[0_2px_0_0_rgba(88,96,98,1)]">
                <Target aria-hidden className="h-4 w-4" />
                {activeChallenge.points} points
              </span>
              <span className="inline-flex min-h-10 items-center gap-2 rounded-full border-2 border-secondary bg-[#fff4c2] px-3 text-sm font-black text-amber-900 shadow-[0_2px_0_0_rgba(88,96,98,1)]">
                <Clock aria-hidden className="h-4 w-4" />
                {activeChallenge.deadline}
              </span>
              <Link
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-brand-blue px-4 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink sm:w-fit"
                href="/student/challenges/submit"
              >
                Soumettre
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <MascotCoach eyebrow="Mission terrain" mascotMood="focus">
            Le but n&apos;est pas juste de remplir un formulaire: raconte l&apos;action,
            ajoute une preuve si possible, puis laisse l&apos;equipe valider.
          </MascotCoach>
        </section>

        <section className="grid gap-3">
          {challenges.map((challenge, index) => (
            <article
              className="mission-card rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)]"
              key={challenge.id}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-secondary bg-primary-fixed text-primary shadow-[0_3px_0_0_rgba(88,96,98,1)]">
                  {challenge.requiresPhoto ? (
                    <Camera aria-hidden className="h-5 w-5" />
                  ) : (
                    <CheckCircle2 aria-hidden className="h-5 w-5" />
                  )}
                </span>
                <div className="min-w-0">
                  <h3 className="break-words font-display font-black text-brand-blue">
                    {challenge.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                    {challenge.description}
                  </p>
                </div>
                <span className="w-fit rounded-full border-2 border-secondary bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500 shadow-[0_2px_0_0_rgba(88,96,98,1)]">
                  {statusLabels[challenge.status]}
                </span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
