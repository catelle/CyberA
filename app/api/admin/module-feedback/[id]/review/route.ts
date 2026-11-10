import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const reviewSchema = z.object({ status: z.enum(["approved", "rejected"]) });

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;
  const parsed = reviewSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Decision invalide." }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const { data: feedback } = await supabase
    .from("module_feedback")
    .select("publish_consent")
    .eq("id", params.id)
    .maybeSingle<{ publish_consent: boolean }>();
  if (!feedback) return NextResponse.json({ message: "Avis introuvable." }, { status: 404 });
  if (parsed.data.status === "approved" && !feedback.publish_consent) {
    return NextResponse.json({ message: "Cet eleve n'a pas autorise la publication." }, { status: 409 });
  }

  const { error } = await supabase
    .from("module_feedback")
    .update({
      status: parsed.data.status,
      reviewed_by: auth.user.supabaseUserId,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", params.id);
  if (error) return jsonError(error, "Impossible de reviser cet avis.");
  return NextResponse.json({ message: parsed.data.status === "approved" ? "Avis publie." : "Avis rejete." });
}
