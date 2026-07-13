import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import {
  leaderboardEntries,
  notifications,
  programModules,
  type ProgramModule,
  weeklyChallenges,
  type WeeklyChallenge
} from "@/lib/program";

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

export async function getSupabaseUserRoleCounts() {
  const supabase = createSupabaseAdminClient();
  const [students, parents, admins, consented] = await Promise.all([
    supabase.from("users").select("id", { count: "exact", head: true }).eq("role", "ambassador"),
    supabase.from("users").select("id", { count: "exact", head: true }).eq("role", "parent"),
    supabase.from("users").select("id", { count: "exact", head: true }).eq("role", "admin"),
    supabase
      .from("ambassador_profiles")
      .select("id", { count: "exact", head: true })
      .eq("parental_consent_given", true)
  ]);

  return {
    students: students.count ?? 0,
    parents: parents.count ?? 0,
    admins: admins.count ?? 0,
    consented: consented.count ?? 0
  };
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

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getJoinedModuleOrder(row: ModuleProgressRow) {
  if (Array.isArray(row.modules)) {
    return row.modules[0]?.order_index ?? null;
  }

  return row.modules?.order_index ?? null;
}

function calculateModuleProgressPercent(
  row: ModuleProgressRow | undefined,
  totalLessons: number
) {
  if (!row || row.status === "not_started") {
    return 0;
  }

  if (row.status === "completed") {
    return 100;
  }

  const lessonCount = Math.max(totalLessons, 1);
  const lessonsDone = Math.max(row.lessons_done ?? 0, 0);
  const lessonProgress = clampPercent((lessonsDone / lessonCount) * 80);
  const quizProgress =
    typeof row.quiz_score === "number" ? clampPercent((row.quiz_score / 100) * 19) : 0;

  return Math.min(99, lessonProgress + quizProgress);
}

export async function listProgramModulesForStudent(
  userId: string
): Promise<ProgramModule[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("module_progress")
    .select("module_id, status, lessons_done, quiz_score, modules(order_index)")
    .eq("user_id", userId)
    .returns<ModuleProgressRow[]>();

  if (error || !data) {
    return programModules;
  }

  const progressByModuleId = new Map(data.map((row) => [row.module_id, row]));
  const progressByOrder = new Map<number, ModuleProgressRow>();

  data.forEach((row) => {
    const order = getJoinedModuleOrder(row);
    if (typeof order === "number") {
      progressByOrder.set(order, row);
    }
  });

  return programModules.map((module) => {
    const row = progressByModuleId.get(module.id) ?? progressByOrder.get(module.week);

    return {
      ...module,
      progressPercent: calculateModuleProgressPercent(row, module.lessons.length)
    };
  });
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

  const [{ data: children }, { data: profiles }, { data: submissions }] =
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
        .returns<ApprovedChallengeSubmissionRow[]>()
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
        totalPoints: profile?.total_points ?? 0,
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
    .order("week_start", { ascending: false })
    .limit(limit)
    .returns<ActiveChallengeRow[]>();

  if (error || !data) {
    return [];
  }

  return data;
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

export async function listActiveChallengesWithFallback(limit = 3): Promise<WeeklyChallenge[]> {
  const data = await listActiveChallenges(limit);

  if (data.length === 0) {
    return weeklyChallenges.slice(0, limit);
  }

  return data.map((challenge) => ({
    id: challenge.id,
    title: challenge.title,
    description: challenge.description,
    instructions: parseChallengeInstructions(challenge.instructions),
    points: challenge.points,
    weekStart: challenge.week_start,
    deadline: addDays(challenge.week_start, 6),
    requiresPhoto: challenge.requires_photo,
    status: "open"
  }));
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
  const modules = await listModulesFromDatabase();

  if (modules.length === 0) {
    return [];
  }

  const supabase = createSupabaseAdminClient();
  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, module_id, order_index, title, content, estimated_mins, created_at")
    .in(
      "module_id",
      modules.map((module) => module.id)
    )
    .order("order_index", { ascending: true })
    .returns<LessonRow[]>();

  const lessonsByModule = new Map<string, LessonRow[]>();

  (lessons ?? []).forEach((lesson) => {
    const currentLessons = lessonsByModule.get(lesson.module_id) ?? [];
    currentLessons.push(lesson);
    lessonsByModule.set(lesson.module_id, currentLessons);
  });

  return modules.map((module) => ({
    ...module,
    lessons: lessonsByModule.get(module.id) ?? []
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

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, module_id, order_index, title, content, estimated_mins, created_at")
    .eq("module_id", moduleId)
    .order("order_index", { ascending: true })
    .returns<LessonRow[]>();

  return {
    ...module,
    lessons: lessons ?? []
  };
}

export async function listChallengeSubmissionsWithFallback() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("challenge_submissions")
    .select("*, challenges(title, points), users(full_name, city), ambassador_profiles(total_points, level)")
    .order("submitted_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return weeklyChallenges.map((challenge) => ({
      id: challenge.id,
      status: challenge.status === "submitted" ? "pending" : challenge.status,
      report_text: challenge.description,
      photo_url: null,
      points_awarded: 0,
      submitted_at: challenge.deadline,
      challenges: { title: challenge.title, points: challenge.points },
      users: { full_name: "Ambassadeur test", city: "Yaounde" },
      ambassador_profiles: { total_points: 0, level: "junior" }
    }));
  }

  return data;
}

export async function listForumReportsWithFallback() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("forum_reports")
    .select("*, users(full_name, city)")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    const { forumReports } = await import("@/lib/program");
    return forumReports.map((report) => ({
      id: report.id,
      type: report.type,
      platform: report.platform,
      description: report.description,
      target_url: report.target,
      status: report.status,
      admin_note: report.actionInstructions?.join("\n") ?? null,
      created_at: report.createdAt,
      users: { full_name: "Ambassadeur test", city: "Yaounde" }
    }));
  }

  return data;
}

export async function listNotificationsForUser(userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return notifications;
  }

  return data;
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
    childName: item.data?.child_name ?? "Ambassadeur",
    pointsEarned: item.data?.points_earned_this_week ?? 0,
    challengesCompleted: item.data?.challenges_completed ?? 0,
    currentRank: item.data?.current_rank ?? 0,
    level: item.data?.level ?? "junior",
    message: item.body
  }));
}

export async function listLeaderboard() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("ambassador_profiles")
    .select("level, total_points, users(full_name, city), cohorts(name)")
    .order("total_points", { ascending: false });

  if (error || !data || data.length === 0) {
    return leaderboardEntries;
  }

  return data.map((entry: any, index) => ({
    rank: index + 1,
    name: entry.users?.full_name ?? "Ambassadeur",
    city: entry.users?.city ?? "Yaounde",
    level: entry.level ?? "junior",
    points: entry.total_points ?? 0,
    weeklyPoints: 0,
    cohort: entry.cohorts?.name ?? "Cohorte",
    isCurrentUser: false
  }));
}
