import type { LessonQuizQuestion, ProgramLesson, ProgramModule, QuizQuestion } from "@/lib/program";
import type { Language } from "@/types/auth";
import { moduleThreeEnglishLessons } from "@/lib/curriculum/module-three-en";

export type AcademySpec = {
  id: string;
  order: number;
  title: string;
  superpower: string;
  artifact: string;
  image: string;
  reality: string;
  mystery: string;
  evidence: string[];
  mission: string[];
  reflection: string;
  cliffhanger: string;
  quiz: LessonQuizQuestion;
};

function academyLesson(spec: AcademySpec, _language: Language = "fr"): ProgramLesson {
  return {
    id: spec.id,
    order: spec.order,
    title: spec.title,
    estimatedMins: spec.id === "master-investigator" ? 30 : 20,
    content: [
      { type: "hook", content: spec.mystery },
      { type: "story", content: spec.reality },
      {
        type: "image",
        content: spec.title,
        src: spec.image,
        alt: `Illustration de ${spec.title}`,
        caption: `Superpouvoir : ${spec.superpower}`,
      },
      ...spec.evidence.map((content) => ({ type: "discovery" as const, content })),
      { type: "mission", content: spec.mission },
      { type: "reflection", content: spec.reflection },
      { type: "ability", content: `Artefact débloqué : ${spec.artifact}` },
      { type: "story", content: spec.cliffhanger },
    ],
    quiz: spec.quiz,
  };
}

