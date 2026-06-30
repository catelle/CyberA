import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { requireRole } from "@/lib/auth/guards";
import { getModuleById } from "@/lib/program";

type QuizPageProps = {
  params: {
    id: string;
  };
};

export default async function QuizPage({ params }: QuizPageProps) {
  const user = await requireRole(["student"]);
  const programModule = getModuleById(params.id);

  if (!programModule) {
    notFound();
  }

  return (
    <DashboardShell user={user} title={`Quiz - ${programModule.title}`}>
      <QuizEngine module={programModule} userId={user.id} />
    </DashboardShell>
  );
}
