import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { lessonQuizQuestionsById } from "@/lib/curriculum/lesson-quiz-banks";

const submitStrikeSchema = z.object({
  attemptId: z.string().uuid(),
  answers: z.record(z.coerce.number().int())
});

type StrikeAttemptRow = {
  id: string;
  status: "in_progress" | "submitted";
  question_ids: string[];
};

export async function POST(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = submitStrikeSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Soumission invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: attempt, error: attemptError } = await supabase
    .from("strike_attempts")
    .select("id, status, question_ids")
    .eq("id", parsed.data.attemptId)
    .eq("user_id", auth.user.supabaseUserId)
    .maybeSingle<StrikeAttemptRow>();

  if (attemptError) return jsonError(attemptError, "Impossible de charger le Strike.");
  if (!attempt) {
    return NextResponse.json({ message: "Strike introuvable." }, { status: 404 });
  }
  if (attempt.status === "submitted") {
    return NextResponse.json({ message: "Ce Strike a deja ete soumis." }, { status: 409 });
  }

  const bank = attempt.question_ids
    .map((id) => lessonQuizQuestionsById[id])
    .filter((question): question is NonNullable<typeof question> => Boolean(question));

  const submittedAnswers = parsed.data.answers;
  const score = bank.filter((question) => submittedAnswers[question.id!] === question.correctIndex).length;
  const passed = score >= 7;

  const { data: rpcResult, error: rpcError } = await supabase
    .rpc("submit_strike_attempt", {
      p_user_id: auth.user.supabaseUserId,
      p_attempt_id: attempt.id,
      p_score: score,
      p_passed: passed
    })
    .single<{ points_awarded: number }>();

  if (rpcError) return jsonError(rpcError, "Impossible d'enregistrer le resultat du Strike.");

  return NextResponse.json({
    score,
    total: bank.length,
    passed,
    pointsAwarded: rpcResult?.points_awarded ?? 0,
    review: bank.map((question) => ({
      id: question.id,
      correctIndex: question.correctIndex,
      explanation: question.explanation
    }))
  });
}
