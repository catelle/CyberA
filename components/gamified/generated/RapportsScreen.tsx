/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function RapportsScreen() {
  return (
    <div className={"bg-background text-on-background min-h-screen"}>

{/* TopNavBar */}
<header className="bg-surface sticky top-0 z-50 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 border-b-2 border-secondary">
<div className="flex items-center gap-3">
<span className="font-display text-headline-md text-primary">Cyberambassadeurs</span>
<span className="hidden md:inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-label-bold text-[10px] rounded-full border-2 border-secondary">PARENT PORTAL</span>
</div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container-high rounded-full transition-colors">notifications</button>
<button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container-high rounded-full transition-colors">settings</button>
<div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden">
<img className="w-full h-full object-cover" alt="A professional portrait of a supportive parent smiling warmly, set against a clean, modern home office background. The lighting is soft and natural, matching the high-key optimism of the Cyberambassadeurs platform. The style is crisp and high-definition, emphasizing trust and clarity with a touch of energetic warmth." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBES2CLP4TvDxY8Cl6HQRB_3_U8irG8Kth-qQPiKcj402hx3QhKQTOcYKMT0xkoZ3dLOumlMlN9BTwj3uBvMzhzeR4V5lFK4axN-boo1uTdbdAYQwynWcDQG3PVWlJPPgsNK7rYd0nXjinsQNqifdKwqaPNt4VT05KAHWOENbSawOsNtbP4bueM8HV3caQ3O-OQ9xG_dwnfhUfCiZu5rerDrENewaE2uqeSQXQpuu9eFOZQ2W2919-RbHa-0udjZpexrhfTFqUud0re"/>
</div>
</div>
</header>
<div className="flex">
{/* SideNavBar */}
<aside className="hidden lg:flex flex-col h-[calc(100vh-80px)] w-64 sticky top-20 p-4 gap-4 bg-surface-container-lowest border-r-2 border-secondary drop-block">
<div className="flex flex-col gap-1 px-2 mb-4">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-xl border-2 border-primary overflow-hidden">
<img className="w-full h-full object-cover" alt="A vibrant 3D cartoon avatar of a teenage student wearing futuristic cyber-armor, smiling confidently. The character is set against a clean white background with a subtle red glow. The art style is polished and gamified, reminiscent of high-end educational apps like Duolingo but for cyber-security." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCCPJecXfVIyawxCxV9SWs6uALKJDFf3YlGGZORI2V0HOu_fVAHnEwJUdWrE7gEVhvzekI6eUAmxyS-G0hdKPEXcgGoJYvaLk1YTb0pT4eLzmARLNzVpiz5jtoMRHrymhfZB8_rEcuTSxOQGFbWYVms24Nr2wnnGsCREoDstvV-yvtZYnIBxVYFd-6aVKjkiACYV0_XM1ts7Z9l9rGcFy9zt-P7-QJFzLKtoX1K_uogjpD6VmJ7_3SlrKBpF2xzU7EpjJ5Msvz1_pP"/>
</div>
<div>
<p className="font-label-bold text-label-bold text-primary">Recruit</p>
<p className="text-[12px] text-secondary font-medium">Level 4 • 1,200 XP</p>
</div>
</div>
</div>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-3 bg-primary text-on-primary rounded-xl p-3 border-b-4 border-on-primary-fixed-variant translate-y-[2px] font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">analytics</span>
                    Reports
                </a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">rocket_launch</span>
                    Missions
                </a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">military_tech</span>
                    Levels
                </a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">storefront</span>
                    Shop
                </a>
</nav>
<div className="mt-auto flex flex-col gap-2 pt-4 border-t-2 border-surface-container">
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">help</span>
                    Help
                </a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">logout</span>
                    Logout
                </a>
</div>
</aside>
{/* Main Content Canvas */}
<main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-[1200px] mx-auto">
{/* Page Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Alex's Learning Report</h1>
<p className="font-body-lg text-body-lg text-secondary">Weekly performance: Oct 14 - Oct 21</p>
</div>
<button className="button-3d bg-on-tertiary-fixed text-on-tertiary border-2 border-secondary px-6 py-3 rounded-xl flex items-center gap-2 font-label-bold text-label-bold hover:bg-tertiary-fixed-dim transition-all">
<span className="material-symbols-outlined">download</span>
                    Download PDF Report
                </button>
</div>
{/* Bento Grid Summary */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
{/* Active Summary Card */}
<div className="md:col-span-8 bg-surface-container-lowest border-2 border-secondary rounded-2xl p-card-padding drop-block relative overflow-hidden">
<div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
<span className="material-symbols-outlined text-[120px]">monitoring</span>
</div>
<h3 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
<span className="material-symbols-outlined">query_stats</span>
                        Activity Summary
                    </h3>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
<div className="bg-surface p-4 rounded-xl border-2 border-secondary">
<p className="text-secondary font-label-bold text-[12px] uppercase mb-1">Time Spent</p>
<p className="font-headline-md text-headline-md">4.2 <span className="text-body-md font-medium text-secondary">hrs</span></p>
</div>
<div className="bg-surface p-4 rounded-xl border-2 border-secondary">
<p className="text-secondary font-label-bold text-[12px] uppercase mb-1">Quiz Avg.</p>
<p className="font-headline-md text-headline-md">92<span className="text-body-md font-medium text-secondary">%</span></p>
</div>
<div className="bg-surface p-4 rounded-xl border-2 border-secondary">
<p className="text-secondary font-label-bold text-[12px] uppercase mb-1">XP Earned</p>
<p className="font-headline-md text-headline-md">450</p>
</div>
<div className="bg-surface p-4 rounded-xl border-2 border-secondary">
<p className="text-secondary font-label-bold text-[12px] uppercase mb-1">Rank</p>
<p className="font-headline-md text-headline-md">Top 5%</p>
</div>
</div>
<div className="mt-8">
<p className="font-label-bold text-label-bold mb-3 flex items-center gap-2">
                            Overall Mission Progress
                            <span className="text-secondary text-[12px] font-normal">(75%)</span>
</p>
<div className="h-6 w-full bg-surface-container rounded-full border-2 border-secondary overflow-hidden">
<div className="h-full bg-primary-container w-3/4 rounded-r-full transition-all duration-1000 ease-out"></div>
</div>
</div>
</div>
{/* Tip of the Week */}
<div className="md:col-span-4 bg-tertiary-container border-2 border-secondary rounded-2xl p-card-padding drop-block relative">
<div className="flex items-center gap-3 mb-4">
<div className="bg-white p-2 rounded-lg border-2 border-secondary">
<span className="material-symbols-outlined text-tertiary">lightbulb</span>
</div>
<h3 className="font-label-bold text-label-bold text-on-tertiary-container">Cyber-Tip of the Week</h3>
</div>
<p className="font-body-md text-white mb-6 leading-relaxed">
                        "Encourage Alex to use 'Passphrases' instead of passwords. Combining three random words like <span className="font-bold underline decoration-2">Purple-Bicycle-Moon</span> is harder for AI to guess but easier for humans to remember!"
                    </p>
<button className="w-full bg-white text-tertiary border-2 border-secondary py-3 rounded-xl font-label-bold text-label-bold button-3d">
                        Share with Alex
                    </button>
</div>
</div>
{/* Journey Map Section */}
<section className="mb-16">
<div className="flex items-center justify-between mb-8">
<h2 className="font-headline-md text-headline-md text-on-surface">The Learning Path</h2>
<div className="flex gap-2">
<span className="px-3 py-1 bg-surface-container-high rounded-full border-2 border-secondary font-label-bold text-[12px]">Week 42</span>
</div>
</div>
<div className="bg-surface-container-lowest border-2 border-secondary rounded-3xl p-8 drop-block journey-path relative min-h-[300px] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
{/* SVG Path Connector (Hidden on Mobile) */}
<svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 hidden md:block" preserveAspectRatio="none" viewBox="0 0 1000 300">
<path d="M 100 150 Q 250 50 400 150 T 700 150 T 1000 150" fill="none" stroke="#ba0034" strokeDasharray="12 12" strokeWidth="4"></path>
</svg>
{/* Milestone 1 */}
<div className="relative z-10 flex flex-col items-center group cursor-pointer">
<div className="w-20 h-20 bg-primary rounded-full border-4 border-secondary flex items-center justify-center text-white drop-block transition-transform group-hover:scale-110">
<span className="material-symbols-outlined text-3xl">verified_user</span>
</div>
<div className="mt-4 text-center">
<p className="font-label-bold text-label-bold">Digital ID</p>
<p className="text-[12px] text-primary font-bold">COMPLETED</p>
</div>
</div>
{/* Milestone 2 (Active) */}
<div className="relative z-10 flex flex-col items-center group cursor-pointer">
<div className="w-24 h-24 bg-surface rounded-full border-4 border-primary flex items-center justify-center text-primary drop-block-primary relative animate-bounce">
<span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
<div className="absolute -top-2 -right-2 bg-primary-container text-white p-1 rounded-lg border-2 border-secondary">
<span className="material-symbols-outlined text-sm">trending_up</span>
</div>
</div>
<div className="mt-4 text-center">
<p className="font-label-bold text-label-bold">Cyber Defense</p>
<p className="text-[12px] text-secondary font-bold">CURRENT MISSION</p>
</div>
</div>
{/* Milestone 3 */}
<div className="relative z-10 flex flex-col items-center group opacity-50 grayscale">
<div className="w-20 h-20 bg-surface-container rounded-full border-4 border-secondary flex items-center justify-center text-secondary drop-block">
<span className="material-symbols-outlined text-3xl">public</span>
</div>
<div className="mt-4 text-center">
<p className="font-label-bold text-label-bold">Global Net</p>
<p className="text-[12px] text-secondary font-bold">LOCKED</p>
</div>
</div>
{/* Milestone 4 */}
<div className="relative z-10 flex flex-col items-center group opacity-50 grayscale">
<div className="w-20 h-20 bg-surface-container rounded-full border-4 border-secondary flex items-center justify-center text-secondary drop-block">
<span className="material-symbols-outlined text-3xl">terminal</span>
</div>
<div className="mt-4 text-center">
<p className="font-label-bold text-label-bold">Ethical Hacking</p>
<p className="text-[12px] text-secondary font-bold">LOCKED</p>
</div>
</div>
</div>
</section>
{/* Achievements & Insights */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
{/* Recent Achievements */}
<div className="flex flex-col gap-6">
<h2 className="font-headline-md text-headline-md text-on-surface">Recent Achievements</h2>
<div className="space-y-4">
<div className="bg-surface-container-lowest border-2 border-secondary p-4 rounded-2xl flex items-center gap-4 hover:translate-x-2 transition-transform cursor-default">
<div className="w-16 h-16 bg-primary-fixed rounded-xl border-2 border-secondary flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
</div>
<div className="flex-1">
<p className="font-label-bold text-label-bold">Master of Passwords</p>
<p className="text-body-md text-secondary text-sm">Perfect score on the "Brute Force" Quiz.</p>
</div>
<div className="text-right">
<span className="bg-surface-container text-secondary px-2 py-1 rounded text-[10px] font-bold border border-secondary uppercase">2 DAYS AGO</span>
</div>
</div>
<div className="bg-surface-container-lowest border-2 border-secondary p-4 rounded-2xl flex items-center gap-4 hover:translate-x-2 transition-transform cursor-default">
<div className="w-16 h-16 bg-tertiary-fixed rounded-xl border-2 border-secondary flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
</div>
<div className="flex-1">
<p className="font-label-bold text-label-bold">Squad Leader</p>
<p className="text-body-md text-secondary text-sm">Assisted 5 other recruits in the forum.</p>
</div>
<div className="text-right">
<span className="bg-surface-container text-secondary px-2 py-1 rounded text-[10px] font-bold border border-secondary uppercase">WEEKLY</span>
</div>
</div>
<div className="bg-surface-container-lowest border-2 border-secondary p-4 rounded-2xl flex items-center gap-4 hover:translate-x-2 transition-transform cursor-default">
<div className="w-16 h-16 bg-secondary-container rounded-xl border-2 border-secondary flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
</div>
<div className="flex-1">
<p className="font-label-bold text-label-bold">7-Day Streak</p>
<p className="text-body-md text-secondary text-sm">Consistent learning every day this week!</p>
</div>
<div className="text-right">
<span className="bg-surface-container text-secondary px-2 py-1 rounded text-[10px] font-bold border border-secondary uppercase">STREAK</span>
</div>
</div>
</div>
</div>
{/* Learning Trends */}
<div className="bg-surface-container-lowest border-2 border-secondary rounded-3xl p-card-padding drop-block">
<h2 className="font-headline-md text-headline-md text-on-surface mb-6">Learning Insights</h2>
<div className="space-y-6">
<div>
<div className="flex justify-between mb-2">
<p className="font-label-bold text-label-bold">Phishing Detection</p>
<p className="text-primary font-bold">Excellent</p>
</div>
<div className="h-4 w-full bg-surface-container rounded-full border-2 border-secondary overflow-hidden">
<div className="h-full bg-tertiary w-[95%]"></div>
</div>
</div>
<div>
<div className="flex justify-between mb-2">
<p className="font-label-bold text-label-bold">Data Privacy</p>
<p className="text-primary font-bold">Improving</p>
</div>
<div className="h-4 w-full bg-surface-container rounded-full border-2 border-secondary overflow-hidden">
<div className="h-full bg-primary-container w-[65%]"></div>
</div>
</div>
<div>
<div className="flex justify-between mb-2">
<p className="font-label-bold text-label-bold">Social Engineering</p>
<p className="text-secondary font-bold">Starting</p>
</div>
<div className="h-4 w-full bg-surface-container rounded-full border-2 border-secondary overflow-hidden">
<div className="h-full bg-secondary w-[30%]"></div>
</div>
</div>
</div>
<div className="mt-8 pt-8 border-t-2 border-surface-container">
<div className="flex items-start gap-4 p-4 bg-primary-fixed rounded-xl border-2 border-secondary">
<span className="material-symbols-outlined text-primary mt-1">auto_graph</span>
<div>
<p className="font-label-bold text-label-bold text-on-primary-fixed">Parent Suggestion</p>
<p className="text-body-md text-[14px] text-on-primary-fixed leading-tight">Alex is showing a natural talent for spotting Phishing attempts. You might want to ask them to "audit" a few of your own emails as a fun exercise!</p>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
{/* Mobile Navigation (Bottom Nav) */}
<nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t-2 border-secondary flex justify-around p-3 z-50">
<button className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
<span className="text-[10px] font-label-bold">Reports</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">rocket_launch</span>
<span className="text-[10px] font-label-bold">Missions</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">military_tech</span>
<span className="text-[10px] font-label-bold">Levels</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">settings</span>
<span className="text-[10px] font-label-bold">Settings</span>
</button>
</nav>


    </div>
  );
}
