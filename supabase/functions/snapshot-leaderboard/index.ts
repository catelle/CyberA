import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

Deno.serve(async () => {
  const { data: profiles, error } = await supabase
    .from("ambassador_profiles")
    .select("user_id, total_points")
    .order("total_points", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
  const week = weekStart.toISOString().slice(0, 10);

  const rows = (profiles ?? []).map((profile, index) => ({
    user_id: profile.user_id,
    week_start: week,
    points_earned: profile.total_points ?? 0,
    rank: index + 1,
    challenges_done: 0
  }));

  if (rows.length > 0) {
    const { error: upsertError } = await supabase
      .from("weekly_snapshots")
      .upsert(rows, { onConflict: "user_id,week_start" });
    if (upsertError) {
      return Response.json({ error: upsertError.message }, { status: 500 });
    }
  }

  return Response.json({ snapshotted: rows.length });
});
