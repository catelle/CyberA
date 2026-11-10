export const cyberaProgramme = {
  year: 2026,
  stages: [
    { id: "onboarding", label: "Onboarding" },
    { id: "learn", label: "Learn" },
    { id: "practice", label: "Practice" },
    { id: "challenges", label: "Challenges" },
    { id: "community", label: "Community Action" },
    { id: "capstone", label: "CyberComp Final" },
    { id: "graduation", label: "Graduation" }
  ],
  calendar: [
    { date: "12 août 2026 · 10:00", title: "Opening Ceremony", detail: "Présentation du programme et du Sykoti Center, attentes, prochaines étapes et choix du nom de Fellowship.", tone: "primary" },
    { date: "Après le choix du nom", title: "Accès à CyberA", detail: "L'équipe enregistre la Fellowship et transmet l'accès à l'espace d'apprentissage personnalisé.", tone: "blue" },
    { date: "12–31 août 2026", title: "Learning Journey", detail: "4 modules, 40 leçons. Prévois environ 1 h 30 par jour d'apprentissage, à un rythme de 2–3 leçons. Aucun apprentissage obligatoire le dimanche.", tone: "blue" },
    { date: "15, 22 et 29 août · 14:00", title: "CyberA Weekly Review", detail: "Rencontre obligatoire : progression, questions, difficultés et préparation de la semaine suivante.", tone: "gold" },
    { date: "31 août–4 septembre", title: "Capstone Project", detail: "Applique tes acquis et dépose ton projet final sur la plateforme avant le vendredi 4 septembre.", tone: "blue" },
    { date: "5 septembre 2026 · Yaoundé", title: "Graduation Ceremony", detail: "Les participants validés passent de CyberA Fellow à CyberAmbassador. Les détails pratiques seront communiqués pendant le programme.", tone: "primary" }
  ]
} as const;
