import { getPublicSupabaseEnv } from "@/lib/env-public";

function readEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseServerClientEnv() {
  const { url, anonKey } = getPublicSupabaseEnv();

  return {
    supabaseUrl: url,
    supabaseAnonKey: anonKey
  };
}

export function getSupabaseAdminEnv() {
  const { url } = getPublicSupabaseEnv();

  return {
    supabaseUrl: url,
    supabaseServiceRoleKey: readEnv("SUPABASE_SERVICE_ROLE_KEY")
  };
}

export function getMongoEnv() {
  return {
    mongodbUri: readEnv("MONGODB_URI"),
    mongodbDb: process.env.MONGODB_DB ?? "cyberambassadeurs"
  };
}

export function getAdminBootstrapToken() {
  return process.env.ADMIN_BOOTSTRAP_TOKEN;
}
