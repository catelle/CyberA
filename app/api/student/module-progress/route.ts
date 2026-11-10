import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { getModuleById, programModules } from "@/lib/program";
import { getLessonQuizBank } from "@/lib/curriculum/lesson-quiz-banks";

const moduleProgressSchema = z.object({
  progressVersion: z.literal(3).optional(),
  moduleId: z.string().trim().min(1),
  lessonsRead: z.array(z.string()).default([]),
  lessonQuizAnswers: z.record(z.record(z.coerce.number().int())).default({}),
  quizAnswers: z.record(z.coerce.number().int()).default({}),
  quizScore: z.coerce.number().int().min(0).max(100).optional(),
  passed: z.coerce.boolean().optional(),
  pointsEarned: z.coerce.number().int().min(0).default(0)
});

type StoredProgress = {
  id: string;
  status: "not_started" | "in_progress" | "completed";
  lessons_done: number | null;
  quiz_score: number | null;
  quiz_attempts: number | null;
  points_earned: number | null;
};

async function recordProgressOnLegacySchema({
  supabase,
  userId,
  moduleId,
  lessonsDone,
  quizScore,
  passed,
  points
}: {
  supabase: ReturnType<typeof createSupabaseAdminClient>;
  userId: string;
  moduleId: string;
  lessonsDone: number;
  quizScore?: number;
  passed: boolean;
  points: number;
}) {
  const { data: current, error: readError } = await supabase
    .from("module_progress")
    .select("id, status, lessons_done, quiz_score, quiz_attempts, points_earned")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .maybeSingle<StoredProgress>();

  if (readError) return readError;

  const isQuizAttempt = quizScore !== undefined;
  const firstCompletion = passed && current?.status !== "completed";
  const potentialAward = firstCompletion ? Math.max(points, 0) : 0;
  const values = {
    user_id: userId,
    module_id: moduleId,
    status: current?.status === "completed" || passed ? "completed" : "in_progress",
    lessons_done: Math.max(current?.lessons_done ?? 0, lessonsDone),
    quiz_score: isQuizAttempt
      ? Math.max(current?.quiz_score ?? 0, quizScore)
      : current?.quiz_score,
    quiz_attempts: (current?.quiz_attempts ?? 0) + (isQuizAttempt ? 1 : 0),
    points_earned: (current?.points_earned ?? 0) + potentialAward,
    started_at: new Date().toISOString(),
    completed_at: current?.status === "completed" || !passed ? undefined : new Date().toISOString()
  };

  let didComplete = false;
  const progressResult = current
    ? firstCompletion
      ? await supabase
          .from("module_progress")
          .update(values)
          .eq("id", current.id)
          .neq("status", "completed")
          .select("id")
          .maybeSingle<{ id: string }>()
      : await supabase.from("module_progress").update(values).eq("id", current.id)
    : await supabase.from("module_progress").insert(values);

  if (progressResult.error) return progressResult.error;
  didComplete = firstCompletion && (!current || Boolean(progressResult.data));

  if (didComplete && potentialAward > 0) {
    const { error: pointsError } = await supabase.rpc("increment_ambassador_points", {
      p_user_id: userId,
      p_points: potentialAward
    });
    if (pointsError) return pointsError;
  }

  if (didComplete) {
    const { count, error: countError } = await supabase
      .from("module_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "completed");
    if (countError) return countError;

    const { error: profileError } = await supabase
      .from("ambassador_profiles")
      .update({ modules_completed: count ?? 0 })
      .eq("user_id", userId);
    if (profileError) return profileError;
  }

  return null;
}

async function resolveDatabaseModuleId(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  moduleId: string
) {
  const staticModule = getModuleById(moduleId);

  if (!staticModule) {
    const [{ data: module }, { data: questions }, { data: lessons }] = await Promise.all([
      supabase
        .from("modules")
        .select("id, order_index")
        .eq("id", moduleId)
        .maybeSingle<{ id: string; order_index: number }>(),
      supabase
        .from("quiz_questions")
        .select("id, correct_index, points")
        .eq("module_id", moduleId),
      supabase.from("lessons").select("id").eq("module_id", moduleId)
    ]);

    if (!module) return null;

    // Published modules use database UUIDs, while the curated learning spaces
    // use stable lesson/question IDs. Keep those IDs aligned with what the
    // browser submits; otherwise a genuinely passed lesson is filtered out as
    // unknown and the module appears stuck at 0%.
    const curatedModule = programModules.find(
      (candidate) => candidate.week === module.order_index
    );
    if (curatedModule) {
      return {
        id: module.id,
        lessonIds: curatedModule.lessons.map((lesson) => lesson.id),
        lessonCorrectAnswers: Object.fromEntries(
          curatedModule.lessons.map((lesson) => [lesson.id, lesson.quiz.correctIndex])
        ),
        questions: curatedModule.quiz.map((question) => ({
          id: question.id,
          correctIndex: question.correctIndex,
          points: Math.max(question.points, 0)
        }))
      };
    }

    return {
          id: module.id,
          lessonIds: (lessons ?? []).map((lesson) => lesson.id),
          lessonCorrectAnswers: Object.fromEntries(
            (lessons ?? []).map((lesson) => [lesson.id, 0])
          ),
          questions: (questions ?? []).map((question) => ({
            id: question.id,
            correctIndex: question.correct_index,
            points: Math.max(question.points ?? 0, 0)
          }))
        };
  }

  const { data } = await supabase
    .from("modules")
    .select("id")
    .eq("order_index", staticModule.week)
    .eq("is_published", true)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle<{ id: string }>();

  return data
    ? {
        id: data.id,
        lessonIds: staticModule.lessons.map((lesson) => lesson.id),
        lessonCorrectAnswers: Object.fromEntries(
          staticModule.lessons.map((lesson) => [lesson.id, lesson.quiz.correctIndex])
        ),
        questions: staticModule.quiz.map((question) => ({
          id: question.id,
          correctIndex: question.correctIndex,
          points: Math.max(question.points, 0)
        }))
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

  const validLessonIds = new Set(resolvedModule.lessonIds);
  const lessonsRead = Array.from(
    new Set(parsed.data.lessonsRead.filter((lessonId) => validLessonIds.has(lessonId)))
  );
  let verifiedLessonsRead = lessonsRead.filter((lessonId) => {
    const submitted = parsed.data.lessonQuizAnswers[lessonId] ?? {};
    const bank = getLessonQuizBank(lessonId);
    if (bank?.length) {
      const correctCount = bank.filter(
        (question, index) => submitted[question.id ?? String(index)] === question.correctIndex
      ).length;
      return correctCount >= Math.ceil(bank.length * 0.7);
    }
    return submitted["0"] === resolvedModule.lessonCorrectAnswers[lessonId];
  });
  const [{ data: storedProgress }, { data: storedLessons }] = await Promise.all([
    supabase
      .from("module_progress")
      .select("lessons_done")
      .eq("user_id", auth.user.supabaseUserId)
      .eq("module_id", resolvedModule.id)
      .maybeSingle<{ lessons_done: number | null }>(),
    supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", auth.user.supabaseUserId)
      .eq("module_id", resolvedModule.id)
      .returns<{ lesson_id: string }[]>()
  ]);
  const completedLessonIds = new Set([
    ...resolvedModule.lessonIds.slice(
      0,
      Math.min(
        Math.max(storedProgress?.lessons_done ?? 0, 0),
        resolvedModule.lessonIds.length
      )
    ),
    ...(storedLessons ?? []).map((lesson) => lesson.lesson_id),
    ...verifiedLessonsRead
  ]);
  const completedAllLessons =
    resolvedModule.lessonIds.length > 0 &&
    resolvedModule.lessonIds.every((lessonId) => completedLessonIds.has(lessonId));
  const submittedQuizAnswers = parsed.data.quizAnswers;
  const isQuizAttempt = Object.keys(submittedQuizAnswers).length > 0;

  if (!isQuizAttempt && parsed.data.progressVersion !== 3) {
    return NextResponse.json(
      { message: "Le quiz de la lecon doit etre reussi avant sa validation." },
      { status: 400 }
    );
  }

  const answeredQuestions = resolvedModule.questions.filter(
    (question) => submittedQuizAnswers[question.id] !== undefined
  );
  const correctQuestions = resolvedModule.questions.filter(
    (question) => submittedQuizAnswers[question.id] === question.correctIndex
  );
  const quizScore = isQuizAttempt && resolvedModule.questions.length > 0
    ? Math.round((correctQuestions.length / resolvedModule.questions.length) * 100)
    : 0;
  const verifiedPoints = correctQuestions.reduce(
    (sum, question) => sum + question.points,
    0
  );
  const passed =
    answeredQuestions.length === resolvedModule.questions.length &&
    quizScore >= 70 &&
    completedAllLessons;

  if (verifiedLessonsRead.length > 0) {
    const { error: lessonProgressError } = await supabase
      .from("lesson_progress")
      .upsert(
        verifiedLessonsRead.map((lessonId) => ({
          user_id: auth.user.supabaseUserId,
          module_id: resolvedModule.id,
          lesson_id: lessonId
        })),
        { onConflict: "user_id,module_id,lesson_id", ignoreDuplicates: true }
      );

    const lessonProgressTableMissing =
      lessonProgressError?.code === "PGRST205" ||
      lessonProgressError?.code === "42P01";

    if (lessonProgressError && !lessonProgressTableMissing) {
      return jsonError(
        lessonProgressError,
        "Impossible d'enregistrer les lecons terminees."
      );
    }
  }

  let { error } = isQuizAttempt
    ? await supabase.rpc("record_module_progress", {
        p_user_id: auth.user.supabaseUserId,
        p_module_id: resolvedModule.id,
        p_lessons_done: completedLessonIds.size,
        p_quiz_score: quizScore,
        p_passed: passed,
        p_points: passed ? verifiedPoints : 0
      })
    : await supabase.rpc("record_lesson_progress", {
        p_user_id: auth.user.supabaseUserId,
        p_module_id: resolvedModule.id,
        p_lessons_done: completedLessonIds.size
      });

  // Projects deployed before the atomic scoring migration do not expose the
  // new RPCs yet. Keep learning progress usable while that migration rolls out.
  if (error?.code === "PGRST202") {
    error = await recordProgressOnLegacySchema({
      supabase,
      userId: auth.user.supabaseUserId,
      moduleId: resolvedModule.id,
      lessonsDone: completedLessonIds.size,
      quizScore: isQuizAttempt ? quizScore : undefined,
      passed,
      points: verifiedPoints
    });
  }

  if (error) return jsonError(error, "Impossible d'enregistrer la progression.");

  return NextResponse.json({
    message: "Progression enregistree.",
    score: isQuizAttempt ? quizScore : null,
    passed,
    pointsAwarded: passed ? verifiedPoints : 0
  });
}
