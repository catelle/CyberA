import type { LessonQuizQuestion, ProgramLesson, ProgramModule } from "@/lib/program";

type Spec = {
  id: string; order: number; title: string; hook: string; story: string;
  discoveries: string[]; mission: string[]; reflection: string; ability: string;
  image: string; imageAlt: string; quiz: LessonQuizQuestion;
};

function academyLesson(spec: Spec): ProgramLesson {
  return {
    id: spec.id, order: spec.order, title: spec.title, estimatedMins: spec.id === "ou-est-internet" ? 60 : spec.id === "apres-envoyer" ? 20 : 14,
    content: [
      { type: "hook", content: spec.hook },
      { type: "story", content: spec.story },
      { type: "image", content: spec.imageAlt, src: spec.image, alt: spec.imageAlt, caption: "Observe l'illustration: combien d'acteurs invisibles peux-tu reperer ?" },
      ...spec.discoveries.map((content) => ({ type: "discovery" as const, content })),
      { type: "mission", content: spec.mission },
      { type: "reflection", content: spec.reflection },
      { type: "ability", content: spec.ability }
    ],
    quiz: spec.quiz
  };
}

const messageImage = "/images/module-1/message-journey.png";
const twinImage = "/images/module-1/digital-twin.png";
const algorithmImage = "/images/module-1/recommendation-engine.png";
const footprintImage = "/images/module-1/digital-footprint.png";

