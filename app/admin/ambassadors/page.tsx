import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listAdminStudents } from "@/lib/db/cybera";

export default async function AdminAmbassadorsPage() {
  const user = await requireRole(["admin"]);
  const students = await listAdminStudents();

  return (
    <DashboardShell user={user} title="Eleves">
      <section className="overflow-hidden rounded-lg bg-white shadow-sm">
        {students.length === 0 ? (
          <p className="p-6 text-center text-sm font-medium text-slate-500">
            Aucun eleve enregistre.
          </p>
        ) : null}
        {students.map((student) => (
          <div
            className="grid gap-3 border-b border-slate-100 p-4 md:grid-cols-[1fr_8rem_8rem_8rem_auto] md:items-center"
            key={student.id}
          >
            <div>
              <h2 className="font-black text-brand-blue">{student.name}</h2>
              <p className="text-sm text-slate-600">
                {student.city} / {student.cohort}
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
            <p className="font-bold text-slate-500">Eleve</p>
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
    </DashboardShell>
  );
}
import Link from "next/link";
import { ArrowRight } from "lucide-react";
