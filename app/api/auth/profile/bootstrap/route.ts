import { NextResponse } from "next/server";

import { ensureSupabaseProfileForAuthUser } from "@/lib/db/supabase-users";
import { createSupabaseServerClient } from "@/lib/auth/supabase-server";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return fallback;
}

export async function POST() {
  const supabase = createSupabaseServerClient();
  let userResponse;

  try {
    userResponse = await supabase.auth.getUser();
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Supabase est injoignable depuis le serveur local. Verifiez la connexion internet, le proxy/VPN et NEXT_PUBLIC_SUPABASE_URL.",
        detail: error instanceof Error ? error.message : undefined
      },
      { status: 503 }
    );
  }

  const {
    data: { user },
    error
  } = userResponse;

  if (error || !user) {
    return NextResponse.json({ message: "Session requise." }, { status: 401 });
  }

  try {
    const profile = await ensureSupabaseProfileForAuthUser(user);
    return NextResponse.json({
      message: "Profil initialise.",
      role: profile.role
    });
  } catch (bootstrapError) {
    return NextResponse.json(
      {
        message: getErrorMessage(
          bootstrapError,
          "Impossible d'initialiser le profil."
        )
      },
      { status: 500 }
    );
  }
}
