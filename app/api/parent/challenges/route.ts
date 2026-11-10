import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const schema = z.object({
  invitationId: z.string().uuid(),
  reportText: z.string().trim().min(100, "Le rapport doit contenir au moins 100 caracteres.")
});

export async function POST(request: Request) {
  const auth = await requireApiRole(["parent"]);
  if (!auth.ok) return auth.response;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Rapport invalide." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("parent_challenges")
    .update({ status: "submitted", report_text: parsed.data.reportText, submitted_at: new Date().toISOString() })
    .eq("id", parsed.data.invitationId)
    .eq("parent_id", auth.user.supabaseUserId)
    .in("status", ["invited", "rejected"])
    .select("id")
    .maybeSingle();
  if (error) return jsonError(error, "Impossible d'envoyer le rapport.");
  if (!data) return NextResponse.json({ message: "Cette invitation ne peut plus etre soumise." }, { status: 409 });
  return NextResponse.json({ message: "Rapport envoye pour validation." });
}
