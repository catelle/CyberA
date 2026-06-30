import { NextResponse } from "next/server";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

type NotificationRouteProps = {
  params: { id: string };
};

export async function PATCH(_request: Request, { params }: NotificationRouteProps) {
  const auth = await requireApiRole(["student", "parent", "admin"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", params.id)
    .eq("user_id", auth.user.supabaseUserId);

  if (error) return jsonError(error, "Impossible de marquer la notification.");
  return NextResponse.json({ message: "Notification lue." });
}
