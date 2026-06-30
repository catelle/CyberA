import { NextResponse } from "next/server";

import { requireApiRole } from "@/lib/api/authz";
import { listChallengeSubmissionsWithFallback } from "@/lib/db/cybera";

export async function GET() {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  return NextResponse.json({ submissions: await listChallengeSubmissionsWithFallback() });
}
