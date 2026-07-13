/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function ModuleScreen() {
  return (
    <div className={"bg-background text-on-background font-body-md min-h-screen flex flex-col overflow-x-hidden"}>

{/* TopNavBar (Fixed Header) */}
<header className="bg-surface docked full-width top-0 border-b-2 border-secondary flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 z-50">
<div className="flex items-center gap-4">
<span className="font-display text-headline-md text-primary">Cyberambassadeurs</span>
</div>
{/* Progress Bar in Header */}
<div className="hidden md:flex flex-col items-center flex-1 max-w-md mx-8 gap-1">
<div className="flex justify-between w-full mb-1">
<span className="font-label-bold text-label-bold text-secondary">MISSION PROGRESS</span>
<span className="font-label-bold text-label-bold text-primary">65%</span>
</div>
<div className="w-full h-4 bg-surface-container-highest rounded-full border-2 border-secondary overflow-hidden">
<div className="h-full bg-primary transition-all duration-500 rounded-r-full border-r-2 border-secondary" style={{ width: "65%" }}></div>
</div>
</div>
<div className="flex items-center gap-4">
<button className="active:translate-y-[2px] transition-all text-on-surface-variant hover:text-primary">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="active:translate-y-[2px] transition-all text-on-surface-variant hover:text-primary">
<span className="material-symbols-outlined">settings</span>
</button>
<div className="w-10 h-10 rounded-xl border-2 border-secondary bg-surface-container-high flex items-center justify-center overflow-hidden drop-block-sm">
<img className="w-full h-full object-cover" alt="A stylized 3D character portrait of a teenager with tech-savvy gear, wearing vibrant red headphones and a sleek white jacket, designed in a friendly and professional high-fidelity rendering style typical of modern educational gaming platforms like Duolingo or Roblox, against a soft blue background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQE_jCTgKzu7u9Pi9mCWEkkt3oyAUfmuW8kQU-OWG08d8tPeMZkez4ot1DdmTbub2hNa4gxh10FNZw57Rst_eWvuSjyJ3RP9TROvHtZfZRYxio1hCEi0qtJRvjmNdwv5bAdXsihIrz0K8dDQZbS5MHa03XgDKhmMOocCoL04Xp_q9391lKlDylOnXJbF6ykqxBs_C5PYcP9k8_yt8eKFkR1aro8A1gdIhjWt-shul9HOWkcETBA9kuUQMu_yHeBYONuWqOtNt5YOLI"/>
</div>
</div>
</header>
<div className="flex flex-1 relative mt-2 md:mt-0">
{/* SideNavBar (Desktop Shell Anchor) */}
<aside className="hidden lg:flex flex-col h-[calc(100vh-80px)] sticky top-20 p-4 gap-4 bg-surface-container-lowest border-r-2 border-secondary shadow-[4px_0_0_0_#586062] w-64">
<div className="flex flex-col items-center gap-2 p-4 bg-surface-container-high rounded-2xl border-2 border-secondary mb-4 drop-block-sm">
<div className="w-16 h-16 rounded-full border-2 border-secondary bg-white overflow-hidden">
<img className="w-full h-full object-cover" alt="A small, expressive 3D robotic companion avatar with glowing blue eyes and a friendly digital screen face, rendered in a clean, polished plastic texture with metallic accents, designed to look encouraging and helpful for a gamified cyber-security training app." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnhjR3SJO13D_bhswE8Icgw-4Kincp2xPAgxiV9JqskmMLMbpYZCqMDBlY4MGsNLYJOsXlgGrMXi3Kl8El1mSkUakwtigqd6ryVaMaMYhmcTQizemJBvrP3CdKzXfcZB6rB8BjsQensQGi6HNyzSc0N8ro7UHyp1-R5ehD-6_Tv6_VE4D1iKC4vL2yCPLhiVD3jL-ukFezBwWaJN4H6KvC-RkBJbJCpGeWtXWUpp1ualNx8yWpBraToeDeDgXqjK3X1mP7kPbsEXWV"/>
</div>
<div className="text-center">
<h3 className="font-label-bold text-label-bold text-primary">Recruit</h3>
<p className="text-[12px] font-bold text-secondary">Level 4 • 1,200 XP</p>
</div>
</div>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-3 bg-primary text-on-primary rounded-xl p-3 border-b-4 border-on-primary-fixed-variant translate-y-[2px]" href="#">
<span className="material-symbols-outlined">rocket_launch</span>
<span className="font-label-bold text-label-bold">Missions</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all border-2 border-transparent hover:border-secondary" href="#">
<span className="material-symbols-outlined">military_tech</span>
<span className="font-label-bold text-label-bold">Levels</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all border-2 border-transparent hover:border-secondary" href="#">
<span className="material-symbols-outlined">storefront</span>
<span className="font-label-bold text-label-bold">Shop</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all border-2 border-transparent hover:border-secondary" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-label-bold text-label-bold">Squad</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all border-2 border-transparent hover:border-secondary" href="#">
<span className="material-symbols-outlined">workspace_premium</span>
<span className="font-label-bold text-label-bold">Trophies</span>
</a>
</nav>
<div className="mt-auto flex flex-col gap-2">
<button className="bg-tertiary text-on-tertiary p-3 rounded-xl border-b-4 border-[#004e60] font-label-bold text-label-bold active:translate-y-[2px] active:border-b-0 transition-all">
                    Start Mission
                </button>
<div className="flex flex-col gap-1 border-t-2 border-secondary pt-4">
<a className="flex items-center gap-3 text-secondary-fixed-dim text-secondary p-2 hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-label-bold text-label-bold">Help</span>
</a>
<a className="flex items-center gap-3 text-secondary-fixed-dim text-secondary p-2 hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-label-bold text-label-bold">Logout</span>
</a>
</div>
</div>
</aside>
{/* Main Content Canvas */}
<main className="flex-1 p-margin-mobile md:p-margin-desktop flex flex-col gap-gutter max-w-6xl mx-auto w-full">
{/* Mobile Progress Bar */}
<div className="md:hidden w-full h-3 bg-surface-container-highest rounded-full border-2 border-secondary overflow-hidden mb-2">
<div className="h-full bg-primary" style={{ width: "65%" }}></div>
</div>
<div className="flex flex-col lg:flex-row gap-8 items-start">
{/* Lesson Content Area */}
<section className="flex-1 w-full order-2 lg:order-1">
<div className="bg-white border-2 border-secondary rounded-3xl p-8 drop-block-md relative overflow-hidden">
{/* Content Decoration */}
<div className="absolute top-0 right-0 p-4 opacity-10">
<span className="material-symbols-outlined text-[120px]">shield</span>
</div>
<header className="mb-8">
<div className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full border-2 border-secondary mb-4">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
<span className="font-label-bold text-[12px] uppercase">Step 3 of 5</span>
</div>
<h1 className="font-display text-headline-lg text-primary mb-2">Protecting your digital identity</h1>
<p className="font-body-lg text-secondary">Your digital identity is like your fingerprint on the internet. It defines who you are in the digital world.</p>
</header>
<article className="space-y-6">
<div className="bg-surface-container-low border-2 border-secondary p-6 rounded-2xl">
<h2 className="font-headline-md text-on-surface mb-4">What makes up your identity?</h2>
<p className="font-body-md text-on-surface-variant mb-6">Every action you take online leaves a trace. Combined, these traces form your profile. Think about:</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="bg-white border-2 border-secondary p-4 rounded-xl flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
<div className="w-12 h-12 bg-primary-fixed rounded-lg border-2 border-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
<span className="material-symbols-outlined text-primary group-hover:text-on-primary">person</span>
</div>
<div>
<h4 className="font-label-bold text-on-surface">Personal Info</h4>
<p className="text-sm text-secondary">Names, addresses, birthdates.</p>
</div>
</div>
<div className="bg-white border-2 border-secondary p-4 rounded-xl flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
<div className="w-12 h-12 bg-tertiary-fixed rounded-lg border-2 border-secondary flex items-center justify-center group-hover:bg-tertiary transition-colors">
<span className="material-symbols-outlined text-tertiary group-hover:text-on-tertiary">history</span>
</div>
<div>
<h4 className="font-label-bold text-on-surface">Digital History</h4>
<p className="text-sm text-secondary">Search logs and purchase habits.</p>
</div>
</div>
<div className="bg-white border-2 border-secondary p-4 rounded-xl flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
<div className="w-12 h-12 bg-secondary-fixed rounded-lg border-2 border-secondary flex items-center justify-center group-hover:bg-secondary transition-colors">
<span className="material-symbols-outlined text-secondary group-hover:text-on-secondary">share</span>
</div>
<div>
<h4 className="font-label-bold text-on-surface">Social Presence</h4>
<p className="text-sm text-secondary">Photos, posts, and comments.</p>
</div>
</div>
<div className="bg-white border-2 border-secondary p-4 rounded-xl flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
<div className="w-12 h-12 bg-primary-fixed-dim rounded-lg border-2 border-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
<span className="material-symbols-outlined text-primary group-hover:text-on-primary">vpn_key</span>
</div>
<div>
<h4 className="font-label-bold text-on-surface">Access Credentials</h4>
<p className="text-sm text-secondary">Usernames and passkeys.</p>
</div>
</div>
</div>
</div>
<div className="p-6 border-2 border-dashed border-outline rounded-2xl flex flex-col items-center text-center gap-4">
<span className="material-symbols-outlined text-primary text-5xl">quiz</span>
<p className="font-headline-md text-on-surface">Quick Challenge!</p>
<p className="font-body-md text-secondary">Which of these is NOT part of your public digital footprint?</p>
<div className="flex flex-wrap justify-center gap-3 mt-2">
<button className="px-6 py-2 rounded-full border-2 border-secondary bg-white font-label-bold hover:bg-primary-fixed transition-colors active-push">Your Instagram Bio</button>
<button className="px-6 py-2 rounded-full border-2 border-secondary bg-white font-label-bold hover:bg-primary-fixed transition-colors active-push">A Tweet from 2018</button>
<button className="px-6 py-2 rounded-full border-2 border-secondary bg-white font-label-bold hover:bg-primary-fixed transition-colors active-push">Your Unsaved Drafts</button>
</div>
</div>
</article>
{/* Navigation Buttons */}
<footer className="mt-12 flex justify-between items-center pt-8 border-t-2 border-surface-container-highest">
<button className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-secondary rounded-2xl font-display text-secondary hover:bg-surface-container transition-all active-push drop-block-sm">
<span className="material-symbols-outlined">arrow_back</span>
                                PREVIOUS
                            </button>
<button className="flex items-center gap-2 px-10 py-4 bg-primary text-on-primary border-2 border-secondary rounded-2xl font-display hover:brightness-110 transition-all active-push-primary drop-block-primary">
                                NEXT
                                <span className="material-symbols-outlined">arrow_forward</span>
</button>
</footer>
</div>
</section>
{/* 3D Mentor Side Panel */}
<aside className="w-full lg:w-80 order-1 lg:order-2 sticky top-24">
<div className="bg-surface-container-high border-2 border-secondary rounded-3xl p-6 drop-block-md relative group">
{/* Mentor Character Illustration */}
<div className="w-full aspect-square bg-white border-2 border-secondary rounded-2xl mb-6 overflow-hidden relative shadow-inner">
<img className="w-full h-full object-cover" alt="A friendly 3D digital mentor character, a floating humanoid robot with a holographic face displaying a 'winking' expression. The robot is sleek, white and red, hovering in a high-tech lab setting with soft neon accents. High-quality render with cinematic lighting, specifically tailored for a young audience in an educational context." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE-miR0OI9M7-ZkGcK7MHl4FKCO9pyfckz1TJ9974BmoN9B-RIBICEW1D41fzOmQ9u7POnczWMtmbW0pe5F86FYONdCO8dDeyJtWNQ-Pgbhs3i9M_Z8tQbeg2_C5PNqF-ryhMuXdnBMVMbq0iveU4HOOoCZaxtdnC_9eV8mBYxP_AY7zdGpxv-kyKLyvPeEHKCLVAkxrc3NF00MhrozFBNzUOKn3DQ4U9cO39cUnIqCCHSuJ_zMAX21TaUkLyoe-ZKVC2Ya1Fnahzo"/>
{/* Animated Pulse Effect */}
<div className="absolute inset-0 bg-primary/5 animate-pulse pointer-events-none"></div>
</div>
<div className="relative bg-white border-2 border-secondary rounded-xl p-4 before:content-[''] before:absolute before:-top-3 before:left-8 before:w-6 before:h-6 before:bg-white before:border-t-2 before:border-l-2 before:border-secondary before:rotate-45">
<h4 className="font-label-bold text-primary mb-1">PRO TIP FROM CYBER-C</h4>
<p className="text-sm font-body-md text-on-surface-variant">
                                "Think of your digital identity like a permanent marker. It's very hard to erase once it's out there! Always double-check your privacy settings on new apps."
                            </p>
</div>
{/* Mini Progress/Status */}
<div className="mt-6 space-y-4">
<div className="flex justify-between items-center text-sm font-label-bold">
<span className="text-secondary">BONUS XP</span>
<span className="text-tertiary">+150</span>
</div>
<div className="w-full h-2 bg-surface-container rounded-full border border-secondary overflow-hidden">
<div className="h-full bg-tertiary" style={{ width: "45%" }}></div>
</div>
<div className="bg-tertiary-container/10 border-2 border-tertiary border-dashed rounded-xl p-3 flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
<span className="text-[12px] font-bold text-tertiary uppercase">Badge progress: Identity Guard</span>
</div>
</div>
</div>
{/* Additional Achievement Card (Bento style hint) */}
<div className="mt-8 bg-on-primary-fixed text-on-primary-container p-6 rounded-3xl border-2 border-secondary drop-block-md">
<div className="flex items-center gap-4">
<div className="text-3xl">🔥</div>
<div>
<p className="font-label-bold text-[12px] text-primary-fixed opacity-80">STREAK</p>
<p className="font-display text-headline-md">5 DAYS!</p>
</div>
</div>
</div>
</aside>
</div>
</main>
</div>
{/* Mobile Bottom Navigation (Only visible on small screens) */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-secondary px-6 py-3 flex justify-around items-center z-50">
<button className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
<span className="text-[10px] font-bold uppercase">Mission</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">military_tech</span>
<span className="text-[10px] font-bold uppercase">Levels</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">storefront</span>
<span className="text-[10px] font-bold uppercase">Shop</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">groups</span>
<span className="text-[10px] font-bold uppercase">Squad</span>
</button>
</nav>


    </div>
  );
}
