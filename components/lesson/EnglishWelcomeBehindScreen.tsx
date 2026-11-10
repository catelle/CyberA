"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Globe2 } from "lucide-react";

type Props = { moduleId: string; lessonId: string; canComplete: boolean };

const scenes = [
  ["Welcome", "Welcome behind the screen", "Every click opens a journey that your screen does not show. In this lesson, you will follow a photo from your phone to another person."],
  ["Scene 1", "Your phone is already communicating", "The time, weather, and notifications update before you open an app. Your phone has already contacted other systems."],
  ["Scene 2", "You live in two worlds", "Your room and school are physical. Devices, networks, data, and algorithms form the digital world that connects them."],
  ["Activity", "Sort the physical and digital worlds", "A phone is physical. A message, a network, and an algorithm are information or systems working through devices."],
  ["Scene 3", "Your photo can outlive your phone", "When you send a photo, a copy can leave your device before the battery runs out. Other machines continue the work."],
  ["Activity", "Where can your photo exist?", "It can exist on other machines that transport or store it, and later on your recipient's phone."],
  ["Scene 4", "A signal leaves your hand", "When you tap Send, your phone turns the photo into signals. The signal moves through a nearby antenna or Wi-Fi device."],
  ["Scene 5", "A photo becomes data", "Your phone represents colors and details as numbers. Those numbers are data that a network can transport."],
  ["Scene 6", "A large message travels in pieces", "The network divides data into numbered packets. Smaller pieces can take different routes and be rebuilt at the destination."],
  ["Scene 7", "Internet is the path; cloud is the service", "Routers move packets toward remote computers. Cloud services use those computers to store data or do work for you."],
  ["Scene 8", "A digital service does work", "An app is the visible door. A service receives an input, performs work, and returns a result."],
  ["Mystery 12", "Network bars are only the first door", "Bars show that your phone can reach a nearby antenna or Wi-Fi box. They do not represent the whole Internet."],
  ["Mystery 13", "The wireless journey becomes a cable journey", "Signals often travel through the air first, then through fiber where flashes of light carry data over long distances."],
  ["Mystery 14", "A router reads an address", "A router does not need to understand your photo. It reads the destination and chooses the next route."],
  ["Mystery 15", "A remote computer listens", "A server receives a request and prepares a response. It is a computer that serves other devices."],
  ["Mystery 16", "A message can wait", "A service may keep a copy until the recipient's device comes back online."],
  ["Mystery 17", "Sharing often creates a copy", "Your original can remain with you while another device receives a copy. A backup may create another one."],
  ["Mystery 18", "Your account is a digital folder", "Your identifier points to your data. Your password helps prove that you are allowed to open it."],
  ["Mystery 19", "A new device asks for updates", "A new device contacts the service and receives the data allowed for your account. This is synchronization."],
  ["Mystery 20", "The invisible world has a physical body", "Servers use electricity and produce heat. They need cooling, cables, and backup power."],
  ["Mystery 21", "A service can live in several places", "Multiple data centers help a service stay available and can bring the work closer to its users."],
  ["Mystery 22", "The Internet crosses oceans", "Undersea cables carry enormous amounts of data between continents, using light inside fiber."],
  ["Mystery 23", "The network can take a detour", "If a route fails, packets may use another path. The journey can slow down without stopping."],
  ["Mystery 24", "Packets can be rebuilt", "Packet numbers help the receiving device put the pieces back in the right order and request missing pieces."],
  ["Mystery 25", "Encryption can hide the content", "Encryption makes content unreadable without the right key, although some delivery labels still need to remain visible."],
  ["Mystery 26", "Repeated details reveal habits", "Times, places, and relationships can reveal patterns even when nobody reads the message itself. These are metadata."],
  ["Mystery 27", "Look behind an app icon", "Ask what you provide, which machines work, and what result the service sends back."],
  ["Mystery 28", "Connect the whole journey", "A click becomes data, signals, and packets. Networks route them, remote machines work, and another screen shows the result."],
  ["Mystery 29", "You can now see the hidden door", "You have learned to ask what leaves your device, which path it takes, which copies remain, and what traces appear."],
  ["Unlocked ability", "Digital Explorer", "The next time an app seems to know you, slow down and ask: what did I give, who worked, and what could they learn?"]
] as const;

export function EnglishWelcomeBehindScreen({ moduleId, lessonId, canComplete }: Props) {
  const [step, setStep] = useState(0);
  const scene = scenes[step];

  return (
    <article className="cyber-lesson cyber-lesson-light overflow-hidden rounded-[1.75rem] border-2 border-[#586062] bg-slate-50 text-brand-ink shadow-[0_8px_0_0_rgba(88,96,98,1)]">
      <header className="lesson-investigation-header border-b border-primary/20 bg-primary px-4 py-4 text-white sm:px-7">
        <div className="flex items-center gap-3"><button aria-label="Back to module" className="rounded-full border border-white/15 p-2" onClick={() => setStep((value) => Math.max(0, value - 1))} type="button"><ArrowLeft className="h-5 w-5" /></button><div className="min-w-0 flex-1"><div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[0.18em] text-cyan-300"><span>Guided training · English</span><span>{step + 1}/{scenes.length}</span></div><div className="h-2 overflow-hidden rounded-full bg-black/20"><div className="h-full rounded-full bg-white" style={{ width: `${((step + 1) / scenes.length) * 100}%` }} /></div></div></div>
      </header>
      <section className="relative min-h-[640px] overflow-hidden bg-white p-6 sm:p-10">
        <Image alt="The invisible digital network behind a phone" className="absolute inset-0 h-full w-full object-cover opacity-10" height={941} src="/images/module-1/lesson-1/behind-the-screen.png" width={1672} />
        <div className="relative mx-auto flex min-h-[540px] max-w-4xl flex-col justify-center">
          <p className="scene-label">{scene[0]}</p><h1 className="scene-title text-brand-ink">{scene[1]}</h1><p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-700">{scene[2]}</p>
          <div className="mt-8 rounded-2xl border-2 border-primary/30 bg-rose-50 p-5 font-bold leading-7 text-slate-700"><Globe2 className="mb-3 h-10 w-10 text-primary" /><p>Keep this question in mind: what leaves your device, which machines work, and what traces remain?</p></div>
          {step === scenes.length - 1 ? <div className="mt-8 flex items-center gap-3 rounded-2xl border border-cyan-300/40 bg-cyan-50 p-5 font-bold text-slate-700"><Check className="h-6 w-6 text-emerald-600" />Lesson complete. Continue to the quiz when you are ready.</div> : null}
        </div>
      </section>
      <footer className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-4 sm:px-7"><button className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-slate-300 px-4 font-black text-slate-700 disabled:opacity-30" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))} type="button"><ArrowLeft className="h-4 w-4" /> Back</button><span className="hidden text-sm font-bold text-slate-500 sm:block">{scene[1]}</span>{step === scenes.length - 1 && canComplete ? <Link className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 font-black text-white" href={`/student/modules/${moduleId}/lesson/${lessonId}/quiz`}>Open quiz <ArrowRight className="h-4 w-4" /></Link> : <button className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 font-black text-white disabled:opacity-40" disabled={step === scenes.length - 1} onClick={() => setStep((value) => Math.min(scenes.length - 1, value + 1))} type="button">Continue <ArrowRight className="h-4 w-4" /></button>}</footer>
    </article>
  );
}

export { scenes as englishWelcomeScenes };
