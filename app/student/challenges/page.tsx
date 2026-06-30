import Link from "next/link";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { weeklyChallenges } from "@/lib/program";

export default async function ChallengesPage() {
  const user = await requireRole(["student"]);
  const activeChallenge = weeklyChallenges[0];

  return (
    <DashboardShell user={user} title="Defis">
      <div className="grid gap-5">
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-black uppercase text-brand-gold">Defi actif</p>
          <h2 className="mt-2 text-2xl font-black text-brand-ink">
            {activeChallenge.title}
          </h2>
          <p className="mt-3 leading-7 text-slate-600">{activeChallenge.description}</p>
          <div className="mt-5 grid gap-2">
            {activeChallenge.instructions.map((instruction) => (
              <p className="rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700" key={instruction}>
                {instruction}
              </p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand-sky px-3 py-1 text-sm font-black text-brand-blue">
              {activeChallenge.points} points
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-black text-amber-800">
              Deadline: {activeChallenge.deadline}
            </span>
            <Link
              className="inline-flex min-h-12 items-center rounded-lg bg-brand-blue px-4 font-black text-white transition hover:bg-brand-ink"
              href="/student/challenges/submit"
            >
              Soumettre
            </Link>
          </div>
        </section>

        <section className="grid gap-3">
          {weeklyChallenges.map((challenge) => (
            <article className="rounded-lg bg-white p-4 shadow-sm" key={challenge.id}>
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-black text-brand-blue">{challenge.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{challenge.description}</p>
                </div>
                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500">
                  {challenge.status}
                </span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
