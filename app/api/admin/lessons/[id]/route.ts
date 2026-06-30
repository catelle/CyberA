import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const lessonUpdateSchema = z.object({
  orderIndex: z.coerce.number().int().min(1).optional(),
  title: z.string().trim().min(2).optional(),
  estimatedMins: z.coerce.number().int().min(1).optional(),
  contentText: z.string().trim().min(5).optional()
});

type LessonRouteProps = {
  params: { id: string };
};

export async function PATCH(request: Request, { params }: LessonRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = lessonUpdateSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Mise a jour invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (parsed.data.orderIndex !== undefined) update.order_index = parsed.data.orderIndex;
  if (parsed.data.title !== undefined) update.title = parsed.data.title;
  if (parsed.data.estimatedMins !== undefined) update.estimated_mins = parsed.data.estimatedMins;
  if (parsed.data.contentText !== undefined) {
    update.content = [{ type: "text", content: parsed.data.contentText }];
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("lessons")
    .update(update)
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) return jsonError(error, "Impossible de modifier la lecon.");
  return NextResponse.json({ lesson: data });
}

export async function DELETE(_request: Request, { params }: LessonRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("lessons").delete().eq("id", params.id);
  if (error) return jsonError(error, "Impossible de supprimer la lecon.");
  return NextResponse.json({ message: "Lecon supprimee." });
}
