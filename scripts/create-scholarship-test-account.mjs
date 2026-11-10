import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvFile(fileName) {
  const filePath = resolve(process.cwd(), fileName);
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const required = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
for (const name of required) if (!process.env[name]) throw new Error(`Missing ${name}`);

const email = "scholarship.test@example.com";
const password = "Scholarship123!";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

let authUser;
const { data: created, error: createError } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { fullName: "Scholarship Test Learner", city: "Yaounde", language: "en" },
  app_metadata: { role: "ambassador", program_track: "scholarship", is_test: true, must_set_password: false }
});

if (created.user) {
  authUser = created.user;
} else if (createError?.message?.toLowerCase().includes("already")) {
  const { data: users, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (listError) throw listError;
  authUser = users.users.find((user) => user.email?.toLowerCase() === email);
  if (!authUser) throw new Error("The existing scholarship test account could not be found.");
  const { data: updated, error: updateError } = await supabase.auth.admin.updateUserById(authUser.id, {
    password,
    email_confirm: true,
    user_metadata: { ...authUser.user_metadata, fullName: "Scholarship Test Learner", city: "Yaounde", language: "en" },
    app_metadata: { ...authUser.app_metadata, role: "ambassador", program_track: "scholarship", is_test: true, must_set_password: false }
  });
  if (updateError || !updated.user) throw updateError ?? new Error("Could not update the scholarship test account.");
  authUser = updated.user;
} else {
  throw createError ?? new Error("Could not create the scholarship test account.");
}

let { error: profileError } = await supabase.from("users").upsert({
  id: authUser.id,
  full_name: "Scholarship Test Learner",
  role: "ambassador",
  city: "Yaounde",
  program_track: "scholarship"
}, { onConflict: "id" });
if (profileError?.code === "PGRST204") {
  profileError = (await supabase.from("users").upsert({
    id: authUser.id,
    full_name: "Scholarship Test Learner",
    role: "ambassador",
    city: "Yaounde"
  }, { onConflict: "id" })).error;
}
if (profileError) throw profileError;

console.log(JSON.stringify({
  email,
  password,
  track: "scholarship",
  access: "Modules 1 and 2; Module 2 requires Module 1 feedback"
}, null, 2));
