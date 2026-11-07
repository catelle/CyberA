"use client";

/* eslint-disable react/no-unescaped-entities -- French lesson prose uses apostrophes throughout. */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CyberMascot } from "@/components/gamified/CyberMascot";
import { SoundToggleButton } from "@/components/lesson/SoundToggleButton";
import { playCorrect, playLessonOpen, playWrong, startAmbientLoop, stopAmbientLoop } from "@/lib/sounds";
import type { Language } from "@/types/auth";
import { englishWelcomeScenes } from "@/components/lesson/EnglishWelcomeBehindScreen";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Cloud,
  Database,
  Eye,
  Globe2,
  KeyRound,
  RadioTower,
  Router,
  Server,
  Smartphone,
} from "lucide-react";

const apps = [
  "WhatsApp",
  "TikTok",
  "Instagram",
  "Google",
  "Facebook",
  "ChatGPT",
  "Netflix",
  "YouTube",
  "Spotify",
  "Discord",
];

const storyThread = [
  "Je suis Coach Cyber. Tu vas enquêter sur un geste que tu fais sans y penser. Prépare-toi : ton écran ne montre presque rien de ce qui se passe réellement.",
  "Ton téléphone est devant toi. Tu le déverrouilles. Rien ne semble étrange… mais avant même de toucher une application, a-t-il déjà parlé à quelqu'un ?",
  "Tu viens de découvrir que ton téléphone communique sans bruit. Mais une question apparaît : ce qui est devant toi et ce qui circule dans l'écran appartiennent-ils au même monde ?",
  "Tu vois maintenant deux mondes superposés. Avant de suivre ton premier message, sauras-tu reconnaître ce qui peut être touché et ce qui n'existe que comme information ?",
  "Tu sais distinguer les deux mondes. Prends maintenant une photo, envoie-la à un proche, puis imagine que ton téléphone s'éteint immédiatement.",
  "La photo peut encore arriver alors que ton écran est éteint. Elle a donc quitté ton appareil. Mais où a-t-elle pu attendre ?",
  "Tu as trouvé l'indice : d'autres machines ont pris le relais. Elles restent invisibles. Suivons maintenant le signal qui part de ta main.",
  "Tu viens de voir un signal bouger. Mais un signal ne transporte pas une vraie photo en papier. Alors qu'emporte-t-il ?",
  "Ta photo est devenue des nombres. Pourtant, elle ne voyage pas en un seul bloc. Pourquoi la briser avant de l'envoyer ?",
  "Tes paquets ont été orientés jusqu'à des ordinateurs éloignés qui prennent le relais. Internet est le chemin pour les atteindre ; le cloud est le nom pratique donné au stockage et au travail de ces machines accessibles à distance. Allons voir où tes données arrivent vraiment.",
  "Tu viens d'utiliser des machines que tu n'as jamais vues. Quel travail ont-elles réellement accompli pour toi ?",
];

type DeepScene = {
  bridge: string;
  eyebrow: string;
  title: string;
  story: string;
  discovery: string;
  visual: string[];
  question?: string;
  options?: string[];
  correctIndex?: number;
};

const deepScenes: DeepScene[] = [
  { bridge: "Ton message est arrivé. Regarde maintenant les petites barres en haut de ton écran. Sont-elles Internet… ou seulement la première porte ?", eyebrow: "Mystère 12 · les barres", title: "Tes barres de réseau ne sont pas Internet.", story: "Elles te disent seulement si ton téléphone atteint une antenne ou une boîte Wi-Fi proche. Tu viens d'atteindre l'entrée. Le reste du voyage est encore caché.", discovery: "Ton téléphone rejoint d'abord un équipement proche. Mais après cette première porte… où part le signal ?", visual: ["📱 Toi", "〰️ Ondes", "📡 Première porte"] },
  { bridge: "Maintenant que ton signal a atteint la première porte, regarde sous tes pieds. Pourquoi trouve-t-on des câbles si Internet est sans fil ?", eyebrow: "Mystère 13 · sous tes pieds", title: "Le voyage sans fil devient rapidement un voyage dans des câbles.", story: "Près de toi, le signal traverse l'air. Pour aller loin, il entre souvent dans une fibre où de minuscules éclats de lumière transportent tes données.", discovery: "Le Wi-Fi ne couvre que le début. Mais comment cette lumière choisit-elle la bonne direction ?", visual: ["📡 Antenne", "💡 Lumière", "〰️ Fibre"] },
  { bridge: "Ta lumière arrive à un carrefour rempli de chemins. Qui décide de la prochaine direction sans même regarder ta photo ?", eyebrow: "Mystère 14 · le carrefour", title: "Une machine lit l'adresse, pas ton histoire.", story: "Chaque morceau porte une destination. Une machine compare cette destination aux routes qu'elle connaît, puis l'envoie au prochain carrefour. Cette machine s'appelle un routeur.", discovery: "Le routeur oriente ton paquet. Mais vers quelle machine essaie-t-il de l'envoyer ?", visual: ["📦 Ton paquet", "🔀 Choix", "➡️ Route"], question: "Que fait principalement le routeur ?", options: ["Il regarde ta photo", "Il choisit la prochaine route", "Il recharge ton téléphone"], correctIndex: 1 },
  { bridge: "Ton paquet a une route. Il finit par frapper à la porte d'un ordinateur qui semblait t'attendre. Pourquoi ?", eyebrow: "Mystère 15 · la machine éveillée", title: "Un ordinateur distant écoute ta demande.", story: "Ton téléphone demande : « Livre cette photo au bon compte. » L'ordinateur distant reçoit la demande et prépare une réponse. On l'appelle serveur parce que son rôle est de servir d'autres appareils.", discovery: "Le serveur a reçu ta demande. Mais que se passe-t-il si l'autre téléphone est hors ligne ?", visual: ["📱 Ta demande", "🏢 Serveur", "✅ Réponse"] },
  { bridge: "Le destinataire est hors ligne. Pourtant ton message ne disparaît pas. Où peut-il attendre ?", eyebrow: "Mystère 16 · l'attente", title: "Ton message peut attendre sur une autre machine.", story: "Le service conserve une copie. Quand l'autre appareil revient, il demande ce qui l'attend et récupère le message.", discovery: "Envoyé ne veut donc pas dire livré. Et livré ne veut pas dire lu. Mais combien de copies existent maintenant ?", visual: ["✓ Envoyé", "✓✓ Livré", "👁 Lu"] },
  { bridge: "Ton proche ouvre la photo. Tu la vois encore sur ton propre écran. Comment le même objet peut-il être à deux endroits ?", eyebrow: "Mystère 17 · les copies", title: "Partager ne déplace pas toujours. Partager copie.", story: "Tu gardes l'original. L'autre appareil reçoit une copie. Une sauvegarde peut en créer une troisième sans que tu la voies.", discovery: "Une donnée peut vivre à plusieurs endroits. Si tu supprimes la tienne… qui garde les autres ?", visual: ["🖼️ Chez toi", "🖼️ Chez l'autre", "🖼️ Sauvegarde"] },
  { bridge: "Plusieurs copies existent. Mais comment le service sait-il quel dossier est vraiment le tien ?", eyebrow: "Mystère 18 · ton identité", title: "Ton compte agit comme un dossier portant ton nom numérique.", story: "Ton identifiant indique quel dossier ouvrir. Ton mot de passe aide à prouver que tu as le droit de l'ouvrir. Ce n'est donc pas un simple mot.", discovery: "Ton compte te reconnaît. Mais comment retrouve-t-il ta vie numérique sur un nouvel appareil ?", visual: ["👤 Identifiant", "🔑 Preuve", "🗂️ Dossier"], question: "Quel élément doit rester secret ?", options: ["Le nom de l'application", "Ton mot de passe", "La couleur du téléphone"], correctIndex: 1 },
  { bridge: "Tu ouvres ton compte sur un nouvel appareil. Tes conversations réapparaissent. D'où viennent-elles ?", eyebrow: "Mystère 19 · le retour", title: "Ton nouvel appareil demande les dernières nouvelles.", story: "Il contacte le service distant. Le service retrouve ce qui appartient à ton compte et renvoie les mises à jour autorisées. Les deux appareils se rapprochent du même état.", discovery: "C'est la synchronisation. Mais toutes ces machines qui travaillent jour et nuit… qu'est-ce qui les maintient en vie ?", visual: ["📱 Ancien", "🔄 Échange", "💻 Nouveau"] },
  { bridge: "Tes données viennent de réapparaître. Derrière une porte fermée, tu entends pourtant des ventilateurs souffler. Pourquoi ?", eyebrow: "Mystère 20 · l'énergie", title: "L'invisible chauffe.", story: "Les machines calculent et produisent de la chaleur. Elles ont besoin d'électricité, de refroidissement et de secours pendant les coupures.", discovery: "Le numérique a donc un corps physique. Mais pourquoi répartir ce corps dans plusieurs villes ?", visual: ["⚡ Énergie", "🖥️ Calcul", "❄️ Froid"] },
  { bridge: "Une seule salle pourrait tomber en panne. Et si ton service cachait plusieurs salles derrière le même écran ?", eyebrow: "Mystère 21 · plusieurs maisons", title: "Ton service peut vivre dans plusieurs lieux à la fois.", story: "Des installations différentes peuvent garder le service disponible. Ta demande peut aller vers un lieu plus proche ou vers celui qui fonctionne encore.", discovery: "Plusieurs lieux donnent l'impression d'un seul service. Mais comment communiquent-ils entre continents ?", visual: ["🏢 Douala", "🏢 Lagos", "🏢 Europe"], question: "Pourquoi utiliser plusieurs lieux ?", options: ["Pour décorer une carte", "Pour rester disponible et plus proche", "Pour supprimer Internet"], correctIndex: 1 },
  { bridge: "Ta demande doit maintenant quitter l'Afrique. Regarde vers le ciel… puis sous l'océan. Quel chemin transporte le plus de données ?", eyebrow: "Mystère 22 · sous l'océan", title: "Une grande partie d'Internet plonge sous la mer.", story: "Des câbles reposent au fond de l'océan. À l'intérieur, la lumière transporte d'immenses quantités de données entre les continents.", discovery: "Ton message peut toucher le fond de la mer. Mais que se passe-t-il si ce câble se casse ?", visual: ["🌍 Côte", "🌊 Câble", "🌎 Continent"] },
  { bridge: "Le câble est endommagé. Ton message doit-il mourir au milieu du voyage ?", eyebrow: "Mystère 23 · le détour", title: "Le réseau peut chercher une autre route.", story: "Comme une voiture déviée après la fermeture d'une rue, certains paquets empruntent un détour. Le voyage ralentit parfois, mais il peut continuer.", discovery: "Le réseau résiste grâce aux chemins multiples. Mais les morceaux arriveront-ils dans le bon ordre ?", visual: ["⛔ Coupure", "↪️ Détour", "✅ Arrivée"] },
  { bridge: "Tes morceaux prennent des routes différentes. Le troisième arrive avant le premier. Pourquoi ta photo n'apparaît-elle pas mélangée ?", eyebrow: "Mystère 24 · remettre en ordre", title: "Chaque morceau porte les indices nécessaires pour être reconstruit.", story: "L'appareil destinataire vérifie les numéros, replace les morceaux et réclame ceux qui manquent. Ensuite seulement, ton image apparaît.", discovery: "Les règles reconstruisent ton message. Mais les machines du trajet peuvent-elles le lire ?", visual: ["③", "①", "②", "➡️", "①②③"], question: "Pourquoi numéroter les morceaux ?", options: ["Pour les décorer", "Pour les remettre dans le bon ordre", "Pour changer leur destination"], correctIndex: 1 },
  { bridge: "Ton image est reconstruite. Pourtant une nouvelle question dérange l'enquête : qui aurait pu la regarder pendant le trajet ?", eyebrow: "Mystère 25 · le cadenas", title: "Un cadenas peut cacher le contenu sans cacher tout le trajet.", story: "Le chiffrement transforme ton contenu pour le rendre illisible sans la bonne clé. Mais certaines étiquettes restent nécessaires pour savoir où livrer.", discovery: "On peut ignorer ce que tu dis tout en observant quand et avec qui tu communiques. Que révèlent ces indices répétés ?", visual: ["🔒 Contenu", "🏷️ Étiquette", "🛣️ Trajet"] },
  { bridge: "Personne n'a lu ton message. Pourtant les horaires montrent que tu écris chaque soir au même endroit. Est-ce déjà une histoire sur toi ?", eyebrow: "Mystère 26 · les traces", title: "Des détails répétés peuvent révéler tes habitudes.", story: "Une heure isolée dit peu. Des heures, lieux approximatifs et relations répétés peuvent dessiner ton rythme de vie sans ouvrir un seul message.", discovery: "Ces données autour de tes données sont des métadonnées. Quel service utilisé aujourd'hui en a probablement créé ?", visual: ["🕖 Heure", "📍 Zone", "👥 Relation"] },
  { bridge: "Tu regardes maintenant tes applications autrement. Derrière chaque icône, quel travail invisible demandes-tu ?", eyebrow: "Mystère 27 · le service", title: "Choisis une icône. Décris le travail, pas le nom.", story: "Commence ainsi : « Je donne… Le service contacte… Puis il me rend… » Tu viens de transformer une icône familière en système observable.", discovery: "Tu sais maintenant chercher l'entrée, le travail et le résultat. Mais peux-tu reconstruire tout le voyage sans aide ?", visual: ["📥 Ce que tu donnes", "⚙️ Travail caché", "📤 Ce que tu reçois"] },
  { bridge: "Il reste une seule épreuve : relier tout ce que tu as découvert sans perdre le fil.", eyebrow: "Mystère 28 · la carte complète", title: "Repars de ton doigt. Où va ton action ensuite ?", story: "Ton geste ouvre une application. L'information devient données, puis signal, puis paquets. Des équipements l'orientent. Des machines distantes travaillent. Un autre écran affiche le résultat.", discovery: "Aucune pièce n'est le monde numérique à elle seule. Alors qu'est-ce que le monde numérique ?", visual: ["👆", "📱", "〰️", "📡", "🌐", "🏢", "📱"], question: "Quel résumé est le plus juste ?", options: ["Ton téléphone agit seul", "De nombreux acteurs coopèrent", "Tout se passe dans le ciel"], correctIndex: 1 },
  { bridge: "Tu viens de relier toutes les pièces. Regarde ton téléphone comme au début. Est-ce encore seulement un objet dans ta main ?", eyebrow: "Mystère 29 · ton nouveau regard", title: "Tu vois maintenant la porte et ce qu'elle cachait.", story: "Derrière ton prochain geste, tu peux demander : qu'est-ce qui part, quel chemin est utilisé, quelles machines travaillent, quelles copies restent et quelles traces apparaissent ?", discovery: "Tu n'as pas mémorisé une liste. Tu as appris à enquêter. Une dernière question demeure : que feras-tu différemment maintenant que tu vois l'invisible ?", visual: ["👀 Observer", "❓ Questionner", "🧭 Choisir"] },
];

