import { NextResponse } from "next/server";

import { requireApiRole } from "@/lib/api/authz";
import { getStudentProfileStats } from "@/lib/db/cybera";

export async function GET() {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const rewards = await getStudentProfileStats(auth.user.supabaseUserId);

  return NextResponse.json(
    {
      totalPoints: rewards.totalPoints,
      badges: rewards.badges.map((badge) => ({
        id: badge.id,
        name: badge.name,
        awardedAt: badge.awardedAt
      })),
      certificateNumber: rewards.certificateNumber
    },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
