import { NextResponse } from "next/server";

import { ensureSupabaseProfileForAuthUser } from "@/lib/db/supabase-users";
import { createSupabaseServerClient } from "@/lib/auth/supabase-server";

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
    await ensureSupabaseProfileForAuthUser(user);
    return NextResponse.json({ message: "Profil initialise." });
  } catch (bootstrapError) {
    return NextResponse.json(
      {
        message:
          bootstrapError instanceof Error
            ? bootstrapError.message
            : "Impossible d'initialiser le profil."
      },
      { status: 500 }
    );
  }
}
