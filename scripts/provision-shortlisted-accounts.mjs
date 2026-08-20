import { writeFile } from "node:fs/promises";
import mongoose from "mongoose";
import { createClient } from "@supabase/supabase-js";

process.env.WEBSITE_MONGODB_URI ||= process.env.MONGODB_URI;
const required = ["WEBSITE_MONGODB_URI", "NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "NEXT_PUBLIC_APP_URL"];
for (const name of required) if (!process.env[name]) throw new Error(`Missing ${name}`);

const website = await mongoose.createConnection(process.env.WEBSITE_MONGODB_URI).asPromise();
const applications = await website.collection("cyberambassadorinscriptions")
  .find({ status: "shortlisted" }, { projection: { fullName: 1, email: 1, city: 1 } })
  .toArray();
const unique = new Map(applications.map((item) => [String(item.email).trim().toLowerCase(), item]));
if (unique.size !== 21) throw new Error(`Safety check failed: expected 21 shortlisted candidates, found ${unique.size}.`);

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});
const authUsers = [];
for (let page = 1; ; page += 1) {
  const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 100 });
  if (error) throw error;
  authUsers.push(...data.users);
  if (data.users.length < 100) break;
}
const byEmail = new Map(authUsers.map((user) => [user.email?.toLowerCase(), user]));
const appUrl = process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
const summary = { shortlisted: unique.size, existingUpdated: 0, created: 0, failed: [] };
const setupLinks = [];

const { data: activeCohort } = await supabase
  .from("cohorts")
  .select("id")
  .eq("is_active", true)
  .order("start_date", { ascending: false })
  .limit(1)
  .maybeSingle();

function setupUrl(properties, type) {
  const url = new URL("/auth/confirm", appUrl);
  url.searchParams.set("token_hash", properties.hashed_token);
  url.searchParams.set("type", type);
  url.searchParams.set("next", "/auth/set-password");
  return url.toString();
}

for (const [email, application] of unique) {
  try {
    let user = byEmail.get(email);
    let linkType = "recovery";
    let properties;
    if (user) {
      const { data, error } = await supabase.auth.admin.generateLink({ type: "recovery", email });
      if (error) throw error;
      properties = data.properties;
      summary.existingUpdated += 1;
    } else {
      linkType = "invite";
      const { data, error } = await supabase.auth.admin.generateLink({
        type: "invite",
        email,
        options: { data: { fullName: application.fullName, city: application.city || null, language: "fr" } }
      });
      if (error || !data.user) throw error ?? new Error("Invite user missing");
      user = data.user;
      properties = data.properties;
      byEmail.set(email, user);
      summary.created += 1;
    }

    const { error: metadataError } = await supabase.auth.admin.updateUserById(user.id, {
      app_metadata: {
        ...user.app_metadata,
        role: "ambassador",
        invited_by_admin: true,
        source: "sykoti_shortlist_2026",
        must_set_password: true,
        is_test: false
      }
    });
    if (metadataError) throw metadataError;
    await supabase.from("users").upsert({
      id: user.id,
      full_name: application.fullName,
      role: "ambassador",
      city: application.city || null
    }, { onConflict: "id" }).throwOnError();
    await supabase.from("ambassador_profiles").upsert({
      user_id: user.id,
      parental_consent_given: false
    }, { onConflict: "user_id", ignoreDuplicates: true }).throwOnError();
    if (activeCohort?.id) {
      await supabase.from("ambassador_profiles")
        .update({ cohort_id: activeCohort.id })
        .eq("user_id", user.id)
        .is("cohort_id", null)
        .throwOnError();
    }
    setupLinks.push({ email, fullName: application.fullName, url: setupUrl(properties, linkType) });
  } catch (error) {
    summary.failed.push({ email, message: error instanceof Error ? error.message : String(error) });
  }
}

const knownTestEmails = new Set([
  "admin.cybera@example.com",
  "amina.ambassador@example.com",
  "eric.ambassador@example.com",
  "parent.cybera@example.com",
  process.env.CYBERA_TEST_EMAIL?.toLowerCase()
].filter(Boolean));
let testsMarked = 0;
for (const email of knownTestEmails) {
  const user = byEmail.get(email);
  if (!user) continue;
  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    app_metadata: { ...user.app_metadata, is_test: true }
  });
  if (error) throw error;
  testsMarked += 1;
}

if (summary.failed.length) throw new Error(`Provisioning failed for ${summary.failed.length} candidate(s): ${JSON.stringify(summary.failed)}`);
const outputPath = "/tmp/cybera-shortlisted-password-setup-links.json";
await writeFile(outputPath, `${JSON.stringify(setupLinks, null, 2)}\n`, { mode: 0o600 });
const csvPath = "/tmp/cybera-shortlisted-password-setup-links.csv";
const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const csv = [
  ["Nom", "Email", "Lien de création du mot de passe"],
  ...setupLinks.map(({ fullName, email, url }) => [fullName, email, url])
].map((row) => row.map(csvCell).join(",")).join("\n");
await writeFile(csvPath, `${csv}\n`, { mode: 0o600 });
await website.close();
console.log(JSON.stringify({ ...summary, testsMarked, setupLinksFiles: [csvPath, outputPath] }, null, 2));
