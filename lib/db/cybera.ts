import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import {
  getProgramCompletionPercent,
  getModuleById,
  programModules,
  type LessonContentBlock,
  type ProgramModule,
  type WeeklyChallenge
} from "@/lib/program";
import { lessonQuizBanks } from "@/lib/curriculum/lesson-quiz-banks";

async function listTestAuthUserIds() {
  const supabase = createSupabaseAdminClient();
  const ids = new Set<string>();
  for (let page = 1; ; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 100 });
    if (error) return ids;
    data.users.forEach((user) => {
      if (user.app_metadata?.is_test === true) ids.add(user.id);
    });
    if (data.users.length < 100) return ids;
  }
}

export type ModuleRow = {
  id: string;
  order_index: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  color: string | null;
  icon: string | null;
  video_url: string | null;
  is_published: boolean;
};

export type LessonRow = {
  id: string;
  module_id: string;
  order_index: number;
  title: string;
  content: unknown;
  estimated_mins: number | null;
  created_at: string | null;
};

export type ModuleWithLessons = ModuleRow & {
  lessons: LessonRow[];
  quiz_questions?: QuizQuestionRow[];
  is_application_fallback?: boolean;
};

export type QuizQuestionRow = {
  id: string;
  module_id: string;
  order_index: number;
  question: string;
  options: unknown;
  correct_index: number;
  explanation: string | null;
  points: number | null;
};

export type ParentChildSummary = {
  id: string;
  fullName: string;
  city: string | null;
  level: string;
  totalPoints: number;
  modulesCompleted: number;
  approvedChallenges: number;
  linkedAt: string | null;
};

export type ActiveChallengeRow = {
  id: string;
  title: string;
  description: string;
  instructions: string;
  points: number;
  week_start: string;
  requires_photo: boolean;
  requires_report: boolean;
  is_active: boolean;
};

export type StudentPlatformActivity = {
  id: string;
  category: "lesson" | "module" | "challenge" | "report" | "capstone";
  title: string;
  description: string;
  status: string;
  occurredAt: string | null;
};

export type AdminStudentActivityDetail = {
  student: {
    id: string;
    fullName: string;
    phone: string | null;
    city: string | null;
    joinedAt: string | null;
    cohort: string | null;
    level: string;
    totalPoints: number;
    modulesCompleted: number;
    certifiedAt: string | null;
    parentalConsentGiven: boolean;
  };
  totals: {
    lessonsCompleted: number;
    quizAttempts: number;
    challengesSubmitted: number;
    reportsSubmitted: number;
    capstonesSubmitted: number;
  };
  moduleProgress: Array<{
    id: string;
    title: string;
    status: string;
    lessonsDone: number;
    quizScore: number | null;
    quizAttempts: number;
    pointsEarned: number;
    moduleOrder: number | null;
    approvedAt: string | null;
    startedAt: string | null;
    completedAt: string | null;
    /** Measured reading time inside the module, heartbeat by heartbeat. */
    activeSeconds: number;
    /** Wall-clock span between the first and the last recorded activity. */
    elapsedSeconds: number | null;
  }>;
  activities: StudentPlatformActivity[];
  presence: LearnerPresence;
};

export type LearnerPresence = {
  lastSeenAt: string | null;
  lastPath: string | null;
  isOnline: boolean;
};

// A learner whose browser has not sent a heartbeat for this long is treated as
// disconnected. Heartbeats are sent every minute, so this tolerates one miss.
export const PRESENCE_ONLINE_WINDOW_SECONDS = 180;

function buildPresence(row: { last_seen_at?: string | null; last_path?: string | null } | null | undefined): LearnerPresence {
  const lastSeenAt = row?.last_seen_at ?? null;
  return {
    lastSeenAt,
    lastPath: row?.last_path ?? null,
    isOnline: lastSeenAt
      ? Date.now() - new Date(lastSeenAt).getTime() <= PRESENCE_ONLINE_WINDOW_SECONDS * 1000
      : false
  };
}

