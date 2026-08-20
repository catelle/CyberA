import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Award,
  BookCheck,
  ClipboardCheck,
  Flag,
  GraduationCap,
  Timer
} from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { AdminProgressApprovalButton } from "@/components/forms/AdminProgressApprovalButton";
import { requireRole } from "@/lib/auth/guards";
import { getAdminStudentActivityDetail } from "@/lib/db/cybera";
import { formatDuration, formatRelativeTime } from "@/lib/format/duration";

type StudentActivityPageProps = {
  params: { id: string };
};

const statusLabels: Record<string, string> = {
  not_started: "Non commence",
  in_progress: "En cours",
  completed: "Termine",
  pending: "En attente",
  approved: "Approuve",
  rejected: "Rejete",
  verified: "Verifie",
  actioned: "Traite"
};

function formatDate(value: string | null) {
  if (!value) return "Date non disponible";

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Douala"
  }).format(new Date(value));
}

export default async function StudentActivityPage({ params }: StudentActivityPageProps) {
  const user = await requireRole(["admin", "facilitator"]);
  const detail = await getAdminStudentActivityDetail(params.id);

  if (!detail) {
    notFound();
  }

  const totalActiveSeconds = detail.moduleProgress.reduce(
    (sum, module) => sum + module.activeSeconds,
    0
  );
  const summary = [
    { label: "Temps d'apprentissage", value: formatDuration(totalActiveSeconds), Icon: Timer },
    { label: "Lecons terminees", value: detail.totals.lessonsCompleted, Icon: BookCheck },
    { label: "Tentatives de quiz", value: detail.totals.quizAttempts, Icon: ClipboardCheck },
    { label: "Defis soumis", value: detail.totals.challengesSubmitted, Icon: Award },
    { label: "Signalements", value: detail.totals.reportsSubmitted, Icon: Flag },
    { label: "Projets capstone", value: detail.totals.capstonesSubmitted, Icon: GraduationCap }
  ];

  return (
    <DashboardShell user={user} title={`Activites - ${detail.student.fullName}`}>
      <div className="grid gap-5">
        <Link
          className="inline-flex w-fit items-center gap-2 font-black text-brand-blue hover:text-brand-ink"
          href="/admin/ambassadors"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Retour aux eleves
        </Link>

        <section className="grid gap-4 rounded-lg bg-brand-blue p-5 text-white shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-brand-gold">Fiche eleve</p>
            <h2 className="mt-2 font-display text-3xl font-black">{detail.student.fullName}</h2>
            <p className="mt-2 font-semibold text-white/75">
              {detail.student.city ?? "Ville non renseignee"} · {detail.student.cohort ?? "Sans cohorte"}
            </p>
            <p className="mt-1 text-sm text-white/70">
              Inscrit le {formatDate(detail.student.joinedAt)} · Consentement parental: {detail.student.parentalConsentGiven ? "oui" : "non"}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold">
              <span
                aria-hidden
                className={
                  "h-2.5 w-2.5 rounded-full " +
                  (detail.presence.isOnline ? "bg-emerald-400" : "bg-white/40")
                }
              />
              {detail.presence.isOnline
                ? "Connecte maintenant"
                : `Derniere connexion ${formatRelativeTime(detail.presence.lastSeenAt)}`}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-white/10 p-3">
              <p className="text-2xl font-black">{detail.student.totalPoints}</p>
              <p className="text-xs font-bold uppercase text-white/70">Points</p>
            </div>
            <div className="rounded-lg bg-white/10 p-3">
              <p className="text-2xl font-black">{detail.student.modulesCompleted}</p>
              <p className="text-xs font-bold uppercase text-white/70">Modules</p>
            </div>
            <div className="rounded-lg bg-white/10 p-3">
              <p className="text-lg font-black capitalize">{detail.student.level}</p>
              <p className="text-xs font-bold uppercase text-white/70">Niveau</p>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {summary.map(({ label, value, Icon }) => (
            <article className="rounded-lg bg-white p-4 shadow-sm" key={label}>
              <Icon aria-hidden className="h-5 w-5 text-brand-gold" />
              <p className="mt-3 text-3xl font-black text-brand-blue">{value}</p>
              <p className="mt-1 text-sm font-bold text-slate-500">{label}</p>
            </article>
          ))}
        </section>

        <section className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="font-display text-2xl font-black text-brand-ink">Progression des modules</h2>
          <div className="mt-4 grid gap-3">
            {detail.moduleProgress.length === 0 ? (
              <p className="text-sm font-semibold text-slate-500">Aucun module commence.</p>
            ) : null}
            {detail.moduleProgress.map((module) => (
              <article className="rounded-lg border border-slate-200 p-4" key={module.id}>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <h3 className="font-black text-brand-blue">{module.title}</h3>
                  <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-600">
                    {statusLabels[module.status] ?? module.status}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  {module.lessonsDone} lecon(s) · Score: {module.quizScore === null ? "Pas encore passe" : `${module.quizScore}%`} · {module.quizAttempts} tentative(s) · {module.pointsEarned} point(s)
                </p>
                <dl className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <dt className="text-xs font-black uppercase text-slate-500">
                      Temps passe dans le module
                    </dt>
                    <dd className="mt-1 font-black text-brand-blue">
                      {formatDuration(module.activeSeconds)}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <dt className="text-xs font-black uppercase text-slate-500">
                      {module.completedAt ? "Du debut a la fin" : "Depuis le debut"}
                    </dt>
                    <dd className="mt-1 font-black text-brand-blue">
                      {formatDuration(module.elapsedSeconds)}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <dt className="text-xs font-black uppercase text-slate-500">
                      {module.completedAt ? "Termine le" : "Commence le"}
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-slate-600">
                      {formatDate(module.completedAt ?? module.startedAt)}
                    </dd>
                  </div>
                </dl>
                {module.status === "completed" ? (
                  module.approvedAt ? (
                    <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm font-black text-emerald-800">
                      Progression approuvee le {formatDate(module.approvedAt)}. Le module suivant est accessible.
                    </p>
                  ) : user.role === "admin" ? (
                    <AdminProgressApprovalButton progressId={module.id} />
                  ) : null
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="font-display text-2xl font-black text-brand-ink">Toutes les activites</h2>
          <div className="mt-4 grid gap-3">
            {detail.activities.length === 0 ? (
              <p className="text-sm font-semibold text-slate-500">Aucune activite enregistree.</p>
            ) : null}
            {detail.activities.map((activity) => (
              <article className="grid gap-2 rounded-lg border-l-4 border-brand-gold bg-slate-50 p-4 sm:grid-cols-[1fr_auto]" key={activity.id}>
                <div>
                  <p className="text-xs font-black uppercase text-brand-gold">{activity.category}</p>
                  <h3 className="mt-1 font-black text-brand-blue">{activity.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{activity.description}</p>
                </div>
                <div className="sm:text-right">
                  <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-slate-600">
                    {statusLabels[activity.status] ?? activity.status}
                  </span>
                  <p className="mt-2 text-xs font-bold text-slate-500">{formatDate(activity.occurredAt)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
