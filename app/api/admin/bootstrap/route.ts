import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { adminBootstrapSchema } from "@/lib/auth/validation";
import { getServerEnv } from "@/lib/env";
import { connectToMongo } from "@/lib/db/mongodb";
import { ensureSupabaseProfileForAuthUser } from "@/lib/db/supabase-users";
import { getUserByEmail, serializeUser } from "@/lib/db/users";
import { UserModel } from "@/models/User";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = adminBootstrapSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Donnees administrateur invalides." },
      { status: 400 }
    );
  }

  const { adminBootstrapToken } = getServerEnv();
  if (!adminBootstrapToken || parsed.data.token !== adminBootstrapToken) {
    return NextResponse.json({ message: "Token invalide." }, { status: 403 });
  }

  await connectToMongo();

  const existingAdmin = await getUserByEmail(parsed.data.email);
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
    }
  });

  if (error || !data.user) {
    return NextResponse.json(
      { message: error?.message ?? "Impossible de creer l'administrateur." },
      { status: 500 }
    );
  }

  try {
    await ensureSupabaseProfileForAuthUser(data.user, { role: "admin" });

    const adminUser = await UserModel.create({
      supabaseUserId: data.user.id,
      email: parsed.data.email,
      role: "admin",
      profile: {
        fullName: parsed.data.fullName
      },
      language: parsed.data.language,
      consentGiven: true,
      consentDate: new Date(),
      onboardingCompletedAt: new Date()
    });

    return NextResponse.json(
      {
        message: "Administrateur cree avec succes.",
        user: serializeUser(adminUser)
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
