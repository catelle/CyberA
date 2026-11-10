import type { InvestigationLesson, InvestigationScene } from "@/lib/curriculum/module-one-investigations";

type EnglishLesson = Omit<InvestigationLesson, "id" | "scenes"> & {
  id: string;
  scenes: Array<Omit<InvestigationScene, "visual"> & { visual?: InvestigationScene["visual"] }>;
};

const scene = (title: string, narration: string, evidence: string, coach: string, visual?: InvestigationScene["visual"]): InvestigationScene => ({
  eyebrow: "Investigation · Understand",
  title,
  narration,
  evidence,
  coach,
  visual
});

function buildLesson(value: EnglishLesson): InvestigationLesson {
  const chapters = value.scenes.flatMap((sceneItem, chapterIndex) => [
    {
      ...sceneItem,
      eyebrow: `Chapter ${chapterIndex + 1} · Observe`,
      narration: `Look closely at this situation before explaining it: ${sceneItem.narration}`,
      coach: "Observe the clue first. You do not need to memorize it yet.",
    },
    {
      ...sceneItem,
      eyebrow: `Chapter ${chapterIndex + 1} · Understand`,
    },
    {
      ...sceneItem,
      eyebrow: `Chapter ${chapterIndex + 1} · Verify`,
      title: `Apply clue ${chapterIndex + 1}.`,
      narration: `Use what you just discovered to explain this situation in your own words. ${sceneItem.narration}`,
      coach: "If you can explain the clue in your own words, you have understood it.",
    },
  ]);

  return {
    ...value,
    scenes: [
      {
        eyebrow: "Opening scene · The mystery",
        title: value.mystery,
        narration: `You will solve this question in ${value.scenes.length} chapters. In each chapter, observe a situation, understand the mechanism behind it, then verify what you learned.`,
        evidence: "One question will guide the entire investigation.",
        coach: "We will begin with the first clue. No technical vocabulary is required.",
      },
      ...chapters,
      {
        eyebrow: "Synthesis · Connect the evidence",
        title: "Rebuild the whole mechanism.",
        narration: value.summary.map((item, index) => `${index + 1}. ${item}`).join(" "),
        evidence: value.transformation,
        coach: `The ${value.scenes.length} clues now form one logical chain.`,
      },
      {
        eyebrow: `Scene ${chapters.length + 2} · Into the real world`,
        title: "Take the investigation beyond the screen.",
        narration: "You understand the mechanism. The final mission will help you recognize it in a real situation without exposing private data.",
        evidence: "Understanding becomes useful when it changes an action.",
        coach: value.cliffhanger,
      },
    ],
  };
}

