/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function ContenuScreen() {
  return (
    <div className={"bg-background text-on-surface font-body-md overflow-x-hidden"}>

{/* Sidebar Navigation Shell */}
<aside className="hidden lg:flex flex-col h-screen fixed left-0 top-0 p-4 gap-4 bg-surface-container-lowest border-r-2 border-secondary shadow-[4px_0_0_0_#586062] w-64 z-50">
<div className="mb-6">
<h1 className="font-display text-headline-md text-primary px-2">Cyberambassadeurs</h1>
</div>
<div className="flex items-center gap-3 p-3 bg-surface-container-high rounded-xl border-2 border-secondary mb-4">
<div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden bg-primary-fixed">
<img className="w-full h-full object-cover" alt="A 3D stylized character avatar of a young cyber security recruit wearing a high-tech visor and a crimson uniform, presented in a playful, heroic pose against a clean white studio background. The lighting is bright and cheerful, emphasizing the tactile textures of the suit's fabric and the character's friendly expression in a gamified art style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2LesYlctiFx0GIJC9Fcs0hfFa4mYdwSdwKXRA6f0I2q7n8NMB1jTEx011swZwLub1tslsq7_0-TlgrRmgHAerike1EOBV0iqsOxqQ6xX7eFz48ZzwZyA-eFuClnunNPMjdmwqxN3_g_Ww846kjczfjEC0u9qI5miEQr0vzQANDj6R-1yYbAL-g0JFVy0A8HQmPz5h5wt5o0tYY2zhDextI2-dmKvaIHcxiDcHf3YnEJTuf8XFj6eV0dswBld96AU59_77hhbjEIU1"/>
</div>
<div>
<p className="font-label-bold text-label-bold text-primary">Admin</p>
<p className="text-xs text-secondary">Level 12 • Cmdr</p>
</div>
</div>
<nav className="flex flex-col gap-2 flex-grow">
{/* Active Tab: Missions */}
<a className="flex items-center gap-3 bg-primary text-on-primary rounded-xl p-3 border-b-4 border-on-primary-fixed-variant translate-y-[2px]" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
<span className="font-label-bold text-label-bold">Missions</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">military_tech</span>
<span>Levels</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">storefront</span>
<span>Shop</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">groups</span>
<span>Squad</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">workspace_premium</span>
<span>Trophies</span>
</a>
</nav>
<div className="mt-auto border-t-2 border-surface-container-high pt-4 flex flex-col gap-2">
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">help</span>
<span>Help</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">logout</span>
<span>Logout</span>
</a>
</div>
</aside>
{/* Main Content Canvas */}
<main className="lg:ml-64 min-h-screen">
{/* Top Navigation */}
<header className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 bg-surface border-b-2 border-secondary sticky top-0 z-40">
<div className="flex items-center gap-4">
<span className="lg:hidden material-symbols-outlined text-primary text-3xl">menu</span>
<h2 className="font-headline-md text-headline-md text-primary">Mission Control</h2>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex bg-surface-container rounded-full px-4 py-2 border-2 border-secondary items-center gap-2">
<span className="material-symbols-outlined text-secondary text-sm">search</span>
<input className="bg-transparent border-none focus:ring-0 text-sm w-48" placeholder="Search modules..." type="text"/>
</div>
<div className="flex gap-2">
<button className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-secondary bg-surface-container-lowest text-primary active-push">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-secondary bg-surface-container-lowest text-primary active-push">
<span className="material-symbols-outlined">settings</span>
</button>
</div>
</div>
</header>
{/* Dashboard Content */}
<div className="p-margin-mobile md:p-margin-desktop max-w-[1400px] mx-auto">
{/* Hero Stats / Action */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12 items-end">
<div className="md:col-span-8">
<h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">Content Library</h3>
<p className="text-body-lg text-on-surface-variant max-w-2xl">Manage your tactical cyber-education modules. Deploy new training simulations and track squad performance across the network.</p>
</div>
<div className="md:col-span-4 flex justify-end">
<button className="w-full md:w-auto bg-primary text-on-primary font-headline-md px-8 py-4 rounded-xl border-b-4 border-r-2 border-on-primary-fixed-variant drop-block-primary flex items-center justify-center gap-3 active-push-primary transition-all">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                        Create New Module
                    </button>
</div>
</div>
{/* Dashboard Bento Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
{/* Large Module Card: Phishing Defense */}
<div className="md:col-span-2 lg:col-span-2 bg-surface-container-lowest border-2 border-secondary rounded-2xl p-6 drop-block drop-block-hover transition-all">
<div className="flex justify-between items-start mb-6">
<div className="p-3 bg-primary-fixed rounded-xl border-2 border-secondary">
<span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>phishing</span>
</div>
<div className="flex flex-col items-end">
<span className="px-3 py-1 bg-tertiary-container text-on-tertiary text-xs font-label-bold rounded-full border-2 border-secondary">ACTIVE</span>
<span className="text-xs text-secondary mt-1">v2.4.1</span>
</div>
</div>
<div className="mb-8">
<h4 className="font-headline-md text-headline-md text-on-surface mb-2">Phishing Defense</h4>
<p className="text-secondary text-sm line-clamp-2">Train recruits to identify sophisticated spear-phishing attempts and social engineering tactics.</p>
</div>
{/* Progress Section */}
<div className="space-y-4">
<div>
<div className="flex justify-between text-xs font-label-bold mb-2">
<span className="text-secondary">COMPLETION RATE</span>
<span className="text-primary">84%</span>
</div>
<div className="w-full h-5 bg-surface-container border-2 border-secondary rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: "84%" }}></div>
</div>
</div>
<div className="flex gap-4 pt-4 border-t-2 border-surface-container">
<div className="flex-1">
<p className="text-xs text-secondary">ACTIVE RECRUITS</p>
<p className="font-headline-md text-headline-md">1,240</p>
</div>
<div className="flex-1 border-l-2 border-surface-container pl-4">
<p className="text-xs text-secondary">AVG SCORE</p>
<p className="font-headline-md text-headline-md">920</p>
</div>
</div>
</div>
</div>
{/* Module Card: Privacy Shield */}
<div className="bg-surface-container-lowest border-2 border-secondary rounded-2xl p-6 drop-block drop-block-hover transition-all">
<div className="mb-4">
<div className="w-full h-32 rounded-xl border-2 border-secondary bg-surface overflow-hidden mb-4 relative">
<img className="w-full h-full object-cover" alt="A 3D isometric illustration of a digital shield surrounded by floating lock icons and binary code streams. The colors are dominated by vibrant blues and soft whites with red glowing accents, fitting the Kinetic Horizon tech aesthetic. The style is chunky and toy-like, featuring high-gloss plastic finishes and dramatic, clean studio lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb4cQ2MP5uumyL-vk4QCJacu0SWBUeBGh2-E931jc7fLqH8oN50tV8u8yRkzs7HrNwYZpbnI07m--F9-6pK7Nuvs9lJi5Kfslr9AuzRfrY0xQSh5Q8j0NAK26QTYbbnzZ3lwNL72LfWNvSB6Qw89g_QCjR6ANbp36IXp9eVappDn2kRlUKZgj1fhSFZE7ub56-R8z_N7TSk4WbNZ1gKNYGjSa8O_A7V6G2pqABBGh-ujX8zLpevLgqmxRiK3Wz7w-omb1QAjSHD-6F"/>
</div>
<h4 className="font-label-bold text-headline-md text-on-surface mb-1">Privacy Shield</h4>
<p className="text-xs text-secondary">Data protection & GDPR basics</p>
</div>
<div className="pt-4 border-t-2 border-surface-container mt-auto">
<div className="flex justify-between items-center">
<span className="text-xs font-label-bold text-tertiary">72% COMPLETE</span>
<button className="p-2 border-2 border-secondary rounded-lg active-push">
<span className="material-symbols-outlined text-sm">edit</span>
</button>
</div>
</div>
</div>
{/* Module Card: Network Hardening */}
<div className="bg-surface-container-lowest border-2 border-secondary rounded-2xl p-6 drop-block drop-block-hover transition-all">
<div className="mb-4">
<div className="w-full h-32 rounded-xl border-2 border-secondary bg-surface overflow-hidden mb-4">
<img className="w-full h-full object-cover" alt="A 3D tactile rendering of a server rack with glowing cables and hovering security drones. The aesthetic is gamified and futuristic, utilizing a color palette of deep navy, electric red, and bright cyan. The textures feel physical and chunky, like premium high-tech equipment in a tactical mobile game, with soft shadows and sharp highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzjamkracDNILFmtYfkZg89vzM920IX5jyL-cbdlg8bABNENN2iNEdD4fA77u2F-R7K-XXHnBWJCmXMy4UA1zqjtd9D9tFdkO6__Y63CbdXjGW0Dp0oZsM39ZOZj28wI3Cww55BiFX3c3tJi1cR7vJ_cnGDq9ZFdK5qtZJHqaNbC7m5Ocf5ROXXCpODK-hb0sjWt9Ohtq1df_aVUQYD_DG3pLrevzOIrTcqYtrYj9kjDEKQr8X1d6SqoZFy3Q-VCPodYg0Y7Ot-UU8"/>
</div>
<h4 className="font-label-bold text-headline-md text-on-surface mb-1">Firewall Ops</h4>
<p className="text-xs text-secondary">Network security fundamentals</p>
</div>
<div className="pt-4 border-t-2 border-surface-container">
<div className="flex justify-between items-center">
<span className="text-xs font-label-bold text-secondary">DRAFT MODE</span>
<button className="p-2 border-2 border-secondary rounded-lg active-push">
<span className="material-symbols-outlined text-sm">rocket</span>
</button>
</div>
</div>
</div>
{/* Stats Bento: Performance Over Time */}
<div className="md:col-span-3 lg:col-span-3 bg-surface-container border-2 border-secondary rounded-2xl p-8 overflow-hidden relative drop-block">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
<div>
<h4 className="font-headline-md text-headline-md text-on-surface">Global Squad Impact</h4>
<p className="text-secondary">Network-wide progress across all sectors</p>
</div>
<div className="flex gap-2">
<span className="px-4 py-2 bg-surface-container-lowest border-2 border-secondary rounded-xl font-label-bold">Week</span>
<span className="px-4 py-2 bg-secondary text-on-secondary border-2 border-secondary rounded-xl font-label-bold">Month</span>
</div>
</div>
{/* Simplified Kinetic Chart Visual */}
<div className="h-48 flex items-end gap-3 md:gap-6 px-2">
<div className="flex-1 bg-primary-container/20 border-t-4 border-primary relative group cursor-pointer" style={{ height: "60%" }}>
<div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
</div>
<div className="flex-1 bg-primary-container/20 border-t-4 border-primary relative group" style={{ height: "45%" }}></div>
<div className="flex-1 bg-primary-container/20 border-t-4 border-primary relative group" style={{ height: "85%" }}></div>
<div className="flex-1 bg-primary-container/20 border-t-4 border-primary relative group" style={{ height: "55%" }}></div>
<div className="flex-1 bg-primary-container/20 border-t-4 border-primary relative group" style={{ height: "70%" }}></div>
<div className="flex-1 bg-primary-container/20 border-t-4 border-primary relative group" style={{ height: "40%" }}></div>
<div className="flex-1 bg-primary-container/20 border-t-4 border-primary relative group" style={{ height: "95%" }}></div>
</div>
<div className="mt-8 grid grid-cols-3 gap-4">
<div className="p-4 bg-surface-container-lowest border-2 border-secondary rounded-xl">
<p className="text-xs text-secondary font-label-bold">Missions Run</p>
<p className="text-2xl font-bold">42,012</p>
</div>
<div className="p-4 bg-surface-container-lowest border-2 border-secondary rounded-xl">
<p className="text-xs text-secondary font-label-bold">Badges Earned</p>
<p className="text-2xl font-bold">12,855</p>
</div>
<div className="p-4 bg-surface-container-lowest border-2 border-secondary rounded-xl">
<p className="text-xs text-secondary font-label-bold">Threats Blocked</p>
<p className="text-2xl font-bold">5.2k</p>
</div>
</div>
</div>
{/* Profile Card / Level Tracking */}
<div className="bg-primary text-on-primary border-2 border-secondary rounded-2xl p-6 drop-block-primary relative overflow-hidden flex flex-col justify-between">
<div className="relative z-10">
<h4 className="font-headline-md text-on-primary mb-4">Recruitment Drive</h4>
<div className="flex -space-x-4 mb-4">
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-surface overflow-hidden">
<img className="w-full h-full object-cover" alt="Close up avatar of a diverse student character with a determined look and a red cybernetic eye patch, gamified 3D digital art style, high contrast lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwAiMGbu_v_whCzD5Xjo7GgRUtU6n4u2LYV2qMO2Jy1xACHjI--Ln2fmN_rDMaKFLMM7_T1jROQmoNufqywn-jKrIH5E20BJbOZLTJGZOQODHY5--Wtok8yQyIf9cDzI3k-O9iGupa_ak3ZHAS0kAd6JlYxLub_b85p0098B0VcH2w6uLK64ORTvUl1uB3BOzW7qlEmQR_JhI9Ex2QUrN70gVXFRGyA7BladUMpzpyBZYXW3oli9Ak3UoDHatajzBwg16W2mZvU3DH"/>
</div>
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-surface overflow-hidden">
<img className="w-full h-full object-cover" alt="Close up avatar of a young female recruit with neon blue hair and a tech headset, smiling confidently, high-quality 3D render with tactile surfaces." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3znhOHRHaOlW72Bpq__AQcGeuTTmSfgq1Hd6w2PSrQCuBdQvilZCt6woLpzqYW7WlVaVFZ8fwrdNfhFMUdP2Od0FPpVVXtjAfmUdjmzUtBjnTgTS5NY7GZ8IKCJ1JEJq981d1crSR_pHHMwWwBOJmOnVkLnz6Ug-OvJfdD6zyznH4WkHCIUyEbF5AA4Fh6iHdaEwcwQctDuqY7Ob1nDi9LSNiXzPGOcNsVsJQSpbCdFMoVttIVvgnbtW7AZe-IPi6XCOXICYUGoD2"/>
</div>
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-surface overflow-hidden">
<img className="w-full h-full object-cover" alt="Close up avatar of a studious recruit wearing oversized glasses and a high-collar red jacket, 3D character art with bright saturated colors." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFOHuLPgt9LIN1z6slijvSfvrPNv1kct5XqSwLaH9N5ltpDrC12dXMzEqgPODmki6dOPop3rC-ykImVVBMxzEv_C1tZg4N50vMKMKU4AuhbYaxvqIEQ-vuLb8odmDq2-pW-AuGQNhBRYpjZCRQ-YbKLHb3BHFkEDQmNoyDxNRWfl320rTV2vPKbqpwpgVtlOobbF7l0_VgewEEcHuMs1ZZmbqLZAHDv0G80EZdYQqIEOWg9S7JuWAF7rQbYTJUJGmLWHpe8Mx9nX3I"/>
</div>
<div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-secondary bg-surface-container text-on-surface font-label-bold text-xs">
                                +42
                            </div>
</div>
<p className="text-on-primary/80 text-sm font-medium mb-6">New recruits have joined the network in the last 24 hours.</p>
</div>
<button className="relative z-10 w-full py-3 bg-surface-container-lowest text-primary font-headline-md rounded-xl border-2 border-secondary active-push">
                        Review Squad
                    </button>
{/* Visual decoration */}
<div className="absolute -bottom-10 -right-10 w-32 h-32 bg-on-primary-fixed-variant/20 rounded-full blur-3xl"></div>
</div>
{/* Module Card: Password Fort */}
<div className="bg-surface-container-lowest border-2 border-secondary rounded-2xl p-6 drop-block drop-block-hover transition-all">
<div className="mb-4">
<div className="w-full h-32 rounded-xl border-2 border-secondary bg-surface overflow-hidden mb-4">
<img className="w-full h-full object-cover" alt="A chunky 3D castle made of digital blocks and reinforced with glowing red laser grids, representing password security. The style is playful and tactile, resembling high-end educational gaming assets, with crisp lighting that emphasizes the heavy, durable geometry of the fort." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqcOlfnsVyPRNcn6KMpBQaQmO9nNwFsXJ58PJtjVxr-RgkS5u-TS_R2UFLWMfKkXWRQW9pSMkv0lYnbA4lanor8oJ3CnY8yiaXwN_GBfcFByLpIW8jvsNtVH6z4qMZDYFfPldRZfi1OlUIC6yxqgHEKXVKDocxs7D-mBIJy_xqS6NMcG6afS8SzaJR5EUOiuGbXgIyBRr5TscSywHdCUFbVZBT-YbPeXh4TtBnfr-UhBdeOxaIM656vDvNCtufXSkKHokJK4rddJ7c"/>
</div>
<h4 className="font-label-bold text-headline-md text-on-surface mb-1">Password Fort</h4>
<p className="text-xs text-secondary">Advanced credential hardening</p>
</div>
<div className="pt-4 border-t-2 border-surface-container">
<div className="flex justify-between items-center">
<span className="text-xs font-label-bold text-primary">98% COMPLETE</span>
<button className="p-2 border-2 border-secondary rounded-lg active-push">
<span className="material-symbols-outlined text-sm">visibility</span>
</button>
</div>
</div>
</div>
{/* Empty State / Add New Placeholder */}
<div className="bg-surface-container-low border-2 border-dashed border-secondary/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-surface-container transition-all">
<div className="w-12 h-12 rounded-full border-2 border-secondary/50 flex items-center justify-center group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-secondary">add</span>
</div>
<p className="font-label-bold text-secondary text-sm">Add Module Slot</p>
</div>
</div>
</div>
{/* Floating Action Button for Mobile */}
<button className="md:hidden fixed bottom-6 right-6 w-16 h-16 bg-primary text-on-primary rounded-full border-b-4 border-r-2 border-on-primary-fixed-variant drop-block-primary flex items-center justify-center z-50 active:translate-y-1 transition-all">
<span className="material-symbols-outlined text-3xl">add</span>
</button>
</main>
{/* Success Feedback Notification (Hidden by default) */}
<div className="fixed bottom-8 left-1/2 -translate-x-1/2 translate-y-32 transition-transform duration-500 bg-surface-container-highest border-2 border-secondary p-4 rounded-2xl drop-block flex items-center gap-4 z-[100]" id="notification">
<div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container border-2 border-secondary">
<span className="material-symbols-outlined">check_circle</span>
</div>
<div>
<p className="font-label-bold">Mission Deployed!</p>
<p className="text-xs text-secondary">Changes saved to the network.</p>
</div>
</div>


    </div>
  );
}
