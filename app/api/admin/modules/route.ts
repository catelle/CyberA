import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { listModulesWithFallback } from "@/lib/db/cybera";

const moduleSchema = z.object({
  orderIndex: z.coerce.number().int().min(1),
  title: z.string().trim().min(2),
  subtitle: z.string().trim().optional().or(z.literal("")),
  description: z.string().trim().optional().or(z.literal("")),
  color: z.string().trim().optional().or(z.literal("")),
  icon: z.string().trim().optional().or(z.literal("")),
  videoUrl: z.string().trim().url().optional().or(z.literal("")),
  isPublished: z.coerce.boolean().default(false)
});

export async function GET() {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  return NextResponse.json({ modules: await listModulesWithFallback() });
}

export async function POST(request: Request) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = moduleSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Module invalide.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("modules")
    .insert({
      order_index: parsed.data.orderIndex,
      title: parsed.data.title,
      subtitle: parsed.data.subtitle || null,
      description: parsed.data.description || null,
      color: parsed.data.color || null,
      icon: parsed.data.icon || null,
      video_url: parsed.data.videoUrl || null,
      is_published: parsed.data.isPublished
    })
    .select("*")
    .single();

  if (error) return jsonError(error, "Impossible de creer le module.");
  return NextResponse.json({ module: data }, { status: 201 });
}