export const moduleOneEnglishInvestigations: Record<string, InvestigationLesson> = {
  "inside-whatsapp": buildLesson({
    id: "inside-whatsapp", title: "Inside WhatsApp", transformation: "Message Mapper", mystery: "What happens after you press Send?", atmosphere: "Digital World · Communication", accent: "#25D366", image: "/images/module-1/message-journey.png",
    scenes: [
      scene("WhatsApp is more than a green icon.", "A message connects your phone, your network, WhatsApp systems and the recipient's device. Every part has a role in delivery.", "A message is a journey through devices, networks and services.", "Map the journey before thinking about privacy.", { type: "flow", items: ["Your phone", "Network", "Service", "Recipient"], caption: "A message travels through connected systems." }),
      scene("Your message becomes data.", "Text and images are transformed into data that can travel through networks. The service coordinates delivery, but the data is still connected to devices and accounts.", "Digital services move data according to rules.", "Separate the content from the systems that carry it.", { type: "signal", items: ["Text", "Image", "Account", "Delivery"] }),
      scene("End-to-end encryption protects content.", "Personal messages can be protected while travelling between devices. Encryption protects the content, but it does not make every surrounding detail invisible.", "Content protection is not the same as complete invisibility.", "Ask what is protected and what is still needed for the service.", { type: "checklist", items: ["Content", "Account", "Device", "Delivery"] }),
      scene("Privacy does not stop at the message.", "Phone numbers, groups, contacts, devices, backups, screenshots and forwarded copies can still affect your privacy.", "Copies and surrounding information can remain outside your control.", "A safer message is also one you are comfortable seeing copied.", { type: "warning", items: ["Screenshots", "Forwarding", "Backups", "Group members"] }),
      scene("Build your privacy map.", "Draw a message journey and mark what is protected, what is processed and what another person could copy.", "Good privacy decisions start with a complete map.", "Use the map before sharing sensitive content.", { type: "timeline", items: ["Create", "Encrypt", "Deliver", "Copy or save", "Review"] })
    ],
    mission: ["Draw the journey of a non-sensitive message.", "List three pieces of operating information that are not the message content.", "Identify three ways a message can leave your control."],
    summary: ["Messages travel through connected systems.", "Encryption protects content but does not erase every trace.", "Recipients and copies are part of your privacy decision."],
    cliffhanger: "A message can be delivered privately and still influence a much larger network. Next, investigate how a platform decides what appears first.",
  }),
  "inside-facebook": buildLesson({
    id: "inside-facebook", title: "Inside Facebook", transformation: "Attention Decoder", mystery: "Who decides what appears first?", atmosphere: "Digital World · Platforms", accent: "#1877F2", image: "/images/module-1/digital-twin.png",
    scenes: [
      scene("Your screen cannot show everything.", "A platform has more possible posts than your screen can display. It must choose an order.", "The feed is a selection, not a complete view of reality.", "Ask what the ranking leaves out.", { type: "flow", items: ["Many posts", "Signals", "Ranking", "Your feed"] }),
      scene("Every post receives an estimate.", "The system estimates which posts may lead to a click, reaction, comment or longer visit. A high position is a prediction, not a truth certificate.", "Ranking optimizes an objective.", "Separate relevance from truth.", { type: "signal", items: ["Interest", "Timing", "Reaction", "Ranking"] }),
      scene("Reactions accelerate circulation.", "Likes, comments and shares create new signals. Content that triggers strong reactions can travel further, including content that is angry or misleading.", "Engagement can amplify useful or harmful information.", "Pause before rewarding a post with attention.", { type: "warning", items: ["Pause", "Check", "React", "Share"] }),
      scene("Sharing connects several networks.", "When you share, a post enters your relationships and may be seen without its original context.", "Sharing is also a distribution decision.", "Keep the source and context attached.", { type: "timeline", items: ["See", "Check", "Context", "Share"] }),
    ],
    mission: ["Choose three free services and find how each earns money.", "Observe an advertisement and list possible reasons it appeared.", "Count the interface features that encourage a longer session."],
    summary: ["A feed ranks a selection of posts.", "Engagement can amplify content without proving it true.", "Your reactions help shape what appears next."],
    cliffhanger: "The feed is not the only system learning from your actions. Next, investigate how images and interests become a digital profile.",
  }),
  "inside-instagram": buildLesson({
    id: "inside-instagram", title: "Inside Instagram", transformation: "Pattern Reader", mystery: "How does it know what inspires you?", atmosphere: "Digital World · Identity", accent: "#E1306C", image: "/images/module-1/message-journey.png",
    scenes: [
      scene("A photo contains more than pixels.", "A photo may carry context such as time, place, device, people and the story attached to it.", "Images can reveal information beyond their visible scene.", "Look at both the image and its context.", { type: "signal", items: ["Image", "Time", "Place", "Context"] }),
      scene("Small actions build an interest map.", "Likes, follows, saves, searches and pauses can be combined into a prediction of what may interest you.", "Repeated micro-actions become a pattern.", "A pattern is an estimate, not your whole identity.", { type: "flow", items: ["Action", "Signal", "Pattern", "Prediction"] }),
      scene("Recommendations can narrow your world.", "When one topic receives repeated attention, the system may show more of it and fewer alternatives.", "Convenience can reduce discovery.", "Search outside the recommendation loop.", { type: "warning", items: ["Repeat", "Narrow", "Compare", "Explore"] }),
      scene("Every publication affects reputation.", "A post can be copied, interpreted differently or connected to your future opportunities.", "Publishing is a long-term identity decision.", "Ask whether future audiences would understand the context.", { type: "checklist", items: ["Audience", "Context", "Consent", "Future"] }),
    ],
    mission: ["Map an ecosystem of services, devices and data.", "Review apps connected through a sign-in service.", "Imagine what would be difficult to recover if you left the ecosystem."],
    summary: ["Images and actions carry context.", "Platforms build interest predictions from repeated signals.", "Publishing shapes a reputation that can travel."],
    cliffhanger: "Your interests are not only guessed inside social apps. Next, investigate how a search engine finds answers so quickly.",
  }),
  "inside-google": buildLesson({
    id: "inside-google", title: "Inside Google", transformation: "Search Navigator", mystery: "How can it search so quickly?", atmosphere: "Digital World · Search", accent: "#4285F4", image: "/images/module-1/recommendation-engine.png",
    scenes: [
      scene("Google has already explored much of the Web.", "Automated systems discover pages before you search. The search engine can therefore respond from prepared information.", "A search is not a live scan of every page.", "Ask when the information was collected.", { type: "flow", items: ["Crawl", "Store", "Index", "Search"] }),
      scene("Pages join a huge library.", "An index organizes page information so the system can retrieve possible answers quickly.", "An index is an organized map, not the whole Internet.", "An indexed page can still be wrong or outdated.", { type: "signal", items: ["Page", "Index", "Query", "Result"] }),
      scene("Words hide an intention.", "The same words can mean different things. A good query explains whether you want a definition, a source, a current event or an application form.", "Search quality depends on the question.", "Add precise words, dates and places.", { type: "checklist", items: ["Topic", "Place", "Date", "Purpose"] }),
      scene("The first result is not always the best.", "Ranking considers relevance and many other signals. Sponsored results may appear first because an advertiser paid for visibility.", "Position is not proof.", "Check the source behind the result.", { type: "warning", items: ["Sponsored", "Official", "Current", "Relevant"] }),
    ],
    mission: ["Search for the same topic with a broad and a precise query.", "Compare two sources and record their dates and authors.", "Find an independent source outside your first results."],
    summary: ["Search engines use indexes built before your query.", "A query expresses an intention.", "Ranking and position do not guarantee truth."],
    cliffhanger: "Search can find an answer, but an answer can still be invented. Next, investigate what AI chatbots know—and what they only predict.",
  }),
  "inside-ai-chatbots": buildLesson({
    id: "inside-ai-chatbots", title: "Inside AI chatbots", transformation: "AI Questioner", mystery: "Does AI know its answers?", atmosphere: "Digital World · Artificial Intelligence", accent: "#8B5CF6", image: "/images/module-1/recommendation-engine.png",
    scenes: [
      scene("AI builds an answer by prediction.", "A language model generates likely next pieces of language from patterns learned during training.", "Fluent language is not the same as understanding.", "Treat a confident answer as a draft until checked.", { type: "flow", items: ["Prompt", "Patterns", "Prediction", "Answer"] }),
      scene("Patterns are learned from many examples.", "During training, the model adjusts internal parameters so it can reproduce common structures, styles and associations in text.", "Learning patterns is different from storing a perfect library.", "Ask where the answer comes from before trusting it.", { type: "timeline", items: ["Examples", "Training", "Patterns", "Output"] }),
      scene("A plausible answer can be invented.", "A chatbot may produce a false citation, law, name or number while sounding certain.", "Confidence in the wording is not evidence.", "Verify important claims outside the chatbot.", { type: "warning", items: ["Claim", "Source", "Date", "Check"] }),
      scene("Context helps, but verification remains necessary.", "Clear goals and constraints can make a response more useful, but they cannot guarantee that every claim is accurate.", "AI is a partner for work, not an automatic authority.", "Give context, ask for limits and check important answers.", { type: "checklist", items: ["Goal", "Context", "Limits", "Review"] })
    ],
    mission: ["Ask a chatbot a factual question and verify every important claim.", "Find one invented or unsupported reference.", "Rewrite the prompt with context and limits, then compare the result."],
    summary: ["Chatbots predict plausible language.", "A fluent answer can still be false.", "Privacy, verification and human judgment remain essential."],
    cliffhanger: "AI can create convincing content. Next, investigate the traces your devices and accounts leave behind.",
  }),
  "your-digital-shadow": buildLesson({
    id: "your-digital-shadow", title: "Your digital shadow", transformation: "Trace Investigator", mystery: "How much can the internet learn about you?", atmosphere: "Digital World · Digital Identity", accent: "#0EA5E9", image: "/images/module-1/digital-footprint.png",
    scenes: [
      scene("Some traces carry your signature.", "Posts, profiles, comments and public photos are deliberate parts of your digital identity.", "Active traces are what you choose to publish.", "Review old public content as a stranger would.", { type: "signal", items: ["Post", "Profile", "Comment", "Image"] }),
      scene("Your device speaks too.", "Apps and websites may collect device, location, network, browser and usage information in the background.", "Passive traces can be created without a new post.", "Check permissions and active sessions.", { type: "flow", items: ["Device", "Network", "App", "Trace"] }),
      scene("Accounts bring traces together.", "A shared email, phone number, username or sign-in service can connect activity across platforms.", "Identifiers can make separate traces look like one person.", "Use unique settings and review connected accounts.", { type: "warning", items: ["Email", "Phone", "Username", "Account"] }),
      scene("Deleting does not recall every copy.", "Screenshots, backups, downloads, archives and forwarded posts can survive deletion.", "Removing your copy is useful but not absolute control.", "Think about copies before publishing.", { type: "checklist", items: ["Screenshot", "Backup", "Download", "Forward"] }),
    ],
    mission: ["Search your name or an old username in quotes.", "Review the information attached to a non-sensitive photo.", "Draw its possible copies across devices, backups and shares."],
    summary: ["Digital identity includes active and passive traces.", "Identifiers connect traces across services.", "Deletion cannot recall every copy."],
    cliffhanger: "Your data has value to systems and organizations. Next, follow the money behind the Internet.",
  }),
  "business-of-internet": buildLesson({
    id: "business-of-internet", title: "The business of the Internet", transformation: "Economy Decoder", mystery: "Who pays when a service is free?", atmosphere: "Digital World · Attention Economy", accent: "#F59E0B", image: "/images/module-1/digital-twin.png",
    scenes: [
      scene("A free service still has costs.", "Servers, employees, networks, moderation and development all require resources.", "Free to use does not mean free to operate.", "Ask what supports the service.", { type: "flow", items: ["Servers", "People", "Network", "Revenue"] }),
      scene("Every minute can become a business opportunity.", "A platform can sell subscriptions, commissions, products, advertising or access to an audience.", "Your time and attention can have economic value.", "Notice what the interface encourages.", { type: "signal", items: ["Time", "Attention", "Audience", "Value"] }),
      scene("Advertisers buy a probability of reaction.", "An advertiser may not need your name. It may want to reach people likely to click, watch, buy or sign up.", "Prediction can be sold without showing you the whole process.", "Ask which data makes targeting possible.", { type: "warning", items: ["Audience", "Prediction", "Ad", "Action"] }),
      scene("The app's goal may not be yours.", "A platform may optimize time, engagement or revenue while you want rest, privacy, learning or balance.", "System objectives and user goals can diverge.", "Compare the app's goal with your goal.", { type: "checklist", items: ["Platform goal", "Your goal", "Trade-off", "Choice"] }),
    ],
    mission: ["Choose a free app and identify its revenue sources.", "Connect three interface choices to its business model.", "Decide whether its incentives match your own goals."],
    summary: ["Services have costs and revenue models.", "Attention and predicted reactions can have economic value.", "Platform objectives may differ from user objectives."],
    cliffhanger: "Knowing the system's incentives is useful. The final lesson asks how you will act as a conscious digital citizen.",
  }),
  "conscious-digital-citizen": buildLesson({
    id: "conscious-digital-citizen", title: "Becoming a conscious digital citizen", transformation: "Digital Citizen", mystery: "How will you choose to live behind the screen?", atmosphere: "Digital World · Citizenship", accent: "#10B981", image: "/images/module-1/two-worlds.png",
    scenes: [
      scene("Using a tool starts with knowing why.", "Before opening an app, ask what you want to accomplish and whether the tool supports that goal.", "Intention turns a habit into a choice.", "Name the purpose before the action.", { type: "signal", items: ["Purpose", "Tool", "Action", "Result"] }),
      scene("Publishing, commenting and sharing have consequences.", "A digital action can affect another person's privacy, reputation, attention or safety.", "Rights come with responsibilities.", "Pause before spreading content.", { type: "warning", items: ["Consent", "Context", "Impact", "Pause"] }),
      scene("You can ask, control and challenge.", "You can review settings, request explanations, report harm, correct information and ask for help.", "Digital citizenship includes agency.", "Use the controls available to you.", { type: "checklist", items: ["Ask", "Control", "Correct", "Report"] }),
      scene("Write the rules for your digital life.", "Choose principles for privacy, sources, attention, AI, respect and help-seeking.", "A personal code makes good choices easier under pressure.", "Make each principle measurable.", { type: "timeline", items: ["Principle", "Action", "Practice", "Review"] }),
    ],
    mission: ["Write five commitments beginning with “I will.”", "Add one measurable action to each.", "Apply the first commitment today."],
    summary: ["Intention turns habits into choices.", "Digital actions affect other people.", "Conscious citizenship combines understanding, verification and responsibility."],
    cliffhanger: "You can now see the systems behind the screen. The next module turns that understanding into protection when something goes wrong.",
  })
};
