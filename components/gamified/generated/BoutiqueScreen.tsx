/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function BoutiqueScreen() {
  return (
    <div className={"bg-background text-on-surface font-body-md min-h-screen pb-20 md:pb-0"}>

{/* Top Navigation Bar */}
<header className="sticky top-0 z-50 bg-surface dark:bg-surface-dim border-b-2 border-secondary dark:border-secondary-fixed shadow-[0_4px_0_0_rgba(88,96,98,1)]">
<div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-7xl mx-auto">
<div className="flex items-center gap-3">
<div className="w-10 h-10 flex items-center justify-center bg-primary-container rounded-lg border-2 border-secondary shadow-[0_2px_0_0_rgba(88,96,98,1)]">
<span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
</div>
<h1 className="text-headline-md font-headline-md font-black text-primary uppercase tracking-tighter">CyberAmbassadeurs</h1>
</div>
{/* Desktop Nav Links */}
<nav className="hidden md:flex items-center gap-8">
<a className="text-secondary dark:text-secondary-fixed-dim font-bold pb-1 hover:text-primary-container transition-colors" href="#">Missions</a>
<a className="text-secondary dark:text-secondary-fixed-dim font-bold pb-1 hover:text-primary-container transition-colors" href="#">Modules</a>
<a className="text-primary font-bold border-b-4 border-primary pb-1" href="#">Shop</a>
</nav>
<div className="flex items-center gap-6">
<div className="hidden sm:flex items-center gap-4 bg-surface-container rounded-full px-4 py-1.5 border-2 border-secondary">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
<span className="font-bold">12</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
<span className="font-bold">2,450</span>
</div>
</div>
<button className="material-symbols-outlined text-secondary hover:text-primary transition-colors">notifications</button>
<div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden bg-surface-container-high">
<img className="w-full h-full object-cover" alt="A stylized 3D avatar of a diverse teenager with purple hair and modern tech-wear, smiling warmly against a clean minimalist background. The style is consistent with high-quality educational game character design, bright and energetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYwIzSC_Oods15k0Qw_QJSxZL5_UGSPMp11uXvrbpaGZV-30pIWRpDFpCVZSCxAdnzAlQGPDjHvwN1_1CX6RXryd6Gd0dDWeEehYXoqTFmKUx3I9HrLvt4jR31xBVJHx8v3E7VXULhQNWWc-GqmmztohQksgZDcxWlHAeQeoY1uLd9EXVfnvI1tF__hqJPZOAQCwqgaSfUxqcCcdOBmDBFM4nbYv4XoKoQ9ldHnrudIKYpQhMV2LVmLfTNwhxaS8zAfmdJbn1dgcdt"/>
</div>
</div>
</div>
</header>
<div className="flex max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
{/* Sidebar Navigation (Desktop) */}
<aside className="hidden md:flex flex-col gap-unit p-6 h-[calc(100vh-80px)] w-64 fixed left-0 border-r-2 border-secondary dark:border-secondary-fixed bg-surface-container-lowest dark:bg-inverse-surface shadow-[4px_0_0_0_rgba(88,96,98,1)]">
<div className="mb-6">
<p className="text-label-bold font-label-bold text-secondary uppercase tracking-widest mb-2">Ambassador Status</p>
<div className="flex flex-col gap-2 bg-surface-container p-4 rounded-xl border-2 border-secondary">
<p className="text-headline-sm font-headline-md text-primary">Lvl 12</p>
<div className="w-full h-4 bg-secondary-container rounded-full overflow-hidden border-2 border-secondary">
<div className="h-full bg-primary" style={{ width: "65%" }}></div>
</div>
<p className="text-[10px] font-bold text-secondary text-right">2,450 XP to Lvl 13</p>
</div>
</div>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1 hover:text-primary" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-bold">Dashboard</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1 hover:text-primary" href="#">
<span className="material-symbols-outlined">school</span>
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
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
<span className="font-label-bold text-primary">Shop</span>
</a>
</nav>
<div className="mt-auto pt-6 border-t-2 border-secondary/20">
<a className="flex items-center gap-4 text-secondary p-4 hover:text-primary" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-label-bold">Help</span>
</a>
<button className="bg-primary text-white w-full p-4 rounded-xl border-2 border-secondary font-black tracking-widest shadow-[0_4px_0_0_rgba(88,96,98,0.3)] active:translate-y-1 active:shadow-none transition-all">
                    START MISSION
                </button>
</div>
</aside>
{/* Main Content Area */}
<main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop">
{/* Hero Header Section */}
<section className="relative overflow-hidden bg-primary-container text-white rounded-3xl border-2 border-secondary shadow-[0_8px_0_0_rgba(88,96,98,1)] p-8 md:p-12 mb-12">
<div className="relative z-10 max-w-2xl">
<div className="inline-flex items-center gap-2 bg-on-primary-container text-primary px-4 py-1 rounded-full text-label-bold font-black mb-6">
<span className="material-symbols-outlined text-sm">auto_awesome</span>
                        SEASON 3 GEAR NOW LIVE
                    </div>
<h2 className="text-display font-display mb-4">Cyber Shop</h2>
<p className="text-body-lg font-body-lg opacity-90 mb-8">Upgrade your avatar, unlock legendary frames, and boost your mission potential with exclusive items.</p>
<div className="flex flex-wrap gap-4">
<button className="bg-white text-primary px-8 py-3 rounded-xl border-2 border-secondary font-black tactile-button uppercase tracking-wider">Inventory</button>
<button className="bg-transparent text-white border-2 border-white/50 px-8 py-3 rounded-xl font-black hover:bg-white/10 transition-colors uppercase tracking-wider">Wishlist</button>
</div>
</div>
{/* Mascot & Background Element */}
<div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-80 h-80 opacity-20 md:opacity-100 flex items-center justify-center">
<img className="w-full h-full object-contain floating-shield" alt="A friendly 3D digital shield mascot with a cheerful smiling face, glowing cyan outlines, and a small green light on top. The mascot floats in a void with orbiting data rings, conveying a sense of security and gaming fun." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4IUz7jyACHv3sLii9CenqtrR1ZZgNZ_8UnQcEzXN1RBpuZMXdKmPNIZqeGidp8Oj7bMQNRzOnjEW2TZrdfKviJS8TBKmbbp-duvs1-kDkbvcoa26T4xe3xKqdoRkDoiXxzkVV1eSe2KzB7P8GcdUM3gH4ArEMrJ2WJvEMuOkJ2MihlybdwwP84b2huH_uG4MctH0hfrPPmtseV2TA3QcPsyUwIW4AFpJLa0gcqFcht56yX_BR0X5zZ5nftN9gW0M8B4T_V5S5in_K"/>
</div>
</section>
{/* Shop Tabs */}
<div className="flex items-center gap-4 mb-8 overflow-x-auto scrollbar-hide pb-2">
<button className="px-6 py-2 bg-primary text-white rounded-full border-2 border-secondary font-bold whitespace-nowrap">All Items</button>
<button className="px-6 py-2 bg-surface text-secondary border-2 border-secondary rounded-full font-bold whitespace-nowrap hover:bg-secondary-container transition-colors">Skins</button>
<button className="px-6 py-2 bg-surface text-secondary border-2 border-secondary rounded-full font-bold whitespace-nowrap hover:bg-secondary-container transition-colors">Frames</button>
<button className="px-6 py-2 bg-surface text-secondary border-2 border-secondary rounded-full font-bold whitespace-nowrap hover:bg-secondary-container transition-colors">Power-ups</button>
<button className="px-6 py-2 bg-surface text-secondary border-2 border-secondary rounded-full font-bold whitespace-nowrap hover:bg-secondary-container transition-colors">Limited</button>
</div>
{/* Bento Grid of Items */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
{/* Item Card 1: Power Up */}
<div className="tactile-card bg-surface-container-lowest rounded-2xl flex flex-col">
<div className="relative h-48 bg-tertiary-fixed-dim rounded-t-xl overflow-hidden group">
<div className="absolute inset-0 flex items-center justify-center">
<span className="material-symbols-outlined text-6xl text-tertiary group-hover:scale-110 transition-transform duration-300">bolt</span>
</div>
<div className="absolute top-3 left-3 bg-tertiary text-white text-[10px] font-black px-2 py-1 rounded border border-secondary uppercase">Mission Boost</div>
</div>
<div className="p-card-padding flex-1 flex flex-col">
<div className="flex justify-between items-start mb-2">
<h3 className="font-bold text-lg">XP Surge x2</h3>
<span className="flex items-center gap-1 font-black text-secondary">
<span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                                450
                            </span>
</div>
<p className="text-sm text-secondary mb-6 flex-1">Double your XP gains for the next 3 mission completions. Perfect for level climbing.</p>
<button className="w-full bg-primary text-white py-3 rounded-xl border-2 border-secondary font-black tactile-button uppercase tracking-tighter">Buy Now</button>
</div>
</div>
{/* Item Card 2: Skin */}
<div className="tactile-card bg-surface-container-lowest rounded-2xl flex flex-col">
<div className="relative h-48 bg-primary-fixed rounded-t-xl overflow-hidden group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Close up of a stylized 3D avatar outfit, a futuristic neon-lined tactical jacket with glowing pink accents and holographic badges. The background is a clean soft gray studio lighting, highlighting the tactile textures of the fabric." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-I3oFKONd-wcv5uuMjiK0GvUUknwqlU951iaMYuzyuVLi7mf5MZ-_vQInPGItyEpE4zfHTeEyruqov1U6J3EYuVeriFWowEN8LEDWPETglcKopJzwtExkl2u0kYrJ-GVy_q_UO0qXPMHqIow8kuOW0a4p9Jd6nnSfyJaoYhoFf8I_m1eJKHwhkBEOCv4A5N780m-gE6uNypebml1d9T3P0TpWVfU12quTCAjQaIsTchO0Kha9lGd4_-AHX5ghwhPUefvfWfrYCFtr"/>
<div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black px-2 py-1 rounded border border-secondary uppercase">Epic Skin</div>
</div>
<div className="p-card-padding flex-1 flex flex-col">
<div className="flex justify-between items-start mb-2">
<h3 className="font-bold text-lg">Neon Runner</h3>
<span className="flex items-center gap-1 font-black text-secondary">
<span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                                1,200
                            </span>
</div>
<p className="text-sm text-secondary mb-6 flex-1">A glowing futuristic outfit that highlights your presence in any lobby or leaderboard.</p>
<button className="w-full bg-primary text-white py-3 rounded-xl border-2 border-secondary font-black tactile-button uppercase tracking-tighter">Buy Now</button>
</div>
</div>
{/* Item Card 3: Badge Frame */}
<div className="tactile-card bg-surface-container-lowest rounded-2xl flex flex-col">
<div className="relative h-48 bg-on-tertiary-fixed-variant rounded-t-xl overflow-hidden flex items-center justify-center">
<div className="w-32 h-32 rounded-full border-8 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)] flex items-center justify-center bg-white/10">
<span className="material-symbols-outlined text-white text-5xl">military_tech</span>
</div>
<div className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-black px-2 py-1 rounded border border-secondary uppercase">Frame</div>
</div>
<div className="p-card-padding flex-1 flex flex-col">
<div className="flex justify-between items-start mb-2">
<h3 className="font-bold text-lg">Golden Guardian</h3>
<span className="flex items-center gap-1 font-black text-secondary">
<span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                                800
                            </span>
</div>
<p className="text-sm text-secondary mb-6 flex-1">A prestigious animated frame that encases your avatar profile picture.</p>
<button className="w-full bg-primary text-white py-3 rounded-xl border-2 border-secondary font-black tactile-button uppercase tracking-tighter">Buy Now</button>
</div>
</div>
{/* Item Card 4: Limited Item */}
<div className="tactile-card bg-surface-container-lowest rounded-2xl flex flex-col">
<div className="relative h-48 bg-surface-container-highest rounded-t-xl overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
<div className="absolute inset-0 flex items-center justify-center">
<span className="material-symbols-outlined text-6xl text-primary animate-pulse">auto_fix_high</span>
</div>
<div className="absolute top-3 left-3 bg-error text-white text-[10px] font-black px-2 py-1 rounded border border-secondary uppercase">Limited Edition</div>
</div>
<div className="p-card-padding flex-1 flex flex-col">
<div className="flex justify-between items-start mb-2">
<h3 className="font-bold text-lg">Phishing Shield</h3>
<span className="flex items-center gap-1 font-black text-secondary">
<span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                                2,000
                            </span>
</div>
<p className="text-sm text-secondary mb-6 flex-1">Provides one-time immunity to failed mission penalties during advanced challenges.</p>
<button className="w-full bg-primary text-white py-3 rounded-xl border-2 border-secondary font-black tactile-button uppercase tracking-tighter">Buy Now</button>
</div>
</div>
{/* Item Card 5: Power Up */}
<div className="tactile-card bg-surface-container-lowest rounded-2xl flex flex-col">
<div className="relative h-48 bg-secondary-fixed rounded-t-xl overflow-hidden flex items-center justify-center">
<span className="material-symbols-outlined text-6xl text-secondary">database</span>
</div>
<div className="p-card-padding flex-1 flex flex-col">
<div className="flex justify-between items-start mb-2">
<h3 className="font-bold text-lg">Hint Package</h3>
<span className="flex items-center gap-1 font-black text-secondary">
<span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                                150
                            </span>
</div>
<p className="text-sm text-secondary mb-6 flex-1">Unlock 5 extra hints to use during any "Academy" interactive modules.</p>
<button className="w-full bg-primary text-white py-3 rounded-xl border-2 border-secondary font-black tactile-button uppercase tracking-tighter">Buy Now</button>
</div>
</div>
{/* Item Card 6: Skin */}
<div className="tactile-card bg-surface-container-lowest rounded-2xl flex flex-col">
<div className="relative h-48 bg-tertiary-fixed rounded-t-xl overflow-hidden group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="A 3D render of a futuristic 'Cypher' helmet, featuring a sleek visor with binary code patterns reflected on it. The style is bright and clean, with bold black outlines and vibrant cyan highlights, fitting a gaming shop UI." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRntIPWm0JWI586rYTk3Qt8xinM1gaDIIL4WMUMZUpuiXgnnT0tmu9ZIfXUgQYxtPif3apkUIKk7vA_T92DXaavyOSjbwURIEVryIEedDYOMpt283tFuXZmiNXR1T83vK64STwIR4F0IqT6B3s-PU8DIGHjufLjxcTDmyWgFC-i3rxqHpuFhxN1BpTDpiO9c7cO8v2TXBrkEngleSsyfyjLgOJnLSFAXnyc0WbpX5RP-ZaKJp6crofNhHRhxqx2Kd4oHoyxmK1QIFS"/>
</div>
<div className="p-card-padding flex-1 flex flex-col">
<div className="flex justify-between items-start mb-2">
<h3 className="font-bold text-lg">Data Visor</h3>
<span className="flex items-center gap-1 font-black text-secondary">
<span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                                600
                            </span>
</div>
<p className="text-sm text-secondary mb-6 flex-1">Headgear accessory that adds a digital interface overlay to your avatar's face.</p>
<button className="w-full bg-primary text-white py-3 rounded-xl border-2 border-secondary font-black tactile-button uppercase tracking-tighter">Buy Now</button>
</div>
</div>
</div>
{/* Empty State / More Items */}
<div className="mt-12 py-12 text-center bg-surface-container rounded-3xl border-2 border-dashed border-secondary">
<span className="material-symbols-outlined text-4xl text-secondary mb-4">inventory_2</span>
<p className="font-bold text-secondary">Restocking in 14 hours...</p>
</div>
</main>
</div>
{/* Mobile Bottom Navigation Bar */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-secondary flex justify-around items-center py-3 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
<a className="flex flex-col items-center gap-1 text-secondary" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-[10px] font-bold">Home</span>
</a>
<a className="flex flex-col items-center gap-1 text-secondary" href="#">
<span className="material-symbols-outlined">school</span>
<span className="text-[10px] font-bold">Learn</span>
</a>
<div className="relative -top-6">
<button className="w-14 h-14 bg-primary text-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
<span className="material-symbols-outlined text-3xl">add</span>
</button>
</div>
<a className="flex flex-col items-center gap-1 text-primary" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
<span className="text-[10px] font-bold">Shop</span>
</a>
<a className="flex flex-col items-center gap-1 text-secondary" href="#">
<span className="material-symbols-outlined">person</span>
<span className="text-[10px] font-bold">Profile</span>
</a>
</nav>


    </div>
  );
}
