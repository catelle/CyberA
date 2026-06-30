import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const moduleUpdateSchema = z.object({
  orderIndex: z.coerce.number().int().min(1).optional(),
  title: z.string().trim().min(2).optional(),
  subtitle: z.string().trim().optional().or(z.literal("")),
  description: z.string().trim().optional().or(z.literal("")),
  color: z.string().trim().optional().or(z.literal("")),
  icon: z.string().trim().optional().or(z.literal("")),
  videoUrl: z.string().trim().url().optional().or(z.literal("")),
  isPublished: z.coerce.boolean().optional()
});

type ModuleRouteProps = {
  params: { id: string };
};

export async function PATCH(request: Request, { params }: ModuleRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = moduleUpdateSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Mise a jour invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (parsed.data.orderIndex !== undefined) update.order_index = parsed.data.orderIndex;
  if (parsed.data.title !== undefined) update.title = parsed.data.title;
  if (parsed.data.subtitle !== undefined) update.subtitle = parsed.data.subtitle || null;
  if (parsed.data.description !== undefined) update.description = parsed.data.description || null;
  if (parsed.data.color !== undefined) update.color = parsed.data.color || null;
  if (parsed.data.icon !== undefined) update.icon = parsed.data.icon || null;
  if (parsed.data.videoUrl !== undefined) update.video_url = parsed.data.videoUrl || null;
  if (parsed.data.isPublished !== undefined) update.is_published = parsed.data.isPublished;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("modules")
    .update(update)
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) return jsonError(error, "Impossible de modifier le module.");
  return NextResponse.json({ module: data });
}

export async function DELETE(_request: Request, { params }: ModuleRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("modules").delete().eq("id", params.id);
  if (error) return jsonError(error, "Impossible de supprimer le module.");
  return NextResponse.json({ message: "Module supprime." });
}
