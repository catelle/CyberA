import { NextResponse } from "next/server";

import { requireApiRole } from "@/lib/api/authz";
import { listLeaderboard } from "@/lib/db/cybera";

export async function GET() {
  const auth = await requireApiRole(["student", "parent", "admin"]);
  if (!auth.ok) return auth.response;

  const entries = await listLeaderboard();
  return NextResponse.json({
    cohort: entries,
    national: entries,
    weekly: [...entries].sort((a, b) => b.weeklyPoints - a.weeklyPoints)
  });
}
