import { getPublicSupabaseEnv } from "@/lib/env-public";

function readEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getServerEnv() {
  const { url, anonKey } = getPublicSupabaseEnv();

  return {
    supabaseUrl: url,
    supabaseAnonKey: anonKey,
    supabaseServiceRoleKey: readEnv("SUPABASE_SERVICE_ROLE_KEY"),
    mongodbUri: readEnv("MONGODB_URI"),
    mongodbDb: process.env.MONGODB_DB ?? "cyberambassadeurs",
    adminBootstrapToken: process.env.ADMIN_BOOTSTRAP_TOKEN
  };
}
