import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const reviewSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  reviewerNote: z.string().trim().optional().or(z.literal("")),
  pointsAwarded: z.coerce.number().int().min(0).default(0)
});

type ReviewRouteProps = {
  params: { id: string };
};

export async function POST(request: Request, { params }: ReviewRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = reviewSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Revision invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: previous, error: previousError } = await supabase
    .from("challenge_submissions")
    .select("status, points_awarded")
    .eq("id", params.id)
    .single<{ status: string; points_awarded: number | null }>();

  if (previousError) return jsonError(previousError, "Soumission introuvable.", 404);

  const { data: submission, error: submissionError } = await supabase
    .from("challenge_submissions")
    .update({
      status: parsed.data.status,
      points_awarded: parsed.data.status === "approved" ? parsed.data.pointsAwarded : 0,
      reviewer_id: auth.user.supabaseUserId,
      reviewer_note: parsed.data.reviewerNote || null,
      reviewed_at: new Date().toISOString(),
      auto_delete_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    })
    .eq("id", params.id)
    .select("user_id, challenge_id, points_awarded")
    .single();

  if (submissionError) return jsonError(submissionError, "Impossible de reviser la soumission.");

  const previousPoints = previous.status === "approved" ? previous.points_awarded ?? 0 : 0;
  const nextPoints = parsed.data.status === "approved" ? parsed.data.pointsAwarded : 0;
  const pointsDelta = nextPoints - previousPoints;

  if (pointsDelta !== 0 && submission?.user_id) {
    const { error: pointsError } = await supabase.rpc("adjust_ambassador_points", {
      p_user_id: submission.user_id,
      p_delta: pointsDelta
    });

    if (pointsError) return jsonError(pointsError, "Impossible de mettre a jour les points.");
  }

  if (submission?.user_id) {
    await supabase.from("notifications").insert({
      user_id: submission.user_id,
      type: parsed.data.status === "approved" ? "challenge_approved" : "challenge_rejected",
      title: parsed.data.status === "approved" ? "Defi approuve" : "Defi rejete",
      body:
        parsed.data.status === "approved"
          ? `Ta soumission a ete approuvee: ${parsed.data.pointsAwarded} points.`
          : parsed.data.reviewerNote || "Ta soumission doit etre corrigee.",
      data: { submission_id: params.id }
    });
  }

  return NextResponse.json({ message: "Soumission revisee." });
}
