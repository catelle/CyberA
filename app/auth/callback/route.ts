import { NextResponse, type NextRequest } from "next/server";

import { dashboardForRole } from "@/lib/auth/roles";
import { createSupabaseServerClient } from "@/lib/auth/supabase-server";
import { ensureSupabaseProfileForAuthUser } from "@/lib/db/supabase-users";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=oauth", request.url));
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(new URL("/login?error=oauth", request.url));
  }

  try {
    const profile = await ensureSupabaseProfileForAuthUser(data.user);
    return NextResponse.redirect(
      new URL(dashboardForRole(profile.role), request.url)
    );
  } catch {
    await supabase.auth.signOut();
    return NextResponse.redirect(
      new URL("/login?error=profile_initialization", request.url)
    );
  }
}
