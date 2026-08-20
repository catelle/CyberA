import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const registrationSchema = z.object({ challengeId: z.string().uuid() });

export async function POST(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;
  const parsed = registrationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Defi invalide." }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.rpc("register_for_challenge", {
    p_user_id: auth.user.supabaseUserId,
    p_challenge_id: parsed.data.challengeId
  });
  if (error) {
    const message = error.message.includes("cooldown")
      ? "Le delai de 3 jours avant une nouvelle inscription n'est pas encore termine."
      : error.message.includes("Already registered")
        ? "Tu es deja inscrit a ce defi."
        : error.message.includes("already submitted")
          ? "Tu as deja soumis ce defi."
          : "Impossible de s'inscrire a ce defi.";
    return jsonError(new Error(message), message, 409);
  }

  return NextResponse.json({ registration: Array.isArray(data) ? data[0] : data }, { status: 201 });
}