function joinedValue<T>(value: T | T[] | null | undefined): T | null {
  return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

async function calculateVerifiedXp(userIds?: string[], sinceIso?: string) {
  const supabase = createSupabaseAdminClient();
  let moduleQuery = supabase
    .from("module_progress")
    .select("user_id, points_earned")
    .eq("status", "completed");
  let challengeQuery = supabase
    .from("challenge_submissions")
    .select("user_id, points_awarded")
    .eq("status", "approved");
  let capstoneQuery = supabase
    .from("capstone_projects")
    .select("user_id")
    .eq("status", "approved");
  let parentChallengeQuery = supabase
    .from("parent_challenges")
    .select("child_id, points_awarded")
    .eq("status", "approved");
  let strikeQuery = supabase
    .from("strike_attempts")
    .select("user_id, points_awarded")
    .eq("status", "submitted")
    .eq("passed", true);

  if (userIds?.length) {
    moduleQuery = moduleQuery.in("user_id", userIds);
    challengeQuery = challengeQuery.in("user_id", userIds);
    capstoneQuery = capstoneQuery.in("user_id", userIds);
    parentChallengeQuery = parentChallengeQuery.in("child_id", userIds);
    strikeQuery = strikeQuery.in("user_id", userIds);
  }

  if (sinceIso) {
    moduleQuery = moduleQuery.gte("completed_at", sinceIso);
    challengeQuery = challengeQuery.gte("reviewed_at", sinceIso);
    capstoneQuery = capstoneQuery.gte("reviewed_at", sinceIso);
    parentChallengeQuery = parentChallengeQuery.gte("reviewed_at", sinceIso);
    strikeQuery = strikeQuery.gte("submitted_at", sinceIso);
  }

  const [{ data: modules }, { data: challenges }, { data: capstones }, { data: parentChallenges }, { data: strikes }] =
    await Promise.all([moduleQuery, challengeQuery, capstoneQuery, parentChallengeQuery, strikeQuery]);
  const totals = new Map<string, number>();
  const add = (userId: string | null, points: number) => {
    if (!userId) return;
    totals.set(userId, (totals.get(userId) ?? 0) + Math.max(points, 0));
  };

  (modules ?? []).forEach((row) => add(row.user_id, row.points_earned ?? 0));
  (challenges ?? []).forEach((row) => add(row.user_id, row.points_awarded ?? 0));
  (capstones ?? []).forEach((row) => add(row.user_id, 500));
  (parentChallenges ?? []).forEach((row) => add(row.child_id, row.points_awarded ?? 0));
  (strikes ?? []).forEach((row) => add(row.user_id, row.points_awarded ?? 0));
  return totals;
}

export async function isModuleUnlockedForStudent(userId: string, moduleWeek: number): Promise<boolean> {
  if (moduleWeek <= 1) return true;

  const supabase = createSupabaseAdminClient();
  const { data: previousModules } = await supabase
    .from("modules")
    .select("id, order_index")
    .lt("order_index", moduleWeek)
    .eq("is_published", true)
    .order("order_index", { ascending: true })
    .returns<{ id: string; order_index: number }[]>();

  // A curriculum configuration gap must never expose a later module.
  if (!previousModules || previousModules.length !== moduleWeek - 1) return false;

  const { data: progressRows } = await supabase
    .from("module_progress")
    .select("id, module_id, status")
    .eq("user_id", userId)
    .in("module_id", previousModules.map((module) => module.id))
    .returns<{ id: string; module_id: string; status: string }[]>();

  const completedIds = new Set(
    (progressRows ?? [])
      .filter((row) => row.status === "completed")
      .map((row) => row.module_id)
  );
  if (!previousModules.every((module) => completedIds.has(module.id))) return false;

  // Module 2 is the controlled transition: completing module 1 creates a
  // pending progression that must be explicitly approved by an admin.
  if (moduleWeek === 2) {
    const moduleOne = previousModules.find((module) => module.order_index === 1);
    const moduleOneProgress = (progressRows ?? []).find(
      (row) => row.module_id === moduleOne?.id && row.status === "completed"
    );
    if (!moduleOneProgress) return false;

    const { data: approval } = await supabase
      .from("module_progress_approvals")
      .select("id")
      .eq("progress_id", moduleOneProgress.id)
      .maybeSingle();
    return Boolean(approval);
  }

  return true;
}

export async function getStrikeEligibility(userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", userId)
    .returns<{ lesson_id: string }[]>();

  const completedLessonIds = Array.from(new Set((data ?? []).map((row) => row.lesson_id)));
  const poolSize = completedLessonIds.reduce(
    (sum, lessonId) => sum + (lessonQuizBanks[lessonId]?.length ?? 0),
    0
  );

  return { eligible: poolSize >= 10, poolSize };
}

export async function getParentChildActivityDetail(parentId: string, childId: string) {
  const supabase = createSupabaseAdminClient();
  const { data: link, error } = await supabase
    .from("family_links")
    .select("id")
    .eq("parent_id", parentId)
    .eq("child_id", childId)
    .maybeSingle();
  if (error || !link) return null;
  return getAdminStudentActivityDetail(childId);
}

export async function getAdminStudentActivityDetail(
  studentId: string
): Promise<AdminStudentActivityDetail | null> {
  const supabase = createSupabaseAdminClient();
  const [{ data: student, error: studentError }, { data: profile }, verifiedXp] = await Promise.all([
    supabase
      .from("users")
      .select("id, full_name, phone, city, role, created_at")
      .eq("id", studentId)
      .eq("role", "ambassador")
      .maybeSingle(),
    supabase
      .from("ambassador_profiles")
      .select(
        "level, total_points, modules_completed, certified_at, parental_consent_given, cohorts(name)"
      )
      .eq("user_id", studentId)
      .maybeSingle(),
    calculateVerifiedXp([studentId])
  ]);

  if (studentError || !student) {
    return null;
  }

  const [
    { data: progress },
    { data: lessons },
    { data: challenges },
    { data: reports },
    { data: capstones },
    { data: moduleTime },
    { data: lessonSessions },
    { data: presenceRow },
    { data: progressApprovals }
  ] = await Promise.all([
    supabase
      .from("module_progress")
      .select(
        "id, module_id, status, lessons_done, quiz_score, quiz_attempts, points_earned, started_at, completed_at, modules(title, order_index)"
      )
      .eq("user_id", studentId)
      .order("started_at", { ascending: false }),
    supabase
      .from("lesson_progress")
      .select("lesson_id, completed_at, modules(title, order_index)")
      .eq("user_id", studentId)
      .order("completed_at", { ascending: false }),
    supabase
      .from("challenge_submissions")
      .select(
        "id, status, points_awarded, submitted_at, reviewed_at, challenges(title)"
      )
      .eq("user_id", studentId)
      .order("submitted_at", { ascending: false }),
    supabase
      .from("forum_reports")
      .select("id, type, platform, status, created_at")
      .eq("reporter_id", studentId)
      .order("created_at", { ascending: false }),
    supabase
      .from("capstone_projects")
      .select("id, title, action_type, reach_count, status, submitted_at, reviewed_at")
      .eq("user_id", studentId)
      .order("submitted_at", { ascending: false }),
    supabase
      .from("module_time_spent")
      .select("module_id, active_seconds")
      .eq("user_id", studentId),
    supabase
      .from("lesson_sessions")
      .select("module_id, active_seconds")
      .eq("user_id", studentId),
    supabase
      .from("user_presence")
      .select("last_seen_at, last_path")
      .eq("user_id", studentId)
      .maybeSingle(),
    supabase
      .from("module_progress_approvals")
      .select("progress_id, approved_at")
      .eq("user_id", studentId)
  ]);

  // The heartbeat covers every module page; the older per-lesson sessions only
  // covered one lesson. Taking the larger of the two keeps the legacy data
  // useful without counting the same minutes twice.
  const heartbeatSecondsByModule = new Map<string, number>();
  (moduleTime ?? []).forEach((row: any) => {
    heartbeatSecondsByModule.set(row.module_id, row.active_seconds ?? 0);
  });
  const sessionSecondsByModule = new Map<string, number>();
  (lessonSessions ?? []).forEach((row: any) => {
    sessionSecondsByModule.set(
      row.module_id,
      (sessionSecondsByModule.get(row.module_id) ?? 0) + (row.active_seconds ?? 0)
    );
  });

  const moduleProgress = (progress ?? []).map((row: any) => {
    const moduleInfo = joinedValue(row.modules) as {
      title?: string | null;
      order_index?: number | null;
    } | null;
    const startedAt = row.started_at ?? null;
    const completedAt = row.completed_at ?? null;
    const endTime = completedAt ? new Date(completedAt).getTime() : Date.now();

    return {
      id: row.id,
      title: moduleInfo?.title ?? `Module ${moduleInfo?.order_index ?? ""}`.trim(),
      status: row.status ?? "not_started",
      lessonsDone: row.lessons_done ?? 0,
      quizScore: row.quiz_score ?? null,
      quizAttempts: row.quiz_attempts ?? 0,
      pointsEarned: row.points_earned ?? 0,
      moduleOrder: moduleInfo?.order_index ?? null,
      approvedAt:
        (progressApprovals ?? []).find((approval: any) => approval.progress_id === row.id)
          ?.approved_at ?? null,
      startedAt,
      completedAt,
      activeSeconds: Math.max(
        heartbeatSecondsByModule.get(row.module_id) ?? 0,
        sessionSecondsByModule.get(row.module_id) ?? 0
      ),
      elapsedSeconds: startedAt
        ? Math.max(0, Math.round((endTime - new Date(startedAt).getTime()) / 1000))
        : null
    };
  });

  const activities: StudentPlatformActivity[] = [
    ...(lessons ?? []).map((row: any) => {
      const moduleInfo = joinedValue(row.modules) as {
        title?: string | null;
        order_index?: number | null;
      } | null;
      const staticModule = programModules.find(
        (item) => item.week === moduleInfo?.order_index
      );
      const staticLesson = staticModule?.lessons.find(
        (item) => item.id === row.lesson_id
      );

      return {
        id: `lesson-${row.lesson_id}`,
        category: "lesson" as const,
        title: staticLesson?.title ?? `Lecon ${row.lesson_id}`,
        description: moduleInfo?.title ?? staticModule?.title ?? "Parcours de formation",
        status: "completed",
        occurredAt: row.completed_at ?? null
      };
    }),
    ...moduleProgress.map((row) => ({
      id: `module-${row.id}`,
      category: "module" as const,
      title: row.quizScore === null ? `Progression - ${row.title}` : `Quiz - ${row.title}`,
      description:
        row.quizScore === null
          ? `${row.lessonsDone} lecon(s) terminee(s)`
          : `Score ${row.quizScore}% · ${row.quizAttempts} tentative(s) · ${row.pointsEarned} point(s)`,
      status: row.status,
      occurredAt: row.completedAt ?? row.startedAt
    })),
    ...(challenges ?? []).map((row: any) => {
      const challenge = joinedValue(row.challenges) as { title?: string | null } | null;
      return {
        id: `challenge-${row.id}`,
        category: "challenge" as const,
        title: challenge?.title ?? "Defi hebdomadaire",
        description: `${row.points_awarded ?? 0} point(s) attribue(s)`,
        status: row.status ?? "pending",
        occurredAt: row.reviewed_at ?? row.submitted_at ?? null
      };
    }),
    ...(reports ?? []).map((row: any) => ({
      id: `report-${row.id}`,
      category: "report" as const,
      title: `Signalement ${row.type ?? "autre"}`,
      description: row.platform ? `Plateforme: ${row.platform}` : "Signalement communautaire",
      status: row.status ?? "pending",
      occurredAt: row.created_at ?? null
    })),
    ...(capstones ?? []).map((row: any) => ({
      id: `capstone-${row.id}`,
      category: "capstone" as const,
      title: row.title ?? "Projet capstone",
      description: `${row.action_type ?? "action"} · ${row.reach_count ?? 0} personne(s) touchee(s)`,
      status: row.status ?? "pending",
      occurredAt: row.reviewed_at ?? row.submitted_at ?? null
    }))
  ].sort((left, right) => {
    const leftTime = left.occurredAt ? new Date(left.occurredAt).getTime() : 0;
    const rightTime = right.occurredAt ? new Date(right.occurredAt).getTime() : 0;
    return rightTime - leftTime;
  });
  const cohort = joinedValue((profile as any)?.cohorts) as { name?: string | null } | null;

  return {
    student: {
      id: student.id,
      fullName: student.full_name,
      phone: student.phone ?? null,
      city: student.city ?? null,
      joinedAt: student.created_at ?? null,
      cohort: cohort?.name ?? null,
      level: (profile as any)?.level ?? "junior",
      totalPoints: verifiedXp.get(studentId) ?? 0,
      modulesCompleted: (profile as any)?.modules_completed ?? 0,
      certifiedAt: (profile as any)?.certified_at ?? null,
      parentalConsentGiven: (profile as any)?.parental_consent_given === true
    },
    totals: {
      lessonsCompleted: lessons?.length ?? 0,
      quizAttempts: moduleProgress.reduce((sum, row) => sum + row.quizAttempts, 0),
      challengesSubmitted: challenges?.length ?? 0,
      reportsSubmitted: reports?.length ?? 0,
      capstonesSubmitted: capstones?.length ?? 0
    },
    moduleProgress,
    activities,
    presence: buildPresence(presenceRow as any)
  };
}

export async function listAdminStudents() {
  const supabase = createSupabaseAdminClient();
  const testUserIds = await listTestAuthUserIds();
  const [
    { data, error },
    { data: progress },
    { count: publishedModuleCount },
    verifiedXp,
    { data: presenceRows },
    { data: moduleTime },
    { data: completedModules }
  ] = await Promise.all([
    supabase
      .from("users")
      .select(
        "id, full_name, city, created_at, ambassador_profiles(level, total_points, cohorts(name))"
      )
      .eq("role", "ambassador")
      .order("full_name", { ascending: true }),
    supabase
      .from("module_progress")
      .select("user_id, quiz_score, modules!inner(is_published)")
      .eq("modules.is_published", true)
      .not("quiz_score", "is", null),
    supabase
      .from("modules")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true),
    calculateVerifiedXp(),
    supabase.from("user_presence").select("user_id, last_seen_at, last_path"),
    supabase.from("module_time_spent").select("user_id, active_seconds"),
    supabase
      .from("module_progress")
      .select("user_id, modules!inner(is_published)")
      .eq("status", "completed")
      .eq("modules.is_published", true)
  ]);

  if (error || !data) return [];

  const scoresByStudent = new Map<string, number[]>();
  (progress ?? []).forEach((row) => {
    if (typeof row.quiz_score !== "number") return;
    const scores = scoresByStudent.get(row.user_id) ?? [];
    scores.push(row.quiz_score);
    scoresByStudent.set(row.user_id, scores);
  });

  const presenceByStudent = new Map(
    (presenceRows ?? []).map((row: any) => [row.user_id as string, row])
  );
  const learningSecondsByStudent = new Map<string, number>();
  (moduleTime ?? []).forEach((row: any) => {
    learningSecondsByStudent.set(
      row.user_id,
      (learningSecondsByStudent.get(row.user_id) ?? 0) + (row.active_seconds ?? 0)
    );
  });
  const completedByStudent = new Map<string, number>();
  (completedModules ?? []).forEach((row: any) => {
    completedByStudent.set(row.user_id, (completedByStudent.get(row.user_id) ?? 0) + 1);
  });

  return data.filter((student: any) => !testUserIds.has(student.id)).map((student: any) => {
    const profile = joinedValue(student.ambassador_profiles) as {
      level?: string | null;
      total_points?: number | null;
      cohorts?: { name?: string | null } | { name?: string | null }[] | null;
    } | null;
    const cohort = joinedValue(profile?.cohorts) as { name?: string | null } | null;
    const scores = scoresByStudent.get(student.id) ?? [];

    return {
      id: student.id as string,
      name: student.full_name ?? "Eleve",
      city: student.city ?? "Ville non renseignee",
      level: profile?.level ?? "junior",
      points: verifiedXp.get(student.id) ?? 0,
      performanceScore: scores.length > 0 && (publishedModuleCount ?? 0) > 0
        ? Math.round(
            scores.reduce((sum, score) => sum + score, 0) /
              (publishedModuleCount ?? 1)
          )
        : null,
      cohort: cohort?.name ?? "Sans cohorte",
      joinedAt: student.created_at ?? null,
      modulesCompleted: completedByStudent.get(student.id) ?? 0,
      publishedModules: publishedModuleCount ?? 0,
      learningSeconds: learningSecondsByStudent.get(student.id) ?? 0,
      presence: buildPresence(presenceByStudent.get(student.id))
    };
  });
}