const deepMemory = [
  { stage: "Quitter le téléphone", takeaway: "Les barres indiquent seulement la première connexion, pas tout Internet.", connection: "La photo quitte ton téléphone par une antenne ou une boîte Wi-Fi proche." },
  { stage: "Voyager loin", takeaway: "Après le Wi-Fi, les données voyagent surtout dans des câbles et des fibres.", connection: "Le signal de ta photo passe de l'air à la lumière dans un câble." },
  { stage: "Choisir une route", takeaway: "Un routeur lit la destination et choisit le prochain chemin.", connection: "Les paquets de ta photo avancent de carrefour en carrefour." },
  { stage: "Demander un service", takeaway: "Un serveur est un ordinateur distant qui répond à une demande.", connection: "Le service reçoit les paquets et prépare la livraison de la photo." },
  { stage: "Attendre", takeaway: "Un message peut rester sur un serveur jusqu'au retour du destinataire.", connection: "Ta photo ne disparaît pas si le téléphone de ton proche est hors ligne." },
  { stage: "Créer des copies", takeaway: "Partager une donnée crée souvent une nouvelle copie au lieu de déplacer l'original.", connection: "La photo existe maintenant chez toi, dans le service et chez ton proche." },
  { stage: "Reconnaître le compte", takeaway: "Le compte indique quelles données t'appartiennent ; le mot de passe protège l'accès.", connection: "Le service utilise le bon compte pour livrer et retrouver la photo." },
  { stage: "Synchroniser", takeaway: "Un nouvel appareil récupère les données autorisées depuis le service distant.", connection: "La même conversation peut réapparaître sur plusieurs appareils." },
  { stage: "Voir le monde physique", takeaway: "Le cloud repose sur de vraies machines qui consomment de l'énergie et chauffent.", connection: "La photo est traitée dans un bâtiment réel, pas dans un nuage magique." },
  { stage: "Rester disponible", takeaway: "Plusieurs centres de données permettent au service de continuer malgré une panne.", connection: "Une autre machine peut prendre le relais pour livrer la photo." },
  { stage: "Traverser les continents", takeaway: "Les continents échangent surtout leurs données grâce à des câbles sous-marins.", connection: "La photo peut traverser l'océan sous forme de lumière." },
  { stage: "Contourner une panne", takeaway: "Quand un chemin est coupé, certains paquets peuvent emprunter une autre route.", connection: "Le voyage peut ralentir sans forcément s'arrêter." },
  { stage: "Reconstruire", takeaway: "Les numéros des paquets permettent de remettre les morceaux dans le bon ordre.", connection: "Le téléphone de ton proche reconstruit la photo avant de l'afficher." },
  { stage: "Protéger le contenu", takeaway: "Le chiffrement rend le contenu illisible sans la bonne clé.", connection: "La photo peut être protégée pendant son voyage." },
  { stage: "Observer les traces", takeaway: "Les métadonnées décrivent le trajet et les habitudes sans montrer le contenu.", connection: "L'heure, la destination et la fréquence des envois racontent déjà quelque chose." },
  { stage: "Comprendre le service", takeaway: "Un service numérique reçoit une entrée, réalise un travail, puis renvoie un résultat.", connection: "L'application visible cache toutes les étapes qui ont livré la photo." },
  { stage: "Relier le voyage", takeaway: "Un clic fonctionne parce que plusieurs appareils, réseaux et organisations coopèrent.", connection: "Tu peux maintenant raconter tout le voyage sans dire « c'est magique »." },
  { stage: "Adopter le réflexe cyber", takeaway: "Face à un service, demande ce qui part, qui travaille, quelles copies restent et quelles traces sont créées.", connection: "Cette méthode te servira pour chaque application, pas seulement pour cette photo." },
] as const;

type Props = { moduleId: string; lessonId: string; canComplete: boolean; language?: Language };
const SCENE_MINIMUM_SECONDS = 15;

const visualLabelsEn: Record<string, string> = {
  "📱 Toi": "📱 You",
  "📡 Première porte": "📡 First door",
  "📡 Antenne": "📡 Antenna",
  "💡 Lumière": "💡 Light",
  "〰️ Fibre": "〰️ Fiber",
  "📦 Ton paquet": "📦 Your packet",
  "🔀 Choix": "🔀 Choice",
  "➡️ Route": "➡️ Route",
  "📱 Ta demande": "📱 Your request",
  "🏢 Serveur": "🏢 Server",
  "✅ Réponse": "✅ Response",
  "✓ Envoyé": "✓ Sent",
  "✓✓ Livré": "✓✓ Delivered",
  "👁 Lu": "👁 Read",
  "🖼️ Chez toi": "🖼️ At your device",
  "🖼️ Chez l'autre": "🖼️ At the other device",
  "🖼️ Sauvegarde": "🖼️ Backup",
  "👤 Identifiant": "👤 Identifier",
  "🔑 Preuve": "🔑 Proof",
  "🗂️ Dossier": "🗂️ Folder",
  "📱 Ancien": "📱 Old device",
  "🔄 Échange": "🔄 Exchange",
  "💻 Nouveau": "💻 New device",
  "⚡ Énergie": "⚡ Energy",
  "🖥️ Calcul": "🖥️ Computing",
  "❄️ Froid": "❄️ Cooling",
  "🌍 Côte": "🌍 Coast",
  "🌊 Câble": "🌊 Cable",
  "🌎 Continent": "🌎 Continent",
  "⛔ Coupure": "⛔ Outage",
  "↪️ Détour": "↪️ Detour",
  "✅ Arrivée": "✅ Arrival",
  "🔒 Contenu": "🔒 Content",
  "🏷️ Étiquette": "🏷️ Label",
  "🛣️ Trajet": "🛣️ Journey",
  "🕖 Heure": "🕖 Time",
  "📍 Zone": "📍 Area",
  "👥 Relation": "👥 Relationship",
  "📥 Ce que tu donnes": "📥 What you provide",
  "⚙️ Travail caché": "⚙️ Hidden work",
  "📤 Ce que tu reçois": "📤 What you receive",
};

const questionLabelsEn: Record<string, string> = {
  "Que fait principalement le routeur ?": "What does a router mainly do?",
  "Quel élément doit rester secret ?": "Which element must remain secret?",
  "Pourquoi utiliser plusieurs lieux ?": "Why use several locations?",
  "Pourquoi numéroter les morceaux ?": "Why number the pieces?",
  "Quel résumé est le plus juste ?": "Which summary is most accurate?",
  "Il regarde ta photo": "It looks at your photo",
  "Il choisit la prochaine route": "It chooses the next route",
  "Il recharge ton téléphone": "It charges your phone",
  "Le nom de l'application": "The app's name",
  "Ton mot de passe": "Your password",
  "La couleur du téléphone": "The phone's color",
  "Pour décorer une carte": "To decorate a map",
  "Pour rester disponible et plus proche": "To stay available and closer",
  "Pour supprimer Internet": "To delete the Internet",
  "Pour les décorer": "To decorate them",
  "Pour les remettre dans le bon ordre": "To put them back in the right order",
  "Pour changer leur destination": "To change their destination",
  "Ton téléphone agit seul": "Your phone acts alone",
  "De nombreux acteurs coopèrent": "Many different actors cooperate",
  "Tout se passe dans le ciel": "Everything happens in the sky",
};

