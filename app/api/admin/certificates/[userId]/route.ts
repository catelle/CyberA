import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const schema = z.object({
  allow: z.boolean(),
  note: z.string().trim().max(500).optional().default("")
});

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Decision invalide." }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const { error: decisionError } = await supabase.from("certificate_decisions").upsert({
    user_id: params.userId,
    allow_certificate: parsed.data.allow,
    note: parsed.data.note || null,
    decided_by: auth.user.supabaseUserId,
    decided_at: new Date().toISOString()
  }, { onConflict: "user_id" });
  if (decisionError) return jsonError(decisionError, "Impossible d'enregistrer la decision.");

  if (parsed.data.allow) {
    const { error } = await supabase.rpc("issue_training_certificate_if_eligible", { p_user_id: params.userId });
    if (error) return jsonError(error, "Impossible de generer le certificat.");
  } else {
    const { data: capstone } = await supabase.from("capstone_projects").select("id").eq("user_id", params.userId).limit(1);
    if (!capstone?.length) {
      await supabase.from("training_certificates").delete().eq("user_id", params.userId);
      await supabase.from("ambassador_profiles").update({ certified_at: null }).eq("user_id", params.userId);
    }
  }

  return NextResponse.json({ message: parsed.data.allow ? "Certificat autorise." : "Certificat non autorise." });
}
