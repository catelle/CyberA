import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const forumReviewSchema = z.object({
  status: z.enum(["verified", "actioned", "rejected"]),
  adminNote: z.string().trim().min(3)
});

type ForumReviewRouteProps = {
  params: { id: string };
};

export async function POST(request: Request, { params }: ForumReviewRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = forumReviewSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Revision invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const timestampColumn =
    parsed.data.status === "actioned"
      ? { actioned_at: new Date().toISOString() }
      : parsed.data.status === "verified"
        ? { verified_at: new Date().toISOString() }
        : {};

  const { data: report, error } = await supabase
    .from("forum_reports")
    .update({
      status: parsed.data.status,
      admin_id: auth.user.supabaseUserId,
      admin_note: parsed.data.adminNote,
      ...timestampColumn
    })
    .eq("id", params.id)
    .select("id, type, platform, target_url")
    .single();

  if (error) return jsonError(error, "Impossible de reviser le rapport.");

  if (parsed.data.status !== "rejected") {
    const { data: ambassadors } = await supabase
      .from("ambassador_profiles")
      .select("user_id, level")
      .in("level", ["senior", "master"]);

    const notificationRows =
      ambassadors?.map((ambassador) => ({
        user_id: ambassador.user_id,
        type: "forum_action",
        title: `Alerte ${report?.platform ?? "forum"} verifiee`,
        body: parsed.data.adminNote,
        data: {
          report_id: params.id,
          type: report?.type,
          platform: report?.platform,
          target_url: report?.target_url
        }
      })) ?? [];

    if (notificationRows.length > 0) {
      await supabase.from("notifications").insert(notificationRows);
      await supabase
        .from("forum_reports")
        .update({ ambassadors_notified: notificationRows.length })
        .eq("id", params.id);
    }
  }

  return NextResponse.json({ message: "Rapport revise." });
}
