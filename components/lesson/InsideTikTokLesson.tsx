"use client";

/* eslint-disable react/no-unescaped-entities -- French investigative copy intentionally uses apostrophes. */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  Clock3,
  Eye,
  Heart,
  Play,
  RotateCcw,
  Share2,
  Sparkles,
} from "lucide-react";

import { CyberMascot } from "@/components/gamified/CyberMascot";
import { SoundToggleButton } from "@/components/lesson/SoundToggleButton";
import {
  playCorrect,
  playLessonOpen,
  playWrong,
  startAmbientLoop,
  stopAmbientLoop,
} from "@/lib/sounds";

type Props = { moduleId: string; lessonId: string; canComplete: boolean };
type Scene = {
  eyebrow: string;
  title: string;
  story: string;
  reveal: string;
  bridge: string;
  image: string;
  question?: string;
  options?: string[];
  correct?: number;
  deepDive?: string;
};

const images = {
  feeds: "/images/module-1/lesson-2/personalized-feeds.png",
  signals: "/images/module-1/lesson-2/behavior-signals.png",
  train: "/images/module-1/lesson-2/train-algorithm.png",
  scroll: "/images/module-1/lesson-2/infinite-scroll.png",
  limits: "/images/module-1/lesson-2/prediction-limits.png",
};

const missions = [
  {
    title: "Mission 1 · De ton geste au signal",
    goal: "Tu vas partir de zéro : comprendre ce qu'est un fil personnalisé, puis voir comment une action simple devient un signal mesurable.",
    win: "Tu sais distinguer une action, sa mesure et le signal produit.",
  },
  {
    title: "Mission 2 · Du signal à la recommandation",
    goal: "Tu vas suivre plusieurs signaux jusqu'à la prédiction, au classement des vidéos et à la boucle qui recommence après chaque réaction.",
    win: "Tu sais reconstruire le moteur de recommandation étape par étape.",
  },
  {
    title: "Mission 3 · Ce que l'algorithme peut — et ne peut pas — savoir",
    goal: "Tu vas voir comment la répétition oriente ton fil, pourquoi une prédiction peut être fausse et comment élargir volontairement tes recommandations.",
    win: "Tu distingues maintenant une prédiction utile d'une vérité sur toi.",
  },
  {
    title: "Mission 4 · Protéger ton attention",
    goal: "Tu vas relier le défilement infini, l'autoplay et la surprise, puis construire un point d'arrêt que l'application ne fournit pas.",
    win: "Tu sais reconnaître la boucle d'attention et poser ta propre limite.",
  },
];

const backstageByMission = [
  "Le lecteur remarque des événements visibles comme le démarrage, la fin, le passage rapide, la relecture, le like ou le partage. Ces événements deviennent des signaux associés à la vidéo et au compte. Pris séparément, ils disent peu; répétés et combinés, ils permettent d'estimer les contenus qui retiennent probablement ton attention.",
  "La plateforme compare plusieurs vidéos possibles et estime, pour chacune, la réaction la plus probable. Elle les met ensuite dans un ordre et affiche d'abord celles qui semblent avoir le plus de chances de t'intéresser. Ta réaction produit de nouveaux signaux, et le classement suivant peut déjà être différent.",
  "Le profil utilisé par la recommandation est une hypothèse construite à partir de régularités. Il ne contient ni tes pensées ni ton intention réelle. Une curiosité passagère peut donc être prise pour un intérêt durable, tandis que des recherches et des choix variés peuvent progressivement ouvrir d'autres directions.",
  "Le défilement continu, la lecture automatique et l'arrivée imprévisible d'une vidéo très intéressante suppriment les pauses naturelles. Cette conception facilite la continuation sans t'obliger à choisir consciemment. Une intention précise, une minuterie et un point d'arrêt décidé avant d'ouvrir l'application redonnent une limite claire.",
];

const s = (
  eyebrow: string,
  title: string,
  story: string,
  reveal: string,
  bridge: string,
  image: string,
  question?: string,
  options?: string[],
  correct?: number,
  deepDive?: string,
): Scene => ({
  eyebrow,
  title,
  story,
  reveal,
  bridge,
  image,
  question,
  options,
  correct,
  deepDive,
});