export type AdminStudentSummary = Awaited<ReturnType<typeof listAdminStudents>>[number];

export async function getSupabaseUserRoleCounts() {
  const supabase = createSupabaseAdminClient();
  const testUserIds = await listTestAuthUserIds();
  const [students, parents, admins, consented] = await Promise.all([
    supabase.from("users").select("id").eq("role", "ambassador"),
    supabase.from("users").select("id", { count: "exact", head: true }).eq("role", "parent"),
    supabase.from("users").select("id", { count: "exact", head: true }).eq("role", "admin"),
    supabase
      .from("ambassador_profiles")
      .select("id", { count: "exact", head: true })
      .eq("parental_consent_given", true)
  ]);

  return {
    students: (students.data ?? []).filter((row) => !testUserIds.has(row.id)).length,
    parents: parents.count ?? 0,
    admins: admins.count ?? 0,
    consented: consented.count ?? 0
  };
}

export async function getAdminOperationalMetrics() {
  const supabase = createSupabaseAdminClient();
  const [certified, submissions, reports, cohorts, familyLinks] = await Promise.all([
    supabase
      .from("ambassador_profiles")
      .select("id", { count: "exact", head: true })
      .neq("level", "junior"),
    supabase
      .from("challenge_submissions")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("forum_reports")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("cohorts")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("family_links")
      .select("id", { count: "exact", head: true })
      .not("parent_id", "is", null)
  ]);

  return {
    certifiedAmbassadors: certified.count ?? 0,
    pendingChallengeSubmissions: submissions.count ?? 0,
    pendingForumReports: reports.count ?? 0,
    activeCohorts: cohorts.count ?? 0,
    parentAccountsLinked: familyLinks.count ?? 0
  };
}

