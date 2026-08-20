import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

function joined<T>(value: T | T[] | null | undefined): T | null {
  return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

export async function listModuleFeedbackForAdmin() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("module_feedback")
    .select(
      "id, rating, understanding_rating, usefulness_rating, pace, feedback, suggestions, publish_consent, status, created_at, reviewed_at, users!module_feedback_user_id_fkey(full_name), modules(title, order_index)"
    )
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []).map((row: any) => ({
    id: row.id as string,
    learnerName: joined(row.users)?.full_name ?? "Eleve",
    moduleTitle: joined(row.modules)?.title ?? `Module ${joined(row.modules)?.order_index ?? ""}`,
    rating: row.rating as number,
    understandingRating: (row.understanding_rating as number | null) ?? null,
    usefulnessRating: (row.usefulness_rating as number | null) ?? null,
    pace: (row.pace as string | null) ?? null,
    feedback: row.feedback as string,
    suggestions: (row.suggestions as string | null) ?? null,
    publishConsent: row.publish_consent === true,
    status: row.status as "pending" | "approved" | "rejected",
    createdAt: row.created_at as string,
    reviewedAt: (row.reviewed_at as string | null) ?? null
  }));
}

export async function listApprovedTestimonials(limit = 6) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("module_feedback")
    .select("id, rating, feedback, created_at, users!module_feedback_user_id_fkey(full_name), modules(title)")
    .eq("status", "approved")
    .eq("publish_consent", true)
    .order("reviewed_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data ?? []).map((row: any) => {
    const fullName = joined(row.users)?.full_name?.trim() ?? "Cyberambassadeur";
    const firstName = fullName.split(/\s+/)[0] || "Cyberambassadeur";
    return {
      id: row.id as string,
      firstName,
      moduleTitle: joined(row.modules)?.title ?? "Cyberambassadeurs",
      rating: row.rating as number,
      feedback: row.feedback as string
    };
  });
}
