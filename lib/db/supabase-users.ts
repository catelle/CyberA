import type { User } from "@supabase/supabase-js";

import {
  createSupabaseAdminClient,
  createSupabaseServerClient
} from "@/lib/auth/supabase-server";
import { appRoleFromSupabaseRole, type SupabaseProfileRole } from "@/lib/auth/roles";
import type { LinkedAccount, SafeUser } from "@/types/auth";

type SupabaseUserRow = {
  id: string;
  phone: string | null;
  full_name: string;
  role: SupabaseProfileRole;
  avatar_url: string | null;
  city: string | null;
  created_at: string | null;
};

type AmbassadorProfileRow = {
  parental_consent_given: boolean | null;
  parental_consent_at: string | null;
};

type FamilyLinkRow = {
  parent_id: string | null;
  child_id: string | null;
  family_code: string;
};

type ProfileBootstrapOptions = {
  role?: SupabaseProfileRole;
};

export async function findSupabaseAuthUserByEmail(email: string) {
  const admin = createSupabaseAdminClient();
  const normalizedEmail = email.trim().toLowerCase();
  let page = 1;

  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 100 });
    if (error) throw error;

    const user = data.users.find(
      (candidate) => candidate.email?.toLowerCase() === normalizedEmail
    );
    if (user) return user;
    if (data.users.length < 100) return null;
    page += 1;
  }
}

function authUserAppRole(authUser: User): SupabaseProfileRole | undefined {
  const role = authUser.app_metadata?.role;

  return role === "ambassador" || role === "parent" || role === "admin"
    ? role
    : undefined;
}

function normalizeSupabaseProfileRole(
  role: string | null | undefined
): SupabaseProfileRole {
  if (role === "parent" || role === "admin") {
    return role;
  }

  return "ambassador";
}

