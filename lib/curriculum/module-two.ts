import type { ProgramLesson, ProgramModule, QuizQuestion } from "@/lib/program";

export type SurvivalSpec = {
  id: string; order: number; title: string; mystery: string; incident: string;
  evidence: string[]; decision: string; options: string[]; correctIndex: number;
  explanation: string; response: string[]; mission: string; reflection: string; cliffhanger: string;
};

function survivalLesson(spec: SurvivalSpec): ProgramLesson {
  return {
    id: spec.id,
    order: spec.order,
    title: spec.title,
    estimatedMins: 12,
    content: [
      { type: "hook", content: spec.mystery },
      { type: "story", content: `ALERTE DE MISSION — ${spec.incident}` },
      { type: "discovery", content: "Mission Control te demande de ralentir. L'Opposant compte sur une réaction rapide; l'Investigateur cherche d'abord ce qui peut être vérifié." },
      { type: "checklist", content: spec.evidence },
      { type: "reflection", content: spec.decision },
      { type: "tip", content: spec.explanation },
      { type: "checklist", content: spec.response },
      { type: "mission", content: [spec.mission] },
      { type: "reflection", content: spec.reflection },
      { type: "ability", content: `Réflexe débloqué : ${spec.response[0]}` },
      { type: "story", content: spec.cliffhanger },
    ],
    quiz: { question: spec.decision, options: spec.options, correctIndex: spec.correctIndex, explanation: spec.explanation },
  };
}

