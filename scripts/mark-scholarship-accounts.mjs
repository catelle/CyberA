import mongoose from "mongoose";
import { createClient } from "@supabase/supabase-js";

const required = ["WEBSITE_MONGODB_URI", "NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
for (const name of required) {
  if (!process.env[name]) throw new Error(`Missing ${name}`);
}

const website = await mongoose.createConnection(process.env.WEBSITE_MONGODB_URI).asPromise();
const applications = await website.collection("scholarshipapplications")
  .find({ cohort: "scholarship-2026" }, { projection: { email: 1, fullName: 1 } })
  .toArray();
const emails = new Map(applications.map((application) => [String(application.email).trim().toLowerCase(), application]));

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

const matched = authUsers.filter((user) => user.email && emails.has(user.email.toLowerCase()));
for (const user of matched) {
  const { error: metadataError } = await supabase.auth.admin.updateUserById(user.id, {
    app_metadata: { ...user.app_metadata, role: "ambassador", program_track: "scholarship" }
  });
  if (metadataError) throw metadataError;
  const { error: profileError } = await supabase.from("users").update({ program_track: "scholarship" }).eq("id", user.id);
  if (profileError) throw profileError;
}

await website.close();
console.log(JSON.stringify({ scholarshipApplications: emails.size, accountsMarked: matched.length, accountsWithoutLogin: emails.size - matched.length }, null, 2));
