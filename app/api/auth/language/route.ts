import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/auth/supabase-server";

const payloadSchema = z.object({ language: z.enum(["fr", "en"]) });

export async function PATCH(request: Request) {
  const parsed = payloadSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Invalid language." }, { status: 400 });

  const supabase = createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ message: "Session required." }, { status: 401 });

  const admin = createSupabaseAdminClient();
  const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
    user_metadata: { ...user.user_metadata, language: parsed.data.language }
  });
  if (updateError) return NextResponse.json({ message: updateError.message }, { status: 500 });

  return NextResponse.json({ language: parsed.data.language });
}