const scenes: Scene[] = [
  s(
    "Étape 1 · Le point de départ",
    "Ton fil TikTok n'est pas une liste fixe.",
    "Quand tu ouvres TikTok, l'application ne te montre jamais l'ensemble de ses vidéos : elle choisit une petite sélection parmi des millions de contenus disponibles à cet instant précis. Cette sélection porte un nom, ton fil « Pour toi », et elle n'est jamais identique d'un compte à l'autre — même entre deux amis assis côte à côte, qui ouvrent l'application à la même seconde.",
    "Première idée : TikTok construit un fil personnalisé pour chaque compte.",
    "Nous savons ce que TikTok fabrique. Découvrons maintenant les informations qu'il utilise.",
    images.feeds,
    undefined,
    undefined,
    undefined,
    "Concrètement, quand tu ouvres l'application, une fonction (une petite unité de code réutilisable, un peu comme une recette) — appelons-la getRecommendedVideos(tonCompte) — se déclenche sur les serveurs de TikTok. Cette fonction n'a jamais accès à « toutes les vidéos » d'un coup : elle interroge une immense base de données, en extrait quelques centaines de candidates possibles pour toi, puis les classe avant de renvoyer les dix ou vingt premières à ton téléphone. Ton téléphone ne fait qu'afficher le résultat de ce calcul distant — il ne choisit rien lui-même.",
  ),
  s(
    "Étape 2 · Une action devient une donnée",
    "TikTok observe ce que tu fais, pas ce que tu penses.",
    "Imagine que tu tombes sur une vidéo de 20 secondes. Si tu la regardes en entier, TikTok ne sait pas que tu l'as trouvée drôle, touchante ou juste captivante : il sait seulement que tu es resté 20 secondes sur 20. Cette simple mesure, sans aucune explication derrière, devient une information exploitable qu'on appelle un signal.",
    "Une action mesurable devient une donnée appelée signal.",
    "Avant de parler d'algorithme, vérifions que tu reconnais un signal.",
    images.signals,
    "Laquelle de ces informations est un signal mesurable ?",
    [
      "Tu as trouvé la vidéo drôle",
      "Tu as regardé 20 secondes sur 20",
      "Tu pensais à ton ami",
      "Tu étais de bonne humeur",
    ],
    1,
    "Le lecteur vidéo contient plusieurs petits bouts de code appelés « écouteurs d'événements » : l'un se déclenche automatiquement quand la vidéo démarre (onVideoStart), un autre plusieurs fois par seconde pendant que tu regardes (onProgress), un dernier quand elle arrive à sa fin (onVideoComplete). Chacune de ces fonctions envoie un petit message aux serveurs avec l'heure exacte et le nombre de secondes regardées. C'est ce mécanisme précis — pas une intuition — qui permet à TikTok de savoir que tu as regardé 20 secondes sur 20.",
  ),
  s(
    "Étape 3 · Les signaux essentiels",
    "Regarder, revoir, aimer et passer n'ont pas le même sens.",
    "Lorsque tu restes longtemps sur une vidéo, tu envoies un signal d'attention presque malgré toi. Si en plus tu la relances pour la revoir, ce signal se renforce encore. Aimer ou partager va plus loin : c'est un geste volontaire qui confirme clairement l'intérêt. À l'inverse, quand tu passes une vidéo en une fraction de seconde, tu racontes l'histoire opposée — elle ne t'a probablement pas retenu.",
    "TikTok compare plusieurs signaux au lieu de lire un seul bouton.",
    "Commençons par le signal le plus discret : le temps.",
    images.signals,
    undefined,
    undefined,
    undefined,
    "Chaque geste que tu fais est relié à sa propre petite fonction : appuyer sur le cœur déclenche quelque chose comme onLikeButtonPress(), swiper trop vite déclenche onQuickSwipe(), relancer la vidéo déclenche onReplay(). Le code ne « comprend » aucun de ces gestes au sens humain : il enregistre juste, pour chaque fonction déclenchée, un mot-clé (« like », « replay », « swipe_fast ») associé à l'identifiant de la vidéo et de ton compte, dans une immense table de données.",
  ),
  s(
    "Étape 4 · Le temps de visionnage",
    "Plus tu restes, plus le signal devient précis.",
    "Voir une vidéo pendant une seule seconde ne prouve presque rien : ton pouce a peut-être simplement glissé trop vite pour s'arrêter. Mais si tu regardes une vidéo de football jusqu'au bout, puis que tu la relances pour la revoir, tu apportes une deuxième preuve bien plus solide que la première. C'est exactement pour cette raison que le temps de visionnage pèse autant dans le calcul du signal.",
    "Finir puis revoir fournit généralement un signal plus fort qu'une simple apparition.",
    "Applique cette règle à un cas concret.",
    images.signals,
    "Quel comportement indique l'attention la plus forte ?",
    [
      "Passer après une seconde",
      "Finir la vidéo puis la revoir",
      "Ouvrir TikTok",
      "Baisser la luminosité",
    ],
    1,
    "En coulisses, une fonction calcule en continu un pourcentage : secondesRegardées ÷ duréeTotaleDeLaVidéo. Le code compare ensuite ce chiffre à des seuils fixés à l'avance dans le programme — par exemple, si ce pourcentage dépasse 0,9 (90 %), une variable interne du type forteAttention passe à « vraie ». C'est cette variable, pas une impression, qui pèse ensuite dans le calcul final du signal.",
  ),
  s(
    "Checkpoint 1 · Du geste au signal",
    "Vérifie la première partie du mécanisme.",
    "Depuis le début de cette enquête, tu as vu ton fil se personnaliser et chacune de tes actions se transformer en signal mesurable. Retiens bien une chose avant d'aller plus loin : aucun de ces signaux ne révèle directement ce que tu penses réellement — seulement ce que tu fais.",
    "Chaîne apprise : action → mesure → signal.",
    "Voyons maintenant comment plusieurs signaux deviennent une recommandation.",
    images.signals,
    "Que sait TikTok quand tu termines une vidéo ?",
    [
      "La raison exacte de ton intérêt",
      "Que la vidéo a retenu ton attention",
      "Toutes tes pensées",
      "Que tu veux l'acheter",
    ],
    1,
  ),
  s(
    "Étape 5 · Rassembler les indices",
    "Un signal seul ne suffit pas.",
    "Tu peux très bien regarder une vidéo jusqu'au bout par simple curiosité, sans jamais vouloir la revoir ni l'aimer. C'est justement pour cette raison que TikTok ne se fie jamais à un seul geste isolé : il rassemble la durée de visionnage, la relecture, le like, le partage, le commentaire et même le passage rapide, pour construire une image plus fiable de ce qui t'intéresse vraiment.",
    "Une combinaison répétée est plus informative qu'une action isolée.",
    "Voyons comment le système utilise cette combinaison.",
    images.train,
    undefined,
    undefined,
    undefined,
    "Toutes ces informations séparées (temps regardé, relecture, like, partage, vitesse de passage) sont rassemblées par une fonction dans ce qu'on appelle un « vecteur de caractéristiques » — en clair, une simple liste de nombres, un peu comme une fiche de notes, qui résume tout ce que le code sait sur ta réaction à une vidéo précise. C'est cette liste de nombres, et seulement elle, qui est transmise à l'étape suivante du programme.",
  ),
  s(
    "Étape 6 · Faire une prédiction",
    "L'algorithme essaie de deviner ta prochaine réaction.",
    "En s'appuyant sur tous les signaux que tu as laissés par le passé, le système essaie de deviner à l'avance ta réaction devant plusieurs vidéos candidates : vas-tu rester ou passer vite, aimer ou ignorer, partager ou oublier ?",
    "Une recommandation est une prédiction, pas une certitude.",
    "Il reste à choisir entre plusieurs prédictions.",
    images.train,
    undefined,
    undefined,
    undefined,
    "Cette liste de nombres est envoyée à un modèle de classement : un programme mathématique entraîné à l'avance sur des milliards d'exemples passés, qui prend cette liste en entrée et renvoie un seul chiffre en sortie — un score de probabilité, par exemple « 0,82 » pour dire « cette personne a 82 % de chances de rester jusqu'au bout de cette vidéo ». Ce score n'est ni une certitude ni une pensée : c'est purement le résultat d'un calcul.",
  ),
  s(
    "Étape 7 · Classer les vidéos",
    "Le meilleur score prédit passe en premier.",
    "Imagine que trois vidéos candidates s'affrontent pour occuper ta prochaine place : football, cuisine et danse. Si tes signaux passés donnent au football le score d'attention prédit le plus élevé, c'est cette vidéo de football qui remporte la première place dans ton fil.",
    "TikTok classe les vidéos selon la réaction qu'il prédit.",
    "Puis il vérifie sa prédiction grâce à ta réaction.",
    images.train,
    undefined,
    undefined,
    undefined,
    "Une fois que chaque vidéo candidate a reçu son score, une simple fonction de tri (un peu comme trieByScore()) les range du score le plus élevé au plus bas — exactement comme trier une liste de notes d'élèves du plus grand au plus petit. La vidéo avec le score le plus haut devient tout simplement la première que ton téléphone affiche.",
  ),
  s(
    "Étape 8 · La boucle d'apprentissage",
    "TikTok montre, tu réagis, TikTok ajuste.",
    "Le système commence par te montrer une vidéo. Ta réaction — que tu la regardes, la passes ou la partages — produit aussitôt de nouveaux signaux. Ces signaux modifient à leur tour le classement de la vidéo suivante. Et cette boucle recommence, silencieusement, à chaque geste que tu fais.",
    "Boucle : recommandation → action → signal → nouvelle recommandation.",
    "Identifie qui alimente cette boucle.",
    images.train,
    "Qui fournit les nouveaux signaux à chaque tour ?",
    [
      "Uniquement les créateurs",
      "Toi, par tes actions",
      "La batterie",
      "Le hasard",
    ],
    1,
    "À chaque fois que tu réagis à une vidéo, les fonctions vues plus haut (onProgress, onLikeButtonPress...) renvoient de nouvelles données aux serveurs. Une fonction de mise à jour reprend alors le modèle de classement et ajuste légèrement ses calculs internes pour mieux prédire la prochaine fois. C'est ce cycle — observer, calculer un score, te montrer un résultat, observer ta réaction, ajuster — qui tourne en boucle, des centaines de fois par jour, sans jamais s'arrêter.",
  ),
  s(
    "Checkpoint 2 · Construire une recommandation",
    "Remets le mécanisme dans le bon ordre.",
    "Une action devient un signal. Le signal aide à classer les vidéos. La vidéo choisie provoque ensuite une nouvelle action, qui relance tout le cycle.",
    "Tu peux expliquer le moteur sans dire qu'il lit les pensées.",
    "Voyons ce que cette boucle change dans ton fil.",
    images.train,
    "Quel ordre est correct ?",
    [
      "Pensée → magie → vidéo",
      "Action → signal → prédiction → vidéo",
      "Vidéo → batterie → hasard",
      "Like → vérité absolue",
    ],
    1,
  ),
  s(
    "Étape 9 · La répétition renforce un sujet",
    "Tes habitudes donnent une direction à ton fil.",
    "Si tu regardes plusieurs vidéos de football jusqu'au bout d'affilée, le système n'y voit pas un hasard : il observe une régularité. Il commence alors à te proposer davantage de vidéos proches du football, pour vérifier si ton attention se confirme dans la durée.",
    "Des signaux répétés renforcent une hypothèse d'intérêt.",
    "Mais cette hypothèse peut encore être fausse.",
    images.feeds,
    undefined,
    undefined,
    undefined,
    "Le code garde une sorte de moyenne mobile pour chaque thème (football, cuisine, danse...) associée à ton compte. Chaque nouvel événement lié au football fait légèrement augmenter cette moyenne, stockée dans une variable interne. Plus cette moyenne est élevée, plus le score calculé pour de nouvelles vidéos de football sera haut la prochaine fois — un simple calcul cumulatif, pas une compréhension de ta passion.",
  ),
  s(
    "Étape 10 · Une prédiction peut se tromper",
    "Regarder ne signifie pas toujours aimer.",
    "Imagine que tu regardes une recette en entier simplement pour aider ta mère à la préparer, ou que tu revois une vidéo parce que tu n'as rien compris la première fois. Dans les deux cas, TikTok enregistre exactement le même geste — regarder, revoir — sans jamais connaître la vraie raison qui se cache derrière.",
    "Le profil calculé est une estimation qui évolue, pas ton identité.",
    "Que se passe-t-il si la même estimation se renforce trop longtemps ?",
    images.limits,
    undefined,
    undefined,
    undefined,
    "Le problème, c'est que ces fonctions n'enregistrent jamais le pourquoi — seulement le geste. Il n'existe aucune variable appelée « raison » ou « intention » dans ce système, seulement des chiffres comme secondesRegardées ou aRevu. Le code traite donc de façon identique quelqu'un qui adore une recette et quelqu'un qui la regarde en entier juste pour aider sa mère, parce que ces deux situations produisent exactement les mêmes événements mesurés.",
  ),
  s(
    "Étape 11 · Le fil peut se rétrécir",
    "Plus d'un sujet peut cacher les autres.",
    "Lorsqu'un même thème reçoit régulièrement de bons signaux de ta part, TikTok t'en propose de plus en plus. Petit à petit, ton écran devient moins varié — non pas parce que les autres sujets ont disparu, mais simplement parce qu'ils te sont de moins en moins montrés.",
    "Une boucle de recommandations peut limiter ce que tu rencontres.",
    "Heureusement, tu peux envoyer de nouveaux signaux.",
    images.limits,
    undefined,
    undefined,
    undefined,
    "Comme la fonction de tri favorise toujours le score le plus élevé, et que ce score grimpe pour les thèmes déjà renforcés, le système va mécaniquement proposer de plus en plus de contenus similaires — non pas parce qu'il « décide » de te limiter, mais simplement parce que c'est le résultat logique d'un tri qui privilégie toujours ce qui a le mieux marché avant.",
  ),
  s(
    "Étape 12 · Corriger la direction",
    "Tu peux entraîner ton fil volontairement.",
    "Si tu recherches volontairement un autre sujet, que tu regardes ces nouveaux contenus jusqu'au bout et que tu passes rapidement ceux que tu ne veux plus voir, tu envoies de nouveaux signaux au système. Petit à petit, ces actions répétées modifient réellement les prédictions faites à ton sujet.",
    "Changer tes actions change les données utilisées par le système.",
    "Choisis l'action qui élargit réellement un fil.",
    images.limits,
    "Quelle action diversifie le mieux ton fil ?",
    [
      "Regarder toujours le même thème",
      "Chercher volontairement d'autres sources et sujets",
      "Ne jamais utiliser les contrôles",
      "Croire chaque recommandation",
    ],
    1,
    "Quand tu cherches volontairement un nouveau sujet et regardes ces vidéos jusqu'au bout, tu déclenches les mêmes fonctions (onVideoComplete, onSearch) mais pour un nouveau thème. La moyenne mobile de ce nouveau thème augmente à son tour dans le code, et son score de classement grimpe progressivement — exactement le même mécanisme que celui qui t'avait enfermé dans une bulle, mais utilisé volontairement dans l'autre sens.",
  ),
  s(
    "Checkpoint 3 · Prédire n'est pas comprendre",
    "Pose une limite claire à l'algorithme.",
    "TikTok repère des régularités et prédit certaines réactions à partir d'elles. Mais il peut aussi se tromper, car il ne connaît jamais vraiment ton contexte du moment ni ton intention réelle.",
    "Une bonne prédiction n'est pas une compréhension de ta pensée.",
    "Voyons pourquoi il est parfois difficile d'arrêter la boucle.",
    images.limits,
    "Quelle phrase est correcte ?",
    [
      "TikTok connaît toujours ta raison",
      "TikTok prédit à partir de signaux avec des erreurs possibles",
      "TikTok lit toutes tes pensées",
      "TikTok n'utilise aucune donnée",
    ],
    1,
  ),
  s(
    "Étape 13 · Une suite sans fin",
    "Le défilement infini retire le point d'arrêt.",
    "Un livre a toujours une dernière page qui te signale que l'histoire est terminée. Dans ton fil, au contraire, une nouvelle vidéo apparaît chaque fois que ton doigt glisse vers le haut. Aucun écran ne te dit jamais naturellement que tu as fini de regarder.",
    "Sans fin visible, s'arrêter demande une décision volontaire.",
    "Un deuxième mécanisme facilite encore la continuation.",
    images.scroll,
    undefined,
    undefined,
    undefined,
    "Techniquement, la liste de vidéos déjà téléchargée par ton téléphone n'est jamais la liste complète : c'est une fonction, disons loadMoreVideos(), qui se déclenche automatiquement dès que tu approches du bas de la liste chargée, et qui va chercher un nouveau lot de vidéos sur le serveur. Il n'existe littéralement aucune ligne de code qui dise « fin de liste » — cette fonction peut être rappelée indéfiniment.",
  ),
  s(
    "Étape 14 · La vidéo suivante démarre seule",
    "La lecture automatique réduit l'effort.",
    "Dès qu'une vidéo se termine, la suivante démarre toute seule, sans que tu aies rien demandé. Continuer à regarder ne te coûte donc aucun effort particulier, alors que partir exige au contraire un geste volontaire pour interrompre le mouvement déjà lancé.",
    "L'autoplay rend continuer plus facile que s'arrêter.",
    "Pourquoi rester après plusieurs vidéos moyennes ?",
    images.scroll,
    undefined,
    undefined,
    undefined,
    "Dès que la fonction onVideoComplete se déclenche, elle appelle immédiatement une autre fonction, playNextVideo(), sans attendre aucune action de ta part. C'est un simple enchaînement de fonctions programmées à l'avance — une fonction qui en appelle une autre automatiquement — qui remplace ce qui, avant, nécessitait un geste volontaire de ta part.",
  ),
  s(
    "Étape 15 · La surprise entretient l'attente",
    "La prochaine vidéo pourrait être excellente.",
    "Après deux vidéos plutôt ordinaires, une vidéo hilarante peut soudain apparaître. Comme tu ne peux jamais prédire à l'avance quand cette bonne surprise va arriver, ton pouce continue de glisser, juste pour vérifier une fois de plus.",
    "Défilement infini, autoplay et surprise travaillent ensemble.",
    "Vérifie que tu reconnais cette combinaison.",
    images.scroll,
    "Quelle combinaison prolonge une session ?",
    [
      "Défilement infini, autoplay et récompense imprévisible",
      "Écran éteint et mode avion",
      "Minuterie et pause",
      "Application fermée",
    ],
    0,
    "Le score de classement n'est jamais purement stable : les concepteurs ajoutent volontairement un peu de variation (souvent appelée « exploration ») dans le calcul, pour tester de temps en temps des vidéos différentes de tes habitudes. Résultat : le code lui-même ne « sait » pas à l'avance si la prochaine vidéo sera exceptionnelle ou ordinaire — cette incertitude est une conséquence directe de la façon dont la fonction de classement est programmée, pas un hasard magique.",
  ),
  s(
    "Étape 16 · Créer ton point d'arrêt",
    "Ajoute la limite que l'application a retirée.",
    "Avant même d'ouvrir TikTok, choisis une intention précise et une durée limitée. Programme une minuterie extérieure à l'application, et quand elle sonne, ferme réellement l'application avant de décider — au calme, loin du défilement — si tu veux vraiment continuer.",
    "Une limite préparée à l'avance protège mieux qu'une décision prise en plein défilement.",
    "Rassemblons tout le parcours en une méthode simple.",
    images.scroll,
    undefined,
    undefined,
    undefined,
    "Puisque le code de l'application ne contient aucune fonction qui dise naturellement « tu devrais arrêter maintenant », la seule limite fiable est celle que tu ajoutes toi-même, en dehors de l'application — une minuterie sur ton téléphone, par exemple, qui n'est pas connectée aux mêmes fonctions et ne peut donc pas être influencée par le système de recommandation.",
  ),
  s(
    "Checkpoint final · Algorithm Investigator",
    "Tu ne vois plus seulement des vidéos. Tu vois la boucle.",
    "Tu sais maintenant qu'un fil est personnel, que chacun de tes gestes devient un signal, que certains choix de conception cherchent à retenir ton attention, et que la machine peut malgré tout se tromper. Il te reste à choisir le réflexe qui te rend vraiment autonome face à elle.",
    "Un CyberAmbassador demande comment le système fonctionne, ce qu'il apprend de lui et comment l'utiliser avec intention.",
    "Réponds, puis rejoins Coach Cyber dans le quiz final pour débloquer la prochaine enquête.",
    images.limits,
    "Quel réflexe montre que tu reprends les commandes ?",
    [
      "Regarder sans jamais questionner le fil",
      "Croire que chaque recommandation dit la vérité",
      "Observer les signaux, fixer une intention et explorer d'autres sources",
      "Essayer de mémoriser toutes les vidéos",
    ],
    2,
    "Derrière chaque vidéo qui apparaît sous ton doigt, il y a une chaîne concrète de fonctions connectées entre elles : des écouteurs d'événements qui mesurent tes gestes, des fonctions qui calculent des scores, une fonction de tri qui classe les résultats, et des fonctions qui enchaînent automatiquement la vidéo suivante. Ce n'est ni magique ni mystérieux : c'est du code, écrit par des personnes, qui exécute exactement ce qu'on lui a demandé de faire.",
  ),
];

