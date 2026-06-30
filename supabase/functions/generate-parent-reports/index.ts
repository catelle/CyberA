import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

Deno.serve(async () => {
  const { data: links, error } = await supabase
    .from("family_links")
    .select("parent_id, child_id, users!family_links_child_id_fkey(full_name), ambassador_profiles!family_links_child_id_fkey(total_points, level, modules_completed)")
    .not("parent_id", "is", null);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const rows = (links ?? []).flatMap((link: any) => {
    if (!link.parent_id || !link.child_id) return [];
    const childName = link.users?.full_name ?? "Ambassadeur";
    return [
      {
        user_id: link.parent_id,
        type: "parent_report",
        title: "Rapport hebdomadaire CyberAmbassador",
        body: `${childName} a ${link.ambassador_profiles?.total_points ?? 0} points et ${link.ambassador_profiles?.modules_completed ?? 0} modules completes.`,
        data: {
          child_id: link.child_id,
          child_name: childName,
          week_period: "Semaine courante",
          points_earned_this_week: 0,
          challenges_completed: 0,
          modules_progress: [],
          forum_contributions: 0,
          current_rank: 0,
          level: link.ambassador_profiles?.level ?? "junior"
        }
      }
    ];
  });

  if (rows.length > 0) {
    const { error: insertError } = await supabase.from("notifications").insert(rows);
    if (insertError) {
      return Response.json({ error: insertError.message }, { status: 500 });
    }
  }

  return Response.json({ generated: rows.length });
});
