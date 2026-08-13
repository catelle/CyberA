import { NextResponse } from "next/server";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { lessonQuizBanks } from "@/lib/curriculum/lesson-quiz-banks";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function POST() {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { data: completedLessons, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", auth.user.supabaseUserId)
    .returns<{ lesson_id: string }[]>();

  if (error) return jsonError(error, "Impossible de preparer le Strike.");

  const completedLessonIds = Array.from(new Set((completedLessons ?? []).map((row) => row.lesson_id)));
  const pool = completedLessonIds.flatMap((lessonId) => lessonQuizBanks[lessonId] ?? []);

  if (pool.length < 10) {
    return NextResponse.json(
      { message: "Termine au moins une lecon pour debloquer le Strike." },
      { status: 400 }
    );
  }

  const sampled = shuffle(pool).slice(0, 10);

  const { data: attempt, error: insertError } = await supabase
    .from("strike_attempts")
    .insert({
      user_id: auth.user.supabaseUserId,
      question_ids: sampled.map((question) => question.id),
      status: "in_progress"
    })
    .select("id")
    .single<{ id: string }>();

  if (insertError || !attempt) {
    return jsonError(insertError, "Impossible de demarrer le Strike.");
  }

  return NextResponse.json({
    attemptId: attempt.id,
    questions: sampled.map((question) => ({
      id: question.id,
      question: question.question,
      options: question.options,
      correctIndex: question.correctIndex,
      explanation: question.explanation
    }))
  });
}
