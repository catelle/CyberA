import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { getModuleById } from "@/lib/program";

const moduleProgressSchema = z.object({
  moduleId: z.string().trim().min(1),
  lessonsRead: z.array(z.string()).default([]),
  quizScore: z.coerce.number().int().min(0).max(100).optional(),
  passed: z.coerce.boolean().optional(),
  pointsEarned: z.coerce.number().int().min(0).default(0)
});

async function resolveDatabaseModuleId(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  moduleId: string
) {
  const staticModule = getModuleById(moduleId);

  if (!staticModule) {
    return moduleId;
  }

  const { data } = await supabase
    .from("modules")
    .select("id")
    .eq("order_index", staticModule.week)
    .maybeSingle<{ id: string }>();

  return data?.id ?? null;
}

export async function POST(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = moduleProgressSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Progression invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const moduleId = await resolveDatabaseModuleId(supabase, parsed.data.moduleId);

  if (!moduleId) {
    return NextResponse.json(
      { message: "Module introuvable pour enregistrer la progression." },
      { status: 404 }
    );
  }

  const status = parsed.data.passed ? "completed" : "in_progress";
  const { data: existingProgress } = await supabase
    .from("module_progress")
    .select("status, started_at")
    .eq("user_id", auth.user.supabaseUserId)
    .eq("module_id", moduleId)
    .maybeSingle<{ status: string | null; started_at: string | null }>();
  const now = new Date().toISOString();

  const { error } = await supabase.from("module_progress").upsert(
    {
      user_id: auth.user.supabaseUserId,
      module_id: moduleId,
      status,
      lessons_done: parsed.data.lessonsRead.length,
      quiz_score: parsed.data.quizScore ?? null,
      points_earned: parsed.data.pointsEarned,
      started_at: existingProgress?.started_at ?? now,
      completed_at: parsed.data.passed ? now : null
    },
    { onConflict: "user_id,module_id" }
  );

  if (error) return jsonError(error, "Impossible d'enregistrer la progression.");

  if (parsed.data.passed && existingProgress?.status !== "completed") {
    await supabase.rpc("increment_ambassador_points", {
      p_user_id: auth.user.supabaseUserId,
      p_points: parsed.data.pointsEarned
    });

    const { count } = await supabase
      .from("module_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", auth.user.supabaseUserId)
      .eq("status", "completed");

    await supabase
      .from("ambassador_profiles")
      .update({ modules_completed: count ?? 0 })
      .eq("user_id", auth.user.supabaseUserId);
  }

  return NextResponse.json({ message: "Progression enregistree." });
}
