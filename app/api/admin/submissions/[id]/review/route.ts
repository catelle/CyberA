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
  const { data: submission, error: submissionError } = await supabase
    .rpc("review_challenge_submission", {
      p_submission_id: params.id,
      p_status: parsed.data.status,
      p_points: parsed.data.pointsAwarded,
      p_reviewer_id: auth.user.supabaseUserId,
      p_reviewer_note: parsed.data.reviewerNote || ""
    })
    .single<{ user_id: string; points_delta: number; review_changed: boolean }>();

  if (submissionError) return jsonError(submissionError, "Impossible de reviser la soumission.");

  if (
    submission?.user_id &&
    (submission.review_changed || submission.points_delta !== 0)
  ) {
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
