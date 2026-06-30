import { NextResponse } from "next/server";

import { requireApiRole } from "@/lib/api/authz";
import { listNotificationsForUser } from "@/lib/db/cybera";

export async function GET() {
  const auth = await requireApiRole(["student", "parent", "admin"]);
  if (!auth.ok) return auth.response;

  return NextResponse.json({
    notifications: await listNotificationsForUser(auth.user.supabaseUserId)
  });
}
