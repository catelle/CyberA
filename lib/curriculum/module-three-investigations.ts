import type { InvestigationLesson, InvestigationVisual } from "@/lib/curriculum/module-one-investigations";
import { getModuleThreeLessonSpecs, moduleThreeLessonSpecs, type AcademySpec } from "@/lib/curriculum/module-three";
import type { Language } from "@/types/auth";

function cleanLessonText(text: string) {
  return text
    .replace(/\*\*([\s\S]*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function visibleItems(text: string) {
  const clean = cleanLessonText(text);
  const paragraphs = clean.split(/\n+/).map((item) => item.trim()).filter(Boolean);
  if (paragraphs.length > 1) return paragraphs;
  return clean.split(/(?<=[.!?;:])\s+/).map((item) => item.trim()).filter(Boolean);
}

function sceneVisual(spec: AcademySpec, index: number, text: string): InvestigationVisual {
  const items = visibleItems(text);
  const mode = index % 4;
  if (mode === 0) return { type: "flow", items, caption: "Active les etapes pour reconstruire la methode." };
  if (mode === 1) return { type: "signal", items, caption: "Chaque signal devient une piste, pas une conclusion." };
  if (mode === 2) return { type: "timeline", items };
  return { type: "checklist", items };
}

function buildModuleThreeInvestigations(specs: AcademySpec[], language: Language = "fr"): Record<string, InvestigationLesson> {
  return Object.fromEntries(
  specs.map((spec) => {
    const scenes = [
      {
        eyebrow: language === "en" ? "Workshop · Digital Toolbox" : "Atelier · Boîte à outils numérique",
        title: cleanLessonText(spec.mystery),
        narration: cleanLessonText(spec.reality),
        evidence: `Compétence à maîtriser : ${spec.superpower}`,
        coach: language === "en" ? "Observe the situation before choosing your tool." : "Observe la situation avant de choisir ton outil.",
        illustration: spec.image,
        visual: { type: "signal" as const, items: language === "en" ? ["Observe", "Question", "Verify"] : ["Observer", "Questionner", "Verifier"], caption: language === "en" ? "Curiosity opens the room." : "La curiosite ouvre la salle." },
      },
      ...spec.evidence.map((text, index) => ({
        eyebrow: `Enquete ${index + 1} · Maitriser`,
        title: index === 0 ? "Le principe cache" : `Technique ${index + 1}`,
        narration: cleanLessonText(text),
        evidence: cleanLessonText(text),
        coach: "Relie cette idee a l'indice precedent : une methode se construit etape par etape.",
        illustration: index === 0 ? spec.image : undefined,
        visual: sceneVisual(spec, index, text),
      })),
      {
        eyebrow: "Epreuve · Choisis ton action",
        title: spec.quiz.question,
        narration: language === "en" ? "Use the evidence collected in the room. A defensible answer must be explainable." : "Utilise les preuves collectees dans la salle. Une reponse defendable doit pouvoir etre expliquee.",
        evidence: spec.quiz.explanation,
        coach: language === "en" ? "Do not choose the most spectacular answer; choose the one supported by evidence." : "Ne cherche pas la reponse la plus spectaculaire; cherche celle que les preuves soutiennent.",
        visual: { type: "warning" as const, items: language === "en" ? ["Avoid a quick reaction", "Choose a method", "Justify with evidence"] : ["Evite la reaction rapide", "Choisis une methode", "Justifie avec une preuve"] },
        question: spec.quiz.question,
        options: spec.quiz.options,
        correct: spec.quiz.correctIndex,
      },
      {
        eyebrow: "Outil · Compétence maîtrisée",
        title: spec.artifact,
        narration: cleanLessonText(spec.cliffhanger),
        evidence: cleanLessonText(spec.reflection),
        coach: language === "en" ? "This tool joins your toolbox. You will reuse it in the final workshop." : "Cet outil rejoint ta boîte à outils. Tu devras le réutiliser dans l'atelier final.",
        visual: { type: "timeline" as const, items: spec.mission },
      },
    ];

    return [spec.id, {
      id: spec.id,
      title: spec.title,
      transformation: spec.superpower,
      mystery: cleanLessonText(spec.mystery),
      atmosphere: language === "en" ? "Digital Toolbox · Tools & Practice" : "Digital Toolbox · Outils & Pratiques",
      accent: "#8b5cf6",
      image: spec.image,
      scenes,
      mission: spec.mission,
      summary: spec.evidence,
      cliffhanger: spec.cliffhanger,
    } satisfies InvestigationLesson];
  })
  );
}

export const moduleThreeInvestigations = buildModuleThreeInvestigations(moduleThreeLessonSpecs);

export function getModuleThreeInvestigations(language: Language): Record<string, InvestigationLesson> {
  return buildModuleThreeInvestigations(getModuleThreeLessonSpecs(language), language);
}
