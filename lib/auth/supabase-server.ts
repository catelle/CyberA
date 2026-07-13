import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";

import {
  getSupabaseAdminEnv,
  getSupabaseServerClientEnv
} from "@/lib/env";

const nodeWebSocket = WebSocket as unknown as typeof globalThis.WebSocket;

type CookieToSet = {
  name: string;
  value: string;
  options: CookieOptions;
};

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  const { supabaseUrl, supabaseAnonKey } = getSupabaseServerClientEnv();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    realtime: {
      transport: nodeWebSocket
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // Server Components cannot always set cookies; middleware refreshes them.
          }
        });
      }
    }
  });
}

export function createSupabaseAdminClient() {
  const { supabaseUrl, supabaseServiceRoleKey } = getSupabaseAdminEnv();

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    realtime: {
      transport: nodeWebSocket
    }
  });
}
