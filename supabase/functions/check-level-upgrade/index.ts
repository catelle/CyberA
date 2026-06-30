import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

Deno.serve(async (request) => {
  const { user_id } = await request.json().catch(() => ({ user_id: null }));

  if (!user_id) {
    return Response.json({ error: "user_id is required" }, { status: 400 });
  }

  const { data: profile, error } = await supabase
    .from("ambassador_profiles")
    .select("level, total_points, modules_completed, capstone_submitted")
    .eq("user_id", user_id)
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const nextLevel =
    profile.total_points >= 1000 && profile.capstone_submitted
      ? "master"
      : profile.total_points >= 500 && profile.modules_completed >= 4
        ? "senior"
        : "junior";

  if (nextLevel !== profile.level) {
    const { error: updateError } = await supabase
      .from("ambassador_profiles")
      .update({ level: nextLevel })
      .eq("user_id", user_id);

    if (updateError) {
      return Response.json({ error: updateError.message }, { status: 500 });
    }

    await supabase.from("notifications").insert({
      user_id,
      type: "level_up",
      title: "Nouveau niveau CyberAmbassador",
      body: `Tu passes au niveau ${nextLevel}.`,
      data: { level: nextLevel }
    });
  }

  return Response.json({ level: nextLevel });
});
