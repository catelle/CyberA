/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function ClassementScreen() {
  return (
    <div className={"font-body-md text-body-md overflow-x-hidden"}>

{/* SideNavBar */}
<aside className="fixed left-0 top-0 h-full p-4 flex flex-col bg-surface-container dark:bg-inverse-surface w-64 border-r-2 border-secondary shadow-[4px_0_0_0_rgba(88,96,98,1)] hidden md:flex z-50">
<div className="font-display text-headline-md font-black text-primary dark:text-primary-fixed-dim mb-8">
            Cyberambassadeurs
        </div>
<div className="flex items-center gap-3 mb-8 p-3 bg-surface-container-high rounded-xl border-2 border-secondary">
<div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
<img className="w-full h-full object-cover" alt="A 3D character avatar of a young digital security scout wearing a purple beanie and a tech-styled jacket, smiling warmly against a clean white background. The style is soft, rounded, and expressive, similar to modern 3D educational game characters." src="https://lh3.googleusercontent.com/aida-public/AB6AXuChxi1sbQqXGCoizdUOoWMtnFcwI4cknGfUTwF4bbPfe9381jfowXlkaj5PTagS8r3aaBhoTENMR1uqTltMP3L-I14BX0OBwYbrn8tXxmxXgfGnQfseFGA_N0oUs0KtWbJ8TyySNGKO_YHc6BdBS_0YVq6HLkQws1UHvKDZWEt6sV2hcSudgnNxuVnAW-vfTViOHaGiTEnvHL1pib6ksYlMn9X5CnNRyXWgVYPhbPsz_lfFru9883qqC5UBHnUMQWKvRRRM57OLjWjt"/>
</div>
<div>
<p className="font-bold text-sm">Éclaireur de Niveau 12</p>
<div className="w-full bg-secondary-container h-2 rounded-full mt-1 overflow-hidden">
<div className="bg-primary w-3/4 h-full"></div>
</div>
</div>
</div>
<nav className="flex flex-col gap-2 flex-grow">
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">rocket_launch</span>
<span>Missions</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">science</span>
<span>Labo</span>
</a>
<a className="flex items-center gap-4 bg-primary-container text-on-primary-container border-2 border-secondary rounded-xl px-4 py-3 shadow-[0_4px_0_0_rgba(88,96,98,1)]" href="#">
<span className="material-symbols-outlined">emoji_events</span>
<span>Classement</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">inventory_2</span>
<span>Inventaire</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">family_restroom</span>
<span>Parents</span>
</a>
</nav>
<button className="mt-4 bg-primary text-white font-bold py-3 px-4 rounded-xl border-b-4 border-secondary hover:translate-y-[1px] active:translate-y-[4px] active:border-b-0 transition-all">
            Nouvelle Mission
        </button>
<div className="mt-auto border-t-2 border-secondary pt-4 flex flex-col gap-2">
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all" href="#">
<span className="material-symbols-outlined">settings</span>
<span>Réglages</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all" href="#">
<span className="material-symbols-outlined">logout</span>
<span>Déconnexion</span>
</a>
</div>
</aside>
{/* TopAppBar (Mobile & Web) */}
<header className="fixed top-0 left-0 md:left-64 right-0 z-40 bg-surface dark:bg-inverse-surface border-b-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)]">
<div className="flex justify-between items-center w-full px-6 py-4 max-w-[1200px] mx-auto">
<div className="md:hidden font-display text-headline-md font-black text-primary">Cyber</div>
<div className="hidden md:block">
<h1 className="font-display text-headline-md font-black text-on-surface">Ligue Diamant</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden sm:flex items-center gap-2 bg-tertiary-container text-white px-4 py-1.5 rounded-full border-2 border-secondary card-shadow">
<span className="material-symbols-outlined text-sm">military_tech</span>
<span className="font-bold text-sm">Cyber-Éclaireur</span>
</div>
<div className="flex items-center gap-2">
<button className="p-2 text-secondary hover:bg-surface-container-high rounded-full transition-all">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="p-2 text-secondary hover:bg-surface-container-high rounded-full transition-all">
<span className="material-symbols-outlined">monetization_on</span>
</button>
</div>
</div>
</div>
</header>
{/* Main Content */}
<main className="md:ml-64 pt-24 pb-12 px-6">
<div className="max-w-[1000px] mx-auto">
{/* League Header Card */}
<div className="diamond-gradient p-8 rounded-3xl border-2 border-secondary podium-shadow mb-12 relative overflow-hidden">
<div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
<div className="text-center md:text-left">
<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest mb-4">
<span className="material-symbols-outlined text-sm">diamond</span> Saison 4 en cours
                        </div>
<h2 className="font-display text-headline-lg text-white mb-2">Ligue Diamant</h2>
<p className="text-white/80 max-w-md">Seuls les 5% meilleurs Cyberambassadeurs accèdent à ce niveau d'élite. Continuez à protéger le réseau pour rester au sommet !</p>
</div>
<div className="flex items-center gap-6">
<div className="text-center">
<p className="text-white/60 text-xs font-bold uppercase mb-1">Temps restant</p>
<p className="text-white font-black text-2xl">4j 12h</p>
</div>
<div className="h-12 w-[2px] bg-white/20"></div>
<div className="text-center">
<p className="text-white/60 text-xs font-bold uppercase mb-1">Votre Rang</p>
<p className="text-white font-black text-2xl">#12</p>
</div>
</div>
</div>
{/* Abstract Background Decoration */}
<div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12">
<span className="material-symbols-outlined text-[200px] text-white">shield</span>
</div>
</div>
{/* Podium Section */}
<div className="grid grid-cols-1 md:grid-cols-3 items-end gap-4 mb-16 px-4">
{/* 2nd Place */}
<div className="order-2 md:order-1 flex flex-col items-center">
<div className="relative mb-4">
<div className="w-28 h-28 rounded-full border-4 border-slate-300 bg-white overflow-hidden podium-shadow animate-float" style={{ animationDelay: "0.5s" }}>
<img className="w-full h-full object-cover" alt="A friendly 3D character of a teenage girl with braided dark hair, wearing a light blue hoodie, holding a digital tablet. Soft, tactile, 3D clay-like animation style, bright studio lighting, neutral background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmkpwADExkPQTOoOXJ7POXb9ZvGrht0OFR_mkMD8FBsTUyfRwoeGYkbXT6WlfGD2njA4Hy4o0giEXIOJVss6uiTszNylLLOPCiZsm1_9ZJNsPoNIik99VGXxunNbeNld3YUjLISnsacmGvyIBL9xACmeoTr8VgVXVCLZ-IOdGY7TDHxbPUsamgwHZePKhwgwp-EE7JnQG_G6O1VmJ3V9KXF6-ePWZVShCsSn2_g2KhsDoqY7v-kAsFK2PMtr3TjSAj-I9Do0T4vngy"/>
</div>
<div className="absolute -bottom-2 -right-2 bg-slate-300 w-10 h-10 rounded-full flex items-center justify-center border-2 border-secondary font-black text-lg">2</div>
</div>
<div className="w-full bg-slate-200 border-x-2 border-t-2 border-secondary h-32 rounded-t-2xl flex flex-col items-center justify-center p-4">
<span className="font-bold text-on-surface">Alice_Secur</span>
<span className="text-sm font-black text-secondary">2,850 pts</span>
</div>
</div>
{/* 1st Place */}
<div className="order-1 md:order-2 flex flex-col items-center">
<div className="relative mb-6">
<div className="w-40 h-40 rounded-full border-4 border-yellow-400 bg-white overflow-hidden shadow-[0_12px_0_0_rgba(234,179,8,0.3)] animate-float">
<img className="w-full h-full object-cover" alt="A distinguished 3D elderly woman character with silver hair in a neat bun, wearing a stylish purple jacket and green trousers, interacting with a floating holographic screen. Modern 3D illustrative style, expressive and warm, high quality digital render." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFnXcnEnIaReXeEcjhLK-jkvVm5ph8JXOPkMXN59V4NqYzAXtEeU9Zq1jzXG_nWZG65laBMA0nqTnytQ4VlFZO5GhFslZMaIVcZjvYlDil3JwLF9TfWIHtRRa8_LNbMOTaANsf3JpgJP0llmJwtOiQqnY0zMldrX50hYrpt4dkkBNblX3j8tMmplT9eGXivP_SydXd1Kbob0o0BNGgOvR9AAgD6EGlAXOtMIKYjYLn-zJSRF6_-PW7cows0EfajEf-aFKHkMHxkw-n"/>
</div>
<div className="absolute -top-4 left-1/2 -translate-x-1/2">
<span className="material-symbols-outlined text-yellow-500 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
</div>
<div className="absolute -bottom-2 -right-2 bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center border-2 border-secondary font-black text-2xl">1</div>
</div>
<div className="w-full bg-white border-x-2 border-t-2 border-secondary h-48 rounded-t-3xl flex flex-col items-center justify-center p-4 shadow-[0_-8px_20px_-10px_rgba(234,179,8,0.5)]">
<span className="font-black text-headline-md text-on-surface">Marc_Expert</span>
<span className="text-lg font-black text-primary">3,120 pts</span>
<div className="mt-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold border border-yellow-300">LEADER ACTUEL</div>
</div>
</div>
{/* 3rd Place */}
<div className="order-3 md:order-3 flex flex-col items-center">
<div className="relative mb-4">
<div className="w-24 h-24 rounded-full border-4 border-orange-400 bg-white overflow-hidden podium-shadow animate-float" style={{ animationDelay: "1s" }}>
<img className="w-full h-full object-cover" alt="A 3D character of a young man with a beard, wearing a blue polo shirt and yellow pants, holding a digital stylus. Soft-textured 3D render with clean edges and vibrant colors, friendly expression, set against a simple white backdrop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCskIkKBCoAriPIzd6zw8FbsINFiuWFE-cWv5an0qD9etClK-KO37vFPt4QPiT96Ur5U2GK72XUiwrOjk13zmV_hk1n4Mu70KUzqPbCAbY-GL6E86Oo2beDnsEUKFFWPq7s2d9K71A-MV0xsq3pLifIGZqW5x9u7xGjFCFmM7bPiSZyFM-GVrTfbQ4l3IxCYc3ygQm5auLFVnzyqDcQ4HTAQvgW2CGVQruSnweiWrq2TOD8NnKLKWcvH9FmwXmL0I891sk8nyeIHixo"/>
</div>
<div className="absolute -bottom-2 -right-2 bg-orange-400 w-9 h-9 rounded-full flex items-center justify-center border-2 border-secondary font-black text-lg">3</div>
</div>
<div className="w-full bg-orange-100 border-x-2 border-t-2 border-secondary h-24 rounded-t-xl flex flex-col items-center justify-center p-4">
<span className="font-bold text-on-surface">Thomas_Dev</span>
<span className="text-sm font-black text-secondary">2,640 pts</span>
</div>
</div>
</div>
{/* Leaderboard List */}
<div className="space-y-4 mb-20">
<h3 className="font-display text-headline-md text-secondary mb-6 flex items-center gap-3">
<span className="material-symbols-outlined">format_list_numbered</span> Le reste de la ligue
                </h3>
{/* List Item 4 */}
<div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-secondary card-shadow hover:translate-y-[-2px] transition-all">
<div className="w-10 font-black text-xl text-secondary text-center">4</div>
<div className="w-12 h-12 rounded-full border-2 border-secondary overflow-hidden bg-surface">
<img className="w-full h-full object-cover" alt="A 3D character headshot of a student with glasses, smiling confidently, digital illustration style, bright and colorful." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa5WGzx_5mh2v5XOqNsy4cJke9xyjb2YCDAWYjG4hn8fW0a1G3InVOLCCGhgXs0tUvWCL0HZpDpI-RH85CP2yUb4ibd8HwATvUzAV1zrlQ-wfAF-Ulg1R1e39ooi6hP3BlQ4qxfGY531Hv6wkF1gTy5EdEpONshwvRj_No3rcSqt5fU4_dB-U6NgFmUB5rECLhEhsHpvWJSDdjKUdM6fFqRM54plulQUOQnsn3ZQZZNj5IMRleGa-M9yOdNeaZRcoxDzL1HqTA_rK9"/>
</div>
<div className="flex-grow">
<p className="font-bold text-on-surface">Sophie_Code</p>
<p className="text-xs font-bold text-secondary-fixed-dim uppercase">Niveau 15</p>
</div>
<div className="text-right">
<p className="font-black text-lg">2,410</p>
<p className="text-[10px] font-bold text-secondary">POINTS</p>
</div>
</div>
{/* List Item 5 */}
<div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-secondary card-shadow hover:translate-y-[-2px] transition-all">
<div className="w-10 font-black text-xl text-secondary text-center">5</div>
<div className="w-12 h-12 rounded-full border-2 border-secondary overflow-hidden bg-surface">
<img className="w-full h-full object-cover" alt="A 3D character avatar of a young student with a yellow hoodie, friendly and optimistic expression, stylized digital art." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHqYWPoDDZID3se3vj91dzWdR7Vk8LGG2OsvJ8NobMxOySrDBfFbaiiHlzPLSgFs7x-s3XtGHllhRqt5WnAcD4bbCg_Y1-2oGfXd_u2aHJrsRJLdjr3F4rH022_ot50yNszHs8nCg3ROtFAwcOl_eA6hM4GX70ZkBIG4zMTXLvneAzi-67kOK4MirX9C3ScGOXmBf3klNk7RamY0A1VgXW-kmoE8pp8usb3Dyel4wTwISzFIu-YdT2xeXHZK7pdfCGyx0PsdD3losI"/>
</div>
<div className="flex-grow">
<p className="font-bold text-on-surface">Lucas_Cyber</p>
<p className="text-xs font-bold text-secondary-fixed-dim uppercase">Niveau 14</p>
</div>
<div className="text-right">
<p className="font-black text-lg">2,380</p>
<p className="text-[10px] font-bold text-secondary">POINTS</p>
</div>
</div>
{/* HIGHLIGHTED ITEM: Jean-Claude */}
<div className="flex items-center gap-4 bg-primary-container text-white p-5 rounded-2xl border-2 border-secondary shadow-[0_6px_0_0_rgba(88,96,98,1)] transform scale-[1.02] relative z-10">
<div className="w-10 font-black text-2xl text-white text-center">12</div>
<div className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-white/20">
<img className="w-full h-full object-cover" alt="A 3D character avatar of a young digital security scout wearing a purple beanie, looking determined and happy. High detail 3D render with tactile textures." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC__lEjcFiNSu266ILcrN6BgJ_Fs6jCktDjyM3Z7B5_7Qbyt6u9DlYnxie-I_XmLEJg6K9TjaM87H4E6241u6rLmPgSvUzBivy8jX_UWg1eoRGW7p71vsbkgm0MnmwaFTaBPDOTJ9rjyJN-KMbn0yC-rEL_cdJCXBz0twz8SW5sztH6PbER4qStXxgmozlgqEWhXhdPSqH51U6INNma6ljfeTs1_jHRmYEkiSsMoN2luBiEECRwS9u5mZJih_IJ0qKslxK5nuzckdaN"/>
</div>
<div className="flex-grow">
<div className="flex items-center gap-2">
<p className="font-black text-xl">Jean-Claude</p>
<span className="bg-white text-primary text-[10px] font-black px-2 py-0.5 rounded-full">VOUS</span>
</div>
<p className="text-sm font-bold text-white/80 uppercase">Éclaireur de Niveau 12</p>
</div>
<div className="text-right">
<p className="font-black text-2xl">1,950</p>
<p className="text-[10px] font-bold text-white/70">POINTS</p>
</div>
{/* Indicator for movement */}
<div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white text-green-600 rounded-full p-1 border-2 border-secondary flex flex-col items-center">
<span className="material-symbols-outlined text-xs font-black">arrow_upward</span>
<span className="text-[8px] font-black">+2</span>
</div>
</div>
{/* List Item 13 */}
<div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-secondary card-shadow hover:translate-y-[-2px] transition-all opacity-80">
<div className="w-10 font-black text-xl text-secondary text-center">13</div>
<div className="w-12 h-12 rounded-full border-2 border-secondary overflow-hidden bg-surface">
<img className="w-full h-full object-cover" alt="A 3D character headshot of a student with curly hair, smiling, warm lighting, digital art style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8x_tLkodHKdHeWGqFmSIiMaXHSYQRJO10RtBR_epWGSUFsNLprMEIUXSczdTkcAOBKoPZWSSZ3uPpNfJJlfvCNnFA1bmoDODkNj4qS1-MoLTcrO313S9zUCrv3V8PTtj3XE9S98pSfZr5SzH5lmVPGUnX3SnMo0uC_65LlEn-f9qq6pBGQMVfFPh7z7JrC1TzP3nhwCCUAy0Ke-q-sezHmRiuap6J0u9wZg-ObA6j48lmBCjnGzlSfk-SHbjR4m4PIPg0M1ues9Lt"/>
</div>
<div className="flex-grow">
<p className="font-bold text-on-surface">Ines_Guard</p>
<p className="text-xs font-bold text-secondary-fixed-dim uppercase">Niveau 11</p>
</div>
<div className="text-right">
<p className="font-black text-lg">1,890</p>
<p className="text-[10px] font-bold text-secondary">POINTS</p>
</div>
</div>
</div>
{/* Navigation Footer (Mobile) */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-secondary shadow-[0_-4px_0_0_rgba(88,96,98,1)] flex justify-around items-center py-3 z-50">
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">rocket_launch</span>
<span className="text-[10px] font-bold uppercase">Missions</span>
</button>
<button className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
<span className="text-[10px] font-black uppercase">Classement</span>
</button>
<div className="relative -top-6">
<button className="bg-primary text-white w-14 h-14 rounded-full border-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)] active:translate-y-[2px] active:shadow-none flex items-center justify-center">
<span className="material-symbols-outlined text-3xl">add</span>
</button>
</div>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">inventory_2</span>
<span className="text-[10px] font-bold uppercase">Inventaire</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">settings</span>
<span className="text-[10px] font-bold uppercase">Moi</span>
</button>
</nav>
</div>
</main>
{/* Global Footer */}
<footer className="md:ml-64 bg-surface-container-lowest border-t-2 border-secondary">
<div className="w-full max-w-[1200px] mx-auto px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
<div className="text-center md:text-left">
<div className="font-display text-headline-md font-black text-primary mb-2">Cyberambassadeurs</div>
<p className="font-label-bold text-secondary text-sm">© 2024 Cyberambassadeurs - Mission de Sécurité Numérique</p>
</div>
<div className="flex flex-wrap justify-center gap-6">
<a className="font-label-bold text-secondary hover:text-primary hover:underline transition-all" href="#">Mentions Légales</a>
<a className="font-label-bold text-secondary hover:text-primary hover:underline transition-all" href="#">Charte de Sécurité</a>
<a className="font-label-bold text-secondary hover:text-primary hover:underline transition-all" href="#">Aide</a>
<a className="font-label-bold text-secondary hover:text-primary hover:underline transition-all" href="#">Contact</a>
</div>
</div>
</footer>


    </div>
  );
}
