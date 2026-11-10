import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const presenceSchema = z.object({
  path: z.string().trim().min(1).max(300)
});

// A heartbeat that arrives later than this is treated as a new visit rather
// than as continuous reading time (closed laptop, lost network, phone asleep).
const MAX_CREDITED_GAP_SECONDS = 90;
const MODULE_PATH_PATTERN =
  /^\/student\/modules\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})(?:\/|$)/i;

type ModuleTimeRow = {
  active_seconds: number;
  first_seen_at: string;
  last_seen_at: string;
};

export async function POST(request: Request) {
  const auth = await requireApiRole(["student", "parent", "admin", "facilitator"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = presenceSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Signal de presence invalide." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const userId = auth.user.supabaseUserId;
  const now = new Date();

  const { error: presenceWriteError } = await supabase.from("user_presence").upsert(
    {
      user_id: userId,
      last_seen_at: now.toISOString(),
      last_path: parsed.data.path,
      updated_at: now.toISOString()
    },
    { onConflict: "user_id" }
  );

  if (presenceWriteError) {
    return jsonError(presenceWriteError, "Impossible d'enregistrer la presence.");
  }

  // Learning time is only credited for students reading inside a module.
  const moduleId = parsed.data.path.match(MODULE_PATH_PATTERN)?.[1] ?? null;
  if (auth.user.role !== "student" || !moduleId) {
    return NextResponse.json({ ok: true, moduleSeconds: null });
  }

  const { data: current, error: timeReadError } = await supabase
    .from("module_time_spent")
    .select("active_seconds, first_seen_at, last_seen_at")
    .match({ user_id: userId, module_id: moduleId })
    .maybeSingle<ModuleTimeRow>();

  if (timeReadError) {
    return jsonError(timeReadError, "Impossible de lire le temps de module.");
  }

  const secondsSinceHeartbeat = current
    ? Math.max(0, Math.floor((now.getTime() - new Date(current.last_seen_at).getTime()) / 1000))
    : 0;
  const activeSeconds =
    (current?.active_seconds ?? 0) + Math.min(secondsSinceHeartbeat, MAX_CREDITED_GAP_SECONDS);

  const { error: timeWriteError } = await supabase.from("module_time_spent").upsert(
    {
      user_id: userId,
      module_id: moduleId,
      active_seconds: activeSeconds,
      first_seen_at: current?.first_seen_at ?? now.toISOString(),
      last_seen_at: now.toISOString()
    },
    { onConflict: "user_id,module_id" }
  );

  if (timeWriteError) {
    return jsonError(timeWriteError, "Impossible d'enregistrer le temps de module.");
  }

  return NextResponse.json({ ok: true, moduleSeconds: activeSeconds });
}