export async function getStudentProfileStats(userId: string) {
  const supabase = createSupabaseAdminClient();
  const [{ data }, { data: badges }, { data: certificate }, verifiedXp] = await Promise.all([
    supabase
      .from("ambassador_profiles")
      .select("level, total_points, modules_completed, certified_at")
      .eq("user_id", userId)
      .maybeSingle<{
        level: string | null;
        total_points: number | null;
        modules_completed: number | null;
        certified_at: string | null;
      }>(),
    supabase
      .from("module_badges")
      .select("id, badge_name, badge_focus, awarded_at, modules(title, color, icon)")
      .eq("user_id", userId)
      .order("awarded_at", { ascending: true }),
    supabase
      .from("training_certificates")
      .select("certificate_number, issued_at")
      .eq("user_id", userId)
      .maybeSingle<{ certificate_number: string; issued_at: string }>(),
    calculateVerifiedXp([userId])
  ]);

  return {
    level: data?.level ?? "junior",
    totalPoints: verifiedXp.get(userId) ?? 0,
    modulesCompleted: data?.modules_completed ?? 0,
    certifiedAt: certificate?.issued_at ?? data?.certified_at ?? null,
    certificateNumber: certificate?.certificate_number ?? null,
    badges: (badges ?? []).map((badge: any) => ({
      id: badge.id as string,
      name: badge.badge_name as string,
      focus: badge.badge_focus as string,
      awardedAt: badge.awarded_at as string,
      color: joinedValue(badge.modules)?.color ?? "#1A5276",
      icon: joinedValue(badge.modules)?.icon ?? "award"
    })),
    isGraduated: Boolean(certificate?.issued_at ?? data?.certified_at)
  };
}

