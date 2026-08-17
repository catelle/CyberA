import type {
  InvestigationLesson,
  InvestigationVisual,
} from "@/lib/curriculum/module-one-investigations";

import {
  moduleTwoLessonSpecs,
  type SurvivalSpec,
} from "@/lib/curriculum/module-two";

const lessonImages: Record<string, string> = {
  "bad-guys": "/images/module-2/bad-guys.png",
  "think-like-hacker": "/images/module-2/think-like-hacker.png",
  "social-engineering": "/images/module-2/social-engineering.png",
  "fake-websites": "/images/module-2/fake-websites.png",
  "whatsapp-scams": "/images/module-2/whatsapp-scams.png",
  "fake-opportunities": "/images/module-2/fake-opportunities.png",
  "romance-investment-scams":
    "/images/module-2/romance-investment-scams.png",
  "protect-phone": "/images/module-2/protect-phone.png",
  "passwords-mfa": "/images/module-2/passwords-mfa.png",
  "fake-news-ai": "/images/module-2/fake-news-ai.png",
  "cyberbullying-harm": "/images/module-2/cyberbullying-harm.png",
  "incident-response": "/images/module-2/incident-response.png",
  "digital-survival-guide":
    "/images/module-2/digital-survival-guide.png",
  "final-case": "/images/module-2/final-case.png",
};

const fallbackImage =
  "/images/module-2/digital-survivor-investigation.png";

/**
 * Lesson structure:
 *
 * 1 opening scene
 * <= 12 concept scenes
 * 1 decision scene
 * 1 response/reflex scene
 * 1 synthesis scene
 *
 * Maximum = 16 scenes.
 *
 * This leaves room to manually add extra missions later
 * while remaining below the hard limit of 20.
 */
const MAX_CONCEPT_SCENES = 12;

/**
 * Groups consecutive evidence paragraphs together.
 *
 * Example:
 * 30 evidence paragraphs
 * -> groups of 3
 * -> 10 concept scenes
 *
 * Instead of 30 individual scenes.
 */
function groupEvidence(
  evidence: string[],
  maxGroups = MAX_CONCEPT_SCENES,
): string[][] {
  if (evidence.length <= maxGroups) {
    return evidence.map((item) => [item]);
  }

  const groupSize = Math.ceil(evidence.length / maxGroups);
  const groups: string[][] = [];

  for (let index = 0; index < evidence.length; index += groupSize) {
    groups.push(evidence.slice(index, index + groupSize));
  }

  return groups;
}

/**
 * Creates short pieces of text that work better
 * inside diagrams/animations than entire paragraphs.
 */
function visualItems(text: string): string[] {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const items = sentences.slice(0, 4).map((sentence) => {
    if (sentence.length <= 95) {
      return sentence;
    }

    return `${sentence.slice(0, 92).trim()}…`;
  });

  if (items.length > 0) {
    return items;
  }

  return [text.slice(0, 95)];
}

type SimpleVisualType =
  | "flow"
  | "warning"
  | "checklist"
  | "signal"
  | "timeline"
  | "phone";

/**
 * Every lesson gets a slightly different visual rhythm.
 *
 * We alternate visual types so a lesson does not become
 * 15 identical cards.
 */
const lessonVisualSequence: Record<string, SimpleVisualType[]> = {
  "bad-guys": [
    "signal",
    "flow",
    "warning",
    "phone",
    "flow",
    "checklist",
  ],

  "think-like-hacker": [
    "flow",
    "signal",
    "timeline",
    "warning",
    "checklist",
  ],

  "social-engineering": [
    "phone",
    "signal",
    "warning",
    "flow",
    "checklist",
  ],

  "fake-websites": [
    "warning",
    "signal",
    "flow",
    "checklist",
    "timeline",
  ],

  "whatsapp-scams": [
    "phone",
    "signal",
    "warning",
    "checklist",
    "flow",
  ],

  "fake-opportunities": [
    "phone",
    "warning",
    "signal",
    "checklist",
    "timeline",
  ],

  "romance-investment-scams": [
    "timeline",
    "phone",
    "signal",
    "warning",
    "checklist",
  ],

  "protect-phone": [
    "checklist",
    "warning",
    "flow",
    "signal",
    "timeline",
  ],

  "passwords-mfa": [
    "flow",
    "warning",
    "checklist",
    "signal",
    "timeline",
  ],

  "fake-news-ai": [
    "signal",
    "warning",
    "flow",
    "checklist",
    "timeline",
  ],

  "cyberbullying-harm": [
    "timeline",
    "warning",
    "signal",
    "checklist",
    "flow",
  ],

  "incident-response": [
    "timeline",
    "warning",
    "checklist",
    "flow",
    "signal",
  ],

  "digital-survival-guide": [
    "checklist",
    "flow",
    "signal",
    "warning",
    "timeline",
  ],

  "final-case": [
    "signal",
    "timeline",
    "warning",
    "flow",
    "checklist",
  ],
};

