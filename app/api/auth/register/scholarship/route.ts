import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { findEligibleScholarshipApplicant } from "@/lib/db/scholarship-applicants";
import {
  ensureSupabaseProfileForAuthUser,
  findSupabaseAuthUserByEmail
} from "@/lib/db/supabase-users";
import { scholarshipRegistrationSchema } from "@/lib/auth/validation";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = scholarshipRegistrationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ message: "Enter a valid email and a password of at least 8 characters." }, { status: 400 });
  }

  const { email, password, language } = parsed.data;
  const applicant = await findEligibleScholarshipApplicant(email);

  if (!applicant) {
    return NextResponse.json(
      { message: "This email is not on the scholarship applicant list." },
      { status: 403 }
    );
  }

  const existingUser = await findSupabaseAuthUserByEmail(email);
  if (existingUser) {
    return NextResponse.json(
      { message: "An account already exists for this email. Please log in." },
      { status: 409 }
    );
  }

  const supabase = createSupabaseAdminClient();
  let createdUserId: string | null = null;

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        fullName: applicant.fullName ?? email,
        city: applicant.city ?? null,
        language
      },
      app_metadata: {
        role: "ambassador",
        program_track: "scholarship",
        source: "scholarship_application_2026"
      }
    });

    if (error || !data.user) {
      throw new Error(error?.message ?? "Scholarship account creation failed");
    }

    createdUserId = data.user.id;
    await ensureSupabaseProfileForAuthUser(data.user, {
      role: "ambassador",
      programTrack: "scholarship"
    });

    return NextResponse.json({ message: "Scholarship account created." }, { status: 201 });
  } catch (error) {
    console.error("Scholarship registration failed", error);
    if (createdUserId) await supabase.auth.admin.deleteUser(createdUserId);

    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to create the account." },
      { status: 500 }
    );
  }
}