export const moduleThreeLessonSpecs: AcademySpec[] = [
  {
    id: "information-hunter",
    order: 1,
    title: "Trouver ce que les autres ne trouvent pas",
    superpower: "Information Hunter",
    artifact: "Clé de recherche",
    image: "/images/module-3/information-hunter.jpg",
    reality:
      `Tu vois passer une capture d'écran annonçant une bourse entièrement financée au Canada. Le visuel paraît professionnel : logo, date limite, quelques conditions et la promesse d'une prise en charge complète.

Une amie te demande : « Tu peux me retrouver le lien ? »

Tu tapes « bourse Canada » dans Google. Des milliers de résultats apparaissent.

**Observe la situation : tu as beaucoup de résultats, mais toujours pas la bonne information.**`,
    mystery:
      "Comment passer de milliers de résultats à la bonne source ?",
    evidence: [
      "**Première question : qu'est-ce que tu cherches exactement ?** « Une bourse au Canada » est trop large. Commence par extraire les indices distinctifs de l'annonce : nom du programme, organisme, année, domaine, phrase exacte, pays ou date.",
      "**Compare deux recherches.** `bourse Canada` demande au moteur de parcourir un très grand terrain. `\"Emerging Digital Leaders Scholarship\" 2026` réduit immédiatement le champ. Une recherche efficace commence donc par la précision, pas par la quantité de résultats.",
      "Avant de chercher, transforme le problème en indices. Sur la capture, relève tout ce qui peut être vérifié : un nom, un logo, un pays, une année, une phrase particulière, un organisme, un domaine d'études ou une date. Plus un indice est distinctif, plus il peut réduire le nombre de résultats inutiles.",
      "Un moteur de recherche ne parcourt pas Internet au moment où tu appuies sur Entrée. Il interroge surtout un immense index de pages qu'il a déjà découvertes, puis classe les résultats qu'il juge pertinents. Cela explique pourquoi deux formulations différentes peuvent conduire à des résultats très différents.",
      "Commence large uniquement pour comprendre le terrain, puis resserre. « bourse Canada » est très vague. « bourse Canada cybersécurité 2026 Cameroun » réduit déjà le bruit. Ajouter le nom supposé de l'organisme ou une phrase exacte peut transformer une recherche confuse en enquête ciblée.",
      "Les guillemets demandent au moteur de rechercher une expression exacte. Si la capture contient « Emerging Digital Leaders Scholarship », chercher cette phrase entre guillemets permet de vérifier où elle apparaît réellement au lieu d'obtenir des pages contenant seulement quelques mots similaires.",
      "L'opérateur site: permet de chercher à l'intérieur d'un domaine. Si une bourse prétend venir d'une université, tu peux rechercher le nom du programme avec site:universite.ca. Si aucune trace n'existe sur le domaine annoncé, ce n'est pas automatiquement une fraude, mais c'est une raison de poursuivre la vérification.",
      "L'opérateur filetype:pdf est utile lorsque tu cherches des appels à candidatures, rapports, règlements ou formulaires. Exemple : « jeunesse numérique Cameroun filetype:pdf ». Un PDF n'est toutefois pas fiable simplement parce qu'il est en PDF : vérifie toujours qui l'héberge et qui l'a produit.",
      "Le signe moins peut retirer un résultat parasite. Si une expression renvoie surtout vers une entreprise ou une personne qui n'a rien à voir avec ta recherche, exclure ce terme peut nettoyer les résultats. L'objectif n'est pas de mémoriser des commandes, mais d'apprendre à modifier intelligemment une requête quand elle ne répond pas à ta question.",
      "Chercher une information et vérifier une information sont deux étapes différentes. TikTok, Facebook, WhatsApp ou un blog peuvent t'aider à découvrir le nom d'une opportunité. Pour confirmer les conditions, la date limite et le formulaire, remonte ensuite vers l'organisme responsable : université, fondation, ministère, entreprise ou programme officiel.",
      "Apprends aussi à reconnaître le type de source dont tu as besoin. Pour connaître une loi, cherche le texte ou l'institution compétente. Pour connaître les résultats d'une étude, cherche l'étude originale. Pour connaître une statistique, cherche l'organisme qui l'a produite et sa méthodologie. Une bonne recherche commence par la question : « Qui est le mieux placé pour savoir cela ? »",
      "Ne confonds pas résultat sponsorisé et meilleur résultat. Une publicité peut apparaître en haut de la page parce qu'un annonceur a payé pour cette visibilité. Lis l'adresse du site et identifie l'organisation avant de cliquer, surtout lorsqu'il s'agit d'argent, de candidatures ou de données personnelles.",
      "La date fait partie de la preuve. Une page officielle de 2023 peut être authentique mais inutile pour une candidature en 2026. Vérifie l'année, la date de mise à jour, la période d'éligibilité et, si nécessaire, recherche l'édition actuelle du programme.",
      "Ton réflexe final : FORMULE → CHERCHE → RESSERRE → REMONTE À LA SOURCE → VÉRIFIE LA DATE. Une recherche réussie n'est pas celle qui produit beaucoup de résultats. C'est celle qui te permet de répondre à ta question avec une source que quelqu'un d'autre peut retrouver et contrôler.",
    ],
    mission: [
      "À partir d'une annonce de bourse ou d'opportunité publique, retrouve la page de l'organisme qui en est réellement responsable.",
      "Trouve un rapport officiel au format PDF sur un sujet qui concerne ton pays ou ta communauté et identifie l'organisme, l'année et l'objectif du document.",
      "Trouve un article scientifique sur un sujet de ton choix et repère son auteur, sa date, sa revue et la question étudiée.",
      "Pour chaque recherche, note la première requête utilisée puis la modification qui t'a permis d'obtenir un résultat plus précis.",
    ],
    reflection:
      "Quand ta première recherche ne donne rien d'utile, as-tu tendance à conclure que l'information n'existe pas, ou sais-tu maintenant comment reformuler la question ?",
    cliffhanger:
      "Tu sais maintenant retrouver une source. Mais voici le prochain piège : une source existe, des milliers de personnes la partagent et l'information paraît crédible. Est-ce suffisant pour dire qu'elle est vraie ?",
    quiz: {
      question: "Tu vois une bourse sur TikTok. Quel réflexe montre le mieux que tu maîtrises la recherche ?",
      options: [
        "Partager la vidéo parce qu'elle contient un logo officiel",
        "Chercher le nom du programme puis remonter vers le site de l'organisme responsable et vérifier la date",
        "Cliquer sur le premier résultat sponsorisé",
        "Demander uniquement dans les commentaires si quelqu'un connaît la bourse",
      ],
      correctIndex: 1,
      explanation:
        "Une publication sociale peut être une piste. La confirmation vient de la source responsable, de ses informations officielles et de leur actualité.",
    },
  },
  {
    id: "truth-detective",
    order: 2,
    title: "Séparer les faits de la fiction",
    superpower: "Truth Detective",
    artifact: "Boussole de vérité",
    image: "/images/module-3/truth-detective.jpg",
    reality:
      `Une vidéo affirme : « Une nouvelle loi va interdire les réseaux sociaux aux moins de 21 ans dès le mois prochain. »

Elle dépasse 500 000 vues. Les commentaires explosent et plusieurs personnes que tu connais l'ont déjà partagée.

**Observe la situation : beaucoup de personnes répètent la même affirmation, mais aucune preuve n'est encore visible.**`,
    mystery:
      "Qu'est-ce qui transforme une affirmation en information vérifiée ?",
    evidence: [
      "**Commence par séparer trois choses :** ce qui est affirmé, ce qui est populaire et ce qui est prouvé. Ici, seule l'existence de la vidéo et de ses partages est certaine. L'existence de la loi reste à démontrer.",
      "**Transforme la rumeur en question vérifiable.** Quel pays ? Quelle institution ? Quel texte ? Quelle date ? Qui est concerné ? Plus la question devient précise, plus tu sais quel type de preuve chercher.",
      "Commence par isoler l'affirmation. Oublie quelques secondes la musique, le montage, le nombre de vues et la personne qui parle. Écris la phrase à vérifier : quoi exactement ? où ? quand ? qui est concerné ? Une affirmation floue est difficile à vérifier; une affirmation précise devient une question d'enquête.",
      "La viralité mesure surtout la circulation d'un contenu, pas sa vérité. Un contenu peut devenir viral parce qu'il surprend, fait rire, inquiète ou met en colère. L'algorithme observe les réactions; il n'est pas un tribunal chargé de certifier les faits.",
      "Observe ton émotion avant ta recherche. Si le contenu te met immédiatement en colère ou te donne très envie qu'il soit vrai, tu risques de chercher seulement ce qui confirme ta première impression. Le réflexe du détective est : « Qu'est-ce qui me ferait changer d'avis ? »",
      "Demande ensuite : qui serait normalement la source la plus proche de ce fait ? Pour une nouvelle loi, cherche l'institution ou le texte concerné. Pour une déclaration, cherche la vidéo ou le communiqué complet. Pour une étude, cherche l'étude originale. C'est le principe de la source primaire.",
      "Une source primaire n'est pas automatiquement correcte ou neutre, mais elle te permet de savoir ce qui a réellement été publié ou déclaré. Elle évite le jeu du téléphone arabe où un compte résume un article qui résume un autre compte qui cite une capture.",
      "Ensuite, cherche des confirmations indépendantes. « Indépendantes » signifie qu'elles ne se contentent pas toutes de recopier la même origine. Trois sites qui reproduisent mot pour mot le même communiqué ne sont pas trois témoins différents.",
      "La compétence de la source compte aussi. Un médecin peut être pertinent sur une question médicale, mais pas nécessairement sur le contenu d'un décret. Une célébrité peut avoir une grande audience sans disposer d'informations particulières sur une politique publique.",
      "Vérifie la date et le contexte. Une vraie citation de 2021 peut devenir trompeuse si elle est présentée comme une déclaration faite aujourd'hui. Un chiffre exact dans un pays peut devenir faux lorsqu'on le transpose à un autre.",
      "Apprends à utiliser trois verdicts plutôt que deux : CONFIRMÉ lorsque les preuves convergent; TROMPEUR lorsque des éléments vrais sont utilisés hors contexte ou de manière à induire en erreur; NON CONFIRMÉ lorsque les preuves disponibles ne permettent pas encore de conclure. « Je ne sais pas encore » est une réponse valide.",
      "Un site de fact-checking peut accélérer l'enquête, mais ne remplace pas ton raisonnement. Lis comment la vérification a été faite : quelles sources ont été consultées ? quelle partie de l'affirmation est évaluée ? quelle date ? Tu apprends davantage de la méthode que de l'étiquette « vrai/faux ».",
      "Lorsque tu corriges quelqu'un, apporte la preuve sans transformer la vérification en humiliation. « Voici la source officielle et ce qu'elle dit réellement » est généralement plus utile que « tu racontes n'importe quoi ». Le but d'un CyberAmbassador est d'améliorer la qualité de l'information qui circule.",
      "Ton protocole : ISOLE L'AFFIRMATION → IDENTIFIE LA SOURCE QUI DEVRAIT SAVOIR → REMONTE À L'ORIGINAL → CHERCHE DES CONFIRMATIONS INDÉPENDANTES → VÉRIFIE DATE ET CONTEXTE → RENDS UN VERDICT PROPORTIONNÉ AUX PREUVES.",
    ],
    mission: [
      "Choisis une affirmation publique récente qui peut être vérifiée sans exposer de données privées.",
      "Écris l'affirmation en une phrase précise avec lieu et date.",
      "Retrouve la source primaire ou explique pourquoi elle manque.",
      "Cherche au moins deux confirmations réellement indépendantes puis classe le résultat : confirmé, trompeur ou non confirmé, avec une phrase de justification.",
    ],
    reflection:
      "Quelle émotion ou préférence personnelle pourrait le plus facilement influencer ta manière de vérifier une information ?",
    cliffhanger:
      "Tu sais vérifier une affirmation écrite. Mais une photo semble parfois beaucoup plus convaincante qu'un texte : « regarde, c'est la preuve ». La prochaine mission consiste justement à découvrir ce qu'une image ne te montre pas.",
    quiz: {
      question: "Trois pages publient exactement la même affirmation. Qu'est-ce qui permet de savoir si tu as réellement trois confirmations ?",
      options: [
        "Le nombre total de leurs abonnés",
        "Le fait qu'elles utilisent trois logos différents",
        "Le fait qu'elles aient vérifié l'information à partir de sources ou méthodes indépendantes",
        "Le fait que leurs publications aient beaucoup de commentaires",
      ],
      correctIndex: 2,
      explanation:
        "Plusieurs publications peuvent provenir d'une seule origine. Une confirmation indépendante doit apporter une vérification qui ne dépend pas simplement de la même source.",
    },
  },
  {
    id: "visual-investigator",
    order: 3,
    title: "Lire entre les pixels",
    superpower: "Visual Investigator",
    artifact: "Lentille d'investigation",
    image: "/images/module-3/visual-investigator.jpg",
    reality:
      `Une photo circule avec la légende : « Manifestation au Cameroun aujourd'hui ».

On y voit une foule, de la fumée et des personnes qui courent. L'image paraît authentique.

**Observe la situation : la photo montre bien une scène réelle, mais elle ne te dit ni où ni quand elle a été prise.**`,
    mystery:
      "Que peut réellement prouver une image ?",
    evidence: [
      "**Sépare l'image de sa légende.** La photo peut montrer une foule sans prouver « Cameroun » ni « aujourd'hui ». Cette distinction est la base de toute vérification visuelle.",
      "**Observe avant d'interpréter.** Repère panneaux, langue, bâtiments, vêtements, véhicules, végétation, météo, relief ou logos. Chaque détail est une piste à vérifier, pas encore une conclusion.",
      "Commence par distinguer IMAGE et AFFIRMATION. L'image montre peut-être une foule, de la fumée et une rue. La légende affirme peut-être « Douala, aujourd'hui ». La photo seule ne prouve ni la ville ni la date. Cette séparation évite de traiter une impression comme un fait.",
      "Observe avant d'interpréter. Pendant quelques secondes, interdis-toi de raconter l'histoire. Note seulement les éléments visibles : panneaux, langue, bâtiments, vêtements, véhicules, plaques, végétation, météo, relief, ombres, uniformes ou logos.",
      "Chaque détail peut devenir une piste, mais pas une conclusion. Un drapeau peut appartenir à une communauté à l'étranger. Une plaque peut être floue. Une architecture peut exister dans plusieurs pays. Le bon réflexe est : « Comment puis-je vérifier cette hypothèse ? »",
      "Le cadrage peut modifier le sens sans modifier les pixels. Une photo serrée peut cacher une petite foule; un angle peut masquer les secours; une image prise après un incident peut être présentée comme la cause de l'incident. Demande toujours : qu'y avait-il juste hors cadre ?",
      "Le recadrage sert aussi à empêcher la recherche. Une version virale peut supprimer le logo d'une agence de presse, une date, un panneau ou un filigrane. Retrouver une version plus large peut restituer ces indices.",
      "La recherche d'image inversée ne demande pas « cette photo est-elle vraie ? ». Elle cherche des images identiques ou visuellement proches sur le Web. Elle peut t'aider à retrouver des publications antérieures, d'autres cadrages ou le contexte original.",
      "Ne t'arrête pas au premier résultat. Cherche la publication la plus ancienne que tu peux vérifier, puis ouvre-la. Qui l'a publiée ? À quelle date ? Que disait la légende à ce moment-là ? Une miniature dans les résultats n'est pas encore une preuve.",
      "Construis une mini-chronologie. Exemple : photo publiée par une agence en 2022 → reprise dans un article en 2024 → republiée sur Facebook en 2026 avec une nouvelle légende. La chronologie montre comment un contenu authentique peut devenir désinformation sans aucune retouche.",
      "Les métadonnées peuvent parfois contenir l'appareil, la date ou des coordonnées, mais les réseaux sociaux les suppriment souvent et elles peuvent être modifiées. Leur absence ne prouve rien; leur présence doit être recoupée.",
      "Pour localiser une image, combine plusieurs indices. Un nom de boutique + une langue + un type de plaque + une rue identifiable valent davantage qu'un seul détail. Tu peux ensuite rechercher ces éléments séparément et voir s'ils convergent vers le même lieu.",
      "Une capture d'écran est particulièrement faible comme preuve parce qu'elle coupe souvent le lien avec la publication originale. Si possible, retrouve l'URL, le compte, l'auteur ou la page qui a publié le contenu.",
      "Ton protocole visuel : SÉPARE IMAGE ET LÉGENDE → OBSERVE → EXTRAIS DES INDICES → RECHERCHE LES VERSIONS ANTÉRIEURES → RECONSTRUIS LA CHRONOLOGIE → RECOUPE LE LIEU ET LA DATE → CONCLUS SEULEMENT SUR CE QUE LES PREUVES SUPPORTENT.",
    ],
    mission: [
      "Choisis une image publique dont le contexte original est connu.",
      "Liste au moins cinq éléments visibles sans interpréter leur signification.",
      "Effectue une recherche d'image inversée et retrouve une version antérieure ou une publication source.",
      "Construis une chronologie simple et explique ce que tu peux prouver — et ce que tu ne peux pas prouver — à partir de l'image.",
    ],
    reflection:
      "Quand tu regardes une image virale, quelle différence fais-tu maintenant entre « ce que je vois » et « l'histoire qu'on me raconte à propos de ce que je vois » ?",
    cliffhanger:
      "Jusqu'ici, tu suivais la trace d'une image qui avait réellement existé quelque part. Mais que se passe-t-il lorsqu'un visage, une voix ou une scène entière a été synthétisé ?",
    quiz: {
      question: "Une photo authentique est publiée en 2026 avec la légende « prise aujourd'hui ». Quel élément peut directement réfuter cette date ?",
      options: [
        "La photo paraît trop professionnelle",
        "Une publication vérifiable de la même image datant de 2022",
        "Plusieurs commentaires disent qu'elle est fausse",
        "La photo a été partagée sur Facebook",
      ],
      correctIndex: 1,
      explanation:
        "Une occurrence vérifiable antérieure à la date prétendue suffit à montrer que la photo n'a pas été prise aujourd'hui, même si l'image elle-même est authentique.",
    },
  },
  {
    id: "ai-decoder",
    order: 4,
    title: "Démasquer la machine",
    superpower: "AI Decoder",
    artifact: "Décodeur IA",
    image: "/images/module-3/ai-decoder.jpg",
    reality:
      `Une vidéo arrive dans un groupe WhatsApp. Une personnalité connue regarde la caméra et annonce une opportunité exceptionnelle.

Sa voix lui ressemble. Ses expressions sont naturelles. Le mouvement des lèvres paraît correct.

**Observe la situation : rien, à première vue, ne permet de savoir si l'enregistrement est authentique ou synthétique.**`,
    mystery:
      "Comment vérifier un contenu quand tes yeux ne suffisent plus ?",
    evidence: [
      "**Ne commence pas par essayer de deviner si c'est de l'IA.** Commence par identifier ce que la vidéo prétend montrer : qui parle, quel événement, quelle annonce et quelle action on te demande éventuellement de faire.",
      "**Puis pose la question de provenance.** Où cette vidéo est-elle apparue en premier ? Le compte officiel l'a-t-il publiée ? Existe-t-il une version complète ou une confirmation indépendante ?",
      "L'IA générative apprend des régularités dans de grandes quantités de données puis produit de nouveaux contenus : texte, image, audio ou vidéo. « Généré par IA » ne signifie donc pas automatiquement « faux » ou « dangereux ». Une illustration créée par IA peut être parfaitement honnête si son origine n'est pas utilisée pour tromper.",
      "Le problème apparaît lorsque le contenu te fait croire à une origine, une personne ou un événement qui n'existe pas : une voix clonée utilisée pour demander de l'argent, une fausse vidéo politique, une photo inventée présentée comme preuve ou une fausse capture de conversation.",
      "Les anciens conseils du type « compte les doigts » ou « regarde si la personne cligne des yeux » deviennent vite obsolètes. Certains contenus générés contiennent encore des anomalies, mais les modèles progressent. Les indices visuels sont des signaux d'alerte, pas une méthode de preuve suffisante.",
      "Pour une image, cherche des incohérences : texte déformé, objets qui se fondent, reflets impossibles, répétitions étranges, ombres incompatibles. Mais si tu ne trouves rien, tu n'as pas prouvé que l'image est réelle.",
      "Pour une voix, écoute les respirations, les changements d'émotion, la prononciation, les coupures et le contexte. Là encore, une voix clonée de bonne qualité peut ne présenter aucun défaut évident. Si la voix demande une action urgente, vérifie par un autre canal.",
      "Pour une vidéo, examine la provenance avant le visage. Où est apparue la première version ? Le compte officiel l'a-t-il publiée ? Existe-t-il un enregistrement plus long ? Des sources présentes à l'événement confirment-elles la scène ?",
      "Le texte généré par IA peut être extrêmement convaincant tout en inventant des références, citations, lois, noms ou chiffres. Une phrase bien écrite n'est pas une preuve. Clique sur les sources, vérifie qu'elles existent et qu'elles disent réellement ce que le texte affirme.",
      "Les détecteurs d'IA ne lisent pas la vérité dans le fichier. Ils estiment une probabilité à partir de caractéristiques techniques et peuvent produire faux positifs et faux négatifs. Ne condamne jamais une personne ou un contenu sur le résultat d'un seul détecteur.",
      "La provenance est ton meilleur allié : qui a créé ou publié le contenu ? par quel canal ? existe-t-il une source originale ? peut-on confirmer auprès de la personne ou de l'organisation concernée ? Plus le contenu est spectaculaire, plus cette vérification devient importante.",
      "Face à une demande urgente — « envoie l'argent maintenant », « garde cela secret », « clique immédiatement » — sépare l'identité du message. Même si la voix ressemble à ton proche, appelle-le sur un numéro connu ou pose une question que l'attaquant ne peut pas déduire facilement.",
      "Apprends aussi à vivre avec l'incertitude. Tu peux parfois conclure « je n'ai pas de preuve suffisante pour authentifier ce contenu ». C'est plus rigoureux que de déclarer « IA » simplement parce qu'une image te semble étrange.",
      "Ton protocole : NE DEVINE PAS → IDENTIFIE L'AFFIRMATION → RETROUVE LA PROVENANCE → CHERCHE UNE CONFIRMATION INDÉPENDANTE → EXAMINE LES INDICES TECHNIQUES → UTILISE LES DÉTECTEURS COMME INDICES → CONCLUS AVEC UN NIVEAU DE CONFIANCE.",
    ],
    mission: [
      "Compare un contenu explicitement déclaré comme généré par IA avec un contenu provenant d'une source documentée.",
      "Liste les indices que tu remarques, puis sépare ceux qui sont de simples soupçons de ceux qui peuvent réellement être vérifiés.",
      "Imagine qu'aucun défaut visuel ou sonore ne soit visible : construis une méthode de vérification basée sur la provenance et les confirmations.",
      "Explique en une phrase pourquoi « je n'arrive pas à voir que c'est de l'IA » ne signifie pas « c'est authentique ».",
    ],
    reflection:
      "Si les contenus synthétiques deviennent visuellement indiscernables des contenus réels, quel réflexe restera utile dans cinq ans ?",
    cliffhanger:
      "Tu viens d'apprendre à douter intelligemment de ce que tu vois et entends. La prochaine salle retourne l'enquête vers toi : qu'est-ce qu'un inconnu peut découvrir sans pirater ton téléphone ?",
    quiz: {
      question: "Quelle stratégie reste la plus solide face à une vidéo synthétique très réaliste ?",
      options: [
        "Chercher uniquement des doigts ou des clignements étranges",
        "Vérifier l'origine du contenu et confirmer l'information par des canaux indépendants",
        "Faire confiance à la qualité de l'image",
        "Utiliser un seul détecteur d'IA et accepter son verdict",
      ],
      correctIndex: 1,
      explanation:
        "Les artefacts techniques évoluent. La provenance et les confirmations restent utiles même lorsqu'un contenu synthétique ne présente aucun défaut visible.",
    },
  },
  {
    id: "privacy-guardian",
    order: 5,
    title: "Qui peut te voir ?",
    superpower: "Privacy Guardian",
    artifact: "Cape de confidentialité",
    image: "/images/module-3/privacy-guardian.jpg",
    reality:
      `Un inconnu connaît ton établissement, ta ville, le prénom d'un proche et ton artiste préféré.

Il n'a piraté aucun de tes comptes.

**Observe la situation : toutes ces informations étaient déjà accessibles séparément quelque part dans ta présence numérique.**`,
    mystery:
      "Que peut-on apprendre sur toi sans pirater ton compte ?",
    evidence: [
      "**Regarde les informations une par une.** École, ville, proche, artiste préféré : chacune semble anodine. Ensemble, elles décrivent beaucoup plus précisément une personne.",
      "**Le vrai exercice de confidentialité consiste à penser en combinaison.** Demande-toi ce qu'un inconnu peut déduire lorsqu'il relie plusieurs traces publiques entre elles.",
      "Ta trace numérique ne vient pas uniquement de ce que tu publies. Elle comprend aussi les commentaires, likes, abonnements, photos où d'autres t'identifient, comptes oubliés, appareils connectés, historiques et informations collectées pendant l'utilisation des services.",
      "Une information isolée peut sembler anodine. Mais plusieurs petits éléments peuvent être assemblés. Ton école + ton anniversaire + le prénom de ta mère + une photo de voyage peuvent aider quelqu'un à personnaliser une arnaque ou à deviner certaines réponses de récupération.",
      "Distingue trois audiences : celle que tu imagines, celle que la plateforme autorise réellement et celle que le contenu peut atteindre après capture ou transfert. « Amis uniquement » réduit l'exposition, mais n'empêche pas un ami de faire une capture.",
      "Les paramètres de confidentialité contrôlent surtout qui peut voir ou interagir. Sur une application, demande-toi : qui peut voir mon profil, ma photo, mon statut, ma liste d'amis, mon activité, ma localisation ou m'ajouter à un groupe ?",
      "Les permissions contrôlent ce que l'application peut utiliser sur ton appareil : caméra, microphone, localisation, contacts, photos, fichiers. Une application de lampe torche qui réclame tes contacts mérite une question simple : pourquoi en aurait-elle besoin ?",
      "Applique le principe du minimum nécessaire. Autorise une ressource seulement lorsqu'elle sert réellement à la fonction que tu veux utiliser. Lorsque le téléphone le permet, préfère « pendant l'utilisation » à « toujours » pour les permissions sensibles.",
      "La confidentialité ne concerne pas seulement les inconnus. Les entreprises collectent des données pour faire fonctionner le service, sécuriser les comptes, mesurer l'utilisation, personnaliser l'expérience ou la publicité. Lis au moins les réglages principaux plutôt que d'imaginer que « gratuit » signifie « sans échange de valeur ».",
      "Les comptes connectés entre eux créent aussi des ponts. Utiliser « Se connecter avec Google/Facebook » peut être pratique, mais il faut savoir quelles informations sont partagées et retirer les applications que tu n'utilises plus.",
      "Un audit utile examine : profil vu comme un inconnu, anciennes publications, identifications, appareils connectés, sessions actives, permissions, localisation, applications tierces, moyens de récupération et personnes autorisées à te contacter.",
      "Pense également aux autres. Avant de publier la photo, le numéro, la conversation ou la localisation d'une personne, demande-toi si tu as le droit et son accord. Protéger sa vie privée tout en exposant celle des autres n'est pas une pratique responsable.",
      "Le but n'est pas de devenir invisible. Un étudiant peut vouloir être visible professionnellement; un créateur peut avoir un compte public. Le pouvoir consiste à choisir volontairement : QUOI est visible, POUR QUI, POURQUOI et POUR COMBIEN DE TEMPS.",
      "Ton protocole : REGARDE TON PROFIL COMME UN INCONNU → IDENTIFIE CE QUI PEUT ÊTRE DÉDUIT → VÉRIFIE LES AUDIENCES → CONTRÔLE LES PERMISSIONS → FERME LES ACCÈS INUTILES → REFAIS L'AUDIT RÉGULIÈREMENT.",
    ],
    mission: [
      "Observe un de tes profils comme le verrait une personne qui ne te suit pas.",
      "Liste cinq informations visibles ou déductibles et classe-les : volontaire, révélée par d'autres, ou collectée par l'application.",
      "Vérifie les permissions d'au moins trois applications et retire un accès qui n'est pas nécessaire.",
      "Choisis un réglage de confidentialité sur WhatsApp, Instagram, Facebook, TikTok ou Google et explique précisément ce qu'il change.",
    ],
    reflection:
      "Quelle information te semblait insignifiante lorsqu'elle était seule, mais devient plus sensible lorsqu'on la combine avec d'autres traces ?",
    cliffhanger:
      "Tu sais maintenant réduire ton exposition. Mais un CyberAmbassador ne rencontre pas toujours le problème avant qu'il arrive. Parfois, quelqu'un vient te voir alors que le dommage a déjà commencé.",
    quiz: {
      question: "Quel raisonnement correspond le mieux à une bonne gestion des permissions ?",
      options: [
        "Une application connue peut accéder à tout",
        "Je donne uniquement les accès nécessaires à la fonction que j'utilise et je les retire lorsqu'ils ne servent plus",
        "Je refuse toutes les permissions sans exception",
        "Je laisse ma localisation active pour toutes les applications",
      ],
      correctIndex: 1,
      explanation:
        "La confidentialité consiste à garder le contrôle. Le principe du minimum nécessaire réduit l'exposition sans empêcher les fonctions dont tu as réellement besoin.",
    },
  },
  {
    id: "digital-first-responder",
    order: 6,
    title: "Tirer l'alarme",
    superpower: "Digital First Responder",
    artifact: "Kit d'urgence",
    image: "/images/module-3/first-responder.jpg",
    reality:
      `Ton cousin t'écrit : quelqu'un a créé un faux compte avec ses photos et des messages haineux commencent à circuler.

Il veut tout supprimer immédiatement et demander à ses amis d'insulter le faux compte en retour.

**Observe la situation : agir vite peut protéger, mais peut aussi faire disparaître des preuves ou aggraver le problème.**`,
    mystery:
      "Que faire, dans quel ordre, quand le dommage a déjà commencé ?",
    evidence: [
      "**Avant toute action technique, évalue le niveau de danger.** Y a-t-il menace, chantage, image intime, risque physique ou simple nuisance ? La réponse n'est pas la même selon la gravité.",
      "**Ensuite seulement, pense aux preuves.** Supprimer peut soulager immédiatement, mais peut aussi faire disparaître les éléments nécessaires à un signalement ou à une escalade.",
      "Commence par la personne, pas par l'écran. Demande ce qui se passe, depuis quand, qui est impliqué et surtout s'il existe une menace immédiate pour sa sécurité physique. Une menace crédible, un chantage grave ou une situation impliquant un mineur peut nécessiter rapidement l'aide d'un adulte de confiance ou d'un service compétent.",
      "Écoute sans accuser. Des phrases comme « pourquoi tu as répondu ? » ou « je t'avais prévenu » peuvent fermer la conversation. Ton rôle est d'aider la personne à retrouver du contrôle, pas de mener un interrogatoire.",
      "Avant de supprimer, conserve les éléments nécessaires : capture complète, nom du compte, identifiant, URL, date, heure et contexte. Lorsque c'est possible, garde le lien vers la publication. Une capture isolée peut être utile, mais un lien permet souvent à la plateforme ou à un tiers de retrouver plus facilement le contenu.",
      "Documenter ne signifie pas republier. Ne transfère pas une image intime, une menace ou une rumeur dans plusieurs groupes « pour avoir des preuves ». Plus tu copies le contenu, plus tu peux augmenter le dommage.",
      "Comprends la différence entre BLOQUER et SIGNALER. Bloquer protège ton espace en empêchant ou limitant le contact. Signaler demande à la plateforme d'examiner un comportement ou un contenu selon ses règles. Selon la situation, les deux peuvent être nécessaires.",
      "Un signalement précis est plus utile qu'un signalement vague. Choisis la catégorie qui correspond réellement : usurpation, harcèlement, arnaque, contenu intime non consenti, menace, spam, etc. Décris les faits sans exagérer et joins les éléments demandés.",
      "Ne mobilise pas des dizaines de personnes pour signaler un contenu simplement parce qu'il te déplaît. Le signalement doit correspondre à une violation réelle ou à un risque. La force collective sera abordée dans le module suivant, avec ses responsabilités.",
      "Après un compte compromis, pense aussi à la sécurité technique : changer le mot de passe depuis un appareil sûr, fermer les sessions inconnues, activer la double authentification, vérifier l'adresse et le numéro de récupération, puis prévenir les contacts si des messages frauduleux ont été envoyés.",
      "L'escalade dépend de la situation. Un problème peut être traité par les outils de la plateforme; d'autres nécessitent une école, une organisation, un parent, un service spécialisé ou les autorités compétentes. Un CyberAmbassador doit savoir reconnaître quand la situation dépasse son rôle.",
      "N'impose pas toutes les décisions à la victime lorsque ce n'est pas nécessaire. Explique les options, les conséquences possibles et accompagne-la. Restaurer son pouvoir de décision fait partie de la réponse.",
      "Le suivi compte. Après le signalement, vérifie si de nouveaux comptes apparaissent, si le contenu est republié, si les paramètres doivent être renforcés et surtout si la personne a encore besoin de soutien.",
      "Ton protocole : SÉCURISER → ÉCOUTER → CONSERVER LES PREUVES → LIMITER LE CONTACT → SIGNALER → ESCALADER SI NÉCESSAIRE → SÉCURISER LES COMPTES → SUIVRE. L'ordre exact peut varier selon l'urgence, mais la sécurité de la personne reste prioritaire.",
    ],
    mission: [
      "À partir d'un cas fictif, construis un dossier contenant compte, lien, date, heure, capture et description factuelle.",
      "Choisis la bonne catégorie de signalement et explique pourquoi elle correspond au problème.",
      "Décide si la situation nécessite seulement un blocage/signalement ou une escalade vers une personne ou structure compétente.",
      "Rédige les trois premières phrases que tu dirais à une personne qui vient te demander de l'aide.",
    ],
    reflection:
      "Dans une situation urgente, pourquoi « faire quelque chose tout de suite » n'est-il pas toujours la même chose que « faire la bonne chose » ?",
    cliffhanger:
      "Tu possèdes maintenant six superpouvoirs. La dernière salle ne t'apprend plus un outil. Elle te donne un dossier où plusieurs indices se contredisent. Cette fois, c'est toi qui choisis la méthode.",
    quiz: {
      question: "Un ami subit du harcèlement en ligne. Quel premier ensemble de réflexes est le plus solide ?",
      options: [
        "Répondre publiquement, mobiliser des insultes puis supprimer les messages",
        "Évaluer sa sécurité, l'écouter, conserver les preuves utiles, limiter le contact et signaler de manière adaptée",
        "Ignorer systématiquement la situation pendant plusieurs semaines",
        "Partager toutes les captures dans plusieurs groupes pour demander des avis",
      ],
      correctIndex: 1,
      explanation:
        "La réponse commence par la sécurité et le soutien, puis préserve les éléments utiles avant d'utiliser les mécanismes de protection, de signalement et d'escalade appropriés.",
    },
  },
  {
    id: "master-investigator",
    order: 7,
    title: "Penser comme un investigateur",
    superpower: "Master Investigator",
    artifact: "Dossier CyberAmbassador",
    image: "/images/module-3/master-investigator.jpg",
    reality:
      `Dossier final.

Une bourse entièrement financée circule sur les réseaux. Devant toi : un email, une photo d'anciens lauréats, une courte vidéo, un site d'inscription et un profil social qui affirme représenter le programme.

Certaines pièces sont peut-être authentiques. D'autres peuvent avoir été recyclées, imitées ou sorties de leur contexte.

**Observe la situation : plusieurs éléments semblent cohérents, mais aucun ne constitue encore, à lui seul, une preuve suffisante.**`,
    mystery:
      "Comment construire une conclusion à partir de plusieurs pièces qui ne prouvent rien seules ?",
    evidence: [
      `**Que prouve l'email ?**

L'email contient le logo du programme et la signature « Équipe des admissions ».

Cela paraît officiel, mais ni un logo ni une signature ne prouvent l'origine d'un message : ils peuvent être copiés.

Regarde plutôt l'adresse d'envoi.

\`selection@programme-officiel.org\`

et

\`programmeofficiel2026@gmail.com\`

ne donnent pas la même information.

Mais même une adresse qui paraît professionnelle doit être comparée au domaine réellement utilisé par l'organisation.

**Ce que tu apprends ici :** vérifie l'origine technique d'un message avant de faire confiance à son apparence.`,
      `**Retrouve l'organisation sans utiliser le lien reçu**

L'email contient un bouton « Candidater maintenant ».

Ne commence pas par là.

Ouvre une nouvelle recherche et cherche toi-même le nom de l'organisation.

Pourquoi ?

Parce qu'un faux email peut t'envoyer vers un faux site qui imite parfaitement le vrai. Si tu restes dans les liens fournis par le message, toutes tes « vérifications » peuvent se faire à l'intérieur du même faux environnement.

Retrouver l'organisation indépendamment te donne un point de comparaison extérieur.`,
      `**Compare les domaines**

Supposons que ta recherche indépendante te conduise vers :

\`www.futureleaders.org\`

Mais le bouton de candidature reçu par email mène vers :

\`futureleaders-scholarship.net\`

Les noms se ressemblent. Pourtant, ce sont deux domaines différents.

Ne conclus pas immédiatement à une fraude.

Cherche plutôt si le site officiel \`futureleaders.org\` renvoie lui-même vers ce second domaine.

S'il le fait, tu as créé un lien vérifiable entre les deux.

S'il ne le mentionne nulle part, le second domaine doit être examiné davantage.

**Une ressemblance de nom n'est pas une relation. Cherche le lien vérifiable entre les deux.**`,
      `**La bourse existe-t-elle vraiment ?**

Maintenant que tu as retrouvé le site officiel, cherche le nom exact de la bourse à l'intérieur de ce domaine.

Tu peux utiliser :

\`site:futureleaders.org "nom exact de la bourse"\`

Vérifie ensuite l'année, les critères, la date limite et le mode de candidature.

Une ancienne édition de 2024 peut être réelle alors que l'annonce « 2026 » est fausse.

**Authentique ne veut donc pas toujours dire actuel.**`,
      `**Suis la photo**

La photo montre des jeunes tenant des certificats devant une bannière qui porte le logo de l'organisation.

Que prouve-t-elle ?

À ce stade : seulement qu'une photo de personnes avec ce logo existe.

Effectue une recherche d'image inversée.

Supposons que tu retrouves la même photo dans une publication de 2023 intitulée « Young Entrepreneurs Bootcamp ».

Elle est donc authentique, mais elle ne montre pas les lauréats de la bourse 2026.

Tu viens d'identifier une technique importante : **utiliser un vrai contenu dans un faux contexte.**`,
      `**Vérifie la vidéo par sa provenance**

La vidéo montre la directrice de l'organisation parlant d'« opportunités pour les jeunes ».

Ne te contente pas d'observer son visage pour décider si elle est générée par IA.

Cherche une phrase distinctive prononcée dans la vidéo, le nom de la personne ou une version plus longue sur les canaux officiels.

Si tu retrouves la vidéo originale publiée deux ans plus tôt et que l'extrait actuel a supprimé la partie où elle parlait d'un autre programme, le problème n'était pas un deepfake.

C'était un **détournement de contexte**.

La provenance t'apprend souvent plus que l'apparence.`,
      `**Examine le profil social**

Le compte possède 18 000 abonnés et le logo officiel.

Cela suffit-il ?

Non.

Regarde ce qui peut être vérifié :

- depuis quand publie-t-il ?
- les anciens contenus sont-ils cohérents ?
- le site officiel renvoie-t-il vers ce compte ?
- le compte renvoie-t-il vers le même domaine officiel ?
- ses coordonnées correspondent-elles à celles de l'organisation ?

Le nombre d'abonnés mesure une audience. **Il ne certifie pas une identité.**`,
      `**Regarde ce que le formulaire demande**

Le formulaire demande ton nom, ton email et ton CV.

Ces informations peuvent être normales pour une candidature.

Puis il demande une photo de ta CNI, tes coordonnées bancaires et un paiement de « validation ».

Arrête-toi.

La bonne question n'est pas seulement « est-ce sensible ? ».

Demande :

**Cette donnée est-elle nécessaire à cette étape du processus, et l'organisation officielle confirme-t-elle qu'elle la demande ?**

Une collecte excessive de données peut être un signal de risque même lorsqu'aucun paiement n'est demandé.`,
      `**Construis la chronologie**

Place maintenant les éléments dans l'ordre :

- 2023 : publication originale de la photo ;
- 2024 : vidéo originale de la directrice ;
- juillet 2026 : création du compte qui diffuse l'annonce ;
- août 2026 : réception de l'email ;
- août 2026 : prétendue date limite.

La chronologie fait apparaître quelque chose que chaque pièce cachait séparément : du contenu ancien a peut-être été réutilisé pour donner de la crédibilité à une campagne récente.

**Quand plusieurs pièces racontent une histoire, vérifie si leurs dates racontent la même histoire.**`,
      `**Sépare fait et conclusion**

Écris deux colonnes.

**FAIT OBSERVÉ**
Le domaine du formulaire est différent du domaine officiel.

**CONCLUSION POSSIBLE**
Le formulaire pourrait ne pas appartenir à l'organisation.

Ne transforme pas la deuxième phrase en :

« Les propriétaires sont des escrocs. »

Tu ne disposes pas encore de cette preuve.

Cette séparation t'évite d'accuser au-delà de ce que ton enquête permet réellement d'établir.`,
      `**Relie les éléments**

Supposons maintenant que tu aies établi ceci :

- aucune bourse 2026 n'apparaît sur le site officiel ;
- le domaine du formulaire n'est relié nulle part au site officiel ;
- la photo vient d'un autre programme en 2023 ;
- la vidéo a été sortie de son contexte ;
- le profil social n'est référencé par aucun canal officiel ;
- le formulaire réclame des données sensibles et un paiement.

Un seul de ces éléments pouvait avoir une explication innocente.

Ensemble, ils forment une chaîne cohérente d'indices vérifiables.

C'est cette convergence qui renforce ton verdict.`,
      `**Rends un verdict proportionné aux preuves**

Tu n'es pas obligé de choisir uniquement entre « vrai » et « faux ».

Tu peux conclure :

- **Confirmé** : les éléments essentiels sont vérifiés auprès de sources fiables.
- **Probablement authentique** : les preuves convergent mais un élément important reste à confirmer.
- **Trompeur** : des éléments vrais sont utilisés dans un contexte qui induit en erreur.
- **Probablement frauduleux** : plusieurs indices vérifiables convergent vers une tentative de tromperie.
- **Non confirmé** : tu n'as pas assez de preuves pour conclure.

Ajoute toujours ce qui manque encore. Une bonne conclusion montre à la fois **ce que tu sais et la limite de ce que tu sais.**`,
      `**Choisis l'action adaptée**

Si ton enquête conclut que l'annonce est probablement frauduleuse, ne republie pas simplement le faux visuel avec « ATTENTION ARNAQUE ».

Tu pourrais contribuer à sa diffusion.

Conserve les preuves utiles, signale le compte ou le contenu dans la catégorie appropriée, préviens les personnes exposées avec une information vérifiée et renvoie, si elle existe, vers la vraie page officielle.

L'enquête n'est terminée que lorsque ta conclusion permet une action plus sûre.`,
    ],
    mission: [
      "Examine les cinq pièces du dossier interactif sans rendre de verdict pendant la phase d'inventaire.",
      "Écris au moins trois hypothèses possibles et choisis la vérification qui peut t'apporter le plus d'information en premier.",
      "Utilise les artefacts des six leçons précédentes pour construire une chaîne de preuves et une chronologie.",
      "Rends un verdict : confirmé, probablement authentique, trompeur, probablement frauduleux ou non confirmé.",
      "Ajoute ton niveau de confiance, les limites de ton enquête et l'action que tu recommandes.",
    ],
    reflection:
      "À quel moment de l'enquête as-tu été tenté de conclure trop vite, et quelle vérification t'a obligé à nuancer ou confirmer ton intuition ?",
    cliffhanger:
      "Dossier fermé. Tes six artefacts ne sont plus des objets de cours : ils forment ton CyberAmbassador Field Kit. Tu sais chercher, vérifier, analyser, protéger et intervenir. Le prochain module pose une nouvelle question : que peux-tu faire de ces pouvoirs lorsque tu n'agis plus seul ?",
    quiz: {
      question: "Qu'est-ce qui distingue le mieux une intuition d'un verdict d'enquête défendable ?",
      options: [
        "Le verdict est formulé avec plus d'assurance",
        "Le verdict repose sur une méthode explicable, une chaîne de preuves vérifiables et des limites reconnues",
        "Le verdict est partagé par le plus grand nombre",
        "Le verdict confirme la première hypothèse",
      ],
      correctIndex: 1,
      explanation:
        "Une conclusion solide doit pouvoir être contrôlée par une autre personne. Elle montre son chemin de preuve et reconnaît ce qui reste incertain.",
    },
  },
];

