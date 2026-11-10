import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/auth/supabase-server";

const payloadSchema = z.object({ language: z.enum(["fr", "en"]) });

export async function PATCH(request: Request) {
  const parsed = payloadSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Invalid language." }, { status: 400 });

  const supabase = createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ message: "Session required." }, { status: 401 });

  const { error: updateError } = await supabase.auth.updateUser({
    data: { ...user.user_metadata, language: parsed.data.language }
  });
  if (updateError) return NextResponse.json({ message: updateError.message }, { status: 500 });

  const response = NextResponse.json({ language: parsed.data.language });
  response.cookies.set("cybera-language", parsed.data.language, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/"
  });
  return response;
}
