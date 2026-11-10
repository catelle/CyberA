import type { InvestigationLesson, InvestigationVisual } from "@/lib/curriculum/module-one-investigations";
import { moduleFourLessonSpecs, type AmbassadorLessonSpec } from "@/lib/curriculum/module-four";

function concise(text: string) {
  return text.split(/(?<=[.!?;:])\s+/).map((item) => item.trim()).filter(Boolean).slice(0, 4).map((item) => item.length > 110 ? `${item.slice(0, 107).trim()}…` : item);
}

function visualFor(spec: AmbassadorLessonSpec, index: number, text: string): InvestigationVisual {
  const items = concise(text);
  if ([4, 5, 8].includes(spec.order)) return { type: "flow", items, caption: "Active les étapes de cette action responsable." };
  if ([2, 6, 9].includes(spec.order)) return { type: "timeline", items };
  if (index % 2 === 0) return { type: "signal", items, caption: "Transforme chaque observation en décision consciente." };
  return { type: "checklist", items };
}

export const moduleFourInvestigations: Record<string, InvestigationLesson> = Object.fromEntries(
  moduleFourLessonSpecs.map((spec) => {
    const scenes = [
      {
        eyebrow: `Passage ${spec.order} · Grande question`, title: spec.question, narration: spec.situation,
        evidence: `Pouvoir à débloquer : ${spec.power}`, coach: "Observe d'abord la situation. Un ambassadeur comprend avant de décider.",
        illustration: spec.image, visual: { type: "signal" as const, items: ["Observer", "Comprendre", "Choisir", "Agir"], caption: "Le rôle commence par une décision consciente." },
      },
      ...spec.evidence.map((text, index) => ({
        eyebrow: `Comprendre · Repère ${index + 1}`, title: index === 0 ? "Le principe essentiel" : `Approfondissement ${index + 1}`,
        narration: text, evidence: concise(text)[0] ?? text, coach: "Relie ce principe à une situation réelle de ta communauté.",
        illustration: index === 0 ? spec.image : undefined, visual: visualFor(spec, index, text),
      })),
      {
        eyebrow: "Décider · Test de responsabilité", title: spec.quiz.question,
        narration: "Choisis l'action que tu pourrais expliquer publiquement et défendre sans mettre une personne en danger.",
        evidence: spec.quiz.explanation, coach: "La meilleure réponse est utile, proportionnée et respectueuse.",
        visual: { type: "warning" as const, items: ["Pas de réaction précipitée", "Pas d'exposition inutile", "Une action proportionnée"] },
        question: spec.quiz.question, options: spec.quiz.options, correct: spec.quiz.correctIndex,
      },
      {
        eyebrow: "Mission de terrain · Pouvoir débloqué", title: spec.power, narration: spec.transition,
        evidence: spec.reflection, coach: "Le pouvoir devient réel seulement lorsque tu le transformes en pratique.",
        visual: { type: "timeline" as const, items: spec.mission },
      },
    ];
    return [spec.id, {
      id: spec.id, title: spec.title, transformation: spec.power, mystery: spec.question,
      atmosphere: "Parcours CyberAmbassador", accent: "#BD0F43", image: spec.image,
      scenes, mission: spec.mission, summary: spec.evidence, cliffhanger: spec.transition,
    } satisfies InvestigationLesson];
  })
);