export const moduleTwoLessonSpecs: SurvivalSpec[] = [
{
  id: "bad-guys",
  order: 1,
  title: "Qui sont les attaquants ?",

  mystery:
    "Qui se cache réellement derrière les arnaques, les comptes piratés et les attaques que l'on voit en ligne ?",

  incident:
    "Imagine plusieurs situations. Quelqu'un crée une fausse page de bourse pour récupérer de l'argent. Une autre personne cherche une faille dans un site afin d'y entrer sans autorisation. Un adolescent télécharge un outil trouvé sur Internet pour tenter de bloquer le site de son école. Ailleurs, quelqu'un appelle une victime en se faisant passer pour le service client d'une banque et lui demande son code de confirmation. Toutes ces personnes peuvent provoquer un incident numérique, mais elles n'utilisent ni les mêmes méthodes ni les mêmes compétences.",

  evidence: [
    "Bienvenue dans le monde de la cybersécurité. La cybersécurité consiste à protéger les personnes, les appareils, les comptes, les données et les systèmes numériques contre les accès non autorisés, les manipulations, les vols, les perturbations et d'autres formes de dommages.",

    "Lorsque l'on parle d'attaque numérique, on imagine souvent un expert très technique devant plusieurs écrans. Pourtant, de nombreuses attaques ne nécessitent pas de compétences informatiques extraordinaires. Certaines reposent surtout sur la tromperie, la confiance ou une mauvaise décision de la victime.",

    "Les personnes qui représentent une menace en ligne n'ont donc pas toutes le même profil. Certaines cherchent de l'argent, d'autres veulent voler des informations, accéder à un compte, espionner, se venger, tester leurs compétences ou simplement provoquer des perturbations.",

    "Commençons par un profil très courant : l'escroc en ligne, souvent appelé « scammer ». Un scammer cherche à tromper une personne afin qu'elle lui donne volontairement quelque chose : de l'argent, une information personnelle, un mot de passe, un code de connexion ou l'accès à un compte.",

    "Le mot anglais « scam » signifie simplement arnaque. Une fausse offre d'emploi, une fausse bourse, une fausse vente, une fausse urgence familiale ou un faux investissement peuvent tous être utilisés dans une arnaque.",

    "Un scammer n'a pas forcément besoin de pirater ton téléphone. S'il réussit à te convaincre de lui envoyer toi-même 20 000 FCFA ou ton code de connexion, son attaque a déjà réussi.",

    "Il existe aussi des attaquants beaucoup plus techniques. Dans le vocabulaire de la cybersécurité, on utilise souvent le terme « black hat hacker » pour désigner une personne qui utilise ses compétences informatiques sans autorisation et avec une intention malveillante.",

    "Un black hat peut par exemple rechercher une vulnérabilité dans un site, voler des données, installer un programme malveillant, prendre le contrôle d'un compte ou perturber un système.",

    "Une vulnérabilité est une faiblesse dans un logiciel, un appareil, un système ou une configuration qui peut permettre à une personne de contourner une protection ou de provoquer un comportement non prévu.",

    "Tous les hackers ne sont cependant pas des black hats. Un hacker éthique, souvent appelé « white hat », peut utiliser des techniques similaires pour rechercher des vulnérabilités, mais il le fait avec l'autorisation du propriétaire afin d'améliorer la sécurité.",

    "La différence n'est donc pas simplement l'outil utilisé. Elle dépend principalement de l'autorisation, de l'intention et de l'objectif de l'action.",

    "Entre l'expert très compétent et l'escroc se trouve un autre profil que l'on rencontre parfois : le « script kiddie ».",

    "Un script kiddie est une personne qui utilise des programmes, scripts ou outils créés par d'autres pour tenter des attaques sans forcément comprendre en profondeur leur fonctionnement.",

    "Par exemple, quelqu'un peut télécharger un outil présenté dans une vidéo ou trouvé sur un forum et l'utiliser pour essayer de perturber un site. Même avec peu de compétences techniques, cette personne peut provoquer de véritables dommages.",

    "Une attaque peut également venir de quelqu'un qui possède déjà un accès légitime. Un employé, un prestataire ou un membre d'une organisation peut utiliser son accès de manière abusive. On parle alors de menace interne ou d'« insider threat ».",

    "Mais les attaquants n'attaquent pas seulement les machines. Très souvent, ils attaquent d'abord les personnes.",

    "Imagine qu'une personne t'appelle et dise : « Bonjour, nous sommes du service Mobile Money. Une opération suspecte vient d'être détectée. Donnez-moi immédiatement le code que vous venez de recevoir afin que nous bloquions la transaction. »",

    "Aucun logiciel n'a été installé. Aucun mot de passe n'a été cassé. Pourtant, une attaque est déjà en cours.",

    "Cette technique appartient à ce que l'on appelle l'ingénierie sociale ou manipulation sociale.",

    "L'ingénierie sociale consiste à manipuler une personne afin de l'amener à accomplir une action utile à l'attaquant : cliquer sur un lien, révéler une information, envoyer de l'argent, partager un code, ouvrir un fichier ou donner accès à un compte.",

    "Les attaquants utilisent souvent des réactions humaines normales comme la peur, l'urgence, la curiosité, la confiance, l'autorité ou l'espoir d'une récompense.",

    "Un message comme « ton compte sera supprimé dans dix minutes » utilise la peur et l'urgence.",

    "Un message comme « félicitations, tu as gagné un smartphone » utilise la récompense et la curiosité.",

    "Une personne qui dit « je suis du service informatique » ou « je travaille pour ta banque » cherche à utiliser l'autorité.",

    "Un message provenant du compte d'un ami compromis exploite quant à lui la confiance que tu accordes déjà à cette personne.",

    "Les scammers utilisent énormément l'ingénierie sociale, mais ils ne sont pas les seuls. Un attaquant technique peut lui aussi commencer par manipuler une personne pour obtenir un mot de passe avant de tenter une attaque plus complexe.",

    "C'est une idée essentielle pour comprendre la cybersécurité : les faiblesses ne se trouvent pas seulement dans les ordinateurs. Les décisions humaines peuvent aussi devenir une porte d'entrée.",

    "Tu rencontreras donc différents profils dans ce module : scammers, black hats, script kiddies, personnes malveillantes à l'intérieur d'une organisation et attaquants utilisant la manipulation sociale.",

    "Tu n'as pas besoin de devenir expert en piratage pour te protéger. Ton premier pouvoir consiste simplement à reconnaître ce que quelqu'un essaie d'obtenir de toi et la méthode qu'il utilise.",

    "Face à une situation suspecte, pose-toi trois questions : Qui me contacte ? Qu'est-ce que cette personne veut que je fasse ? Qu'est-ce qu'elle pourrait gagner si je le fais ?"
  ],

  decision:
    "Une personne t'appelle en prétendant travailler pour ton service Mobile Money. Elle affirme qu'une fraude est en cours et te demande immédiatement le code reçu par SMS. Quelle technique utilise-t-elle principalement ?",

  options: [
    "Elle répare ton téléphone à distance.",
    "Elle utilise l'ingénierie sociale pour te pousser à révéler une information.",
    "Elle effectue automatiquement une mise à jour de sécurité.",
    "Elle vérifie simplement si ton numéro fonctionne."
  ],

  correctIndex: 1,

  explanation:
    "L'attaquant ne cherche pas forcément à contourner directement la sécurité technique du téléphone. Il essaie de convaincre la victime de lui donner volontairement le code. C'est le principe de l'ingénierie sociale : exploiter la confiance, la peur, l'urgence ou une autre réaction humaine afin d'obtenir une action utile à l'attaquant.",

  response: [
    "IDENTIFIE — cherche ce que la personne veut obtenir : argent, information, accès, code, fichier ou action.",

    "OBSERVE LA MÉTHODE — utilise-t-elle une technique informatique ou essaie-t-elle surtout de te manipuler ?", 

    "RALENTIS — une forte urgence, une menace ou une récompense doit te pousser à vérifier avant d'agir.",

    "VÉRIFIE — contacte l'organisation ou la personne par un autre canal officiel avant de transmettre une information sensible.",

    "PROTÈGE TES SECRETS — un mot de passe, un code de vérification ou un code de récupération ne doit pas être transmis simplement parce qu'une personne affirme représenter une organisation."
  ],

  mission:
    "Mission Investigateur : classe chaque situation. 1) Une personne crée une fausse boutique Facebook et encaisse des paiements sans livrer : scammer. 2) Une personne expérimentée entre sans autorisation dans un système pour voler une base de données : black hat. 3) Un adolescent télécharge un outil d'attaque qu'il comprend à peine et l'utilise contre le site de son école : script kiddie. 4) Un employé utilise son accès professionnel pour copier des données confidentielles : insider. 5) Une personne se fait passer pour un agent Mobile Money afin d'obtenir un code : ingénierie sociale. Pour chaque situation, identifie ce que l'attaquant veut obtenir et comment il essaie d'y parvenir.",

  reflection:
    "Parmi les profils et méthodes découverts dans cette leçon, lesquels pensais-tu nécessiter beaucoup de compétences informatiques avant aujourd'hui ?",

  cliffhanger:
    "Tu connais maintenant plusieurs personnes et méthodes qui peuvent représenter une menace. Mais avant d'attaquer, beaucoup commencent par une étape beaucoup plus discrète : ils observent leur cible. Que pourrait découvrir un attaquant sur toi sans même te parler ?"
},
{
  id: "think-like-hacker",
  order: 2,
  title: "Penser comme un attaquant",

  mystery:
    "Si tu voulais attaquer quelqu'un, quelle serait la première chose que tu ferais ?",

  incident:
    "Marie vient d'être sélectionnée pour un programme international. Quelques jours plus tard, elle reçoit un email personnalisé contenant son nom, le nom du programme, sa ville, son université et même la date limite de confirmation de sa candidature. Tout semble authentique. Pourtant, l'expéditeur est un escroc. Comment a-t-il obtenu autant d'informations ?",

  evidence: [
    "Dans les films, les attaques commencent souvent par des lignes de code qui défilent sur plusieurs écrans. Dans la réalité, beaucoup d'attaques commencent par une étape beaucoup plus simple : l'observation.",

    "Avant d'agir, un attaquant cherche généralement à comprendre sa cible. Il veut savoir qui elle est, ce qu'elle fait, quels services elle utilise et quelles informations sont accessibles publiquement.",

    "Cette phase est appelée la reconnaissance. Elle consiste à collecter des informations avant de lancer une attaque.",

    "La reconnaissance peut être passive ou active.",

    "La reconnaissance passive consiste à rechercher des informations déjà disponibles sans interagir directement avec la cible.",

    "Un profil Facebook, une biographie Instagram, un compte LinkedIn, une photo publiée sur WhatsApp, un commentaire sur TikTok ou une ancienne publication peuvent déjà fournir beaucoup d'informations.",

    "La reconnaissance active implique davantage d'interactions. Une personne peut par exemple visiter un site, tester un formulaire, envoyer un message ou chercher à obtenir davantage d'informations directement auprès de sa cible.",

    "Les attaquants recherchent souvent des informations personnelles comme le nom, l'âge, l'établissement scolaire, le lieu de travail, les centres d'intérêt, les habitudes, les proches ou les événements importants de la vie d'une personne.",

    "Une seule information semble rarement dangereuse. C'est leur combinaison qui devient intéressante.",

    "Une photo prise devant une maison peut révéler un quartier. Une publication peut révéler une université. Un commentaire peut révéler un centre d'intérêt. Ensemble, ces éléments permettent de construire un profil beaucoup plus précis.",

    "Cette technique est parfois appelée OSINT, pour Open Source Intelligence.",

    "L'OSINT consiste à collecter des informations accessibles publiquement afin de mieux comprendre une personne, une organisation ou une situation.",

    "Les journalistes, les chercheurs et les professionnels de la cybersécurité utilisent également l'OSINT. Ce n'est donc pas une activité illégale en soi.",

    "Tout dépend de l'objectif poursuivi.",

    "Un attaquant peut utiliser les informations collectées pour créer une attaque plus convaincante.",

    "Une fausse offre d'emploi sera beaucoup plus crédible si elle mentionne ton domaine d'études.",

    "Une fausse bourse semblera plus réaliste si elle utilise le nom d'un programme auquel tu as réellement candidaté.",

    "Une tentative d'hameçonnage sera plus efficace si elle reprend des informations que tu as toi-même publiées.",

    "Les photos méritent une attention particulière. Elles peuvent parfois révéler des informations sans que tu t'en rendes compte.",

    "Un uniforme, un badge, un ordinateur, une plaque d'immatriculation, un document posé sur une table ou un tableau affiché à l'arrière-plan peuvent fournir des indices importants.",

    "Les attaquants ne s'intéressent pas uniquement aux informations visibles. Ils cherchent aussi à comprendre les habitudes.",

    "À quelle heure es-tu généralement en ligne ? Quels jours es-tu le plus actif ? Quels réseaux sociaux utilises-tu le plus ?",

    "Ces informations permettent parfois d'identifier le meilleur moment pour envoyer un message frauduleux.",

    "Réduire sa présence numérique n'est pas l'objectif de cette leçon.",

    "L'objectif est de comprendre que tout ce qui est partagé en ligne contribue à construire une identité numérique.",

    "Penser comme un attaquant ne signifie pas apprendre à attaquer. Cela signifie apprendre à observer ce qu'un attaquant pourrait voir afin de mieux se protéger.",

    "Un excellent exercice consiste à visiter son propre profil comme si l'on découvrait une personne inconnue pour la première fois.",

    "Quelles informations apparaissent immédiatement ? Lesquelles pourraient être utilisées pour créer une attaque personnalisée ?",

    "La meilleure défense commence souvent par une simple question : qu'est-ce qu'un inconnu peut déjà apprendre sur moi ?"
  ],

  decision:
    "Tu consultes le profil d'une personne et tu découvres son école, sa date d'anniversaire, sa ville, son adresse email et plusieurs publications concernant sa recherche de bourses. Quelle serait l'utilisation la plus probable de ces informations par un attaquant ?",

  options: [
    "Créer une attaque plus personnalisée.",
    "Améliorer automatiquement la sécurité du compte.",
    "Accélérer la connexion Internet.",
    "Modifier le téléphone de la victime à distance."
  ],

  correctIndex: 0,

  explanation:
    "Les attaques personnalisées sont souvent plus efficaces parce qu'elles s'appuient sur des informations réelles. Plus un message semble correspondre à la situation d'une personne, plus il risque d'être perçu comme légitime.",

  response: [
    "OBSERVE TES PROPRES PROFILS — regarde ce qu'une personne inconnue peut découvrir en quelques minutes.",

    "LIMITE LES INFORMATIONS PUBLIQUES — certaines données n'ont pas besoin d'être accessibles à tout le monde.",

    "ANALYSE TES PHOTOS — vérifie ce qui apparaît à l'arrière-plan avant de publier.",

    "VÉRIFIE TES PARAMÈTRES DE CONFIDENTIALITÉ — détermine quelles informations sont visibles publiquement.",

    "PENSE COMME UN ENQUÊTEUR — demande-toi régulièrement comment une information pourrait être utilisée contre toi."
  ],

  mission:
    "Mission Investigateur : choisis l'un de tes profils publics ou imagine le profil d'une personne fictive. Pendant dix minutes, note toutes les informations qu'un inconnu pourrait découvrir. Classe-les en trois catégories : informations personnelles, habitudes et centres d'intérêt. Identifie ensuite trois informations qui pourraient être utilisées pour créer une attaque personnalisée.",

  reflection:
    "Quelle information présente sur tes réseaux sociaux t'a le plus surpris lorsque tu l'as observée du point de vue d'un attaquant ?",

  cliffhanger:
    "Un attaquant possède maintenant suffisamment d'informations pour préparer son piège. Mais comment peut-il te convaincre d'agir exactement comme il le souhaite ? Prochaine mission : comprendre les techniques de manipulation sociale."
},
{
  id: "social-engineering",
  order: 3,
  title: "Manipulation sociale",

  mystery:
    "Pourquoi des personnes intelligentes tombent-elles encore dans des arnaques qu'elles connaissent déjà ?",

  incident:
    "Tu es en train d'étudier lorsqu'un message apparaît sur ton téléphone : « URGENT : une activité inhabituelle a été détectée sur ton compte. Si tu ne confirmes pas ton identité dans les 15 prochaines minutes, ton compte sera suspendu. » Quelques secondes plus tard, un deuxième message apparaît : « Un code vient d'être envoyé sur ton téléphone. Réponds rapidement pour éviter la désactivation de ton compte. » Ton cœur s'accélère. Tu hésites. Dois-tu agir immédiatement ?",

  evidence: [
    "Beaucoup de personnes pensent que les cyberattaques ciblent principalement les ordinateurs. Pourtant, les attaquants s'intéressent souvent davantage aux êtres humains.",

    "Les ordinateurs suivent des règles. Les êtres humains prennent des décisions. C'est précisément cette capacité à prendre des décisions que les attaquants cherchent parfois à exploiter.",

    "La manipulation sociale, également appelée ingénierie sociale, consiste à influencer une personne afin qu'elle réalise volontairement une action utile à l'attaquant.",

    "L'objectif peut être d'obtenir de l'argent, des informations personnelles, un mot de passe, un code de vérification ou l'accès à un compte.",

    "Contrairement à certaines attaques techniques, l'ingénierie sociale ne nécessite pas toujours l'utilisation d'un logiciel complexe.",

    "L'attaquant cherche avant tout à comprendre comment une personne réagit face à certaines émotions.",

    "La peur est l'une des techniques les plus utilisées. Un message comme « ton compte va être supprimé » cherche à provoquer une réaction rapide avant que la victime ne prenne le temps de réfléchir.",

    "L'urgence fonctionne de manière similaire. Des expressions comme « immédiatement », « dernières places disponibles » ou « offre valable pendant une heure » cherchent à réduire le temps consacré à la vérification.",

    "La curiosité constitue un autre levier puissant. Un message comme « regarde cette photo » ou « quelqu'un parle de toi » peut pousser une personne à cliquer sans réfléchir.",

    "La récompense est également très efficace. Une promesse de cadeau, d'argent ou de bourse peut diminuer la vigilance.",

    "Les attaquants exploitent aussi l'autorité. Une personne qui prétend représenter une banque, une administration, un établissement scolaire ou une entreprise inspire souvent davantage de confiance.",

    "La confiance est probablement le levier le plus puissant. Nous sommes naturellement plus enclins à croire une personne que nous connaissons déjà.",

    "C'est pourquoi certains attaquants cherchent à prendre le contrôle des comptes de proches. Un message envoyé depuis le compte d'un ami paraît souvent plus crédible qu'un message provenant d'un inconnu.",

    "L'ingénierie sociale peut prendre plusieurs formes.",

    "Le phishing consiste à se faire passer pour une organisation ou une personne de confiance afin d'obtenir des informations sensibles.",

    "Le smishing est une forme de phishing réalisée par SMS.",

    "Le vishing est une attaque qui utilise un appel téléphonique pour manipuler la victime.",

    "Le baiting, ou technique de l'appât, consiste à attirer une personne grâce à une promesse ou à un avantage.",

    "Le pretexting consiste à inventer une histoire crédible afin d'obtenir des informations ou un accès.",

    "Même les professionnels expérimentés peuvent être victimes de manipulation sociale. Cette attaque ne cible pas l'intelligence. Elle cible les émotions.",

    "Un sentiment d'urgence doit toujours devenir un signal d'alerte.",

    "Lorsqu'un message provoque une émotion forte, il est préférable de ralentir avant d'agir.",

    "Un code de vérification ne doit jamais être communiqué simplement parce qu'une personne affirme travailler pour une organisation.",

    "Une demande inhabituelle mérite toujours une vérification indépendante.",

    "La meilleure défense contre la manipulation sociale consiste à reprendre le contrôle du rythme de la conversation.",

    "Un attaquant veut que tu réagisses rapidement. Un citoyen numérique responsable prend le temps de vérifier.",

    "Avant d'agir, pose-toi trois questions : qui me contacte ? Que veut cette personne ? Pourquoi veut-elle que j'agisse immédiatement ?"
  ],

  decision:
    "Tu reçois un appel d'une personne qui prétend travailler pour ton opérateur Mobile Money. Elle t'explique qu'une transaction suspecte est en cours et te demande immédiatement le code que tu viens de recevoir par SMS. Quelle est la meilleure réaction ?",

  options: [
    "Communiquer le code afin de protéger le compte.",
    "Mettre fin à l'appel et contacter directement le service client officiel.",
    "Envoyer uniquement les quatre premiers chiffres.",
    "Demander davantage d'explications avant d'envoyer le code."
  ],

  correctIndex: 1,

  explanation:
    "Une organisation légitime ne te demandera généralement pas de communiquer un code de vérification destiné à protéger ton compte. La meilleure solution consiste à interrompre la conversation et à contacter directement le service officiel par un numéro connu.",

  response: [
    "RALENTIS — ne prends jamais une décision importante sous la pression.",

    "IDENTIFIE L'ÉMOTION — demande-toi si le message cherche à provoquer la peur, l'urgence, la curiosité, la récompense, l'autorité ou la confiance.",

    "VÉRIFIE — contacte directement l'organisation concernée en utilisant un numéro ou un site officiel.",

    "PROTÈGE TES CODES — un mot de passe ou un code de vérification ne doit jamais être partagé.",

    "PRENDS DU RECUL — lorsqu'une situation semble urgente, accorde-toi quelques minutes avant d'agir."
  ],

  mission:
    "Mission Investigateur : retrouve trois messages reçus récemment sur ton téléphone ou imagine trois exemples réalistes. Pour chaque message, identifie l'émotion utilisée : peur, urgence, curiosité, récompense, autorité ou confiance. Explique ensuite comment tu pourrais vérifier la demande sans utiliser le lien ou le numéro fourni dans le message.",

  reflection:
    "Parmi les six leviers étudiés dans cette leçon, lequel aurait le plus de chances d'influencer tes décisions ?",

  cliffhanger:
    "La manipulation sociale permet souvent d'amener une victime à cliquer sur un lien. Mais comment reconnaître un faux site lorsqu'il ressemble parfaitement au vrai ? Prochaine mission : enquêter sur le phishing et les sites frauduleux."
},
{
  id: "fake-websites",
  order: 5,
  title: "Fake Websites / Faux sites",

  mystery:
    "Si deux sites se ressemblent parfaitement, comment savoir lequel est le vrai ?",

  incident:
    "Amina reçoit un message sur WhatsApp : « Félicitations ! Votre candidature a été retenue pour une bourse internationale. Veuillez confirmer votre inscription avant minuit. » Le message contient un lien. Lorsqu'elle l'ouvre, elle découvre une page très professionnelle : le logo est correct, les couleurs semblent officielles et plusieurs témoignages d'anciens bénéficiaires apparaissent. Le site lui demande simplement de créer un compte et de payer 5 000 FCFA de frais administratifs. Tout semble normal. Pourtant, le site a été créé par des escrocs.",

  evidence: [
    "Internet contient des milliards de pages. Certaines appartiennent à des organisations légitimes. D'autres ont été créées pour tromper les visiteurs.",

    "Un faux site est une page conçue pour imiter un site réel afin d'inciter une personne à révéler des informations, effectuer un paiement ou télécharger un fichier.",

    "L'objectif d'un faux site n'est pas toujours de voler de l'argent immédiatement. Certains cherchent d'abord à collecter des informations personnelles comme un numéro de téléphone, une adresse électronique, un mot de passe ou une pièce d'identité.",

    "Les faux sites sont souvent utilisés dans des attaques appelées phishing, ou hameçonnage en français.",

    "Le phishing consiste à se faire passer pour une organisation ou une personne de confiance afin d'obtenir des informations ou de pousser la victime à accomplir une action particulière.",

    "Les attaquants choisissent souvent des marques connues parce qu'elles inspirent déjà la confiance : banques, universités, opérateurs téléphoniques, plateformes de paiement, services publics ou organisations internationales.",

    "La première erreur consiste souvent à juger un site uniquement en fonction de son apparence.",

    "Aujourd'hui, copier l'apparence d'un site est relativement simple. Les logos peuvent être téléchargés. Les couleurs peuvent être reproduites. Les photographies peuvent être copiées.",

    "Un site très professionnel peut donc être totalement frauduleux.",

    "L'un des premiers éléments à vérifier est l'adresse du site.",

    "L'adresse affichée dans le navigateur est appelée une URL. Elle indique l'emplacement exact d'une page sur Internet.",

    "Au centre de cette adresse se trouve le nom de domaine. C'est l'un des éléments les plus importants à examiner.",

    "Un attaquant peut modifier une seule lettre pour créer une fausse adresse très proche de l'originale.",

    "Par exemple, une personne peut facilement confondre deux adresses qui se ressemblent presque parfaitement lorsqu'elle les consulte rapidement.",

    "Une autre technique consiste à ajouter des mots supplémentaires afin de rendre l'adresse plus crédible.",

    "Les attaquants utilisent également la pression du temps. Des expressions comme « dernière chance », « aujourd'hui uniquement » ou « votre compte sera supprimé » sont souvent utilisées pour accélérer la décision.",

    "Un autre indice important concerne les demandes inhabituelles.",

    "Pourquoi une université demanderait-elle un paiement immédiat avant même d'avoir confirmé officiellement une candidature ?",

    "Pourquoi une banque demanderait-elle un mot de passe par email ?",

    "Pourquoi un opérateur téléphonique demanderait-il un code de vérification sur une page accessible à n'importe qui ?",

    "Lorsqu'une demande semble inhabituelle, il faut toujours chercher une confirmation indépendante.",

    "Une confirmation indépendante consiste à quitter le site et à utiliser un autre moyen pour vérifier l'information.",

    "Par exemple, au lieu d'utiliser le lien reçu dans un message, tu peux ouvrir directement l'application officielle ou rechercher toi-même le site sur Internet.",

    "Un cadenas apparaît parfois à côté de l'adresse d'un site. Ce symbole indique généralement que les informations échangées entre ton appareil et le site sont protégées pendant leur transmission.",

    "Beaucoup de personnes pensent que la présence du cadenas garantit automatiquement la fiabilité du site. Ce n'est pas le cas.",

    "Un site frauduleux peut lui aussi afficher un cadenas.",

    "Le cadenas protège la communication. Il ne garantit pas les intentions du propriétaire du site.",

    "Les avis en ligne doivent également être examinés avec prudence.",

    "Les commentaires positifs peuvent être copiés, inventés ou publiés par de faux comptes.",

    "Une réduction exceptionnelle doit aussi attirer ton attention. Une offre trop avantageuse peut être utilisée pour attirer un grand nombre de victimes en très peu de temps.",

    "Les sites de commerce électronique, les offres d'emploi, les bourses d'études et les services financiers sont particulièrement visés parce qu'ils impliquent souvent des paiements ou le partage d'informations personnelles.",

    "Avant d'envoyer un document, d'effectuer un paiement ou de saisir un mot de passe, il est préférable de prendre quelques minutes pour vérifier l'identité du site.",

    "Un faux site cherche à te faire agir rapidement. Un citoyen numérique responsable prend le temps d'enquêter.",

    "En cybersécurité, une règle simple peut t'éviter de nombreux problèmes : ne fais jamais confiance à une page uniquement parce qu'elle est belle."
  ],

  decision:
    "Tu reçois un message annonçant une bourse internationale. Le site semble professionnel, mais il demande immédiatement une copie de ta pièce d'identité et un paiement par Mobile Money. Quelle est la meilleure réaction ?",

  options: [
    "Payer immédiatement pour ne pas perdre l'opportunité.",
    "Envoyer uniquement les documents et attendre avant de payer.",
    "Quitter la page et vérifier l'information directement auprès de l'organisation officielle.",
    "Demander à un ami de visiter le site à ta place."
  ],

  correctIndex: 2,

  explanation:
    "La meilleure solution consiste à vérifier l'information auprès d'une source indépendante. Il ne faut pas utiliser uniquement les informations présentes sur le site lui-même. Une recherche sur les canaux officiels permet souvent d'identifier rapidement une tentative de fraude.",

  response: [
    "OBSERVE L'ADRESSE — ne te contente pas du logo ou du design du site.",

    "RALENTIS — la pression du temps est souvent utilisée pour réduire la vigilance.",

    "VÉRIFIE LES DEMANDES — un paiement inhabituel ou une demande excessive d'informations personnelles doit attirer ton attention.",

    "UTILISE UNE SOURCE INDÉPENDANTE — ouvre l'application officielle ou recherche toi-même le site.",

    "NE PARTAGE PAS TES INFORMATIONS IMMÉDIATEMENT — prends le temps d'analyser la situation avant d'agir."
  ],

  mission:
    "Mission Investigateur : choisis trois sites que tu utilises régulièrement. Observe leur adresse et identifie leur nom de domaine. Ensuite, imagine qu'un inconnu t'envoie un lien vers une bourse, une boutique en ligne ou un service Mobile Money. Établis une liste de cinq éléments que tu vérifierais avant de faire confiance au site.",

  reflection:
    "Parmi tous les éléments étudiés aujourd'hui, lequel utiliseras-tu désormais en priorité pour vérifier un site ?",

  cliffhanger:
    "Les attaquants ne créent pas seulement de faux sites. Ils exploitent aussi la confiance que nous accordons aux personnes qui nous entourent. Prochaine mission : comprendre comment les comptes WhatsApp sont utilisés dans les arnaques numériques."
},
{
  id: "whatsapp-scams",
  order: 6,
  title: "WhatsApp Scams / Les arnaques sur WhatsApp",

  mystery:
    "Comment une simple conversation avec un ami peut-elle se transformer en une arnaque ?",

  incident:
    "Il est 21 heures. Tu reçois un message WhatsApp d'un ami : « Salut. J'ai un problème. J'ai besoin de 20 000 FCFA. Je te rembourse demain. » Quelques minutes plus tard, il t'envoie un autre message : « Je vais recevoir un code par SMS. Transmets-le-moi rapidement. » Tout semble normal. Tu reconnais sa photo, son numéro et vos anciennes conversations. Pourtant, quelque chose ne va pas.",

  evidence: [
    "WhatsApp est l'une des applications les plus utilisées au monde. Nous l'utilisons pour discuter avec notre famille, nos amis, nos collègues, nos enseignants et nos groupes de travail.",

    "Cette proximité crée un sentiment de confiance. Nous avons naturellement tendance à croire les personnes que nous connaissons.",

    "Les attaquants ont compris que la confiance est parfois plus facile à exploiter qu'une faille informatique.",

    "Une arnaque sur WhatsApp est une tentative de tromper une personne afin d'obtenir de l'argent, des informations personnelles, un code de sécurité ou l'accès à un compte.",

    "Les arnaques sur WhatsApp reposent rarement sur des compétences techniques avancées.",

    "La plupart du temps, elles utilisent la manipulation sociale.",

    "La manipulation sociale consiste à influencer une personne pour qu'elle accomplisse volontairement une action qui profite à l'attaquant.",

    "Les escrocs utilisent généralement six émotions : la confiance, l'urgence, la peur, la curiosité, la récompense et la compassion.",

    "L'une des arnaques les plus fréquentes consiste à se faire passer pour un proche.",

    "Un attaquant peut prendre le contrôle du compte d'une personne et utiliser son identité pour contacter ses amis ou sa famille.",

    "Le compte conserve généralement la même photo, le même numéro et l'historique des conversations.",

    "C'est pourquoi de nombreuses victimes ne remarquent pas immédiatement la fraude.",

    "Une autre arnaque très répandue concerne les codes de vérification.",

    "Un code de vérification est un code temporaire envoyé pour confirmer l'identité du propriétaire d'un compte.",

    "Ce code protège le compte. Il ne doit jamais être partagé.",

    "Un attaquant peut inventer différentes histoires pour obtenir ce code.",

    "Il peut prétendre avoir commis une erreur.",

    "Il peut demander un service.",

    "Il peut affirmer qu'une opération urgente est en cours.",

    "Une autre catégorie d'arnaques concerne les fausses opportunités.",

    "Les groupes WhatsApp diffusent parfois de fausses offres d'emploi, de fausses bourses, de faux concours ou de fausses promotions.",

    "Les escrocs savent que les opportunités attirent rapidement l'attention.",

    "Ils utilisent donc des phrases comme : « Dernières places disponibles », « Offre valable aujourd'hui uniquement » ou « Réponse obligatoire avant minuit ».",

    "Les faux investissements circulent également sur WhatsApp.",

    "Une personne peut partager des captures d'écran montrant des bénéfices impressionnants et encourager d'autres personnes à investir.",

    "L'objectif est souvent de convaincre la victime d'envoyer de l'argent vers une plateforme frauduleuse.",

    "Les liens constituent un autre danger important.",

    "Un lien peut rediriger vers un faux site conçu pour voler un mot de passe ou des informations personnelles.",

    "L'apparence professionnelle d'une page ne garantit pas sa légitimité.",

    "Les fichiers joints méritent également une attention particulière.",

    "Une facture, un document PDF, une photographie ou une vidéo peuvent parfois être utilisés pour piéger une victime.",

    "Les messages transférés automatiquement doivent aussi être examinés avec prudence.",

    "Le fait qu'un message ait été partagé par plusieurs personnes ne prouve pas qu'il est vrai.",

    "Une information répétée des centaines de fois peut rester totalement fausse.",

    "Le meilleur moyen de vérifier une information consiste à utiliser une autre source.",

    "Si un proche demande de l'argent, appelle-le.",

    "Si une organisation t'envoie un lien, consulte directement son site officiel.",

    "Si une offre semble trop belle pour être vraie, prends le temps de la vérifier.",

    "En cybersécurité, la confiance ne remplace jamais la vérification.",

    "Un message WhatsApp doit toujours être analysé en fonction de trois questions.",

    "Qui m'écrit ?",

    "Que me demande cette personne ?",

    "Que risque-t-il de se passer si j'agis immédiatement ?"
  ],

  decision:
    "Tu reçois un message WhatsApp provenant du compte d'un proche. Il te demande d'envoyer rapidement de l'argent et de lui transmettre un code reçu par SMS. Quelle est la meilleure réaction ?",

  options: [
    "Envoyer l'argent pour l'aider.",
    "Transmettre uniquement le code.",
    "L'appeler directement pour vérifier sa demande.",
    "Demander davantage d'explications dans la conversation."
  ],

  correctIndex: 2,

  explanation:
    "L'appel téléphonique permet d'effectuer une vérification indépendante. Répondre directement dans la conversation n'est pas suffisant, car le compte peut être contrôlé par un attaquant.",

  response: [
    "NE PARTAGE JAMAIS TES CODES DE VÉRIFICATION.",

    "VÉRIFIE LES DEMANDES D'ARGENT PAR UN AUTRE MOYEN.",

    "ANALYSE LES LIENS AVANT DE CLIQUER.",

    "MÉFIE-TOI DES OFFRES TROP ATTRACTIVES.",

    "RALENTIS LORSQU'UNE SITUATION SEMBLE URGENTE."
  ],

  mission:
    "Mission Détective : retrouve trois conversations récentes sur WhatsApp. Sans lire leur contenu, identifie les éléments qui te donnent confiance : la photo, le numéro, les groupes communs ou l'historique des échanges. Demande-toi ensuite lesquels de ces éléments pourraient être imités par un attaquant.",

  reflection:
    "Si tu recevais aujourd'hui un message urgent provenant du compte d'un ami, comment vérifierais-tu son identité ?",

  cliffhanger:
    "Les escrocs ne se cachent pas uniquement dans les applications de messagerie. Ils créent aussi de fausses opportunités capables d'attirer des milliers de personnes. Prochaine mission : apprendre à reconnaître les fausses offres d'emploi, les fausses bourses et les fausses formations."
},{
  id: "whatsapp-scams",
  order: 6,
  title: "WhatsApp Scams / Les arnaques sur WhatsApp",

  mystery:
    "Pourquoi autant d'arnaques circulent-elles sur WhatsApp alors que les messages sont chiffrés et que nous discutons principalement avec des personnes que nous connaissons ?",

  incident:
    "Il est 20 h 15. Tu reçois un message d'un ami : « Salut. J'ai un problème. Je suis bloqué et j'ai besoin de 25 000 FCFA. Je te rembourse demain. » Quelques minutes plus tard, un autre message arrive : « Je vais recevoir un code par SMS. Transfère-le-moi rapidement. » Tu reconnais son numéro, sa photo et votre ancienne conversation. Tout semble normal. Pourtant, ce n'est plus ton ami qui contrôle le compte.",

  evidence: [
    "WhatsApp est l'une des applications les plus utilisées au monde. Elle permet d'échanger des messages, des photos, des vidéos, des documents et des messages vocaux en quelques secondes.",

    "Nous utilisons souvent WhatsApp pour communiquer avec notre famille, nos amis, nos collègues, nos enseignants et nos groupes d'études.",

    "Cette proximité explique pourquoi les escrocs s'intéressent particulièrement à cette application.",

    "Une arnaque sur WhatsApp est une tentative de tromper une personne en utilisant l'application pour obtenir de l'argent, des informations personnelles, un code de sécurité ou l'accès à un compte.",

    "Les attaquants exploitent principalement un élément très puissant : la confiance.",

    "Nous avons naturellement tendance à croire un message lorsqu'il provient d'un numéro que nous connaissons.",

    "Pourtant, un numéro de téléphone ne constitue pas une preuve absolue d'identité.",

    "L'une des arnaques les plus fréquentes consiste à prendre le contrôle du compte d'une victime afin d'utiliser son identité pour contacter ses proches.",

    "Lorsqu'un compte n'est plus contrôlé uniquement par son véritable propriétaire, on dit qu'il est compromis.",

    "Un compte compromis conserve généralement le nom, la photo de profil et l'historique des conversations. Ces éléments rendent l'arnaque beaucoup plus crédible.",

    "Les codes de vérification jouent un rôle important dans de nombreuses attaques sur WhatsApp.",

    "Un code de vérification est un code temporaire envoyé afin de confirmer qu'une personne est bien autorisée à accéder à un compte.",

    "Ce code est une mesure de sécurité. Il ne doit jamais être partagé avec une autre personne.",

    "Un attaquant peut tenter d'obtenir ce code en inventant une histoire convaincante : problème technique, erreur de manipulation, urgence familiale ou aide temporaire.",

    "Une autre technique très répandue consiste à demander de l'argent en se faisant passer pour un proche.",

    "L'attaquant profite du fait que la victime n'a pas le temps de vérifier l'information.",

    "Les groupes WhatsApp sont également utilisés pour diffuser des arnaques.",

    "Les fausses bourses, les fausses offres d'emploi, les faux investissements et les fausses promotions circulent souvent dans des groupes très fréquentés.",

    "Le fait qu'une information soit publiée dans un groupe ne signifie pas qu'elle a été vérifiée.",

    "Les liens reçus sur WhatsApp méritent toujours une attention particulière.",

    "Un lien peut conduire vers un faux site conçu pour récupérer un mot de passe, des informations personnelles ou un paiement.",

    "Les messages qui promettent des cadeaux exceptionnels, des téléphones gratuits ou des opportunités garanties doivent également être examinés avec prudence.",

    "L'urgence constitue un autre signal d'alerte important.",

    "Des expressions comme « immédiatement », « dernière chance », « aujourd'hui seulement » ou « réponds dans les dix prochaines minutes » cherchent souvent à accélérer la décision.",

    "Un bon réflexe consiste à interrompre la conversation et à vérifier l'information par un autre moyen.",

    "Appeler directement la personne, utiliser un autre numéro ou contacter l'organisation concernée permet souvent d'identifier rapidement une tentative d'arnaque.",

    "Répondre au message suspect n'est pas une vérification indépendante, car l'attaquant contrôle peut-être déjà la conversation.",

    "La confidentialité des messages ne suffit donc pas à éliminer les risques.",

    "La technologie peut protéger le contenu des échanges, mais elle ne peut pas empêcher une personne de faire confiance au mauvais interlocuteur.",

    "Sur WhatsApp, la sécurité dépend autant des outils que des décisions prises par les utilisateurs.",

    "La meilleure question à se poser est toujours la même : comment puis-je vérifier que la personne avec laquelle je discute est réellement celle qu'elle prétend être ?"
  ],

  decision:
    "Tu reçois un message provenant du compte d'un ami qui te demande d'envoyer de l'argent et de partager un code de vérification. Quelle est la meilleure réaction ?",

  options: [
    "Envoyer immédiatement l'argent pour l'aider.",
    "Transmettre le code, mais pas l'argent.",
    "Appeler directement ton ami ou utiliser un autre moyen pour vérifier la demande.",
    "Demander davantage d'explications dans la conversation WhatsApp."
  ],

  correctIndex: 2,

  explanation:
    "Lorsqu'une demande inhabituelle concerne de l'argent, un code ou des informations personnelles, il faut toujours effectuer une vérification indépendante. Appeler directement la personne permet souvent de confirmer si le compte est réellement contrôlé par son propriétaire.",

  response: [
    "NE PARTAGE JAMAIS UN CODE DE VÉRIFICATION — ce code protège ton compte.",

    "MÉFIE-TOI DES DEMANDES D'ARGENT INHABITUELLES — même lorsqu'elles proviennent d'un proche.",

    "VÉRIFIE PAR UN AUTRE MOYEN — appelle la personne ou contacte directement l'organisation concernée.",

    "ANALYSE LES LIENS AVANT DE CLIQUER — un lien reçu sur WhatsApp peut conduire vers un faux site.",

    "PRENDS TON TEMPS — les attaquants utilisent souvent l'urgence pour empêcher la réflexion."
  ],

  mission:
    "Mission Investigateur : ouvre l'une de tes conversations WhatsApp. Sans consulter le contenu privé des messages, identifie tous les éléments qui te permettent d'avoir confiance dans ton interlocuteur : numéro, photo, historique des échanges, groupes communs ou autre. Demande-toi ensuite lesquels de ces éléments pourraient être imités ou utilisés par une personne malveillante.",

  reflection:
    "Si tu recevais aujourd'hui une demande urgente provenant du compte d'un proche, comment vérifierais-tu son identité avant d'agir ?",

  cliffhanger:
    "Les attaques ne ciblent pas uniquement les applications de messagerie. Elles ciblent aussi les informations personnelles que nous partageons chaque jour. Prochaine mission : découvrir comment les fausses offres d'emploi et les fausses bourses sont utilisées pour voler des données."
},
{
  id: "fake-opportunities",
  order: 7,
  title: "Fake Opportunities / Les fausses opportunités",

  mystery:
    "Comment distinguer une véritable opportunité d'une opportunité créée pour voler ton argent ou tes informations ?",

  incident:
    "Pauline découvre une annonce sur les réseaux sociaux : « 500 bourses entièrement financées pour des étudiants africains. Aucun niveau d'anglais requis. Allocation mensuelle garantie. Les candidatures ferment aujourd'hui à minuit. » Le message contient un lien vers un formulaire. On lui demande son CV, une copie de sa carte d'identité, son relevé bancaire et des frais administratifs de 10 000 FCFA à payer par Mobile Money. L'organisation semble connue. Plusieurs personnes ont déjà partagé la publication. Faut-il lui faire confiance ?",

  evidence: [
    "Internet a considérablement facilité l'accès aux opportunités. Aujourd'hui, il est possible de trouver un emploi, une formation, une bourse, un stage ou un programme international en quelques minutes.",

    "Malheureusement, cette facilité attire également des personnes malveillantes qui créent de fausses opportunités pour tromper leurs victimes.",

    "Une fausse opportunité est une offre créée pour obtenir un avantage illégitime, comme de l'argent, des informations personnelles ou l'accès à des comptes.",

    "Les jeunes constituent une cible privilégiée parce qu'ils recherchent souvent des opportunités de formation, d'emploi, de mobilité internationale ou de financement.",

    "Les attaquants savent que la peur de manquer une opportunité peut pousser une personne à agir rapidement.",

    "Ils utilisent donc souvent l'urgence pour réduire le temps consacré à la vérification.",

    "Des expressions comme « dernières places disponibles », « réponse obligatoire aujourd'hui » ou « l'offre expire dans quelques heures » doivent attirer ton attention.",

    "Les fausses opportunités ne concernent pas uniquement les bourses d'études.",

    "Les escrocs créent également de fausses offres d'emploi, de faux stages, de fausses formations, de faux concours et de faux programmes d'investissement.",

    "Leur objectif n'est pas toujours d'obtenir de l'argent immédiatement.",

    "Dans certains cas, ils cherchent avant tout à collecter des informations personnelles.",

    "Une information personnelle est une information qui permet d'identifier directement ou indirectement une personne.",

    "Ton nom, ton numéro de téléphone, ton adresse électronique, ta date de naissance, ton adresse, ta photographie ou ton numéro de pièce d'identité sont des informations personnelles.",

    "Le CV mérite une attention particulière.",

    "Un CV contient souvent des informations sur ton parcours académique, tes expériences, tes compétences, ton adresse électronique et parfois même ton numéro de téléphone ou ton adresse.",

    "Entre les mains d'une personne malveillante, ces informations peuvent être utilisées pour créer des attaques beaucoup plus crédibles.",

    "L'utilisation des informations d'une autre personne afin de se faire passer pour elle est appelée l'usurpation d'identité.",

    "Les documents d'identité sont particulièrement sensibles.",

    "Une copie de carte nationale d'identité, un passeport ou un relevé bancaire ne devraient jamais être envoyés sans avoir vérifié la légitimité de la demande.",

    "Le logo d'une organisation ne constitue pas une preuve d'authenticité.",

    "Les logos sont faciles à copier et peuvent être utilisés pour donner une apparence officielle à une annonce frauduleuse.",

    "Le nombre de partages ne constitue pas non plus une preuve.",

    "Une publication très populaire peut être totalement fausse.",

    "Avant de transmettre des informations personnelles, il faut toujours rechercher la source officielle de l'opportunité.",

    "La première question à se poser est simple : cette opportunité apparaît-elle sur les canaux officiels de l'organisation ?",

    "Un canal officiel peut être un site web institutionnel, un compte vérifié sur les réseaux sociaux ou une communication publiée directement par l'organisation.",

    "La deuxième question concerne les demandes formulées dans l'annonce.",

    "Une organisation légitime a-t-elle réellement besoin de ces informations à cette étape du processus ?",

    "La troisième question concerne le paiement.",

    "Pourquoi une bourse entièrement financée demanderait-elle des frais administratifs obligatoires avant même d'avoir terminé la sélection des candidats ?",

    "Le paiement par Mobile Money est fréquemment utilisé dans certaines arnaques parce qu'il permet de transférer rapidement de l'argent.",

    "Un autre principe important est celui de la minimisation des données.",

    "La minimisation des données consiste à partager uniquement les informations strictement nécessaires à une situation donnée.",

    "Il n'est pas toujours nécessaire d'envoyer immédiatement l'ensemble de ses documents personnels.",

    "Une véritable opportunité peut nécessiter des documents. Une demande de documents n'est donc pas automatiquement une arnaque.",

    "C'est la combinaison de plusieurs indices qui doit attirer ton attention : l'urgence, le paiement inhabituel, les demandes excessives d'informations, l'absence de source officielle ou les incohérences dans la communication.",

    "Un citoyen numérique responsable ne cherche pas uniquement à trouver des opportunités. Il apprend également à les vérifier."
  ],

  decision:
    "Tu découvres une offre de bourse sur un groupe WhatsApp. Elle demande une copie de ta pièce d'identité, un relevé bancaire et un paiement de 10 000 FCFA avant minuit. Quelle est la meilleure réaction ?",

  options: [
    "Envoyer immédiatement les documents afin de ne pas perdre l'opportunité.",
    "Payer uniquement les frais administratifs.",
    "Vérifier l'offre directement auprès des canaux officiels de l'organisation avant de partager des informations.",
    "Demander à un ami d'envoyer les documents à ta place."
  ],

  correctIndex: 2,

  explanation:
    "Une vérification indépendante constitue toujours la meilleure solution. Les informations personnelles et les documents d'identité ne doivent jamais être transmis simplement parce qu'une publication semble crédible.",

  response: [
    "RECHERCHE LA SOURCE OFFICIELLE — vérifie que l'opportunité apparaît sur les canaux officiels de l'organisation.",

    "ANALYSE LES DEMANDES — demande-toi pourquoi certaines informations sont nécessaires.",

    "MÉFIE-TOI DE L'URGENCE — les escrocs utilisent souvent la pression du temps.",

    "PROTÈGE TES DOCUMENTS — ne partage pas immédiatement tes pièces d'identité ou tes informations bancaires.",

    "APPLIQUE LE PRINCIPE DE MINIMISATION — partage uniquement les informations réellement nécessaires."
  ],

  mission:
    "Mission Investigateur : choisis une véritable offre d'emploi, une bourse ou une formation publiée en ligne. Identifie son site officiel. Compare ensuite cette publication avec une annonce partagée sur un réseau social. Observe les différences : source, informations demandées, documents exigés, modalités de paiement et coordonnées de contact.",

  reflection:
    "Quelles informations présentes dans ton CV ou tes documents personnels te sembleraient les plus sensibles si elles étaient utilisées par une autre personne ?",

  cliffhanger:
    "Les attaquants ne cherchent pas seulement à voler des informations. Certains essaient aussi de prendre le contrôle de tes appareils et de tes comptes. Prochaine mission : protéger ton téléphone, ta première ligne de défense numérique."
},
{
  id: "romance-investment-scams",
  order: 8,
  title: "Romance & Investment Scams / Les arnaques sentimentales et les faux investissements",

  mystery:
    "Pourquoi certaines personnes sont-elles victimes d'arnaques qui durent plusieurs mois ?",

  incident:
    "Il y a six mois, Éric a rencontré une jeune femme sur Instagram. Au fil des semaines, ils ont commencé à échanger quotidiennement. Ils parlaient de leurs projets, de leurs études et de leur avenir. Un jour, elle lui explique qu'elle gagne beaucoup d'argent grâce à une plateforme d'investissement en ligne. Elle lui montre des captures d'écran impressionnantes et lui propose d'essayer. Éric investit une petite somme. Quelques jours plus tard, son compte affiche déjà des bénéfices. Encouragé, il décide d'investir davantage. Quelques semaines plus tard, il découvre qu'il ne peut plus retirer son argent et que la personne avec laquelle il discutait a disparu.",

  evidence: [
    "Toutes les arnaques ne se ressemblent pas.",

    "Certaines attaques cherchent à obtenir un résultat immédiat. D'autres prennent du temps et reposent sur la construction progressive d'une relation.",

    "Les arnaques sentimentales sont des fraudes dans lesquelles une personne crée une relation affective dans le but d'obtenir un avantage.",

    "Cet avantage peut être financier, mais il peut aussi s'agir d'informations personnelles, de photographies, de documents ou d'un accès à certains comptes.",

    "La victime ne rencontre généralement jamais la personne en face à face.",

    "Les réseaux sociaux, les applications de messagerie et les plateformes de rencontre facilitent les échanges entre des personnes vivant dans des villes ou des pays différents.",

    "Les escrocs profitent de cette situation pour créer de fausses identités.",

    "Une fausse identité peut être construite à partir de photographies volées, d'informations inventées ou d'éléments copiés sur le profil d'une autre personne.",

    "Les arnaques sentimentales ne commencent presque jamais par une demande d'argent.",

    "L'attaquant cherche d'abord à gagner la confiance de sa victime.",

    "Il s'intéresse à ses centres d'intérêt, à ses difficultés et à ses projets.",

    "Il peut envoyer des messages tous les jours, se montrer attentif et créer un sentiment de proximité.",

    "La confiance constitue l'un des outils les plus puissants utilisés dans ce type d'attaque.",

    "Après plusieurs semaines ou plusieurs mois, une demande apparaît progressivement.",

    "Cette demande peut concerner un problème de santé, un billet d'avion, une urgence familiale, des frais administratifs ou une opportunité d'investissement.",

    "Les faux investissements sont souvent associés à ce type d'arnaque.",

    "Un investissement consiste normalement à utiliser une ressource, généralement de l'argent, dans l'espoir d'obtenir un bénéfice futur.",

    "Les plateformes d'investissement légitimes existent réellement. Le problème est que les escrocs créent parfois de fausses plateformes qui imitent les vraies.",

    "Ces plateformes affichent parfois des graphiques, des tableaux et des bénéfices fictifs afin de convaincre les victimes que leur argent est en train d'augmenter.",

    "Certaines permettent même d'effectuer un premier retrait pour renforcer la confiance.",

    "Une fois la victime convaincue, les demandes d'investissement deviennent plus importantes.",

    "Des phrases comme « investis maintenant », « occasion exceptionnelle » ou « cette offre disparaîtra demain » sont souvent utilisées pour créer un sentiment d'urgence.",

    "Les promesses de bénéfices rapides doivent toujours attirer ton attention.",

    "En finance, les rendements élevés sont généralement associés à un niveau de risque plus important.",

    "Une promesse qui garantit des bénéfices importants sans aucun risque mérite donc une vérification approfondie.",

    "Un autre signal d'alerte concerne le secret.",

    "Les escrocs demandent parfois aux victimes de ne parler de leur relation ou de leur investissement à personne.",

    "L'isolement réduit les possibilités de recevoir un avis extérieur.",

    "Lorsqu'une personne te demande de cacher une opportunité financière à tes proches, il est préférable de prendre du recul.",

    "La durée d'une relation ne constitue pas une preuve d'authenticité.",

    "Un échange quotidien pendant plusieurs mois ne garantit pas que la personne est honnête.",

    "Avant d'investir, il est important de vérifier l'existence de la plateforme, l'identité de l'entreprise et les conditions de retrait des fonds.",

    "Il ne faut jamais prendre une décision financière importante sous l'influence d'une relation affective.",

    "Demander l'avis d'une personne de confiance est souvent l'une des meilleures protections.",

    "Les émotions peuvent influencer nos décisions. Reconnaître cette réalité ne signifie pas être faible. Cela signifie simplement être humain.",

    "En cybersécurité, la confiance est une valeur importante. Mais elle doit toujours être accompagnée d'une vérification."
  ],

  decision:
    "Une personne que tu connais uniquement en ligne te recommande une plateforme d'investissement qu'elle utilise depuis plusieurs semaines. Elle te montre des captures d'écran présentant des bénéfices importants et t'encourage à investir rapidement. Quelle est la meilleure réaction ?",

  options: [
    "Investir une petite somme pour tester la plateforme.",
    "Investir rapidement avant que l'opportunité ne disparaisse.",
    "Vérifier indépendamment l'existence de la plateforme et demander un avis extérieur avant toute décision.",
    "Demander davantage de captures d'écran."
  ],

  correctIndex: 2,

  explanation:
    "Une relation de confiance ne remplace pas une vérification indépendante. Les captures d'écran peuvent être manipulées et une plateforme peut être entièrement contrôlée par des escrocs. Toute décision financière importante mérite une analyse approfondie.",

  response: [
    "VÉRIFIE L'IDENTITÉ — ne considère pas un profil en ligne comme une preuve suffisante.",

    "MÉFIE-TOI DES PROMESSES EXCEPTIONNELLES — les bénéfices rapides et garantis doivent attirer ton attention.",

    "REFUSE LES DÉCISIONS PRISES SOUS PRESSION — les investissements importants ne devraient jamais être réalisés dans l'urgence.",

    "DEMANDE UN AVIS EXTÉRIEUR — parler à une personne de confiance peut permettre d'identifier des incohérences.",

    "NE GARDE PAS LE SECRET — l'isolement est l'un des principaux outils utilisés dans ce type d'arnaque."
  ],

  mission:
    "Mission Investigateur : imagine qu'un proche te présente une opportunité d'investissement exceptionnelle. Établis une liste de cinq éléments que tu vérifierais avant d'investir. Ensuite, identifie trois signaux d'alerte qui pourraient indiquer une tentative d'arnaque.",

  reflection:
    "Pourquoi est-il parfois plus difficile de reconnaître une arnaque lorsqu'une relation de confiance ou des émotions sont impliquées ?",

  cliffhanger:
    "Les attaquants ne cherchent pas seulement à obtenir ton argent. Ils peuvent aussi essayer de prendre le contrôle de ton appareil. Prochaine mission : découvrir comment protéger ton téléphone et ton espace numérique."
},
{
  id: "protect-phone",
  order: 10,
  title: "Protect Your Phone / Protège ton téléphone",

  mystery:
    "Si quelqu'un prenait ton téléphone pendant seulement cinq minutes, à combien d'informations importantes pourrait-il accéder ?",

  incident:
    "Pendant les cours, Kevin prête son téléphone à un ami pour passer un appel. Quelques minutes plus tard, il remarque qu'une nouvelle application a été installée. En rentrant chez lui, il découvre également que plusieurs photos ont été partagées automatiquement sur le cloud. Plus tard, il apprend que son téléphone n'a pas été mis à jour depuis plus de six mois. Son téléphone semblait fonctionner normalement, mais était-il réellement protégé ?",

  evidence: [
    "Lorsque nous parlons de cybersécurité, nous pensons souvent aux réseaux sociaux, aux mots de passe ou aux ordinateurs. Pourtant, le premier appareil à protéger est généralement celui que nous utilisons le plus : notre téléphone.",

    "Aujourd'hui, un smartphone contient bien plus qu'une liste de contacts.",

    "Il peut contenir des conversations privées, des photos, des vidéos, des documents, des informations bancaires, des comptes de réseaux sociaux, des applications professionnelles et des données personnelles.",

    "Ton téléphone est devenu une extension de ton identité numérique.",

    "Protéger son téléphone revient donc à protéger une partie importante de sa vie.",

    "La première ligne de défense est le verrouillage de l'écran.",

    "Le verrouillage permet d'empêcher une personne non autorisée d'accéder directement à l'appareil.",

    "Plusieurs méthodes existent : le code PIN, le mot de passe, le schéma de déverrouillage, l'empreinte digitale et la reconnaissance faciale.",

    "Toutes les méthodes n'offrent pas le même niveau de protection.",

    "Un code comme 1234, 0000 ou une date d'anniversaire est facile à deviner.",

    "Un téléphone verrouillé reste beaucoup plus difficile à utiliser pour une personne qui le trouve ou le vole.",

    "La deuxième ligne de défense concerne les applications.",

    "Une application est un programme installé sur un appareil afin d'accomplir une tâche précise.",

    "Certaines applications demandent des autorisations particulières pour fonctionner.",

    "Une autorisation est un droit accordé à une application pour accéder à certaines ressources du téléphone.",

    "Par exemple, une application de navigation a besoin d'accéder à la localisation pour afficher un itinéraire.",

    "Une application de messagerie peut avoir besoin d'accéder aux contacts pour identifier les personnes avec lesquelles tu communiques.",

    "Toutes les demandes d'autorisation ne sont cependant pas toujours justifiées.",

    "Pourquoi une application de lampe torche aurait-elle besoin d'accéder à ton microphone ou à ta liste de contacts ?",

    "Examiner régulièrement les autorisations accordées aux applications permet de mieux contrôler les informations auxquelles elles ont accès.",

    "La troisième ligne de défense concerne les mises à jour.",

    "Un logiciel n'est jamais parfait.",

    "Des erreurs peuvent être découvertes après sa publication.",

    "Certaines de ces erreurs peuvent affecter la sécurité.",

    "Une vulnérabilité est une faiblesse qui peut être exploitée pour provoquer un problème de sécurité.",

    "Les développeurs publient régulièrement des mises à jour pour corriger ces vulnérabilités.",

    "Reporter systématiquement les mises à jour peut donc augmenter les risques.",

    "Les applications doivent également être téléchargées avec prudence.",

    "Les boutiques officielles comme Google Play ou l'App Store mettent en place certains mécanismes de vérification.",

    "Cela ne signifie pas que toutes les applications disponibles sont parfaitement sûres.",

    "Il reste important d'observer le nombre de téléchargements, les avis, le nom du développeur et les autorisations demandées.",

    "Le stockage des informations mérite également une attention particulière.",

    "Une sauvegarde est une copie des données conservée dans un autre emplacement.",

    "Les sauvegardes permettent de récupérer des informations après la perte, le vol ou la réinitialisation d'un appareil.",

    "Sans sauvegarde, certaines données peuvent disparaître définitivement.",

    "La connexion aux réseaux Wi-Fi publics demande aussi de la prudence.",

    "Un réseau Wi-Fi public est un réseau accessible à plusieurs personnes dans un lieu partagé comme un restaurant, un hôtel, une université ou un aéroport.",

    "Tous les réseaux publics ne sont pas dangereux.",

    "Cependant, il est préférable d'éviter certaines activités sensibles, comme les opérations bancaires ou les achats importants, sur des réseaux dont l'origine est inconnue.",

    "La sécurité physique du téléphone est également importante.",

    "Laisser son téléphone déverrouillé sur une table ou le prêter sans surveillance augmente les risques d'accès non autorisés.",

    "Un smartphone protégé combine plusieurs mesures : un verrouillage efficace, des applications fiables, des mises à jour régulières, des autorisations contrôlées et des sauvegardes adaptées.",

    "La cybersécurité ne consiste pas uniquement à réagir après un problème.",

    "Elle consiste aussi à adopter des habitudes qui réduisent les risques avant qu'un incident ne se produise.",

    "Ton téléphone est ton espace numérique personnel. Le protéger devrait devenir un réflexe quotidien."
  ],

  decision:
    "Tu télécharges une nouvelle application qui demande l'accès à ton microphone, à tes contacts, à ta localisation et à tes photos. Quelle est la meilleure réaction ?",

  options: [
    "Accepter immédiatement toutes les autorisations.",
    "Refuser systématiquement toutes les autorisations.",
    "Analyser les autorisations demandées et vérifier si elles sont réellement nécessaires au fonctionnement de l'application.",
    "Supprimer immédiatement l'application."
  ],

  correctIndex: 2,

  explanation:
    "Une autorisation n'est pas automatiquement dangereuse. Certaines sont indispensables au fonctionnement d'une application. Il est cependant important de vérifier que les accès demandés sont cohérents avec les fonctionnalités proposées.",

  response: [
    "VERROUILLE TON TÉLÉPHONE — utilise une méthode de protection adaptée.",

    "METS TES APPLICATIONS À JOUR — les mises à jour corrigent souvent des vulnérabilités.",

    "VÉRIFIE LES AUTORISATIONS — accorde uniquement les accès nécessaires.",

    "SAUVEGARDE TES DONNÉES — une copie peut être précieuse en cas de perte ou de vol.",

    "TÉLÉCHARGE AVEC PRUDENCE — privilégie les sources officielles."
  ],

  mission:
    "Mission Investigateur : examine ton téléphone pendant dix minutes. Vérifie la méthode de verrouillage utilisée, identifie trois applications et observe les autorisations qui leur ont été accordées. Vérifie ensuite si une mise à jour du système ou d'une application est disponible. Enfin, détermine si tes données importantes sont sauvegardées.",

  reflection:
    "Si ton téléphone disparaissait aujourd'hui, quelles informations seraient les plus difficiles à récupérer ?",

  cliffhanger:
    "Protéger un appareil est essentiel, mais certaines menaces ne ciblent ni les téléphones ni les comptes. Elles cherchent à manipuler l'information elle-même. Prochaine mission : comprendre comment l'intelligence artificielle transforme notre manière de vérifier ce que nous voyons en ligne."
},
{
  id: "passwords-mfa",
  order: 9,
  title: "Passwords & MFA / Les mots de passe et l'authentification",

  mystery:
    "Comment une fuite sur un petit site que tu n'utilises presque plus peut-elle permettre à quelqu'un d'accéder à ton compte WhatsApp, Instagram ou à ton adresse électronique ?",

  incident:
    "Kevin utilise le même mot de passe depuis plusieurs années. Il l'utilise pour Facebook, Instagram, son adresse électronique, une plateforme d'apprentissage et une ancienne boutique en ligne. Un jour, cette boutique est victime d'une fuite de données. Kevin n'est pas inquiet. Il n'utilise presque plus ce site. Quelques jours plus tard, il ne peut plus accéder à son compte Instagram. Son mot de passe a été modifié.",

  evidence: [
    "Chaque jour, nous utilisons des dizaines de services numériques : réseaux sociaux, messageries, plateformes d'apprentissage, services bancaires, boutiques en ligne et applications mobiles.",

    "La plupart de ces services doivent s'assurer qu'ils communiquent bien avec la bonne personne.",

    "Pour vérifier l'identité d'un utilisateur, ils utilisent généralement un système d'authentification.",

    "L'authentification est simplement le processus qui permet de vérifier qu'une personne est bien celle qu'elle prétend être.",

    "Le mot de passe est la méthode d'authentification la plus répandue.",

    "Un mot de passe est un secret connu uniquement par l'utilisateur et utilisé pour accéder à un compte.",

    "Pendant longtemps, les mots de passe étaient considérés comme une protection suffisante.",

    "Aujourd'hui, cette protection montre certaines limites.",

    "Le premier problème concerne la réutilisation des mots de passe.",

    "Par facilité, de nombreuses personnes utilisent le même mot de passe sur plusieurs plateformes.",

    "Cette habitude semble pratique, mais elle crée un risque important.",

    "Si un seul service est compromis, tous les autres comptes utilisant le même mot de passe peuvent également être menacés.",

    "Lorsqu'une organisation perd le contrôle de certaines informations à la suite d'une erreur ou d'une attaque, on parle de fuite de données.",

    "Une fuite de données peut exposer des adresses électroniques, des noms d'utilisateur, des numéros de téléphone et parfois des mots de passe.",

    "Les attaquants savent que de nombreuses personnes réutilisent leurs mots de passe.",

    "Ils essaient donc souvent les mêmes identifiants sur plusieurs plateformes différentes.",

    "Un deuxième problème concerne la qualité du mot de passe.",

    "Des mots de passe comme 123456, password, azerty ou une date de naissance sont faciles à deviner.",

    "Plus un mot de passe est prévisible, plus il devient vulnérable.",

    "Créer un mot de passe différent pour chaque service peut cependant sembler difficile.",

    "C'est pourquoi certaines personnes utilisent un gestionnaire de mots de passe.",

    "Un gestionnaire de mots de passe est un outil capable de générer, d'enregistrer et d'organiser plusieurs mots de passe différents.",

    "Même un mot de passe fort peut être volé.",

    "Les attaques par phishing, les logiciels malveillants ou les fuites de données peuvent permettre à un attaquant d'obtenir ce secret.",

    "Les spécialistes de la sécurité ont donc développé une protection supplémentaire appelée authentification multifactorielle.",

    "L'authentification multifactorielle est souvent abrégée sous le sigle MFA, qui signifie Multi-Factor Authentication.",

    "Le principe est simple : une seule preuve d'identité ne suffit plus.",

    "Le système demande une deuxième preuve avant d'autoriser la connexion.",

    "Cette deuxième preuve peut prendre différentes formes.",

    "Il peut s'agir d'un code envoyé par SMS.",

    "Il peut également s'agir d'une notification envoyée sur un autre appareil.",

    "Certaines applications génèrent des codes temporaires qui changent régulièrement.",

    "D'autres systèmes utilisent une clé physique ou une validation biométrique comme l'empreinte digitale.",

    "L'objectif est toujours le même : empêcher une personne d'accéder au compte même si elle connaît le mot de passe.",

    "Les codes de vérification utilisés par la MFA sont personnels.",

    "Une banque, un réseau social ou un service de messagerie ne devrait jamais te demander de transmettre ce code à une autre personne.",

    "Une nouvelle technologie appelée passkey commence également à se développer.",

    "Une passkey est une méthode d'authentification qui remplace progressivement les mots de passe sur certains services.",

    "Au lieu de mémoriser un secret, l'utilisateur confirme son identité grâce à son appareil et à une méthode de déverrouillage déjà configurée, comme une empreinte digitale ou un code PIN.",

    "L'objectif est de réduire les risques liés aux mots de passe oubliés, réutilisés ou saisis sur de faux sites.",

    "Tous les comptes n'ont pas la même importance.",

    "Ton adresse électronique mérite une attention particulière.",

    "Dans de nombreux cas, l'adresse électronique permet de réinitialiser les mots de passe d'autres services.",

    "Si quelqu'un contrôle ton adresse électronique, il peut parfois récupérer plusieurs autres comptes.",

    "La sécurité ne dépend pas d'une seule solution.",

    "Un mot de passe unique, associé à une deuxième méthode d'authentification et à une vérification régulière des paramètres de sécurité, offre généralement une meilleure protection.",

    "L'objectif n'est pas de mémoriser des dizaines de caractères complexes.",

    "L'objectif est d'adopter des habitudes qui limitent les conséquences lorsqu'un incident se produit.",

    "En cybersécurité, il ne faut jamais supposer qu'un compte est protégé simplement parce qu'il possède un mot de passe."
  ],

  decision:
    "Tu découvres qu'un site sur lequel tu possèdes un ancien compte a subi une fuite de données. Tu utilises le même mot de passe sur plusieurs plateformes. Quelle est la meilleure réaction ?",

  options: [
    "Attendre pour voir si un problème apparaît.",
    "Changer uniquement le mot de passe du site concerné.",
    "Modifier les mots de passe des comptes utilisant la même combinaison et activer une protection supplémentaire lorsque c'est possible.",
    "Supprimer uniquement l'historique du navigateur."
  ],

  correctIndex: 2,

  explanation:
    "La réutilisation d'un mot de passe augmente les conséquences d'une fuite de données. Modifier les mots de passe des comptes concernés et activer une deuxième méthode d'authentification permet de réduire les risques.",

  response: [
    "UTILISE DES MOTS DE PASSE UNIQUES — un même mot de passe ne devrait pas protéger plusieurs comptes.",

    "PROTÈGE TON ADRESSE ÉLECTRONIQUE — elle permet souvent de récupérer d'autres comptes.",

    "ACTIVE LA MFA LORSQU'ELLE EST DISPONIBLE — une deuxième preuve d'identité renforce la sécurité.",

    "NE COMMUNIQUE JAMAIS TES CODES DE VÉRIFICATION — ils sont personnels.",

    "VÉRIFIE RÉGULIÈREMENT TES COMPTES — la sécurité est une habitude, pas une action ponctuelle."
  ],

  mission:
    "Mission Investigateur : identifie les cinq comptes numériques les plus importants pour toi. Vérifie lesquels utilisent un mot de passe différent. Observe ensuite quels services proposent une authentification en deux étapes. Sans partager d'informations personnelles, établis un plan pour renforcer la protection de tes comptes les plus importants.",

  reflection:
    "Si tu perdais aujourd'hui l'accès à ton adresse électronique principale, quelles seraient les conséquences pour tes autres comptes ?",

  cliffhanger:
    "Même les comptes les mieux protégés ne sont pas les seules cibles des attaquants. Les informations peuvent aussi être manipulées. Comment distinguer une information fiable d'un contenu créé pour tromper ? Prochaine mission : l'IA, les fausses informations et les deepfakes."
},
{
  id: "fake-news-ai",
  order: 11,
  title: "Fake News & AI / Les fausses informations et l'intelligence artificielle",

  mystery:
    "Si une vidéo semble réelle, si des milliers de personnes la partagent et si elle apparaît partout sur les réseaux sociaux, est-elle forcément vraie ?",

  incident:
    "Un samedi matin, une vidéo commence à circuler dans plusieurs groupes WhatsApp. On y voit une personnalité publique annoncer une nouvelle mesure qui provoque immédiatement de nombreuses réactions. En quelques heures, la vidéo est relayée sur Facebook, TikTok et Instagram. Certains affirment qu'il s'agit d'une vidéo authentique. D'autres pensent qu'elle a été créée par intelligence artificielle. Comment savoir qui a raison ?",

  evidence: [
    "Nous recevons chaque jour une quantité impressionnante d'informations. Messages, vidéos, publications, commentaires, articles et contenus générés par l'intelligence artificielle circulent en permanence sur nos écrans.",

    "Face à cette abondance d'informations, il devient parfois difficile de distinguer ce qui est vrai, faux ou trompeur.",

    "Une information inexacte n'est pas toujours diffusée avec une mauvaise intention.",

    "Une personne peut partager une information erronée parce qu'elle pense sincèrement qu'elle est vraie.",

    "On parle alors de mésinformation.",

    "La désinformation est différente.",

    "La désinformation consiste à créer ou à diffuser délibérément une information fausse dans le but d'influencer, de manipuler ou de tromper d'autres personnes.",

    "Les fausses informations ne sont pas apparues avec Internet.",

    "Cependant, les réseaux sociaux ont considérablement accéléré leur diffusion.",

    "Aujourd'hui, une publication peut atteindre des milliers de personnes en quelques minutes.",

    "Les algorithmes des plateformes jouent également un rôle important.",

    "Les contenus qui provoquent de fortes réactions sont souvent davantage partagés.",

    "La colère, la peur, l'indignation et la surprise augmentent parfois la visibilité d'une publication.",

    "C'est précisément pour cette raison que certains contenus sont conçus pour provoquer une réaction émotionnelle immédiate.",

    "Une capture d'écran est-elle une preuve ? Pas nécessairement.",

    "Une photographie est-elle une preuve ? Pas toujours.",

    "Une vidéo est-elle une preuve ? Plus forcément.",

    "L'intelligence artificielle transforme notre manière de créer du contenu.",

    "L'intelligence artificielle est un ensemble de technologies capables d'accomplir certaines tâches qui nécessitent habituellement des capacités humaines, comme comprendre un texte, reconnaître une image ou produire du contenu.",

    "L'intelligence artificielle générative est capable de créer de nouveaux contenus comme des textes, des images, des sons ou des vidéos.",

    "Des outils comme ChatGPT, Gemini, Claude ou Copilot peuvent générer du texte.",

    "D'autres outils peuvent créer des images réalistes à partir d'une simple description.",

    "Il existe également des technologies capables d'imiter une voix humaine ou de modifier le visage d'une personne dans une vidéo.",

    "Un deepfake est un contenu audio ou vidéo créé ou modifié grâce à l'intelligence artificielle afin d'imiter l'apparence ou la voix d'une personne.",

    "Les deepfakes ne sont pas toujours utilisés dans un but malveillant.",

    "Ils peuvent être utilisés dans le cinéma, l'éducation ou la création artistique.",

    "Le problème apparaît lorsqu'ils sont utilisés pour manipuler l'opinion publique, diffuser de fausses informations, usurper une identité ou nuire à une personne.",

    "Il n'existe pas de méthode infaillible permettant d'identifier un contenu généré par l'intelligence artificielle.",

    "La meilleure stratégie consiste à adopter une démarche de vérification.",

    "La première question à se poser est : quelle est la source de cette information ?",

    "Une source est l'origine d'une information.",

    "Cette source est-elle identifiable ?",

    "Est-elle reconnue ?",

    "Est-elle capable de confirmer ce qu'elle affirme ?",

    "La deuxième question concerne la date.",

    "Une ancienne photographie peut être réutilisée pour illustrer un événement récent.",

    "Une vidéo enregistrée plusieurs années auparavant peut être sortie de son contexte.",

    "La troisième question concerne le contexte.",

    "Une phrase coupée ou une image recadrée peuvent modifier complètement le sens d'un message.",

    "La quatrième question concerne la confirmation.",

    "D'autres sources indépendantes rapportent-elles la même information ?",

    "Un partage massif ne constitue pas une preuve.",

    "Un grand nombre de commentaires ne constitue pas une preuve.",

    "Le nombre de mentions « J'aime » ne constitue pas une preuve.",

    "La popularité d'un contenu indique uniquement qu'il circule beaucoup.",

    "La vérification est devenue une compétence essentielle du citoyen numérique.",

    "L'objectif n'est pas de douter de tout.",

    "L'objectif est d'apprendre à vérifier avant de croire et avant de partager.",

    "Dans un environnement où les outils capables de créer des contenus réalistes deviennent de plus en plus accessibles, ralentir avant de réagir est devenu un véritable superpouvoir."
  ],

  decision:
    "Tu reçois une vidéo choquante dans un groupe WhatsApp. Elle est déjà partagée par plusieurs amis. Quelle est la meilleure réaction ?",

  options: [
    "La partager immédiatement pour prévenir d'autres personnes.",
    "Supposer qu'elle est vraie parce qu'elle est devenue virale.",
    "Vérifier sa source, sa date, son contexte et rechercher d'autres confirmations avant de la partager.",
    "Considérer automatiquement qu'il s'agit d'un deepfake."
  ],

  correctIndex: 2,

  explanation:
    "La popularité d'un contenu ne garantit pas son authenticité. Vérifier l'origine, la date, le contexte et la présence de sources indépendantes permet de réduire les risques de diffusion d'une fausse information.",

  response: [
    "IDENTIFIE LA SOURCE — demande-toi toujours d'où provient l'information.",

    "VÉRIFIE LA DATE — un contenu ancien peut être présenté comme un événement récent.",

    "ANALYSE LE CONTEXTE — une image ou une citation sortie de son contexte peut être trompeuse.",

    "RECHERCHE D'AUTRES SOURCES — compare plusieurs références indépendantes.",

    "RALENTIS AVANT DE PARTAGER — quelques minutes de vérification peuvent empêcher la diffusion d'une fausse information."
  ],

  mission:
    "Mission Investigateur : choisis une publication récente provenant d'un réseau social. Identifie sa source d'origine, vérifie sa date et recherche au moins deux autres sources qui parlent du même sujet. Évalue ensuite si les informations sont cohérentes ou contradictoires.",

  reflection:
    "Lorsque tu consultes une information en ligne, quel élément influence le plus ton jugement : la personne qui la partage, le nombre de réactions, la qualité de la vidéo ou la source ?",

  cliffhanger:
    "Les fausses informations peuvent nuire à des communautés entières. Mais certaines attaques ciblent directement des individus. Comment réagir lorsqu'une personne est victime de harcèlement, de menaces ou de chantage en ligne ? Prochaine mission : le cyberharcèlement et la sextorsion."
},  
{
  id: "cyberbullying-harm",
  order: 12,
  title: "Cyberbullying & Digital Harm / Le cyberharcèlement et les violences numériques",

  mystery:
    "Quand une plaisanterie cesse-t-elle d'être une plaisanterie ?",

  incident:
    "Aïcha publie une photo dans un groupe de discussion. Une personne se moque d'elle. Une deuxième ajoute un commentaire. Une troisième partage la photo dans un autre groupe. Le lendemain, plusieurs élèves parlent déjà de cette publication. Certains disent qu'ils plaisantent simplement. Aïcha commence pourtant à éviter ses amis et ne veut plus utiliser son téléphone.",

  evidence: [
    "Nous utilisons Internet pour communiquer, apprendre, nous divertir et partager des moments importants avec les autres.",

    "Les technologies rapprochent les personnes, mais elles peuvent aussi être utilisées pour blesser.",

    "Dans la vie quotidienne, un désaccord entre deux personnes n'est pas forcément du harcèlement.",

    "Une critique n'est pas forcément du harcèlement.",

    "Une plaisanterie n'est pas toujours du harcèlement.",

    "La question importante est donc la suivante : quand un comportement devient-il dangereux ?",

    "Un comportement devient préoccupant lorsqu'il humilie, menace, intimide, isole ou blesse une personne.",

    "Lorsque ces comportements utilisent un téléphone, une application, un réseau social, une plateforme de jeux ou tout autre outil numérique, on parle de cyberharcèlement.",

    "Le cyberharcèlement peut prendre différentes formes.",

    "Il peut s'agir d'insultes répétées dans un groupe.",

    "Il peut s'agir de moqueries concernant l'apparence physique d'une personne.",

    "Il peut s'agir de rumeurs diffusées sur les réseaux sociaux.",

    "Il peut s'agir de commentaires humiliants sous une publication.",

    "Il peut s'agir de menaces envoyées dans des messages privés.",

    "Il peut également s'agir de la diffusion d'une photographie ou d'une vidéo sans le consentement de la personne concernée.",

    "Le consentement signifie qu'une personne accepte librement qu'une action soit réalisée.",

    "Partager la photographie d'une personne sans son accord peut avoir des conséquences importantes.",

    "Internet possède une caractéristique particulière : une publication peut être copiée en quelques secondes.",

    "Une photographie peut être téléchargée, transférée, enregistrée et partagée dans plusieurs groupes en très peu de temps.",

    "Une personne peut supprimer sa publication, mais les copies peuvent continuer à circuler.",

    "C'est ce qui distingue souvent une situation en ligne d'une situation hors ligne.",

    "Dans une cour d'école, une remarque désagréable est entendue par quelques personnes.",

    "Sur Internet, cette même remarque peut être lue par des centaines, voire des milliers de personnes.",

    "Les témoins jouent également un rôle important.",

    "Lorsqu'une personne aime, partage ou transfère un contenu humiliant, elle contribue parfois à amplifier la situation.",

    "Ne pas être l'auteur du premier message ne signifie pas que l'on est totalement extérieur au problème.",

    "Le cyberharcèlement peut avoir des conséquences importantes.",

    "Certaines victimes arrêtent de participer aux discussions.",

    "Certaines évitent l'école ou le travail.",

    "Certaines suppriment leurs comptes sur les réseaux sociaux.",

    "Certaines s'isolent progressivement.",

    "Le silence est fréquent.",

    "La peur d'être jugé empêche parfois les victimes de demander de l'aide.",

    "Il existe une autre forme de violence numérique appelée la sextorsion.",

    "La sextorsion combine deux éléments : un contenu intime et une menace.",

    "Une personne peut menacer de publier une photographie, une vidéo ou un message privé afin d'obtenir de l'argent, d'autres images ou une nouvelle faveur.",

    "Le chantage est utilisé pour contrôler la victime.",

    "Payer ne garantit pas la fin des menaces.",

    "Envoyer une nouvelle photographie ne garantit pas non plus que la situation s'arrêtera.",

    "La priorité n'est pas de négocier avec l'agresseur.",

    "La priorité est d'assurer la sécurité de la victime.",

    "Une capture d'écran peut parfois permettre de conserver des preuves importantes.",

    "La date, l'heure, le nom du compte et le contenu des messages peuvent être utiles.",

    "Conserver des preuves ne signifie pas qu'il faut partager davantage le contenu.",

    "Bloquer un compte permet d'interrompre les échanges.",

    "Signaler un compte permet d'informer la plateforme qu'une règle a été violée.",

    "Parler à une personne de confiance est souvent l'étape la plus importante.",

    "Un parent, un enseignant, un responsable, un ami de confiance ou une autre personne capable d'aider peut accompagner la victime.",

    "Face à une situation de violence numérique, le soutien est plus important que la recherche d'un responsable.",

    "Une phrase simple peut parfois faire une grande différence : « Tu n'es pas seul. Nous allons chercher une solution ensemble. »",

    "La cybersécurité ne consiste pas uniquement à protéger des comptes et des appareils.",

    "Elle consiste aussi à protéger les personnes."
  ],

  decision:
    "Tu découvres qu'une photographie humiliante d'un ami circule dans un groupe WhatsApp. Quelle est la meilleure réaction ?",

  options: [
    "Partager la photo pour prévenir d'autres personnes.",
    "Télécharger la photo pour la conserver dans sa galerie.",
    "Soutenir la personne concernée, éviter de diffuser davantage le contenu et signaler la situation.",
    "Ignorer complètement la situation."
  ],

  correctIndex: 2,

  explanation:
    "Partager un contenu humiliant contribue souvent à amplifier la situation. La priorité est d'aider la victime, de limiter la diffusion du contenu et de rechercher un soutien adapté.",

  response: [
    "ARRÊTE LA DIFFUSION — ne partage pas un contenu humiliant.",

    "SOUTIENS LA VICTIME — écoute sans juger.",

    "CONSERVE LES PREUVES IMPORTANTES — captures d'écran, dates et identifiants des comptes.",

    "UTILISE LES OUTILS DE LA PLATEFORME — bloque et signale les comptes concernés.",

    "DEMANDE DE L'AIDE — ne reste pas seul face à une situation de violence numérique."
  ],

  mission:
    "Mission Protecteur : imagine qu'un ami t'appelle parce qu'une photographie humiliante circule dans un groupe. Écris les cinq premières actions que tu entreprendrais pour l'aider. Classe-les ensuite dans l'ordre de priorité.",

  reflection:
    "Si un proche était victime de cyberharcèlement aujourd'hui, saurais-tu comment l'aider ?",

  cliffhanger:
    "Tu sais maintenant reconnaître plusieurs formes de menaces numériques. Mais que faire lorsqu'une attaque a déjà eu lieu ? La dernière mission du module te permettra d'apprendre à réagir lorsqu'un incident se produit."
},
{
  id: "incident-response",
  order: 13,
  title: "Incident Response / Que faire lorsqu'une attaque a déjà eu lieu ?",

  mystery:
    "Que ferais-tu si, demain matin, tu découvrais que ton compte ne t'appartient plus ?",

  incident:
    "Il est 7 heures du matin. Tu prends ton téléphone et tu découvres plusieurs notifications inhabituelles. Ton mot de passe Instagram ne fonctionne plus. Des amis t'envoient des messages pour te demander pourquoi tu leur réclames de l'argent. Tu reçois également un email indiquant qu'un nouvel appareil s'est connecté à ton compte pendant la nuit. Tu paniques. Tu ne sais pas par où commencer. Dois-tu supprimer ton compte ? Changer immédiatement tous tes mots de passe ? Réinitialiser ton téléphone ?",

  evidence: [
    "Même les personnes les plus prudentes peuvent être confrontées à un incident numérique.",

    "La cybersécurité ne consiste donc pas uniquement à empêcher les attaques. Elle consiste également à savoir comment réagir lorsqu'un problème survient.",

    "Un incident de sécurité est un événement qui menace tes données, tes comptes, ton appareil ou ton identité numérique.",

    "Un incident peut prendre différentes formes.",

    "Ton téléphone peut être perdu ou volé.",

    "Ton compte peut être compromis.",

    "Une personne peut publier du contenu à ta place.",

    "Tes informations personnelles peuvent être exposées.",

    "Une application inconnue peut apparaître sur ton appareil.",

    "Tu peux également cliquer sur un lien frauduleux ou télécharger un fichier dangereux.",

    "Face à une attaque, la première réaction est souvent la panique.",

    "La panique pousse parfois les victimes à prendre de mauvaises décisions.",

    "Certaines personnes suppriment immédiatement leurs messages.",

    "D'autres effacent des fichiers importants.",

    "Certaines réinitialisent complètement leur téléphone avant même d'avoir compris ce qui s'est passé.",

    "En cybersécurité, il existe une règle importante : ralentir avant d'agir.",

    "La première étape consiste à identifier le problème.",

    "Que s'est-il passé exactement ?",

    "Quel compte est concerné ?",

    "Quel appareil est concerné ?",

    "L'incident est-il toujours en cours ?",

    "Une fois la situation identifiée, il faut empêcher l'attaque de se poursuivre.",

    "Cette étape est appelée le confinement.",

    "Confiner un incident signifie limiter les dégâts.",

    "Par exemple, si un compte est compromis, il peut être nécessaire de fermer les sessions actives ou de modifier certains paramètres de sécurité.",

    "Si un téléphone est perdu, il peut être nécessaire d'utiliser les fonctions de localisation ou de verrouillage à distance lorsqu'elles sont disponibles.",

    "La troisième étape consiste à récupérer l'accès.",

    "La plupart des plateformes proposent des outils de récupération.",

    "La récupération d'un compte permet au propriétaire légitime de reprendre le contrôle de son espace numérique.",

    "L'adresse électronique occupe souvent une place centrale dans cette étape.",

    "Elle permet généralement de réinitialiser les mots de passe d'autres services.",

    "C'est pourquoi la protection de l'adresse électronique est souvent une priorité.",

    "Changer un mot de passe ne suffit pas toujours.",

    "Certaines plateformes conservent la liste des appareils connectés.",

    "Il est donc utile d'examiner les connexions actives afin d'identifier des appareils inconnus.",

    "Il est également important d'informer les personnes concernées.",

    "Si un attaquant utilise ton compte pour envoyer des messages frauduleux, tes proches doivent être prévenus rapidement.",

    "Ils risquent eux aussi d'être victimes d'une arnaque.",

    "Les preuves jouent un rôle important dans la gestion d'un incident.",

    "Une preuve est un élément qui permet de comprendre ce qui s'est passé.",

    "Une capture d'écran, un email, un message, une date, une heure ou un lien peuvent constituer des preuves utiles.",

    "Conserver des preuves ne signifie pas qu'il faut partager publiquement les informations.",

    "Les preuves doivent être conservées afin de faciliter l'analyse de la situation.",

    "Une fois l'urgence passée, il faut chercher à comprendre comment l'incident s'est produit.",

    "Comment l'attaquant a-t-il obtenu l'accès ?",

    "Un mot de passe a-t-il été réutilisé ?",

    "Un lien frauduleux a-t-il été ouvert ?",

    "Une information personnelle a-t-elle été partagée ?",

    "Comprendre la cause permet d'éviter qu'un incident similaire se reproduise.",

    "Les spécialistes de la cybersécurité résument souvent la réponse à un incident en plusieurs étapes simples : identifier, contenir, récupérer, informer et apprendre.",

    "Tu n'as pas besoin d'être un expert pour appliquer cette méthode.",

    "Tu dois simplement éviter la précipitation.",

    "Un incident peut donner l'impression d'avoir perdu le contrôle.",

    "Pourtant, chaque action réfléchie permet progressivement de reprendre le contrôle de la situation.",

    "Le véritable objectif n'est pas d'éviter toutes les erreurs.",

    "Le véritable objectif est de savoir réagir lorsqu'une erreur ou une attaque survient."
  ],

  decision:
    "Tu découvres que ton compte envoie des messages que tu n'as jamais écrits. Quelle est la première chose à faire ?",

  options: [
    "Supprimer immédiatement le compte.",
    "Publier un message de colère sur les réseaux sociaux.",
    "Identifier le problème et empêcher l'attaque de continuer avant d'entreprendre d'autres actions.",
    "Réinitialiser immédiatement le téléphone."
  ],

  correctIndex: 2,

  explanation:
    "La première étape consiste toujours à comprendre la situation et à limiter les dégâts. Supprimer un compte ou réinitialiser un appareil dans la précipitation peut compliquer la récupération et entraîner la perte d'informations importantes.",

  response: [
    "IDENTIFIE LE PROBLÈME — détermine ce qui est réellement affecté.",

    "LIMITE LES DÉGÂTS — empêche l'attaque de continuer.",

    "RÉCUPÈRE TES ACCÈS — utilise les outils officiels de récupération.",

    "PRÉVIENS LES PERSONNES CONCERNÉES — protège tes proches contre d'éventuelles conséquences.",

    "APPRENDS DE L'INCIDENT — cherche à comprendre son origine afin d'éviter qu'il ne se reproduise."
  ],

  mission:
    "Mission Secours numérique : imagine que tu perds l'accès à ton compte principal. Écris les cinq premières actions que tu entreprendrais. Classe-les ensuite dans l'ordre de priorité et explique pourquoi tu as choisi cet ordre.",

  reflection:
    "Si tu perdais l'accès à ton téléphone aujourd'hui, saurais-tu quelles actions entreprendre pendant les trente premières minutes ?",

  cliffhanger:
    "Félicitations. Tu as terminé ton parcours de survie numérique. Tu sais désormais reconnaître les menaces, analyser les attaques, protéger tes appareils, vérifier les informations et réagir face à un incident. Il est maintenant temps d'utiliser ces compétences pour protéger les autres."
},
{
  id: "digital-survival-guide",

  order: 14,

  title: "Digital Survival Guide / Les 10 règles de survie numérique",

  mystery:
    "Si tu devais effacer toutes les leçons de ce module et n'en conserver qu'une seule, quelles seraient les règles les plus importantes pour te protéger en ligne ?",

  incident:
    "Tu viens de terminer ta formation. Quelques semaines plus tard, tu reçois un message annonçant une bourse d'études. Le lien ouvre un site qui ressemble parfaitement à l'original. Une personne te demande ensuite un code de vérification. Plus tard, un proche te recommande une plateforme d'investissement promettant des bénéfices exceptionnels. Tu ne te souviens plus de tous les détails étudiés pendant la formation. Heureusement, tu te rappelles d'une chose : les règles de survie numérique.",

  evidence: [
    "La cybersécurité ne consiste pas à mémoriser des dizaines de termes techniques.",

    "La cybersécurité consiste à adopter des réflexes capables de te protéger dans différentes situations.",

    "Les menaces numériques évoluent constamment.",

    "Les applications changent.",

    "Les plateformes évoluent.",

    "Les outils d'intelligence artificielle deviennent plus puissants.",

    "Les techniques utilisées par les attaquants évoluent également.",

    "Les principes fondamentaux, en revanche, restent relativement stables.",

    "Règle numéro 1 : ralentis.",

    "Les attaquants utilisent souvent l'urgence pour empêcher leurs victimes de réfléchir.",

    "Une demande urgente doit toujours attirer ton attention.",

    "Règle numéro 2 : vérifie toujours l'identité de ton interlocuteur.",

    "Un nom, une photographie ou un numéro de téléphone ne prouvent pas qu'une personne est réellement celle qu'elle prétend être.",

    "Un compte peut être compromis.",

    "Une identité peut être usurpée.",

    "Règle numéro 3 : ne partage jamais un mot de passe ou un code de vérification.",

    "Ces informations sont personnelles.",

    "Une organisation légitime ne devrait pas te demander de transmettre un code destiné à protéger ton compte.",

    "Règle numéro 4 : méfie-toi des liens.",

    "Un faux site peut ressembler presque parfaitement à un site légitime.",

    "Le design d'une page n'est pas une preuve.",

    "Règle numéro 5 : vérifie toujours la source d'une information.",

    "Une publication populaire n'est pas forcément une publication fiable.",

    "Les images, les vidéos et les captures d'écran peuvent être manipulées.",

    "Règle numéro 6 : protège tes informations personnelles.",

    "Partage uniquement les informations nécessaires.",

    "Une pièce d'identité, un document officiel ou un relevé bancaire méritent une attention particulière.",

    "Règle numéro 7 : utilise des mots de passe différents pour tes comptes importants.",

    "Un seul mot de passe ne devrait jamais protéger l'ensemble de ta vie numérique.",

    "Règle numéro 8 : protège ton téléphone.",

    "Un téléphone contient souvent davantage d'informations personnelles qu'un ordinateur.",

    "Les mises à jour, le verrouillage de l'écran et la gestion des autorisations renforcent sa sécurité.",

    "Règle numéro 9 : demande de l'aide.",

    "Face à un problème, ne reste pas seul.",

    "Parler à une personne de confiance permet souvent d'éviter des décisions prises dans la précipitation.",

    "Règle numéro 10 : lorsqu'un incident survient, concentre-toi sur cinq actions : identifier, limiter les dégâts, récupérer tes accès, prévenir les personnes concernées et apprendre de la situation.",

    "Tu n'as pas besoin d'être un expert en informatique pour te protéger.",

    "Tu dois simplement développer des habitudes qui réduisent les risques.",

    "La technologie évoluera encore.",

    "Les plateformes changeront.",

    "De nouvelles menaces apparaîtront.",

    "Tes meilleurs outils resteront toujours les mêmes : observer, vérifier, protéger et agir avec calme.",

    "La cybersécurité n'est pas une compétence réservée aux spécialistes.",

    "C'est une compétence de vie."
  ],

  decision:
    "Tu reçois un message contenant un lien, une demande d'argent et un code de vérification à transmettre rapidement. Quel est le premier réflexe à adopter ?",

  options: [
    "Cliquer immédiatement pour ne pas perdre l'opportunité.",
    "Transmettre le code afin d'éviter un problème.",
    "Ralentir, vérifier l'identité de l'expéditeur et analyser la situation.",
    "Partager le message avec d'autres personnes."
  ],

  correctIndex: 2,

  explanation:
    "Le réflexe le plus important appris dans ce module est de reprendre le contrôle de la situation. Ralentir permet d'observer, de vérifier et de prendre une décision plus réfléchie.",

  response: [
    "RALENTIS.",
    "VÉRIFIE.",
    "PROTÈGE TES INFORMATIONS.",
    "DEMANDE DE L'AIDE.",
    "APPRENDS DE CHAQUE INCIDENT."
  ],

  mission:
    "Mission Survie : crée ta propre carte de survie numérique. Écris les dix règles que tu souhaites conserver et partage-les avec une personne de ton entourage.",

  reflection:
    "Parmi toutes les règles étudiées dans ce module, laquelle pourrait le plus changer ta manière d'utiliser Internet ?",

  cliffhanger:
    "Tu as terminé ta formation de survie numérique. Tu es maintenant capable d'identifier les menaces, de protéger tes appareils, de vérifier les informations et d'aider d'autres personnes à adopter de meilleures habitudes numériques."
}];

const moduleQuiz: QuizQuestion[] = moduleTwoLessonSpecs.slice(0, 10).map((spec, index) => ({
  id: `m2-final-${spec.id}`,
  question: spec.decision,
  options: spec.options,
  correctIndex: spec.correctIndex,
  explanation: spec.explanation,
  points: index === 9 ? 20 : 10,
}));

export const moduleTwo: ProgramModule = {
  id: "digital-survivor", week: 2,
  title: "Digital Survivor / Survivant du Numérique",
  subtitle: "Reconnaître le danger, se protéger et aider quelqu'un d'autre",
  summary: "Un entraînement de survie numérique fondé sur des incidents réalistes, des décisions et des missions pratiques.",
  color: "#B5123F", icon: "shield",
  outcomes: ["Reconnaître la manipulation", "Protéger appareils et comptes", "Réagir à un incident", "Aider sans aggraver le danger"],
  status: "ready", progressPercent: 0,
  lessons: moduleTwoLessonSpecs.map(survivalLesson),
  quiz: moduleQuiz,
};