const pillars = [
  { start: 1, end: 5, name: "Voir derrière l'écran", goal: "distinguer ce que tu touches de l'information qui continue à voyager sans que tu la voies", unlocked: "Tu sais maintenant que l'écran est une porte, pas le monde numérique tout entier." },
  { start: 6, end: 10, name: "Suivre le voyage d'une donnée", goal: "suivre une photo depuis ton doigt jusqu'aux signaux, paquets, routes et services qui la transportent", unlocked: "Tu peux désormais raconter le voyage invisible d'une donnée." },
  { start: 11, end: 15, name: "Comprendre les chemins d'Internet", goal: "reconnaître le rôle du Wi-Fi, des câbles, des routeurs et des serveurs", unlocked: "Tu reconnais maintenant les premières machines et les chemins qui transportent tes données." },
  { start: 16, end: 20, name: "Retrouver tes données", goal: "comprendre les copies, les comptes, la synchronisation et les machines physiques du cloud", unlocked: "Tu comprends comment tes données peuvent attendre, être copiées et réapparaître sur un autre appareil." },
  { start: 21, end: 25, name: "Traverser un réseau mondial", goal: "suivre les données entre centres, continents, détours et mécanismes de protection", unlocked: "Tu peux suivre une donnée à grande distance et comprendre comment le réseau résiste aux problèmes." },
  { start: 26, end: 29, name: "Adopter le regard CyberAmbassador", goal: "repérer les métadonnées, comprendre un service et poser les bonnes questions avant d'agir", unlocked: "Tu sais désormais enquêter sur ce qui part, qui travaille, quelles copies restent et quelles traces sont créées." },
] as const;

