import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const broadcastSchema = z.object({
  title: z.string().trim().min(1, "Le titre est requis."),
  body: z.string().trim().min(1, "Le message est requis."),
  audience: z.enum(["ambassadors", "parents", "all"]).default("ambassadors")
});

function validationMessage(error: z.ZodError) {
  const issue = error.issues[0];

  if (!issue) {
    return "Notification invalide.";
  }

  return issue.message;
}

export async function POST(request: Request) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = broadcastSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: validationMessage(parsed.error), issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const roles =
    parsed.data.audience === "all"
      ? ["ambassador", "parent"]
      : parsed.data.audience === "parents"
        ? ["parent"]
        : ["ambassador"];
  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id")
    .in("role", roles);

  if (userError) return jsonError(userError, "Impossible de charger l'audience.");

  const rows =
    users?.map((user) => ({
      user_id: user.id,
      type: "broadcast",
      title: parsed.data.title,
      body: parsed.data.body,
      data: { audience: parsed.data.audience }
    })) ?? [];

  if (rows.length > 0) {
    const { error } = await supabase.from("notifications").insert(rows);
    if (error) return jsonError(error, "Impossible d'envoyer la notification.");
  }

  return NextResponse.json({ message: `${rows.length} notification(s) creee(s).` });
}
