import { moduleOne } from "@/lib/curriculum/module-one";
import { moduleTwo } from "@/lib/curriculum/module-two";
import { moduleThree } from "@/lib/curriculum/module-three";
import { moduleFour } from "@/lib/curriculum/module-four";

export type ProgramModuleStatus = "ready" | "next" | "planned";

export type LessonContentBlock = {
  type: "text" | "tip" | "warning" | "checklist" | "hook" | "story" | "discovery" | "mission" | "reflection" | "ability" | "image";
  content: string | string[];
  src?: string;
  alt?: string;
  caption?: string;
};

export type ProgramLesson = {
  id: string;
  order: number;
  title: string;
  estimatedMins: number;
  content: LessonContentBlock[];
  quiz: LessonQuizQuestion;
};

export type LessonQuizQuestion = {
  id?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
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
  registrationStatus?: "available" | "registered" | "submitted" | "cooldown";
  registrationDeadline?: string | null;
  cooldownUntil?: string | null;
  submissionStatus?: "pending" | "approved" | "rejected" | null;
  reviewerNote?: string | null;
  pointsAwarded?: number;
  reviewedAt?: string | null;
  parentInvitationStatus?: "invited" | "submitted" | "approved" | "rejected" | null;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  city: string;
  level: "junior" | "senior" | "master";
  points: number;
  performanceScore?: number;
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

export const programModules: ProgramModule[] = [
  moduleOne,
  moduleTwo,
  moduleThree,
  moduleFour
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

export function getProgramCompletionPercent(modules: ProgramModule[] = programModules) {
  if (modules.length === 0) {
    return 0;
  }

  const total = modules.reduce((sum, module) => sum + module.progressPercent, 0);
  return Math.round(total / modules.length);
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
