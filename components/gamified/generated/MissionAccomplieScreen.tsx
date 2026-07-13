/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function MissionAccomplieScreen() {
  return (
    <div className={"bg-background text-on-surface font-body-md min-h-screen overflow-x-hidden"}>

{/* Confetti Layer */}
<canvas className="confetti-canvas" id="confetti"></canvas>
{/* Success Canvas */}
<main className="relative z-10 max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col items-center">
{/* Hero Branding / Mascot */}
<div className="relative w-full max-w-lg mb-12 flex flex-col items-center">
<div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
<span className="material-symbols-outlined text-[240px] text-primary">stars</span>
</div>
{/* Victory Shield Mascot */}
<div className="floating relative z-20 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
{/* Shield Image */}
<img className="w-full h-full object-contain rounded-full" alt="A high-quality 3D rendered character of a friendly blue and green digital shield with a happy smiling face and big joyful eyes. The shield mascot is surrounded by glowing light-blue data rings, appearing energetic and celebratory. The style is soft, playful 3D animation art with bright studio lighting on a clean white background, reflecting a gamified success state." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrDy4YTtEF7WrnqjDi0hIJHRyz977-MyW3XryBnDySFXn3zNGXg_4sbC0m9s1OxlITwpx3sx1B9NXeSKNHgxIQoj9Nivg6BkhVC3nsC9DFRHbG2KzAbzcpKfuVf2EAuuLToZuwyfjyvQ2JRjLWbjR4Tc_or5wsu2GNMrXqegjNd2oDEszNlFzhZKMef1_SHP-Oy0FlLMNQdrKd0thq5vhVEJTc8fShmndSrwf0UkN-D-BNvDQu_KbGgrJoi4vh4qeutPXgxzEcSgVW"/>
</div>
<div className="text-center mt-8">
<h1 className="font-display text-display text-primary uppercase tracking-tighter mb-2 scale-110 drop-shadow-sm">VICTORY!</h1>
<p className="font-headline-md text-headline-md text-secondary">Mission Complete: Phishing Defense</p>
</div>
</div>
{/* Bento Stats Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter w-full mb-16">
{/* XP Earned Card */}
<div className="bg-surface-container-lowest border-2 border-secondary rounded-xl p-card-padding tactile-3d card-hover transition-all flex flex-col items-center justify-center text-center">
<span className="material-symbols-outlined text-primary text-5xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
<h3 className="font-label-bold text-label-bold text-secondary mb-1">XP EARNED</h3>
<p className="font-headline-lg text-headline-lg text-primary">+850 XP</p>
</div>
{/* Badge Card */}
<div className="bg-surface-container-lowest border-2 border-secondary rounded-xl p-card-padding tactile-3d card-hover transition-all flex flex-col items-center justify-center text-center">
<div className="w-24 h-24 rounded-full border-4 border-tertiary-container bg-tertiary-fixed flex items-center justify-center mb-4 shadow-inner">
<span className="material-symbols-outlined text-tertiary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
</div>
<h3 className="font-label-bold text-label-bold text-secondary mb-1">NEW BADGE</h3>
<p className="font-headline-md text-headline-md text-on-surface">Cyber Guardian</p>
</div>
{/* Streak Card */}
<div className="bg-surface-container-lowest border-2 border-secondary rounded-xl p-card-padding tactile-3d card-hover transition-all flex flex-col items-center justify-center text-center">
<span className="material-symbols-outlined text-orange-500 text-5xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
<h3 className="font-label-bold text-label-bold text-secondary mb-1">CURRENT STREAK</h3>
<p className="font-headline-lg text-headline-lg text-on-surface">5 DAYS</p>
</div>
</div>
{/* Level Progress Card */}
<div className="w-full bg-surface-container-lowest border-2 border-secondary rounded-xl p-8 mb-12 tactile-3d">
<div className="flex justify-between items-end mb-4">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">AMBASSADOR LVL 12</h2>
<p className="font-body-md text-secondary">2,450 XP to Level 13</p>
</div>
<div className="text-right hidden md:block">
<p className="font-label-bold text-label-bold text-primary">75% COMPLETE</p>
</div>
</div>
{/* Chunky Progress Bar */}
<div className="h-6 w-full bg-surface-container rounded-full border-2 border-secondary overflow-hidden">
<div className="h-full bg-primary-container rounded-r-full transition-all duration-1000 ease-out flex items-center justify-end pr-2" style={{ width: "75%" }}>
<div className="h-2 w-2 bg-white rounded-full"></div>
</div>
</div>
</div>
{/* Feedback Quote from Character */}
<div className="flex flex-col md:flex-row items-center gap-6 mb-16 bg-tertiary-fixed bg-opacity-30 p-6 rounded-2xl border-2 border-tertiary">
<div className="w-20 h-20 bg-white rounded-full border-2 border-secondary overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" alt="A portrait of a diverse, enthusiastic young mentor with a friendly smile, wearing a modern tech jacket with cyber-circuit patterns. The setting is bright and professional with a clean, high-saturation color palette. 3D digital-avatar aesthetic, expressive and encouraging facial expression." src="https://lh3.googleusercontent.com/aida-public/AB6AXuADf6_V-eW1cevUpTMlHXwqYejOBBC3xu2Z7I3k9A3XF_kBWh9o7C6xefRLTPtgPySeqkSs4pRi_CIzIfc4vefkZ9eeVEDN7CVk4fO0Ktx0Mg_VM9Fk0uFuWmLjuWOn7dYbQhyhlhS0txwACSIHq0g6CFNk3XRy0sXr927uOPx8vrBPrK8k50XPvzB2F1-q7n8AcD1iqhjXlEX6NsOg6YMGfohiVxrcUhJPVxUslmkEGzNMQ6hD2vAKeWYnKSGu0YIucwxLW_Ayl5Vi"/>
</div>
<div className="text-center md:text-left">
<p className="font-headline-md italic text-on-surface-variant">"Incredible work, Ambassador! You spotted those phishing links like a pro. The cyber world is safer because of you."</p>
</div>
</div>
{/* CTA Actions */}
<div className="flex flex-col md:flex-row gap-gutter w-full max-w-3xl">
<button className="flex-1 bg-surface border-2 border-secondary rounded-xl py-5 px-8 font-label-bold text-on-surface tactile-3d flex items-center justify-center gap-2 hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined">dashboard</span>
        RETURN TO DASHBOARD
      </button>
<button className="flex-1 bg-primary-container border-2 border-secondary text-on-primary-container rounded-xl py-5 px-8 font-label-bold tactile-3d-pink flex items-center justify-center gap-2 hover:brightness-110 transition-all">
        NEXT MISSION
        <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</main>
{/* Interactive Script */}


    </div>
  );
}
