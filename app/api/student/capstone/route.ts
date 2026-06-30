import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const capstoneSchema = z.object({
  title: z.string().trim().min(5),
  description: z.string().trim().min(80),
  actionType: z.enum(["whatsapp_broadcast", "school_talk", "social_post", "other"]),
  reachCount: z.coerce.number().int().min(1)
});

export async function POST(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = capstoneSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Capstone invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("capstone_projects")
    .insert({
      user_id: auth.user.supabaseUserId,
      title: parsed.data.title,
      description: parsed.data.description,
      action_type: parsed.data.actionType,
      reach_count: parsed.data.reachCount
    })
    .select("*")
    .single();

  if (error) return jsonError(error, "Impossible d'enregistrer le capstone.");
  return NextResponse.json({ capstone: data }, { status: 201 });
}
