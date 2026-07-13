import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { adminBootstrapSchema } from "@/lib/auth/validation";
import { getAdminBootstrapToken } from "@/lib/env";
import {
  ensureSupabaseProfileForAuthUser,
  findSupabaseAuthUserByEmail
} from "@/lib/db/supabase-users";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = adminBootstrapSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Donnees administrateur invalides." },
      { status: 400 }
    );
  }

  const adminBootstrapToken = getAdminBootstrapToken();
  if (!adminBootstrapToken || parsed.data.token !== adminBootstrapToken) {
    return NextResponse.json({ message: "Token invalide." }, { status: 403 });
  }

  const existingAdmin = await findSupabaseAuthUserByEmail(parsed.data.email);
  if (existingAdmin) {
    return NextResponse.json(
      { message: "Cet administrateur existe deja." },
      { status: 409 }
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.createUser({
    email: parsed.data.email,
    password: parsed.data.password,
    email_confirm: true,
    user_metadata: {
      fullName: parsed.data.fullName,
      language: parsed.data.language
    },
    app_metadata: { role: "admin" }
  });

  if (error || !data.user) {
    return NextResponse.json(
      { message: error?.message ?? "Impossible de creer l'administrateur." },
      { status: 500 }
    );
  }

  try {
    await ensureSupabaseProfileForAuthUser(data.user, { role: "admin" });

    return NextResponse.json(
      {
        message: "Administrateur cree avec succes."
      },
      { status: 201 }
    );
  } catch (error) {
    await supabase.auth.admin.deleteUser(data.user.id);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Impossible d'enregistrer l'administrateur."
      },
      { status: 500 }
    );
  }
}
