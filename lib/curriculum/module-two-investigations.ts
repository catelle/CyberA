import type { InvestigationLesson } from "@/lib/curriculum/module-one-investigations";
import { moduleTwoLessonSpecs } from "@/lib/curriculum/module-two";

const image = "/images/module-2/digital-survivor-investigation.png";

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
        image,
        scenes: [
          {
            eyebrow: "Scène d'ouverture · Le mystère",
            title: spec.mystery,
            narration: "Une situation réaliste va te permettre d'identifier le danger, de comprendre son mécanisme, puis de choisir une réponse sûre.",
            evidence: "Observe d'abord les faits. Une apparence convaincante n'est pas encore une preuve.",
            coach: "Avance indice par indice : situation, preuve, décision, action.",
          },
          {
            eyebrow: "Chapitre 1 · Observer",
            title: "Que vient-il réellement de se passer ?",
            narration: spec.incident,
            evidence: spec.evidence[0],
            coach: "Sépare ce que tu peux constater de ce que tu supposes.",
          },
          {
            eyebrow: "Chapitre 2 · Collecter les preuves",
            title: "Les indices révèlent le mécanisme.",
            narration: spec.evidence.slice(1).join(" "),
            evidence: spec.evidence.join(" "),
            coach: "Ces indices se renforcent lorsqu'ils apparaissent ensemble.",
          },
          {
            eyebrow: "Chapitre 3 · Décider",
            title: "Choisis la réponse la plus sûre.",
            narration: `Tu disposes maintenant des faits nécessaires. ${spec.decision}`,
            evidence: spec.explanation,
            coach: "Réponds avec la preuve, pas avec la peur ou l'urgence.",
            question: spec.decision,
            options: spec.options,
            correct: spec.correctIndex,
          },
          {
            eyebrow: "Chapitre 4 · Agir",
            title: "Transforme l'indice en réflexe.",
            narration: spec.response.join(" "),
            evidence: `Action prioritaire : ${spec.response[0]}`,
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
