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
    const [{ data: module }, { data: questions }] = await Promise.all([
      supabase.from("modules").select("id").eq("id", moduleId).maybeSingle<{ id: string }>(),
      supabase.from("quiz_questions").select("points").eq("module_id", moduleId)
    ]);

    return module
      ? {
          id: module.id,
          points: (questions ?? []).reduce(
            (sum, question) => sum + Math.max(question.points ?? 0, 0),
            0
          )
        }
      : null;
  }

  const { data } = await supabase
    .from("modules")
    .select("id")
    .eq("order_index", staticModule.week)
    .maybeSingle<{ id: string }>();

  return data
    ? {
        id: data.id,
        points: staticModule.quiz.reduce(
          (sum, question) => sum + Math.max(question.points, 0),
          0
        )
      }
    : null;
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
  const resolvedModule = await resolveDatabaseModuleId(supabase, parsed.data.moduleId);

  if (!resolvedModule) {
    return NextResponse.json(
      { message: "Module introuvable pour enregistrer la progression." },
      { status: 404 }
    );
  }

  const quizScore = parsed.data.quizScore ?? 0;
  const passed = parsed.data.passed === true && quizScore >= 70;
  const { error } = await supabase.rpc("record_module_progress", {
    p_user_id: auth.user.supabaseUserId,
    p_module_id: resolvedModule.id,
    p_lessons_done: parsed.data.lessonsRead.length,
    p_quiz_score: quizScore,
    p_passed: passed,
    p_points: passed ? resolvedModule.points : 0
  });

  if (error) return jsonError(error, "Impossible d'enregistrer la progression.");

  return NextResponse.json({ message: "Progression enregistree." });
}
