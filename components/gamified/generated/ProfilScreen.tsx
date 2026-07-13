/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function ProfilScreen() {
  return (
    <div className={"bg-background text-on-background"}>

{/* TopNavBar */}
<header className="bg-surface border-b-2 border-secondary sticky top-0 z-50 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4">
<div className="font-display text-headline-md text-primary">Cyberambassadeurs</div>
<div className="flex items-center gap-6">
<nav className="hidden md:flex gap-8">
<a className="text-on-surface-variant font-bold hover:text-primary transition-colors" href="#">Tableau de bord</a>
<a className="text-primary font-bold border-b-2 border-primary" href="#">Profil</a>
<a className="text-on-surface-variant font-bold hover:text-primary transition-colors" href="#">Missions</a>
</nav>
<div className="flex gap-4 items-center">
<button className="material-symbols-outlined text-secondary hover:text-primary transition-colors">notifications</button>
<button className="material-symbols-outlined text-secondary hover:text-primary transition-colors">settings</button>
<div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden">
<img className="w-full h-full object-cover" alt="A friendly 3D cartoon student avatar with a bright smile, wearing a futuristic tech-inspired hoodie in primary red and dark gray. The character has short dark hair and is set against a clean, light blue studio background with soft cinematic lighting to emphasize the 'Cyberambassadeurs' gamified education brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ3_YfKJqJFC2XWCXcvcMK382AX0IfgC-JmVfsAyOPsriRQZiy4ZUifvcE9gIl7i9muvGVZV3RmTh0tWNOrBJxCIg_zYeK_8B1K6pjp0RVViwp-Olf6yrPiO4N1c6w2tfKuVeLRWW8w_1k4JewaWJor4G2EpVLJt5n78YgeqLXp4_WlPQsZNRPSnlCvbTA3d0pFSAvbsUU4UrT2UfBFAB60rkrIZB6EFfkhOfr79Ja1x8nCzff226-X7hdM_C2yREmVlHxfKGhpKBA"/>
</div>
</div>
</div>
</header>
<div className="flex min-h-screen">
{/* SideNavBar (Hidden on Mobile) */}
<aside className="hidden lg:flex flex-col h-screen sticky left-0 top-16 p-4 gap-4 w-64 border-r-2 border-secondary bg-surface-container-lowest shadow-[4px_0_0_0_#586062] shrink-0">
<div className="flex flex-col items-center gap-2 mb-4 p-4 bg-surface-container rounded-xl border-2 border-secondary">
<div className="w-20 h-20 rounded-full border-4 border-primary overflow-hidden shadow-lg">
<img className="w-full h-full object-cover" alt="Profile close-up of a diverse teen student character in a professional 3D animated style. The character wears a digital headset and an academy uniform with a 'Cyberambassadeurs' badge. Lighting is vibrant and clean, mirroring an upbeat educational tech platform's aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgr2j-YZZi_AjV0aOpo-u5RQgOlEW3jkI2-aWs0qjyV9sK_tzMe2OQtQkAz0pP3Kamuu0lHD99kyG-7R3wX_wMtwfPXor0nMus9FYvTSL_tNENzH0FMD3VMzarHUrymjcsX5yjuaVYKyto1lp-GE6iKcA-QmsE151ch4-lFDWyL_8wUb6hQY6RMNVH9-XQSVk93_ef7ZpdYNYe-PmQWst5Pno-_mami8GJ-ByehucYJKnde9AcPtmSHdT8ybJMIIdSIsAesuvgH-Dt"/>
</div>
<div className="text-center">
<p className="font-display text-primary text-headline-md">Recruit</p>
<p className="font-label-bold text-secondary">Level 4 • 1,200 XP</p>
</div>
</div>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold" href="#">
<span className="material-symbols-outlined">rocket_launch</span> Missions
                </a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold" href="#">
<span className="material-symbols-outlined">military_tech</span> Levels
                </a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold" href="#">
<span className="material-symbols-outlined">storefront</span> Shop
                </a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold" href="#">
<span className="material-symbols-outlined">groups</span> Squad
                </a>
<a className="flex items-center gap-3 bg-primary text-on-primary rounded-xl p-3 border-b-4 border-on-primary-fixed-variant translate-y-[2px] font-label-bold shadow-md" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span> Trophies
                </a>
</nav>
<div className="mt-auto flex flex-col gap-2 pt-4 border-t-2 border-outline-variant">
<button className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold">
<span className="material-symbols-outlined">help</span> Help
                </button>
<button className="flex items-center gap-3 text-error p-3 hover:bg-error-container rounded-xl transition-all font-label-bold">
<span className="material-symbols-outlined">logout</span> Logout
                </button>
</div>
</aside>
{/* Main Content */}
<main className="flex-grow p-4 md:p-8 lg:p-12 kinetic-bg max-w-[1200px] mx-auto">
<div className="horizon-line"></div>
{/* Hero Section */}
<section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 relative z-10">
<div className="lg:col-span-7 bg-surface-container-lowest border-2 border-secondary rounded-xl p-8 depth-card flex flex-col md:flex-row gap-8 items-center overflow-hidden">
<div className="relative">
<div className="w-48 h-48 rounded-full border-4 border-primary overflow-hidden bg-surface-container-high">
<img className="w-full h-full object-cover" alt="Full body 3D character of a teenage 'Cyber-Éclaireur' scout in a high-tech athletic stance. The character is outfitted with futuristic gear including a glowing red wrist-device and dark grey tactile armor. The setting is a clean, bright digital arena with soft blue and white volumetric lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAVhNZ3fMbH564x_rGEhT_Dht_Gt9hK1jtLgzOnN3BX9P5p1QPGxl3R46pYUcFXXXAEuLj_DcjOvlbk6MGdViXsSb3reJ4ISUCrhmcELn022Cfvr9oyzWWJsmukJkWY_zZfKRJBJ9An3i-D_CQ7IR-6C_UWjyK9KhAB_kAvvaSK0PglnI68KgWLta7o87sutb4TYrZVQb8NdiLKP9xlcKJK0GUYYAvaZ-IzON2Iv1MLNPFWxYDBrPsztltAJ_D1vbFWWrmFR92MRJp"/>
</div>
<div className="absolute -bottom-2 -right-2 bg-primary text-on-primary px-4 py-1 rounded-full border-2 border-secondary font-bold shadow-lg">
                            LVL 4
                        </div>
</div>
<div className="flex-grow text-center md:text-left">
<h1 className="font-display text-primary text-headline-lg mb-2">Cyber-Éclaireur</h1>
<p className="font-body-lg text-secondary mb-6">Expert en sécurité numérique et sensibilisation.</p>
<div className="space-y-2">
<div className="flex justify-between items-end">
<span className="font-label-bold text-on-surface-variant uppercase tracking-wider">Progression Rang</span>
<span className="font-headline-md text-primary">1,200 / 2,000 XP</span>
</div>
<div className="h-6 w-full bg-surface-container-highest border-2 border-secondary rounded-full overflow-hidden">
<div className="h-full bg-primary-container rounded-full" style={{ width: "60%" }}></div>
</div>
</div>
</div>
</div>
<div className="lg:col-span-5 bg-tertiary-container border-2 border-secondary rounded-xl p-8 depth-card text-on-tertiary-container flex flex-col justify-between">
<div>
<h3 className="font-display text-headline-md mb-2">Prochaine Étape</h3>
<p className="font-body-md opacity-90 mb-4">Termine le module "Réseaux Sociaux" pour débloquer le badge "Sentinelle Digitale".</p>
</div>
<button className="bg-surface-container-lowest text-tertiary font-bold py-4 px-6 rounded-xl border-2 border-secondary depth-button hover:bg-white transition-all w-full flex items-center justify-center gap-2">
<span className="material-symbols-outlined">play_circle</span> Continuer l'apprentissage
                    </button>
</div>
</section>
{/* Stats Grid */}
<section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 relative z-10">
<div className="bg-surface border-2 border-secondary p-6 rounded-xl depth-card text-center">
<span className="material-symbols-outlined text-primary text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
<p className="font-label-bold text-secondary uppercase">Points XP</p>
<p className="font-display text-headline-md text-on-surface">1,200</p>
</div>
<div className="bg-surface border-2 border-secondary p-6 rounded-xl depth-card text-center">
<span className="material-symbols-outlined text-primary text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>view_module</span>
<p className="font-label-bold text-secondary uppercase">Modules</p>
<p className="font-display text-headline-md text-on-surface">12 / 24</p>
</div>
<div className="bg-surface border-2 border-secondary p-6 rounded-xl depth-card text-center">
<span className="material-symbols-outlined text-primary text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
<p className="font-label-bold text-secondary uppercase">Badges</p>
<p className="font-display text-headline-md text-on-surface">8</p>
</div>
<div className="bg-surface border-2 border-secondary p-6 rounded-xl depth-card text-center">
<span className="material-symbols-outlined text-primary text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
<p className="font-label-bold text-secondary uppercase">Série</p>
<p className="font-display text-headline-md text-on-surface">5 Jours</p>
</div>
</section>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
{/* Competency Radar */}
<div className="lg:col-span-5 bg-surface border-2 border-secondary rounded-xl p-8 depth-card overflow-hidden">
<h3 className="font-display text-headline-md text-primary mb-6">Radar de Compétences</h3>
<div className="radar-chart-container relative aspect-square w-full flex items-center justify-center">
{/* Custom SVG Radar Chart */}
<svg className="w-full h-full drop-shadow-md" viewBox="0 0 200 200">
<polygon fill="none" points="100,20 180,70 150,160 50,160 20,70" stroke="#586062" strokeDasharray="4" strokeWidth="2"></polygon>
<polygon fill="none" points="100,50 150,85 130,140 70,140 50,85" stroke="#586062" strokeDasharray="2" strokeWidth="1"></polygon>
{/* Active Stats Shape */}
<polygon fill="rgba(186, 0, 52, 0.2)" points="100,30 160,80 140,150 80,140 40,90" stroke="#ba0034" strokeWidth="3"></polygon>
{/* Labels */}
<text fill="#586062" font-family="Montserrat" font-size="8" font-weight="700" text-anchor="middle" x="100" y="15">SÉCURITÉ</text>
<text fill="#586062" font-family="Montserrat" font-size="8" font-weight="700" text-anchor="start" x="185" y="75">ÉTHIQUE</text>
<text fill="#586062" font-family="Montserrat" font-size="8" font-weight="700" text-anchor="middle" x="155" y="175">COMMUNICATION</text>
<text fill="#586062" font-family="Montserrat" font-size="8" font-weight="700" text-anchor="middle" x="45" y="175">TECHNIQUE</text>
<text fill="#586062" font-family="Montserrat" font-size="8" font-weight="700" text-anchor="end" x="15" y="75">DROIT</text>
</svg>
</div>
</div>
{/* Digital Backpack */}
<div className="lg:col-span-7 space-y-8">
<div className="bg-surface border-2 border-secondary rounded-xl p-8 depth-card">
<div className="flex justify-between items-center mb-6">
<h3 className="font-display text-headline-md text-primary">Sac à Dos Numérique</h3>
<span className="material-symbols-outlined text-secondary text-3xl">backpack</span>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
{/* Badges */}
<div className="flex flex-col items-center p-4 bg-surface-container-low border-2 border-secondary rounded-xl hover:scale-105 transition-transform cursor-pointer group">
<div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center bg-white mb-2 group-hover:bg-primary-fixed transition-colors">
<span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
</div>
<span className="font-label-bold text-center text-on-surface-variant">Protecteur Junior</span>
</div>
<div className="flex flex-col items-center p-4 bg-surface-container-low border-2 border-secondary rounded-xl hover:scale-105 transition-transform cursor-pointer group">
<div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center bg-white mb-2 group-hover:bg-tertiary-fixed transition-colors">
<span className="material-symbols-outlined text-3xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>vpn_key</span>
</div>
<span className="font-label-bold text-center text-on-surface-variant">Maître des Mots</span>
</div>
<div className="flex flex-col items-center p-4 bg-surface-container-low border-2 border-secondary rounded-xl hover:scale-105 transition-transform cursor-pointer group">
<div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center bg-white mb-2 group-hover:bg-secondary-fixed transition-colors">
<span className="material-symbols-outlined text-3xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>phishing</span>
</div>
<span className="font-label-bold text-center text-on-surface-variant">Anti-Phishing</span>
</div>
</div>
</div>
<div className="bg-surface border-2 border-secondary rounded-xl p-8 depth-card">
<h3 className="font-display text-headline-md text-primary mb-6">Certificats Validés</h3>
<div className="space-y-4">
<div className="flex items-center gap-4 p-4 border-2 border-outline-variant rounded-xl bg-surface-container-lowest">
<div className="p-3 bg-primary-container text-on-primary rounded-lg border-2 border-secondary">
<span className="material-symbols-outlined">verified</span>
</div>
<div className="flex-grow">
<p className="font-headline-md text-[16px] leading-tight">Certificat de Sensibilisation Cyber</p>
<p className="font-body-md text-secondary text-sm">Délivré le 12 Octobre 2023</p>
</div>
<button className="material-symbols-outlined text-secondary hover:text-primary transition-colors">download</button>
</div>
<div className="flex items-center gap-4 p-4 border-2 border-outline-variant rounded-xl bg-surface-container-lowest opacity-50 grayscale">
<div className="p-3 bg-secondary-container text-on-secondary-container rounded-lg border-2 border-secondary">
<span className="material-symbols-outlined">lock</span>
</div>
<div className="flex-grow">
<p className="font-headline-md text-[16px] leading-tight">Ambassadeur du Web Ethique</p>
<p className="font-body-md text-secondary text-sm">En cours (85%)</p>
</div>
<button className="material-symbols-outlined text-secondary" disabled>lock</button>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
{/* BottomNavBar (Mobile Only) */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-secondary flex justify-around py-3 px-4 z-50">
<a className="flex flex-col items-center gap-1 text-secondary" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-[10px] font-bold">Bord</span>
</a>
<a className="flex flex-col items-center gap-1 text-primary" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
<span className="text-[10px] font-bold">Profil</span>
</a>
<div className="relative -top-8">
<button className="bg-primary text-on-primary w-14 h-14 rounded-full border-2 border-secondary depth-button flex items-center justify-center">
<span className="material-symbols-outlined text-3xl">rocket_launch</span>
</button>
</div>
<a className="flex flex-col items-center gap-1 text-secondary" href="#">
<span className="material-symbols-outlined">military_tech</span>
<span className="text-[10px] font-bold">Rangs</span>
</a>
<a className="flex flex-col items-center gap-1 text-secondary" href="#">
<span className="material-symbols-outlined">storefront</span>
<span className="text-[10px] font-bold">Boutique</span>
</a>
</nav>


    </div>
  );
}
