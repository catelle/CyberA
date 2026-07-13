import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { parentRegistrationSchema } from "@/lib/auth/validation";
import {
  ensureSupabaseProfileForAuthUser,
  findSupabaseAuthUserByEmail,
  linkRegisteredParentToChild
} from "@/lib/db/supabase-users";

function registrationErrorMessage(error: unknown, fallback: string) {
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

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = parentRegistrationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Formulaire parent incomplet.",
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const { parent, studentEmail } = parsed.data;

  const existingParent = await findSupabaseAuthUserByEmail(parent.email);
  if (existingParent) {
    return NextResponse.json(
      { message: "Un compte parent existe deja avec cette adresse email." },
      { status: 409 }
    );
  }

  const student = studentEmail
    ? await findSupabaseAuthUserByEmail(studentEmail)
    : null;
  const supabase = createSupabaseAdminClient();
  const { data: studentProfile } = student
    ? await supabase
        .from("users")
        .select("role")
        .eq("id", student.id)
        .maybeSingle<{ role: string }>()
    : { data: null };

  if (studentEmail && (!student || studentProfile?.role !== "ambassador")) {
    return NextResponse.json(
      { message: "Aucun compte eleve ne correspond a cette adresse email." },
      { status: 404 }
    );
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: parent.email,
    password: parent.password,
    email_confirm: true,
    user_metadata: {
      fullName: parent.fullName,
      phone: parent.phone,
      language: parent.language
    },
    app_metadata: { role: "parent" }
  });

  if (error || !data.user) {
    return NextResponse.json(
      { message: error?.message ?? "Impossible de creer le compte parent." },
      { status: 500 }
    );
  }

  try {
    await ensureSupabaseProfileForAuthUser(data.user, { role: "parent" });
    if (student) {
      await linkRegisteredParentToChild(data.user.id, student.id);
    }

    return NextResponse.json(
      {
        message: "Compte parent cree avec succes."
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Parent registration failed", error);

    await supabase.auth.admin.deleteUser(data.user.id);

    return NextResponse.json(
      {
        message: registrationErrorMessage(
          error,
          "Impossible d'enregistrer le profil parent."
        )
      },
      { status: 500 }
    );
  }
}
