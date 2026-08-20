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
  const { data: challenge, error: challengeError } = await supabase
    .from("challenges")
    .select("id")
    .eq("id", challengeId)
    .eq("is_active", true)
    .is("archived_at", null)
    .maybeSingle<{ id: string }>();

  if (challengeError) {
    return jsonError(challengeError, "Impossible de vérifier le défi.");
  }

  if (!challenge) {
    return NextResponse.json(
      {
        message:
          "Ce défi n'est plus actif ou n'existe plus. Retirez cette action de la synchronisation."
      },
      { status: 410 }
    );
  }

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

  const { data, error } = await supabase.rpc("submit_registered_challenge", {
    p_user_id: auth.user.supabaseUserId,
    p_challenge_id: challengeId,
    p_report_text: reportText,
    p_photo_url: photoUrl,
    p_reviewer_note: city ? `Ville: ${city}` : null
  });

  if (error) {
    const expired = error.message.includes("expired");
    return jsonError(
      new Error(expired ? "Ton delai de 3 jours est termine." : "Inscription active requise avant la soumission."),
      "Impossible d'enregistrer la soumission.",
      expired ? 410 : 409
    );
  }
  return NextResponse.json({ submissionId: data }, { status: 201 });
}
