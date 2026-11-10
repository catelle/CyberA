import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const schema = z.object({ challengeId: z.string().uuid() });

export async function POST(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Defi invalide." }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const { data: submission, error: submissionError } = await supabase
    .from("challenge_submissions")
    .select("id, status, challenges(title)")
    .eq("user_id", auth.user.supabaseUserId)
    .eq("challenge_id", parsed.data.challengeId)
    .in("status", ["approved", "rejected"])
    .order("reviewed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (submissionError) return jsonError(submissionError, "Impossible de verifier le defi.");
  if (!submission) {
    return NextResponse.json({ message: "Le defi doit d'abord etre revise par l'administrateur." }, { status: 409 });
  }

  const { data: links, error: linkError } = await supabase
    .from("family_links")
    .select("parent_id")
    .eq("child_id", auth.user.supabaseUserId)
    .not("parent_id", "is", null);
  if (linkError) return jsonError(linkError, "Impossible de charger les parents lies.");
  const parentIds = [...new Set((links ?? []).map((link) => link.parent_id).filter(Boolean))] as string[];
  if (parentIds.length === 0) {
    return NextResponse.json({ message: "Aucun parent n'est lie a ton compte." }, { status: 409 });
  }

  const challengeTitle = Array.isArray(submission.challenges)
    ? submission.challenges[0]?.title
    : (submission.challenges as { title?: string } | null)?.title;
  const { data: existingInvitations, error: existingError } = await supabase
    .from("parent_challenges")
    .select("parent_id, status")
    .eq("child_id", auth.user.supabaseUserId)
    .eq("challenge_id", parsed.data.challengeId)
    .in("parent_id", parentIds);
  if (existingError) return jsonError(existingError, "Impossible de verifier les invitations.");
  const existingByParent = new Map((existingInvitations ?? []).map((item) => [item.parent_id, item.status]));
  const invitedParentIds = parentIds.filter((parentId) => {
    const status = existingByParent.get(parentId);
    return !status || status === "pending" || status === "accepted";
  });
  if (invitedParentIds.length === 0) {
    return NextResponse.json({ message: "Le defi a deja ete envoye au parent." }, { status: 409 });
  }

  const newParentIds = invitedParentIds.filter((parentId) => !existingByParent.has(parentId));
  const rows = newParentIds.map((parentId) => ({
    parent_id: parentId,
    child_id: auth.user.supabaseUserId,
    challenge_id: parsed.data.challengeId,
    status: "invited",
    message: `${auth.user.profile.fullName} vous invite a relever ce defi en famille.`
  }));
  if (rows.length > 0) {
    const { error: inviteError } = await supabase.from("parent_challenges").insert(rows);
    if (inviteError) return jsonError(inviteError, "Impossible d'inviter le parent.");
  }
  const legacyParentIds = invitedParentIds.filter((parentId) => existingByParent.has(parentId));
  if (legacyParentIds.length > 0) {
    const { error: updateError } = await supabase
      .from("parent_challenges")
      .update({ status: "invited" })
      .eq("child_id", auth.user.supabaseUserId)
      .eq("challenge_id", parsed.data.challengeId)
      .in("parent_id", legacyParentIds)
      .in("status", ["pending", "accepted"]);
    if (updateError) return jsonError(updateError, "Impossible d'activer l'invitation.");
  }

  await supabase.from("notifications").insert(invitedParentIds.map((parentId) => ({
    user_id: parentId,
    type: "parent_challenge_invitation",
    title: "Nouveau defi lance par votre enfant",
    body: `${auth.user.profile.fullName} vous met au defi de realiser « ${challengeTitle ?? "ce defi"} » avec lui/elle.`,
    data: { challenge_id: parsed.data.challengeId, child_id: auth.user.supabaseUserId, href: "/parent/challenge" }
  })));

  return NextResponse.json({ message: `${invitedParentIds.length} parent(s) invite(s).` }, { status: 201 });
}
