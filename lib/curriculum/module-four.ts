import type { LessonQuizQuestion, ProgramLesson, ProgramModule } from "@/lib/program";
import { moduleFourQuiz } from "@/lib/curriculum/module-four-quiz-banks";

export type AmbassadorLessonSpec = {
  id: string;
  order: number;
  title: string;
  question: string;
  power: string;
  image: string;
  situation: string;
  evidence: string[];
  mission: string[];
  reflection: string;
  transition: string;
  quiz: LessonQuizQuestion;
};

function lessonFromSpec(spec: AmbassadorLessonSpec): ProgramLesson {
  return {
    id: spec.id,
    order: spec.order,
    title: spec.title,
    estimatedMins: spec.order === 10 ? 24 : 18,
    content: [
      { type: "hook", content: spec.question },
      { type: "story", content: spec.situation },
      { type: "image", content: spec.title, src: spec.image, alt: `CyberAmbassador en action : ${spec.title}`, caption: `Pouvoir débloqué : ${spec.power}` },
      ...spec.evidence.map((content) => ({ type: "discovery" as const, content })),
      { type: "mission", content: spec.mission },
      { type: "reflection", content: spec.reflection },
      { type: "ability", content: `Pouvoir débloqué : ${spec.power}` },
      { type: "story", content: spec.transition },
    ],
    quiz: spec.quiz,
  };
}

const identityImage = "/images/module-4/identity-and-example.jpg";
const mobilizationImage = "/images/module-4/responsible-mobilization.jpg";
const networkImage = "/images/module-4/local-network.jpg";

