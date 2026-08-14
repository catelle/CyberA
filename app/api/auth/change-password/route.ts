import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { getSupabaseServerClientEnv } from "@/lib/env";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8).max(128),
    confirmation: z.string().min(1)
  })
  .superRefine((value, context) => {
    if (value.newPassword !== value.confirmation) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les nouveaux mots de passe ne correspondent pas.",
        path: ["confirmation"]
      });
    }

    if (value.currentPassword === value.newPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le nouveau mot de passe doit etre different de l'ancien.",
        path: ["newPassword"]
      });
    }
  });

export async function POST(request: NextRequest) {
  const auth = await requireApiRole(["student", "parent", "admin"]);
  if (!auth.ok) return auth.response;

  const parsed = changePasswordSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Informations invalides." },
      { status: 400 }
    );
  }

  const { supabaseUrl, supabaseAnonKey } = getSupabaseServerClientEnv();
  const verifier = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false
    }
  });

  const { error: verificationError } = await verifier.auth.signInWithPassword({
    email: auth.user.email,
    password: parsed.data.currentPassword
  });

  if (verificationError) {
    return NextResponse.json(
      { message: "Le mot de passe actuel est incorrect." },
      { status: 400 }
    );
  }

  await verifier.auth.signOut();

  const { error: updateError } = await createSupabaseAdminClient()
    .auth.admin.updateUserById(auth.user.supabaseUserId, {
      password: parsed.data.newPassword
    });

  if (updateError) {
    return NextResponse.json(
      { message: "Le mot de passe n'a pas pu etre modifie. Reessaie." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