export function WelcomeBehindScreen({
  moduleId,
  lessonId,
  canComplete,
  language = "fr",
}: Props) {
  const en = language === "en";
  const localizedStoryThread = language === "en"
    ? englishWelcomeScenes.slice(0, 11).map((scene) => scene[2])
    : storyThread;
  const localizedDeepScenes = language === "en"
    ? deepScenes.map((scene, index) => ({
        ...scene,
        eyebrow: englishWelcomeScenes[index + 11]?.[0] ?? scene.eyebrow,
        title: englishWelcomeScenes[index + 11]?.[1] ?? scene.title,
        story: englishWelcomeScenes[index + 11]?.[2] ?? scene.story,
        bridge: englishWelcomeScenes[index + 11]?.[2] ?? scene.bridge,
        discovery: englishWelcomeScenes[index + 11]?.[2] ?? scene.discovery,
        visual: scene.visual.map((label) => visualLabelsEn[label] ?? label),
        question: scene.question ? questionLabelsEn[scene.question] ?? scene.question : undefined,
        options: scene.options?.map((option) => questionLabelsEn[option] ?? option),
      }))
    : deepScenes;
  const localizedDeepMemory: ReadonlyArray<{ stage: string; takeaway: string; connection: string }> = en
    ? deepMemory.map((memory, index) => ({
        ...memory,
        stage: englishWelcomeScenes[index + 11]?.[1] ?? memory.stage,
        takeaway: englishWelcomeScenes[index + 11]?.[2] ?? memory.takeaway,
        connection: "This is one step in the journey from your device to the person receiving the result.",
      }))
    : deepMemory;
  const localizedPillars = en
    ? [
        { start: 1, end: 5, name: "See behind the screen", goal: "distinguish what you touch from the information that keeps travelling beyond your view", unlocked: "You now know that the screen is a door, not the whole digital world." },
        { start: 6, end: 10, name: "Follow a piece of data", goal: "follow a photo from your finger through signals, packets, routes, and services", unlocked: "You can now tell the invisible journey of a piece of data." },
        { start: 11, end: 15, name: "Understand Internet paths", goal: "recognize the roles of Wi-Fi, cables, routers, and servers", unlocked: "You recognize the first machines and paths carrying your data." },
        { start: 16, end: 20, name: "Find your data again", goal: "understand copies, accounts, synchronization, and the physical machines behind the cloud", unlocked: "You understand how data can wait, be copied, and reappear on another device." },
        { start: 21, end: 25, name: "Cross a global network", goal: "follow data between data centers and continents, including detours and protections", unlocked: "You can follow data over long distances and understand how the network handles problems." },
        { start: 26, end: 29, name: "Adopt a CyberAmbassador mindset", goal: "spot metadata, understand a service, and ask the right questions before acting", unlocked: "You can now investigate what an app does behind its icon." },
      ]
    : pillars;
  const [step, setStep] = useState(0);
  const [worldSortComplete, setWorldSortComplete] = useState(false);
  const [guess, setGuess] = useState<number | null>(null);
  const [services, setServices] = useState("");
  const [checkpointOne, setCheckpointOne] = useState<number | null>(null);
  const [checkpointTwo, setCheckpointTwo] = useState<number | null>(null);
  const [sceneRemainingSeconds, setSceneRemainingSeconds] = useState(SCENE_MINIMUM_SECONDS);
  const [sceneTimerVersion, setSceneTimerVersion] = useState(0);
  const timedScenes = useRef<Set<number>>(new Set());
  const [toast, setToast] = useState<{ message: string; mood: "celebrate" | "sad" } | null>(null);
  const [completedDeepScenes, setCompletedDeepScenes] = useState<Set<number>>(new Set());
  const [readyPillars, setReadyPillars] = useState<Set<number>>(new Set());
  const [hasRestoredProgress, setHasRestoredProgress] = useState(false);
  const total = 30;
  const progressStorageKey = `cybera:lesson-one:${moduleId}:${lessonId}:progress`;
  const progress = ((step + 1) / total) * 100;
  const title = useMemo(
    () =>
      step <= 10
        ? [
            language === "en" ? englishWelcomeScenes[0][1] : "Bienvenue derrière l'écran",
            language === "en" ? englishWelcomeScenes[1][1] : "Ton premier indice",
            language === "en" ? englishWelcomeScenes[2][1] : "Deux mondes superposés",
            language === "en" ? englishWelcomeScenes[3][1] : "Classe les indices",
            language === "en" ? englishWelcomeScenes[4][1] : "La photo qui continue",
            language === "en" ? englishWelcomeScenes[5][1] : "Où a-t-elle attendu ?",
            language === "en" ? englishWelcomeScenes[6][1] : "Suis le signal",
            language === "en" ? englishWelcomeScenes[7][1] : "Ce que transporte le signal",
            language === "en" ? englishWelcomeScenes[8][1] : "Pourquoi découper ?",
            language === "en" ? englishWelcomeScenes[9][1] : "Les machines derrière le cloud",
            language === "en" ? englishWelcomeScenes[10][1] : "Le travail derrière l'icône",
          ][step]
        : localizedDeepScenes[step - 11]?.title ?? "Digital Explorer",
    [language, localizedDeepScenes, step],
  );

  useEffect(() => {
    playLessonOpen();
    startAmbientLoop();
    return () => stopAmbientLoop();
  }, []);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(progressStorageKey) ?? "null");
      if (saved) {
        setStep(Math.min(total - 1, Math.max(0, Number(saved.step) || 0)));
        setWorldSortComplete(Boolean(saved.worldSortComplete));
        setGuess(typeof saved.guess === "number" ? saved.guess : null);
        setServices(typeof saved.services === "string" ? saved.services : "");
        setCheckpointOne(typeof saved.checkpointOne === "number" ? saved.checkpointOne : null);
        setCheckpointTwo(typeof saved.checkpointTwo === "number" ? saved.checkpointTwo : null);
        setCompletedDeepScenes(new Set(Array.isArray(saved.completedDeepScenes) ? saved.completedDeepScenes : []));
        setReadyPillars(new Set(Array.isArray(saved.readyPillars) ? saved.readyPillars : []));
      }
    } catch {
      // A damaged local entry must never block the lesson.
    } finally {
      setHasRestoredProgress(true);
    }
  }, [progressStorageKey]);

  useEffect(() => {
    if (!hasRestoredProgress) return;
    window.localStorage.setItem(progressStorageKey, JSON.stringify({
      step,
      worldSortComplete,
      guess,
      services,
      checkpointOne,
      checkpointTwo,
      completedDeepScenes: [...completedDeepScenes],
      readyPillars: [...readyPillars],
    }));
  }, [checkpointOne, checkpointTwo, completedDeepScenes, guess, hasRestoredProgress, progressStorageKey, readyPillars, services, step, worldSortComplete]);

  useEffect(() => {
    if (step === 0) {
      timedScenes.current.add(step);
      setSceneRemainingSeconds(0);
      return;
    }
    const briefingIndex = localizedPillars.findIndex(
      (pillar) => step === pillar.start,
    );
    if (briefingIndex >= 0 && !readyPillars.has(briefingIndex)) {
      setSceneRemainingSeconds(0);
      return;
    }
    if (timedScenes.current.has(step)) {
      setSceneRemainingSeconds(0);
      return;
    }

    setSceneRemainingSeconds(SCENE_MINIMUM_SECONDS);
    const interval = window.setInterval(() => {
      setSceneRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          timedScenes.current.add(step);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [readyPillars, sceneTimerVersion, step]);

  const remainingLabel = `${String(Math.floor(sceneRemainingSeconds / 60)).padStart(2, "0")}:${String(sceneRemainingSeconds % 60).padStart(2, "0")}`;
  const canTakeFinalQuiz = canComplete && sceneRemainingSeconds === 0;
  const checkpointBlocked =
    (step === 3 && !worldSortComplete) ||
    (step === 4 && checkpointOne !== 1) ||
    (step === 9 && checkpointTwo !== 2) ||
    (step === 10 && services.trim().length === 0) ||
    (step >= 11 && step <= 28 && !completedDeepScenes.has(step));
  const currentPillarIndex = localizedPillars.findIndex((pillar) => step >= pillar.start && step <= pillar.end);
  const currentPillar = currentPillarIndex >= 0 ? localizedPillars[currentPillarIndex] : null;
  const isPillarBriefing = Boolean(currentPillar && step === currentPillar.start && !readyPillars.has(currentPillarIndex));

  async function recordCheckpoint(checkpoint: number) {
    await fetch("/api/student/lesson-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId, lessonId, checkpoint }),
    }).catch(() => undefined);
  }

  function celebrate(message: string) {
    playCorrect();
    setToast({ message, mood: "celebrate" });
  }

  function encourage(message: string) {
    playWrong();
    setToast({ message, mood: "sad" });
  }

  function completeCurrentSceneTimer() {
    timedScenes.current.add(step);
    setSceneRemainingSeconds(0);
  }

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  return (
    <article className="cyber-lesson cyber-lesson-light overflow-hidden rounded-[1.75rem] border-2 border-[#586062] bg-slate-50 text-brand-ink shadow-[0_8px_0_0_rgba(88,96,98,1)]">
      <SoundToggleButton />
      {toast ? <MascotToast message={toast.message} mood={toast.mood} /> : null}
      <header className="lesson-investigation-header border-b border-primary/20 bg-primary px-4 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <Link
            aria-label="Retour au module"
            className="rounded-full border border-white/15 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            href={`/student/modules/${moduleId}`}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
              <span>{step === 0 ? (language === "en" ? "Welcome to guided training" : "Bienvenue dans la formation guidée") : isPillarBriefing ? (language === "en" ? "Next mission briefing" : "Présentation de la prochaine mission") : `${language === "en" ? "Guided training" : "Formation guidée"} · 15 ${language === "en" ? "seconds minimum per scene" : "s minimum par scène"} · ${remainingLabel}`}</span>
              <span>
                {step + 1}/{total}
              </span>
            </div>
            <div
              aria-label={`Progression ${Math.round(progress)} %`}
                className="h-2 overflow-hidden rounded-full bg-black/20"
            >
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="lesson-scene relative min-h-[640px]" key={step}>
        {step > 0 && !isPillarBriefing ? <StoryRibbon message={step >= 11 ? localizedDeepScenes[step - 11]?.bridge ?? "You are reaching the end of your investigation with Cyber Coach." : localizedStoryThread[step]} /> : null}
        {isPillarBriefing && currentPillar ? (
        <PillarBriefing language={language} count={currentPillar.end - currentPillar.start + 1} goal={currentPillar.goal} name={currentPillar.name} number={currentPillarIndex + 1} recap={currentPillarIndex > 0 ? localizedPillars[currentPillarIndex - 1].unlocked : undefined} onReady={() => {
            setReadyPillars((current) => new Set(current).add(currentPillarIndex));
            timedScenes.current.delete(step);
            setSceneRemainingSeconds(SCENE_MINIMUM_SECONDS);
            setSceneTimerVersion((version) => version + 1);
            celebrate(en ? `Mission accepted! Your goal is to ${currentPillar.goal}.` : `Mission acceptée ! Ton objectif est de ${currentPillar.goal}.`);
          }} />
        ) : null}
        {!isPillarBriefing ? <>
        {step === 0 ? (
          <section className="lesson-opening-scene lesson-scene relative grid min-h-[540px] place-items-center overflow-hidden bg-white px-5 py-16 text-center">
            <Image
              alt={en ? "A young person discovers the invisible global network behind a phone" : "Un jeune découvre le réseau mondial invisible derrière son téléphone"}
              className="lesson-opening-image object-cover opacity-55"
              fill
              priority
              sizes="100vw"
              src="/images/module-1/lesson-1/behind-the-screen.png"
            />
            <div className="absolute inset-0 bg-white/75" />
            <div className="relative max-w-4xl text-brand-ink">
              <div className="mx-auto mb-8 flex max-w-2xl flex-wrap justify-center gap-2">
                {apps.map((app, index) => (
                  <span
                    className="animate-[pulse_3s_ease-in-out_infinite] rounded-full border border-cyan-300/30 bg-slate-950/60 px-3 py-1.5 text-xs font-black text-cyan-100 backdrop-blur"
                    key={app}
                    style={{ animationDelay: `${index * 140}ms` }}
                  >
                    {app}
                  </span>
                ))}
              </div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
                {en ? "Welcome to CyberAmbassador training" : "Bienvenue dans la formation CyberAmbassador"}
              </p>
              <h1 className="font-display text-4xl font-black uppercase leading-none text-brand-ink sm:text-6xl lg:text-7xl">
                {en ? "Welcome" : "Bienvenue"}
                <br />
                <span className="text-primary">
                  {en ? "behind the screen" : "derrière l'écran"}
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
                {en ? "When we want to understand the Internet, we do not always know where to start. We may want to jump straight to complicated words. Here, we will move forward together, one discovery at a time." : "Quand on veut comprendre Internet, on ne sait pas toujours par où commencer. On voudrait parfois sauter directement aux mots compliqués. Ici, nous allons avancer ensemble, une découverte à la fois."}
              </p>
              <p className="mx-auto mt-4 max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 font-black leading-7 text-brand-blue shadow-sm">
                {en ? "Six missions will help you understand what really happens behind every click. Before each series, Cyber Coach will clearly explain the goal of the next scenes." : "Six missions vont t'aider à comprendre ce qui se passe vraiment derrière chaque clic. Avant chaque série, Coach Cyber t'expliquera clairement le but des prochaines scènes."}
              </p>
            </div>
          </section>
        ) : null}

        {step === 1 && !isPillarBriefing ? (
          <section className="grid min-h-[640px] items-center gap-8 p-6 lg:grid-cols-2 lg:p-10">
            <div>
              <p className="scene-label">{en ? "Scene 1" : "Scène 1"}</p>
              <h2 className="scene-title">{en ? "You unlock your phone." : "Tu déverrouilles ton téléphone."}</h2>
              <div className="mt-6 space-y-3 text-lg font-semibold leading-8 text-white/75">
                <p>
                  {en ? "The screen lights up. Nothing seems strange. You have not opened an app yet." : "L'écran s'allume. Rien d'étrange. Tu n'as encore ouvert aucune application."}
                </p>
                <p>
                  {en ? "Yet the time updates. Notifications arrive. The weather is already ready." : "Pourtant, l'heure se met à jour. Des notifications arrivent. La météo est déjà prête."}
                </p>
                <p className="pt-3 text-2xl font-black text-white">
                  {en ? "How does your phone already know all this?" : "Comment ton téléphone sait-il déjà tout cela ?"}
                </p>
                <p>
                  {en ? "It must have communicated. But with whom? And along which invisible path?" : "Il a forcément communiqué. Mais avec qui ? Et par quel chemin invisible ?"}
                </p>
              </div>
              <div className="lesson-key-evidence mt-7 rounded-2xl border border-primary bg-rose-50 p-4 font-black text-primary">
                {en ? "Today, you step behind the screen." : "Aujourd'hui, tu passes derrière l'écran."}
              </div>
            </div>
            <SceneImage language={language}
              alt="Un adolescent et le réseau numérique mondial derrière son téléphone"
              src="/images/module-1/lesson-1/behind-the-screen.png"
            />
          </section>
        ) : null}

        {step === 2 ? (
          <section className="grid min-h-[640px] items-center gap-8 p-6 lg:grid-cols-2 lg:p-10">
            <SceneImage language={language}
              alt="Le monde physique et le monde numérique côte à côte"
              src="/images/module-1/lesson-1/two-worlds.png"
            />
            <div>
              <p className="scene-label">{en ? "Scene 2" : "Scène 2"}</p>
              <h2 className="scene-title">
                {en ? "You do not live in only one world." : "Tu ne vis pas dans un seul monde."}
                <
                br />
                <span className="text-cyan-300">{en ? "You live in two." : "Tu vis dans deux."}</span>
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <WorldCard
                  title={en ? "The physical world" : "Le monde physique"}
                  items={en ? ["your room", "your school", "your family", "your city"] : ["ta chambre", "ton école", "ta famille", "ta ville"]}
                />
                <WorldCard
                  title={en ? "The digital world" : "Le monde numérique"}
                  items={en ? ["devices", "networks", "data", "algorithms"] : ["appareils", "réseaux", "données", "algorithmes"]}
                  accent
                />
              </div>
              <p className="mt-6 text-lg font-semibold leading-8 text-white/75">
                {en ? "It has no borders or closing time. It never sleeps, and it keeps growing." : "Il n'a ni frontières, ni heure de fermeture. Il ne dort jamais. Et il grandit sans cesse."}
              </p>
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="mx-auto flex min-h-[640px] max-w-4xl flex-col justify-center p-6 sm:p-10">
            <p className="scene-label">{en ? "Activity · two worlds meet" : "Expérience · deux mondes qui se rencontrent"}</p>
            <h2 className="scene-title">{en ? "Place each item where it exists." : "Place chaque élément là où il existe."}</h2>
            <p className="mt-3 text-white/60">{en ? "Drag the cards to the physical or digital world. On a phone, tap a card and then tap a column." : "Fais glisser les cartes vers le monde physique ou le monde numérique. Sur téléphone, touche une carte puis touche une colonne."}</p>
            <WorldSortActivity language={language} onComplete={() => {
              setWorldSortComplete(true);
              completeCurrentSceneTimer();
              celebrate(en ? "Excellent! You can now distinguish a physical object from digital information. Your investigation can continue." : "Excellent ! Tu distingues maintenant un objet physique d'une information numérique. Ton enquête peut continuer.");
            }} onMistake={() => encourage(en ? "Almost! Ask yourself: can I touch this item directly, or is it information shown by a machine?" : "Presque ! Demande-toi : puis-je toucher cet élément directement, ou est-ce une information affichée par une machine ?")} />
          </section>
        ) : null}

        {step === 4 ? (
          <section className="grid min-h-[640px] items-center gap-8 p-6 lg:grid-cols-2 lg:p-10">
            <div>
              <p className="scene-label">{en ? "Scene 3 · The biggest misunderstanding" : "Scène 3 · Le plus grand malentendu"}</p>
              <h2 className="scene-title">
                {en ? "You turn off your phone. Does your photo still exist?" : "Tu éteins ton téléphone. Ta photo existe-t-elle encore ?"}
              </h2>
              <div className="mt-6 space-y-4 text-lg font-semibold leading-8 text-white/70">
                <p>{en ? "You take a photo and send it to someone close to you. Then your phone turns off." : "Tu prends une photo. Tu l'envoies à un proche. Puis ton téléphone s'éteint."}</p>
                <p className="text-xl font-black text-primary">{en ? "A few seconds later, they receive it anyway. How is that possible?" : "Quelques secondes plus tard, ton proche la reçoit quand même. Comment est-ce possible ?"}</p>
                <p>{en ? "A copy left your device before it turned off. Something else continued the work." : "Une copie a quitté ton appareil avant qu'il ne s'éteigne. Quelque chose d'autre a poursuivi le travail."}</p>
                <p>{en ? <>Your phone is like a <strong className="text-white">door</strong>: you see the handle, but not the corridors, rooms, and people working behind it.</> : <>Le téléphone est donc comme une <strong className="text-white">porte</strong> : tu vois la poignée, mais pas les couloirs, les salles et les personnes qui travaillent derrière.</>}</p>
              </div>
            </div>
            <SceneImage language={language}
              alt="Un téléphone utilisé comme clé vers une immense infrastructure numérique"
              src="/images/module-1/lesson-1/phone-is-a-key.png"
            />
            <div className="lg:col-span-2">
              <AttentionCheck
                answer={checkpointOne}
                correctIndex={1}
                explanation={en ? "Your phone is the visible door. Other machines keep your message moving even when your screen is off." : "Ton téléphone est la porte visible. Ton message continue grâce à d'autres machines, même lorsque ton écran est éteint."}
                onAnswer={(answer) => {
                  setCheckpointOne(answer);
                  if (answer === 1) {
                    void recordCheckpoint(1);
                    completeCurrentSceneTimer();
                    celebrate(en ? "Good reasoning! The phone is the visible door, not everything working behind it." : "Bien raisonné ! Le téléphone est la porte visible, pas tout le monde qui travaille derrière.");
                  } else {
                    encourage(en ? "I see your reasoning, but revisit the clue: your message continues even when your phone is off." : "Je vois ton raisonnement, mais reprends l'indice : ton message continue même lorsque ton téléphone est éteint.");
                  }
                }}
                options={[
                  ...(en ? ["Everything stays inside the phone", "The phone opens access to other connected machines", "The battery stores Internet services"] : ["Tout reste à l'intérieur du téléphone", "Le téléphone ouvre l'accès à d'autres machines reliées entre elles", "La batterie stocke les services Internet"]),
                ]}
                question={en ? "Why do we compare the phone to a key?" : "Pourquoi compare-t-on le téléphone à une clé ?"}
                title={en ? "Checkpoint 1 · ideas 1 to 5" : "Checkpoint 1 · idées 1 à 5"}
              />
            </div>
          </section>
        ) : null}

        {step === 5 ? (
          <section className="mx-auto flex min-h-[640px] max-w-3xl flex-col justify-center p-6 sm:p-10">
            <KeyRound className="mb-5 h-12 w-12 text-violet-300" />
            <p className="scene-label">{en ? "Mini-activity · No searching" : "Mini-activité · Sans chercher"}</p>
            <h2 className="scene-title">
              {en ? "After sending, where can your photo exist?" : "Après l'envoi, où ta photo peut-elle exister ?"}
            </h2>
            <p className="mt-3 font-semibold leading-7 text-white/60">{en ? "Remember: your phone is off, but the other person still receives the photo." : "Souviens-toi : ton téléphone est éteint, mais ton proche reçoit tout de même la photo."}</p>
            <div className="mt-8 grid gap-3">
              {[
                ...(en ? ["Only on your phone", "On other machines that transport it, then on the other person's phone", "On the SIM card", "In the battery"] : ["Uniquement dans ton téléphone", "Sur d'autres machines qui la transportent, puis sur le téléphone de ton proche", "Dans la carte SIM", "Dans la batterie"]),
              ].map((option, index) => (
                <button
                  className={`rounded-2xl border-2 p-4 text-left font-black transition ${guess === index ? (index === 1 ? "border-emerald-300 bg-emerald-300/15 text-emerald-100" : "border-rose-300 bg-rose-300/10 text-rose-100") : "border-white/15 bg-white/5 hover:bg-white/10"}`}
                  key={option}
                  onClick={() => {
                    setGuess(index);
                    if (index === 1) {
                      completeCurrentSceneTimer();
                      celebrate(en ? "Well done! You used the clue: your photo left your device and other machines continued the work." : "Bravo ! Tu as utilisé l'indice : ta photo a quitté ton appareil et d'autres machines ont poursuivi le travail.");
                    } else {
                      encourage(en ? "That choice does not match the clue. Your phone is off, yet the photo still arrives." : "Ce choix ne correspond pas à l'indice. Ton téléphone est éteint, pourtant la photo arrive encore.");
                    }
                  }}
                  type="button"
                >
                  <span className="mr-3 text-white/40">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
            {guess !== null ? (
              <p className="mt-5 rounded-2xl bg-white/5 p-4 font-semibold leading-7 text-white/75">
                {guess === 1
                  ? (en ? "Exactly. You discovered the idea before the vocabulary: remote computers receive, route, and sometimes temporarily store the photo. We will give them a name soon." : "Exact. Tu viens de découvrir l'idée avant le vocabulaire : des ordinateurs éloignés reçoivent, orientent et parfois conservent temporairement la photo. Nous leur donnerons bientôt un nom.")
                  : (en ? "Return to the clue: if your phone is off and the photo arrives, it must have been handed to something else during its journey." : "Reviens à l'indice : si ton téléphone est éteint et que la photo arrive, elle a forcément été confiée à autre chose pendant son voyage.")}
              </p>
            ) : null}
          </section>
        ) : null}

        {step === 6 && !isPillarBriefing ? (
          <section className="grid min-h-[640px] items-center gap-8 p-6 lg:grid-cols-2 lg:p-10">
            <SceneImage language={language}
              alt="La Terre reliée par des satellites, câbles et flux de données"
              src="/images/module-1/lesson-1/invisible-world.png"
            />
            <div>
              <p className="scene-label">{language === "en" ? "Scene 4 · watch the journey" : "Scène 4 · regarde le voyage"}</p>
              <h2 className="scene-title">
                {language === "en" ? "An invisible light leaves your hand." : "Une lumière invisible quitte ta main."}
              </h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-white/70">{language === "en" ? "You tap Send. Your phone turns the photo into signals too fast to see. Follow the point of light. Where does it go after leaving your screen?" : "Tu touches « Envoyer ». Ton téléphone transforme la photo en signaux trop rapides pour être vus. Suis le point lumineux. Où disparaît-il après ton écran ?"}</p>
              <LiveSignalDemo language={language} />
              <div className="mt-7 rounded-2xl border border-violet-300/25 bg-violet-300/10 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-violet-200">
                  {language === "en" ? "Did you know? · 2024 estimate" : "Le savais-tu ? · estimation 2024"}
                </p>
                <p className="mt-2 text-3xl font-black">{language === "en" ? "≈ 5.9 million" : "≈ 5,9 millions"}</p>
                <p className="text-white/65">
                  {language === "en" ? "Google searches begin every minute. Each one starts its own invisible journey." : "de recherches Google commencent chaque minute. Chacune déclenche son propre voyage invisible."}
                </p>
                <a
                  className="mt-3 inline-block text-xs font-bold text-cyan-300 underline"
                  href="https://www.domo.com/learn/infographic/data-never-sleeps-12"
                  rel="noreferrer"
                  target="_blank"
                >
                  {language === "en" ? "Source: Data Never Sleeps 12.0 ↗" : "Source : Data Never Sleeps 12.0 ↗"}
                </a>
              </div>
            </div>
          </section>
        ) : null}

        {step === 7 ? (
          <section className="mx-auto flex min-h-[640px] max-w-5xl flex-col justify-center p-6 sm:p-10">
            <p className="scene-label">{language === "en" ? "Break an action down" : "Décomposons une action"}</p>
            <h2 className="scene-title">
              {language === "en" ? "A photo becomes a package that nobody can hold." : "La photo devient un colis que personne ne peut tenir."}
            </h2>
            <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-white/65">
              {language === "en" ? "Imagine an extraordinary postal service. You do not hand over an envelope: your phone translates the colors in your photo into numbers, adds a destination, and gives everything to the network. But how can numbers become your photo again?" : "Imagine une poste extraordinaire. Tu ne remets pas une enveloppe : ton téléphone traduit les couleurs de ta photo en nombres, ajoute une destination, puis confie le tout au réseau. Mais comment des nombres peuvent-ils redevenir ta photo ?"}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <ExplainCard
                icon={<Smartphone />}
                number="1"
                title={language === "en" ? "1. Translate" : "1. Traduire"}
                text={language === "en" ? "A machine does not see a smile or a blue sky as we do. Your phone turns every detail into numbers. These numbers are data: a way to represent information." : "Une machine ne voit pas un sourire ou un ciel bleu comme nous. Le téléphone transforme chaque détail en nombres. Ces nombres sont les données : une manière de représenter l'information."}
              />
              <ExplainCard
                icon={<RadioTower />}
                number="2"
                title={language === "en" ? "2. Hand it over" : "2. Confier"}
                text={language === "en" ? "Your phone turns those numbers into a signal and hands it to either your home's Wi-Fi box or a nearby antenna. That is what Wi-Fi and mobile networks make possible." : "Le téléphone transforme ces nombres en signal et les confie soit à la petite boîte Internet de la maison, soit à une antenne du quartier. Voilà ce que Wi-Fi et réseau mobile permettent."}
              />
              <ExplainCard
                icon={<Router />}
                number="3"
                title={language === "en" ? "3. Route it" : "3. Orienter"}
                text={language === "en" ? "Like a crossroads, a machine reads the destination and chooses the next path. This machine is a router: its job is to route the data, not understand the photo." : "Comme à un carrefour, une machine lit la destination et choisit le prochain chemin. Cette machine s'appelle un routeur : son travail est d'orienter, pas de comprendre la photo."}
              />
            </div>
            <div className="mt-6 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-5 font-semibold leading-7 text-cyan-50">
              <strong>{language === "en" ? "Remember:" : "À retenir :"}</strong> {language === "en" ? "Data is information translated for a machine. A signal carries it. A router points it to the next route." : "une donnée est une information traduite pour une machine. Un signal la transporte. Un routeur lui indique la prochaine route."}
            </div>
          </section>
        ) : null}

        {step === 8 ? (
          <section className="mx-auto flex min-h-[640px] max-w-5xl flex-col justify-center p-6 sm:p-10">
            <p className="scene-label">{language === "en" ? "The journey continues" : "Le voyage continue"}</p>
            <h2 className="scene-title">
              {language === "en" ? "Why split a photo before sending it?" : "Pourquoi découper une photo avant de l'envoyer ?"}
            </h2>
            <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-white/65">
              {language === "en" ? "Imagine a huge piece of furniture being moved through the streets of Yaoundé: it is difficult to carry. If it is taken apart into numbered pieces, each piece travels more easily and the furniture can be rebuilt on arrival. The network does something similar with a photo." : "Imagine un énorme meuble à transporter dans les rues de Yaoundé : il passe difficilement. Si on le démonte en petites pièces numérotées, chaque pièce voyage plus facilement et le meuble peut être remonté à l'arrivée. Le réseau fait quelque chose de semblable avec la photo."}
            </p>
            <p className="mt-4 rounded-xl border-l-4 border-rose-400 bg-rose-400/10 p-4 font-semibold leading-7 text-white/70">{language === "en" ? <>Each numbered piece is called a <strong className="text-white">packet</strong>. Your contact never sees them: their device puts them back in order. But who routes them there?</> : <>Chaque petit morceau numéroté s'appelle un <strong className="text-white">paquet</strong>. Ton proche ne les voit jamais : son appareil les remet dans l'ordre. Mais qui les oriente jusque-là ?</>}</p>
            <div className="lesson-route mt-10 grid items-center gap-3 text-center sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
              <JourneyStop
                icon={<Smartphone />}
                label={en ? "Your phone" : "Ton téléphone"}
                note={en ? "prepares the data" : "prépare les données"}
              />
              <ArrowRight className="lesson-route-arrow mx-auto h-6 w-6 rotate-90 text-cyan-300 sm:rotate-0" />
              <JourneyStop
                icon={<RadioTower />}
                label={en ? "First door" : "Première porte"}
                note={en ? "Internet box or antenna" : "boîte Internet ou antenne"}
              />
              <ArrowRight className="lesson-route-arrow mx-auto h-6 w-6 rotate-90 text-cyan-300 sm:rotate-0" />
              <JourneyStop
                icon={<Server />}
                label={en ? "Sorting room" : "Salle de tri"}
                note={en ? "machines find the recipient" : "les machines trouvent ton proche"}
              />
              <ArrowRight className="lesson-route-arrow mx-auto h-6 w-6 rotate-90 text-cyan-300 sm:rotate-0" />
              <JourneyStop
                icon={<Smartphone />}
                label={en ? "Their phone" : "Son téléphone"}
                note={en ? "receives and displays" : "reçoit et affiche"}
              />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <WorldCard
                title={en ? "The content" : "Le contenu"}
                items={en ? ["the text", "the photo", "the voice note"] : ["le texte", "la photo", "la note vocale"]}
              />
              <WorldCard
                title={en ? "The package label" : "L'étiquette du colis"}
                items={en ? ["the time", "the sender", "the size", "the delivery status"] : ["l'heure", "l'expéditeur", "la taille", "l'état de livraison"]}
                accent
              />
            </div>
            <p className="mt-5 text-sm font-semibold leading-6 text-white/55">{en ? <>The technical name for the “label” is <strong className="text-white">metadata</strong>: information that describes a message without being the message itself. The sending time and destination help deliver it without revealing what the photo shows.</> : <>Le nom technique de « l'étiquette » est <strong className="text-white">métadonnée</strong> : une information qui décrit le message sans être le message lui-même. L'heure d'envoi et la destination aident à livrer sans raconter ce que montre la photo.</>}</p>
            <div className="mt-6 rounded-2xl border-2 border-cyan-300/30 bg-cyan-300/10 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-300">Le lien avec la prochaine scène</p>
              <div className="mt-3 grid gap-3 text-center font-black sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                <span className="rounded-xl bg-white/5 p-3">📦 Tes paquets</span>
                <ArrowRight className="mx-auto h-5 w-5 rotate-90 text-cyan-300 sm:rotate-0" />
                <span className="rounded-xl bg-white/5 p-3">🌐 Internet les transporte</span>
                <ArrowRight className="mx-auto h-5 w-5 rotate-90 text-cyan-300 sm:rotate-0" />
                <span className="rounded-xl bg-white/5 p-3">🏢 Des ordinateurs distants travaillent</span>
              </div>
              <p className="mt-4 font-semibold leading-7 text-cyan-50">{en ? <>When an app uses remote computers for storage or processing over the Internet, we often call it the <strong>cloud</strong>. The cloud is not the space that data travels through: <strong>the Internet is the path; the cloud is the remote destination and service.</strong></> : <>Quand une application utilise par Internet le stockage ou le travail de ces ordinateurs éloignés, on parle souvent de <strong>cloud</strong>. Le cloud n'est donc pas l'espace traversé par les données : <strong>Internet est le chemin, le cloud est la destination et le service accessible à distance.</strong></>}</p>
            </div>
          </section>
        ) : null}

        {step === 9 ? (
          <section className="grid min-h-[640px] items-start gap-8 p-6 lg:grid-cols-2 lg:p-10">
            <div className="grid gap-5">
              <SceneImage language={language}
                alt="Un téléphone ouvre l'accès à des serveurs distants"
                src="/images/module-1/lesson-1/phone-is-a-key.png"
              />
              <div className="rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-cyan-300">{en ? "Do not mix the two" : "Ne mélange pas les deux"}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="rounded-xl bg-slate-950/35 p-4"><p className="text-2xl">🌐</p><p className="mt-2 font-black">{en ? "Internet = the path" : "Internet = le chemin"}</p><p className="mt-1 text-sm font-semibold leading-6 text-white/60">{en ? "The network carries packets between devices and machines." : "Le réseau transporte les paquets entre les appareils et les machines."}</p></div>
                  <div className="rounded-xl bg-slate-950/35 p-4"><p className="text-2xl">☁️</p><p className="mt-2 font-black">{en ? "Cloud = the remote service" : "Cloud = le service distant"}</p><p className="mt-1 text-sm font-semibold leading-6 text-white/60">{en ? "Computers elsewhere store data or work for you." : "Des ordinateurs ailleurs stockent des données ou travaillent pour toi."}</p></div>
                </div>
                <p className="mt-4 border-l-4 border-cyan-300 pl-4 font-black leading-7 text-cyan-50">{en ? "Your photo travels over the Internet, then may be stored or processed in the cloud." : "Ta photo voyage sur Internet, puis peut être conservée ou traitée dans le cloud."}</p>
              </div>
            </div>
            <div>
              <p className="scene-label">{en ? "A commonly misunderstood word" : "Un mot souvent mal compris"}</p>
              <h2 className="scene-title">
                {en ? "The cloud is like a locker you can access from anywhere." : "Le cloud ressemble à un casier accessible depuis partout."}
              </h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-white/70">
                {en ? "You keep a notebook in your bag. Without the bag, you cannot read it. Now imagine a secure locker you can open from your phone, computer, or tablet. The notebook is not inside any of these screens. Where does it stay?" : "Tu gardes un cahier dans ton sac. Sans le sac, tu ne peux pas le lire. Imagine maintenant un casier sécurisé que tu peux ouvrir depuis ton téléphone, un ordinateur ou une tablette. Le cahier n'est dans aucun de ces écrans. Où reste-t-il ?"}
              </p>
              <p className="mt-4 text-lg font-semibold leading-8 text-white/70">{en ? "The cloud works this way. Your files stay on computers switched on elsewhere. The Internet is the path that lets you access them, and your account is part of the key." : "Le cloud fonctionne selon cette idée. Tes fichiers restent sur des ordinateurs allumés ailleurs. Internet est le chemin qui te permet d'y accéder, et ton compte est une partie de la clé."}</p>
              <div className="mt-6 space-y-3">
                <Definition
                  icon={<Server />}
                  title={en ? "The computer that serves" : "L'ordinateur qui sert"}
                  text={en ? "A server is first of all a computer. It is called a server because it provides something to other devices: a photo, page, video, or answer." : "Un serveur est d'abord un ordinateur. On l'appelle ainsi parce qu'il sert quelque chose à d'autres appareils : une photo, une page, une vidéo ou une réponse."}
                />
                <Definition
                  icon={<Database />}
                  title={en ? "The building that protects them" : "Le bâtiment qui les protège"}
                  text={en ? "Many servers are kept in a data center: a real building with cables, backup electricity, fans, and people who protect it." : "Beaucoup de serveurs sont rangés dans un centre de données : un vrai bâtiment avec des câbles, de l'électricité de secours, des ventilateurs et des gardiens."}
                />
                <Definition
                  icon={<Cloud />}
                  title={en ? "The name for this access" : "Le nom donné à l'accès"}
                  text={en ? "Cloud is a practical way to say: I use storage or computing power belonging to computers located elsewhere, through the Internet." : "Cloud est le mot pratique pour dire : « j'utilise par Internet du stockage ou de la puissance appartenant à des ordinateurs situés ailleurs »."}
                />
              </div>
              <p className="mt-5 rounded-2xl bg-white/5 p-4 font-semibold leading-7 text-white/65">
                {en ? <>When you use an app to send, search, save, or watch something, it provides a <strong className="text-white">digital service</strong>. But what is the difference between the visible icon and the hidden work?</> : <>Quand tu utilises une application pour envoyer, chercher, sauvegarder ou regarder quelque chose, elle te rend un <strong className="text-white">service numérique</strong>. Mais quelle différence y a-t-il entre l'icône visible et le travail caché ?</>}
              </p>
            </div>
            <div className="lg:col-span-2">
              <AttentionCheck
                answer={checkpointTwo}
                correctIndex={2}
                explanation="Oui. Le cloud n'est pas la machine : c'est la façon d'accéder par Internet au stockage ou au travail de machines situées ailleurs."
                onAnswer={(answer) => {
                  setCheckpointTwo(answer);
                  if (answer === 2) {
                    void recordCheckpoint(2);
                    completeCurrentSceneTimer();
                    celebrate("Exact ! Le cloud n'est plus un nuage mystérieux : ce sont des ressources réelles accessibles à distance.");
                  } else {
                    encourage("Pas encore. Reviens à l'image du casier : l'écran ouvre l'accès, mais les fichiers sont gardés sur des ordinateurs ailleurs.");
                  }
                }}
                options={[
                  "Un espace sans machines situé dans le ciel",
                  "La mémoire cachée de ton téléphone",
                  "Le stockage et le travail d'ordinateurs éloignés accessibles par Internet",
                ]}
                question="Dans l'image du casier, qu'est-ce qui ressemble le plus au cloud ?"
                title="Checkpoint 2 · idées 6 à 10"
              />
            </div>
          </section>
        ) : null}

        {step === 10 ? (
          <section className="mx-auto flex min-h-[640px] max-w-3xl flex-col justify-center p-6 text-center sm:p-10">
            <Eye className="mx-auto mb-6 h-14 w-14 text-cyan-300" />
            <p className="scene-label">{en ? "Guided reflection · first, define the word" : "Réflexion guidée · d'abord, définissons le mot"}</p>
            <h2 className="scene-title">
              {en ? "A digital service does something for you through a screen." : "Un service numérique fait quelque chose pour toi à travers un écran."}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-semibold leading-8 text-white/65">
              {en ? "Sending a message is a service. Searching for information, watching a video remotely, saving a photo, or asking an AI for an answer are services too. The app is the visible door; the service is the work behind it." : "Envoyer un message est un service. Chercher une information, regarder une vidéo à distance, sauvegarder une photo ou demander une réponse à une IA en sont aussi. L'application est la porte visible ; le service est le travail réalisé derrière."}
            </p>
            <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
              <div className="rounded-xl bg-white/5 p-4"><span className="text-2xl">💬</span><p className="mt-2 font-black">{en ? "Communicate" : "Communiquer"}</p><p className="text-xs text-white/50">{en ? "message, call, email" : "message, appel, email"}</p></div>
              <div className="rounded-xl bg-white/5 p-4"><span className="text-2xl">🔎</span><p className="mt-2 font-black">{en ? "Find" : "Trouver"}</p><p className="text-xs text-white/50">{en ? "search, map, weather" : "recherche, carte, météo"}</p></div>
              <div className="rounded-xl bg-white/5 p-4"><span className="text-2xl">🎬</span><p className="mt-2 font-black">{en ? "Watch or listen" : "Regarder ou écouter"}</p><p className="text-xs text-white/50">{en ? "video, music, live" : "vidéo, musique, direct"}</p></div>
            </div>
            <p className="mx-auto mt-5 max-w-xl font-black text-primary">{en ? "Now that the word is clear: which services have you used today, and what work did each one do for you?" : "Maintenant que le mot est clair : quels services as-tu utilisés aujourd'hui, et quel travail chacun a-t-il fait pour toi ?"}</p>
            <label
              className="mt-8 text-left text-sm font-black text-cyan-100"
              htmlFor="services"
            >
              {en ? "Write down at least one service used today" : "Note au moins un service utilisé aujourd'hui"}
            </label>
            <textarea
              className="mt-2 min-h-32 rounded-2xl border-2 border-white/15 bg-white/5 p-4 font-semibold text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300"
              id="services"
              onChange={(event) => {
                const value = event.target.value;
                setServices(value);
                if (value.trim().length > 0) completeCurrentSceneTimer();
              }}
              placeholder={en ? "Example: messaging — it delivered my message to my sister…" : "Exemple : messagerie — elle a livré mon message à ma sœur…"}
              value={services}
            />
            <div className="mt-7 rounded-2xl border border-amber-200/25 bg-amber-200/10 p-5 text-left">
              <p className="font-black text-amber-900">
                {en ? "Mission for the next hour" : "Mission pour la prochaine heure"}
              </p>
              <p className="mt-2 leading-7 text-white/70">
                {en ? "Each time you use your phone, note the app you opened, why you opened it, and what information you shared. Do not change anything: observe." : <>À chaque utilisation de ton téléphone, note l'application ouverte, pourquoi tu l'as ouverte et quelle information tu as partagée. Ne change rien : observe.</>}
              </p>
            </div>
          </section>
        ) : null}

        {step >= 11 && step <= 28 && !isPillarBriefing ? (
          <DeepJourneyScene
            language={language}
            completed={completedDeepScenes.has(step)}
              memory={localizedDeepMemory[step - 11]}
            onCorrect={() => {
              setCompletedDeepScenes((current) => new Set(current).add(step));
              if (deepScenes[step - 11]?.question) completeCurrentSceneTimer();
              celebrate("Découverte validée ! Coach Cyber ajoute cette pièce à ta carte mentale.");
            }}
            onWrong={() => encourage("Pas tout à fait. Relis l'indice : la réponse est cachée dans ce qui vient de t'arriver.")}
            scene={localizedDeepScenes[step - 11]}
          />
        ) : null}

        {step === 29 ? (
          <section className="relative grid min-h-[640px] place-items-center overflow-hidden p-6 text-center sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.18),transparent_55%)]" />
            <div className="relative max-w-3xl">
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-2 border-cyan-300 bg-cyan-300/10 shadow-[0_0_60px_rgba(34,211,238,.3)]">
                <Globe2 className="h-12 w-12 text-cyan-300" />
              </div>
              <p className="mt-7 text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
                Capacité débloquée
              </p>
              <h2 className="mt-3 font-display text-4xl font-black sm:text-6xl">
                Digital Explorer
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-xl font-semibold leading-9 text-white/75">Reprends ton téléphone. C'est le même objet qu'au début.</p>
              <p className="mx-auto mt-3 max-w-2xl text-2xl font-black leading-9 text-rose-200">Mais peux-tu encore le regarder sans imaginer les signaux, les routes, les machines, les copies et les traces derrière l'écran ?</p>
              <div className="mx-auto mt-7 max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-5 text-left">
                <p className="text-xs font-black uppercase tracking-widest text-cyan-300">Ce que tu sais faire maintenant</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Raconter comment une donnée quitte ton téléphone", "Distinguer Internet, serveur et cloud", "Expliquer comment des paquets trouvent leur destination", "Identifier les copies et les traces laissées", "Poser les bonnes questions avant de faire confiance à un service"].map((ability) => <p className="flex gap-3 rounded-xl bg-slate-950/35 p-3 font-bold leading-6 text-white/75" key={ability}><Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />{ability}</p>)}
                </div>
              </div>
              <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-rose-300/30 bg-rose-300/10 p-5 text-left"><p className="text-xs font-black uppercase tracking-widest text-rose-300">Ta prochaine enquête commence maintenant</p><p className="mt-2 font-semibold leading-7 text-white/75">La prochaine fois qu'une application semble te connaître, ralentis. Demande-toi : qu'ai-je donné, qui a travaillé, et qu'a-t-on pu apprendre ?</p></div>
              <div className="mx-auto mt-6 flex max-w-2xl items-center gap-4 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-5 text-left">
                <CyberMascot mood="celebrate" size="sm" />
                <div><p className="font-black text-cyan-100">Bravo, tu as terminé la leçon !</p><p className="mt-1 font-semibold leading-7 text-white/70">Il est temps de redonner de l'énergie à Coach Cyber avec le quiz. Souviens-toi : cherche toujours ce qui part, le chemin emprunté, les machines qui travaillent et les traces laissées.</p></div>
              </div>
              {canTakeFinalQuiz ? (
                <Link
                  className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-7 font-black text-slate-950 shadow-[0_5px_0_0_rgba(14,116,144,1)] transition hover:bg-cyan-200"
                  href={`/student/modules/${moduleId}/lesson/${lessonId}/quiz`}
                >
                  Donner de l'énergie à Coach Cyber · Quiz <ArrowRight className="h-5 w-5" />
                </Link>
              ) : canComplete ? (
                <div className="mt-8 rounded-2xl border-2 border-rose-300/40 bg-rose-950/30 p-5">
                  <p className="font-black text-rose-100">Prends encore {sceneRemainingSeconds} seconde{sceneRemainingSeconds > 1 ? "s" : ""} pour relire cette dernière scène.</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/60">Le quiz apparaîtra automatiquement lorsque tu auras terminé le temps d'observation de cette dernière scène.</p>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}
        </> : null}
      </div>

      <footer className="lesson-investigation-footer flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-4 sm:px-7">
        <button
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-slate-300 px-4 font-black text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
          disabled={step === 0}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          type="button"
        >
          <ArrowLeft className="h-4 w-4" /> {language === "en" ? "Back" : "Retour"}
        </button>
        <span className="hidden text-sm font-bold text-slate-500 sm:block">
          {title}
        </span>
        <button
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 font-black text-white shadow-[0_4px_0_#7f1d36] transition hover:bg-[#a80f39] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none disabled:opacity-100"
          disabled={step === total - 1 || checkpointBlocked || isPillarBriefing || sceneRemainingSeconds > 0}
          onClick={() => {
            if (currentPillar && step === currentPillar.end) celebrate(currentPillar.unlocked);
            setStep((value) => Math.min(total - 1, value + 1));
          }}
          type="button"
        >
          {sceneRemainingSeconds > 0 ? (language === "en" ? `Continue in ${sceneRemainingSeconds}s` : `Continuer dans ${sceneRemainingSeconds} s`) : language === "en" ? "Continue" : "Continuer"} <ArrowRight className="h-4 w-4" />
        </button>
      </footer>
    </article>
  );
}

function PillarBriefing({ language, count, goal, name, number, onReady, recap }: { language: Language; count: number; goal: string; name: string; number: number; onReady: () => void; recap?: string }) {
  const en = language === "en";
  return (
    <section className="grid min-h-[540px] place-items-center bg-slate-50 p-5 text-brand-ink sm:p-10">
      <div className="w-full max-w-4xl rounded-[2rem] border-2 border-secondary bg-white p-6 shadow-[0_7px_0_0_rgba(88,96,98,1)] sm:p-10">
        <div className="grid gap-7 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="mx-auto rounded-2xl bg-brand-sky p-3"><CyberMascot mood={recap ? "celebrate" : "focus"} size="lg" /></div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-primary">{en ? `Mission ${number} of ${pillars.length}` : `Mission ${number} sur ${pillars.length}`}</p>
            <h2 className="mt-2 font-display text-3xl font-black leading-tight text-brand-blue sm:text-5xl">{name}</h2>
            {recap ? <p className="mt-4 rounded-xl border-l-4 border-brand-gold bg-[#fff8d9] p-4 font-bold leading-7 text-slate-700"><strong className="text-brand-ink">{en ? "What you already know:" : "Ce que tu sais déjà :"}</strong> {recap}</p> : null}
          </div>
        </div>
        <div className="mt-7 rounded-2xl border border-rose-200 bg-rose-50 p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-widest text-primary">{en ? `Your goal for the next ${count} scenes` : `Ton objectif pour les ${count} prochaines scènes`}</p>
          <p className="mt-3 text-xl font-black leading-8 text-brand-ink">{en ? `You will learn to ${goal}.` : `Tu vas apprendre à ${goal}.`}</p>
          <p className="mt-3 font-semibold leading-7 text-slate-600">{en ? "Observe the situations, connect the clues, and answer the short questions. Each scene will add one piece to the complete mechanism." : "Observe les situations, relie les indices et réponds aux petites questions. Chaque scène ajoutera une pièce au mécanisme complet."}</p>
        </div>
        <div className="mt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-bold text-slate-500">{en ? "No countdown during this briefing." : "Aucun décompte sur cette présentation."}</p>
          <button className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-secondary bg-primary px-7 font-black text-white shadow-[0_4px_0_0_#ffcc32] transition hover:bg-[#8f1237]" onClick={onReady} type="button">{en ? "Start the mission" : "Commencer la mission"} <ArrowRight className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  );
}

function SceneImage({ alt, src, language = "fr" }: { alt: string; src: string; language?: Language }) {
  return (
    <figure className="lesson-image relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
      <Image
        alt={alt}
        className="object-cover transition duration-700 hover:scale-105"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        src={src}
      />
      <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-slate-950/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur">
        {language === "en" ? "Visual clue · observe the scene" : "Indice visuel · observe la scène"}
      </figcaption>
    </figure>
  );
}

function StoryRibbon({ message }: { message: string }) {
  return (
    <aside className="relative z-20 flex items-center gap-4 border-b border-slate-200 bg-white px-5 py-3 text-brand-ink sm:px-8">
      <CyberMascot mood="focus" size="sm" />
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Cyber Coach · investigation trail</p>
        <p className="mt-1 max-w-4xl text-sm font-semibold leading-6 text-slate-600">{message}</p>
      </div>
    </aside>
  );
}

function MascotToast({ message, mood }: { message: string; mood: "celebrate" | "sad" }) {
  return (
    <div className={`mascot-toast mascot-toast-${mood} fixed right-4 top-4 z-[100] flex w-[min(92vw,28rem)] items-center gap-3 rounded-2xl border-2 bg-white p-4 text-brand-ink shadow-2xl`} role="status" aria-live="polite">
      <CyberMascot mood={mood} size="sm" />
      <div><p className="text-xs font-black uppercase tracking-widest text-primary">{mood === "celebrate" ? "Bravo !" : "Coach Cyber t'aide"}</p><p className="mt-1 text-sm font-bold leading-6 text-slate-700">{message}</p></div>
    </div>
  );
}

function DeepJourneyScene({
  language,
  completed,
  memory,
  onCorrect,
  onWrong,
  scene,
}: {
  language: Language;
  completed: boolean;
  memory: { stage: string; takeaway: string; connection: string };
  onCorrect: () => void;
  onWrong: () => void;
  scene: DeepScene;
}) {
  const en = language === "en";
  const [answer, setAnswer] = useState<number | null>(null);
  return (
    <section className="mx-auto flex min-h-[640px] max-w-5xl flex-col justify-center p-6 sm:p-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <p className="text-xs font-black uppercase tracking-widest text-cyan-300">{en ? "Your photo's journey" : "Le voyage de ta photo"}</p>
        <p className="text-sm font-black text-white/65">{en ? "Current step:" : "Étape actuelle :"} <span className="text-white">{memory.stage}</span></p>
      </div>
      <p className="scene-label">{en ? "A question to solve" : "Une question à résoudre"}</p>
      <h2 className="scene-title max-w-4xl">{scene.title}</h2>
      <div className="mt-7 grid gap-7 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div>
          <p className="text-lg font-semibold leading-8 text-white/72">{scene.story}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-rose-300/25 bg-[#100f12] p-5">
            {scene.visual.map((item, index) => (
              <div className="flex items-center gap-2" key={`${item}-${index}`}>
                <span className="deep-scene-item lesson-dark-text rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center font-black">{item}</span>
                {index < scene.visual.length - 1 ? <ArrowRight className="deep-scene-arrow h-5 w-5 text-rose-300" /> : null}
              </div>
            ))}
          </div>
        </div>
        <aside className="rounded-2xl border-2 border-cyan-300/30 bg-cyan-300/10 p-5">
          <div className="flex items-start gap-3"><CyberMascot mood={completed ? "celebrate" : "focus"} size="sm" /><div><p className="text-xs font-black uppercase tracking-widest text-cyan-300">{en ? "One idea to remember" : "Une seule idée à retenir"}</p><p className="mt-2 text-lg font-black leading-7 text-white">{memory.takeaway}</p></div></div>
          <div className="mt-5 border-t border-white/10 pt-4"><p className="text-xs font-black uppercase tracking-widest text-rose-300">{en ? "The link to our photo" : "Le lien avec notre photo"}</p><p className="mt-2 font-semibold leading-7 text-white/70">{memory.connection}</p></div>
          <details className="mt-4 rounded-xl bg-slate-950/30 p-3 text-sm text-white/60"><summary className="cursor-pointer font-black text-white/75">{en ? "The question that prepares what comes next" : "La question qui prépare la suite"}</summary><p className="mt-2 leading-6">{scene.discovery}</p></details>
        </aside>
      </div>
      {scene.question && scene.options ? (
        <div className="mt-7 rounded-2xl border-2 border-primary bg-white p-5 text-brand-ink shadow-[0_4px_0_0_#ffcc32]">
          <p className="text-xs font-black uppercase tracking-widest text-primary">{en ? "Check your understanding" : "Question de vérification"}</p>
          <p className="mt-2 text-lg font-black">{scene.question}</p>
          <div className="mt-3 grid gap-2">{scene.options.map((option, index) => <button className={`rounded-xl border-2 p-3 text-left text-sm font-bold transition ${answer === index ? index === scene.correctIndex ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-primary bg-rose-50 text-primary" : "border-slate-300 bg-white text-slate-700 hover:border-primary"}`} key={option} onClick={() => { setAnswer(index); if (index === scene.correctIndex) onCorrect(); else onWrong(); }} type="button">{String.fromCharCode(65 + index)}. {option}</button>)}</div>
        </div>
      ) : (
        <button className={`mt-7 self-center rounded-xl border-2 px-6 py-3 font-black transition ${completed ? "border-emerald-500 bg-emerald-100 text-emerald-900" : "border-rose-300 bg-rose-50 text-brand-ink hover:bg-rose-100"}`} onClick={onCorrect} type="button">{completed ? (en ? "Discovery understood ✓" : "Découverte comprise ✓") : (en ? "I understand this discovery" : "J'ai compris cette découverte")}</button>
      )}
    </section>
  );
}

type WorldKind = "physical" | "digital";
const worldItems: Array<{ id: string; label: string; labelEn: string; icon: string; world: WorldKind }> = [
  { id: "book", label: "Un cahier", labelEn: "A notebook", icon: "📒", world: "physical" },
  { id: "ball", label: "Un ballon", labelEn: "A ball", icon: "⚽", world: "physical" },
  { id: "tree", label: "Un arbre", labelEn: "A tree", icon: "🌳", world: "physical" },
  { id: "bike", label: "Un vélo", labelEn: "A bicycle", icon: "🚲", world: "physical" },
  { id: "message", label: "Un message envoyé", labelEn: "A sent message", icon: "💬", world: "digital" },
  { id: "video", label: "Une vidéo en ligne", labelEn: "An online video", icon: "▶️", world: "digital" },
  { id: "account", label: "Un compte en ligne", labelEn: "An online account", icon: "👤", world: "digital" },
  { id: "search", label: "Un résultat de recherche", labelEn: "A search result", icon: "🔎", world: "digital" },
];

function WorldSortActivity({ language, onComplete, onMistake }: { language: Language; onComplete: () => void; onMistake: () => void }) {
  const en = language === "en";
  const [placements, setPlacements] = useState<Record<string, WorldKind>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  function place(itemId: string, world: WorldKind) {
    const item = worldItems.find((candidate) => candidate.id === itemId);
    if (!item) return;
    if (item.world !== world) {
      setFeedback(en ? `Look at “${item.labelEn}”: can you touch it directly, or does it exist as information on a screen?` : `Observe « ${item.label} » : peux-tu le toucher directement, ou existe-t-il sous forme d'information sur un écran ?`);
      onMistake();
      return;
    }
    const next = { ...placements, [itemId]: world };
    setPlacements(next);
    setSelected(null);
    setFeedback(en ? "Good observation. Continue until both worlds are complete." : "Bien vu. Continue jusqu'à ce que les deux mondes soient complets.");
    if (Object.keys(next).length === worldItems.length) onComplete();
  }

  function drop(event: React.DragEvent, world: WorldKind) {
    event.preventDefault();
    place(event.dataTransfer.getData("text/plain"), world);
  }

  const remaining = worldItems.filter((item) => !placements[item.id]);

  return (
    <div className="mt-7">
      <div className="flex min-h-24 flex-wrap justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        {remaining.map((item) => (
          <button
            className={`lesson-dark-text cursor-grab rounded-xl border-2 px-4 py-3 text-left font-black transition active:cursor-grabbing ${selected === item.id ? "border-primary bg-primary shadow-[0_3px_0_0_#586062]" : "border-[#586062] bg-[#25292a] hover:border-primary"}`}
            draggable
            key={item.id}
            onClick={() => setSelected(item.id)}
            onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)}
            type="button"
          >
            <span className="mr-2 text-xl" aria-hidden>{item.icon}</span>{en ? item.labelEn : item.label}
          </button>
        ))}
        {remaining.length === 0 ? <p className="self-center font-black text-emerald-200">{en ? "All cards are placed." : "Toutes les cartes sont placées."}</p> : null}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {(["physical", "digital"] as const).map((world) => (
          <button
            className={`min-h-52 rounded-2xl border-2 border-dashed p-5 text-left transition ${world === "physical" ? "border-amber-300/45 bg-amber-300/10" : "border-rose-300/45 bg-rose-300/10"}`}
            key={world}
            onClick={() => selected && place(selected, world)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => drop(event, world)}
            type="button"
          >
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">{en ? "Drop here" : "Dépose ici"}</span>
            <h3 className="mt-1 text-xl font-black">{world === "physical" ? (en ? "🌍 Physical world" : "🌍 Monde physique") : (en ? "✨ Digital world" : "✨ Monde numérique")}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {worldItems.filter((item) => placements[item.id] === world).map((item) => <span className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-brand-ink" key={item.id}>{item.icon} {en ? item.labelEn : item.label}</span>)}
            </div>
          </button>
        ))}
      </div>
      <p className="mt-4 min-h-6 text-center text-sm font-semibold text-primary" role="status">{feedback}</p>
    </div>
  );
}

function LiveSignalDemo({ language }: { language: Language }) {
  const stops = [
    { icon: "📱", label: language === "en" ? "Your phone" : "Ton téléphone" },
    { icon: "📡", label: language === "en" ? "Nearby antenna" : "Antenne du quartier" },
    { icon: "🌊", label: language === "en" ? "Cables" : "Câbles" },
    { icon: "🏢", label: language === "en" ? "Service machines" : "Machines du service" },
    { icon: "📱", label: language === "en" ? "Your contact" : "Ton proche" },
  ];
  return (
    <div className="mt-6 rounded-2xl border border-rose-300/30 bg-[#100f12] p-4">
      <div className="signal-track relative grid grid-cols-5 gap-1">
        <span className="signal-packet" aria-hidden>✦</span>
        {stops.map((stop) => (
          <div className="relative z-10 text-center" key={stop.label}>
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border-2 border-rose-300/40 bg-[#2b171d] text-2xl">{stop.icon}</span>
            <p className="mt-2 text-[10px] font-black leading-4 text-white/65 sm:text-xs">{stop.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm font-semibold leading-6 text-white/55">{language === "en" ? "The signal changes form: waves in the air, light in cables, then data inside machines. The photo remains recognizable because every step follows shared rules." : "Le signal change de support : ondes dans l'air, lumière dans des câbles, puis données dans les machines. La photo reste reconnaissable parce que chaque étape suit des règles communes."}</p>
    </div>
  );
}
function WorldCard({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${accent ? "border-cyan-300/30 bg-cyan-300/10" : "border-white/15 bg-white/5"}`}
    >
      <h3 className="font-black text-white">{title}</h3>
      <ul className="mt-3 space-y-1 text-sm font-semibold text-white/60">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
function ExplainCard({
  icon,
  number,
  title,
  text,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="lesson-stagger rounded-2xl border border-white/15 bg-white/5 p-5">
      <div className="flex items-center justify-between text-cyan-300">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-300/10">
          {icon}
        </span>
        <span className="text-3xl font-black text-white/15">{number}</span>
      </div>
      <h3 className="mt-5 text-lg font-black">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-white/60">
        {text}
      </p>
    </div>
  );
}
function JourneyStop({
  icon,
  label,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  note: string;
}) {
  return (
    <div className="lesson-stagger rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-4">
      <span className="mx-auto grid h-11 w-11 place-items-center text-cyan-300">
        {icon}
      </span>
      <p className="mt-2 font-black">{label}</p>
      <p className="mt-1 text-xs font-semibold text-white/50">{note}</p>
    </div>
  );
}
function Definition({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-300/10 text-violet-300">
        {icon}
      </span>
      <div>
        <h3 className="font-black">{title}</h3>
        <p className="mt-1 text-sm font-semibold leading-6 text-white/60">
          {text}
        </p>
      </div>
    </div>
  );
}

function AttentionCheck({
  answer,
  correctIndex,
  explanation,
  onAnswer,
  options,
  question,
  title,
}: {
  answer: number | null;
  correctIndex: number;
  explanation: string;
  onAnswer: (answer: number) => void;
  options: string[];
  question: string;
  title: string;
}) {
  const passed = answer === correctIndex;
  return (
    <aside className="mt-5 rounded-2xl border-2 border-primary bg-white p-5 text-brand-ink shadow-[0_4px_0_0_#ffcc32]">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Question de vérification · {title}</p>
      <h3 className="mt-2 text-xl font-black text-brand-ink">{question}</h3>
      <div className="mt-4 grid gap-2">
        {options.map((option, index) => (
          <button
            className={`rounded-xl border-2 p-3 text-left text-sm font-bold transition ${answer === index ? passed ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-primary bg-rose-50 text-primary" : "border-slate-300 bg-white text-slate-700 hover:border-primary"}`}
            key={option}
            onClick={() => onAnswer(index)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      {answer !== null ? (
        <p className={`mt-4 text-sm font-semibold leading-6 ${passed ? "text-emerald-700" : "text-primary"}`}>
          {passed ? explanation : "Pas encore. Relis les explications juste au-dessus et essaie à nouveau."}
        </p>
      ) : (
        <p className="mt-4 text-xs font-bold text-slate-500">Choisis une réponse pour continuer.</p>
      )}
    </aside>
  );
}
