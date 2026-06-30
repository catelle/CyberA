import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const lessonSchema = z.object({
  orderIndex: z.coerce.number().int().min(1),
  title: z.string().trim().min(2),
  estimatedMins: z.coerce.number().int().min(1).default(5),
  contentText: z.string().trim().min(5)
});

type LessonRouteProps = {
  params: { id: string };
};

export async function GET(_request: Request, { params }: LessonRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", params.id)
    .order("order_index", { ascending: true });

  if (error) return jsonError(error, "Impossible de charger les lecons.");
  return NextResponse.json({ lessons: data });
}

export async function POST(request: Request, { params }: LessonRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = lessonSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Lecon invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("lessons")
    .insert({
      module_id: params.id,
      order_index: parsed.data.orderIndex,
      title: parsed.data.title,
      estimated_mins: parsed.data.estimatedMins,
      content: [{ type: "text", content: parsed.data.contentText }]
    })
    .select("*")
    .single();

  if (error) return jsonError(error, "Impossible de creer la lecon.");
  return NextResponse.json({ lesson: data }, { status: 201 });
}
