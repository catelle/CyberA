import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/auth/supabase-server";
import { linkParentToChildByFamilyCode } from "@/lib/db/supabase-users";

const parentLinkSchema = z.object({
  familyCode: z.string().trim().length(6)
});

function isSupabaseConnectionError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const candidate = error as {
    message?: unknown;
    code?: unknown;
    cause?: unknown;
  };
  const message = typeof candidate.message === "string" ? candidate.message : "";

  return (
    message.includes("fetch failed") ||
    message.includes("Connect Timeout") ||
    candidate.code === "UND_ERR_CONNECT_TIMEOUT" ||
    isSupabaseConnectionError(candidate.cause)
  );
}

function supabaseUnavailableResponse() {
  return NextResponse.json(
    {
      message:
        "Supabase est temporairement injoignable. Verifiez votre connexion puis reessayez."
    },
    { status: 503 }
  );
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = parentLinkSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ message: "Code famille invalide." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  let userResponse;

  try {
    userResponse = await supabase.auth.getUser();
  } catch (error) {
    if (isSupabaseConnectionError(error)) return supabaseUnavailableResponse();

    return NextResponse.json(
      { message: "Impossible de verifier la session." },
      { status: 500 }
    );
  }

  const {
    data: { user },
    error
  } = userResponse;

  if (error || !user) {
    return NextResponse.json({ message: "Session requise." }, { status: 401 });
  }

  let profileResponse;

  try {
    profileResponse = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .maybeSingle<{ role: string }>();
  } catch (error) {
    if (isSupabaseConnectionError(error)) return supabaseUnavailableResponse();

    return NextResponse.json(
      { message: "Impossible de verifier le compte parent." },
      { status: 500 }
    );
  }

  const { data: profile, error: profileError } = profileResponse;

  if (profileError) {
    if (isSupabaseConnectionError(profileError)) return supabaseUnavailableResponse();

    return NextResponse.json(
      { message: "Impossible de verifier le compte parent." },
      { status: 500 }
    );
  }

  if (profile?.role !== "parent") {
    return NextResponse.json(
      { message: "Seul un compte parent peut lier un enfant." },
      { status: 403 }
    );
  }

  try {
    const result = await linkParentToChildByFamilyCode(user.id, parsed.data.familyCode);

    if (!result.ok) {
      return NextResponse.json(
        {
          message:
            result.reason === "already_linked"
              ? "Ce code est deja lie a un parent."
              : "Aucun ambassadeur ne correspond a ce code."
        },
        { status: result.reason === "already_linked" ? 409 : 404 }
      );
    }

    return NextResponse.json({ message: "Compte enfant lie avec succes." });
  } catch (linkError) {
    if (isSupabaseConnectionError(linkError)) return supabaseUnavailableResponse();

    return NextResponse.json(
      { message: "Impossible de lier le compte enfant." },
      { status: 500 }
    );
  }
}