function dateKeyInDouala(value: string | Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Douala",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

function calculateLearningStreak(values: Array<string | null>) {
  const activeDays = new Set(
    values.filter((value): value is string => Boolean(value)).map(dateKeyInDouala)
  );
  if (activeDays.size === 0) return 0;

  const cursor = new Date();
  const today = dateKeyInDouala(cursor);
  if (!activeDays.has(today)) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
    if (!activeDays.has(dateKeyInDouala(cursor))) return 0;
  }

  let streak = 0;
  while (activeDays.has(dateKeyInDouala(cursor))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

export async function getStudentStatusSummary(userId: string) {
  const supabase = createSupabaseAdminClient();
  const [profile, modules, leaderboard, activity] = await Promise.all([
    getStudentProfileStats(userId),
    listProgramModulesForStudent(userId),
    listLeaderboard(),
    Promise.all([
      supabase
        .from("lesson_progress")
        .select("completed_at")
        .eq("user_id", userId),
      supabase
        .from("module_progress")
        .select("module_id, status, completed_at, modules(order_index)")
        .eq("user_id", userId),
      supabase
        .from("challenges")
        .select("id, title")
        .eq("is_active", true),
      supabase
        .from("challenge_submissions")
        .select("challenge_id, status")
        .eq("user_id", userId)
    ])
  ]);
  const [lessonActivity, moduleProgress, activeChallenges, challengeSubmissions] = activity;
  const progressByOrder = new Map<number, string>();
  (moduleProgress.data ?? []).forEach((row: any) => {
    const moduleInfo = joinedValue(row.modules) as { order_index?: number | null } | null;
    if (typeof moduleInfo?.order_index === "number") {
      progressByOrder.set(moduleInfo.order_index, row.status ?? "in_progress");
    }
  });

  const tasks: Array<{ id: string; title: string; detail: string; href: string }> = [];
  modules.forEach((module) => {
    const remainingLessons = Math.max(
      module.lessons.length - Math.round((module.progressPercent / 100) * module.lessons.length),
      0
    );
    if (remainingLessons > 0) {
      tasks.push({
        id: `lessons-${module.id}`,
        title: module.title,
        detail: `${remainingLessons} lecon${remainingLessons > 1 ? "s" : ""} a terminer`,
        href: `/student/modules/${module.id}`
      });
    } else if (progressByOrder.get(module.week) !== "completed") {
      tasks.push({
        id: `quiz-${module.id}`,
        title: module.title,
        detail: "Quiz final du module a valider",
        href: `/student/modules/${module.id}/quiz`
      });
    }
  });

  const submissionsByChallenge = new Map(
    (challengeSubmissions.data ?? []).map((row) => [row.challenge_id, row.status])
  );
  (activeChallenges.data ?? []).forEach((challenge) => {
    const status = submissionsByChallenge.get(challenge.id);
    if (!status) {
      tasks.push({
        id: `challenge-${challenge.id}`,
        title: challenge.title,
        detail: "Defi actif a soumettre",
        href: "/student/challenges/submit"
      });
    } else if (status === "pending") {
      tasks.push({
        id: `challenge-review-${challenge.id}`,
        title: challenge.title,
        detail: "Soumission en attente de validation",
        href: "/student/challenges"
      });
    }
  });

  const ranking = leaderboard.find((entry) => entry.id === userId);
  const activityDates = [
    ...(lessonActivity.data ?? []).map((row) => row.completed_at),
    ...(moduleProgress.data ?? []).map((row) => row.completed_at)
  ];

  return {
    ...profile,
    streakDays: calculateLearningStreak(activityDates),
    rank: ranking?.rank ?? null,
    performanceScore: ranking?.performanceScore ?? 0,
    participantCount: leaderboard.length,
    badgeTarget: modules.length,
    pendingTasks: tasks,
    completionPercent: getProgramCompletionPercent(modules)
  };
}

export async function listCohortsFromDatabase() {
  const supabase = createSupabaseAdminClient();
  const testUserIds = await listTestAuthUserIds();
  const [{ data: cohorts }, { data: profiles }] = await Promise.all([
    supabase
      .from("cohorts")
      .select("id, name, type, start_date, max_size, is_active")
      .order("start_date", { ascending: false }),
    supabase.from("ambassador_profiles").select("user_id, cohort_id")
  ]);
  const enrollment = new Map<string, number>();

  (profiles ?? []).forEach((profile: { user_id: string; cohort_id: string | null }) => {
    if (testUserIds.has(profile.user_id)) return;
    if (!profile.cohort_id) return;
    enrollment.set(profile.cohort_id, (enrollment.get(profile.cohort_id) ?? 0) + 1);
  });

  return (cohorts ?? []).map((cohort) => ({
    ...cohort,
    enrolled: enrollment.get(cohort.id) ?? 0
  }));
}

export async function getCyberaFellowKit(userId: string) {
  const supabase = createSupabaseAdminClient();
  const [profileResult, modules, challengeResult, capstoneResult] = await Promise.all([
    supabase
      .from("ambassador_profiles")
      .select("modules_completed, certified_at, cohorts(name, start_date)")
      .eq("user_id", userId)
      .maybeSingle(),
    listProgramModulesForStudent(userId),
    supabase.from("challenge_submissions").select("id, status").eq("user_id", userId),
    supabase.from("capstone_projects").select("id, status, submitted_at").eq("user_id", userId).maybeSingle()
  ]);
  const profile = profileResult.data as {
    modules_completed?: number | null;
    certified_at?: string | null;
    cohorts?: { name?: string | null; start_date?: string | null } | Array<{ name?: string | null; start_date?: string | null }> | null;
  } | null;
  const cohort = joinedValue(profile?.cohorts) as { name?: string | null; start_date?: string | null } | null;
  const completedModules = modules.filter((module) => module.progressPercent >= 100).length;
  const lessonsTotal = modules.reduce((total, module) => total + module.lessons.length, 0);
  const lessonsCompleted = modules.reduce((total, module) => total + Math.round((module.progressPercent / 100) * module.lessons.length), 0);
  const challengeSubmissions = challengeResult.data ?? [];
  const capstone = capstoneResult.data;

  return {
    fellowshipName: cohort?.name?.trim() || null,
    cohortStartDate: cohort?.start_date ?? null,
    completedModules,
    moduleCount: modules.length,
    lessonsCompleted,
    lessonsTotal,
    hasChallengeActivity: challengeSubmissions.length > 0,
    hasApprovedChallenge: challengeSubmissions.some((item) => item.status === "approved"),
    capstoneSubmitted: Boolean(capstone?.submitted_at || capstone?.id),
    certified: Boolean(profile?.certified_at)
  };
}

export async function listCapstoneProjectsFromDatabase() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("capstone_projects")
    .select("*, users(full_name)")
    .order("submitted_at", { ascending: false });

  return error || !data ? [] : data;
}

export async function listForumReportsForStudent(userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("forum_reports")
    .select("id, type, platform, description, target_url, status, admin_note, created_at")
    .eq("reporter_id", userId)
    .order("created_at", { ascending: false });

  return error || !data ? [] : data;
}

type FamilyLinkForParentRow = {
  child_id: string | null;
  linked_at: string | null;
};

type ChildUserRow = {
  id: string;
  full_name: string;
  city: string | null;
};

type AmbassadorProfileSummaryRow = {
  user_id: string;
  level: string | null;
  total_points: number | null;
  modules_completed: number | null;
};

type ApprovedChallengeSubmissionRow = {
  user_id: string | null;
};

type ModuleProgressRow = {
  module_id: string;
  status: "not_started" | "in_progress" | "completed" | null;
  lessons_done: number | null;
  quiz_score: number | null;
  modules: { order_index: number | null } | { order_index: number | null }[] | null;
};

type LessonProgressRow = {
  module_id: string;
  lesson_id: string;
  modules: { order_index: number | null } | { order_index: number | null }[] | null;
};

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getJoinedModuleOrder(row: {
  modules: { order_index: number | null } | { order_index: number | null }[] | null;
}) {
  if (Array.isArray(row.modules)) {
    return row.modules[0]?.order_index ?? null;
  }

  return row.modules?.order_index ?? null;
}

function calculateModuleProgressPercent(
  totalLessons: number,
  completedLessons: number
) {
  if (completedLessons === 0 || totalLessons === 0) {
    return 0;
  }

  return clampPercent((Math.min(completedLessons, totalLessons) / totalLessons) * 100);
}

function normalizeContentBlocks(content: unknown): LessonContentBlock[] {
  if (!Array.isArray(content)) return [];

  const normalized: LessonContentBlock[] = [];

  content.forEach((block) => {
    if (!block || typeof block !== "object") return;
    const type = "type" in block ? block.type : null;
    const value = "content" in block ? block.content : null;

    if (type === "checklist" && Array.isArray(value)) {
      normalized.push({
        type,
        content: value.filter((item): item is string => typeof item === "string")
      });
      return;
    }

    const textTypes = ["text", "tip", "warning", "hook", "story", "discovery", "reflection", "ability"];
    if (typeof type === "string" && textTypes.includes(type) && typeof value === "string") {
      normalized.push({ type: type as LessonContentBlock["type"], content: value });
      return;
    }

    if (type === "mission" && Array.isArray(value)) {
      normalized.push({ type, content: value.filter((item): item is string => typeof item === "string") });
      return;
    }

    if (type === "image" && typeof value === "string" && "src" in block && typeof block.src === "string") {
      normalized.push({
        type,
        content: value,
        src: block.src,
        alt: "alt" in block && typeof block.alt === "string" ? block.alt : value,
        caption: "caption" in block && typeof block.caption === "string" ? block.caption : undefined
      });
    }
  });

  return normalized;
}

function databaseModuleToProgramModule(
  module: ModuleWithLessons
): ProgramModule {
  const lessons = module.lessons.map((lesson) => {
    const content = normalizeContentBlocks(lesson.content);
    const checklist = content.find(
      (block) => block.type === "checklist" && Array.isArray(block.content)
    );
    const correctAction = Array.isArray(checklist?.content)
      ? checklist.content[0] ?? "Appliquer le conseil principal de la lecon"
      : "Appliquer le conseil principal de la lecon";

    return {
      id: lesson.id,
      order: lesson.order_index,
      title: lesson.title,
      estimatedMins: lesson.estimated_mins ?? 5,
      content,
      quiz: {
        question: `Quelle action correspond a la lecon « ${lesson.title} » ?`,
        options: [
          correctAction,
          "Partager sans verifier",
          "Donner ses informations personnelles",
          "Ignorer le risque"
        ],
        correctIndex: 0,
        explanation: `${correctAction} est le bon reflexe a retenir.`
      }
    };
  });

  return {
    id: module.id,
    week: module.order_index,
    title: module.title,
    subtitle: module.subtitle ?? module.title,
    summary: module.description ?? "",
    color: module.color ?? "#1A5276",
    icon: module.icon ?? "shield",
    outcomes: lessons
      .flatMap((lesson) =>
        lesson.content
          .filter((block) => block.type === "checklist" && Array.isArray(block.content))
          .flatMap((block) => (Array.isArray(block.content) ? block.content : []))
      )
      .slice(0, 3),
    status: module.is_published ? "ready" : "planned",
    progressPercent: 0,
    lessons,
    quiz: (module.quiz_questions ?? []).map((question) => ({
      id: question.id,
      question: question.question,
      options: Array.isArray(question.options)
        ? question.options.filter((option): option is string => typeof option === "string")
        : [],
      correctIndex: question.correct_index,
      explanation: question.explanation ?? "",
      points: question.points ?? 10
    }))
  };
}

async function loadPublishedDatabaseCurriculum() {
  const supabase = createSupabaseAdminClient();
  const [{ data: modules, error }, { data: lessons }, { data: questions }] =
    await Promise.all([
      supabase
        .from("modules")
        .select("*")
        .eq("is_published", true)
        .order("order_index", { ascending: true })
        .returns<ModuleRow[]>(),
      supabase
        .from("lessons")
        .select("id, module_id, order_index, title, content, estimated_mins, created_at")
        .order("order_index", { ascending: true })
        .returns<LessonRow[]>(),
      supabase
        .from("quiz_questions")
        .select(
          "id, module_id, order_index, question, options, correct_index, explanation, points"
        )
        .order("order_index", { ascending: true })
        .returns<QuizQuestionRow[]>()
    ]);

  if (error || !modules) {
    return { modules: [] as ModuleWithLessons[], cmsInitialized: false };
  }

  return {
    modules: modules.map((module) => ({
      ...module,
      lessons: (lessons ?? []).filter((lesson) => lesson.module_id === module.id),
      quiz_questions: (questions ?? []).filter(
        (question) => question.module_id === module.id
      )
    })),
    cmsInitialized: (questions?.length ?? 0) > 0
  };
}

export async function listProgramModulesForStudent(
  userId: string
): Promise<ProgramModule[]> {
  const supabase = createSupabaseAdminClient();
  const databaseCurriculum = await loadPublishedDatabaseCurriculum();
  const baseModules = databaseCurriculum.cmsInitialized
    ? databaseCurriculum.modules.map((databaseModule) => {
        const converted = databaseModuleToProgramModule(databaseModule);
        const curated = programModules.find((module) => module.week === converted.week);
        if ((converted.week === 1 || converted.week === 2) && curated) {
          return { ...curated, id: converted.id };
        }
        return curated
          ? {
              ...converted,
              id: converted.id,
              title: curated.title,
              subtitle: curated.subtitle,
              summary: curated.summary,
              color: curated.color,
              icon: curated.icon,
              outcomes: curated.outcomes
            }
          : converted;
      })
    : programModules;
  const [
    { data, error },
    { data: lessonProgress, error: lessonProgressError }
  ] = await Promise.all([
    supabase
      .from("module_progress")
      .select("module_id, status, lessons_done, quiz_score, modules(order_index)")
      .eq("user_id", userId)
      .returns<ModuleProgressRow[]>(),
    supabase
      .from("lesson_progress")
      .select("module_id, lesson_id, modules(order_index)")
      .eq("user_id", userId)
      .returns<LessonProgressRow[]>()
  ]);

  if (error || !data) {
    return baseModules;
  }

  const progressByModuleId = new Map(data.map((row) => [row.module_id, row]));
  const progressByOrder = new Map<number, ModuleProgressRow>();
  const completedLessonsByModuleId = new Map<string, Set<string>>();
  const completedLessonsByOrder = new Map<number, Set<string>>();

  data.forEach((row) => {
    const order = getJoinedModuleOrder(row);
    if (typeof order === "number") {
      progressByOrder.set(order, row);
    }
  });

  (lessonProgress ?? []).forEach((row) => {
    const byId = completedLessonsByModuleId.get(row.module_id) ?? new Set<string>();
    byId.add(row.lesson_id);
    completedLessonsByModuleId.set(row.module_id, byId);

    const order = getJoinedModuleOrder(row);
    if (typeof order === "number") {
      const byOrder = completedLessonsByOrder.get(order) ?? new Set<string>();
      byOrder.add(row.lesson_id);
      completedLessonsByOrder.set(order, byOrder);
    }
  });

  return baseModules.map((module) => {
    const row = progressByModuleId.get(module.id) ?? progressByOrder.get(module.week);
    const recordedLessons =
      completedLessonsByModuleId.get(module.id) ?? completedLessonsByOrder.get(module.week);
    const currentLessonIds = new Set(module.lessons.map((lesson) => lesson.id));
    const completedLessonIds = new Set(
      lessonProgressError ? [] : Array.from(recordedLessons ?? []).filter((lessonId) =>
        currentLessonIds.has(lessonId)
      )
    );
    module.lessons
      .slice(0, Math.min(Math.max(row?.lessons_done ?? 0, 0), module.lessons.length))
      .forEach((lesson) => completedLessonIds.add(lesson.id));
    const completedLessons = completedLessonIds.size;

    return {
      ...module,
      progressPercent: calculateModuleProgressPercent(
        module.lessons.length,
        completedLessons
      )
    };
  });
}

export async function getPublishedProgramModuleById(moduleId: string) {
  const databaseCurriculum = await loadPublishedDatabaseCurriculum();

  if (!databaseCurriculum.cmsInitialized) {
    return getModuleById(moduleId) ?? null;
  }

  const selectedModule = databaseCurriculum.modules.find(
    (item) => item.id === moduleId
  );
  if (!selectedModule) return null;
  const converted = databaseModuleToProgramModule(selectedModule);
  const curated = programModules.find((module) => module.week === converted.week);
  if ((converted.week === 1 || converted.week === 2) && curated) {
    return { ...curated, id: converted.id };
  }
  return curated
    ? {
        ...converted,
        id: converted.id,
        title: curated.title,
        subtitle: curated.subtitle,
        summary: curated.summary,
        color: curated.color,
        icon: curated.icon,
        outcomes: curated.outcomes
      }
    : converted;
}

export async function listCompletedLessonIdsForStudent(
  userId: string,
  moduleId: string,
  lessonIds: string[],
  moduleOrder?: number
) {
  const supabase = createSupabaseAdminClient();
  let databaseModuleId = moduleId;
  const isDatabaseModuleId =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      moduleId
    );

  if (!isDatabaseModuleId && typeof moduleOrder === "number") {
    const { data: module } = await supabase
      .from("modules")
      .select("id")
      .eq("order_index", moduleOrder)
      .eq("is_published", true)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle<{ id: string }>();
    databaseModuleId = module?.id ?? moduleId;
  }

  const [{ data }, { data: progress }] = await Promise.all([
    supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", userId)
      .eq("module_id", databaseModuleId)
      .returns<{ lesson_id: string }[]>(),
    supabase
      .from("module_progress")
      .select("lessons_done")
      .eq("user_id", userId)
      .eq("module_id", databaseModuleId)
      .maybeSingle<{ lessons_done: number | null }>()
  ]);
  const recordedIds = new Set((data ?? []).map((row) => row.lesson_id));
  const completedCount = Math.min(
    Math.max(progress?.lessons_done ?? 0, 0),
    lessonIds.length
  );

  // Older progress rows only stored a count. Merge that legacy count with the
  // exact lesson IDs so the overview and module detail cannot disagree.
  lessonIds.slice(0, completedCount).forEach((lessonId) => recordedIds.add(lessonId));
  return lessonIds.filter((lessonId) => recordedIds.has(lessonId));
}

