import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { leaderboardEntries, notifications, programModules, weeklyChallenges } from "@/lib/program";

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

export async function listModulesWithFallback() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .order("order_index", { ascending: true })
    .returns<ModuleRow[]>();

  if (error || !data || data.length === 0) {
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
