import { NextResponse } from "next/server";

import { requireAuthenticatedUser } from "@/lib/auth/guards";
import type { SafeUser, UserRole } from "@/types/auth";

export type AuthzResult =
  | { ok: true; user: SafeUser }
  | { ok: false; response: NextResponse };

export async function requireApiRole(roles: UserRole[]): Promise<AuthzResult> {
  try {
    const user = await requireAuthenticatedUser();

    if (!roles.includes(user.role)) {
      return {
        ok: false,
        response: NextResponse.json({ message: "Acces refuse." }, { status: 403 })
      };
    }

    return { ok: true, user };
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("fetch failed") ||
        error.message.includes("Connect Timeout"))
    ) {
      return {
        ok: false,
        response: NextResponse.json(
          {
            message:
              "Supabase est injoignable depuis le serveur local. Verifiez la connexion internet, le proxy/VPN et NEXT_PUBLIC_SUPABASE_URL."
          },
          { status: 503 }
        )
      };
    }

    return {
      ok: false,
      response: NextResponse.json({ message: "Session requise." }, { status: 401 })
    };
  }
}

export function jsonError(error: unknown, fallback: string, status = 500) {
  return NextResponse.json(
    {
      message: error instanceof Error ? error.message : fallback
    },
    { status }
  );
}
