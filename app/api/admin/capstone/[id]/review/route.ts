import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const capstoneReviewSchema = z.object({
  status: z.enum(["approved", "rejected"])
});

type CapstoneReviewRouteProps = {
  params: { id: string };
};

export async function POST(request: Request, { params }: CapstoneReviewRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = capstoneReviewSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Revision invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: previous, error: previousError } = await supabase
    .from("capstone_projects")
    .select("status")
    .eq("id", params.id)
    .single<{ status: string }>();

  if (previousError) return jsonError(previousError, "Capstone introuvable.", 404);

  const { data, error } = await supabase
    .from("capstone_projects")
    .update({
      status: parsed.data.status,
      reviewer_id: auth.user.supabaseUserId,
      reviewed_at: new Date().toISOString()
    })
    .eq("id", params.id)
    .select("user_id")
    .single();

  if (error) return jsonError(error, "Impossible de reviser le capstone.");

  const pointsDelta =
    parsed.data.status === previous.status
      ? 0
      : parsed.data.status === "approved"
        ? 500
        : -500;

  if (pointsDelta !== 0 && data?.user_id) {
    const { error: pointsError } = await supabase.rpc("adjust_ambassador_points", {
      p_user_id: data.user_id,
      p_delta: pointsDelta
    });

    if (pointsError) return jsonError(pointsError, "Impossible de mettre a jour les points.");
  }

  return NextResponse.json({ message: "Capstone revise." });
}
