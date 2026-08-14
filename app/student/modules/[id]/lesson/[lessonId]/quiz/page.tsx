import { notFound, redirect } from "next/navigation";

/* eslint-disable react/no-unescaped-entities -- French learning copy uses apostrophes. */

import { DashboardShell } from "@/components/layout/DashboardShell";
import { LearningSpacePreviewNotice } from "@/components/lesson/LearningSpacePreviewNotice";
import { LessonQuiz } from "@/components/quiz/LessonQuiz";
import { requireRole } from "@/lib/auth/guards";
import { getPublishedProgramModuleById, isModuleUnlockedForStudent } from "@/lib/db/cybera";
import { getLessonQuizBank } from "@/lib/curriculum/lesson-quiz-banks";

type LessonQuizPageProps = {
  params: {
    id: string;
    lessonId: string;
  };
};

export default async function LessonQuizPage({ params }: LessonQuizPageProps) {
  const user = await requireRole(["student", "admin"]);
  const isPreview = user.role === "admin";
  const programModule = await getPublishedProgramModuleById(params.id);
  const lesson = programModule?.lessons.find((item) => item.id === params.lessonId);
  const nextLesson = programModule?.lessons
    .filter((item) => item.order > (lesson?.order ?? Number.MAX_SAFE_INTEGER))
    .sort((a, b) => a.order - b.order)[0];
  const moduleTitle = programModule?.title;

  if (!lesson || !moduleTitle || !programModule) {
    notFound();
  }

  if (!isPreview && !(await isModuleUnlockedForStudent(user.supabaseUserId, programModule.week))) {
    redirect("/student/modules?locked=1");
  }

  return (
    <DashboardShell user={user} title={`Quiz - ${lesson.title}`}>
      <div className="grid gap-4">
        {isPreview ? (
          <LearningSpacePreviewNotice detail="Tu peux repondre au quiz de cette lecon pour le relire. Aucune reponse n'est enregistree." />
        ) : (
          <p className="rounded-lg border-2 border-secondary bg-white p-4 font-semibold text-slate-600 shadow-[0_4px_0_0_rgba(88,96,98,1)]">
            Tu as termine la lecon. Reponds correctement pour la fermer et continuer
            le module « {moduleTitle} ».
          </p>
        )}
        <LessonQuiz
          lessonId={params.lessonId}
          moduleId={params.id}
          nextLesson={nextLesson ? { id: nextLesson.id, title: nextLesson.title } : undefined}
          preview={isPreview}
          questions={getLessonQuizBank(lesson.id)}
          quiz={lesson.quiz}
          userId={user.supabaseUserId}
        />
      </div>
    </DashboardShell>
  );
}
