import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const schema = z.object({
  userIds: z.array(z.string().uuid()).min(1).max(100),
  moduleIds: z.array(z.string().uuid()).min(1)
});

export async function POST(request: Request) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Selection invalide." }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const { data: existingScholars } = await supabase.from("users").select("id").eq("program_track", "scholarship");
  const totalScholars = new Set([...(existingScholars ?? []).map((row) => row.id), ...parsed.data.userIds]);
  if (totalScholars.size > 100) return NextResponse.json({ message: "La Bourse des 100 ne peut pas depasser 100 beneficiaires." }, { status: 409 });
  const { data: modules, error: moduleError } = await supabase.from("modules").select("id").in("id", parsed.data.moduleIds).eq("is_published", true);
  if (moduleError || modules?.length !== parsed.data.moduleIds.length) return NextResponse.json({ message: "Un module selectionne est invalide ou non publie." }, { status: 400 });

  const { error: profileError } = await supabase.from("users").update({ program_track: "scholarship" }).in("id", parsed.data.userIds).eq("role", "ambassador");
  if (profileError) return jsonError(profileError, "Impossible de marquer les boursiers.");

  for (const userId of parsed.data.userIds) {
    const authUser = await supabase.auth.admin.getUserById(userId);
    if (authUser.data.user) {
      await supabase.auth.admin.updateUserById(userId, {
        app_metadata: { ...authUser.data.user.app_metadata, role: "ambassador", program_track: "scholarship" }
      });
    }
    await supabase.from("scholarship_module_access").delete().eq("user_id", userId);
  }

  const assignments = parsed.data.userIds.flatMap((userId) => parsed.data.moduleIds.map((moduleId) => ({
    user_id: userId,
    module_id: moduleId,
    granted_by: auth.user.supabaseUserId
  })));
  const { error: assignmentError } = await supabase.from("scholarship_module_access").insert(assignments);
  if (assignmentError) return jsonError(assignmentError, "Impossible d'attribuer les modules.");

  await Promise.all(parsed.data.userIds.map((userId) => supabase.rpc("issue_training_certificate_if_eligible", { p_user_id: userId })));
  return NextResponse.json({ message: `${parsed.data.userIds.length} eleve(s) marque(s) Bourse des 100 avec ${parsed.data.moduleIds.length} module(s).` });
}
