import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const challengeSchema = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim().min(10),
  instructions: z.string().trim().min(10),
  points: z.coerce.number().int().min(1).default(50),
  weekStart: z.string().trim().min(8),
  requiresPhoto: z.coerce.boolean().default(true),
  requiresReport: z.coerce.boolean().default(true),
  isActive: z.coerce.boolean().default(true)
});

export async function GET() {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .order("week_start", { ascending: false });

  if (error) return jsonError(error, "Impossible de charger les defis.");
  return NextResponse.json({ challenges: data });
}

export async function POST(request: Request) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = challengeSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Defi invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("challenges")
    .insert({
      title: parsed.data.title,
      description: parsed.data.description,
      instructions: parsed.data.instructions,
      points: parsed.data.points,
      week_start: parsed.data.weekStart,
      requires_photo: parsed.data.requiresPhoto,
      requires_report: parsed.data.requiresReport,
      is_active: parsed.data.isActive
    })
    .select("*")
    .single();

  if (error) return jsonError(error, "Impossible de creer le defi.");
  return NextResponse.json({ challenge: data }, { status: 201 });
}
