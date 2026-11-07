import type { ProgramModule } from "@/lib/program";
import { getLocalizedModuleThree } from "@/lib/curriculum/module-three";
import type { Language } from "@/types/auth";

type ModuleTranslation = { title: string; subtitle: string; summary: string; outcomes: string[] };

const translations: Record<number, ModuleTranslation> = {
  1: { title: "The Digital World", subtitle: "Understand what really happens behind the screen", summary: "Follow the invisible traces of your clicks and build a clear mental map of the internet, data, algorithms, and your digital identity.", outcomes: ["Follow a message", "Understand the value of data", "Observe algorithms", "Map your digital footprint"] },
  2: { title: "Digital Survivor", subtitle: "Recognize danger, protect yourself, and help someone else", summary: "Practical digital-survival training built around realistic incidents, decisions, and missions.", outcomes: ["Recognize manipulation", "Protect devices and accounts", "Respond to an incident", "Help without making danger worse"] },
  3: { title: "Digital Superpowers", subtitle: "Search, verify, analyze, protect, and respond methodically", summary: "Missions to find information, build evidence, investigate images and AI-generated content, and respond to digital harm.", outcomes: ["Find sources effectively", "Verify claims with evidence", "Analyze images and synthetic content", "Control privacy and respond to harm"] },
  4: { title: "Becoming a CyberAmbassador", subtitle: "Turn your voice, community, and Sykoti network into ways to act", summary: "Lead by example, choose your cause, communicate, mobilize, teach, and build with the Sykoti network.", outcomes: ["Build credibility", "Mobilize responsibly", "Teach a skill", "Activate the Sykoti network"] }
};

const lessonTitles: Record<string, string> = {
  "ou-est-internet": "Welcome behind the screen", "apres-envoyer": "Inside TikTok: who chooses your next video?", "inside-whatsapp": "Inside WhatsApp: what happens after Send?", "inside-facebook": "Inside Facebook: who decides what appears first?", "inside-instagram": "Inside Instagram: how does it know what inspires you?", "inside-google": "Inside Google: how does it search so quickly?", "inside-ai-chatbots": "Inside AI chatbots: does AI know its answers?", "your-digital-shadow": "Your digital shadow: how much does the internet know about you?", "business-of-internet": "The business of the internet: who pays for free?", "conscious-digital-citizen": "Becoming a conscious digital citizen",
  "bad-guys": "Who are the attackers?", "think-like-attacker": "Think like an attacker", "social-engineering": "Social engineering", "fake-websites": "Fake websites", "whatsapp-scams": "WhatsApp scams", "fake-opportunities": "Fake opportunities", "romance-investment-scams": "Romance and investment scams", "protect-phone": "Protect your phone", "passwords-mfa": "Passwords and MFA", "fake-news-ai": "Fake news and AI", "cyberbullying-digital-harm": "Cyberbullying and digital harm", "incident-response": "What to do when an attack has already happened", "digital-survival-guide": "The 10 rules of digital survival", "digital-survivor": "Digital survivor",
  "information-hunter": "Find what others cannot find", "truth-detective": "Separate facts from fiction", "visual-investigator": "Read between the pixels", "ai-decoder": "Unmask the machine", "privacy-guardian": "Who can see you?", "digital-first-responder": "Raise the alarm", "master-investigator": "Think like an investigator", "show-the-example": "Lead by example before you speak", "technology-not-magic": "Technology is not magic", "find-your-cause": "Find your cause", "make-message-travel": "Make your message travel", "power-of-numbers": "The power of numbers", "mobilize-dont-react": "Mobilize, do not just react", "pass-on-your-power": "Pass on your power", "create-local-movement": "Create your local movement", "network-behind-you": "You have a network behind you", "cyberambassador-code": "The CyberAmbassador code"
};

export function localizeProgramModule(module: ProgramModule, language: Language): ProgramModule {
  if (language === "fr") return module;
  if (module.week === 3) return getLocalizedModuleThree(module);
  return {
    ...module,
    ...(translations[module.week] ?? {}),
    lessons: module.lessons.map((lesson) => ({ ...lesson, title: lessonTitles[lesson.id] ?? lesson.title }))
  };
}
