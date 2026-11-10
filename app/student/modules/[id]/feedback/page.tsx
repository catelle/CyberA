import { notFound } from "next/navigation";

import { ModuleFeedbackForm } from "@/components/forms/ModuleFeedbackForm";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { getPublishedProgramModuleById, listProgramModulesForStudent } from "@/lib/db/cybera";

type Props = { params: { id: string } };

export default async function ModuleFeedbackPage({ params }: Props) {
  const user = await requireRole(["student"]);
  const programModule = await getPublishedProgramModuleById(params.id, user.language);
  if (!programModule) notFound();
  if (user.programTrack === "scholarship") {
    const assignedModules = await listProgramModulesForStudent(user.supabaseUserId, user.language, user.programTrack);
    if (!assignedModules.some((module) => module.id === programModule.id)) notFound();
  }

  const supabase = createSupabaseAdminClient();
  const { data: progress } = await supabase
    .from("module_progress")
    .select("id")
    .eq("user_id", user.supabaseUserId)
    .eq("module_id", programModule.id)
    .eq("status", "completed")
    .maybeSingle();
  if (!progress) notFound();

  return (
    <DashboardShell user={user} title={`Ton avis - ${programModule.title}`}>
      <div className="mx-auto max-w-3xl">
        <ModuleFeedbackForm moduleId={programModule.id} />
      </div>
    </DashboardShell>
  );
}
