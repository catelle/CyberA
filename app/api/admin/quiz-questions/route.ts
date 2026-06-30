import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const quizQuestionSchema = z.object({
  moduleId: z.string().uuid(),
  orderIndex: z.coerce.number().int().min(1),
  question: z.string().trim().min(5),
  options: z.array(z.string().trim().min(1)).min(2),
  correctIndex: z.coerce.number().int().min(0),
  explanation: z.string().trim().optional().or(z.literal("")),
  points: z.coerce.number().int().min(1).default(10)
});

export async function POST(request: Request) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = quizQuestionSchema.safeParse(payload);
  if (!parsed.success || parsed.data.correctIndex >= (parsed.data.options?.length ?? 0)) {
    return NextResponse.json({ message: "Question invalide.", issues: parsed.success ? undefined : parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("quiz_questions")
    .insert({
      module_id: parsed.data.moduleId,
      order_index: parsed.data.orderIndex,
      question: parsed.data.question,
      options: parsed.data.options,
      correct_index: parsed.data.correctIndex,
      explanation: parsed.data.explanation || null,
      points: parsed.data.points
    })
    .select("*")
    .single();

  if (error) return jsonError(error, "Impossible de creer la question.");
  return NextResponse.json({ question: data }, { status: 201 });
}