function authUserMetadataString(authUser: User, key: string): string | null {
  const value = authUser.user_metadata?.[key];

  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function authUserLanguage(authUser: User): "fr" | "en" {
  return authUserMetadataString(authUser, "language") === "en" ? "en" : "fr";
}

function serializeLinkedAccounts(
  userId: string,
  profileRole: SupabaseProfileRole,
  links: FamilyLinkRow[]
): LinkedAccount[] {
  const accounts: LinkedAccount[] = [];

  links.forEach((link) => {
    if (profileRole === "parent" && link.child_id) {
      accounts.push({
        userId: link.child_id,
        role: "student",
        relation: "child"
      });
      return;
    }

    if (profileRole === "ambassador" && link.parent_id) {
      accounts.push({
        userId: link.parent_id,
        role: "parent",
        relation: "parent"
      });
      return;
    }

    if (profileRole === "admin" && link.child_id !== userId) {
      accounts.push({
        userId: link.child_id ?? link.parent_id ?? link.family_code,
        role: "student",
        relation: "coordinator"
      });
    }
  });

  return accounts;
}

export async function getSupabaseSafeUser(authUser: User): Promise<SafeUser | null> {
  const supabase = createSupabaseServerClient();
  const { data: profile, error } = await supabase
    .from("users")
    .select("id, phone, full_name, role, avatar_url, city, created_at")
    .eq("id", authUser.id)
    .maybeSingle<SupabaseUserRow>();

  if (error || !profile) {
    return null;
  }

  const [{ data: ambassadorProfile }, { data: familyLinks }] = await Promise.all([
    supabase
      .from("ambassador_profiles")
      .select("parental_consent_given, parental_consent_at")
      .eq("user_id", authUser.id)
      .maybeSingle<AmbassadorProfileRow>(),
    supabase
      .from("family_links")
      .select("parent_id, child_id, family_code")
      .or(`parent_id.eq.${authUser.id},child_id.eq.${authUser.id}`)
      .returns<FamilyLinkRow[]>()
  ]);

  return {
    id: profile.id,
    supabaseUserId: profile.id,
    email: authUser.email ?? "",
    role: appRoleFromSupabaseRole(profile.role),
    profile: {
      fullName: profile.full_name,
      city: profile.city ?? undefined,
      phone: profile.phone ?? authUser.phone ?? undefined
    },
    language: authUserLanguage(authUser),
    consentGiven: Boolean(ambassadorProfile?.parental_consent_given),
    consentDate: ambassadorProfile?.parental_consent_at ?? undefined,
    familyCode:
      profile.role === "ambassador"
        ? familyLinks?.find((link) => link.child_id === authUser.id)?.family_code
        : undefined,
    linkedAccounts: serializeLinkedAccounts(
      authUser.id,
      profile.role,
      familyLinks ?? []
    )
  };
}

export async function linkParentToChildByFamilyCode(parentId: string, familyCode: string) {
  const admin = createSupabaseAdminClient();
  const normalizedCode = familyCode.trim().toUpperCase();

  const { data: link, error: linkReadError } = await admin
    .from("family_links")
    .select("id, child_id, parent_id")
    .eq("family_code", normalizedCode)
    .maybeSingle<{
      id: string;
      child_id: string | null;
      parent_id: string | null;
    }>();

  if (linkReadError) {
    throw linkReadError;
  }

  if (!link || !link.child_id) {
    return { ok: false as const, reason: "not_found" as const };
  }

  if (link.parent_id && link.parent_id !== parentId) {
    return { ok: false as const, reason: "already_linked" as const };
  }

  const { error: updateError } = await admin
    .from("family_links")
    .update({
      parent_id: parentId,
      linked_at: new Date().toISOString()
    })
    .eq("id", link.id);

  if (updateError) {
    throw updateError;
  }

  const { error: consentError } = await admin
    .from("ambassador_profiles")
    .update({
      parental_consent_given: true,
      parental_consent_at: new Date().toISOString()
    })
    .eq("user_id", link.child_id);

  if (consentError) {
    throw consentError;
  }

  return { ok: true as const, childId: link.child_id };
}

function generateFamilyCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function ensureSupabaseProfileForAuthUser(
  authUser: User,
  options: ProfileBootstrapOptions = {}
) {
  const admin = createSupabaseAdminClient();
  const authPhone =
    typeof authUser.phone === "string" && authUser.phone.trim()
      ? authUser.phone.trim()
      : null;
  let phone = authPhone ?? authUserMetadataString(authUser, "phone");
  const metadataFullName =
    authUserMetadataString(authUser, "fullName") ??
    authUserMetadataString(authUser, "full_name");
  const metadataCity = authUserMetadataString(authUser, "city");

  const { data: existingProfile, error: existingProfileError } = await admin
    .from("users")
    .select("role, phone, full_name, city")
    .eq("id", authUser.id)
    .maybeSingle<{
      role: string | null;
      phone: string | null;
      full_name: string | null;
      city: string | null;
    }>();

  if (existingProfileError) {
    throw existingProfileError;
  }

  const profileRole = normalizeSupabaseProfileRole(
    existingProfile?.role ?? options.role ?? authUserAppRole(authUser)
  );
  const fullName =
    existingProfile?.full_name ??
    metadataFullName ??
    phone ??
    authUser.email ??
    "CyberAmbassadeur";
  const city = existingProfile?.city ?? metadataCity;

  phone ??= existingProfile?.phone ?? null;

  if (phone) {
    const { data: phoneOwner, error: phoneOwnerError } = await admin
      .from("users")
      .select("id")
      .eq("phone", phone)
      .maybeSingle<{ id: string }>();

    if (phoneOwnerError) {
      throw phoneOwnerError;
    }

    if (phoneOwner && phoneOwner.id !== authUser.id) {
      phone = existingProfile?.phone ?? null;
    }
  }

  const { error: userError } = await admin.from("users").upsert(
    {
      id: authUser.id,
      phone,
      full_name: fullName,
      role: profileRole,
      city
    },
    { onConflict: "id" }
  );

  if (userError) {
    throw userError;
  }

  if (profileRole === "ambassador") {
    const { data: existingAmbassadorProfile, error: profileReadError } = await admin
      .from("ambassador_profiles")
      .select("id")
      .eq("user_id", authUser.id)
      .maybeSingle<{ id: string }>();

    if (profileReadError) {
      throw profileReadError;
    }

    if (!existingAmbassadorProfile) {
      const { error: profileError } = await admin
        .from("ambassador_profiles")
        .insert({
          user_id: authUser.id,
          parental_consent_given: false
        });

      if (profileError) {
        throw profileError;
      }
    }

    const { data: existingCode, error: codeReadError } = await admin
      .from("family_links")
      .select("id")
      .eq("child_id", authUser.id)
      .maybeSingle();

    if (codeReadError) {
      throw codeReadError;
    }

    if (!existingCode) {
      const { error: codeError } = await admin.from("family_links").insert({
        child_id: authUser.id,
        family_code: generateFamilyCode()
      });

      if (codeError) {
        throw codeError;
      }
    }
  }

  return { role: profileRole };
}

export async function linkRegisteredParentToChild(parentId: string, childId: string) {
  const admin = createSupabaseAdminClient();
  const now = new Date().toISOString();
  const { data: link, error: linkError } = await admin
    .from("family_links")
    .update({ parent_id: parentId, linked_at: now })
    .eq("child_id", childId)
    .is("parent_id", null)
    .select("id")
    .maybeSingle<{ id: string }>();

  if (linkError) throw linkError;
  if (!link) throw new Error("Child family link is missing or already claimed");

  const { error: consentError } = await admin
    .from("ambassador_profiles")
    .update({ parental_consent_given: true, parental_consent_at: now })
    .eq("user_id", childId);

  if (consentError) throw consentError;
}
