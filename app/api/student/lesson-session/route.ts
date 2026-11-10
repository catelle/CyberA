import { NextResponse } from "next/server";
import { z } from "zod";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const sessionSchema = z.object({
  moduleId: z.string().uuid(),
  lessonId: z.string().trim().min(1).max(120),
  checkpoint: z.coerce.number().int().min(0).max(20).optional()
});

type LessonSession = {
  started_at: string;
  last_seen_at: string;
  active_seconds: number;
  checkpoints_completed: number;
};

const MINIMUM_ACTIVE_SECONDS = 60 * 60;

export async function POST(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => null);
  const parsed = sessionSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Session de lecon invalide." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const key = {
    user_id: auth.user.supabaseUserId,
    module_id: parsed.data.moduleId,
    lesson_id: parsed.data.lessonId
  };
  const { data: current, error: readError } = await supabase
    .from("lesson_sessions")
    .select("started_at,last_seen_at,active_seconds,checkpoints_completed")
    .match(key)
    .maybeSingle<LessonSession>();

  if (readError) return jsonError(readError, "Impossible de lire la session de lecon.");

  const now = new Date();
  let activeSeconds = current?.active_seconds ?? 0;
  if (current) {
    const secondsSinceHeartbeat = Math.max(
      0,
      Math.floor((now.getTime() - new Date(current.last_seen_at).getTime()) / 1000)
    );
    // Count genuine reading time while tolerating delayed mobile heartbeats.
    activeSeconds += Math.min(secondsSinceHeartbeat, 75);
  }

  const checkpointsCompleted = Math.max(
    current?.checkpoints_completed ?? 0,
    parsed.data.checkpoint ?? 0
  );
  const values = {
    ...key,
    started_at: current?.started_at ?? now.toISOString(),
    last_seen_at: now.toISOString(),
    active_seconds: activeSeconds,
    checkpoints_completed: checkpointsCompleted
  };
  const { error: writeError } = await supabase
    .from("lesson_sessions")
    .upsert(values, { onConflict: "user_id,module_id,lesson_id" });

  if (writeError) return jsonError(writeError, "Impossible d'enregistrer le temps de lecon.");

  return NextResponse.json({
    activeSeconds,
    remainingSeconds: Math.max(0, MINIMUM_ACTIVE_SECONDS - activeSeconds),
    checkpointsCompleted,
    eligibleForFinalQuiz:
      activeSeconds >= MINIMUM_ACTIVE_SECONDS && checkpointsCompleted >= 2
  });
}