export async function listParentChildren(parentId: string): Promise<ParentChildSummary[]> {
  const supabase = createSupabaseAdminClient();
  const { data: links, error: linkError } = await supabase
    .from("family_links")
    .select("child_id, linked_at")
    .eq("parent_id", parentId)
    .not("child_id", "is", null)
    .order("linked_at", { ascending: false })
    .returns<FamilyLinkForParentRow[]>();

  if (linkError || !links?.length) {
    return [];
  }

  const childIds = links
    .map((link) => link.child_id)
    .filter((childId): childId is string => Boolean(childId));

  const [{ data: children }, { data: profiles }, { data: submissions }, verifiedXp] =
    await Promise.all([
      supabase
        .from("users")
        .select("id, full_name, city")
        .in("id", childIds)
        .returns<ChildUserRow[]>(),
      supabase
        .from("ambassador_profiles")
        .select("user_id, level, total_points, modules_completed")
        .in("user_id", childIds)
        .returns<AmbassadorProfileSummaryRow[]>(),
      supabase
        .from("challenge_submissions")
        .select("user_id")
        .in("user_id", childIds)
        .eq("status", "approved")
        .returns<ApprovedChallengeSubmissionRow[]>(),
      calculateVerifiedXp(childIds)
    ]);

  const childrenById = new Map((children ?? []).map((child) => [child.id, child]));
  const profilesByUserId = new Map(
    (profiles ?? []).map((profile) => [profile.user_id, profile])
  );
  const approvedChallengesByUserId = new Map<string, number>();

  (submissions ?? []).forEach((submission) => {
    if (!submission.user_id) return;
    approvedChallengesByUserId.set(
      submission.user_id,
      (approvedChallengesByUserId.get(submission.user_id) ?? 0) + 1
    );
  });

  return links
    .map((link) => {
      if (!link.child_id) return null;
      const child = childrenById.get(link.child_id);
      if (!child) return null;

      const profile = profilesByUserId.get(link.child_id);

      return {
        id: child.id,
        fullName: child.full_name,
        city: child.city,
        level: profile?.level ?? "junior",
        totalPoints: verifiedXp.get(child.id) ?? 0,
        modulesCompleted: profile?.modules_completed ?? 0,
        approvedChallenges: approvedChallengesByUserId.get(child.id) ?? 0,
        linkedAt: link.linked_at
      };
    })
    .filter((child): child is ParentChildSummary => Boolean(child));
}

