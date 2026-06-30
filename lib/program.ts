export type ProgramModuleStatus = "ready" | "next" | "planned";

export type LessonContentBlock = {
  type: "text" | "tip" | "warning" | "checklist";
  content: string | string[];
};

export type ProgramLesson = {
  id: string;
  order: number;
  title: string;
  estimatedMins: number;
  content: LessonContentBlock[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
};

export type ProgramModule = {
  id: string;
  week: number;
  title: string;
  subtitle: string;
  summary: string;
  color: string;
  icon: string;
  outcomes: string[];
  status: ProgramModuleStatus;
  progressPercent: number;
  lessons: ProgramLesson[];
  quiz: QuizQuestion[];
};

export type Cohort = {
  name: string;
  image: string;
  description: string;
  type: "onsite" | "remote";
  startDate: string;
  maxSize: number;
  enrolled: number;
};

export type AmbassadorAction = {
  title: string;
  description: string;
  owner: "student" | "parent" | "admin";
};

export type WeeklyChallenge = {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  points: number;
  weekStart: string;
  deadline: string;
  requiresPhoto: boolean;
  status: "open" | "submitted" | "reviewed";
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  city: string;
  level: "junior" | "senior" | "master";
  points: number;
  weeklyPoints: number;
  cohort: string;
  isCurrentUser?: boolean;
};

export type ForumReport = {
  id: string;
  type: "scam" | "bullying" | "misinformation" | "other";
  platform: "Facebook" | "WhatsApp" | "TikTok" | "Instagram" | "Other";
  description: string;
  target: string;
  status: "pending" | "verified" | "actioned" | "rejected";
  createdAt: string;
  actionInstructions?: string[];
};

export type NotificationItem = {
  id: string;
  type: "challenge_approved" | "forum_action" | "parent_report" | "level_up";
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

export type ParentReport = {
  id: string;
  weekPeriod: string;
  childName: string;
  pointsEarned: number;
  challengesCompleted: number;
  currentRank: number;
  level: "junior" | "senior" | "master";
  message: string;
};

export type CapstoneSubmission = {
  id: string;
  ambassadorName: string;
  title: string;
  actionType: "whatsapp_broadcast" | "school_talk" | "social_post" | "other";
  reachCount: number;
  status: "pending" | "approved" | "rejected";
};

function lesson(
  id: string,
  order: number,
  title: string,
  warning: string,
  checklist: string[]
): ProgramLesson {
  return {
    id,
    order,
    title,
    estimatedMins: 6,
    content: [
      {
        type: "text",
        content:
          "Lis la situation, repere les signaux d'alerte, puis choisis une action simple que tu peux expliquer a un proche."
      },
      {
        type: "warning",
        content: warning
      },
      {
        type: "checklist",
        content: checklist
      },
      {
        type: "tip",
        content:
          "Avant de partager, ralentis: verifier une source prend moins de temps que reparer une erreur publique."
      }
    ]
  };
}

export const programModules: ProgramModule[] = [
  {
    id: "hygiene-numerique",
    week: 1,
    title: "Hygiene Numerique",
    subtitle: "Vie privee, mots de passe et temps d'ecran",
    summary:
      "Installer les reflexes de base pour proteger ses comptes, ses donnees et son attention.",
    color: "#1A5276",
    icon: "shield",
    outcomes: ["Regler la confidentialite", "Creer une phrase de passe", "Limiter le partage"],
    status: "ready",
    progressPercent: 60,
    lessons: [
      lesson("algorithmes", 1, "Comment les algorithmes influencent ce que tu vois", "Un fil d'actualite n'est jamais neutre: il apprend de tes clics.", [
        "Comparer deux sources avant de croire une information",
        "Identifier ce qui te pousse a rester connecte",
        "Choisir une pause numerique realiste"
      ]),
      lesson("temps-ecran", 2, "Gerer le temps d'ecran et les habitudes", "La fatigue numerique rend les arnaques plus faciles a rater.", [
        "Activer un rappel de pause",
        "Retirer une notification inutile",
        "Definir une zone sans telephone"
      ]),
      lesson("vie-privee", 3, "Proteger ta vie privee", "Une publication anodine peut contenir ton ecole, ton quartier ou tes habitudes.", [
        "Verifier qui peut voir ton profil",
        "Utiliser une phrase de passe unique",
        "Activer la double verification"
      ]),
      lesson("surmenage", 4, "Reconnaitre les signaux de surmenage numerique", "Le stress en ligne peut devenir physique: sommeil, humeur, concentration.", [
        "Nommer un signal personnel",
        "Prevenir un adulte de confiance",
        "Remplacer une session par une activite hors ligne"
      ]),
      lesson("usage-sain", 5, "Utiliser la technologie de maniere saine", "Un bon outil reste au service de ton objectif, pas l'inverse.", [
        "Planifier un usage utile",
        "Bloquer un contenu nuisible",
        "Aider un ami a regler son compte"
      ])
    ],
    quiz: [
      {
        id: "privacy-default",
        question: "Quel reglage verifier en premier sur un nouveau reseau social ?",
        options: ["La couleur du profil", "Qui peut voir tes publications", "Le nombre d'abonnes", "Le fond d'ecran"],
        correctIndex: 1,
        explanation: "La visibilite des publications limite l'exposition de tes donnees personnelles.",
        points: 10
      },
      {
        id: "password",
        question: "Quelle option est la plus sure ?",
        options: ["Le meme mot de passe partout", "Une phrase de passe unique", "Ta date de naissance", "Le nom de ton ecole"],
        correctIndex: 1,
        explanation: "Une phrase longue et unique resiste mieux aux devinettes et aux fuites.",
        points: 10
      }
    ]
  },
  {
    id: "e-reputation-desinformation",
    week: 2,
    title: "E-Reputation & Desinformation",
    subtitle: "Empreinte numerique et verification",
    summary:
      "Construire une identite positive et ralentir la diffusion des fausses informations.",
    color: "#1E8449",
    icon: "globe",
    outcomes: ["Verifier une information", "Proteger sa reputation", "Reagir avec respect"],
    status: "next",
    progressPercent: 20,
    lessons: [
      lesson("empreinte", 1, "Ton empreinte numerique est permanente", "Une capture d'ecran peut survivre a la suppression d'un post.", [
        "Relire avant de publier",
        "Eviter les details personnels",
        "Penser a l'effet dans un an"
      ]),
      lesson("identite", 2, "Construire une identite numerique positive", "Ton profil peut montrer tes competences, pas seulement tes opinions.", [
        "Mettre en avant un projet",
        "Choisir une photo respectueuse",
        "Retirer un contenu ambigu"
      ]),
      lesson("verification", 3, "Verifier avant de partager", "Une rumeur utile a partager vite est souvent une rumeur a verifier d'abord.", [
        "Chercher la source originale",
        "Comparer avec un media fiable",
        "Verifier la date"
      ]),
      lesson("resister", 4, "Resister a la desinformation", "Les contenus qui provoquent peur ou colere cherchent souvent le partage rapide.", [
        "Identifier l'emotion ciblee",
        "Chercher une preuve",
        "Ne pas relayer sans contexte"
      ]),
      lesson("reagir", 5, "Reagir de maniere constructive", "Corriger publiquement peut aider, humilier peut bloquer la conversation.", [
        "Proposer une source",
        "Rester calme",
        "Signaler si le contenu est dangereux"
      ])
    ],
    quiz: [
      {
        id: "verify-date",
        question: "Pourquoi verifier la date d'une information ?",
        options: ["Pour changer la langue", "Pour savoir si le contexte est encore vrai", "Pour augmenter les likes", "Pour masquer l'auteur"],
        correctIndex: 1,
        explanation: "Une information ancienne peut etre vraie mais trompeuse dans un nouveau contexte.",
        points: 10
      }
    ]
  },
  {
    id: "online-scams-digital-safety",
    week: 3,
    title: "Online Scams & Digital Safety",
    subtitle: "Scams, phishing et aide aux victimes",
    summary:
      "Reconnaitre les arnaques courantes au Cameroun et savoir quoi faire sans paniquer.",
    color: "#B7950B",
    icon: "alert",
    outcomes: ["Reconnaitre le phishing", "Documenter les faits", "Signaler une arnaque"],
    status: "planned",
    progressPercent: 0,
    lessons: [
      lesson("scams-cameroun", 1, "Arnaques courantes au Cameroun", "Les fraudeurs utilisent souvent urgence, gain rapide ou relation de confiance.", [
        "Repere la promesse trop belle",
        "Verifie le numero ou le compte",
        "Demande un deuxieme avis"
      ]),
      lesson("phishing", 2, "Phishing, sextorsion et fraude financiere", "Ne paie jamais sous menace sans parler a un adulte ou une structure d'aide.", [
        "Garder les preuves",
        "Bloquer le contact",
        "Signaler la tentative"
      ]),
      lesson("victime", 3, "Que faire si tu es victime", "La priorite est la securite, pas la honte.", [
        "Changer le mot de passe",
        "Prevenir une personne de confiance",
        "Faire une capture des preuves"
      ]),
      lesson("aider-ami", 4, "Aider un ami victime", "Ecouter sans juger aide la victime a agir plus vite.", [
        "Rester calme",
        "Ne pas partager les preuves",
        "Accompagner vers un adulte"
      ]),
      lesson("signaler", 5, "Ou signaler les arnaques", "Un signalement utile contient date, plateforme, compte et preuves.", [
        "Noter la plateforme",
        "Ajouter le lien ou handle",
        "Decrire les faits clairement"
      ])
    ],
    quiz: [
      {
        id: "urgent-money",
        question: "Un inconnu promet un gain rapide si tu paies des frais. Que fais-tu ?",
        options: ["Je paie vite", "Je partage a mes amis", "Je verifie et j'en parle a un adulte", "J'envoie ma CNI"],
        correctIndex: 2,
        explanation: "L'urgence et les frais avant gain sont des signaux classiques de fraude.",
        points: 10
      }
    ]
  },
  {
    id: "leadership-advocacy",
    week: 4,
    title: "Leadership & Advocacy",
    subtitle: "Forum, action collective et capstone",
    summary:
      "Transformer les competences apprises en actions utiles pour sa famille, son ecole ou son quartier.",
    color: "#6C3483",
    icon: "trophy",
    outcomes: ["Animer une sensibilisation", "Signaler collectivement", "Preparer le capstone"],
    status: "planned",
    progressPercent: 0,
    lessons: [
      lesson("leader", 1, "Etre un leader numerique positif", "Un ambassadeur donne l'exemple avant de donner des conseils.", [
        "Expliquer simplement",
        "Respecter la confidentialite",
        "Agir avec constance"
      ]),
      lesson("forum", 2, "Utiliser le forum CyberAmbassador", "Le forum ne doit jamais exposer de donnees sensibles publiquement.", [
        "Masquer les noms et numeros",
        "Decrire le risque",
        "Ajouter une preuve utile"
      ]),
      lesson("collectif", 3, "Signaler collectivement", "Une action coordonnee doit rester legale, calme et documentee.", [
        "Suivre les consignes",
        "Ne pas harceler",
        "Marquer l'action faite"
      ]),
      lesson("soutenir", 4, "Soutenir les victimes", "La dignite de la personne passe avant la curiosite du groupe.", [
        "Ecouter",
        "Orienter",
        "Proteger les preuves"
      ]),
      lesson("capstone", 5, "Concevoir ton projet capstone", "Un bon projet est petit, mesurable et utile localement.", [
        "Choisir un public",
        "Definir une action",
        "Mesurer les personnes touchees"
      ])
    ],
    quiz: [
      {
        id: "forum-sensitive",
        question: "Que faut-il eviter dans un rapport forum public ?",
        options: ["Le type de menace", "La plateforme", "Un numero de telephone prive", "Une description generale"],
        correctIndex: 2,
        explanation: "Les informations sensibles ne doivent pas etre exposees dans le forum.",
        points: 10
      }
    ]
  }
];

export const cohorts: Cohort[] = [
  {
    name: "Yaounde Pilot - Juillet 2025",
    image: "/img/guard.jpg",
    description: "Cohorte onsite de 15 jeunes pour tester le programme complet en presentiel.",
    type: "onsite",
    startDate: "2025-07-14",
    maxSize: 15,
    enrolled: 12
  },
  {
    name: "Guardians",
    image: "/img/cyberpartners.jpg",
    description: "Bases et reflexes de protection contre les abus, les arnaques et les attaques.",
    type: "remote",
    startDate: "2025-08-04",
    maxSize: 100,
    enrolled: 48
  },
  {
    name: "Advocates",
    image: "/img/advocates.jpg",
    description: "Plaidoyer, sensibilisation et initiatives collectives pour une Afrique numerique plus sure.",
    type: "remote",
    startDate: "2025-09-01",
    maxSize: 100,
    enrolled: 35
  }
];

export const weeklyChallenges: WeeklyChallenge[] = [
  {
    id: "family-password-audit",
    title: "Audit familial des mots de passe",
    description: "Aide deux proches a ameliorer un mot de passe et a activer une protection supplementaire.",
    instructions: [
      "Choisir deux comptes importants avec un parent ou tuteur",
      "Verifier que le mot de passe est unique",
      "Noter ce qui a ete change sans reveler le mot de passe"
    ],
    points: 50,
    weekStart: "2025-07-14",
    deadline: "2025-07-20",
    requiresPhoto: true,
    status: "open"
  },
  {
    id: "verify-before-share",
    title: "Verifier avant de partager",
    description: "Prends une rumeur ou publication virale et montre les etapes de verification.",
    instructions: [
      "Copier le lien ou decrire la publication",
      "Comparer au moins deux sources",
      "Expliquer la decision finale a ta famille"
    ],
    points: 40,
    weekStart: "2025-07-21",
    deadline: "2025-07-27",
    requiresPhoto: false,
    status: "submitted"
  }
];

export const leaderboardEntries: LeaderboardEntry[] = [
  { rank: 1, name: "Amina N.", city: "Yaounde", level: "senior", points: 820, weeklyPoints: 120, cohort: "Yaounde Pilot - Juillet 2025" },
  { rank: 2, name: "Eric M.", city: "Douala", level: "senior", points: 760, weeklyPoints: 95, cohort: "Guardians" },
  { rank: 3, name: "Nadia T.", city: "Bafoussam", level: "junior", points: 610, weeklyPoints: 150, cohort: "Yaounde Pilot - Juillet 2025", isCurrentUser: true },
  { rank: 4, name: "Joel K.", city: "Bertoua", level: "junior", points: 540, weeklyPoints: 80, cohort: "Advocates" },
  { rank: 5, name: "Mireille F.", city: "Garoua", level: "junior", points: 470, weeklyPoints: 65, cohort: "Guardians" }
];

export const forumReports: ForumReport[] = [
  {
    id: "report-whatsapp-scholarship",
    type: "scam",
    platform: "WhatsApp",
    description: "Message promettant une bourse scolaire contre des frais d'inscription immediats.",
    target: "+237 6XX XX XX XX",
    status: "pending",
    createdAt: "2025-07-18"
  },
  {
    id: "report-fake-page",
    type: "misinformation",
    platform: "Facebook",
    description: "Page qui imite une institution et diffuse de fausses annonces de recrutement.",
    target: "facebook.com/fake-recrutement-cm",
    status: "verified",
    createdAt: "2025-07-16",
    actionInstructions: [
      "Ouvrir la page signalee",
      "Utiliser le menu Signaler",
      "Choisir fausse information ou usurpation selon l'option disponible"
    ]
  },
  {
    id: "report-tiktok-bullying",
    type: "bullying",
    platform: "TikTok",
    description: "Video de harcelement ciblee contre un eleve, deja signalee par plusieurs membres.",
    target: "@compte_masque",
    status: "actioned",
    createdAt: "2025-07-12",
    actionInstructions: ["Ne pas repartager la video", "Signaler pour harcelement", "Soutenir la victime en prive"]
  }
];

export const notifications: NotificationItem[] = [
  {
    id: "notif-level",
    type: "level_up",
    title: "Niveau senior en approche",
    body: "Termine les modules restants et quatre defis pour debloquer le niveau Senior Ambassador.",
    read: false,
    createdAt: "2025-07-18"
  },
  {
    id: "notif-forum",
    type: "forum_action",
    title: "Alerte forum verifiee",
    body: "Une page Facebook frauduleuse a ete verifiee. Consulte les consignes avant d'agir.",
    read: false,
    createdAt: "2025-07-16"
  },
  {
    id: "notif-challenge",
    type: "challenge_approved",
    title: "Defi approuve",
    body: "Ton dernier rapport a ete valide par l'equipe programme.",
    read: true,
    createdAt: "2025-07-15"
  }
];

export const parentReports: ParentReport[] = [
  {
    id: "week-2025-07-20",
    weekPeriod: "14-20 juillet 2025",
    childName: "Nadia",
    pointsEarned: 150,
    challengesCompleted: 1,
    currentRank: 3,
    level: "junior",
    message:
      "Nadia progresse bien sur les reflexes de protection. Une discussion en famille sur les mots de passe serait utile cette semaine."
  },
  {
    id: "week-2025-07-13",
    weekPeriod: "7-13 juillet 2025",
    childName: "Nadia",
    pointsEarned: 90,
    challengesCompleted: 1,
    currentRank: 5,
    level: "junior",
    message:
      "Bonne participation au demarrage. Encouragez-la a expliquer une verification d'information a la maison."
  }
];

export const capstoneSubmissions: CapstoneSubmission[] = [
  {
    id: "capstone-school-talk",
    ambassadorName: "Amina N.",
    title: "Causerie securite WhatsApp au lycee",
    actionType: "school_talk",
    reachCount: 42,
    status: "pending"
  },
  {
    id: "capstone-family-campaign",
    ambassadorName: "Eric M.",
    title: "Mini campagne mots de passe en famille",
    actionType: "whatsapp_broadcast",
    reachCount: 28,
    status: "approved"
  }
];

export const ambassadorActions: AmbassadorAction[] = [
  {
    title: "Aide",
    description: "Un jeune signale un probleme en ligne et prepare les informations utiles avant l'escalade.",
    owner: "student"
  },
  {
    title: "Temoignage",
    description: "Un incident vecu devient un retour d'experience encadre pour eviter sa repetition.",
    owner: "student"
  },
  {
    title: "Validation parentale",
    description: "Le parent suit les modules, recoit les rapports et accompagne les defis a la maison.",
    owner: "parent"
  },
  {
    title: "Animation cohorte",
    description: "L'admin suit les inscriptions, les consentements, les soumissions et les alertes forum.",
    owner: "admin"
  }
];

export function getModuleById(id: string) {
  return programModules.find((module) => module.id === id);
}

export function getLessonById(moduleId: string, lessonId: string) {
  return getModuleById(moduleId)?.lessons.find((lesson) => lesson.id === lessonId);
}

export function getReadyModuleCount() {
  return programModules.filter((module) => module.status === "ready").length;
}

export function getProgramCompletionPercent() {
  const total = programModules.reduce((sum, module) => sum + module.progressPercent, 0);
  return Math.round(total / programModules.length);
}

export function getAdminMetrics() {
  return {
    certifiedAmbassadors: leaderboardEntries.filter((entry) => entry.level !== "junior").length,
    pendingChallengeSubmissions: weeklyChallenges.filter((challenge) => challenge.status === "submitted").length,
    pendingForumReports: forumReports.filter((report) => report.status === "pending").length,
    activeCohorts: cohorts.length,
    parentAccountsLinked: 2,
    weeklyActiveUsers: 38
  };
}
