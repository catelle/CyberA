import type { HydratedDocument } from "mongoose";

import { connectToMongo } from "@/lib/db/mongodb";
import { UserModel } from "@/models/User";
import type { UserDocument } from "@/models/User";
import type { LinkedAccount, SafeUser, UserRole } from "@/types/auth";

function optional<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined;
}

function serializeLinkedAccounts(accounts: unknown): LinkedAccount[] {
  if (!Array.isArray(accounts)) {
    return [];
  }

  return accounts.map((account) => {
    const item = account as {
      userId: { toString: () => string };
      role: UserRole;
      relation: "child" | "parent" | "coordinator";
    };

    return {
      userId: item.userId.toString(),
      role: item.role,
      relation: item.relation
    };
  });
}

export function serializeUser(user: HydratedDocument<UserDocument>): SafeUser {
  return {
    id: user._id.toString(),
    supabaseUserId: user.supabaseUserId,
    email: user.email,
    role: user.role,
    profile: {
      fullName: user.profile.fullName,
      age: optional(user.profile.age),
      city: optional(user.profile.city),
      school: optional(user.profile.school),
      gradeLevel: optional(user.profile.gradeLevel),
      phone: optional(user.profile.phone)
    },
    language: user.language,
    consentGiven: user.consentGiven,
    consentDate: user.consentDate?.toISOString(),
    linkedAccounts: serializeLinkedAccounts(user.linkedAccounts)
  };
}

export async function getUserBySupabaseId(supabaseUserId: string) {
  await connectToMongo();
  return UserModel.findOne({ supabaseUserId });
}

export async function getUserByEmail(email: string) {
  await connectToMongo();
  return UserModel.findOne({ email: email.toLowerCase() });
}

export async function getUserRoleCounts() {
  await connectToMongo();

  const [students, parents, admins, consented] = await Promise.all([
    UserModel.countDocuments({ role: "student" }),
    UserModel.countDocuments({ role: "parent" }),
    UserModel.countDocuments({ role: "admin" }),
    UserModel.countDocuments({ role: "student", consentGiven: true })
  ]);

  return {
    students,
    parents,
    admins,
    consented
  };
}
