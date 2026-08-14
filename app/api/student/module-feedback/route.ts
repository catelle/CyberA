import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { getModuleById } from "@/lib/program";

const feedbackSchema = z.object({
  moduleId: z.string().trim().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  feedback: z.string().trim().min(20).max(1000),
  publishConsent: z.literal(true)
});

export async function POST(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const parsed = feedbackSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Ajoute une note, un avis d'au moins 20 caracteres et ton autorisation de publication." },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  let databaseModuleId = parsed.data.moduleId;
  const staticModule = getModuleById(parsed.data.moduleId);
  if (staticModule) {
    const { data: module } = await supabase
      .from("modules")
      .select("id")
      .eq("order_index", staticModule.week)
      .eq("is_published", true)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle<{ id: string }>();
    databaseModuleId = module?.id ?? databaseModuleId;
  }

  const { data: progress, error: progressError } = await supabase
    .from("module_progress")
    .select("id")
    .eq("user_id", auth.user.supabaseUserId)
    .eq("module_id", databaseModuleId)
    .eq("status", "completed")
    .maybeSingle();
  if (progressError) return jsonError(progressError, "Impossible de verifier le module.");
  if (!progress) {
    return NextResponse.json(
      { message: "Ta progression est encore en synchronisation. Reessaie dans quelques secondes." },
      { status: 409 }
    );
  }

  const { error } = await supabase.from("module_feedback").upsert(
    {
      user_id: auth.user.supabaseUserId,
      module_id: databaseModuleId,
      rating: parsed.data.rating,
      feedback: parsed.data.feedback,
      publish_consent: true,
      status: "pending",
      reviewed_by: null,
      reviewed_at: null,
      updated_at: new Date().toISOString()
    },
    { onConflict: "user_id,module_id" }
  );
  if (error) return jsonError(error, "Impossible d'enregistrer ton avis.");

  return NextResponse.json({ message: "Merci ! Ton avis a ete envoye pour validation." });
}
