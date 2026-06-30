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
    language: "fr",
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

export async function ensureSupabaseProfileForAuthUser(authUser: User) {
  const admin = createSupabaseAdminClient();
  const phone = authUser.phone ?? null;
  const fullName =
    typeof authUser.user_metadata.fullName === "string"
      ? authUser.user_metadata.fullName
      : phone ?? authUser.email ?? "CyberAmbassadeur";
  const requestedRole =
    authUser.user_metadata.role === "parent" || authUser.user_metadata.role === "admin"
      ? authUser.user_metadata.role
      : "ambassador";

  const { error: userError } = await admin.from("users").upsert(
    {
      id: authUser.id,
      phone,
      full_name: fullName,
      role: requestedRole,
      city:
        typeof authUser.user_metadata.city === "string"
          ? authUser.user_metadata.city
          : null
    },
    { onConflict: "id" }
  );

  if (userError) {
    throw userError;
  }

  if (requestedRole === "ambassador") {
    const { error: profileError } = await admin
      .from("ambassador_profiles")
      .upsert(
        {
          user_id: authUser.id,
          parental_consent_given: false
        },
        { onConflict: "user_id" }
      );

    if (profileError) {
      throw profileError;
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
}
