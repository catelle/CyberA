import type { LessonQuizQuestion, ProgramLesson, ProgramModule } from "@/lib/program";

type Spec = {
  id: string; order: number; title: string; hook: string; story: string;
  discoveries: string[]; mission: string[]; reflection: string; ability: string;
  image: string; imageAlt: string; quiz: LessonQuizQuestion;
};

function academyLesson(spec: Spec): ProgramLesson {
  return {
    id: spec.id, order: spec.order, title: spec.title, estimatedMins: 14,
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
  title: "The Digital World",
  subtitle: "Ce qui se passe vraiment derriere ton ecran",
  summary: "Entre a l'Academie, suis les traces invisibles de tes clics et construis une carte mentale claire d'Internet, des donnees, des algorithmes et de ton identite numerique.",
  color: "#1A5276",
  icon: "globe",
  outcomes: ["Suivre un message", "Comprendre la valeur des donnees", "Observer les algorithmes", "Cartographier son empreinte"],
  status: "ready",
  progressPercent: 0,
  lessons: [
    academyLesson({
      id: "ou-est-internet", order: 1, title: "Ou est Internet ?",
      hook: "Tu peux tenir ton telephone dans ta main. Mais peux-tu montrer Internet du doigt ?",
      story: "Premiere mission a l'Academie. Amina ouvre son navigateur a Yaounde et saisit une adresse. La page apparait presque instantanement. Elle imagine que le site vit dans son telephone. En realite, sa demande vient de commencer un voyage physique: ondes radio, antenne, fournisseur d'acces, routeurs, cables terrestres ou sous-marins, puis un ordinateur distant qui prepare la reponse.",
      image: messageImage, imageAlt: "Trajet d'une donnee entre deux telephones, une antenne, des cables et un centre de donnees",
      discoveries: [
        "Internet n'est ni un nuage magique ni un seul ordinateur. C'est un reseau mondial de reseaux. Ton operateur est une porte d'entree; les routeurs sont des carrefours; les cables transportent les paquets; les serveurs conservent ou calculent ce que tu demandes.",
        "Le navigateur est ton outil de lecture. Une application est une interface specialisee. Le DNS ressemble a un carnet d'adresses: il transforme un nom facile a retenir en adresse IP. Le cloud signifie surtout: des ordinateurs distants accessibles par Internet.",
        "Chaque action numerique possede donc une geographie, consomme de l'electricite et traverse des organisations. Une panne locale, un cable endommage ou un serveur lointain peut ralentir un service qui semble vivre dans ta poche."
      ],
      mission: ["Choisis un site courant et note les acteurs probables entre toi et lui.", "Identifie si ton telephone utilise le Wi-Fi ou les donnees mobiles.", "Dessine une route avec appareil, operateur, DNS, routeurs, serveur et reponse."],
      reflection: "Si Internet traverse plusieurs organisations, lesquelles peuvent observer une partie de ton trajet ?",
      ability: "Capacite debloquee · Internet Navigator",
      quiz: { question: "Quand tu ouvres un site, quel enchainement est le plus juste ?", options: ["Le site etait cache dans le telephone", "Le DNS trouve une adresse, des routeurs acheminent la demande et un serveur repond", "L'antenne cree la page", "Le navigateur fabrique Internet"], correctIndex: 1, explanation: "Une requete traverse plusieurs couches avant que le serveur renvoie les donnees." }
    }),
    academyLesson({
      id: "apres-envoyer", order: 2, title: "Que se passe-t-il apres Envoyer ?",
      hook: "Ton message semble sauter directement vers ton ami. Que lui arrive-t-il pendant les millisecondes ou tu ne le vois plus ?",
      story: "Junior envoie une photo dans un groupe. Avant que les coches de livraison apparaissent, son telephone compresse le fichier, l'application prepare les donnees et le message est divise en paquets. Un serveur aide a trouver les destinataires et peut garder une copie le temps de la livraison.",
      image: messageImage, imageAlt: "Paquets lumineux circulant entre deux jeunes et plusieurs infrastructures",
      discoveries: [
        "Un message contient plus que son texte: expediteur, destinataire, heure, taille, appareil et etat de livraison. Ces informations autour du contenu sont des metadonnees.",
        "Le chiffrement de bout en bout peut cacher le contenu aux intermediaires, sans faire disparaitre tous les indices. Le service doit encore acheminer le message et peut connaitre quels comptes communiquent et quand.",
        "Une recherche va vers un moteur qui compare ta requete a un index geant. Un email passe par des serveurs de courrier. Le geste visible est simple, mais les parcours invisibles different."
      ],
      mission: ["Envoie un message test et observe envoi, livraison puis lecture.", "Liste le contenu puis cinq metadonnees possibles.", "Compare le parcours d'un message, d'un email et d'une recherche."],
      reflection: "Sans lire tes messages, que peut-on comprendre en connaissant qui tu contactes, quand et a quelle frequence ?",
      ability: "Capacite debloquee · Data Tracker",
      quiz: { question: "Laquelle de ces informations est une metadonnee ?", options: ["La phrase du message", "L'heure d'envoi et la taille du fichier", "L'emotion du lecteur", "Le sens secret de la discussion"], correctIndex: 1, explanation: "Une metadonnee decrit le contexte ou le trajet du contenu." }
    }),
    academyLesson({
      id: "jumeau-numerique", order: 3, title: "Le jumeau numerique que tu n'as jamais cree",
      hook: "Une plateforme peut-elle te connaitre sans jamais te poser de question ?",
      story: "Amina ne remplit aucun questionnaire. Pourtant, son ecran montre bientot danse, baskets et examens. Chaque recherche, pause, retour en arriere, position approximative et achat ajoute une piece a un portrait statistique: pas une copie parfaite d'Amina, mais un modele qui tente de predire son prochain geste.",
      image: twinImage, imageAlt: "Un jeune face a un jumeau numerique compose de recherches, positions, achats, relations et habitudes",
      discoveries: [
        "Les donnees declarees sont celles que tu fournis. Les donnees observees viennent de ton comportement. Les donnees deduites sont des hypotheses sur tes interets, habitudes ou intentions.",
        "Une prediction n'a pas besoin d'etre toujours vraie pour etre rentable. Si elle augmente un peu la probabilite que tu regardes, cliques ou achetes, elle a deja de la valeur a grande echelle.",
        "Ton jumeau numerique est fragmente entre plusieurs entreprises. Des identifiants, partenaires publicitaires ou connexions de compte peuvent rapprocher certaines pieces du puzzle."
      ],
      mission: ["Consulte la personnalisation publicitaire d'un service et note trois interets supposes.", "Classe cinq exemples en donnees declarees, observees ou deduites.", "Corrige une hypothese fausse et observe les recommandations plusieurs jours."],
      reflection: "Qu'est-ce qui te represente le mieux: ce que tu dis aimer ou ce que tu fais lorsque personne ne semble regarder ?",
      ability: "Capacite debloquee · Profile Detective",
      quiz: { question: "Quelle donnee est deduite ?", options: ["Ton email saisi", "Un interet pour le football estime depuis ton temps de visionnage", "La photo publiee", "Le numero fourni"], correctIndex: 1, explanation: "Une donnee deduite est une conclusion calculee a partir de signaux." }
    }),
    academyLesson({
      id: "prix-du-gratuit", order: 4, title: "Quel est le prix du gratuit ?",
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
      quiz: { question: "Pourquoi les donnees comportementales ont-elles de la valeur publicitaire ?", options: ["Elles remplacent Internet", "Elles aident a predire quelle audience reagira", "Elles rendent toute prediction vraie", "Elles effacent les couts"], correctIndex: 1, explanation: "Predire l'attention ou l'action aide a cibler une audience." }
    }),
    academyLesson({
      id: "ecosystemes", order: 5, title: "Une application n'est jamais seule",
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
      quiz: { question: "Qu'est-ce qu'un ecosysteme numerique ?", options: ["Une application sans compte", "Des produits et services relies par une identite, des donnees et des interfaces", "Un fichier hors ligne", "Un cable seul"], correctIndex: 1, explanation: "L'ecosysteme vient des connexions entre services, comptes et appareils." }
    }),
    academyLesson({
      id: "machine-a-recommandations", order: 6, title: "Pourquoi deux personnes ne voient jamais le meme Internet",
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
      quiz: { question: "Pourquoi deux fils deviennent-ils differents ?", options: ["Internet change au hasard", "Les systemes classent selon des signaux et objectifs propres a chaque profil", "Un employe choisit chaque video", "Ils sont toujours identiques"], correctIndex: 1, explanation: "Les interactions alimentent une boucle de personnalisation." }
    }),
    academyLesson({
      id: "traces-et-copies", order: 7, title: "Supprime ne veut pas toujours dire disparu",
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
      quiz: { question: "Pourquoi une publication supprimee peut-elle encore circuler ?", options: ["Toute suppression est fausse", "Captures, caches, sauvegardes et telechargements ont pu creer d'autres copies", "Le DNS publie les photos", "Le navigateur interdit la suppression"], correctIndex: 1, explanation: "Supprimer l'original ne rappelle pas les copies deja creees." }
    }),
    academyLesson({
      id: "identite-et-futur", order: 8, title: "Qui seras-tu dans le monde numerique de demain ?",
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
      quiz: { question: "Face a une video realiste mais surprenante, quel reflexe est solide ?", options: ["Croire car l'image est nette", "Verifier origine, contexte, date et sources independantes", "Partager avant qu'elle disparaisse", "Se fier aux vues"], correctIndex: 1, explanation: "A l'ere des deepfakes, provenance et corroboration comptent plus que l'apparence." }
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
    { id: "final-model", question: "Que se passe-t-il vraiment derriere un clic ?", options: ["De la magie", "Infrastructure, traitement, donnees, modeles et influence se succedent", "Aucune trace", "Le telephone agit seul"], correctIndex: 1, explanation: "Ce modele relie infrastructure, donnees, economie, algorithmes et humains.", points: 20 }
  ]
};
