import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createSupabaseServerClient } from "@/lib/auth/supabase-server";

function clearSupabaseCookies() {
  const cookieStore = cookies();

  cookieStore.getAll().forEach((cookie) => {
    if (cookie.name.startsWith("sb-") || cookie.name.includes("supabase")) {
      cookieStore.delete(cookie.name);
    }
  });
}

export async function POST() {
  try {
    const supabase = createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    // Logout should be idempotent for the UI. The browser will also clear its session.
  }

  clearSupabaseCookies();

  return NextResponse.json({ message: "Deconnexion reussie." });
}