export const moduleFourLessonSpecs: AmbassadorLessonSpec[] = [
  {
    id: "show-the-example", order: 1, title: "Montre l'exemple avant de prendre la parole", question: "Pourquoi quelqu'un devrait-il t'écouter lorsqu'il s'agit du numérique ?", power: "Crédibilité", image: identityImage,
    situation: "Une personne insulte en commentaire, partage sans vérifier et publie les photos des autres sans permission. Le lendemain, elle donne des leçons au nom de CyberAmbassador. Son conseil peut être juste, mais ses actes rendent son message difficile à croire.",
    evidence: [
      "L'exemplarité numérique ne signifie pas être parfait. Elle consiste à appliquer honnêtement les réflexes que l'on recommande, reconnaître ses erreurs et corriger ses pratiques. La crédibilité vient de la cohérence et de l'intention.",
      "Ta réputation numérique se construit avec tes publications, mais aussi avec tes commentaires, réactions, repartages et silences. Chaque interaction peut amplifier une information utile, une humiliation ou une rumeur.",
      "Un désaccord responsable critique une idée sans attaquer la personne. Il ralentit avant de répondre, vérifie ce qui est affirmé et sait quitter une conversation qui devient violente plutôt que nourrir l'escalade.",
      "Respecter la vie privée des autres exige leur consentement avant de publier leur image ou leur histoire. Utiliser l'IA de façon responsable exige aussi de vérifier ses réponses et d'indiquer clairement quand un contenu synthétique pourrait tromper.",
      "Un ambassadeur peut dire : « Je me suis trompé, voici ce que j'ai vérifié depuis. » Cette transparence renforce davantage la confiance qu'une image artificielle de perfection.",
    ],
    mission: ["Observe tes dix dernières interactions publiques sans les modifier.", "Repère une pratique cohérente avec le rôle et une pratique à améliorer.", "Choisis un engagement concret pour les sept prochains jours."],
    reflection: "Si quelqu'un découvrait CyberAmbassador uniquement à travers ton comportement en ligne, quelle image du programme aurait-il ?",
    transition: "Ta parole possède maintenant une base : tes actes. Pour guider les autres, tu dois ensuite comprendre ce qui se cache derrière les écrans.",
    quiz: { question: "Quelle attitude construit le mieux la crédibilité d'un CyberAmbassador ?", options: ["Prétendre ne jamais se tromper", "Appliquer ses conseils, reconnaître ses erreurs et progresser", "Supprimer tout désaccord", "Partager uniquement les contenus populaires"], correctIndex: 1, explanation: "La crédibilité vient d'une pratique cohérente, transparente et perfectible, pas d'une perfection mise en scène." },
  },
  {
    id: "technology-not-magic", order: 2, title: "La technologie n'est pas de la magie", question: "Et si la technologie était beaucoup moins mystérieuse qu'elle en a l'air ?", power: "Confiance numérique", image: identityImage,
    situation: "Un message part de Yaoundé et arrive presque aussitôt à Dakar. Rien de magique : un téléphone transforme le message en données, des logiciels organisent l'envoi et une succession d'antennes, routeurs, câbles et serveurs le transporte.",
    evidence: [
      "Un smartphone réunit des éléments physiques : processeur pour calculer, mémoire pour travailler, stockage pour conserver, capteurs pour observer, antennes pour communiquer et batterie pour fournir l'énergie. Le logiciel donne des instructions à cet ensemble.",
      "Internet est un réseau de réseaux. Les appareils découpent l'information en données, les routeurs choisissent des chemins et les protocoles fixent des règles communes afin que des machines différentes puissent se comprendre.",
      "Une application comme WhatsApp associe interface, carnet de contacts, chiffrement, serveurs, notifications et connexion réseau. Certaines opérations se passent sur ton appareil; d'autres nécessitent une infrastructure distante.",
      "Un système d'IA combine machines, données, modèles mathématiques et instructions. Il produit des résultats à partir de régularités apprises : il peut donc être utile, biaisé, imprécis ou utilisé dans un contexte différent de celui prévu.",
      "Le modèle mental à retenir est : éléments physiques + données + instructions + connexions. Il n'explique pas tout, mais il transforme une boîte noire intimidante en questions que tu peux poser.",
    ],
    mission: ["Décompose l'envoi d'un message entre Yaoundé et Dakar.", "Classe les éléments trouvés en matériel, logiciel, données et connexions.", "Explique le trajet à une personne sans employer de jargon."],
    reflection: "Quelle partie de ton application préférée te semblait magique avant cette décomposition ?",
    transition: "Tu peux maintenant questionner la technologie au lieu de la subir. Il est temps de choisir le problème auquel tu veux appliquer cette confiance.",
    quiz: { question: "Quel modèle aide à casser l'impression de magie technologique ?", options: ["Popularité + vitesse", "Matériel + données + instructions + connexions", "Écran + batterie seulement", "Application + influenceur"], correctIndex: 1, explanation: "Ces quatre familles permettent de décomposer un service et de commencer à comprendre son fonctionnement." },
  },
  {
    id: "find-your-cause", order: 3, title: "Trouve ta cause", question: "Quel problème numérique te dérange suffisamment pour que tu décides d'agir ?", power: "Mission", image: identityImage,
    situation: "Arnaques, désinformation, sextorsion, cyberharcèlement, exclusion numérique, atteintes à la vie privée et mauvais usages de l'IA semblent immenses. Un ambassadeur ne choisit pas de tout résoudre : il choisit un point de départ utile autour de lui.",
    evidence: [
      "Une cause devient actionnable lorsqu'elle relie un problème précis, des personnes réellement concernées et une première amélioration observable. « Combattre les arnaques » est vaste; aider dix parents à reconnaître une fausse demande Mobile Money est concret.",
      "Les niveaux d'action progressent : ne pas partager, vérifier, informer un proche, publier une correction sourcée, alerter le réseau, puis organiser une action locale. Chaque niveau a de la valeur.",
      "Choisir une cause demande d'écouter avant de décider. Une communauté peut avoir besoin de confidentialité, d'accès, d'accompagnement ou de sécurité alors que tu imaginais un autre problème.",
      "Ta proximité est une force : tu connais la langue, les habitudes, les canaux et les personnes de confiance. Elle ne remplace pas l'expertise, mais elle aide à concevoir une réponse réaliste.",
      "Tu n'as pas besoin de pouvoir tout changer pour pouvoir agir. Une mission crédible définit ce que tu peux faire seul, ce qui demande un collectif et le soutien que Sykoti peut apporter.",
    ],
    mission: ["Nomme un problème qui touche réellement ton entourage et explique pourquoi.", "Identifie les personnes concernées et une action réalisable seul.", "Imagine une action collective et le soutien que Sykoti pourrait fournir."],
    reflection: "Quelle cause continuerais-tu à défendre même si personne ne te félicitait ?",
    transition: "Une cause silencieuse ne protège personne. Ta prochaine compétence consiste à faire voyager un message sans le déformer.",
    quiz: { question: "Quelle cause est la plus facile à transformer en action ?", options: ["Régler tous les problèmes d'Internet", "Aider dix parents du quartier à reconnaître une fausse demande Mobile Money", "Devenir célèbre en ligne", "Attendre une campagne internationale"], correctIndex: 1, explanation: "Elle précise le problème, le public et une amélioration locale réalisable." },
  },
  {
    id: "make-message-travel", order: 4, title: "Fais voyager ton message", question: "Avoir quelque chose d'important à dire suffit-il pour être entendu ?", power: "Amplification", image: mobilizationImage,
    situation: "Une nouvelle arnaque WhatsApp circule. Tes amis, les parents, ton établissement et le grand public n'ont ni les mêmes questions, ni le même vocabulaire, ni les mêmes canaux. Copier le même texte partout risque de n'aider personne.",
    evidence: [
      "Commence par QUOI : formule le fait vérifié en une phrase. Continue avec QUI : choisis un public précis. Sans ces deux décisions, un message devient vague ou s'adresse à tout le monde sans atteindre personne.",
      "POURQUOI explique le risque sans dramatiser. QUE FAIRE donne une action courte et sûre. OÙ EN SAVOIR PLUS renvoie vers une source officielle ou une ressource vérifiable.",
      "Le canal modifie la forme. Un statut doit être lisible rapidement; une vidéo de trente secondes doit accrocher puis guider; une intervention orale peut raconter une situation et répondre aux questions.",
      "Adapter n'est pas déformer. Les faits, le degré de certitude et l'action sûre restent stables, tandis que les exemples, la longueur, la langue et le ton s'ajustent au public.",
      "Avant de publier, vérifie le risque d'amplification : ton avertissement doit éviter les liens actifs dangereux, les données personnelles et les détails qui aideraient à reproduire l'arnaque.",
    ],
    mission: ["Choisis une alerte utile et vérifiée.", "Transforme-la en statut WhatsApp, message pour parents et intervention orale de deux minutes.", "Diffuse réellement une version auprès d'un public choisi et note sa réaction."],
    reflection: "Qu'as-tu changé entre les versions sans changer le fait principal ?",
    transition: "Ton message peut atteindre un public. Avec un réseau responsable, il peut maintenant traverser plusieurs communautés.",
    quiz: { question: "Quel ordre structure un message CyberAmbassador utile ?", options: ["Émotion → rumeur → partage", "Quoi → qui → pourquoi → que faire → où en savoir plus", "Plateforme → likes → abonnés", "Titre → accusation → urgence"], correctIndex: 1, explanation: "Cette formule relie un fait, un public, un enjeu, une action et une source." },
  },
  {
    id: "power-of-numbers", order: 5, title: "Le pouvoir du nombre", question: "Qu'est-ce que cent personnes peuvent accomplir qu'une seule personne ne peut pas ?", power: "Force collective", image: mobilizationImage,
    situation: "Un ambassadeur peut observer une arnaque. Un réseau peut comparer les cas, vérifier l'origine, prévenir plusieurs communautés et suivre l'évolution. Mais la force collective devient dangereuse si elle se transforme en attaque de foule.",
    evidence: [
      "Le protocole collectif commence par OBSERVER, puis VÉRIFIER et DOCUMENTER. Une émotion partagée par cent personnes ne devient pas une preuve; la coordination doit améliorer la qualité de l'information.",
      "ALERTER le Forum CyberAmbassador est pertinent lorsqu'un problème vérifié concerne plusieurs personnes ou exige des compétences et relais complémentaires. Les informations sensibles doivent être masquées.",
      "MOBILISER consiste à proposer une action proportionnée : informer, signaler par les outils officiels, orienter vers une structure compétente ou diffuser une correction. AMPLIFIER vient seulement après la vérification.",
      "SUIVRE ferme la boucle : noter qui a agi, ce qui a changé, les nouvelles copies apparues et les leçons apprises évite les doublons et permet d'évaluer l'impact.",
      "Le réseau associe Forum, autres ambassadeurs, chaîne WhatsApp, plateformes et équipe Sykoti. Il ne sert jamais à harceler, révéler une identité ou organiser des signalements simplement parce qu'un contenu déplaît.",
    ],
    mission: ["Simule un signalement au Forum avec les données personnelles masquées.", "Attribue les rôles observer, vérifier, documenter, diffuser et suivre.", "Écris une limite claire qui empêche l'action de devenir du harcèlement."],
    reflection: "À quel moment une action collective utile pourrait-elle déraper, et quel garde-fou poserais-tu ?",
    transition: "Tu connais la puissance et ses limites. La prochaine étape consiste à choisir exactement quand et comment la déclencher.",
    quiz: { question: "Quelle séquence décrit une mobilisation collective responsable ?", options: ["Accuser, attaquer, publier", "Observer, vérifier, documenter, alerter, mobiliser, amplifier, suivre", "Partager, puis vérifier", "Signaler tout désaccord"], correctIndex: 1, explanation: "Cette séquence protège la preuve, les personnes et la légitimité de l'action." },
  },
  {
    id: "mobilize-dont-react", order: 6, title: "Mobilise, ne te contente pas de réagir", question: "Comment transformer ton inquiétude en action collective utile ?", power: "Mobilisation", image: mobilizationImage,
    situation: "Une fausse bourse d'études circule massivement. Écrire « Tout le monde, signalez ça ! » ne précise ni la preuve, ni les personnes exposées, ni l'action appropriée. Une alerte structurée permet au réseau de décider sans panique.",
    evidence: [
      "PROBLÈME décrit précisément ce qui se passe. PREUVES indique les éléments vérifiables. SOURCE situe le canal et l'adresse d'origine sans exposer inutilement les victimes.",
      "PERSONNES EXPOSÉES aide à mesurer l'urgence et adapter le message. Une arnaque visant des lycéens boursiers ne se traite pas comme une menace physique immédiate ou un simple contenu trompeur.",
      "ACTION doit être proportionnée : agir seul pour une correction simple, informer Sykoti pour coordonner, mobiliser les ambassadeurs pour une diffusion étendue, utiliser le signalement officiel ou escalader vers une structure compétente.",
      "MESSAGE contient l'information vérifiée à diffuser. Il évite l'accusation non prouvée, les données privées et les appels à la vengeance; il donne une conduite sûre au public exposé.",
      "Une urgence, une menace physique, une sextorsion ou un danger pour un enfant exige rapidement un adulte de confiance et une structure compétente. Le réseau d'ambassadeurs ne remplace ni les secours ni les autorités.",
    ],
    mission: ["Structure une alerte sur une fausse bourse avec les six rubriques du protocole.", "Choisis le bon niveau : seul, Sykoti, réseau, plateforme ou structure compétente.", "Rédige le message vérifié que le réseau pourrait diffuser."],
    reflection: "Quel élément empêche le plus une réaction émotionnelle de devenir une mobilisation désordonnée ?",
    transition: "Mobiliser protège une communauté aujourd'hui. Transmettre une compétence lui permet de se protéger demain.",
    quiz: { question: "Face à une menace physique immédiate, quelle réponse est adaptée ?", options: ["Créer seulement un sondage", "Impliquer rapidement un adulte et une structure compétente", "Attendre que le message disparaisse", "Organiser des commentaires agressifs"], correctIndex: 1, explanation: "Le niveau d'escalade doit correspondre au risque; le réseau ne remplace pas les services compétents." },
  },
  {
    id: "pass-on-your-power", order: 7, title: "Transmets ton pouvoir", question: "Si tu sais faire quelque chose, peux-tu apprendre à quelqu'un d'autre à le faire ?", power: "Transmission", image: networkImage,
    situation: "Activer la double authentification à la place d'un proche le protège aujourd'hui. Lui montrer comment la retrouver, expliquer pourquoi elle compte, puis le laisser faire le rend autonome demain.",
    evidence: [
      "La méthode MONTRE → EXPLIQUE → LAISSE FAIRE → VÉRIFIE transforme une démonstration en apprentissage. Chaque étape répond à une difficulté différente : voir, comprendre, pratiquer et confirmer.",
      "Montrer signifie avancer lentement et rendre visibles les gestes. Expliquer relie chaque geste à son but sans jargon. Une personne retient mieux une raison qu'une suite de clics isolés.",
      "Laisser faire est indispensable : accepte l'hésitation, ne reprends pas immédiatement le téléphone et pose une question qui aide la personne à retrouver elle-même l'étape suivante.",
      "Vérifier ne consiste pas à piéger. Demande à la personne de recommencer, d'expliquer le réflexe avec ses mots ou de l'appliquer à un autre compte afin de confirmer son autonomie.",
      "Le kit CyberAmbassador est un équipement de terrain : guide, présentations, supports pédagogiques et ressources Sykoti servent à préparer une séance exacte, simple et réutilisable.",
    ],
    mission: ["Choisis une compétence : MFA, confidentialité, vérification d'image, signalement ou contrôle d'une réponse IA.", "Prépare une démonstration avec les quatre étapes.", "Apprends-la à une personne cette semaine et note ce qu'elle peut refaire seule."],
    reflection: "À quel moment as-tu été tenté de faire à la place de la personne ?",
    transition: "Une compétence transmise crée un nouvel allié. Plusieurs alliés peuvent devenir un mouvement local.",
    quiz: { question: "Quelle étape rend réellement l'apprenant autonome ?", options: ["Faire toutes les actions à sa place", "Le laisser faire puis vérifier qu'il peut recommencer", "Lui envoyer uniquement un long document", "Passer rapidement sur les erreurs"], correctIndex: 1, explanation: "La pratique autonome suivie d'une vérification permet de confirmer que la compétence peut être reproduite." },
  },
  {
    id: "create-local-movement", order: 8, title: "Crée ton mouvement local", question: "Et si CyberAmbassador existait aussi dans ton école, ton université ou ta communauté ?", power: "Leadership communautaire", image: networkImage,
    situation: "Trois élèves remarquent les mêmes fausses opportunités dans leur établissement. Au lieu d'actions isolées, ils proposent un petit chapitre qui tient une permanence mensuelle, partage des alertes vérifiées et forme progressivement d'autres jeunes.",
    evidence: [
      "Un chapitre local est une équipe reconnue qui sert une communauté précise. Il peut organiser sensibilisations, ateliers de confidentialité, discussions, alertes ou défis de vérification selon les besoins observés.",
      "Commence petit : une équipe fiable, un public, une activité, une date et un résultat mesurable. La régularité d'une action simple construit davantage qu'un grand lancement sans suite.",
      "Le chapitre doit définir des rôles, des règles de sécurité, un adulte ou point de contact lorsque nécessaire, et une méthode pour protéger les données des participants.",
      "Tu apportes l'initiative; Sykoti aide à la construire. L'organisation peut fournir modèles, supports, accompagnement, visibilité, connexions et conseils selon les règles et ressources disponibles.",
      "Le leadership local écoute les retours et documente l'impact : personnes touchées, compétences acquises, difficultés et prochaine amélioration. Le chapitre reste au service de sa communauté, pas de l'image de son responsable.",
    ],
    mission: ["Définis la communauté et le besoin d'un chapitre possible.", "Imagine une première activité réalisable en moins d'un mois.", "Liste l'équipe, les règles, la mesure d'impact et l'aide à demander à Sykoti."],
    reflection: "Quelle petite action régulière donnerait le plus de valeur à ta communauté ?",
    transition: "Ton mouvement possède un ancrage local. Il peut maintenant apprendre, partager et grandir grâce au réseau derrière lui.",
    quiz: { question: "Quel est le meilleur premier projet pour un chapitre local ?", options: ["Une campagne nationale sans équipe", "Une activité locale précise, sûre et mesurable", "Un compte public sans règles", "Une promesse de tout résoudre"], correctIndex: 1, explanation: "Une première action limitée et documentée permet d'apprendre, de prouver son utilité et de durer." },
  },
  {
    id: "network-behind-you", order: 9, title: "Tu as un réseau derrière toi", question: "Jusqu'où pourrais-tu aller si tu n'avais pas à tout faire seul ?", power: "Pouvoir du réseau", image: networkImage,
    situation: "Le parcours ne suit pas la logique Formation → Certificat → Fin. Il relie toi, les autres CyberAmbassadors, le Forum, les chapitres locaux, Sykoti Center, les communautés et les partenaires.",
    evidence: [
      "Un réseau existe seulement lorsque ses membres l'activent. Informe Sykoti lorsque tu organises une action, demande un support lorsque tu en as besoin et alerte le Forum lorsqu'un problème mérite une réponse partagée.",
      "Documenter un résultat transforme une réussite locale en apprentissage collectif. Décris le public, l'action, les résultats, les limites et ce que tu recommanderais à un autre ambassadeur.",
      "Demander de l'aide est une compétence de leadership. Formule le contexte, ce que tu as déjà essayé, le besoin précis et le délai; le réseau peut alors répondre plus efficacement.",
      "Le réseau apporte vérification, relais, ressources et expérience, mais chaque membre conserve sa responsabilité. Une consigne collective ne justifie jamais une action illégale, dangereuse ou contraire à la dignité.",
      "Proposer une idée signifie arriver avec un besoin observé et une première piste, puis accepter de la construire avec d'autres. La collaboration transforme une idée personnelle en capacité partagée.",
    ],
    mission: ["Choisis une action locale et écris le message qui informerait Sykoti.", "Formule une demande de support précise.", "Prépare un mini bilan partageable : action, résultat, limite, prochaine étape."],
    reflection: "Quel réflexe dois-tu développer pour activer le réseau avant de te sentir bloqué ?",
    transition: "Tu sais montrer l'exemple, comprendre, parler, mobiliser, transmettre et construire. Il reste à choisir le code qui guidera tous ces pouvoirs.",
    quiz: { question: "Quand le réseau CyberAmbassador devient-il réellement puissant ?", options: ["Quand son nom est connu", "Quand ses membres l'activent, documentent et collaborent", "Quand chacun agit seul", "Quand personne ne demande d'aide"], correctIndex: 1, explanation: "Le réseau produit de la valeur par les échanges, les demandes, les alertes et les retours d'expérience de ses membres." },
  },
  {
    id: "cyberambassador-code", order: 10, title: "Le code du CyberAmbassador", question: "Quel CyberAmbassador choisis-tu de devenir ?", power: "Identité CyberAmbassador", image: networkImage,
    situation: "Tu as commencé comme utilisateur du numérique. Tu as appris à comprendre, te protéger et enquêter. Ce dernier passage ne te demande pas de réciter un titre : il te demande de décider comment tu utiliseras tes connaissances lorsqu'elles pourront aider.",
    evidence: [
      "Un CyberAmbassador montre l'exemple dans ses usages, cherche à comprendre avant de parler et vérifie avant d'amplifier. Sa voix gagne sa valeur dans la méthode qui la précède.",
      "Il mobilise lorsque le collectif est pertinent, transmet ce qu'il sait et soutient sa communauté sans exposer les personnes. La dignité reste plus importante que la curiosité ou la visibilité.",
      "Il active son réseau plutôt que d'agir systématiquement seul, prend des initiatives réalistes et utilise l'identité CyberAmbassador avec responsabilité. Le titre n'accorde ni autorité absolue ni droit de surveiller les autres.",
      "L'engagement devient concret lorsqu'il se traduit par des habitudes : ralentir, vérifier, documenter, demander, enseigner, suivre et améliorer. Une déclaration sans pratique reste un slogan.",
      "Tu n'as pas besoin d'attendre d'être expert. Tu dois connaître tes limites, chercher l'aide appropriée et refuser de rester spectateur lorsque tes connaissances peuvent être utiles sans créer un nouveau danger.",
    ],
    mission: ["Lis à voix haute les sept engagements du code.", "Choisis celui qui te demandera le plus d'effort et explique pourquoi.", "Écris ta première action de CyberAmbassador, son public, sa date et le soutien nécessaire."],
    reflection: "Dans six mois, quel acte concret prouvera que l'identité CyberAmbassador est devenue une pratique ?",
    transition: "Identité débloquée : CYBERAMBASSADOR. Maintenant, tu peux agir — et surtout, tu n'agis pas seul.",
    quiz: { question: "Que débloque réellement la fin de ce module ?", options: ["Le droit de donner des ordres en ligne", "Une responsabilité : agir avec méthode, limites et soutien du réseau", "Une preuve que tu ne feras jamais d'erreur", "L'obligation d'agir seul"], correctIndex: 1, explanation: "L'identité CyberAmbassador est une responsabilité guidée par la méthode, la dignité, l'initiative et le collectif." },
  },
];

export const moduleFourLessonQuizBanks: Record<string, LessonQuizQuestion[]> = Object.fromEntries(
  moduleFourLessonSpecs.map((spec) => [spec.id, [spec.quiz]])
);

export const moduleFour: ProgramModule = {
  id: "leadership-advocacy",
  week: 4,
  title: "Devenir CyberAmbassador",
  subtitle: "Ton comportement, ta voix, ta communauté et le réseau Sykoti deviennent des moyens d'agir",
  summary: "Montre l'exemple, choisis ta cause, communique, mobilise, transmets et construis avec le réseau Sykoti pour rendre ta communauté plus sûre et autonome.",
  color: "#BD0F43",
  icon: "trophy",
  outcomes: ["Construire sa crédibilité", "Mobiliser avec responsabilité", "Transmettre une compétence", "Activer le réseau Sykoti"],
  status: "ready",
  progressPercent: 0,
  lessons: moduleFourLessonSpecs.map(lessonFromSpec),
  quiz: moduleFourQuiz,
};
