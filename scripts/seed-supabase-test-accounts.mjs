import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import ws from "ws";

function loadEnvFile(fileName) {
  const filePath = resolve(process.cwd(), fileName);
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: ws }
});

const accounts = [
  {
    email: "admin.cybera@example.com",
    password: "CyberA123!",
    fullName: "Admin CyberA",
    role: "admin",
    city: "Yaounde"
  },
  {
    email: "amina.ambassador@example.com",
    password: "CyberA123!",
    fullName: "Amina Ambassador",
    role: "ambassador",
    city: "Yaounde"
  },
  {
    email: "eric.ambassador@example.com",
    password: "CyberA123!",
    fullName: "Eric Ambassador",
    role: "ambassador",
    city: "Douala"
  },
  {
    email: "parent.cybera@example.com",
    password: "CyberA123!",
    fullName: "Parent CyberA",
    role: "parent",
    city: "Yaounde"
  }
];

const { data: cohort } = await supabase
  .from("cohorts")
  .upsert(
    {
      name: "Yaounde Pilot - Juillet 2025",
      type: "onsite",
      start_date: "2025-07-01",
      max_size: 15,
      is_active: true
    },
    { onConflict: "name" }
  )
  .select("id")
  .single();

const created = new Map();

for (const account of accounts) {
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: account.email,
    password: account.password,
    email_confirm: true,
    user_metadata: {
      role: account.role,
      fullName: account.fullName
    }
  });

  if (authError && !authError.message.includes("already")) {
    console.error(authError.message);
    continue;
  }

  const userId = authData.user?.id;
  if (!userId) continue;
  created.set(account.email, userId);

  await supabase.from("users").upsert(
    {
      id: userId,
      full_name: account.fullName,
      role: account.role,
      city: account.city
    },
    { onConflict: "id" }
  );

  if (account.role === "ambassador") {
    await supabase.from("ambassador_profiles").upsert(
      {
        user_id: userId,
        cohort_id: cohort?.id,
        total_points: account.email.startsWith("amina") ? 620 : 160,
        modules_completed: account.email.startsWith("amina") ? 4 : 1,
        parental_consent_given: true,
        parental_consent_at: new Date().toISOString()
      },
      { onConflict: "user_id" }
    );
  }
}

const parentId = created.get("parent.cybera@example.com");
const childId = created.get("amina.ambassador@example.com");
if (parentId && childId) {
  await supabase.from("family_links").upsert(
    {
      parent_id: parentId,
      child_id: childId,
      family_code: "AMINA1"
    },
    { onConflict: "family_code" }
  );
}

console.log("Seeded test accounts:");
for (const account of accounts) {
  console.log(`${account.role}: ${account.email} / ${account.password}`);
}