function buildVisual(
  lessonId: string,
  sceneIndex: number,
  text: string,
): InvestigationVisual {
  const sequence =
    lessonVisualSequence[lessonId] ??
    (["flow", "signal", "checklist"] as SimpleVisualType[]);

  const visualType =
    sequence[sceneIndex % sequence.length];

  const items = visualItems(text);

  switch (visualType) {
    case "phone":
      return {
        type: "phone",
        sender:
          lessonId === "whatsapp-scams"
            ? "Contact inconnu"
            : lessonId === "social-engineering"
              ? "Service client ?"
              : "Message reçu",
        lines: items.slice(0, 3),
      };

    case "warning":
      return {
        type: "warning",
        items,
      };

    case "checklist":
      return {
        type: "checklist",
        items,
      };

    case "signal":
      return {
        type: "signal",
        items,
        caption: "Observe les signaux avant de décider.",
      };

    case "timeline":
      return {
        type: "timeline",
        items,
      };

    case "flow":
    default:
      return {
        type: "flow",
        items,
        caption: "Observe comment les éléments se connectent.",
      };
  }
}

function buildConceptScenes(spec: SurvivalSpec) {
  const groups = groupEvidence(spec.evidence);

  return groups.map((group, index) => {
    const combined = group.join(" ");

    return {
      eyebrow: `Indice ${index + 1} · Comprendre`,
      title: `Concept clé ${index + 1}`,
      narration: combined,
      evidence:
        group.length === 1
          ? group[0]
          : `${group.length} idées reliées permettent de comprendre ce mécanisme.`,
      coach:
        "Observe le mécanisme dans son ensemble plutôt que de mémoriser chaque phrase séparément.",
      visual: buildVisual(spec.id, index, combined),
    };
  });
}

function openingVisual(spec: SurvivalSpec): InvestigationVisual {
  if (
    spec.id === "social-engineering" ||
    spec.id === "whatsapp-scams" ||
    spec.id === "fake-opportunities"
  ) {
    return {
      type: "phone",
      sender:
        spec.id === "whatsapp-scams"
          ? "WhatsApp"
          : "Message suspect",
      lines: visualItems(spec.incident).slice(0, 3),
    };
  }

  return {
    type: "signal",
    items: [
      "Quelque chose semble normal",
      "Un détail mérite ton attention",
      "Observe avant d'agir",
    ],
    caption: "L'enquête commence.",
  };
}

function decisionVisual(spec: SurvivalSpec): InvestigationVisual {
  return {
    type: "warning",
    items: [
      "Ne réponds pas sous pression",
      "Analyse les indices",
      "Choisis la réponse la plus sûre",
    ],
  };
}

function responseVisual(spec: SurvivalSpec): InvestigationVisual {
  return {
    type: "checklist",
    items: spec.response,
  };
}

export const moduleTwoInvestigations: Record<
  string,
  InvestigationLesson
> = Object.fromEntries(
  moduleTwoLessonSpecs.map((spec) => {
    const scenes = [
      {
        eyebrow: "Scène d'ouverture · Le mystère",
        title: spec.mystery,
        narration: spec.incident,
        evidence:
          "Observe les faits avant de tirer une conclusion.",
        coach:
          "Commence par identifier ce qui se passe réellement.",
        visual: openingVisual(spec),
      },

      ...buildConceptScenes(spec),

      {
        eyebrow: "Mission · À toi de décider",
        title: "Que ferais-tu ?",
        narration: spec.decision,
        evidence: spec.explanation,
        coach:
          "Utilise les indices de la leçon pour choisir.",
        visual: decisionVisual(spec),
        question: spec.decision,
        options: spec.options,
        correct: spec.correctIndex,
      },

      {
        eyebrow: "Réflexes · Passe à l'action",
        title: "Les gestes qui te protègent",
        narration:
          "Transforme ce que tu viens d'apprendre en réflexes simples.",
        evidence: spec.explanation,
        coach:
          "La cybersécurité devient utile quand elle influence tes décisions.",
        visual: responseVisual(spec),
      },

      {
        eyebrow: "Synthèse · Mission réelle",
        title: "Dossier résolu",
        narration: spec.mission,
        evidence: spec.reflection,
        coach: spec.cliffhanger,
        visual: {
          type: "timeline" as const,
          items: [
            "Observer",
            "Comprendre",
            "Vérifier",
            "Agir",
          ],
        },
      },
    ];

    /**
     * Development safeguard.
     *
     * If somebody later adds too much content,
     * fail immediately instead of silently producing
     * a 25- or 30-scene lesson.
     */
    if (scenes.length > 20) {
      throw new Error(
        `Module 2 lesson "${spec.id}" has ${scenes.length} scenes. Maximum allowed is 20.`,
      );
    }

    const lesson: InvestigationLesson = {
      id: spec.id,
      title: spec.title,
      transformation: spec.explanation,
      mystery: spec.mystery,
      atmosphere: "Dossier de survie numérique",
      accent: "#c31346",
      image: lessonImages[spec.id] ?? fallbackImage,
      scenes,
      mission: spec.response,
      summary: spec.evidence,
      cliffhanger: spec.cliffhanger,
    };

    return [spec.id, lesson];
  }),
);