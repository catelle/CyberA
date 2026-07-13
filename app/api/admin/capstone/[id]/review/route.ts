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
  const { error } = await supabase
    .rpc("review_capstone_project", {
      p_project_id: params.id,
      p_status: parsed.data.status,
      p_reviewer_id: auth.user.supabaseUserId
    })
    .single<{ user_id: string; points_delta: number }>();

  if (error) return jsonError(error, "Impossible de reviser le capstone.");

  return NextResponse.json({ message: "Capstone revise." });
}
