import { notFound, redirect } from "next/navigation";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { requireRole } from "@/lib/auth/guards";
import {
  getPublishedProgramModuleById,
  listCompletedLessonIdsForStudent
} from "@/lib/db/cybera";

type QuizPageProps = {
  params: {
    id: string;
  };
};

export default async function QuizPage({ params }: QuizPageProps) {
  const user = await requireRole(["student"]);
  const programModule = await getPublishedProgramModuleById(params.id);

  if (!programModule) {
    notFound();
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

  return (
    <DashboardShell user={user} title={`Quiz - ${programModule.title}`}>
      <QuizEngine module={programModule} userId={user.supabaseUserId} />
    </DashboardShell>
  );
}
