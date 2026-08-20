import { NextResponse } from "next/server";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { programModules } from "@/lib/program";

function normalizeTitle(value: string) {
  return value.trim().toLocaleLowerCase("fr");
}

export async function POST() {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { data: existingModules, error: moduleReadError } = await supabase
    .from("modules")
    .select("id, order_index, title")
    .order("order_index", { ascending: true });

  if (moduleReadError) {
    return jsonError(moduleReadError, "Impossible de charger les modules actuels.");
  }

  const usedIds = new Set<string>();
  const synchronizedIds: string[] = [];

  for (const curriculumModule of programModules) {
    const exactMatch = existingModules?.find(
      (module) =>
        !usedIds.has(module.id) &&
        normalizeTitle(module.title) === normalizeTitle(curriculumModule.title)
    );
    const orderMatch = existingModules?.find(
      (module) =>
        !usedIds.has(module.id) && module.order_index === curriculumModule.week
    );
    const existing = exactMatch ?? orderMatch;
    let moduleId = existing?.id;

    if (moduleId) {
      const { error } = await supabase
        .from("modules")
        .update({
          order_index: curriculumModule.week,
          title: curriculumModule.title,
          subtitle: curriculumModule.subtitle,
          description: curriculumModule.summary,
          color: curriculumModule.color,
          icon: curriculumModule.icon,
          is_published: true
        })
        .eq("id", moduleId);

      if (error) return jsonError(error, "Impossible de synchroniser un module.");
      usedIds.add(moduleId);
    } else {
      const { data, error } = await supabase
        .from("modules")
        .insert({
          order_index: curriculumModule.week,
          title: curriculumModule.title,
          subtitle: curriculumModule.subtitle,
          description: curriculumModule.summary,
          color: curriculumModule.color,
          icon: curriculumModule.icon,
          is_published: true
        })
        .select("id")
        .single<{ id: string }>();

      if (error || !data) {
        return jsonError(error, "Impossible de creer un module du programme.");
      }
      moduleId = data.id;
      usedIds.add(moduleId);
    }

    const [{ error: lessonDeleteError }, { error: quizDeleteError }] =
      await Promise.all([
        supabase.from("lessons").delete().eq("module_id", moduleId),
        supabase.from("quiz_questions").delete().eq("module_id", moduleId)
      ]);

    if (lessonDeleteError || quizDeleteError) {
      return jsonError(
        lessonDeleteError ?? quizDeleteError,
        "Impossible de remplacer l'ancien contenu du module."
      );
    }

    const [{ error: lessonInsertError }, { error: quizInsertError }] =
      await Promise.all([
        supabase.from("lessons").insert(
          curriculumModule.lessons.map((lesson) => ({
            module_id: moduleId,
            order_index: lesson.order,
            title: lesson.title,
            content: lesson.content,
            estimated_mins: lesson.estimatedMins
          }))
        ),
        supabase.from("quiz_questions").insert(
          curriculumModule.quiz.map((question, index) => ({
            module_id: moduleId,
            order_index: index + 1,
            question: question.question,
            options: question.options,
            correct_index: question.correctIndex,
            explanation: question.explanation,
            points: question.points
          }))
        )
      ]);

    if (lessonInsertError || quizInsertError) {
      return jsonError(
        lessonInsertError ?? quizInsertError,
        "Impossible d'enregistrer le contenu du programme."
      );
    }

    synchronizedIds.push(moduleId);
  }

  const obsoleteIds = (existingModules ?? [])
    .map((module) => module.id)
    .filter((id) => !synchronizedIds.includes(id));

  if (obsoleteIds.length > 0) {
    const { error } = await supabase
      .from("modules")
      .update({ is_published: false })
      .in("id", obsoleteIds);
    if (error) return jsonError(error, "Impossible d'archiver les anciens modules.");
  }

  return NextResponse.json({
    message: `${synchronizedIds.length} module(s) synchronise(s) avec le parcours eleve.`
  });
}