export function getModuleThreeLessonSpecs(language: Language = "fr"): AcademySpec[] {
  if (language === "fr") return moduleThreeLessonSpecs;

  return moduleThreeLessonSpecs.map((spec) => {
    const english = moduleThreeEnglishLessons[spec.id];
    return english ? { ...spec, ...english } : spec;
  });
}

export function getLocalizedModuleThree(baseModule: ProgramModule): ProgramModule {
  const lessons = getModuleThreeLessonSpecs("en");
  return {
    ...baseModule,
    title: "Digital Superpowers",
    subtitle: "Search, verify, analyse, protect and respond methodically",
    summary: "Missions to find information, build evidence, investigate images and AI-generated content, and respond to digital harm.",
    outcomes: ["Find sources effectively", "Verify claims with evidence", "Analyse images and synthetic content", "Control privacy and respond to harm"],
    lessons: lessons.map((spec) => academyLesson(spec, "en")),
    quiz: lessons.map((spec, index) => ({
      id: `m3-final-${index + 1}`,
      question: spec.quiz.question,
      options: spec.quiz.options,
      correctIndex: spec.quiz.correctIndex,
      explanation: spec.quiz.explanation,
      points: 40,
    })),
  };
}

export const moduleThreeLessonQuizBanks: Record<string, LessonQuizQuestion[]> = Object.fromEntries(
  moduleThreeLessonSpecs.map((spec) => [spec.id, [spec.quiz]])
);

