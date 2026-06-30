import { NextResponse } from "next/server";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

type ChallengeRouteProps = {
  params: { id: string };
};

export async function DELETE(_request: Request, { params }: ChallengeRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("challenges").delete().eq("id", params.id);
  if (error) return jsonError(error, "Impossible de supprimer le defi.");
  return NextResponse.json({ message: "Defi supprime." });
}
