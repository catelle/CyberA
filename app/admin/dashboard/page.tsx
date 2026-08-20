import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardCheck } from "lucide-react";

import { AutoRefresh } from "@/components/admin/AutoRefresh";
import { AdminProgressApprovalButton } from "@/components/forms/AdminProgressApprovalButton";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import {
  getAdminOperationalMetrics,
  getSupabaseUserRoleCounts,
  listAdminStudents,
  listCohortsFromDatabase,
  listPendingModuleApprovals,
  listModulesFromDatabase
} from "@/lib/db/cybera";
import { formatDuration, formatRelativeTime } from "@/lib/format/duration";
import { getDictionary } from "@/lib/i18n/dictionary";

function describeLocation(path: string | null) {
  if (!path) return "Emplacement inconnu";
  if (path.includes("/lesson/")) return path.endsWith("/quiz") ? "Quiz de lecon" : "Lecon en cours";
  if (path.endsWith("/quiz")) return "Quiz de module";
  if (path.startsWith("/student/modules")) return "Espace modules";
  if (path.startsWith("/student/challenges")) return "Defis";
  if (path.startsWith("/student/forum")) return "Forum";
  if (path.startsWith("/student/leaderboard")) return "Classement";
  if (path.startsWith("/student/dashboard")) return "Accueil eleve";
  return path;
}

export default async function AdminDashboardPage() {
  const user = await requireRole(["admin", "facilitator"]);
  const t = getDictionary(user.language);
  const [counts, metrics, modules, cohorts, students, pendingApprovals] = await Promise.all([
    getSupabaseUserRoleCounts(),
    getAdminOperationalMetrics(),
    listModulesFromDatabase(),
    listCohortsFromDatabase(),
    listAdminStudents(),
    listPendingModuleApprovals()
  ]);
  const connectedStudents = students
    .filter((student) => student.presence.isOnline)
    .sort((left, right) => left.name.localeCompare(right.name));

  const stats = [
    { label: "Connectes", value: connectedStudents.length },
    { label: "Eleves", value: counts.students },
    { label: "Parents", value: counts.parents },
    { label: "Admins", value: counts.admins },
    { label: "Certifies", value: metrics.certifiedAmbassadors },
    { label: "Soumissions", value: metrics.pendingChallengeSubmissions },
    { label: "Acces modules", value: pendingApprovals.length },
    { label: "Forum", value: metrics.pendingForumReports },
    { label: "Cohortes", value: metrics.activeCohorts },
    { label: "Liens parents", value: metrics.parentAccountsLinked },
    { label: "Consentements", value: counts.consented }
  ];

  return (
    <DashboardShell user={user} title={t.adminDashboard}>
      <AutoRefresh />
      <div className="grid gap-5">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <article className="rounded-lg bg-white p-5 shadow-sm" key={stat.label}>
              <p className="text-sm font-bold text-slate-500">{stat.label}</p>
              <p className="mt-2 text-4xl font-black text-brand-blue">{stat.value}</p>
            </article>
          ))}
        </section>

        <section className="rounded-lg border-2 border-amber-300 bg-amber-50 p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <ClipboardCheck aria-hidden className="mt-1 h-6 w-6 shrink-0 text-amber-700" />
            <div className="min-w-0">
              <p className="text-sm font-black uppercase text-amber-700">Approbations requises</p>
              <h2 className="mt-1 break-words text-2xl font-black text-brand-ink">
                Demandes d&apos;acces au module suivant ({pendingApprovals.length})
              </h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {pendingApprovals.length === 0 ? (
              <p className="font-semibold text-slate-600">Aucune demande en attente.</p>
            ) : null}
            {pendingApprovals.map((approval) => (
              <article className="grid min-w-0 gap-3 rounded-lg border border-amber-200 bg-white p-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center" key={approval.progressId}>
                <div className="min-w-0">
                  <Link className="break-words font-black text-brand-blue hover:underline" href={`/admin/ambassadors/${approval.studentId}`}>
                    {approval.studentName}
                  </Link>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    {approval.moduleTitle} termine · demande l&apos;acces au module {approval.moduleOrder + 1}
                  </p>
                </div>
                {user.role === "admin" ? (
                  <AdminProgressApprovalButton progressId={approval.progressId} />
                ) : (
                  <span className="text-sm font-bold text-amber-800">Validation admin requise</span>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-black uppercase text-brand-gold">En direct</p>
              <h2 className="mt-2 text-2xl font-black text-brand-ink">
                Eleves connectes ({connectedStudents.length})
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Actualise automatiquement chaque minute.
              </p>
            </div>
            <Link
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg bg-brand-blue px-4 font-black text-white transition hover:bg-brand-ink"
              href="/student/modules"
            >
              <BookOpen aria-hidden className="h-4 w-4" />
              Ouvrir l&apos;espace eleve
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {connectedStudents.length === 0 ? (
              <p className="text-sm font-semibold text-slate-500">
                Aucun eleve connecte pour le moment.
              </p>
            ) : null}
            {connectedStudents.map((student) => (
              <Link
                className="grid gap-3 rounded-lg border border-slate-200 p-4 transition hover:border-brand-blue sm:grid-cols-[1fr_10rem_10rem_auto] sm:items-center"
                href={`/admin/ambassadors/${student.id}`}
                key={student.id}
              >
                <div>
                  <p className="flex items-center gap-2 font-black text-brand-blue">
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    {student.name}
                  </p>
                  <p className="text-sm text-slate-600">{student.cohort}</p>
                </div>
                <div>
                  <p className="text-sm font-black text-brand-ink">
                    {describeLocation(student.presence.lastPath)}
                  </p>
                  <p className="text-xs font-bold text-slate-500">
                    {formatRelativeTime(student.presence.lastSeenAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-black text-brand-ink">
                    {student.modulesCompleted}/{student.publishedModules} modules
                  </p>
                  <p className="text-xs font-bold text-slate-500">
                    {formatDuration(student.learningSeconds)} d&apos;apprentissage
                  </p>
                </div>
                <ArrowRight aria-hidden className="hidden h-4 w-4 text-slate-400 sm:block" />
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-black uppercase text-brand-gold">Modules</p>
            <h2 className="mt-2 text-2xl font-black text-brand-ink">
              Etat de publication du parcours
            </h2>
            <div className="mt-5 grid gap-3">
              {modules.map((module) => (
                <div
                  className="flex flex-col justify-between gap-2 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center"
                  key={module.id}
                >
                  <div>
                    <p className="text-sm font-black text-brand-gold">
                      Module {module.order_index}
                    </p>
                    <h3 className="font-black text-brand-blue">{module.title}</h3>
                  </div>
                  <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500">
                    {module.is_published ? "Publié" : "Brouillon"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-brand-blue p-5 text-white shadow-sm">
            <p className="text-sm font-black uppercase text-brand-gold">Cohortes</p>
            <h2 className="mt-2 text-2xl font-black">Parcours disponibles</h2>
            <div className="mt-5 grid gap-3">
              {cohorts.map((cohort) => (
                <div className="rounded-lg bg-white/10 p-4" key={cohort.name}>
                  <h3 className="font-black">{cohort.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    {cohort.type} · {cohort.enrolled}/{cohort.max_size} inscrits
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
