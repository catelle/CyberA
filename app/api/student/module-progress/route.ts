import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const moduleProgressSchema = z.object({
  moduleId: z.string().trim().min(1),
  lessonsRead: z.array(z.string()).default([]),
  quizScore: z.coerce.number().int().min(0).max(100).optional(),
  passed: z.coerce.boolean().optional(),
  pointsEarned: z.coerce.number().int().min(0).default(0)
});

export async function POST(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = moduleProgressSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Progression invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const status = parsed.data.passed ? "completed" : "in_progress";
  const { error } = await supabase.from("module_progress").upsert(
    {
      user_id: auth.user.supabaseUserId,
      module_id: parsed.data.moduleId,
      status,
      lessons_done: parsed.data.lessonsRead.length,
      quiz_score: parsed.data.quizScore ?? null,
      points_earned: parsed.data.pointsEarned,
      started_at: new Date().toISOString(),
      completed_at: parsed.data.passed ? new Date().toISOString() : null
    },
    { onConflict: "user_id,module_id" }
  );

  if (error) return jsonError(error, "Impossible d'enregistrer la progression.");

  if (parsed.data.passed) {
    await supabase.rpc("increment_ambassador_points", {
      p_user_id: auth.user.supabaseUserId,
      p_points: parsed.data.pointsEarned
    });
  }

  return NextResponse.json({ message: "Progression enregistree." });
}
