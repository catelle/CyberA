import Link from "next/link";

import { ParentChallengeForm } from "@/components/forms/ParentChallengeForm";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listActiveChallenges, listParentChildren } from "@/lib/db/cybera";

export default async function ParentChallengePage() {
  const user = await requireRole(["parent"]);
  const [children, challenges] = await Promise.all([
    listParentChildren(user.supabaseUserId),
    listActiveChallenges(1)
  ]);
  const challenge = challenges[0];

  return (
    <DashboardShell user={user} title="Defi parent">
      <section className="grid gap-5 rounded-lg bg-white p-5 shadow-sm">
        {children.length === 0 ? (
          <div>
            <p className="text-sm font-black uppercase text-brand-gold">Lien enfant</p>
            <h2 className="mt-2 text-2xl font-black text-brand-ink">
              Ajoutez un enfant avant d&apos;accepter un defi parent
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Les defis parent sont rattaches a un ambassadeur lie a votre compte.
            </p>
            <Link
              className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-brand-blue px-5 font-black text-white transition hover:bg-brand-ink"
              href="/parent/link"
            >
              Ajouter un enfant
            </Link>
          </div>
        ) : !challenge ? (
          <div>
            <p className="text-sm font-black uppercase text-brand-gold">Bonus famille</p>
            <h2 className="mt-2 text-2xl font-black text-brand-ink">
              Aucun defi actif pour le moment
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Revenez lorsque l&apos;equipe programme aura publie un nouveau defi.
            </p>
          </div>
        ) : (
          <>
            <div>
              <p className="text-sm font-black uppercase text-brand-gold">
                Bonus famille
              </p>
              <h2 className="mt-2 text-2xl font-black text-brand-ink">
                Accompagner: {challenge.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {challenge.description}
              </p>
            </div>
            <ParentChallengeForm
              challengeId={challenge.id}
              childOptions={children.map((child) => ({
                id: child.id,
                fullName: child.fullName
              }))}
            />
          </>
        )}
      </section>
    </DashboardShell>
  );
}
