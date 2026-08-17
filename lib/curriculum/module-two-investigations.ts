import type { InvestigationLesson } from "@/lib/curriculum/module-one-investigations";
import { moduleTwoLessonSpecs } from "@/lib/curriculum/module-two";

const lessonImages: Record<string, string> = {
  "bad-guys":                  "/images/module-2/bad-guys.png",
  "think-like-hacker":         "/images/module-2/think-like-hacker.png",
  "social-engineering":        "/images/module-2/social-engineering.png",
  "fake-websites":             "/images/module-2/fake-websites.png",
  "whatsapp-scams":            "/images/module-2/whatsapp-scams.png",
  "fake-opportunities":        "/images/module-2/fake-opportunities.png",
  "romance-investment-scams":  "/images/module-2/romance-investment-scams.png",
  "protect-phone":             "/images/module-2/protect-phone.png",
  "passwords-mfa":             "/images/module-2/passwords-mfa.png",
  "fake-news-ai":              "/images/module-2/fake-news-ai.png",
  "cyberbullying-harm":        "/images/module-2/cyberbullying-harm.png",
  "incident-response":         "/images/module-2/incident-response.png",
  "digital-survival-guide":    "/images/module-2/digital-survival-guide.png",
  "final-case":                "/images/module-2/final-case.png",
};
const fallbackImage = "/images/module-2/digital-survivor-investigation.png";

export const moduleTwoInvestigations: Record<string, InvestigationLesson> =
  Object.fromEntries(
    moduleTwoLessonSpecs.map((spec) => [
      spec.id,
      {
        id: spec.id,
        title: spec.title,
        transformation: spec.explanation,
        mystery: spec.mystery,
        atmosphere: "Dossier de survie numérique",
        accent: "#c31346",
        image: lessonImages[spec.id] ?? fallbackImage,
        scenes: [
          {
            eyebrow: "Scène d'ouverture · Le mystère",
            title: spec.mystery,
            narration: spec.incident,
            evidence: "Observe d'abord les faits. Une apparence convaincante n'est pas encore une preuve.",
            coach: "Avance indice par indice. Aucun mot ne sera supposé connu.",
          },
          ...spec.evidence.map((item, index) => ({
            eyebrow: `Indice ${index + 1} · Découverte`,
            title: `Scène ${index + 1}`,
            narration: item,
            evidence: item,
            coach: index < spec.evidence.length - 1
              ? "Retiens cette idée avant de passer à la suivante."
              : "Tu as maintenant tous les indices. Il est temps de décider.",
          })),
          {
            eyebrow: "Décision · Choisis la réponse la plus sûre",
            title: spec.decision,
            narration: spec.explanation,
            evidence: spec.explanation,
            coach: "Réponds avec les preuves, pas avec la peur ou l'urgence.",
            question: spec.decision,
            options: spec.options,
            correct: spec.correctIndex,
          },
          {
            eyebrow: "Réflexes · Transforme les indices en actions",
            title: "Ce que tu fais maintenant.",
            narration: spec.response.join(" "),
            evidence: spec.response[0],
            coach: "Une bonne réponse protège d'abord, puis conserve les preuves et signale.",
          },
          {
            eyebrow: "Synthèse · Mission réelle",
            title: "Tu peux maintenant traiter ce dossier.",
            narration: spec.mission,
            evidence: spec.reflection,
            coach: spec.cliffhanger,
          },
        ],
        mission: spec.response,
        summary: spec.evidence,
        cliffhanger: spec.cliffhanger,
      } satisfies InvestigationLesson,
    ]),
  );
