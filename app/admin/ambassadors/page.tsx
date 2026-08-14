import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listAdminStudents } from "@/lib/db/cybera";
import { formatDuration, formatRelativeTime } from "@/lib/format/duration";
import { AdminStudentInvitationForm } from "@/components/forms/AdminStudentInvitationForm";

export default async function AdminAmbassadorsPage() {
  const user = await requireRole(["admin"]);
  const students = await listAdminStudents();
  const onlineCount = students.filter((student) => student.presence.isOnline).length;

  return (
    <DashboardShell user={user} title="Eleves">
      <div className="grid gap-6">
      <AdminStudentInvitationForm />

      <section className="rounded-lg bg-white p-4 shadow-sm">
        <p className="text-sm font-bold text-slate-500">
          <span className="font-black text-brand-blue">{onlineCount}</span> eleve(s) connecte(s)
          sur {students.length}. La pastille verte suit les eleves actifs dans les 3 dernieres
          minutes.
        </p>
      </section>

      <section className="overflow-hidden rounded-lg bg-white shadow-sm">
        {students.length === 0 ? (
          <p className="p-6 text-center text-sm font-medium text-slate-500">
            Aucun eleve enregistre.
          </p>
        ) : null}
        {students.map((student) => (
          <div
            className="grid gap-3 border-b border-slate-100 p-4 md:grid-cols-[1fr_8rem_8rem_9rem_auto] md:items-center"
            key={student.id}
          >
            <div>
              <h2 className="flex items-center gap-2 font-black text-brand-blue">
                <span
                  aria-hidden
                  className={
                    "h-2.5 w-2.5 shrink-0 rounded-full " +
                    (student.presence.isOnline ? "bg-emerald-500" : "bg-slate-300")
                  }
                />
                {student.name}
              </h2>
              <p className="text-sm text-slate-600">
                {student.city} / {student.cohort}
              </p>
              <p className="text-xs font-bold text-slate-500">
                {student.presence.isOnline
                  ? "En ligne"
                  : formatRelativeTime(student.presence.lastSeenAt)}
              </p>
            </div>
            <p className="font-black capitalize text-brand-ink">{student.level}</p>
            <div>
              <p className="font-black text-brand-gold">
                {student.performanceScore === null
                  ? "Pas de score"
                  : `${student.performanceScore}%`}
              </p>
              <p className="text-xs font-bold text-slate-500">
                {student.points} pts recompense
              </p>
            </div>
            <div>
              <p className="font-black text-brand-ink">
                {student.modulesCompleted}/{student.publishedModules} modules
              </p>
              <p className="text-xs font-bold text-slate-500">
                {formatDuration(student.learningSeconds)} d&apos;apprentissage
              </p>
            </div>
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 font-black text-white transition hover:bg-brand-ink"
              href={`/admin/ambassadors/${student.id}`}
            >
              Details
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </section>
      </div>
    </DashboardShell>
  );
}
