import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

Deno.serve(async () => {
  const { data: expired, error } = await supabase
    .from("challenge_submissions")
    .select("id, photo_url")
    .lt("auto_delete_at", new Date().toISOString())
    .not("photo_url", "is", null);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const paths = (expired ?? []).map((item) => item.photo_url).filter(Boolean);
  if (paths.length > 0) {
    await supabase.storage.from("challenge-photos").remove(paths);
    await supabase
      .from("challenge_submissions")
      .update({ photo_url: null })
      .in("id", (expired ?? []).map((item) => item.id));
  }

  return Response.json({ deleted: paths.length });
});
