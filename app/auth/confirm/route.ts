import { NextResponse, type NextRequest } from "next/server";

import { createSupabaseServerClient } from "@/lib/auth/supabase-server";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");
  const requestedNext = request.nextUrl.searchParams.get("next");
  const next = requestedNext?.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/auth/set-password";
  if (!tokenHash || type !== "invite") {
    return NextResponse.redirect(new URL("/login?error=invalid_invitation", request.url));
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "invite" });
  if (error) {
    return NextResponse.redirect(new URL("/login?error=expired_invitation", request.url));
  }
  return NextResponse.redirect(new URL(next, request.url));
}
