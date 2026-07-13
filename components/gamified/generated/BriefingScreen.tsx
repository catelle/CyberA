/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function BriefingScreen() {
  return (
    <div className={"bg-surface font-body-md text-on-surface min-h-screen"}>

{/* TopNavBar (Fixed-Fluid Hybrid) */}
<header className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dim border-b-2 border-secondary dark:border-secondary-fixed shadow-[0_4px_0_0_rgba(88,96,98,1)]">
<div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-7xl mx-auto">
<div className="text-headline-md font-headline-md font-black text-primary uppercase tracking-tighter">
        CyberAmbassadeurs
      </div>
<nav className="hidden md:flex gap-8 items-center">
<a className="text-secondary dark:text-secondary-fixed-dim font-bold pb-1 hover:text-primary-container transition-colors" href="#">Missions</a>
<a className="text-primary font-bold border-b-4 border-primary pb-1" href="#">Modules</a>
<a className="text-secondary dark:text-secondary-fixed-dim font-bold pb-1 hover:text-primary-container transition-colors" href="#">Shop</a>
</nav>
<div className="flex items-center gap-6">
<div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border-2 border-secondary">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
<span className="font-bold">7</span>
</div>
<div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border-2 border-secondary">
<span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
<span className="font-bold">1,250</span>
</div>
<button className="material-symbols-outlined text-secondary">notifications</button>
<img className="w-10 h-10 rounded-full border-2 border-primary object-cover" alt="A 3D character avatar of a young teenager with a futuristic headset, styled in a clean, high-saturation gamified aesthetic with bright studio lighting against a soft pastel background. The character has an optimistic expression and fits the energetic vibe of CyberAmbassadeurs." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCsELaJ1iip7PQcWh9DnQDe2OeGHywiR2WxYIjsQCbOV9ptYh-BioP3DvkTmQzeP93Di7kBqbnlLtgy1qeOtgIU-s65-GDv3aelwTkj5f_A5cX7Va53kU5E-6EAEY8r2xkvsCJeabypZcXl_rugZAGLSTvnIotMJqT41prbrWkctPIyA2gSs9JlFeOhGYiixJstvucEgD1lRKVMZ2bErwIDj2udp98SAD8alR1PMmIcyDMGVRsGCezwi6ELCwT7S3iO01e7Y8TA_fg"/>
</div>
</div>
</header>
{/* Side Navigation (Mobile and Desktop Sidebars are handled via shell rules, using SideNavBar JSON logic here) */}
<aside className="hidden xl:flex h-screen w-64 fixed left-0 top-0 pt-24 bg-surface-container-lowest dark:bg-inverse-surface border-r-2 border-secondary dark:border-secondary-fixed shadow-[4px_0_0_0_rgba(88,96,98,1)] flex-col gap-unit p-6 z-40">
<div className="mb-8 p-4 bg-primary-fixed rounded-xl border-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)]">
<p className="text-label-bold font-label-bold text-primary">Ambassador Lvl 12</p>
<div className="w-full bg-on-tertiary-container h-4 mt-2 rounded-full border-2 border-secondary overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
</div>
<p className="text-[10px] mt-1 font-bold">2,450 XP to Lvl 13</p>
</div>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1 hover:text-primary" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-bold">Dashboard</span>
</a>
<a className="flex items-center gap-4 bg-primary-container text-on-primary-container rounded-xl border-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)] p-4 translate-y-1 shadow-none" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
<span className="font-label-bold">Academy</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1 hover:text-primary" href="#">
<span className="material-symbols-outlined">military_tech</span>
<span className="font-label-bold">Leaderboard</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1 hover:text-primary" href="#">
<span className="material-symbols-outlined">explore</span>
<span className="font-label-bold">Quests</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1 hover:text-primary" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-bold">Settings</span>
</a>
</nav>
<div className="mt-auto flex flex-col gap-2">
<a className="flex items-center gap-4 text-secondary p-2 hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined text-sm">help</span>
<span className="text-sm font-bold">Help</span>
</a>
<a className="flex items-center gap-4 text-error p-2 hover:opacity-80 transition-opacity" href="#">
<span className="material-symbols-outlined text-sm">logout</span>
<span className="text-sm font-bold">Logout</span>
</a>
</div>
</aside>
{/* Main Canvas */}
<main className="xl:ml-64 pt-24 pb-12 px-6 md:px-margin-desktop min-h-screen">
<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
{/* Left Column: Mission Briefing Content (Bento Style) */}
<div className="lg:col-span-7 flex flex-col gap-gutter">
{/* Mission Header Card */}
<div className="tactile-card bg-surface-container-lowest p-card-padding rounded-xl relative overflow-hidden">
<div className="absolute top-0 right-0 p-4">
<span className="bg-primary text-on-primary text-label-bold px-4 py-2 rounded-full border-2 border-secondary uppercase">Mission 04</span>
</div>
<p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Module: Digital Defense</p>
<h1 className="font-display text-display text-on-surface mb-4">Cracking the Code: Password Safety</h1>
<p className="font-body-lg text-secondary max-w-xl">
            A high-level breach has been detected in the central server. As a CyberAmbassador, your mission is to secure the gateway using advanced cryptographic techniques and psychological defense strategies.
          </p>
</div>
{/* Bento Grid: Objectives & Rewards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
{/* Objectives Card */}
<div className="tactile-card bg-surface-container-lowest p-card-padding rounded-xl">
<div className="flex items-center gap-3 mb-6">
<div className="w-12 h-12 bg-tertiary-fixed rounded-xl border-2 border-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary">target</span>
</div>
<h2 className="font-headline-md text-headline-md">Mission Objectives</h2>
</div>
<ul className="space-y-4">
<li className="flex gap-4 items-start">
<span className="material-symbols-outlined text-primary mt-1">check_circle</span>
<span className="font-body-md">Identify common "weak link" password patterns used by hackers.</span>
</li>
<li className="flex gap-4 items-start">
<span className="material-symbols-outlined text-primary mt-1">check_circle</span>
<span className="font-body-md">Implement Multi-Factor Authentication (MFA) protocols.</span>
</li>
<li className="flex gap-4 items-start">
<span className="material-symbols-outlined text-primary mt-1">check_circle</span>
<span className="font-body-md">Design a "Fortress Password" that is both unhackable and memorable.</span>
</li>
</ul>
</div>
{/* Rewards Card */}
<div className="tactile-card bg-surface-container-lowest p-card-padding rounded-xl">
<div className="flex items-center gap-3 mb-6">
<div className="w-12 h-12 bg-primary-fixed rounded-xl border-2 border-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-primary">military_tech</span>
</div>
<h2 className="font-headline-md text-headline-md">Mission Bounty</h2>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="p-4 bg-surface-container-high rounded-xl border-2 border-secondary text-center">
<span className="text-headline-lg font-headline-lg text-primary block">+450</span>
<span className="text-label-bold font-label-bold uppercase">Experience XP</span>
</div>
<div className="p-4 bg-surface-container-high rounded-xl border-2 border-secondary text-center">
<span className="text-headline-lg font-headline-lg text-tertiary block">15</span>
<span className="text-label-bold font-label-bold uppercase">Cyber Gems</span>
</div>
</div>
<div className="mt-6 p-4 bg-on-tertiary-container rounded-xl border-2 border-dashed border-secondary flex items-center gap-4">
<span className="material-symbols-outlined text-4xl text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
<div>
<p className="font-bold text-sm">Unlockable Badge:</p>
<p className="text-xs uppercase text-secondary">The Fortress Warden</p>
</div>
</div>
</div>
</div>
{/* CTA Section */}
<div className="mt-4">
<button className="tactile-button bg-primary-container text-on-primary-container w-full py-6 rounded-xl flex items-center justify-center gap-4 group">
<span className="font-headline-md text-headline-md uppercase tracking-widest">START MISSION</span>
<span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">bolt</span>
</button>
<p className="text-center mt-4 text-label-bold text-secondary uppercase">Estimated time: 15 minutes</p>
</div>
</div>
{/* Right Column: 3D Mentor & Interaction */}
<div className="lg:col-span-5 flex flex-col gap-gutter">
{/* Mentor Profile / Character Briefing */}
<div className="tactile-card bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col h-full min-h-[600px] bg-gradient-to-b from-white to-surface-container">
{/* The Mentor Area */}
<div className="relative flex-grow flex items-center justify-center overflow-hidden">
{/* Animated Ambient Background for Character */}
<div className="absolute inset-0 opacity-10">

</div>
<img className="relative z-10 h-[500px] object-contain drop-shadow-2xl translate-y-8 transform-gpu hover:scale-105 transition-transform duration-500" alt="A professional yet friendly 3D mentor character for a cybersecurity learning app. He is a young adult with glasses, a clean-cut beard, wearing a high-tech indigo polo shirt with a digital logo. He is pointing towards a holographic interface with a welcoming and confident expression. The lighting is crisp and bright, matching the tactile-bold aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKGpBh3lEoSJAHfNFDI8zpehyzDwg80V_7fzzDx8E9XKtS8l7c0JnIiKDNdrFxqrwkwPG6Xp6WAS9ptgjCIhJ2FsSke0qH0WoSs8Izf53r6EyCeNpx3Fgin5aoNyAVjpTWxjVs_nq0vyf9ssctEYHEj2cJ_1rvDtnrE-nWYujpyu5fTZSgg0hfNLehawEQn13biRpwbXnNyZfRiMfSu9xUtgSAlS6nF5x57jz26d7irR7q104azeBv-JeUX9AkIpc_XNC8hm0mvc7a"/>
{/* Character Speech Bubble */}
<div className="absolute top-12 right-6 max-w-[200px] bg-white p-4 rounded-3xl rounded-tr-none border-2 border-secondary shadow-[4px_4px_0_0_rgba(88,96,98,1)] z-20">
<p className="text-label-bold font-label-bold text-on-surface">"Listen up, Ambassador! This briefing is critical for the next stage of our defense grid."</p>
</div>
</div>
{/* Interaction Footer */}
<div className="p-6 bg-surface-container-high border-t-2 border-secondary">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<span className="font-bold uppercase text-xs text-secondary">Mentor Status:</span>
<span className="flex items-center gap-1 text-primary text-xs font-black">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  ONLINE
                </span>
</div>
<div className="flex gap-2">
<button className="w-10 h-10 rounded-full bg-white border-2 border-secondary flex items-center justify-center hover:bg-primary-fixed transition-colors">
<span className="material-symbols-outlined text-sm">volume_up</span>
</button>
<button className="w-10 h-10 rounded-full bg-white border-2 border-secondary flex items-center justify-center hover:bg-primary-fixed transition-colors">
<span className="material-symbols-outlined text-sm">replay</span>
</button>
</div>
</div>
<div className="space-y-3">
<div className="h-2 w-full bg-secondary-container rounded-full overflow-hidden">
<div className="h-full bg-primary" id="speech-progress" style={{ width: "0%" }}></div>
</div>
<p className="text-xs italic text-secondary text-center">Auto-playing briefing audio...</p>
</div>
</div>
</div>
</div>
</div>
</main>
{/* Mobile Navigation Bar (Bottom) */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-secondary h-20 flex items-center justify-around z-50">
<button className="flex flex-col items-center text-secondary">
<span className="material-symbols-outlined">school</span>
<span className="text-[10px] font-bold">Academy</span>
</button>
<button className="flex flex-col items-center text-primary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
<span className="text-[10px] font-bold">Missions</span>
</button>
<div className="relative -top-6">
<button className="w-14 h-14 rounded-full bg-primary-container text-white border-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)] flex items-center justify-center">
<span className="material-symbols-outlined">bolt</span>
</button>
</div>
<button className="flex flex-col items-center text-secondary">
<span className="material-symbols-outlined">military_tech</span>
<span className="text-[10px] font-bold">Ranks</span>
</button>
<button className="flex flex-col items-center text-secondary">
<span className="material-symbols-outlined">person</span>
<span className="text-[10px] font-bold">Profile</span>
</button>
</nav>


    </div>
  );
}