const MIN_SECONDS = 15;

export function InsideTikTokLesson({ moduleId, lessonId, canComplete }: Props) {
  const [welcomed, setWelcomed] = useState(false);
  const [index, setIndex] = useState(0);
  const [briefed, setBriefed] = useState<number[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [toast, setToast] = useState<"good" | "bad" | null>(null);
  const [watchSeconds, setWatchSeconds] = useState(20);
  const group = Math.floor(index / 5);
  const scene = scenes[index];
  const showBriefing = !briefed.includes(group);
  const answered = scene.correct === undefined || choice === scene.correct;
  const timeReady = seconds >= MIN_SECONDS;

  useEffect(() => {
    setSeconds(0);
    setChoice(null);
    setToast(null);
    setWatchSeconds(20);
    if (showBriefing) return;
    const timer = window.setInterval(
      () => setSeconds((v) => Math.min(MIN_SECONDS, v + 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [index, showBriefing]);

  useEffect(() => stopAmbientLoop, []);

  const remaining = useMemo(
    () => Math.max(0, MIN_SECONDS - seconds),
    [seconds],
  );
  const signalStrength = Math.min(
    100,
    Math.round((watchSeconds / 20) * 68) + (watchSeconds === 20 ? 14 : 0),
  );
  const choose = (value: number) => {
    setChoice(value);
    if (value === scene.correct) playCorrect();
    else playWrong();
    setToast(value === scene.correct ? "good" : "bad");
    window.setTimeout(() => setToast(null), 2800);
  };
  const next = () => {
    if (index < scenes.length - 1 && answered && timeReady)
      setIndex((v) => v + 1);
  };

  return (
    <section className="overflow-hidden rounded-2xl border-2 border-secondary bg-[#fff9f8] text-[#19222d] shadow-[0_8px_0_0_#586062]">
      <SoundToggleButton />
      <header className="border-b border-[#8f1237] bg-[#bf1645] px-5 py-4 text-white">
        <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.14em]">
          <span>Inside TikTok · enquête approfondie</span>
          <span>
            {index + 1}/{scenes.length}
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#730e2c]/60">
          <div
            className="h-full rounded-full bg-[#ffd4dc] transition-all duration-500 after:block after:h-full after:w-1/3 after:animate-[progress-sheen_2s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent"
            style={{ width: `${((index + 1) / scenes.length) * 100}%` }}
          />
        </div>
      </header>

      {!welcomed ? (
        <div className="relative grid min-h-[650px] place-items-center overflow-hidden p-6 text-center sm:p-10">
          <Image
            alt="Deux jeunes découvrent les mécanismes invisibles qui personnalisent leur fil vidéo"
            className="object-cover object-center opacity-70"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            src={images.feeds}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080d22]/70 via-[#171b1c]/55 to-[#080d22]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,13,34,.48)_72%)]" />
          <div className="relative max-w-4xl animate-[mission-card-in_.45s_ease-out] text-white">
            <div className="mx-auto mb-5 flex w-fit items-center gap-3 rounded-full border border-[#ff9bae]/40 bg-[#080d22]/70 px-4 py-2 backdrop-blur-md">
              <CyberMascot mood="cheer" size="sm" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ffb3c1]">
                Bienvenue dans ta formation CyberAmbassador
              </span>
            </div>
            <h2 className="text-shadow mt-3 font-display text-4xl font-black uppercase leading-none sm:text-6xl">
              Entre dans
              <br />
              <span className="text-[#ff9bae]">TikTok</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/90 drop-shadow-md">
              Tu ouvres TikTok et une vidéo apparaît immédiatement. Elle n'est
              pas arrivée là par hasard. Pendant cette leçon, tu vas découvrir
              comment TikTok choisit cette vidéo, ce qu'il déduit de tes gestes
              et comment ses choix peuvent influencer ton attention, tes envies
              et même ta vision du monde.
            </p>
            <div className="mx-auto mt-6 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
              <div className="rounded-xl border border-[#ff9bae]/35 bg-[#080d22]/75 p-4 backdrop-blur-md">
                <span className="text-xs font-black uppercase tracking-wider text-[#ff9bae]">
                  1 · La sélection
                </span>
                <p className="mt-2 font-bold">
                  Tu découvriras comment TikTok choisit ta prochaine vidéo.
                </p>
              </div>
              <div className="rounded-xl border border-[#ff9bae]/35 bg-[#080d22]/75 p-4 backdrop-blur-md">
                <span className="text-xs font-black uppercase tracking-wider text-[#ff9bae]">
                  2 · L'apprentissage
                </span>
                <p className="mt-2 font-bold">
                  Tu verras comment chaque geste entraîne ses prédictions.
                </p>
              </div>
              <div className="rounded-xl border border-[#ff9bae]/35 bg-[#080d22]/75 p-4 backdrop-blur-md">
                <span className="text-xs font-black uppercase tracking-wider text-[#ff9bae]">
                  3 · Ton pouvoir
                </span>
                <p className="mt-2 font-bold">
                  Tu apprendras à protéger ton attention et élargir ce que tu
                  vois.
                </p>
              </div>
            </div>
            <p className="mx-auto mt-6 max-w-2xl rounded-xl border border-[#ff9bae]/30 bg-[#080d22]/70 p-4 font-bold leading-7 text-white/90 backdrop-blur-md">
              Cette enquête avance en quatre missions de cinq scènes. À la fin,
              TikTok ne te semblera plus magique : tu pourras expliquer son
              moteur de recommandation, reconnaître ce qui cherche à retenir ton
              attention et envoyer des signaux plus volontaires au lieu de
              laisser ton pouce décider seul.
            </p>
            <button
              className="mt-8 rounded-xl border-2 border-white bg-[#bf1645] px-7 py-4 font-black text-white shadow-[0_4px_0_#fff] transition hover:-translate-y-1"
              onClick={() => {
                playLessonOpen();
                startAmbientLoop();
                setWelcomed(true);
              }}
            >
              Entre dans TikTok <ArrowRight className="ml-2 inline h-4 w-4" />
            </button>
          </div>
        </div>
      ) : showBriefing ? (
        <div className="grid min-h-[650px] place-items-center bg-gradient-to-br from-[#fff8f6] via-white to-[#ffe8ed] p-6 text-center">
          <div className="max-w-2xl animate-[mission-card-in_.45s_ease-out]">
            <CyberMascot
              className="mx-auto"
              mood={group === 5 ? "celebrate" : "focus"}
              size="lg"
            />
            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#bf1645]">
              Briefing de Coach Cyber
            </p>
            <h2 className="mt-3 font-display text-3xl font-black text-[#19222d] sm:text-5xl">
              {missions[group].title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg font-semibold leading-8 text-[#4d5968]">
              {missions[group].goal}
            </p>
            <button
              className="mt-8 rounded-xl border-2 border-white bg-[#bf1645] px-7 py-4 font-black text-white shadow-[0_4px_0_#a33] transition hover:-translate-y-1"
              onClick={() => setBriefed((v) => [...v, group])}
            >
              Je suis prêt <ArrowRight className="ml-2 inline h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          {toast ? (
            <div
              className={`fixed right-5 top-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border-2 border-white p-4 font-black text-white shadow-2xl animate-[mission-card-in_.3s_ease-out] ${toast === "good" ? "bg-[#087f67]" : "bg-[#8f1237]"}`}
            >
              <CyberMascot
                mood={toast === "good" ? "celebrate" : "sad"}
                size="sm"
              />
              <span>
                {toast === "good"
                  ? `${missions[group].win} La piste suivante est ouverte.`
                  : "Pas encore. Reviens aux indices de cette scène et essaie autrement."}
              </span>
            </div>
          ) : null}
          <div className="inside-tiktok-stage mx-auto grid max-w-5xl gap-6 p-4 sm:p-6 lg:p-8">
            <figure className="inside-tiktok-visual group relative h-[220px] overflow-hidden rounded-2xl border border-[#ff668d]/60 bg-[#080d22] shadow-[0_16px_45px_rgba(46,8,25,.22)] sm:h-[280px] lg:h-[320px]">
              <Image
                alt="Illustration cinématographique de l'enquête Inside TikTok"
                className="inside-tiktok-camera h-full w-full object-cover object-center opacity-80"
                fill
                priority={index < 2}
                sizes="(min-width: 1024px) 960px, 100vw"
                src={scene.image}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b1d] via-[#070b1d]/5 to-[#070b1d]/45" />
              <div
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden"
              >
                {Array.from({ length: 12 }, (_, particle) => (
                  <i
                    className="tiktok-particle"
                    key={particle}
                    style={
                      {
                        "--particle-delay": `${particle * -0.7}s`,
                        "--particle-x": `${8 + ((particle * 29) % 84)}%`,
                        "--particle-size": `${3 + (particle % 3) * 2}px`,
                      } as React.CSSProperties
                    }
                  />
                ))}
                <div className="tiktok-signal-path is-active">
                  <span />
                </div>
                <div className="tiktok-ai-core is-thinking">
                  <BrainCircuit className="h-7 w-7" />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="tiktok-hud is-visible left-[6%] top-[8%]">
                  <Play className="h-3.5 w-3.5" /> Vidéo affichée
                </div>
                <div className="tiktok-hud is-visible left-[8%] top-[18%]">
                  <Eye className="h-3.5 w-3.5 text-[#38bdf8]" />{" "}
                  {index === 1 ? `${watchSeconds}/20 s` : "Attention mesurée"}
                </div>
                <div className="tiktok-hud is-visible right-[6%] top-[10%]">
                  <RotateCcw className="h-3.5 w-3.5 text-[#c084fc]" /> Relecture
                </div>
                <div className="tiktok-hud is-visible bottom-[12%] right-[6%]">
                  <Sparkles className="h-3.5 w-3.5 text-[#facc15]" /> Hypothèse
                  affinée
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <span className="rounded-full border border-white/25 bg-[#080d22]/75 px-3 py-1.5 text-xs font-black text-white shadow-sm backdrop-blur">
                  Indice vivant · observe le réseau
                </span>
                <span className="hidden text-[10px] font-black uppercase tracking-[.18em] text-white/60 sm:block">
                  Données en mouvement
                </span>
              </div>
            </figure>
            <div className="min-w-0 animate-[mission-card-in_.45s_ease-out] rounded-2xl border border-[#ead0d6] bg-white/70 p-4 shadow-[0_12px_35px_rgba(79,9,32,.06)] sm:p-6 lg:p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#bf1645]">
                Scène {index + 1} · {scene.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-[#111827] sm:text-4xl">
                {scene.title}
              </h2>
              <div className="relative mt-5 overflow-hidden rounded-2xl border border-[#d9c3ca] bg-white/90 p-5 shadow-[0_12px_35px_rgba(79,9,32,.08)]">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[.2em] text-[#9b1c43]">
                  Rapport d'observation
                </p>
                <p
                  className="lesson-beat-enter text-base font-bold leading-7 text-[#3f4855] sm:text-lg sm:leading-8"
                  key={index}
                >
                  {scene.story}
                </p>
              </div>
              {index === 1 ? (
                <div className="mt-4 rounded-2xl border border-[#38bdf8]/35 bg-[#081329] p-4 text-white shadow-lg">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-black uppercase tracking-widest text-[#7dd3fc]">
                      Teste le temps de visionnage
                    </span>
                    <strong className="text-xl">{watchSeconds} s</strong>
                  </div>
                  <input
                    aria-label="Temps de visionnage"
                    className="mt-3 w-full accent-[#38bdf8]"
                    max="20"
                    min="1"
                    onChange={(event) =>
                      setWatchSeconds(Number(event.target.value))
                    }
                    type="range"
                    value={watchSeconds}
                  />
                  <div className="mt-2 flex items-center justify-between text-xs font-bold text-white/65">
                    <span>Signal faible</span>
                    <span>Confiance {signalStrength}%</span>
                    <span>Signal fort</span>
                  </div>
                </div>
              ) : null}
              <div className="evidence-card mt-4 rounded-2xl border border-[#f4c95d] bg-[#161323] p-5 text-white shadow-[0_10px_35px_rgba(91,62,0,.18)]">
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#f4c95d]">
                  <Sparkles className="h-4 w-4" />
                  Preuve collectée
                </p>
                <p className="mt-2 font-bold leading-7 text-white/90">
                  {scene.reveal}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-wider">
                  <span className="rounded-full bg-[#38bdf8]/15 px-3 py-1 text-[#7dd3fc]">
                    Visionnage
                  </span>
                  <span className="rounded-full bg-[#c084fc]/15 px-3 py-1 text-[#d8b4fe]">
                    Relecture
                  </span>
                  <span className="rounded-full bg-[#fb7185]/15 px-3 py-1 text-[#fda4af]">
                    <Heart className="mr-1 inline h-3 w-3" />
                    Action
                  </span>
                  <span className="rounded-full bg-[#4ade80]/15 px-3 py-1 text-[#86efac]">
                    <Share2 className="mr-1 inline h-3 w-3" />
                    Partage
                  </span>
                </div>
              </div>
              <p className="mt-5 border-l-4 border-[#bf1645] bg-white/75 py-3 pl-4 pr-3 text-lg font-black italic leading-8 text-[#3b2730] shadow-sm">
                {scene.bridge}
              </p>
              {scene.options ? (
                <div className="mt-5 grid gap-2">
                  <p className="mb-1 text-lg font-black text-[#8f1237]">
                    {scene.question}
                  </p>
                  {scene.options.map((option, optionIndex) => (
                    <button
                      className={`rounded-xl border-2 px-4 py-3 text-left font-bold shadow-sm transition duration-200 hover:-translate-y-0.5 ${choice === optionIndex ? (optionIndex === scene.correct ? "border-[#16856d] bg-[#dff8ef] text-[#075d4b]" : "border-[#bf1645] bg-[#ffe5eb] text-[#7d1231]") : "border-[#c9a6af] bg-white text-[#27313d] hover:border-[#bf1645] hover:bg-[#fff5f7]"}`}
                      key={option}
                      onClick={() => choose(optionIndex)}
                    >
                      {String.fromCharCode(65 + optionIndex)}. {option}
                    </button>
                  ))}
                </div>
              ) : null}
              {index === 27 ? (
                <div className="mt-5 grid gap-2 rounded-xl bg-[#e7f8f2] p-4 text-sm font-bold">
                  <span>
                    <Check className="mr-2 inline h-4 w-4 text-[#16856d]" />
                    Choisis un thème éducatif précis
                  </span>
                  <span>
                    <Check className="mr-2 inline h-4 w-4 text-[#16856d]" />
                    Regarde les contenus utiles jusqu'au bout
                  </span>
                  <span>
                    <Check className="mr-2 inline h-4 w-4 text-[#16856d]" />
                    Note ce que ton fil montre demain
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          <section
            className="border-t border-[#d8c7ff] bg-[#f7f4ff] px-6 py-5 lg:px-8"
            aria-labelledby={`behind-scene-${index}`}
          >
            <div className="mx-auto max-w-5xl">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-[#6d28d9]">
                <BrainCircuit className="h-5 w-5" />
                En coulisses
              </p>
              <h3 className="mt-2 font-display text-xl font-black text-[#17112b]" id={`behind-scene-${index}`}>Ce que fait l'application</h3>
              <p className="mt-3 text-base font-semibold leading-7 text-[#493f62]">{backstageByMission[Math.min(group, backstageByMission.length - 1)]}</p>
              <div className="mt-4 grid gap-3 border-t border-violet-200 pt-4 sm:grid-cols-2">
                <div><p className="text-xs font-black uppercase tracking-widest text-violet-700">Ce que le système peut savoir</p><p className="mt-1 font-semibold leading-6 text-slate-700">{scene.reveal}</p></div>
                <div><p className="text-xs font-black uppercase tracking-widest text-violet-700">Ce qu'il faut en faire</p><p className="mt-1 font-semibold leading-6 text-slate-700">{scene.bridge}</p></div>
              </div>
            </div>
          </section>
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#ead0d6] bg-white p-4 text-[#27313d]">
            <button
              className="rounded-lg border-2 border-[#68717c] bg-white px-4 py-3 font-bold shadow-[0_3px_0_#aeb4bb] disabled:opacity-30"
              disabled={index === 0}
              onClick={() => setIndex((v) => Math.max(0, v - 1))}
            >
              <ArrowLeft className="mr-2 inline h-4 w-4" />
              Retour
            </button>
            <span className="flex items-center gap-2 rounded-full bg-[#fff0f3] px-4 py-2 text-sm font-bold text-[#8f1237]">
              <Clock3 className="h-4 w-4 animate-pulse" />
              {timeReady
                ? "Temps d'observation validé"
                : `Observe encore ${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`}
            </span>
            {index < scenes.length - 1 ? (
              <button
                className="rounded-lg bg-[#bf1645] px-5 py-3 font-black text-white shadow-[0_4px_0_#790d2d] disabled:cursor-not-allowed disabled:bg-[#a7acb3] disabled:shadow-[0_4px_0_#737983]"
                disabled={!answered || !timeReady}
                onClick={next}
              >
                Investigation suivante{" "}
                <ArrowRight className="ml-2 inline h-4 w-4" />
              </button>
            ) : canComplete ? (
              <Link
                className={`rounded-lg bg-[#bf1645] px-5 py-3 font-black text-white ${timeReady ? "" : "pointer-events-none opacity-35"}`}
                href={`/student/modules/${moduleId}/lesson/${lessonId}/quiz`}
              >
                Passer au quiz <Sparkles className="ml-2 inline h-4 w-4" />
              </Link>
            ) : (
              <span className="rounded-lg border border-[#68717c] px-5 py-3 font-bold">
                Aperçu terminé
              </span>
            )}
          </footer>
        </div>
      )}
    </section>
  );
}
