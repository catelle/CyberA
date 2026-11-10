import { requireApiRole } from "@/lib/api/authz";
import { createBadgePng } from "@/lib/badge-artwork";
import { listModulesWithFallback } from "@/lib/db/cybera";

export const runtime = "nodejs";

type BadgePreviewRouteProps = {
  params: { moduleId: string };
};

export async function GET(_request: Request, { params }: BadgePreviewRouteProps) {
  const auth = await requireApiRole(["admin", "facilitator"]);
  if (!auth.ok) return auth.response;

  const modules = await listModulesWithFallback();
  const selectedModule = modules.find((item) => item.id === params.moduleId);
  if (!selectedModule) return new Response("Module introuvable.", { status: 404 });

  const png = await createBadgePng({
    badgeName: `Badge ${selectedModule.title}`,
    moduleTitle: selectedModule.title
  });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `inline; filename="badge-module-${selectedModule.order_index}.png"`,
      "Cache-Control": "private, max-age=60"
    }
  });
}
