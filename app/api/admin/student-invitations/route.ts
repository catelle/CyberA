import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { ensureSupabaseProfileForAuthUser, findSupabaseAuthUserByEmail } from "@/lib/db/supabase-users";

const schema = z.object({
  email: z.string().trim().email("Adresse email invalide."),
  fullName: z.string().trim().min(2, "Le nom est requis."),
  city: z.string().trim().optional().or(z.literal("")),
  language: z.enum(["fr", "en"]).default("fr")
});

export async function POST(request: NextRequest) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invitation invalide." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await findSupabaseAuthUserByEmail(email);
  if (existing) {
    return NextResponse.json({ message: "Un compte ou une invitation existe deja pour cet email." }, { status: 409 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "invite",
    email,
    options: {
      data: {
        fullName: parsed.data.fullName,
        city: parsed.data.city || null,
        language: parsed.data.language
      }
    }
  });
  if (error || !data.user || !data.properties?.hashed_token) {
    return jsonError(error ?? new Error("Invite link missing"), "Impossible de generer l'invitation.");
  }

  try {
    const { error: metadataError } = await supabase.auth.admin.updateUserById(data.user.id, {
      app_metadata: { role: "ambassador", invited_by_admin: true }
    });
    if (metadataError) throw metadataError;
    const refreshed = await supabase.auth.admin.getUserById(data.user.id);
    if (refreshed.error || !refreshed.data.user) throw refreshed.error ?? new Error("Utilisateur introuvable.");
    await ensureSupabaseProfileForAuthUser(refreshed.data.user, { role: "ambassador" });

    const setupUrl = new URL("/auth/confirm", request.nextUrl.origin);
    setupUrl.searchParams.set("token_hash", data.properties.hashed_token);
    setupUrl.searchParams.set("type", "invite");
    setupUrl.searchParams.set("next", "/auth/set-password");
    return NextResponse.json({ message: "Lien a usage unique genere.", setupUrl: setupUrl.toString(), email }, { status: 201 });
  } catch (provisionError) {
    await supabase.auth.admin.deleteUser(data.user.id);
    return jsonError(provisionError, "Impossible de preparer le compte selectionne.");
  }
}
