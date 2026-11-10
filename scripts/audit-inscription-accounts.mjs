import mongoose from "mongoose";
import { createClient } from "@supabase/supabase-js";

const websiteMongoUri = process.env.WEBSITE_MONGODB_URI || process.env.MONGODB_URI;

if (!websiteMongoUri || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Required connection settings are missing.");
}

await mongoose.connect(websiteMongoUri);
const inscriptions = await mongoose.connection.collection("cyberambassadorinscriptions")
  .find({}, { projection: { fullName: 1, email: 1, city: 1, status: 1 } })
  .toArray();

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
const normalized = new Map();
for (const item of inscriptions) {
  const email = String(item.email ?? "").trim().toLowerCase();
  if (email && !normalized.has(email)) normalized.set(email, item);
}

const statusCounts = {};
for (const item of normalized.values()) statusCounts[item.status ?? "new"] = (statusCounts[item.status ?? "new"] ?? 0) + 1;
const selected = [...normalized.entries()].filter(([, item]) => item.status === "shortlisted");
const missing = selected.filter(([email]) => !byEmail.has(email));
const existing = selected.filter(([email]) => byEmail.has(email));
const testAuthAccounts = authUsers.filter((user) => user.user_metadata?.is_test || user.app_metadata?.is_test || /(^|[+._-])test([+._-]|@|$)/i.test(user.email ?? ""));
const shortlistSourceAccounts = authUsers.filter((user) => user.app_metadata?.source === "sykoti_shortlist_2026");

console.log(JSON.stringify({
  inscriptionRecords: inscriptions.length,
  uniqueEmails: normalized.size,
  statusCounts,
  shortlistedEmails: selected.length,
  shortlistedWithCyberAAccounts: existing.length,
  shortlistedMissingCyberAAccounts: missing.length,
  detectedTestAccounts: testAuthAccounts.length
  ,provisionedFromShortlist: shortlistSourceAccounts.length
}, null, 2));

await mongoose.disconnect();
