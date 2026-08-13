export type InvestigationScene = {
  eyebrow: string;
  title: string;
  narration: string;
  evidence: string;
  coach: string;
  question?: string;
  options?: string[];
  correct?: number;
  deepDive?: string;
};

export type InvestigationLesson = {
  id: string;
  title: string;
  transformation: string;
  mystery: string;
  atmosphere: string;
  accent: string;
  image: string;
  scenes: InvestigationScene[];
  mission: string[];
  summary: string[];
  cliffhanger: string;
};

// Each authored scene provides three explicit teaching beats instead of a single
// paragraph split mechanically by sentence: `observe` sets a concrete situation,
// `understand` explains the mechanism behind it, `verify` asks the student to
// apply or restate that specific scene's idea (never a generic template).
type AuthoredScene = {
  eyebrow: string;
  title: string;
  observe: string;
  understand: string;
  verify: string;
  evidence: string;
  coach: string;
  question?: string;
  options?: string[];
  correct?: number;
  // The real function/event-level mechanism behind `understand`, in plain
  // language — e.g. what event listener fires, what a scoring function does.
  deepDive?: string;
};

type AuthoredLesson = {
  id: string;
  title: string;
  transformation: string;
  mystery: string;
  atmosphere: string;
  accent: string;
  image: string;
  scenes: AuthoredScene[];
  mission: string[];
  summary: string[];
  cliffhanger: string;
};

const lesson = (value: AuthoredLesson): InvestigationLesson => {
  const chapters = value.scenes.flatMap((scene, chapterIndex) => [
    {
      eyebrow: `Chapitre ${chapterIndex + 1} · Observer`,
      title: scene.title,
      narration: scene.observe,
      evidence: `Point de départ : ${scene.evidence}`,
      coach:
        "Ne cherche pas encore à mémoriser. Observe d'abord ce qui vient de se passer.",
      deepDive: scene.deepDive,
    },
    {
      eyebrow: `Chapitre ${chapterIndex + 1} · Comprendre`,
      title: "Que se passe-t-il derrière l'écran ?",
      narration: scene.understand,
      evidence: scene.evidence,
      coach: scene.coach,
      deepDive: scene.deepDive,
    },
    {
      eyebrow: `Chapitre ${chapterIndex + 1} · Vérifier`,
      title: `Applique l'indice ${chapterIndex + 1}.`,
      narration: scene.verify,
      evidence: scene.evidence,
      coach: scene.question
        ? "Utilise seulement ce que tu viens de découvrir pour répondre."
        : "Si tu peux répondre avec tes propres mots, l'indice est acquis.",
      question: scene.question,
      options: scene.options,
      correct: scene.correct,
      deepDive: scene.deepDive,
    },
  ]);

  return {
    ...value,
    scenes: [
      {
        eyebrow: "Scène d'ouverture · Le mystère",
        title: value.mystery,
        narration: `Tu vas résoudre cette question en ${value.scenes.length} chapitres. À chaque chapitre : observe une situation concrète, comprends le mécanisme derrière elle, puis vérifie ce que tu as retenu.`,
        evidence: "Une seule question guidera toute l'enquête.",
        coach:
          "Nous avançons depuis le premier indice. Aucun mot technique ne sera supposé connu.",
        deepDive:
          "Une application n'est pas un objet magique : elle est faite de fonctions programmées, de bases de données et de serveurs qui communiquent. Dans cette enquête, chaque scène isolera un maillon de cette chaîne pour montrer quelle action déclenche quel traitement.",
      },
      ...chapters,
      {
        eyebrow: "Synthèse · Relier les preuves",
        title: "Reconstruis maintenant tout le mécanisme.",
        narration: value.summary
          .map((item, index) => `${index + 1}. ${item}`)
          .join(" "),
        evidence: value.transformation,
        coach: `Les ${value.scenes.length} indices forment maintenant une seule chaîne logique.`,
        deepDive:
          "Relier les preuves revient à reconstruire le trajet complet dans le programme : un événement est détecté sur l'appareil, des données sont envoyées par le réseau, des fonctions les traitent sur un serveur, puis une réponse revient vers l'écran. Chaque maillon est du code écrit et relié par des développeurs.",
      },
      {
        eyebrow: `Scène ${chapters.length + 2} · Passage au réel`,
        title: "L'enquête quitte maintenant l'écran.",
        narration:
          "Tu as compris le mécanisme. La mission finale va te permettre de le retrouver dans une situation réelle, sans exposer de donnée privée.",
        evidence: "Comprendre devient utile lorsque cela change une action.",
        coach: value.cliffhanger,
        deepDive:
          "Le code automatise ce que la plateforme mesure et affiche, mais il ne choisit pas ton intention à ta place. Comprendre les fonctions, les données et les calculs te permet de prévoir leurs effets et de reprendre une décision consciente avant ton prochain geste.",
      },
    ],
  };
};

