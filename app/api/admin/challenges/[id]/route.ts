import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

type ChallengeRouteProps = {
  params: { id: string };
};

const updateSchema = z.object({
  title: z.string().trim().min(3).optional(),
  description: z.string().trim().min(10).optional(),
  instructions: z.string().trim().min(10).optional(),
  points: z.coerce.number().int().min(1).optional(),
  isActive: z.boolean().optional(),
  archived: z.boolean().optional()
});

export async function PATCH(request: Request, { params }: ChallengeRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;
  const parsed = updateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Modification invalide." }, { status: 400 });

  const updates: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) updates.title = parsed.data.title;
  if (parsed.data.description !== undefined) updates.description = parsed.data.description;
  if (parsed.data.instructions !== undefined) updates.instructions = parsed.data.instructions;
  if (parsed.data.points !== undefined) updates.points = parsed.data.points;
  if (parsed.data.isActive !== undefined) updates.is_active = parsed.data.isActive;
  if (parsed.data.archived !== undefined) {
    updates.archived_at = parsed.data.archived ? new Date().toISOString() : null;
    if (parsed.data.archived) updates.is_active = false;
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from("challenges").update(updates).eq("id", params.id).select("*").single();
  if (error) return jsonError(error, "Impossible de modifier le defi.");
  return NextResponse.json({ challenge: data });
}

export async function DELETE(_request: Request, { params }: ChallengeRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("challenges").delete().eq("id", params.id);
  if (error) return jsonError(error, "Impossible de supprimer le defi.");
  return NextResponse.json({ message: "Defi supprime." });
}
