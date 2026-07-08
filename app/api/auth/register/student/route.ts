import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { studentRegistrationSchema } from "@/lib/auth/validation";
import { connectToMongo } from "@/lib/db/mongodb";
import { ensureSupabaseProfileForAuthUser } from "@/lib/db/supabase-users";
import { getUserByEmail, serializeUser } from "@/lib/db/users";
import { UserModel } from "@/models/User";

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
  const parsed = studentRegistrationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message:
          "Formulaire incomplet. Verifiez les informations de l'eleve et du parent.",
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const { student, parent, consentGiven } = parsed.data;

  await connectToMongo();

  const [existingStudent, existingParent] = await Promise.all([
    getUserByEmail(student.email),
    getUserByEmail(parent.email)
  ]);

  if (existingStudent || existingParent) {
    return NextResponse.json(
      {
        message:
          "Un compte existe deja avec l'une de ces adresses email."
      },
      { status: 409 }
    );
  }

  const supabase = createSupabaseAdminClient();
  const createdSupabaseIds: string[] = [];

  try {
    const { data: studentAuth, error: studentError } =
      await supabase.auth.admin.createUser({
        email: student.email,
        password: student.password,
        email_confirm: true,
        user_metadata: {
          fullName: student.fullName,
          city: student.city,
          language: student.language
        }
      });

    if (studentError || !studentAuth.user) {
      throw new Error(studentError?.message ?? "Student account creation failed");
    }

    createdSupabaseIds.push(studentAuth.user.id);
    await ensureSupabaseProfileForAuthUser(studentAuth.user, { role: "ambassador" });

    const { data: parentAuth, error: parentError } =
      await supabase.auth.admin.createUser({
        email: parent.email,
        password: parent.password,
        email_confirm: true,
        user_metadata: {
          fullName: parent.fullName,
          phone: parent.phone,
          language: student.language
        }
      });

    if (parentError || !parentAuth.user) {
      throw new Error(parentError?.message ?? "Parent account creation failed");
    }

    createdSupabaseIds.push(parentAuth.user.id);
    await ensureSupabaseProfileForAuthUser(parentAuth.user, { role: "parent" });

    const consentDate = new Date();
    const parentUser = await UserModel.create({
      supabaseUserId: parentAuth.user.id,
      email: parent.email,
      role: "parent",
      profile: {
        fullName: parent.fullName,
        phone: parent.phone
      },
      language: student.language,
      consentGiven: true,
      consentDate
    });

    const studentUser = await UserModel.create({
      supabaseUserId: studentAuth.user.id,
      email: student.email,
      role: "student",
      profile: {
        fullName: student.fullName,
        age: student.age,
        city: student.city,
        school: student.school,
        gradeLevel: student.gradeLevel
      },
      language: student.language,
      consentGiven,
      consentDate,
      requiresEnhancedProtection: student.age < 13,
      onboardingCompletedAt: consentDate,
      linkedAccounts: [
        {
          userId: parentUser._id,
          role: "parent",
          relation: "parent"
        }
      ]
    });

    await UserModel.findByIdAndUpdate(parentUser._id, {
      $set: {
        linkedAccounts: [{
          userId: studentUser._id,
          role: "student",
          relation: "child"
        }]
      }
    });

    return NextResponse.json(
      {
        message: "Comptes eleve et parent crees avec succes.",
        user: serializeUser(studentUser)
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Student registration failed", error);

    await Promise.all(
      createdSupabaseIds.map((id) => supabase.auth.admin.deleteUser(id))
    );

    return NextResponse.json(
      {
        message: registrationErrorMessage(
          error,
          "Impossible de creer les comptes."
        )
      },
      { status: 500 }
    );
  }
}