export const moduleOne: ProgramModule = {
  id: "hygiene-numerique",
  week: 1,
  title: "The Digital World / Le Monde Numérique",
  subtitle: "Comprendre ce qui se passe vraiment derrière l'écran",
  summary: "Entre a l'Academie, suis les traces invisibles de tes clics et construis une carte mentale claire d'Internet, des donnees, des algorithmes et de ton identite numerique.",
  color: "#1A5276",
  icon: "globe",
  outcomes: ["Suivre un message", "Comprendre la valeur des donnees", "Observer les algorithmes", "Cartographier son empreinte"],
  status: "ready",
  progressPercent: 0,
  lessons: [
    academyLesson({
      id: "ou-est-internet", order: 1, title: "Bienvenue derriere l'ecran",
      hook: "Le monde numerique est beaucoup plus grand que tu ne l'imagines.",
      story: "Chaque matin, des millions de jeunes deverrouillent leur telephone pour envoyer des messages, regarder des videos, chercher, jouer, utiliser l'IA ou etudier. Mais ou tout cela se passe-t-il vraiment ? Aujourd'hui, tu passes derriere l'ecran.",
      image: "/images/module-1/lesson-1/behind-the-screen.png", imageAlt: "Un jeune decouvre le reseau mondial invisible derriere son telephone",
      discoveries: [
        "Tu vis dans un monde physique et dans un monde numerique fait d'appareils, de reseaux, de donnees, d'algorithmes et de personnes connectees.",
        "Ton telephone est une cle, une fenetre et une telecommande. Une grande partie de ce que tu utilises vit sur d'autres appareils et serveurs.",
        "Messages, photos, recherches et decisions automatisees circulent sans cesse. Le monde numerique ne dort jamais."
      ],
      mission: ["Pendant une heure, note chaque application ouverte.", "Ecris pourquoi tu l'as ouverte.", "Observe quelle information tu as partagee, sans changer tes habitudes."],
      reflection: "Combien de services numeriques as-tu deja utilises aujourd'hui ?",
      ability: "Capacite debloquee · Digital Explorer",
      quiz: { question: "Quel est le meilleur role pour decrire ton telephone ?", options: ["Il contient tout le monde numerique", "C'est une porte d'acces vers une infrastructure beaucoup plus vaste", "Il fabrique Internet tout seul", "Il conserve toutes les donnees du monde"], correctIndex: 1, explanation: "Ton telephone donne acces a des reseaux, serveurs, services et appareils situes ailleurs." }
    }),
    academyLesson({
      id: "apres-envoyer", order: 2, title: "Inside TikTok : qui choisit ta prochaine video ?",
      hook: "Tu ouvres TikTok. Une video apparait. Mais qui a decide que celle-ci devait etre la premiere ?",
      story: "Tu entres comme enqueteur dans un fil qui n'existe que pour toi. En suivant tes pauses, tes relectures et tes passages rapides, tu decouvres une boucle : la plateforme teste, tu reagis, puis elle ajuste sa prochaine prediction.",
      image: "/images/module-1/lesson-2/personalized-feeds.png", imageAlt: "Deux jeunes africains decouvrent des fils video personnalises differents",
      discoveries: [
        "Il n'existe pas un fil TikTok universel : le systeme classe des videos pour chaque profil.",
        "Temps de visionnage, relectures, likes, recherches et passages rapides deviennent des signaux.",
        "Le systeme predit tes reactions sans comprendre toutes tes raisons, et ses erreurs peuvent retrecir ton horizon."
      ],
      mission: ["Choisis un sujet educatif precis.", "Pendant dix minutes, regarde les contenus utiles jusqu'au bout et ignore le divertissement.", "Observe demain si ton fil a change."],
      reflection: "Aujourd'hui, j'ai decouvert que TikTok...",
      ability: "Capacite debloquee · Algorithm Investigator",
      quiz: { question: "Qui entraine progressivement ton fil ?", options: ["Le hasard uniquement", "Tes actions repetees fournissent des signaux", "La batterie", "Un seul createur"], correctIndex: 1, explanation: "Tes reactions alimentent une boucle de prediction et de recommandation." }
    }),
    academyLesson({
      id: "inside-whatsapp", order: 3, title: "Inside WhatsApp : que se passe-t-il après Envoyer ?",
      hook: "Un message chiffre est-il automatiquement un message sans trace ?",
      story: "Amina envoie une photo dans un groupe WhatsApp et voit deux coches bleues. Le texte et l'image sont proteges pendant le trajet, mais le service doit quand meme livrer les donnees, connaitre certains elements du compte, gerer les appareils, les groupes, les sauvegardes et les signalements. L'enquete consiste a separer ce qui est protege, ce qui est traite, et ce qui peut encore etre copie par les personnes.",
      image: messageImage, imageAlt: "Un message WhatsApp voyage entre deux telephones a travers un tunnel chiffre et des serveurs",
      discoveries: [
        "WhatsApp est un service de messagerie : il relie ton numero, ton application, tes contacts autorises, Internet, ses serveurs et les appareils des personnes avec qui tu communiques.",
        "Le chiffrement de bout en bout protege le contenu des messages personnels pendant le trajet. WhatsApp aide a livrer le message, mais ne devrait pas pouvoir lire le texte ou la photo chiffre entre les appareils.",
        "La confidentialite ne concerne pas seulement le contenu : numero, profil, contacts autorises, groupes, heures d'utilisation, adresse IP, appareil, sauvegardes, conversations avec des entreprises, signalements et copies peuvent encore compter."
      ],
      mission: ["Dessine le trajet d'un message non sensible : telephone, reseau, serveurs, destinataire.", "Liste trois donnees necessaires au fonctionnement qui ne sont pas le contenu du message.", "Identifie trois situations ou le message peut sortir de ton controle : capture, transfert, sauvegarde, groupe ou entreprise."],
      reflection: "Apres cette lecon, quelle difference fais-tu entre contenu protege et traces autour du contenu ?",
      ability: "Capacite debloquee · WhatsApp Privacy Mapper",
      quiz: { question: "Quelle phrase explique le mieux WhatsApp ?", options: ["Le chiffrement efface toute trace", "Le contenu des messages personnels est protege, mais le service traite encore des informations de fonctionnement", "WhatsApp fonctionne sans numero ni appareil", "Une coche bleue prouve que le message est vrai"], correctIndex: 1, explanation: "Le chiffrement protege le contenu, tandis que certaines informations de compte, appareil, usage et livraison restent necessaires au service." }
    }),
    academyLesson({
      id: "inside-facebook", order: 4, title: "Inside Facebook : qui décide de ce qui apparaît en premier ?",
      hook: "Si une application coute des millions a faire fonctionner mais ne te demande pas d'argent, qui paie la facture ?",
      story: "Pendant qu'Eric regarde une video, une vente aux encheres publicitaire automatisee peut se jouer en une fraction de seconde. Les annonceurs ne demandent pas forcement son nom: ils veulent atteindre un profil susceptible de reagir. Son attention devient l'espace vendu.",
      image: twinImage, imageAlt: "Des comportements alimentent un profil utilise dans un ecosysteme publicitaire",
      discoveries: [
        "Les plateformes gagnent de l'argent par publicite, abonnement, commission, vente d'appareils ou combinaison. Connaitre le revenu aide a comprendre les choix de conception.",
        "L'economie de l'attention mesure ce qui te fait rester: lecture automatique, notifications, contenu sans fin, recompenses variables. Ton temps est limite et chaque minute captee ne peut etre utilisee ailleurs.",
        "La personnalisation peut rendre une annonce pertinente, mais aussi encourager davantage de collecte, influencer une decision ou enfermer une personne dans une categorie imparfaite."
      ],
      mission: ["Choisis trois services gratuits et trouve comment chacun gagne de l'argent.", "Observe une publicite et propose trois raisons possibles de son apparition.", "Pendant dix minutes, compte les mecanismes qui prolongent la session."],
      reflection: "Quand une plateforme optimise ton temps d'ecran, ses objectifs et les tiens sont-ils toujours les memes ?",
      ability: "Capacite debloquee · Economy Decoder",
      quiz: { question: "Pourquoi une publication apparaît-elle en premier ?", options: ["Elle est forcément vraie", "Son score prédit est élevé pour les objectifs du fil", "Elle est toujours la plus ancienne", "Un ami choisit chaque position"], correctIndex: 1, explanation: "Le fil classe les publications selon des signaux et des réactions prédites." }
    }),
    academyLesson({
      id: "inside-instagram", order: 5, title: "Inside Instagram : comment sait-il ce qui t'inspire ?",
      hook: "Pourquoi tes photos, cartes, videos et sauvegardes semblent-elles se reconnaitre entre plusieurs appareils ?",
      story: "Nadia change de telephone. Apres une seule connexion, contacts, photos, documents et preferences reapparaissent. Elle est entree dans un ecosysteme ou identite, stockage, applications, paiements et appareils cooperent.",
      image: messageImage, imageAlt: "Plusieurs appareils et services relies a des serveurs par un ecosysteme",
      discoveries: [
        "Un ecosysteme relie des produits par un compte central et des interfaces techniques. Cela offre synchronisation et recuperation, mais peut rendre le depart difficile.",
        "Google, Meta, TikTok, YouTube, Microsoft et Apple occupent des roles differents: recherche, communication, video, systemes, cloud, publicite et appareils. Ils cooperent parfois et se concurrencent ailleurs.",
        "Se connecter avec un grand compte cree un pont. Cela simplifie l'acces, mais partage une identite technique et parfois d'autres informations selon les autorisations."
      ],
      mission: ["Dessine un ecosysteme: services, appareils, donnees et paiements.", "Liste les applications ou tu utilises 'Se connecter avec...' et verifie leurs autorisations.", "Imagine quitter cet ecosysteme: que serait-il difficile de recuperer ?"],
      reflection: "A quel moment le confort d'un ecosysteme devient-il une dependance ?",
      ability: "Capacite debloquee · System Thinker",
      quiz: { question: "Que représente principalement la page Explore ?", options: ["Toute ta personnalité", "Une prédiction de tes intérêts à partir de signaux", "Une liste identique pour tous", "Uniquement les comptes suivis"], correctIndex: 1, explanation: "Explore classe des contenus à partir de tes actions et d'indices visuels." }
    }),
    academyLesson({
      id: "inside-google", order: 6, title: "Inside Google : comment cherche-t-il si vite ?",
      hook: "Ton ami et toi ouvrez la meme plateforme. Pourquoi vos ecrans racontent-ils deux mondes differents ?",
      story: "Deux recrues regardent la meme video. L'une reste jusqu'au bout; l'autre quitte apres trois secondes. Le lendemain, leurs fils divergent. Le systeme n'a pas lu leurs pensees: il a teste, mesure puis reclasse des contenus selon leurs reactions probables.",
      image: algorithmImage, imageAlt: "Deux jeunes recoivent des fils differents produits par un moteur de recommandation",
      discoveries: [
        "Un algorithme est une suite de regles ou calculs. Un moteur de recommandation classe des contenus selon un objectif: clic, duree de visionnage, satisfaction estimee ou achat.",
        "Ne rien cliquer est aussi un signal. S'arreter, relire, passer vite ou revenir nourrit une boucle: le systeme montre, tu reagis, il apprend, puis il montre autrement.",
        "Une recommandation n'est ni la verite ni ce qui est le plus important. C'est ce que le systeme estime utile a son objectif pour ce profil."
      ],
      mission: ["Compare ton accueil video avec celui d'un proche sans copier ses donnees privees.", "Cherchez un meme sujet puis notez dix recommandations differentes.", "Sors volontairement du fil et trouve une source opposee ou independante."],
      reflection: "Combien de tes opinions viennent de tes choix, et combien de ce qui a ete place devant toi ?",
      ability: "Capacite debloquee · Algorithm Observer",
      quiz: { question: "Pourquoi Google répond-il sans parcourir tout le Web à chaque recherche ?", options: ["Il connaît déjà toutes les réponses", "Il interroge un index préparé", "Il choisit au hasard", "Le navigateur invente les pages"], correctIndex: 1, explanation: "Des robots découvrent les pages en amont et les organisent dans un index." }
    }),
    academyLesson({
      id: "inside-ai-chatbots", order: 7, title: "Inside AI Chatbots : l'IA connaît-elle ses réponses ?",
      hook: "Tu supprimes une photo dix secondes apres l'avoir publiee. Combien de copies peuvent deja exister ?",
      story: "Joel efface une photo regrettee. Mais un ami a fait une capture, un appareil l'a telechargee, une sauvegarde existe et un moteur a peut-etre cree un cache. Supprimer reste utile, mais cela retire une copie sous ton controle, pas toutes les copies du monde.",
      image: footprintImage, imageAlt: "Une photo se duplique en capture, sauvegarde, cache, telechargement et version modifiee",
      discoveries: [
        "L'empreinte active vient de ce que tu publies. L'empreinte passive vient de la collecte en arriere-plan: cookies, adresse IP, position, appareil ou empreinte du navigateur.",
        "Un cache accelere, une sauvegarde protege, une archive conserve, un telechargement change le controle. Ces besoins legitimes multiplient les lieux ou une donnee peut survivre.",
        "Une photo peut contenir date, appareil et parfois position. Une capture retire certaines metadonnees, mais cree une nouvelle copie. Le bon reflexe est de penser aux copies avant de publier."
      ],
      mission: ["Cherche ton nom ou un ancien pseudonyme entre guillemets.", "Consulte les informations d'une photo non sensible sans la publier.", "Dessine son arbre de copies: appareil, capture, sauvegarde, cache et partage."],
      reflection: "Quelle version de toi souhaites-tu laisser aux personnes et systemes qui verront tes traces plus tard ?",
      ability: "Capacite debloquee · Footprint Investigator",
      quiz: { question: "Pourquoi un chatbot peut-il donner une fausse réponse convaincante ?", options: ["Il veut toujours mentir", "Il prédit du langage plausible sans garantir chaque fait", "Il ne traite aucun texte", "Il consulte toujours une mauvaise page"], correctIndex: 1, explanation: "La fluidité vient de la prédiction linguistique et ne constitue pas une preuve d'exactitude." }
    }),
    academyLesson({
      id: "your-digital-shadow", order: 8, title: "Your Digital Shadow : combien Internet sait-il de toi ?",
      hook: "Si une IA peut fabriquer ta voix ou ton visage, qu'est-ce qui prouve encore que tu es vraiment toi ?",
      story: "Derniere salle de l'Academie. Une video montre une personne connue prononcant une phrase choquante. Tout semble reel, mais chaque element a ete genere. Dans un monde ou creer devient facile, verifier l'origine, le contexte et la reputation devient essentiel.",
      image: footprintImage, imageAlt: "Identite numerique composee d'images originales, copiees et transformees par intelligence artificielle",
      discoveries: [
        "Ton identite numerique rassemble comptes, emails, pseudonymes, publications, interactions et reputation. Elle n'est pas identique a toi, mais influence ce que les autres attendent de toi.",
        "L'IA generative produit du contenu plausible a partir de structures apprises. Un deepfake peut imiter visage ou voix. La qualite visuelle ne suffit plus: verifie source, date, contexte et confirmations independantes.",
        "Des preuves d'origine et identites numeriques plus fortes apparaitront, mais aucune technologie ne remplace totalement le jugement. Documenter ses creations et ralentir avant de croire sont des superpouvoirs."
      ],
      mission: ["Trouve un contenu IA clairement signale et liste les indices disponibles.", "Recherche la source originale d'une image virale.", "Ecris trois principes pour ton identite numerique et une action pour chacun."],
      reflection: "Dans dix ans, que voudrais-tu que ton historique numerique raconte de tes choix et de tes competences ?",
      ability: "Capacite debloquee · Digital Explorer",
      quiz: { question: "Quel exemple est une empreinte numérique passive ?", options: ["Publier une photo", "Un site mesure la durée de ta visite", "Écrire un commentaire", "Remplir ta bio"], correctIndex: 1, explanation: "La collecte technique en arrière-plan produit une trace passive." }
    }),
    academyLesson({
      id: "business-of-internet", order: 9, title: "The Business of the Internet : qui paie le gratuit ?",
      hook: "Si tu ne paies pas l'application, qui finance les serveurs, les équipes et le service ?",
      story: "L'enquête suit l'argent derrière les interfaces gratuites et révèle comment publicité, abonnement, commission, freemium et économie de l'attention influencent le design.",
      image: twinImage, imageAlt: "Un jeune suit les flux d'attention et d'argent derrière une application gratuite",
      discoveries: ["Tout service numérique possède des coûts.", "L'attention et la prédiction d'audience peuvent avoir une valeur économique.", "L'objectif commercial d'une plateforme n'est pas toujours celui de la personne qui l'utilise."],
      mission: ["Choisis une application gratuite.", "Identifie ses sources de revenus.", "Relie trois choix d'interface à son modèle économique."],
      reflection: "L'objectif de cette application et le tien sont-ils alignés ?",
      ability: "Capacité débloquée · Economy Decoder",
      quiz: { question: "Quel réflexe aide à comprendre un service gratuit ?", options: ["Supposer qu'il n'a aucun coût", "Identifier qui paie et quel comportement rapporte", "Cliquer sur toutes les publicités", "Ignorer son modèle économique"], correctIndex: 1, explanation: "Le modèle économique éclaire les choix de conception et les comportements encouragés." }
    }),
    academyLesson({
      id: "conscious-digital-citizen", order: 10, title: "Becoming a Conscious Digital Citizen",
      hook: "Maintenant que tu vois derrière l'écran, comment choisiras-tu d'y vivre ?",
      story: "La dernière enquête transforme les mécanismes découverts en principes personnels : intention, vérification, consentement, protection des données, diversité des sources, droits et responsabilités.",
      image: "/images/module-1/lesson-1/two-worlds.png", imageAlt: "Une jeune Africaine choisit consciemment son chemin entre plusieurs espaces numériques",
      discoveries: ["Une intention transforme une habitude en choix.", "Publier, commenter et partager ont des conséquences pour les autres.", "Les droits numériques permettent aussi de contrôler, corriger, signaler et contester."],
      mission: ["Écris cinq engagements commençant par Je.", "Ajoute une action mesurable à chacun.", "Applique le premier dès aujourd'hui."],
      reflection: "Quel citoyen numérique veux-tu devenir ?",
      ability: "Capacité débloquée · Conscious Digital Citizen",
      quiz: { question: "Quel principe résume le mieux le Module 1 ?", options: ["Tout croire", "Observer, vérifier et agir avec intention", "Quitter toute technologie", "Toujours suivre la majorité"], correctIndex: 1, explanation: "Une citoyenneté numérique consciente combine compréhension, vérification, choix et responsabilité." }
    })
  ],
  quiz: [
    { id: "internet-network", question: "Quel est le meilleur modele d'Internet ?", options: ["Un nuage sans lieu", "Un reseau mondial de reseaux, machines, cables et organisations", "Une application", "Un serveur unique"], correctIndex: 1, explanation: "Internet est une infrastructure physique et organisationnelle interconnectee.", points: 10 },
    { id: "metadata-clue", question: "Que revelent des metadonnees repetees ?", options: ["Rien", "Des routines, relations et habitudes", "Le mot de passe exact", "Toutes les pensees"], correctIndex: 1, explanation: "Le contexte repete permet de deduire des structures de vie.", points: 10 },
    { id: "data-types", question: "Un interet estime depuis ton temps de visionnage est une donnee...", options: ["declaree", "deduite", "hors ligne", "supprimee"], correctIndex: 1, explanation: "C'est une hypothese calculee depuis un comportement.", points: 10 },
    { id: "attention-business", question: "Quel mecanisme appartient a l'economie de l'attention ?", options: ["Une batterie", "Un fil infini qui prolonge la session", "Un cable", "Un fichier ZIP"], correctIndex: 1, explanation: "Le fil infini reduit les points d'arret.", points: 10 },
    { id: "algorithm-objective", question: "Une recommandation placee en premier est-elle forcement la plus vraie ?", options: ["Toujours", "Non, elle est classee selon les signaux et l'objectif du systeme", "Oui si populaire", "Oui si personnalisee"], correctIndex: 1, explanation: "Le classement optimise un objectif, pas la verite.", points: 10 },
    { id: "passive-footprint", question: "Quel exemple est une empreinte passive ?", options: ["Publier une video", "Un site enregistre l'appareil et la duree de visite", "Ecrire une bio", "Envoyer un commentaire"], correctIndex: 1, explanation: "La collecte technique en arriere-plan produit une trace passive.", points: 10 },
    { id: "deepfake-verification", question: "Comment verifier un contenu potentiellement genere ?", options: ["Regarder les likes", "Verifier source, contexte, date et confirmations independantes", "Lire le premier commentaire", "Le partager"], correctIndex: 1, explanation: "La provenance et la corroboration resistent mieux aux faux plausibles.", points: 10 },
    { id: "business-model", question: "Pourquoi identifier le modele economique d'une application gratuite est-il utile ?", options: ["Cela n'a aucun interet", "Cela eclaire pourquoi certains choix de conception encouragent certains comportements", "Cela change le prix de l'application", "Cela supprime la publicite"], correctIndex: 1, explanation: "Comprendre qui paie et comment aide a repérer pourquoi une application est conçue d'une certaine façon.", points: 10 },
    { id: "conscious-citizen", question: "Quel reflexe resume le mieux une citoyennete numerique consciente ?", options: ["Croire tout ce qui circule", "Observer, verifier et agir avec intention", "Eviter toute technologie", "Suivre systematiquement la majorite"], correctIndex: 1, explanation: "Observer, verifier et agir avec intention relie tous les mecanismes decouverts dans le module.", points: 10 },
    { id: "final-model", question: "Que se passe-t-il vraiment derriere un clic ?", options: ["De la magie", "Infrastructure, traitement, donnees, modeles et influence se succedent", "Aucune trace", "Le telephone agit seul"], correctIndex: 1, explanation: "Ce modele relie infrastructure, donnees, economie, algorithmes et humains.", points: 20 }
  ]
};
