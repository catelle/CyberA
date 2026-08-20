import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const schema = z.object({ name: z.string().trim().min(2).max(80) });

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Nom de Fellowship invalide." }, { status: 400 });
  const { data, error } = await createSupabaseAdminClient().from("cohorts").update({ name: parsed.data.name }).eq("id", params.id).select("id, name").single();
  if (error) return jsonError(error, "Impossible de modifier la Fellowship.");
  return NextResponse.json({ cohort: data, message: "Fellowship mise à jour." });
}
