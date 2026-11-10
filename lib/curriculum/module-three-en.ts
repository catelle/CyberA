import type { AcademySpec } from "@/lib/curriculum/module-three";

type EnglishLesson = Omit<AcademySpec, "id" | "order" | "image">;

// Complete English counterparts for Module 3. French remains the source default.
export const moduleThreeEnglishLessons: Record<string, EnglishLesson> = {
  "information-hunter": {
    title: "Find what others cannot find", superpower: "Information Hunter", artifact: "Search Key",
    reality: "You see a screenshot announcing a fully funded scholarship in Canada. It looks professional, but a search for Canada scholarship returns thousands of results. A friend asks you to find the real link. Notice the problem: many results do not mean you have the right source.",
    mystery: "How do you move from thousands of results to the right source?",
    evidence: [
      "Start with the exact question. Extract distinctive clues: programme name, organization, year, field, exact wording, country and deadline.",
      "Compare a broad search with a precise one. Canada scholarship is noisy; the exact programme name and year narrow the field immediately.",
      "Use quotation marks for an exact phrase, site: to search inside a domain and filetype:pdf to find reports or application documents. These tools help, but the source still needs checking.",
      "Finding and verifying are different steps. Social media can reveal an opportunity; confirm the conditions, deadline and application form through the responsible organization.",
      "Check the date and the source. A genuine page from 2023 may not describe a 2026 opportunity. Ask who is best placed to know and return to that source.",
      "Your method is FORMULATE, SEARCH, NARROW, RETURN TO THE SOURCE and CHECK THE DATE. A good search produces an answer another person can reproduce and verify."
    ],
    mission: ["Find the official page behind a public scholarship announcement.", "Find an official PDF report and record its organization, year and purpose.", "Find a scientific article and identify its author, date, journal and question.", "Record your first query and the change that produced a more precise result."],
    reflection: "When your first search is not useful, do you give up or can you now reformulate the question?",
    cliffhanger: "You can now find a source. But a source can exist, look credible and still be misleading. Is popularity enough to call something true?",
    quiz: { question: "You see a scholarship on TikTok. Which reflex best shows good research?", options: ["Share it because it has an official logo", "Find the responsible organization and check its official information and date", "Click the first sponsored result", "Ask only in the comments"], correctIndex: 1, explanation: "A social post is a lead. Confirmation comes from the responsible source and its current information." }
  },
  "truth-detective": {
    title: "Separate facts from fiction", superpower: "Truth Detective", artifact: "Truth Compass",
    reality: "A video claims that a new law will ban social media for people under 21 next month. It has 500,000 views and people you know have shared it. Notice the problem: the claim is popular, but no proof is visible yet.",
    mystery: "What turns a claim into verified information?",
    evidence: [
      "Separate what is claimed, what is popular and what is proven. The video and its shares are real; the law still needs evidence.",
      "Turn the rumour into a precise question: which country, institution, document, date and affected people? Precise questions point to useful evidence.",
      "Virality measures circulation, not truth. An algorithm records reactions; it does not certify facts. Notice your emotion and ask what could change your mind.",
      "Find the primary source: the institution, original document, full statement or original study. Then seek genuinely independent confirmation; three copied posts are not three witnesses.",
      "Check expertise, date and context. Use confirmed, misleading and unconfirmed as different verdicts. “I do not know yet” is a valid result.",
      "Your method is ISOLATE THE CLAIM, FIND WHO SHOULD KNOW, RETURN TO THE ORIGINAL, SEEK INDEPENDENT CONFIRMATION, CHECK DATE AND CONTEXT, then give a proportionate verdict."
    ],
    mission: ["Choose a recent public claim that can be checked without exposing private data.", "Write it in one precise sentence with a place and date.", "Find the primary source or explain why it is missing.", "Find two independent confirmations and classify the result with a reason."],
    reflection: "Which emotion or personal preference could most influence the way you verify information?",
    cliffhanger: "You can verify a written claim. But a photo can feel more convincing than text. Next you will discover what an image does not show.",
    quiz: { question: "Three pages publish exactly the same claim. What proves they are three confirmations?", options: ["Their total followers", "Three different logos", "Independent sources or verification methods", "Many comments"], correctIndex: 2, explanation: "Several posts may come from one origin. Independence requires a separate verification path." }
  },
  "visual-investigator": {
    title: "Read between the pixels", superpower: "Visual Investigator", artifact: "Investigation Lens",
    reality: "A photo circulates with the caption “Protest in Cameroon today.” It shows a crowd, smoke and people running. The image may be authentic, but it does not tell you where or when it was taken.",
    mystery: "What can an image really prove?",
    evidence: [
      "Separate the image from its caption. A photo can show a crowd without proving the country or date.",
      "Observe before interpreting: signs, language, buildings, clothing, vehicles, plates, weather, landscape, shadows and logos are clues, not conclusions.",
      "Framing and cropping can change meaning or remove a watermark, date or sign. Ask what was outside the frame and look for a wider version.",
      "Reverse image search can reveal earlier posts, different crops and the original context. Do not stop at the first result; check the oldest verifiable publication.",
      "Build a timeline. An authentic image from 2022 can become misinformation when reposted in 2026 with a new caption. Metadata can help, but it must also be verified.",
      "Your method is SEPARATE IMAGE AND CAPTION, OBSERVE, EXTRACT CLUES, FIND EARLIER VERSIONS, REBUILD THE TIMELINE, CHECK PLACE AND DATE, then conclude only what the evidence supports."
    ],
    mission: ["Choose a public image whose original context is known.", "List five visible elements without interpreting them.", "Run a reverse image search and find an earlier version or source.", "Build a timeline and explain what the image can and cannot prove."],
    reflection: "How do you now separate what you see from the story people tell about it?",
    cliffhanger: "You followed an image that really existed somewhere. What happens when a face, voice or whole scene has been synthesized?",
    quiz: { question: "What can directly disprove the claim that an authentic photo was taken today?", options: ["It looks professional", "A verifiable publication of the same image from 2022", "Comments say it is fake", "It was shared on Facebook"], correctIndex: 1, explanation: "An earlier verifiable occurrence disproves the claimed date, even if the image itself is authentic." }
  },
  "ai-decoder": {
    title: "Unmask the machine", superpower: "AI Decoder", artifact: "AI Decoder",
    reality: "A video in a WhatsApp group shows a well-known person announcing an exceptional opportunity. The voice, expressions and lip movement look right. Notice the problem: appearance alone cannot establish whether the recording is authentic.",
    mystery: "How do you verify content when your eyes are no longer enough?",
    evidence: [
      "Do not begin by guessing whether it is AI. Identify the claim, the speaker, the event and the action the content asks you to take.",
      "Ask about provenance: where did it first appear, did the official account publish it, is there a full version and can independent sources confirm it?",
      "AI-generated does not automatically mean false. The danger appears when content fakes a person, origin or event, such as a cloned voice asking for money.",
      "Visual oddities, strange text, impossible reflections, audio cuts or unusual breathing are warning signs, not proof. A good synthetic video may show none of them.",
      "AI text can invent sources, laws, quotes and numbers. Open every source. AI detectors estimate probability and can be wrong, so never rely on one detector alone.",
      "For an urgent request, separate identity from message. Call a known number or confirm through another channel. Your method is DO NOT GUESS, TRACE PROVENANCE, SEEK CONFIRMATION, EXAMINE CLUES and state your confidence."
    ],
    mission: ["Compare declared AI content with content from a documented source.", "Separate suspicions from verifiable clues.", "Build a provenance-based method for content with no visible flaws.", "Explain why not seeing AI does not prove authenticity."],
    reflection: "If synthetic content becomes indistinguishable from real content, which reflex will still help you?",
    cliffhanger: "You have learned to question what you see and hear. Next, investigate what a stranger can learn about you without hacking your phone.",
    quiz: { question: "What is strongest against a highly realistic synthetic video?", options: ["Look only for strange fingers", "Check its origin and confirm it through independent channels", "Trust the image quality", "Use one detector"], correctIndex: 1, explanation: "Technical artefacts change; provenance and independent confirmation remain useful." }
  },
  "privacy-guardian": {
    title: "Who can see you?", superpower: "Privacy Guardian", artifact: "Privacy Cloak",
    reality: "A stranger knows your school, city, a relative’s name and your favourite artist. They did not hack your accounts. Each detail was available separately somewhere in your digital presence.",
    mystery: "What can someone learn about you without hacking your account?",
    evidence: [
      "Small details become sensitive when combined. A school, birthday, relative’s name and travel photo can help personalize a scam or guess recovery answers.",
      "Your trail includes posts, comments, likes, follows, tags, forgotten accounts, connected devices, histories and data collected while using services.",
      "Think about three audiences: the people you imagine, the audience the platform allows and the audience reached after a screenshot or forward. Friends-only reduces exposure but cannot stop copying.",
      "Audit permissions for camera, microphone, location, contacts, photos and files. Give only the minimum necessary access and prefer “while using” instead of “always.”",
      "Connected accounts create bridges. Check what sign-in services share and remove third-party apps you no longer use. Free does not mean that no data is exchanged.",
      "Your method is VIEW YOUR PROFILE AS A STRANGER, IDENTIFY WHAT CAN BE INFERRED, CHECK AUDIENCES, CONTROL PERMISSIONS and repeat the audit. The goal is not invisibility, but deliberate choice."
    ],
    mission: ["View one profile as a person who does not follow you.", "List five visible or inferable details and classify their source.", "Check three apps and remove one unnecessary permission.", "Change one privacy setting and explain exactly what it changes."],
    reflection: "Which detail seemed harmless alone but becomes sensitive when combined with other traces?",
    cliffhanger: "You can reduce your exposure. But sometimes a person asks for help after the damage has already begun.",
    quiz: { question: "Which approach best manages app permissions?", options: ["A known app can access everything", "Give only needed access and remove it when no longer needed", "Refuse every permission", "Keep location active everywhere"], correctIndex: 1, explanation: "Minimum necessary access reduces exposure while preserving functions you actually need." }
  },
  "digital-first-responder": {
    title: "Raise the alarm", superpower: "Digital First Responder", artifact: "Emergency Kit",
    reality: "Your cousin says someone created a fake account using their photos and hateful messages are spreading. They want to delete everything and ask friends to insult the fake account. Acting quickly can protect them, but it can also destroy evidence or make things worse.",
    mystery: "What should you do, and in what order, when harm has already started?",
    evidence: [
      "Assess danger first: threat, blackmail, intimate image, physical risk or nuisance? The response depends on severity.",
      "Start with the person. Ask what happened, when, who is involved and whether there is immediate physical danger. Listen without blame.",
      "Before deleting, preserve screenshots, account name, handle, URL, date, time and context. Documenting does not mean reposting sensitive material.",
      "Blocking protects your space; reporting asks the platform to examine content. Choose the correct category and describe facts accurately.",
      "Do not organize mass reports because you dislike content. For a compromised account, change the password, close unknown sessions, enable MFA, check recovery details and warn contacts.",
      "Escalate to a trusted adult, school, specialist service or competent authority when needed. Do not take every decision away from the victim. Follow up afterwards.",
      "Your method is SECURE, LISTEN, PRESERVE EVIDENCE, LIMIT CONTACT, REPORT, ESCALATE IF NEEDED, SECURE ACCOUNTS and FOLLOW UP. Safety comes first."
    ],
    mission: ["Build a fictional incident file with account, link, date, time, screenshot and factual description.", "Choose the correct report category.", "Decide whether blocking/reporting is enough or escalation is needed.", "Write the first three sentences you would say to someone asking for help."],
    reflection: "Why is doing something immediately not always the same as doing the right thing?",
    cliffhanger: "You now have six superpowers. The final room gives you a case where several clues conflict. This time, you choose the method.",
    quiz: { question: "A friend is being harassed online. Which first response is strongest?", options: ["Reply publicly and organize insults", "Assess safety, listen, preserve evidence, limit contact and report appropriately", "Ignore it for weeks", "Share every screenshot in groups"], correctIndex: 1, explanation: "Start with safety and support, preserve useful material, then use appropriate protection and reporting tools." }
  },
  "master-investigator": {
    title: "Think like an investigator", superpower: "Master Investigator", artifact: "CyberAmbassador Case File",
    reality: "Final case file: a fully funded scholarship is circulating online with an email, photo, video, application website and social profile. Some pieces may be authentic; others may be recycled, copied or taken out of context. No single piece is enough proof.",
    mystery: "How do you build a conclusion from pieces that prove nothing alone?",
    evidence: [
      "Inspect the email address instead of trusting its logo or signature. Compare it with the organization’s real domain.",
      "Find the organization independently instead of using the received link. Compare domains and check whether the official site links to the application site.",
      "Search the exact scholarship name on the official domain and check year, criteria, deadline and application method. A real old edition does not prove a current announcement.",
      "Reverse-search the photo and trace the video through official channels. Real media can be used in a false context.",
      "Examine the social profile’s history, official links, domain and contact details. Followers and logos do not certify identity.",
      "Inspect data requests. A name, email and CV may be normal; identity documents, bank details or a validation payment require confirmation from the official organization.",
      "Build a timeline, separate observations from conclusions, connect independent clues and give a proportionate verdict: confirmed, probably authentic, misleading, probably fraudulent or unconfirmed.",
      "Preserve evidence, report through the right channel, warn exposed people with verified information and link to the genuine official page. Your conclusion should make action safer."
    ],
    mission: ["Examine the fictional case pieces without giving a verdict during inventory.", "Write three hypotheses and choose the most useful first check.", "Use the previous lesson artefacts to build an evidence chain and timeline.", "Give a verdict with confidence, limits and recommended action."],
    reflection: "When were you tempted to conclude too quickly, and which check forced you to qualify your intuition?",
    cliffhanger: "Case closed. Your six artefacts form your CyberAmbassador Field Kit. You can search, verify, analyse, protect and respond. The next module asks what you can do when you no longer act alone.",
    quiz: { question: "What separates intuition from a defensible investigation verdict?", options: ["More confidence", "An explainable method, verifiable evidence and recognized limits", "More people agreeing", "Confirming the first hypothesis"], correctIndex: 1, explanation: "A strong conclusion shows its evidence path and acknowledges uncertainty so another person can check it." }
  }
};
