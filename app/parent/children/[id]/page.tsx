import Link from "next/link";
import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getParentChildActivityDetail } from "@/lib/db/cybera";

export default async function ParentChildDetailPage({ params }: { params: { id: string } }) {
  const user = await requireRole(["parent"]);
  const detail = await getParentChildActivityDetail(user.supabaseUserId, params.id);
  if (!detail) notFound();
  return (
    <DashboardShell user={user} title={`Compte de ${detail.student.fullName}`}>
      <div className="grid gap-5">
        <Link className="font-black text-primary hover:underline" href="/parent/dashboard">← Retour au suivi</Link>
        <section className="rounded-lg bg-brand-blue p-5 text-white shadow-sm">
          <h2 className="text-3xl font-black">{detail.student.fullName}</h2>
          <p className="mt-2 text-white/75">{detail.student.city ?? "Ville non renseignee"} · Niveau {detail.student.level}</p>
          <div className="mt-4 flex flex-wrap gap-3"><span className="rounded-full bg-white/10 px-4 py-2 font-black">{detail.student.totalPoints} points</span><span className="rounded-full bg-white/10 px-4 py-2 font-black">{detail.student.modulesCompleted} modules</span><span className="rounded-full bg-white/10 px-4 py-2 font-black">{detail.totals.challengesSubmitted} defis soumis</span></div>
        </section>
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black text-brand-ink">Progression des modules</h2>
          <div className="mt-4 grid gap-3">{detail.moduleProgress.map((module) => <article className="rounded-lg border border-slate-200 p-3" key={module.id}><div className="flex justify-between gap-3"><strong className="text-brand-blue">{module.title}</strong><span className="text-xs font-black uppercase text-slate-500">{module.status}</span></div><p className="mt-1 text-sm text-slate-600">{module.lessonsDone} lecons · Quiz {module.quizScore ?? 0}% · {module.pointsEarned} points</p></article>)}</div>
        </section>
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black text-brand-ink">Activites et soumissions</h2>
          <div className="mt-4 grid gap-3">{detail.activities.map((activity) => <article className="rounded-lg bg-slate-50 p-3" key={activity.id}><div className="flex flex-wrap justify-between gap-2"><strong className="text-brand-blue">{activity.title}</strong><span className="text-xs font-black uppercase text-slate-500">{activity.status}</span></div><p className="mt-1 text-sm text-slate-600">{activity.description}</p></article>)}</div>
        </section>
      </div>
    </DashboardShell>
  );
}
