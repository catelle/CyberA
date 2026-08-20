import { NextResponse } from "next/server";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

type ProgressApprovalRouteProps = {
  params: { id: string };
};

export async function POST(
  _request: Request,
  { params }: ProgressApprovalRouteProps
) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { data: progress, error: progressError } = await supabase
    .from("module_progress")
    .select("id, user_id, status, modules!inner(order_index)")
    .eq("id", params.id)
    .maybeSingle<{
      id: string;
      user_id: string;
      status: string;
      modules: { order_index: number } | { order_index: number }[];
    }>();

  if (progressError) {
    return jsonError(progressError, "Impossible de verifier la progression.");
  }
  const moduleInfo = Array.isArray(progress?.modules)
    ? progress.modules[0]
    : progress?.modules;
  if (!progress || !moduleInfo?.order_index) {
    return NextResponse.json(
      { message: "Progression de module introuvable." },
      { status: 400 }
    );
  }
  if (progress.status !== "completed") {
    return NextResponse.json(
      { message: "L'eleve doit terminer le module 1 avant l'approbation." },
      { status: 409 }
    );
  }

  const { error } = await supabase.from("module_progress_approvals").upsert(
    {
      progress_id: progress.id,
      user_id: progress.user_id,
      approved_by: auth.user.supabaseUserId,
      approved_at: new Date().toISOString()
    },
    { onConflict: "progress_id" }
  );
  if (error) return jsonError(error, "Impossible d'approuver la progression.");

  await supabase.from("notifications").insert({
    user_id: progress.user_id,
    type: "module_progress_approved",
    title: "Progression approuvee",
    body: `Un administrateur a approuve ton module ${moduleInfo.order_index}. Le module suivant est maintenant disponible.`,
    data: { progress_id: progress.id, unlocked_module: moduleInfo.order_index + 1 }
  });

  return NextResponse.json({ message: "Progression approuvee. Le module suivant est debloque." });
}
