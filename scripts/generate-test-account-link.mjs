import { writeFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const required = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
for (const name of required) if (!process.env[name]) throw new Error(`Missing ${name}`);

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});
const users = [];
for (let page = 1; ; page += 1) {
  const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 100 });
  if (error) throw error;
  users.push(...data.users);
  if (data.users.length < 100) break;
}

const testUsers = users.filter((user) => user.app_metadata?.is_test === true && user.app_metadata?.role === "ambassador");
const testUser = testUsers.find((user) =>
  user.user_metadata?.fullName === "CyberA Test Account" || /(^|[+._-])test([+._-]|@|$)/i.test(user.email ?? "")
) ?? (testUsers.length === 1 ? testUsers[0] : undefined);
if (!testUser?.email) throw new Error("The dedicated CyberA test learner account was not found.");

const { data, error } = await supabase.auth.admin.generateLink({ type: "recovery", email: testUser.email });
if (error) throw error;
const url = new URL("/auth/confirm", "https://cyberambassador.sykoticenter.org");
url.searchParams.set("token_hash", data.properties.hashed_token);
url.searchParams.set("type", "recovery");
url.searchParams.set("next", "/auth/set-password");

const output = `/tmp/cybera-test-account-link.txt`;
await writeFile(output, `Compte test : ${testUser.email}\nLien : ${url.toString()}\n`, { mode: 0o600 });
console.log(JSON.stringify({ output, accountFound: true, linkGenerated: true }));
