import { notFound, redirect } from "next/navigation";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { LearningSpacePreviewNotice } from "@/components/lesson/LearningSpacePreviewNotice";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { requireRole } from "@/lib/auth/guards";
import {
  getPublishedProgramModuleById,
  isModuleUnlockedForStudent,
  listCompletedLessonIdsForStudent
} from "@/lib/db/cybera";

type QuizPageProps = {
  params: {
    id: string;
  };
};

export default async function QuizPage({ params }: QuizPageProps) {
  const user = await requireRole(["student", "admin"]);
  const isPreview = user.role === "admin";
  const programModule = await getPublishedProgramModuleById(params.id);

  if (!programModule) {
    notFound();
  }

  if (!isPreview) {
    if (!(await isModuleUnlockedForStudent(user.supabaseUserId, programModule.week))) {
      redirect("/student/modules?locked=1");
    }

    const completedLessonIds = await listCompletedLessonIdsForStudent(
      user.supabaseUserId,
      programModule.id,
      programModule.lessons.map((lesson) => lesson.id),
      programModule.week
    );

    if (completedLessonIds.length !== programModule.lessons.length) {
      redirect(`/student/modules/${programModule.id}`);
    }
  }

  return (
    <DashboardShell user={user} title={`Quiz - ${programModule.title}`}>
      <div className="grid gap-4">
        {isPreview ? (
          <LearningSpacePreviewNotice detail="Tu peux repondre a tout le quiz du module pour le relire. Aucun score, aucun point et aucun badge ne sont enregistres." />
        ) : null}
        <QuizEngine module={programModule} preview={isPreview} userId={user.supabaseUserId} />
      </div>
    </DashboardShell>
  );
}