export const moduleThreeQuiz: QuizQuestion[] = moduleThreeLessonSpecs.map((spec, index) => ({
  id: `m3-final-${index + 1}`,
  question: spec.quiz.question,
  options: spec.quiz.options,
  correctIndex: spec.quiz.correctIndex,
  explanation: spec.quiz.explanation,
  points: 40,
}));

export const moduleThree: ProgramModule = {
  id: "cyberambassador-academy",
  week: 3,
  title: "Digital Superpowers / Superpouvoirs numériques",
  subtitle: "Chercher, vérifier, analyser, protéger et intervenir avec méthode",
  summary:
    "Sept missions pour apprendre à retrouver une information, construire une preuve, enquêter sur des images et contenus générés par IA, reprendre le contrôle de sa confidentialité, réagir face à un dommage numérique et conduire une enquête complète.",
  color: "#8B5CF6",
  icon: "search",
  outcomes: [
    "Retrouver une source et construire une recherche efficace",
    "Vérifier une affirmation sans confondre popularité et preuve",
    "Analyser images et contenus synthétiques avec méthode",
    "Contrôler sa confidentialité et intervenir face à un dommage",
    "Construire une chaîne de preuves et rendre un verdict défendable",
  ],
  status: "ready",
  progressPercent: 0,
  lessons: moduleThreeLessonSpecs.map((spec) => academyLesson(spec)),
  quiz: moduleThreeQuiz,
};
