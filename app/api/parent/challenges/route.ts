import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const parentChallengeSchema = z.object({
  childId: z.string().uuid(),
  challengeId: z.string().uuid(),
  message: z.string().trim().optional().or(z.literal(""))
});

export async function POST(request: Request) {
  const auth = await requireApiRole(["parent"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = parentChallengeSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Defi parent invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const childLinked = auth.user.linkedAccounts.some(
    (account) => account.userId === parsed.data.childId && account.relation === "child"
  );

  if (!childLinked) {
    return NextResponse.json({ message: "Cet enfant n'est pas lie a votre compte." }, { status: 403 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("parent_challenges")
    .insert({
      parent_id: auth.user.supabaseUserId,
      child_id: parsed.data.childId,
      challenge_id: parsed.data.challengeId,
      message: parsed.data.message || null,
      status: "accepted"
    })
    .select("*")
    .single();

  if (error) return jsonError(error, "Impossible d'accepter le defi parent.");
  return NextResponse.json({ parentChallenge: data }, { status: 201 });
}