export async function listActiveChallenges(limit = 3): Promise<ActiveChallengeRow[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("challenges")
    .select(
      "id, title, description, instructions, points, week_start, requires_photo, requires_report, is_active"
    )
    .eq("is_active", true)
    .is("archived_at", null)
    .order("week_start", { ascending: false })
    .limit(limit)
    .returns<ActiveChallengeRow[]>();

  if (error || !data) {
    return [];
  }

  return data;
}

export async function listChallengesForAdmin() {
  const supabase = createSupabaseAdminClient();
  const [{ data, error }, { data: registrations }] = await Promise.all([
    supabase
      .from("challenges")
      .select("id, title, description, instructions, points, week_start, requires_photo, requires_report, is_active, archived_at")
      .order("week_start", { ascending: false }),
    supabase.from("challenge_registrations").select("challenge_id, status")
  ]);

  if (error || !data) return [];
  return data.map((challenge) => ({
    ...challenge,
    registrations: (registrations ?? []).filter((row) => row.challenge_id === challenge.id).length,
    activeRegistrations: (registrations ?? []).filter((row) => row.challenge_id === challenge.id && row.status === "registered").length,
    submittedRegistrations: (registrations ?? []).filter((row) => row.challenge_id === challenge.id && row.status === "submitted").length
  }));
}

function parseChallengeInstructions(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.replace(/^[-*\d.)\s]+/, "").trim())
    .filter(Boolean);
}

