import { NextResponse } from "next/server";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const formData = await request.formData();
  const challengeId = String(formData.get("challengeId") ?? "");
  const reportText = String(formData.get("reportText") ?? "");
  const city = String(formData.get("city") ?? "");
  const photo = formData.get("photo");

  if (!challengeId || reportText.trim().length < 100) {
    return NextResponse.json(
      { message: "Soumission invalide: rapport de 100 caracteres minimum requis." },
      { status: 400 }
    );
  }

  if (!uuidPattern.test(challengeId)) {
    return NextResponse.json(
      {
        message:
          "Defi invalide: ce defi local n'existe pas dans Supabase. Active un defi cree depuis l'administration."
      },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  let photoUrl: string | null = null;

  if (photo instanceof File && photo.size > 0) {
    const extension = photo.name.split(".").pop() ?? "jpg";
    const path = `${auth.user.supabaseUserId}/${challengeId}-${Date.now()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("challenge-photos")
      .upload(path, photo, {
        contentType: photo.type,
        upsert: true
      });

    if (uploadError) return jsonError(uploadError, "Impossible d'envoyer la photo.");
    photoUrl = path;
  }

  const { data, error } = await supabase
    .from("challenge_submissions")
    .upsert(
      {
        user_id: auth.user.supabaseUserId,
        challenge_id: challengeId,
        report_text: reportText,
        photo_url: photoUrl,
        status: "pending",
        reviewer_note: city ? `Ville: ${city}` : null
      },
      { onConflict: "user_id,challenge_id" }
    )
    .select("*")
    .single();

  if (error) return jsonError(error, "Impossible d'enregistrer la soumission.");
  return NextResponse.json({ submission: data }, { status: 201 });
}
