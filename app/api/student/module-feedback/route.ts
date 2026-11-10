import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { getModuleById } from "@/lib/program";

const feedbackSchema = z.object({
  moduleId: z.string().trim().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  understandingRating: z.coerce.number().int().min(1).max(5),
  usefulnessRating: z.coerce.number().int().min(1).max(5),
  pace: z.enum(["too_slow", "just_right", "too_fast"]),
  feedback: z.string().trim().min(20).max(1000),
  suggestions: z.string().trim().max(1000).optional().default(""),
  publishConsent: z.boolean().default(false)
});

export async function POST(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const parsed = feedbackSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Reponds aux questions et ajoute une impression d'au moins 20 caracteres." },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  let databaseModuleId = parsed.data.moduleId;
  const staticModule = getModuleById(parsed.data.moduleId);
  if (staticModule) {
    const { data: module } = await supabase
      .from("modules")
      .select("id")
      .eq("order_index", staticModule.week)
      .eq("is_published", true)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle<{ id: string }>();
    databaseModuleId = module?.id ?? databaseModuleId;
  }

  const { data: progress, error: progressError } = await supabase
    .from("module_progress")
    .select("id")
    .eq("user_id", auth.user.supabaseUserId)
    .eq("module_id", databaseModuleId)
    .eq("status", "completed")
    .maybeSingle();
  if (progressError) return jsonError(progressError, "Impossible de verifier le module.");
  if (!progress) {
    return NextResponse.json(
      { message: "Ta progression est encore en synchronisation. Reessaie dans quelques secondes." },
      { status: 409 }
    );
  }

  const { error } = await supabase.from("module_feedback").upsert(
    {
      user_id: auth.user.supabaseUserId,
      module_id: databaseModuleId,
      rating: parsed.data.rating,
      understanding_rating: parsed.data.understandingRating,
      usefulness_rating: parsed.data.usefulnessRating,
      pace: parsed.data.pace,
      feedback: parsed.data.feedback,
      suggestions: parsed.data.suggestions || null,
      publish_consent: parsed.data.publishConsent,
      status: "pending",
      reviewed_by: null,
      reviewed_at: null,
      updated_at: new Date().toISOString()
    },
    { onConflict: "user_id,module_id" }
  );
  if (error) return jsonError(error, "Impossible d'enregistrer ton avis.");

  await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", auth.user.supabaseUserId)
    .eq("type", "module_feedback_request")
    .contains("data", { module_id: databaseModuleId });

  return NextResponse.json({ message: "Merci ! Ton avis a ete envoye pour validation." });
}
