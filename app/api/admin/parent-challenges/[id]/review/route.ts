import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const schema = z.object({
  status: z.enum(["approved", "rejected"]),
  reviewerNote: z.string().trim().optional().or(z.literal("")),
  pointsAwarded: z.coerce.number().int().min(0).default(20)
});

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Revision invalide." }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.rpc("review_parent_challenge", {
    p_parent_challenge_id: params.id,
    p_status: parsed.data.status,
    p_points: parsed.data.pointsAwarded,
    p_reviewer_id: auth.user.supabaseUserId,
    p_reviewer_note: parsed.data.reviewerNote || ""
  }).single<{ child_id: string; parent_id: string; points_delta: number; review_changed: boolean }>();
  if (error) return jsonError(error, "Impossible de reviser le rapport parent.");

  if (data && (data.review_changed || data.points_delta !== 0)) {
    await supabase.from("notifications").insert([
      {
        user_id: data.parent_id,
        type: `parent_challenge_${parsed.data.status}`,
        title: parsed.data.status === "approved" ? "Rapport parent approuve" : "Rapport parent rejete",
        body: parsed.data.reviewerNote || (parsed.data.status === "approved" ? "Votre action familiale a ete validee." : "Votre rapport doit etre corrige."),
        data: { parent_challenge_id: params.id }
      },
      {
        user_id: data.child_id,
        type: `parent_challenge_${parsed.data.status}`,
        title: parsed.data.status === "approved" ? "Bonus famille gagne" : "Rapport parent a revoir",
        body: parsed.data.status === "approved" ? `${parsed.data.pointsAwarded} points ont ete ajoutes a ton compte.` : "Le rapport de ton parent n'a pas ete valide.",
        data: { parent_challenge_id: params.id, points: parsed.data.status === "approved" ? parsed.data.pointsAwarded : 0 }
      }
    ]);
  }
  return NextResponse.json({ message: "Rapport parent revise." });
}
