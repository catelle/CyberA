import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { LessonQuiz } from "@/components/quiz/LessonQuiz";
import { requireRole } from "@/lib/auth/guards";
import { getPublishedProgramModuleById } from "@/lib/db/cybera";

type LessonQuizPageProps = {
  params: {
    id: string;
    lessonId: string;
  };
};

export default async function LessonQuizPage({ params }: LessonQuizPageProps) {
  const user = await requireRole(["student"]);
  const programModule = await getPublishedProgramModuleById(params.id);
  const lesson = programModule?.lessons.find((item) => item.id === params.lessonId);
  const moduleTitle = programModule?.title;

  if (!lesson || !moduleTitle) {
    notFound();
  }

  return (
    <DashboardShell user={user} title={`Quiz - ${lesson.title}`}>
      <div className="grid gap-4">
        <p className="rounded-lg border-2 border-secondary bg-white p-4 font-semibold text-slate-600 shadow-[0_4px_0_0_rgba(88,96,98,1)]">
          Tu as termine la lecon. Reponds correctement pour la fermer et continuer
          le module « {moduleTitle} ».
        </p>
        <LessonQuiz
          lessonId={params.lessonId}
          moduleId={params.id}
          quiz={lesson.quiz}
          userId={user.supabaseUserId}
        />
      </div>
    </DashboardShell>
  );
}
