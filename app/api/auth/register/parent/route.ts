import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { parentRegistrationSchema } from "@/lib/auth/validation";
import { connectToMongo } from "@/lib/db/mongodb";
import { getUserByEmail, serializeUser } from "@/lib/db/users";
import { UserModel } from "@/models/User";

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

  await connectToMongo();

  const existingParent = await getUserByEmail(parent.email);
  if (existingParent) {
    return NextResponse.json(
      { message: "Un compte parent existe deja avec cette adresse email." },
      { status: 409 }
    );
  }

  const student = studentEmail ? await getUserByEmail(studentEmail) : null;
  if (studentEmail && (!student || student.role !== "student")) {
    return NextResponse.json(
      { message: "Aucun compte eleve ne correspond a cette adresse email." },
      { status: 404 }
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.createUser({
    email: parent.email,
    password: parent.password,
    email_confirm: true,
    user_metadata: {
      role: "parent",
      fullName: parent.fullName,
      language: parent.language
    }
  });

  if (error || !data.user) {
    return NextResponse.json(
      { message: error?.message ?? "Impossible de creer le compte parent." },
      { status: 500 }
    );
  }

  try {
    const parentUser = await UserModel.create({
      supabaseUserId: data.user.id,
      email: parent.email,
      role: "parent",
      profile: {
        fullName: parent.fullName,
        phone: parent.phone
      },
      language: parent.language,
      consentGiven: true,
      consentDate: new Date(),
      linkedAccounts: student
        ? [
            {
              userId: student._id,
              role: "student",
              relation: "child"
            }
          ]
        : []
    });

    if (student) {
      await UserModel.findByIdAndUpdate(student._id, {
        $push: {
          linkedAccounts: {
            userId: parentUser._id,
            role: "parent",
            relation: "parent"
          }
        },
        $set: {
          consentGiven: true,
          consentDate: student.consentDate ?? new Date()
        }
      });
    }

    return NextResponse.json(
      {
        message: "Compte parent cree avec succes.",
        user: serializeUser(parentUser)
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
            : "Impossible d'enregistrer le profil parent."
      },
      { status: 500 }
    );
  }
}