export const moduleOneInvestigations: Record<string, InvestigationLesson> =
  Object.fromEntries(
    [
      lesson({
        id: "inside-whatsapp",
        title: "Inside WhatsApp",
        transformation:
          "Je saurai expliquer ce que WhatsApp protege, ce qu'il doit encore traiter, et ce que les autres peuvent garder.",
        mystery: "Que sait vraiment WhatsApp quand tu envoies un message ?",
        atmosphere: "TUNNEL CHIFFRÉ",
        accent: "#22c55e",
        image: "/images/module-1/message-journey.png",
        scenes: [
          {
            eyebrow: "Indice 1 · Le service",
            title: "WhatsApp est une messagerie, pas juste une icône verte.",
            observe:
              "Amina ouvre WhatsApp pour envoyer une photo à sa cousine à Douala. Avant même qu'elle tape un seul mot, l'application a déjà mobilisé son numéro de téléphone, son compte, sa connexion Internet et les serveurs du service pour rendre cet échange possible.",
            understand:
              "WhatsApp n'est pas juste une icône verte sur ton écran : c'est un service de messagerie qui relie ton numéro, ton téléphone, tes contacts autorisés, Internet et ses propres serveurs pour transporter messages, appels, photos, groupes, statuts, canaux et conversations avec des entreprises. L'application ne fabrique pas Internet — elle l'utilise pour connecter des appareils et organiser des conversations.",
            verify:
              "Avant de continuer l'enquête, résume dans tes mots : de quoi WhatsApp a-t-il besoin pour fonctionner, même avant que tu écrives un seul message ?",
            evidence:
              "WhatsApp est un service de communication qui a besoin d'un compte, d'un appareil, d'une connexion et d'une infrastructure pour fonctionner.",
            coach:
              "Avant de parler de vie privee, il faut comprendre ce que le service doit faire.",
            deepDive:
              "Techniquement, WhatsApp tourne sur ton téléphone comme une application cliente qui communique avec des serveurs distants via des fonctions réseau. Dès l'ouverture, du code s'exécute pour établir une connexion sécurisée entre ton appareil et les serveurs WhatsApp, avant même que tu touches quoi que ce soit à l'écran.",
          },
          {
            eyebrow: "Indice 2 · Le voyage",
            title: "Ton message devient un paquet de donnees.",
            observe:
              "Amina appuie sur Envoyer. En une fraction de seconde, sa photo quitte son téléphone, traverse le réseau, puis arrive — ou attend quelque part — avant de rejoindre sa cousine.",
            understand:
              "Quand tu appuies sur Envoyer, ton message est d'abord préparé par ton téléphone, chiffré, puis envoyé par le réseau vers l'infrastructure WhatsApp qui aide à le livrer au bon destinataire. S'il ne peut pas être livré tout de suite — téléphone éteint, pas de connexion — il peut rester temporairement sur les serveurs sous forme chiffrée, le temps que le service réessaie.",
            verify:
              "Explique à voix haute le trajet complet d'un message, depuis le moment où tu appuies sur Envoyer jusqu'à son arrivée chez ton destinataire.",
            evidence:
              "Envoyer declenche une livraison technique : appareil, reseau, serveurs, destinataire et parfois attente temporaire.",
            coach:
              "Le serveur aide a livrer. La question suivante est : peut-il lire le contenu ?",
            question:
              "Pourquoi WhatsApp utilise-t-il des serveurs si le message va a un ami ?",
            options: [
              "Pour aider a acheminer et livrer les donnees",
              "Pour imprimer le message",
              "Pour remplacer Internet",
              "Pour deviner la reponse",
            ],
            correct: 0,
            deepDive:
              "Quand tu appuies sur Envoyer, une fonction comme sendMessage(contenu, destinataire) s'exécute : elle chiffre le contenu, l'encapsule avec des métadonnées (destinataire, horodatage), puis l'envoie via une requête réseau vers un serveur. Ce serveur exécute à son tour une fonction de routage qui identifie l'appareil du destinataire et lui transmet le message, ou le stocke temporairement s'il est hors ligne.",
          },
          {
            eyebrow: "Indice 3 · Le verrou",
            title: "Le contenu est protege par le chiffrement de bout en bout.",
            observe:
              "Amina se demande si quelqu'un — WhatsApp, son opérateur, ou une personne qui intercepterait le trafic — pourrait lire sa conversation en chemin.",
            understand:
              "Le chiffrement de bout en bout répond justement à cette inquiétude : il rend le contenu de tes messages personnels illisible pendant tout le trajet, pour WhatsApp comme pour les opérateurs réseau ou toute personne qui intercepterait le trafic. Les clés nécessaires pour lire la conversation restent uniquement sur les appareils des personnes qui discutent, jamais sur les machines traversées en chemin.",
            verify:
              "Un ami affirme que WhatsApp peut lire tous ses messages personnels. Que lui réponds-tu avec ce que tu viens d'apprendre ?",
            evidence:
              "Le chiffrement de bout en bout protege le contenu du message, mais il ne rend pas toute activite invisible.",
            coach:
              "C'est le coeur de WhatsApp : le texte est protege. Mais autour du texte, il reste des traces.",
            question:
              "Que protege principalement le chiffrement de bout en bout ?",
            options: [
              "Le contenu du message",
              "Toutes les metadonnees",
              "Les captures d'ecran",
              "Le fait que tu utilises WhatsApp",
            ],
            correct: 0,
            deepDive:
              "Le chiffrement de bout en bout repose sur des fonctions cryptographiques exécutées uniquement sur les deux téléphones concernés, jamais sur le serveur. Une fonction encrypt(message, cléDuDestinataire) transforme ton texte en une suite de caractères illisible avant l'envoi ; seule une fonction decrypt(), utilisant la clé privée du destinataire, peut le rendre lisible à nouveau — le serveur ne possède jamais cette clé.",
          },
          {
            eyebrow: "Indice 4 · Ce que le service sait quand meme",
            title: "La vie privee ne s'arrete pas au contenu.",
            observe:
              "Même si le contenu de ses messages reste protégé, le compte d'Amina continue de transmettre des informations à chaque utilisation de l'application.",
            understand:
              "Pour fournir le service, WhatsApp traite des informations comme ton numéro, ton nom de profil, ta photo si tu en ajoutes une, tes réglages, certains contacts si tu les autorises, les groupes, les heures et fréquences d'utilisation, l'adresse IP, le type d'appareil, la langue, le fuseau horaire et certaines informations de localisation approximative. Ces données ne révèlent pas ce que tu as écrit, mais elles peuvent dessiner des habitudes, des relations et un contexte.",
            verify:
              "Cite trois informations que WhatsApp peut connaître sur toi sans jamais avoir lu le contenu d'un seul de tes messages.",
            evidence:
              "Les metadonnees et informations de compte peuvent raconter beaucoup sans contenir le texte exact du message.",
            coach:
              "Le message est ferme, mais l'enveloppe porte encore des informations.",
            question:
              "Laquelle est une metadonnee ou information de contexte ?",
            options: [
              "Le sens exact de la phrase",
              "L'heure et le destinataire d'un message",
              "Une pensee non envoyee",
              "Le mot de passe d'un ami",
            ],
            correct: 1,
            deepDive:
              "En parallèle du contenu chiffré, d'autres fonctions du serveur enregistrent automatiquement des métadonnées non chiffrées : une fonction logConnection() note l'heure et l'adresse IP à chaque connexion, une fonction logMessageMeta() note qui a envoyé un message à qui et quand — sans jamais avoir accès à ce qui est écrit dedans.",
          },
          {
            eyebrow: "Indice 5 · Les limites",
            title:
              "Le destinataire, les sauvegardes et les entreprises changent le risque.",
            observe:
              "La photo d'Amina arrive enfin chez sa cousine et s'affiche à l'écran. Mais une fois affichée, qui contrôle encore ce qui peut lui arriver ensuite ?",
            understand:
              "Une fois le message arrivé, la personne en face peut le capturer, le transférer, le montrer ou le signaler. Les sauvegardes dans Google ou iCloud, les conversations avec certaines entreprises, les services tiers et les appareils liés peuvent aussi créer d'autres copies ou traitements selon les réglages et les personnes impliquées.",
            verify:
              "Avant d'envoyer une information vraiment sensible sur WhatsApp, quelles trois questions devrais-tu te poser en te souvenant de cette enquête ?",
            evidence:
              "Le chiffrement protege le trajet, mais il ne controle pas toutes les copies ni toutes les personnes qui recoivent l'information.",
            coach:
              "Voila la competence finale : ne pas confondre message chiffre et message impossible a exposer.",
            question:
              "Quel reflexe est le plus juste avant d'envoyer une information sensible ?",
            options: [
              "Croire qu'elle ne pourra jamais sortir de WhatsApp",
              "Verifier le destinataire, les copies possibles et le niveau de sensibilite",
              "Envoyer puis supprimer toujours suffit",
              "Publier dans un groupe pour aller plus vite",
            ],
            correct: 1,
            deepDive:
              "Une fois le message déchiffré sur l'appareil du destinataire, il quitte le système protégé par le chiffrement : une simple fonction du système d'exploitation (comme takeScreenshot()) peut alors capturer ce qui s'affiche à l'écran, ou une fonction de sauvegarde automatique peut copier la conversation vers un service de stockage externe — aucune de ces fonctions n'est contrôlée par le chiffrement de WhatsApp.",
          },
        ],
        mission: [
          "Choisis un message non sensible.",
          "Dessine son trajet : ton appareil, Internet, WhatsApp, appareil du destinataire.",
          "Ajoute trois informations que WhatsApp peut traiter sans lire le contenu.",
          "Ajoute trois risques hors chiffrement : capture, transfert, sauvegarde, groupe ou entreprise.",
        ],
        summary: [
          "WhatsApp est un service de messagerie qui relie comptes, appareils, reseaux et serveurs.",
          "Un message devient des donnees qui doivent etre acheminees et parfois conservees temporairement si elles ne sont pas livrees.",
          "Le chiffrement de bout en bout protege le contenu des messages personnels pendant le trajet.",
          "Les metadonnees, informations de compte, appareil, contacts, groupes et usages peuvent encore etre traitees.",
          "La confidentialite depend aussi du destinataire, des sauvegardes, des entreprises, des signalements et des copies.",
        ],
        cliffhanger:
          "Sur Facebook, aucun message n'est nécessaire : un simple classement peut influencer ce que tu crois important.",
      }),
      lesson({
        id: "inside-facebook",
        title: "Inside Facebook",
        transformation:
          "Je regarderai le fil comme un classement, pas comme un miroir du monde.",
        mystery: "Qui décide de la publication qui apparaît en premier ?",
        atmosphere: "GRAPHE SOCIAL",
        accent: "#3b82f6",
        image: "/images/module-1/recommendation-engine.png",
        scenes: [
          {
            eyebrow: "Indice 1 · Trop de publications",
            title: "Ton écran ne peut pas tout montrer.",
            observe:
              "Eric ouvre Facebook un mardi soir. En quelques secondes, des centaines de publications de ses amis, groupes et pages auraient pu s'afficher — mais son écran n'en montre qu'une poignée.",
            understand:
              "Amis, groupes, pages et créateurs publient largement plus de contenu que ce que tu peux réellement lire. Facebook doit donc choisir des candidats avant même d'afficher ton fil, en écartant la grande majorité de ce qui existe à cet instant précis.",
            verify:
              "Si Facebook devait tout te montrer sans jamais rien choisir, à quoi ressemblerait ton fil ?",
            evidence:
              "Le fil d'actualité est une sélection, pas une chronologie complète.",
            coach: "S'il faut choisir, il faut aussi classer.",
            deepDive:
              "Le serveur exécute une fonction comme getCandidatePosts(compte) qui interroge une base de données contenant des millions de publications, en sélectionne quelques milliers pertinentes selon les comptes que tu suis, puis en garde seulement quelques centaines pour l'étape suivante — jamais la totalité.",
          },
          {
            eyebrow: "Indice 2 · Le score",
            title: "Chaque publication reçoit une estimation.",
            observe:
              "Pendant qu'Eric fait défiler son fil, une publication d'un ami proche apparaît tout en haut — avant même une publiée une heure plus tôt par une page qu'il suit depuis des années.",
            understand:
              "Le système observe qui a publié, le type de contenu, sa fraîcheur, et estime les réactions probables : vas-tu lire, commenter, partager ou ignorer ? Chaque publication reçoit ainsi une sorte de score, et c'est ce score — pas l'ordre chronologique — qui décide de ce qui apparaît en premier.",
            verify:
              "Une publication arrive en tête de ton fil. Qu'est-ce que cela prouve réellement, et qu'est-ce que cela ne prouve surtout pas ?",
            evidence:
              "La première publication est celle qui obtient un score élevé pour les objectifs du système.",
            coach: "Un score élevé peut-il rendre une information vraie ?",
            question: "Pourquoi une publication arrive-t-elle en premier ?",
            options: [
              "Elle est forcément vraie",
              "Son score prédit est élevé",
              "Elle est la plus ancienne",
              "Un ami l'a choisie pour toi",
            ],
            correct: 1,
            deepDive:
              "Chaque publication candidate passe par une fonction de notation, scorePost(publication, toi), qui combine plusieurs variables (qui a publié, quand, quel type de contenu) pour renvoyer un chiffre. Une fonction de tri classe ensuite toutes les publications selon ce chiffre, de la plus haute à la plus basse — la première place revient simplement au score le plus élevé.",
          },
          {
            eyebrow: "Indice 3 · L'engagement",
            title: "Les réactions accélèrent la circulation.",
            observe:
              "Une publication provocante récolte des centaines de commentaires en une heure. Sans qu'Eric s'en rende compte, elle commence à apparaître dans le fil de personnes qui ne suivent même pas son auteur.",
            understand:
              "Commentaires, partages et réactions montrent qu'une publication provoque une action chez les gens. Le système peut alors la tester auprès d'un public plus large, ce qui crée une boucle : plus une publication reçoit de réactions, plus elle est montrée, et plus elle est montrée, plus elle peut en recevoir encore.",
            verify:
              "Pourquoi une publication qui met en colère peut-elle circuler plus vite qu'une publication factuelle et posée ?",
            evidence:
              "L'engagement mesure une réaction, pas la qualité ni la vérité.",
            coach: "Voilà comment une publication commence à devenir virale.",
            deepDive:
              "Chaque commentaire ou partage déclenche une fonction comme onEngagement(publication, typeAction) qui incrémente un compteur associé à cette publication. Une fonction de recalcul du score utilise ensuite ce compteur : plus il grimpe vite, plus le score recalculé augmente, ce qui peut faire remonter la publication dans un nombre croissant de fils — un pur effet mécanique du calcul, répété à grande échelle.",
          },
          {
            eyebrow: "Indice 4 · La viralité",
            title: "Partager relie plusieurs réseaux.",
            observe:
              "La publication provocante quitte le mur d'un ami d'Eric, atterrit dans un groupe, puis dans une page qu'il ne connaît pas — et à chaque étape, un peu du contexte d'origine se perd.",
            understand:
              "Une publication passe d'un ami à un groupe, puis à une page et à d'autres communautés. À chaque passage, le contexte original peut disparaître tandis que l'émotion qu'elle suscite reste, elle, tout aussi forte.",
            verify:
              "Avant de partager un contenu qui a beaucoup circulé, quel réflexe simple peut t'éviter de propager une information hors contexte ?",
            evidence:
              "La viralité combine classement, émotion, engagement et réseaux sociaux.",
            coach: "Avant de partager, retrouve la source et le contexte.",
            question: "Quel réflexe ralentit une fausse viralité ?",
            options: [
              "Partager puis vérifier",
              "Vérifier la source avant de partager",
              "Compter les réactions",
              "Lire seulement le titre",
            ],
            correct: 1,
            deepDive:
              "Techniquement, chaque partage crée une nouvelle instance de la publication dans un nouveau fil, via une fonction sharePost() qui copie une référence au contenu original vers un nouveau public. Le contenu d'origine n'est jamais dupliqué avec son contexte complet — seule une fonction d'affichage limité montre la publication elle-même, sans forcément montrer d'où elle vient.",
          },
        ],
        mission: [
          "Choisis trois publications publiques.",
          "Prédis laquelle générera le plus de réactions et explique pourquoi.",
          "Vérifie ensuite source, contexte et type d'engagement.",
        ],
        summary: [
          "Le fil est classé.",
          "Un score prédit tes réactions.",
          "Engagement ne signifie pas vérité.",
          "Le partage transporte parfois un contenu sans son contexte.",
        ],
        cliffhanger:
          "Sur Instagram, le système ne classe pas seulement des textes : il interprète aussi une identité visuelle.",
      }),
      lesson({
        id: "inside-instagram",
        title: "Inside Instagram",
        transformation:
          "Je comprendrai qu'une image construit à la fois une recommandation et une réputation.",
        mystery: "Comment Instagram sait-il ce qui pourrait t'inspirer ?",
        atmosphere: "PRISME VISUEL",
        accent: "#ec4899",
        image: "/images/module-1/digital-twin.png",
        scenes: [
          {
            eyebrow: "Indice 1 · Plusieurs portes",
            title:
              "Feed, Stories, Reels et Explore ne jouent pas le même rôle.",
            observe:
              "Nadia ouvre Instagram et navigue en quelques minutes entre son Feed, des Stories d'amis et l'onglet Explore rempli de comptes qu'elle ne suit pas. Chacun de ces espaces lui montre pourtant un contenu différent.",
            understand:
              "Chaque espace possède ses propres candidats et ses propres signaux : Stories privilégie souvent les relations proches, Explore mise sur la découverte de nouveaux comptes, et Reels cherche surtout la probabilité que tu continues à regarder. Instagram utilise donc plusieurs systèmes de classement, pas un algorithme unique pour toute l'application.",
            verify:
              "Pourquoi ton Feed et ton onglet Explore peuvent-ils te montrer des contenus complètement différents au même moment ?",
            evidence:
              "Instagram utilise plusieurs systèmes de classement, pas un algorithme unique.",
            coach:
              "Pour classer une image, il doit d'abord en extraire des indices.",
            deepDive:
              "Chaque espace (Feed, Stories, Reels, Explore) est en réalité géré par une fonction de classement séparée dans le code d'Instagram — getFeedRanking(), getExploreRanking(), etc. — chacune programmée avec des priorités différentes et donc des résultats différents pour le même compte au même moment.",
          },
          {
            eyebrow: "Indice 2 · Lire une image",
            title: "Une photo contient plus que des pixels.",
            observe:
              "Nadia poste une photo de son plat préféré avec la légende « miam » et trois hashtags de cuisine. Sans qu'elle écrive une seule phrase d'explication, le système en tire déjà plusieurs indices.",
            understand:
              "Des systèmes peuvent repérer des objets, couleurs, visages, textes visibles et thèmes probables directement dans l'image. La légende, les hashtags, la musique utilisée et les premières réactions ajoutent encore d'autres indices, qui deviennent tous des signaux pour la recommandation.",
            verify:
              "Cite trois éléments, autres que le texte d'une légende, qu'un système peut analyser dans une seule photo ou un seul Reel.",
            evidence:
              "Le contenu visuel et son contexte deviennent des signaux de recommandation.",
            coach: "Puis tes gestes indiquent quels signaux comptent pour toi.",
            question:
              "Quel élément peut aider à comprendre le thème d'un Reel ?",
            options: [
              "Seulement le nombre de pixels",
              "Image, son, légende et réactions",
              "La batterie",
              "La coque du téléphone",
            ],
            correct: 1,
            deepDive:
              "Des fonctions d'analyse d'image (reconnaissance d'objets, de visages, de texte) s'exécutent automatiquement sur chaque publication au moment où elle est mise en ligne, produisant des étiquettes automatiques comme « nourriture » ou « extérieur ». Ces étiquettes, combinées à la légende et aux hashtags, deviennent des variables supplémentaires utilisées par la fonction de classement.",
          },
          {
            eyebrow: "Indice 3 · Ton Explore",
            title: "Tes micro-actions composent une carte d'intérêts.",
            observe:
              "Nadia s'arrête trois secondes de plus sur une vidéo de danse, sauvegarde une recette, puis visite le profil d'un compte de voyage. Elle n'a rien publié — pourtant son Explore change dès le lendemain.",
            understand:
              "Un arrêt, une sauvegarde, une visite de profil ou une recherche renforcent certains thèmes aux yeux du système. Explore devient alors une hypothèse visuelle de ce qui pourrait t'intéresser, construite entièrement à partir de ces micro-actions passées.",
            verify:
              "Ton Explore d'aujourd'hui dit-il qui tu es vraiment, ou seulement ce que tu as regardé récemment ? Explique la différence.",
            evidence:
              "Ton Explore reflète des prédictions issues de tes actions, pas toute ta personnalité.",
            coach:
              "Mais ce que tu publies fabrique une autre carte : celle que les autres voient.",
            deepDive:
              "Chaque arrêt sur une vidéo, chaque sauvegarde ou visite de profil déclenche une fonction qui met à jour un profil d'intérêt stocké côté serveur — un peu comme une liste de scores par thème associée à ton compte. La fonction getExploreRanking() lit ensuite ce profil pour choisir quels contenus te proposer ensuite.",
          },
          {
            eyebrow: "Indice 4 · L'identité visible",
            title: "Chaque publication participe à ta réputation.",
            observe:
              "Un an plus tard, un camarade de classe que Nadia n'a jamais rencontré en personne se fait déjà une idée précise d'elle, simplement en regardant son profil : sa bio, ses photos, ses commentaires.",
            understand:
              "Bio, photos, commentaires, abonnements et anciennes Stories construisent une impression durable de qui tu es. Cette impression peut aussi voyager hors de son contexte d'origine, par une capture d'écran ou un partage, bien après que tu aies oublié l'avoir publiée.",
            verify:
              "Si quelqu'un découvrait ton profil aujourd'hui sans te connaître, quelle impression penses-tu qu'il se ferait de toi ?",
            evidence:
              "Ton identité numérique est construite par ce que tu publies et par ce que les autres interprètent.",
            coach: "Regarde ton profil comme si tu le découvrais aujourd'hui.",
            question: "Quelle question protège le mieux ta réputation ?",
            options: [
              "Combien de likes ?",
              "Que comprendra quelqu'un sans le contexte ?",
              "Quel filtre est populaire ?",
              "Qui publie le plus ?",
            ],
            correct: 1,
            deepDive:
              "Contrairement au classement algorithmique, ce que les autres voient sur ton profil dépend d'une fonction bien plus simple, getPublicProfile(compte), qui affiche simplement tes publications, ta bio et tes statistiques dans l'ordre où elles existent — sans aucun calcul de score, juste un affichage direct de ce que tu as choisi de rendre visible.",
          },
        ],
        mission: [
          "Observe une page Explore sans noter d'informations privées.",
          "Regroupe neuf contenus par thèmes supposés.",
          "Relie chaque thème à un signal possible et identifie une supposition probablement fausse.",
        ],
        summary: [
          "Instagram classe plusieurs espaces.",
          "Images et contexte fournissent des signaux.",
          "Explore est une hypothèse d'intérêts.",
          "Publier construit une réputation durable.",
        ],
        cliffhanger:
          "Instagram devine ce qui t'inspire. Google doit deviner ce que tu veux dire avec quelques mots seulement.",
      }),
      lesson({
        id: "inside-google",
        title: "Inside Google",
        transformation:
          "Je verrai une page de résultats comme un index classé, jamais comme Internet entier.",
        mystery:
          "Comment Google cherche-t-il des milliards de pages en moins d'une seconde ?",
        atmosphere: "UNIVERS DE RECHERCHE",
        accent: "#f59e0b",
        image: "/images/module-1/lesson-1/invisible-world.png",
        scenes: [
          {
            eyebrow: "Indice 1 · Avant ta recherche",
            title: "Google a déjà exploré le Web.",
            observe:
              "Avant que Google puisse découvrir une page, quelqu'un doit d'abord créer son contenu, l'enregistrer sur un serveur connecté à Internet et lui donner une adresse publique appelée URL. La page peut ensuite être révélée par des liens placés sur d'autres sites, un plan du site envoyé au moteur de recherche ou une demande directe du propriétaire. Un jeune peut alors taper une question dans Google et obtenir des résultats en moins d'une seconde — alors que le Web compte des milliards de pages.",
            understand:
              "Une page en ligne n'arrive donc pas automatiquement dans Google. Elle doit être accessible publiquement et autoriser l'exploration. Les robots de Google partent d'adresses déjà connues, ouvrent les pages disponibles et suivent leurs liens vers d'autres adresses. Ils peuvent aussi lire les plans de sites transmis par leurs propriétaires. Les pages privées, bloquées, supprimées ou sans chemin de découverte peuvent rester absentes. Ce travail se fait continuellement, bien avant ta recherche.",
            verify:
              "Explique le trajet complet : comment une information créée par une personne devient-elle une page accessible, puis une page que Google peut éventuellement découvrir ?",
            evidence:
              "Le contenu est publié sur un serveur avec une URL; Google peut ensuite découvrir les pages publiques grâce aux liens et aux plans de sites.",
            coach: "Découvrir ne suffit pas. Il faut organiser.",
            deepDive:
              "Un programme appelé un « crawler » exécute en continu une fonction comme visitPage(url), qui télécharge le contenu d'une page, en extrait tous les liens qu'elle contient, puis rappelle visitPage() pour chacun de ces liens — un cycle qui tourne sans interruption, bien avant que tu ne tapes ta recherche.",
          },
          {
            eyebrow: "Indice 2 · L'index",
            title: "Les pages rejoignent une immense bibliothèque.",
            observe:
              "Toutes les pages découvertes par les robots de Google ne serviraient à rien si elles restaient en vrac. Il faut un moyen de les retrouver instantanément parmi des milliards d'autres.",
            understand:
              "Google analyse le contenu découvert et construit un index : une structure gigantesque qui relie mots, sujets et pages entre eux. Ta recherche interroge cet index directement, plutôt que d'aller consulter chaque site en direct au moment où tu cherches.",
            verify:
              "Quelle est la différence entre « explorer le Web » et « interroger un index déjà préparé » ?",
            evidence:
              "L'index rend la recherche rapide, mais il n'est jamais une copie parfaite de tout le Web.",
            coach:
              "Il reste des milliers de réponses possibles. Qui passe en premier ?",
            question:
              "Pourquoi Google ne visite-t-il pas tout le Web après chaque recherche ?",
            options: [
              "Il utilise un index préparé",
              "Il devine au hasard",
              "Le navigateur connaît tout",
              "Il demande à TikTok",
            ],
            correct: 0,
            deepDive:
              "Une fonction d'indexation, indexPage(contenu), analyse chaque page découverte et enregistre quels mots apparaissent où, dans une structure de données optimisée pour la recherche ultra-rapide — un peu comme l'index alphabétique à la fin d'un livre, mais à l'échelle de milliards de pages. Ta recherche interroge directement cette structure déjà construite, jamais les pages elles-mêmes en temps réel.",
          },
          {
            eyebrow: "Indice 3 · Le classement",
            title: "Les mots cachent une intention.",
            observe:
              "Un jeune tape « jaguar vitesse » dans la barre de recherche. Cherche-t-il des informations sur l'animal le plus rapide du monde, ou sur la voiture de sport du même nom ?",
            understand:
              "Le moteur doit interpréter les mots, le contexte probable, la qualité et l'utilité des pages pour deviner l'intention réelle derrière une recherche aussi courte. Il classe ensuite les résultats selon cette intention estimée — une estimation qui peut parfois se tromper.",
            verify:
              "Pourquoi deux personnes qui tapent exactement les mêmes mots dans la barre de recherche peuvent-elles chercher deux choses complètement différentes ?",
            evidence:
              "Le classement tente de satisfaire une intention, mais peut se tromper.",
            coach:
              "Un autre élément ressemble à un résultat sans être classé de la même manière.",
            deepDive:
              "Une fonction de recherche, search(motsClés), retrouve d'abord toutes les pages contenant ces mots dans l'index, puis une fonction de classement, rankResults(pages, contexte), leur attribue un score basé sur des centaines de variables avant de les trier — un mot ambigu comme « jaguar » peut ainsi donner des résultats très différents selon le contexte détecté.",
          },
          {
            eyebrow: "Indice 4 · Résultat ou publicité",
            title: "La première place peut être sponsorisée.",
            observe:
              "Tout en haut de la page de résultats, un lien ressemble énormément aux autres — sauf un petit mot discret, « Annonce », affiché juste avant l'adresse du site.",
            understand:
              "Certaines entreprises paient pour apparaître dans des espaces clairement signalés comme des annonces. Les résultats naturels, classés selon leur pertinence, et les résultats sponsorisés, achetés par une entreprise, obéissent à deux mécanismes complètement différents.",
            verify:
              "Avant de cliquer sur le tout premier résultat d'une recherche, quel indice simple te dit s'il s'agit d'un résultat naturel ou d'une publicité ?",
            evidence:
              "Repérer la mention sponsorisée permet de comprendre pourquoi un lien est visible.",
            coach:
              "Deviens le moteur : classe les sources, puis explique ton choix.",
            question: "Quel résultat mérite le plus de confiance ?",
            options: [
              "Toujours le premier",
              "Celui dont la source, la date et les preuves sont solides",
              "Celui avec le plus grand titre",
              "Toujours une annonce",
            ],
            correct: 1,
            deepDive:
              "Techniquement, les résultats sponsorisés proviennent d'un système complètement séparé — une fonction comme getSponsoredResults(motsClés, budgetAnnonceur) — qui sélectionne parmi les entreprises ayant payé pour ces mots-clés, avant d'insérer ces résultats en haut de la page, distincts du système de classement naturel qui, lui, ne peut pas être acheté.",
          },
        ],
        mission: [
          "Choisis une question précise.",
          "Compare trois résultats : source, date, intention et caractère sponsorisé.",
          "Classe-les toi-même et justifie le premier.",
        ],
        summary: [
          "Les robots découvrent les pages.",
          "L'index les organise.",
          "Le classement interprète une intention.",
          "Une annonce n'est pas un résultat naturel.",
        ],
        cliffhanger:
          "Google classe des pages écrites par des humains. Un chatbot, lui, fabrique sa réponse mot après mot.",
      }),
      lesson({
        id: "inside-ai-chatbots",
        title: "Inside AI Chatbots",
        transformation:
          "Je saurai utiliser une réponse fluide sans la confondre avec une preuve.",
        mystery: "Un chatbot connaît-il réellement ses réponses ?",
        atmosphere: "RÉSEAU PRÉDICTIF",
        accent: "#a855f7",
        image: "/images/module-1/recommendation-engine.png",
        scenes: [
          {
            eyebrow: "Indice 1 · Le prochain morceau",
            title: "L'IA construit une réponse par prédiction.",
            observe:
              "Un jeune pose une question à un chatbot et reçoit en quelques secondes une réponse rédigée, fluide, presque naturelle — comme si une personne l'avait écrite en y réfléchissant.",
            understand:
              "En réalité, un grand modèle de langage reçoit ton texte, le découpe en petites unités, puis prédit la suite la plus probable, un morceau après l'autre, à une vitesse fulgurante. Il répète cette opération jusqu'à former une réponse complète, sans jamais « réfléchir » comme le ferait une personne.",
            verify:
              "Une réponse de chatbot te semble fluide et assurée. Que sais-tu maintenant sur la façon dont elle a réellement été construite ?",
            evidence:
              "Un chatbot génère du langage plausible par prédiction successive.",
            coach:
              "Une prédiction fluide peut sembler certaine. Mais d'où vient-elle ?",
            deepDive:
              "Le modèle exécute une fonction predictNextToken(texteJusquIci) des centaines de fois de suite : à chaque appel, elle calcule la probabilité de chaque mot ou morceau de mot possible pour continuer la phrase, en choisit un, l'ajoute au texte, puis se rappelle elle-même avec ce texte légèrement plus long — jusqu'à ce qu'une réponse complète soit construite, un fragment à la fois.",
          },
          {
            eyebrow: "Indice 2 · Les structures apprises",
            title:
              "Le modèle a appris des régularités dans énormément de textes.",
            observe:
              "On pourrait croire qu'un chatbot a lu et retenu chaque livre, chaque site et chaque article, comme une immense encyclopédie parfaite gardée en mémoire.",
            understand:
              "Pendant son entraînement, le modèle ajuste des milliards de paramètres pour mieux prédire la suite d'un texte. Il ne conserve donc pas une encyclopédie exacte : il apprend des régularités, des associations et des façons de répondre — ce qui n'est pas la même chose que vérifier chaque fait au moment de répondre.",
            verify:
              "Quelle est la différence entre « avoir appris des régularités dans du texte » et « connaître un fait vérifié » ?",
            evidence:
              "Apprendre des régularités n'est pas vérifier chaque fait au moment de répondre.",
            coach: "C'est ici qu'apparaît notre indice le plus dangereux.",
            question: "Que fait principalement un modèle de langage ?",
            options: [
              "Il lit les pensées",
              "Il prédit des suites de langage",
              "Il vérifie toujours Internet",
              "Il ne fait que copier une page",
            ],
            correct: 1,
            deepDive:
              "Pendant l'entraînement, une fonction d'ajustement met à jour des milliards de petits chiffres appelés « paramètres » chaque fois que le modèle se trompe sur un exemple de texte. Après des milliards de répétitions, ces paramètres encodent des régularités statistiques du langage — mais aucune fonction du modèle ne vérifie jamais un fait contre une source externe au moment de répondre.",
          },
          {
            eyebrow: "Indice 3 · L'hallucination",
            title: "Une réponse crédible peut être inventée.",
            observe:
              "Un chatbot affirme avec beaucoup d'assurance une date, un chiffre ou une citation précise — qui s'avère totalement inventée une fois vérifiée ailleurs.",
            understand:
              "Si une suite de mots fausse paraît linguistiquement probable, le modèle peut la produire avec la même assurance qu'une information exacte. On appelle cela une hallucination : le ton convaincant d'une réponse ne prouve donc jamais son exactitude.",
            verify:
              "Pourquoi le ton confiant d'un chatbot n'est-il jamais, à lui seul, une preuve suffisante que sa réponse est vraie ?",
            evidence: "Plausible n'est pas synonyme de vrai.",
            coach:
              "Ton prompt peut améliorer le travail, mais pas abolir cette limite.",
            deepDive:
              "La fonction predictNextToken() ne fait aucune différence entre un fait vrai et un fait faux tant que les deux sont statistiquement probables dans le langage. Il n'existe aucune fonction interne appelée verifyFact() qui validerait une affirmation avant de l'écrire — le modèle produit simplement la suite de mots la plus plausible, vraie ou non.",
          },
          {
            eyebrow: "Indice 4 · Collaborer avec prudence",
            title: "Donne un contexte, demande des limites, puis vérifie.",
            observe:
              "Un jeune veut utiliser un chatbot pour préparer un exposé important, sans se faire piéger par une éventuelle hallucination.",
            understand:
              "Expliquer son objectif, le public visé, le format attendu et les contraintes améliore la qualité d'une réponse. Demander au chatbot de signaler ses incertitudes aide aussi. Mais pour toute information importante, la vérifier avec des sources fiables reste indispensable — l'IA est un partenaire de travail, pas une autorité automatique.",
            verify:
              "Pour ton prochain exposé, quelles deux actions concrètes prendras-tu avant de faire confiance à une réponse de chatbot ?",
            evidence:
              "L'IA est un partenaire de travail, pas une autorité automatique.",
            coach:
              "Défie maintenant une réponse au lieu de simplement l'accepter.",
            question: "Quel réflexe est le plus sûr ?",
            options: [
              "Faire confiance au ton",
              "Vérifier les affirmations importantes",
              "Partager immédiatement",
              "Donner toutes ses données privées",
            ],
            correct: 1,
            deepDive:
              "Donner du contexte précis change les valeurs d'entrée de la fonction predictNextToken(), ce qui influence directement les probabilités calculées à chaque étape et peut rendre la réponse plus pertinente. Mais aucune quantité de contexte n'ajoute une fonction de vérification factuelle qui n'existe pas dans l'architecture du modèle — c'est pourquoi la vérification externe reste indispensable.",
          },
        ],
        mission: [
          "Pose au chatbot une question dont tu connais la réponse.",
          "Demande ses sources et ses incertitudes.",
          "Vérifie deux affirmations ailleurs et note ce qui change avec un meilleur prompt.",
        ],
        summary: [
          "Le chatbot prédit du langage.",
          "Il apprend des régularités.",
          "Il peut halluciner.",
          "Un bon prompt aide, mais la vérification reste nécessaire.",
        ],
        cliffhanger:
          "Tu viens d'observer ce que l'IA produit. Mais que produis-tu toi-même chaque fois que tu navigues ?",
      }),
      lesson({
        id: "your-digital-shadow",
        title: "Your Digital Shadow",
        transformation:
          "Je reconnaîtrai les traces visibles et invisibles laissées par ma journée numérique.",
        mystery: "Combien Internet sait-il déjà de toi ?",
        atmosphere: "CARTE DES TRACES",
        accent: "#06b6d4",
        image: "/images/module-1/digital-footprint.png",
        scenes: [
          {
            eyebrow: "Indice 1 · La trace volontaire",
            title: "Certaines traces portent clairement ta signature.",
            observe:
              "Joel publie une photo de ses vacances, commente le post d'un ami, puis remplit un formulaire d'inscription en ligne — trois gestes qu'il a choisis consciemment de faire.",
            understand:
              "Une publication, un commentaire, une photo ou un formulaire sont des traces actives : tu as choisi de fournir cette information, même si tu n'as pas prévu tous ses usages futurs possibles.",
            verify:
              "Cite trois traces actives que tu as toi-même laissées cette semaine, sans forcément y penser sur le moment.",
            evidence:
              "L'empreinte active vient de ce que tu publies ou déclares.",
            coach: "D'autres traces apparaissent sans publication.",
            deepDive:
              "Chaque publication déclenche une fonction comme createPost(contenu, compte) qui enregistre une nouvelle entrée, associée à ton identifiant, dans la base de données du service — une action que tu as explicitement demandée en appuyant sur un bouton.",
          },
          {
            eyebrow: "Indice 2 · La trace silencieuse",
            title: "Ton appareil parle aussi.",
            observe:
              "Joel navigue sur un site sans jamais s'inscrire ni cliquer sur quoi que ce soit. Il pense n'avoir laissé aucune trace — mais le site, lui, a déjà enregistré plusieurs informations.",
            understand:
              "Adresse IP, type d'appareil, durée de visite, localisation approximative et cookies peuvent être observés pendant la simple navigation, sans aucune action volontaire de ta part.",
            verify:
              "Pourquoi peut-on laisser une trace numérique même en ne publiant, ne commentant et ne remplissant absolument rien ?",
            evidence:
              "L'empreinte passive vient de la collecte technique et comportementale.",
            coach:
              "Une trace isolée dit peu. Plusieurs traces dessinent une routine.",
            question: "Quel exemple est une trace passive ?",
            options: [
              "Écrire un commentaire",
              "Un site mesure la durée de visite",
              "Publier une photo",
              "Remplir sa bio",
            ],
            correct: 1,
            deepDive:
              "Dès qu'une page se charge dans ton navigateur, des fonctions de suivi s'exécutent automatiquement en arrière-plan — logPageView(), logDeviceInfo() — sans aucun clic de ta part, enregistrant ton adresse IP, ton type d'appareil et la durée de ta visite dans les journaux du serveur.",
          },
          {
            eyebrow: "Indice 3 · Relier les morceaux",
            title: "Des comptes et identifiants rapprochent tes traces.",
            observe:
              "Joel se connecte au même compte sur son téléphone, sa tablette et l'ordinateur familial. Ces trois appareils racontent-ils trois histoires séparées, ou une seule et même histoire ?",
            understand:
              "Une connexion avec un même compte, des cookies, un email ou des identifiants publicitaires peuvent relier plusieurs sessions entre elles. Le résultat est un portrait fragmenté de toi, jamais parfaitement fidèle, mais de plus en plus précis à mesure que les morceaux s'assemblent.",
            verify:
              "Comment un service peut-il te reconnaître sur trois appareils différents sans que tu aies jamais rien confirmé toi-même ?",
            evidence:
              "Une identité numérique peut être déduite de traces dispersées.",
            coach: "Et une trace peut survivre plus longtemps que prévu.",
            deepDive:
              "Une fonction comme linkSessionToAccount(cookie, compte) associe chaque nouvelle session de navigation à ton identifiant existant, dès que tu te connectes sur un nouvel appareil. C'est cette fonction de liaison, pas une reconnaissance magique, qui permet à un service de te retrouver partout où tu te connectes.",
          },
          {
            eyebrow: "Indice 4 · Les copies",
            title: "Supprimer ne rappelle pas toutes les copies.",
            observe:
              "Joel supprime une photo publiée par erreur, soulagé. Mais un ami l'avait déjà capturée en story, et un moteur de recherche en avait peut-être déjà gardé une version en cache.",
            understand:
              "Capture, téléchargement, cache et sauvegarde peuvent conserver une publication ailleurs, même après sa suppression. Supprimer l'original reste utile et nécessaire, mais ne contrôle pas automatiquement chaque copie déjà créée par d'autres.",
            verify:
              "Avant de publier un contenu que tu pourrais regretter, à quelles copies possibles devrais-tu penser dès maintenant ?",
            evidence: "Pense aux copies et au futur contexte avant de publier.",
            coach:
              "Cartographie ton ombre sans exposer d'informations sensibles.",
            question: "Pourquoi une photo supprimée peut-elle rester visible ?",
            options: [
              "La suppression est impossible",
              "D'autres copies peuvent exister",
              "Le Wi-Fi l'imprime",
              "Le mot de passe la republie",
            ],
            correct: 1,
            deepDive:
              "Supprimer une publication déclenche une fonction comme deletePost(id) qui retire l'entrée de la base de données principale — mais elle n'a aucun pouvoir sur les copies déjà créées ailleurs par d'autres fonctions indépendantes : takeScreenshot() sur l'appareil d'un ami, ou cachePage() dans les serveurs d'un moteur de recherche.",
          },
        ],
        mission: [
          "Liste les services utilisés aujourd'hui.",
          "Pour chacun, note une trace active et une trace passive possible.",
          "Choisis une permission ou un ancien contenu à revoir.",
        ],
        summary: [
          "Les traces peuvent être actives ou passives.",
          "Les identifiants relient des sessions.",
          "Des profils sont déduits.",
          "Les copies limitent le contrôle après publication.",
        ],
        cliffhanger:
          "Si tes traces ont de la valeur, une question devient inévitable : qui paie réellement les services gratuits ?",
      }),
      lesson({
        id: "business-of-internet",
        title: "The Business of the Internet",
        transformation:
          "Je chercherai le modèle économique derrière chaque bouton gratuit.",
        mystery: "Si tu ne paies pas, qui paie — et pour quoi ?",
        atmosphere: "MARCHÉ DE L'ATTENTION",
        accent: "#f97316",
        image: "/images/module-1/digital-twin.png",
        scenes: [
          {
            eyebrow: "Indice 1 · La facture invisible",
            title: "Un service gratuit coûte quand même de l'argent.",
            observe:
              "Une application gratuite compte des millions d'utilisateurs, des serveurs puissants et une grande équipe de développeurs — sans jamais te demander un seul franc CFA.",
            understand:
              "Serveurs, développeurs, sécurité et modération doivent pourtant être financés d'une manière ou d'une autre. Un service peut gagner de l'argent par publicité, abonnement, commission, offre freemium ou vente d'appareils, souvent en combinant plusieurs de ces sources à la fois.",
            verify:
              "Choisis une application gratuite que tu utilises souvent : d'après toi, comment finance-t-elle réellement ses serveurs et ses équipes ?",
            evidence:
              "Comprendre le revenu aide à comprendre les choix de conception.",
            coach:
              "Dans beaucoup d'applications, la ressource vendue est limitée : ton attention.",
            deepDive:
              "Faire tourner une application pour des millions de personnes nécessite des fonctions serveur exécutées en permanence sur des machines physiques payantes — chaque appel de fonction, chaque requête traitée, chaque octet stocké a un coût réel facturé à l'entreprise, même si l'utilisateur ne paie rien directement.",
          },
          {
            eyebrow: "Indice 2 · L'attention",
            title: "Chaque minute peut devenir une opportunité commerciale.",
            observe:
              "Plus une jeune personne reste sur une application, plus celle-ci peut afficher de contenu, mesurer ses réactions et parfois lui montrer des publicités.",
            understand:
              "Notifications, lecture automatique et fil infini existent en grande partie pour soutenir cet objectif : garder ton attention le plus longtemps possible, car ton temps d'écran possède une réelle valeur économique pour la plateforme.",
            verify:
              "Repère une fonctionnalité d'une application que tu utilises qui semble conçue pour prolonger ton temps passé dessus.",
            evidence: "Ton temps d'écran possède une valeur économique.",
            coach:
              "Mais les annonceurs ne veulent pas montrer la même publicité à tout le monde.",
            question:
              "Pourquoi une plateforme mesure-t-elle la durée d'une session ?",
            options: [
              "Seulement pour la batterie",
              "Parce que l'attention peut soutenir son modèle économique",
              "Pour ralentir Internet",
              "Pour supprimer ton compte",
            ],
            correct: 1,
            deepDive:
              "Des fonctions comme loadNextVideo() ou sendNotification() sont conçues pour se déclencher au bon moment afin de te faire rouvrir l'application ou y rester plus longtemps — chaque seconde supplémentaire de session est mesurée par une fonction de suivi du temps d'utilisation, une donnée directement liée aux revenus publicitaires.",
          },
          {
            eyebrow: "Indice 3 · L'audience",
            title: "Les annonceurs achètent une probabilité de réaction.",
            observe:
              "Un annonceur ne veut pas montrer sa publicité à tout le monde au hasard : il cherche précisément les personnes les plus susceptibles de cliquer, de s'inscrire ou d'acheter.",
            understand:
              "Les signaux collectés sur toi servent justement à estimer cette probabilité de réaction, même si la prédiction reste toujours imparfaite. La valeur d'une plateforme vient souvent de sa capacité à atteindre et prédire une audience précise pour ses annonceurs.",
            verify:
              "Pourquoi une entreprise préfère-t-elle payer pour cibler une audience précise plutôt que d'afficher sa publicité à tout le monde au hasard ?",
            evidence:
              "La valeur vient souvent de la capacité à atteindre et prédire une audience.",
            coach:
              "Le gratuit n'est donc pas forcément mauvais, mais il possède un échange.",
            deepDive:
              "Une fonction comme matchAdToUser(profilUtilisateur, campagnesDisponibles) compare ton profil de signaux à des milliers de campagnes publicitaires actives, et sélectionne celle qui obtient le meilleur score de correspondance prédite — c'est ce calcul, exécuté en une fraction de seconde, qui détermine quelle publicité tu vois.",
          },
          {
            eyebrow: "Indice 4 · Aligner les intérêts",
            title: "L'objectif de l'application n'est pas toujours le tien.",
            observe:
              "Un jeune ouvre une application pour vérifier une information en deux minutes, et se retrouve à faire défiler son fil quarante minutes plus tard, sans avoir vraiment décidé de rester si longtemps.",
            understand:
              "Une plateforme peut chercher à prolonger ta session pendant que toi, tu voulais simplement apprendre vite puis passer à autre chose. Identifier ce décalage entre l'objectif de l'application et le tien te permet de choisir un outil, un réglage ou une limite réellement adaptée à toi.",
            verify:
              "La prochaine fois que tu ouvriras une application « gratuite », quelles trois questions te poseras-tu sur son modèle économique ?",
            evidence:
              "Demande toujours : qui paie, quel comportement rapporte et est-ce mon objectif ?",
            coach: "Suis l'argent derrière une application que tu utilises.",
            question:
              "Quel est le meilleur réflexe face à un service gratuit ?",
            options: [
              "Supposer qu'il n'a aucun coût",
              "Identifier son modèle économique",
              "Refuser tout Internet",
              "Cliquer sur chaque publicité",
            ],
            correct: 1,
            deepDive:
              "Les fonctions qui gouvernent l'expérience (autoplay, notifications, fil infini) sont programmées pour optimiser une métrique précise choisie par l'entreprise — le temps passé, le nombre de sessions par jour — pas pour optimiser le temps que, toi, tu voulais y consacrer.",
          },
        ],
        mission: [
          "Choisis une application gratuite.",
          "Trouve ses sources de revenus.",
          "Relie trois choix d'interface à ce modèle et compare son objectif au tien.",
        ],
        summary: [
          "Tout service a des coûts.",
          "Plusieurs modèles financent Internet.",
          "L'attention peut être monétisée.",
          "Les objectifs commerciaux et personnels peuvent diverger.",
        ],
        cliffhanger:
          "Tu connais maintenant les systèmes et leurs intérêts. Il reste à décider quel citoyen numérique tu veux devenir.",
      }),
      lesson({
        id: "conscious-digital-citizen",
        title: "Becoming a Conscious Digital Citizen",
        transformation:
          "Je passerai de spectateur du numérique à participant conscient et responsable.",
        mystery:
          "Maintenant que tu comprends le monde numérique, comment choisiras-tu d'y vivre ?",
        atmosphere: "SALLE DES CHOIX",
        accent: "#10b981",
        image: "/images/module-1/lesson-1/two-worlds.png",
        scenes: [
          {
            eyebrow: "Indice 1 · Ton intention",
            title: "Utiliser un outil commence par savoir pourquoi.",
            observe:
              "Un jeune ouvre une application par réflexe, sans même se souvenir pourquoi il l'a ouverte, ni ce qu'il cherchait vraiment à y faire.",
            understand:
              "Avant d'ouvrir une application, nommer clairement ton objectif — apprendre, parler, créer, te divertir ou agir — transforme une habitude automatique en un véritable choix conscient. Cette seule seconde de réflexion rend beaucoup plus visibles les mécanismes de captation d'attention que tu as découverts tout au long du module.",
            verify:
              "La prochaine fois que tu ouvriras une application, quelle sera ton intention avant même de toucher l'écran ?",
            evidence:
              "Une intention claire rend les mécanismes de captation plus visibles.",
            coach:
              "Choisir pour soi ne suffit pas : nos actions touchent aussi les autres.",
            deepDive:
              "Techniquement, rien dans le code de l'application ne connaît ton intention avant que tu agisses : toutes les fonctions ne réagissent qu'à des événements mesurables (un clic, un temps de visionnage). Nommer ton intention avant d'ouvrir l'application est donc la seule étape du processus qu'aucune fonction ne peut faire à ta place.",
          },
          {
            eyebrow: "Indice 2 · Ta responsabilité",
            title: "Publier, commenter et partager ont des conséquences.",
            observe:
              "Un jeune s'apprête à partager une information choquante sans l'avoir vérifiée, simplement parce qu'elle l'a mis en colère.",
            understand:
              "Vérifier une information avant de la partager, respecter le consentement d'autrui, protéger la vie privée des autres et refuser le harcèlement sont des responsabilités concrètes. Ta portée personnelle peut sembler petite, mais chacune de tes actions rejoint malgré tout un réseau bien plus large que toi.",
            verify:
              "Repense à une fois où tu as (ou aurais pu) partager quelque chose trop vite. Qu'aurais-tu pu vérifier avant ?",
            evidence:
              "La citoyenneté numérique combine liberté, responsabilité et soin des autres.",
            coach: "Tu as aussi des droits face aux plateformes.",
            question: "Quel geste montre une participation responsable ?",
            options: [
              "Partager sous le coup de l'émotion",
              "Vérifier et respecter le consentement",
              "Exposer une donnée privée",
              "Harceler en groupe",
            ],
            correct: 1,
            deepDive:
              "Quand tu partages un contenu, une fonction comme sharePost() se contente de dupliquer une référence vers un nouveau public, sans aucune vérification automatique de véracité intégrée par défaut — cette vérification reste une étape humaine, que le code ne fait pas pour toi.",
          },
          {
            eyebrow: "Indice 3 · Tes droits",
            title: "Tu peux demander, contrôler et contester.",
            observe:
              "Un jeune pense qu'une fois une donnée envoyée à une plateforme, il n'a plus aucun contrôle dessus, ni aucun recours possible.",
            understand:
              "Selon les services et les lois applicables, tu peux disposer de droits réels sur l'accès, la correction ou la suppression de tes données. Tu peux aussi régler tes préférences, signaler un abus et demander une explication — être citoyen numérique, c'est aussi connaître ces choix et savoir les utiliser.",
            verify:
              "Nomme un droit ou un réglage que tu pourrais vérifier ou activer dès aujourd'hui sur l'une de tes applications.",
            evidence:
              "Être citoyen numérique, c'est connaître ses choix et demander des comptes.",
            coach:
              "Transformons maintenant dix leçons en quelques principes personnels.",
            deepDive:
              "Certaines plateformes exposent des fonctions accessibles aux utilisateurs, comme requestDataExport() ou requestAccountDeletion(), généralement imposées par des lois sur la protection des données. Ces fonctions existent, mais elles ne s'activent jamais automatiquement — c'est à toi de les déclencher volontairement dans les paramètres.",
          },
          {
            eyebrow: "Indice 4 · Ton manifeste",
            title: "Écris les règles de ta propre vie numérique.",
            observe:
              "Le module touche à sa fin. Tout ce qui a été observé — signaux, classements, empreintes, modèles économiques — reste abstrait tant que rien ne change concrètement dans tes habitudes.",
            understand:
              "Choisir des principes simples et observables — je vérifie avant de partager, je protège les données d'autrui, je fixe une intention, je diversifie mes sources, je demande de l'aide face à un risque — transforme la compréhension en un véritable pouvoir d'action. La compréhension ne devient utile que lorsqu'elle change réellement une action.",
            verify:
              "Écris dès maintenant le tout premier principe de ton propre manifeste numérique, en une phrase simple.",
            evidence:
              "La compréhension devient un pouvoir seulement lorsqu'elle change une action.",
            coach:
              "L'enquête du Module 1 se ferme. Ton regard, lui, reste ouvert.",
            question: "Quel principe résume le mieux le parcours ?",
            options: [
              "Tout croire",
              "Observer, vérifier et agir avec intention",
              "Quitter toute technologie",
              "Suivre la majorité",
            ],
            correct: 1,
            deepDive:
              "Aucune fonction du code ne peut transformer une compréhension en habitude durable — cette dernière étape n'existe que dans tes choix répétés, hors du programme, chaque fois que tu ouvres une application en te souvenant de ce que tu as appris ici.",
          },
        ],
        mission: [
          "Écris cinq engagements commençant par « Je… ».",
          "Ajoute une action mesurable à chacun.",
          "Choisis celui que tu appliqueras dès aujourd'hui et partage-le avec une personne de confiance.",
        ],
        summary: [
          "Commence par une intention.",
          "Tes actions touchent un réseau.",
          "Tu as des responsabilités et des droits.",
          "Un principe utile doit devenir une action.",
        ],
        cliffhanger:
          "Tu sais voir derrière l'écran. La prochaine grande enquête sera de protéger ce monde — et les personnes qui y vivent.",
      }),
    ].map((item) => [item.id, item]),
  );

export const moduleOneInvestigationIds = Object.keys(moduleOneInvestigations);
