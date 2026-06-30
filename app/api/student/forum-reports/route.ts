import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const forumReportSchema = z.object({
  type: z.enum(["scam", "bullying", "misinformation", "other"]),
  platform: z.string().trim().min(2),
  target: z.string().trim().min(3),
  description: z.string().trim().min(50)
});

export async function POST(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = forumReportSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Rapport invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: profile } = await supabase
    .from("ambassador_profiles")
    .select("modules_completed")
    .eq("user_id", auth.user.supabaseUserId)
    .maybeSingle<{ modules_completed: number }>();

  if ((profile?.modules_completed ?? 0) < 4) {
    return NextResponse.json(
      { message: "Tu dois terminer les 4 modules avant de publier dans le forum." },
      { status: 403 }
    );
  }

  const { data, error } = await supabase
    .from("forum_reports")
    .insert({
      reporter_id: auth.user.supabaseUserId,
      type: parsed.data.type,
      platform: parsed.data.platform,
      target_url: parsed.data.target,
      description: parsed.data.description
    })
    .select("*")
    .single();

  if (error) return jsonError(error, "Impossible d'enregistrer le rapport.");
  return NextResponse.json({ report: data }, { status: 201 });
}
