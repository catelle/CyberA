/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function AdminScreen() {
  return (
    <div className={"bg-background text-on-surface font-body-md min-h-screen"}>

{/* SideNavBar (Authority: JSON & Style Guidance) */}
<nav className="fixed left-0 top-0 h-full p-4 flex flex-col bg-surface-container dark:bg-inverse-surface h-screen w-64 border-r-2 border-secondary shadow-[4px_0_0_0_rgba(88,96,98,1)] z-50">
<div className="font-display text-headline-md font-black text-primary dark:text-primary-fixed-dim mb-8">
            Cyberambassadeurs
        </div>
<div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-surface-container-high">
<div className="w-12 h-12 rounded-full border-2 border-secondary overflow-hidden bg-white">
<img className="w-full h-full object-cover" alt="A friendly 3D character avatar of an elderly wise woman with grey hair and a professional blue jacket, rendered in a smooth clay-like digital art style typical of modern educational apps. High saturation, bright lighting, light blue background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUgTPgSDdAMog_23i-J4TZv5kUvWqgPWVQGbPzcGPKnWXHEPnFct4bV53woEeo21G8bqZPyp88LwdUVpQZXSu72Z_1zfS8CyIAN3xg0WQbq6cnVtqjpkUZvcs7N8OIFQBje14xf1ZGI5CqnLYf3Y7iCqXm10FfL8DS4r96naMyu8ROR8qJpxNeOA2OXZFNBX4V9HhthB9dQn8d9GtVf4jZonM5KJznkLruM-QB8UPQaLllI5sHInNTtRIcuVCQj0kE2ubwXJiEAKIA"/>
</div>
<div>
<p className="font-label-bold text-primary text-xs uppercase tracking-wider">Commandant</p>
<p className="font-bold text-on-surface text-sm">Éclaireur Niv. 12</p>
</div>
</div>
<div className="flex flex-col gap-2 flex-grow">
{/* Missions - ACTIVE */}
<a className="flex items-center gap-4 bg-primary-container text-on-primary-container border-2 border-secondary rounded-xl px-4 py-3 shadow-[0_4px_0_0_rgba(88,96,98,1)] active:translate-y-[2px] active:shadow-none transition-all duration-75" href="#">
<span className="material-symbols-outlined" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
<span className="font-body-lg">Missions</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">science</span>
<span className="font-body-lg">Labo</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">emoji_events</span>
<span className="font-body-lg">Classement</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">inventory_2</span>
<span className="font-body-lg">Inventaire</span>
</a>
<a className="flex items-center gap-4 text-secondary dark:text-secondary-fixed-dim px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">family_restroom</span>
<span className="font-body-lg">Parents</span>
</a>
</div>
<button className="tactile-button bg-primary text-white font-bold py-3 px-4 rounded-xl mb-6 flex items-center justify-center gap-2">
<span className="material-symbols-outlined">add_circle</span>
            Nouvelle Mission
        </button>
<div className="flex flex-col gap-1 border-t-2 border-secondary pt-4">
<a className="flex items-center gap-4 text-secondary px-4 py-2 hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-sm font-bold">Réglages</span>
</a>
<a className="flex items-center gap-4 text-secondary px-4 py-2 hover:text-error transition-colors" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="text-sm font-bold">Déconnexion</span>
</a>
</div>
</nav>
{/* TopAppBar Content Spacer */}
<header className="fixed top-0 right-0 left-64 bg-surface z-40 border-b-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)]">
<div className="flex justify-between items-center px-8 py-4">
<div className="flex items-center gap-4">
<h1 className="font-display text-headline-md font-black text-primary">Tableau de Commandement</h1>
<div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold border border-secondary uppercase">Secteur Alpha-9</div>
</div>
<div className="flex items-center gap-6">
<div className="flex items-center gap-4 text-secondary">
<button className="material-symbols-outlined p-2 hover:bg-surface-container-high rounded-full transition-all">notifications</button>
<button className="material-symbols-outlined p-2 hover:bg-surface-container-high rounded-full transition-all">military_tech</button>
<div className="flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1 rounded-full border-2 border-secondary font-bold">
<span className="material-symbols-outlined text-sm">monetization_on</span>
<span>4,850</span>
</div>
</div>
<button className="tactile-button bg-surface text-primary border-2 border-primary font-bold px-6 py-2 rounded-xl">
                    Cyber-Éclaireur
                </button>
</div>
</div>
</header>
{/* Main Content Canvas */}
<main className="ml-64 pt-24 pb-12 px-12">
<div className="max-w-[1200px] mx-auto">
{/* Hero Stats Row (Bento Style) */}
<div className="grid grid-cols-12 gap-6 mb-12">
{/* Main KPI Card */}
<div className="col-span-12 lg:col-span-4 tactile-card p-6 flex flex-col justify-between">
<div>
<div className="flex justify-between items-start mb-4">
<span className="bg-primary-container/20 text-primary p-3 rounded-2xl border-2 border-primary">
<span className="material-symbols-outlined text-3xl">verified_user</span>
</span>
<span className="text-primary font-bold flex items-center gap-1">
<span className="material-symbols-outlined">trending_up</span> +12%
                            </span>
</div>
<h3 className="font-bold text-secondary text-sm uppercase tracking-widest mb-1">Ambassadeurs Actifs</h3>
<p className="font-display text-display text-primary leading-none">1,284</p>
</div>
<div className="mt-6 pt-4 border-t border-surface-variant flex items-center gap-4">
<div className="flex -space-x-3">
<div className="w-8 h-8 rounded-full border-2 border-white bg-secondary-fixed"></div>
<div className="w-8 h-8 rounded-full border-2 border-white bg-tertiary-fixed"></div>
<div className="w-8 h-8 rounded-full border-2 border-white bg-primary-fixed"></div>
</div>
<span className="text-xs font-bold text-secondary">+42 nouveaux ce matin</span>
</div>
</div>
{/* Mission Success Rate */}
<div className="col-span-12 lg:col-span-5 tactile-card p-6 bg-surface-container-low">
<div className="flex justify-between items-center mb-6">
<h3 className="font-headline-md text-on-surface">Taux de Succès Mission</h3>
<span className="material-symbols-outlined text-secondary">info</span>
</div>
<div className="relative h-48 w-full flex items-end justify-between gap-4 px-4">
{/* Custom CSS Charts */}
<div className="flex-1 bg-tertiary/20 rounded-t-xl border-x-2 border-t-2 border-secondary relative group cursor-pointer" style={{ height: "60%" }}>
<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-secondary text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">Lun: 60%</div>
</div>
<div className="flex-1 bg-tertiary/40 rounded-t-xl border-x-2 border-t-2 border-secondary relative group cursor-pointer" style={{ height: "75%" }}>
<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-secondary text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">Mar: 75%</div>
</div>
<div className="flex-1 bg-primary rounded-t-xl border-x-2 border-t-2 border-secondary relative group cursor-pointer shadow-[4px_0_0_0_rgba(88,96,98,0.2)]" style={{ height: "92%" }}>
<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-primary text-white text-[10px] px-2 py-1 rounded font-bold">Mer: 92%</div>
</div>
<div className="flex-1 bg-tertiary/60 rounded-t-xl border-x-2 border-t-2 border-secondary relative group cursor-pointer" style={{ height: "65%" }}></div>
<div className="flex-1 bg-tertiary/30 rounded-t-xl border-x-2 border-t-2 border-secondary relative group cursor-pointer" style={{ height: "80%" }}></div>
</div>
<div className="flex justify-between mt-4 text-[10px] font-black text-secondary px-4 uppercase">
<span>Lun</span><span>Mar</span><span className="text-primary">Mer</span><span>Jeu</span><span>Ven</span>
</div>
</div>
{/* Quick Action Card */}
<div className="col-span-12 lg:col-span-3 tactile-card p-6 bg-primary-container text-white overflow-hidden relative">
<div className="relative z-10">
<h3 className="font-headline-md mb-2">Alerte IA</h3>
<p className="text-sm font-medium opacity-90 mb-6">3 nouvelles tentatives de phishing détectées dans le réseau scolaire.</p>
<button className="tactile-button bg-white text-primary px-4 py-2 rounded-xl font-black text-sm w-full">DÉPLOYER CONTRE-MESURE</button>
</div>
<span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[120px] opacity-10 rotate-12">security</span>
</div>
</div>
{/* Main Dashboard Area */}
<div className="grid grid-cols-12 gap-8">
{/* Left Column: Active Missions */}
<div className="col-span-12 lg:col-span-8 space-y-8">
<div className="flex justify-between items-end">
<div>
<h2 className="font-headline-lg text-on-surface">Missions en cours</h2>
<p className="text-secondary font-medium">Supervision temps réel des unités tactiques</p>
</div>
<button className="text-primary font-bold flex items-center gap-2 hover:underline">
                            Voir tout <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
{/* Mission Card 1 */}
<div className="tactile-card p-6 group hover:-translate-y-1 transition-transform">
<div className="flex gap-6">
<div className="w-24 h-24 rounded-2xl border-2 border-secondary bg-surface-container-high flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-4xl text-tertiary">shield_lock</span>
</div>
<div className="flex-grow">
<div className="flex justify-between items-start mb-2">
<h4 className="font-bold text-headline-md">Opération "Mdp-Fort-24"</h4>
<span className="bg-tertiary-container text-white px-3 py-1 rounded-lg text-xs font-black uppercase">Priorité Haute</span>
</div>
<p className="text-secondary text-sm mb-4">Campagne de sensibilisation à l'authentification forte pour les 15-18 ans.</p>
<div className="flex items-center gap-4">
<div className="flex-grow chunky-progress">
<div className="h-full bg-primary" style={{ width: "72%" }}></div>
</div>
<span className="font-black text-primary">72%</span>
</div>
</div>
</div>
<div className="mt-6 flex justify-between items-center pt-4 border-t-2 border-dashed border-surface-variant">
<div className="flex items-center gap-3">
<div className="flex -space-x-2">
<img className="w-8 h-8 rounded-full border-2 border-secondary bg-white" alt="3D avatar head of a teenage boy with a purple beanie and a tech jacket." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAeCuwvyfGaTJTmQ7lEp1k_37hOap9azUhij1cHqcyKO8h2s3RtSr00tm5TGwZKk4arV8P8XKw0fk9cMxKZLkXwCoB43zTwXZ_2cQb797uiK6aR4xzM1mVo4fFcLiOdc7LlOHkXUQxp3tSXWrdS48eeZ05r7rqUGwV6DVVbxr7qP3ezw8WjwX_ddksKzVrPCTj5rZonZpNGZjGfGrgReaTbJ1rHTiow-k_mjp4oni57Feop-Pza01oQYxa6RygiA76-v_laNaUaF28"/>
<img className="w-8 h-8 rounded-full border-2 border-secondary bg-white" alt="3D avatar head of a young girl with braided hair and a light blue hoodie." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-leRLcIa4puy4GpUJtxyq_M6bnCwPrr0Vkgmzsj8YwSldT1tlJ4vfW61xjmE8FVK1TUXu4LrEKD0FCH6IlOyiCgQzSdXFU40wDhIJivohustS5iNZHmw9sSCYBzUGE-LaYIeFMVFhMo9mnAxQM0FjsJhN2BvIrjWKYxVtLv7GXOav_VthvpudU0V9Pu2ATSgO9COzKznlSPcPwCjKs3_OGPRYcQsver9Y38722PskHpS6lKbucyaGIx5TqCAW--r7q6NmDxJ6Jpk9"/>
</div>
<span className="text-xs font-bold text-secondary">Équipe Alpha & 12 autres</span>
</div>
<div className="flex gap-2">
<button className="p-2 border-2 border-secondary rounded-lg hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined">chat</span>
</button>
<button className="tactile-button bg-surface-container-highest px-4 py-1 rounded-lg text-xs font-bold">RAPPORT DÉTAILLÉ</button>
</div>
</div>
</div>
{/* Mission Card 2 */}
<div className="tactile-card p-6 group hover:-translate-y-1 transition-transform">
<div className="flex gap-6">
<div className="w-24 h-24 rounded-2xl border-2 border-secondary bg-surface-container-high flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-4xl text-primary">fingerprint</span>
</div>
<div className="flex-grow">
<div className="flex justify-between items-start mb-2">
<h4 className="font-bold text-headline-md">Protection Identité Numérique</h4>
<span className="bg-secondary text-white px-3 py-1 rounded-lg text-xs font-black uppercase">Standard</span>
</div>
<p className="text-secondary text-sm mb-4">Module interactif sur les traces numériques et la vie privée.</p>
<div className="flex items-center gap-4">
<div className="flex-grow chunky-progress">
<div className="h-full bg-tertiary" style={{ width: "45%" }}></div>
</div>
<span className="font-black text-tertiary">45%</span>
</div>
</div>
</div>
</div>
</div>
{/* Right Column: Ranking & Recent */}
<div className="col-span-12 lg:col-span-4 space-y-8">
<div>
<h2 className="font-headline-md text-on-surface mb-6">Meilleures Escouades</h2>
<div className="tactile-card overflow-hidden">
<div className="divide-y-2 divide-secondary">
<div className="p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors">
<span className="font-display text-headline-md text-secondary/30 italic">01</span>
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-tertiary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary">diamond</span>
</div>
<div className="flex-grow">
<p className="font-bold text-sm">Escouade Cyber-Renards</p>
<p className="text-[10px] text-secondary font-black uppercase tracking-tighter">8,450 XP</p>
</div>
<span className="material-symbols-outlined text-primary">trending_up</span>
</div>
<div className="p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors">
<span className="font-display text-headline-md text-secondary/30 italic">02</span>
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary">military_tech</span>
</div>
<div className="flex-grow">
<p className="font-bold text-sm">Brigade du Pare-feu</p>
<p className="text-[10px] text-secondary font-black uppercase tracking-tighter">7,920 XP</p>
</div>
<span className="material-symbols-outlined text-secondary">remove</span>
</div>
<div className="p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors">
<span className="font-display text-headline-md text-secondary/30 italic">03</span>
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary">token</span>
</div>
<div className="flex-grow">
<p className="font-bold text-sm">Gardiens de la Clé</p>
<p className="text-[10px] text-secondary font-black uppercase tracking-tighter">7,100 XP</p>
</div>
<span className="material-symbols-outlined text-primary">trending_up</span>
</div>
</div>
<button className="w-full py-3 bg-surface-container-highest text-secondary font-bold text-xs uppercase hover:bg-surface-container-high transition-colors">Voir classement complet</button>
</div>
</div>
{/* Character Tip Card */}
<div className="tactile-card p-6 bg-tertiary-fixed text-on-tertiary-fixed relative overflow-hidden">
<div className="relative z-10">
<div className="flex items-center gap-3 mb-4">
<div className="w-12 h-12 rounded-full border-2 border-secondary overflow-hidden bg-white shrink-0">
<img className="w-full h-full object-cover" alt="A smiling 3D shield character with a face, glowing blue rings around it, appearing as a friendly security mascot for kids. Bright cyan and blue colors, soft lighting, playful expression." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVPKzdrbEDJDg4rW2PdXtlDiTgnD2tPzFO_Zq3vfaCAq87HJZo_jBN0awrt0jk1W2M3tuXDXE6afn4PMLvhkhGLAzBs4YFTRNDZgYcvFV75zsRjNAx6yvYKe3lq_XDLj69FszNQA45dZidBj4b9DkLDF2kYVR0fcatC8oK3zremkJmReJap_BKpD-fEeVzaPn4F1PQm-_qUJBowP5ozoIwkoJ7U5W6F0PSHrvUa8GYBXdtkfZXqGqOZS-MzNiq_AzBwGweFycItFbI"/>
</div>
<p className="font-black text-xs uppercase tracking-tighter">Cyber-Conseil</p>
</div>
<p className="italic font-medium text-sm leading-relaxed">"Commandant, n'oubliez pas de valider les récompenses de l'escouade Alpha. Ils ont surpassé leurs objectifs de 15% !"</p>
</div>
</div>
</div>
</div>
</div>
</main>
{/* Footer (Authority: JSON) */}
<footer className="ml-64 bg-surface-container-lowest border-t-2 border-secondary py-12">
<div className="max-w-[1200px] mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-8">
<div className="flex flex-col items-center md:items-start gap-2">
<div className="font-display text-headline-md font-black text-primary">Cyberambassadeurs</div>
<p className="text-secondary font-label-bold text-xs">© 2024 Cyberambassadeurs - Mission de Sécurité Numérique</p>
</div>
<div className="flex gap-8">
<a className="text-secondary hover:text-primary font-label-bold text-sm transition-colors hover:underline" href="#">Mentions Légales</a>
<a className="text-secondary hover:text-primary font-label-bold text-sm transition-colors hover:underline" href="#">Charte de Sécurité</a>
<a className="text-secondary hover:text-primary font-label-bold text-sm transition-colors hover:underline" href="#">Aide</a>
<a className="text-secondary hover:text-primary font-label-bold text-sm transition-colors hover:underline" href="#">Contact</a>
</div>
<div className="flex gap-4">
<button className="w-10 h-10 tactile-card flex items-center justify-center hover:bg-surface-container-high">
<img alt="FB" className="w-4 h-4 grayscale opacity-70" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3zVXWbIhnRCtWUag9u6fidEasgzQGQ-b2jPlAU0qd8k_YU6sIzSez1HD7_YdFgygpg87rsTu37GETuoKcoJh2pBisndaAvs7dFyATmjIQsHhfM_Zu0T3JlhkQ0QBh9V3zJCpVYGbqWX3ADPnzKpzeHIxCx8PHAvXWaQfWVyeXwqImq8bQ3aqIF-mr3ZXDA6S_PQcSn4iQVg76zNwbMRqlElGIcLoppMBaJ3KN-RYWyfoHrPG9N7UyyJODVDdMt5zTgjEZmvaTXWL7"/>
</button>
<button className="w-10 h-10 tactile-card flex items-center justify-center hover:bg-surface-container-high">
<img alt="TW" className="w-4 h-4 grayscale opacity-70" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUD42tmXe431M7XvB7if5mWxEF3w1_Ta_M9kb4VV6hsFK6uimeBPXXTStBV9uQysRsCK7tUoWiyNgbhL2GLkdQzfO0ipsjKbDQ4dKe9onx_Nd9WuXV1K82Q7UMLHZdWm4K_qO6uAuK42l54avHwapyduZJQ5zoHjmx17rsYl18wEJ_bAsR7VwcGnIbArKsRPJw1dGZnlDKp0k387VASAtG1K7SERSh9T-KK42AyIF6i_12gpk2mQCGb-xwaeMjY6Zi4om75Lz47d_P"/>
</button>
<button className="w-10 h-10 tactile-card flex items-center justify-center hover:bg-surface-container-high">
<img alt="LI" className="w-4 h-4 grayscale opacity-70" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDUkpNzafhVIyZu5TVqvl-MRRwTeXG-4gZ7ALSF5HlANuIxa9owf7jIwDkGLVlvvzwVYbOz3o-nlRvakIzDeT9SpfKyhZi8SEZbspvd7yC0sMXlLZvQI7W4HGZFTJbWmVZ0okuHGiqNRsLiMjmWDTcUIZmrOCEsDF1NvqRjLNgxplom-opzsdqEFiO-VDbv8ErXXiiPtxunVnyMUsTB4ujZwmzuzgiqNKkh3Qhb42UXqHDBNI_5IK7u2JCbZ88yqMcgoa2Ju-NSOYC"/>
</button>
</div>
</div>
</footer>


    </div>
  );
}