function addDays(dateValue: string, days: number) {
  const date = new Date(`${dateValue}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export async function listActiveChallengesWithFallback(limit = 3, userId?: string): Promise<WeeklyChallenge[]> {
  const data = await listActiveChallenges(limit);
  const supabase = createSupabaseAdminClient();
  const [{ data: registrations }, { data: submissions }, { data: parentInvitations }] = userId && data.length > 0
    ? await Promise.all([
        supabase
          .from("challenge_registrations")
          .select("id, challenge_id, status, deadline_at, cooldown_until, registered_at")
          .eq("user_id", userId)
          .in("challenge_id", data.map((challenge) => challenge.id))
          .order("registered_at", { ascending: false }),
        supabase
          .from("challenge_submissions")
          .select("challenge_id, registration_id, status, reviewer_note, points_awarded, reviewed_at, submitted_at")
          .eq("user_id", userId)
          .in("challenge_id", data.map((challenge) => challenge.id))
          .order("submitted_at", { ascending: false }),
        supabase
          .from("parent_challenges")
          .select("challenge_id, status, created_at")
          .eq("child_id", userId)
          .in("challenge_id", data.map((challenge) => challenge.id))
          .order("created_at", { ascending: false })
      ])
    : [{ data: [] }, { data: [] }, { data: [] }];
  const latestByChallenge = new Map<string, any>();
  (registrations ?? []).forEach((registration) => {
    if (!latestByChallenge.has(registration.challenge_id)) {
      latestByChallenge.set(registration.challenge_id, registration);
    }
  });
  const latestSubmissionByChallenge = new Map<string, any>();
  (submissions ?? []).forEach((submission) => {
    if (!latestSubmissionByChallenge.has(submission.challenge_id)) {
      latestSubmissionByChallenge.set(submission.challenge_id, submission);
    }
  });
  const parentInvitationByChallenge = new Map<string, any>();
  (parentInvitations ?? []).forEach((invitation) => {
    if (!parentInvitationByChallenge.has(invitation.challenge_id)) parentInvitationByChallenge.set(invitation.challenge_id, invitation);
  });

  return data.map((challenge) => {
    const registration = latestByChallenge.get(challenge.id);
    const submission = latestSubmissionByChallenge.get(challenge.id);
    const deadline = registration?.deadline_at ? new Date(registration.deadline_at) : null;
    const deadlineExpired = deadline ? deadline.getTime() <= Date.now() : false;
    const derivedCooldown = deadline ? new Date(deadline.getTime() + 3 * 24 * 60 * 60 * 1000) : null;
    const cooldownUntil = registration?.cooldown_until
      ? new Date(registration.cooldown_until)
      : derivedCooldown;
    const inCooldown = Boolean(
      cooldownUntil &&
        cooldownUntil.getTime() > Date.now() &&
        (deadlineExpired || registration?.status === "expired")
    );
    const registrationStatus = registration?.status === "submitted"
      ? "submitted"
      : registration?.status === "registered" && !deadlineExpired
        ? "registered"
        : inCooldown
          ? "cooldown"
          : "available";

    return {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      instructions: parseChallengeInstructions(challenge.instructions),
      points: challenge.points,
      weekStart: challenge.week_start,
      deadline: addDays(challenge.week_start, 6),
      requiresPhoto: challenge.requires_photo,
      status: registrationStatus === "submitted" ? "submitted" : "open",
      registrationStatus,
      registrationDeadline: registrationStatus === "registered" ? registration.deadline_at : null,
      cooldownUntil: registrationStatus === "cooldown" ? cooldownUntil?.toISOString() ?? null : null,
      submissionStatus: submission?.status ?? null,
      reviewerNote: submission?.reviewer_note ?? null,
      pointsAwarded: submission?.points_awarded ?? 0,
      reviewedAt: submission?.reviewed_at ?? null,
      parentInvitationStatus: parentInvitationByChallenge.get(challenge.id)?.status ?? null
    };
  });
}

export async function listModulesFromDatabase() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .order("order_index", { ascending: true })
    .returns<ModuleRow[]>();

  if (error || !data) {
    return [];
  }

  return data;
}

export async function listModulesWithFallback() {
  const data = await listModulesFromDatabase();

  if (data.length === 0) {
    return programModules.map((module) => ({
      id: module.id,
      order_index: module.week,
      title: module.title,
      subtitle: module.subtitle,
      description: module.summary,
      color: module.color,
      icon: module.icon,
      video_url: null,
      is_published: module.status !== "planned"
    }));
  }

  return data;
}

export async function listModulesWithLessons() {
  const databaseCurriculum = await loadPublishedDatabaseCurriculum();

  if (databaseCurriculum.cmsInitialized) {
    return databaseCurriculum.modules;
  }

  return programModules.map((module): ModuleWithLessons => ({
    id: module.id,
    order_index: module.week,
    title: module.title,
    subtitle: module.subtitle,
    description: module.summary,
    color: module.color,
    icon: module.icon,
    video_url: null,
    is_published: module.status !== "planned",
    is_application_fallback: true,
    lessons: module.lessons.map((lesson) => ({
      id: lesson.id,
      module_id: module.id,
      order_index: lesson.order,
      title: lesson.title,
      content: lesson.content,
      estimated_mins: lesson.estimatedMins,
      created_at: null
    })),
    quiz_questions: module.quiz.map((question, index) => ({
      id: question.id,
      module_id: module.id,
      order_index: index + 1,
      question: question.question,
      options: question.options,
      correct_index: question.correctIndex,
      explanation: question.explanation,
      points: question.points
    }))
  }));
}

export async function getModuleWithLessonsById(moduleId: string) {
  const supabase = createSupabaseAdminClient();
  const { data: module, error: moduleError } = await supabase
    .from("modules")
    .select("*")
    .eq("id", moduleId)
    .maybeSingle<ModuleRow>();

  if (moduleError || !module) {
    return null;
  }

  const [{ data: lessons }, { data: questions }] = await Promise.all([
    supabase
      .from("lessons")
      .select("id, module_id, order_index, title, content, estimated_mins, created_at")
      .eq("module_id", moduleId)
      .order("order_index", { ascending: true })
      .returns<LessonRow[]>(),
    supabase
      .from("quiz_questions")
      .select(
        "id, module_id, order_index, question, options, correct_index, explanation, points"
      )
      .eq("module_id", moduleId)
      .order("order_index", { ascending: true })
      .returns<QuizQuestionRow[]>()
  ]);

  return {
    ...module,
    lessons: lessons ?? [],
    quiz_questions: questions ?? []
  };
}

export async function listChallengeSubmissionsWithFallback() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("challenge_submissions")
    .select(
      "*, challenges!challenge_submissions_challenge_id_fkey(title, points), users!challenge_submissions_user_id_fkey(full_name, city)"
    )
    .order("submitted_at", { ascending: false });

  if (error || !data) {
    if (error) console.error("Unable to load challenge submissions", error);
    return [];
  }

  const userIds = Array.from(
    new Set(
      data
        .map((submission) => submission.user_id)
        .filter((userId): userId is string => Boolean(userId))
    )
  );
  const { data: profiles } = userIds.length > 0
    ? await supabase
        .from("ambassador_profiles")
        .select("user_id, total_points, level")
        .in("user_id", userIds)
    : { data: [] };
  const profileByUserId = new Map(
    (profiles ?? []).map((profile) => [profile.user_id, profile])
  );
  const photoPaths = Array.from(
    new Set(
      data
        .map((submission) => submission.photo_url)
        .filter((path): path is string => Boolean(path))
    )
  );
  const { data: signedPhotos, error: signedPhotoError } = photoPaths.length > 0
    ? await supabase.storage.from("challenge-photos").createSignedUrls(photoPaths, 60 * 60)
    : { data: [], error: null };
  if (signedPhotoError) {
    console.error("Unable to sign challenge evidence photos", signedPhotoError);
  }
  const signedPhotoByPath = new Map(
    (signedPhotos ?? [])
      .filter((photo) => photo.signedUrl)
      .map((photo) => [photo.path, photo.signedUrl])
  );

  return data.map((submission) => ({
    ...submission,
    ambassador_profiles: profileByUserId.get(submission.user_id) ?? null,
    photo_signed_url: submission.photo_url
      ? signedPhotoByPath.get(submission.photo_url) ?? null
      : null
  }));
}

export async function listForumReportsWithFallback() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("forum_reports")
    .select("*, users(full_name, city)")
    .order("created_at", { ascending: false });

  return error || !data ? [] : data;
}

export async function listNotificationsForUser(userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return error || !data ? [] : data;
}

export async function listAdminBroadcasts() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("id, title, body, data, created_at, user_id")
    .eq("type", "broadcast")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error || !data) return [];

  const broadcasts = new Map<string, any>();
  data.forEach((row: any) => {
    const key = row.data?.broadcast_id ?? `${row.title}:${row.body}:${row.created_at?.slice(0, 16)}`;
    const current = broadcasts.get(key);
    if (current) current.recipientCount += 1;
    else broadcasts.set(key, { ...row, recipientCount: 1 });
  });
  return [...broadcasts.values()];
}

export async function listParentChallengeInvitations(parentId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("parent_challenges")
    .select("*, challenge:challenges(id, title, description, points), child:users!parent_challenges_child_id_fkey(id, full_name)")
    .eq("parent_id", parentId)
    .order("created_at", { ascending: false });
  return error || !data ? [] : data;
}

export async function listParentChallengeSubmissions() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("parent_challenges")
    .select("*, challenge:challenges(id, title, points), child:users!parent_challenges_child_id_fkey(id, full_name), parent:users!parent_challenges_parent_id_fkey(id, full_name)")
    .in("status", ["submitted", "approved", "rejected"])
    .order("submitted_at", { ascending: false });
  return error || !data ? [] : data;
}

export async function listParentReportsForUser(parentId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", parentId)
    .eq("type", "parent_report")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    weekPeriod: item.data?.week_period ?? "Semaine recente",
    childName: item.data?.child_name ?? "Eleve",
    pointsEarned: item.data?.points_earned_this_week ?? 0,
    challengesCompleted: item.data?.challenges_completed ?? 0,
    currentRank: item.data?.current_rank ?? 0,
    level: item.data?.level ?? "junior",
    message: item.body
  }));
}

export async function listLeaderboard(currentUserId?: string) {
  const supabase = createSupabaseAdminClient();
  const testUserIds = await listTestAuthUserIds();
  const sevenDaysAgoIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [
    { data, error },
    { data: progress },
    { count: publishedModuleCount },
    verifiedXp,
    weeklyXp
  ] = await Promise.all([
    supabase
      .from("ambassador_profiles")
      .select("user_id, level, total_points, modules_completed, users(full_name, city), cohorts(name)"),
    supabase
      .from("module_progress")
      .select("user_id, quiz_score, modules!inner(is_published)")
      .eq("modules.is_published", true)
      .not("quiz_score", "is", null),
    supabase
      .from("modules")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true),
    calculateVerifiedXp(),
    calculateVerifiedXp(undefined, sevenDaysAgoIso)
  ]);

  if (error || !data) return [];

  const scoresByStudent = new Map<string, number[]>();
  (progress ?? []).forEach((row) => {
    if (typeof row.quiz_score !== "number") return;
    const scores = scoresByStudent.get(row.user_id) ?? [];
    scores.push(row.quiz_score);
    scoresByStudent.set(row.user_id, scores);
  });
  const moduleCount = publishedModuleCount ?? 0;

  return data
    .filter((entry: any) => !testUserIds.has(entry.user_id))
    .map((entry: any) => {
      const scores = scoresByStudent.get(entry.user_id) ?? [];
      const performanceScore = moduleCount > 0
        ? Math.round(scores.reduce((sum, score) => sum + score, 0) / moduleCount)
        : 0;

      return {
        id: entry.user_id,
        name: entry.users?.full_name ?? "Eleve",
        city: entry.users?.city ?? "Yaounde",
        level: entry.level ?? "junior",
        points: verifiedXp.get(entry.user_id) ?? 0,
        performanceScore,
        modulesCompleted: entry.modules_completed ?? 0,
        weeklyPoints: weeklyXp.get(entry.user_id) ?? 0,
        cohort: entry.cohorts?.name ?? "Cohorte",
        isCurrentUser: currentUserId ? entry.user_id === currentUserId : false
      };
    })
    .sort(
      (left, right) =>
        right.performanceScore - left.performanceScore ||
        right.modulesCompleted - left.modulesCompleted ||
        right.points - left.points
    )
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}
