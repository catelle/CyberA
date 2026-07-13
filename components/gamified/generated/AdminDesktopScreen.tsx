/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function AdminDesktopScreen() {
  return (
    <div className={"bg-background text-on-background font-body-md min-h-screen flex"}>

{/* SideNavBar Anchor */}
<aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest border-r-2 border-secondary shadow-[4px_0_0_0_rgba(88,96,98,1)] z-50 flex flex-col gap-unit p-6">
<div className="mb-8 flex items-center gap-3">
<div className="w-10 h-10 bg-primary-container rounded-lg border-2 border-secondary flex items-center justify-center text-white font-black text-xl">C</div>
<span className="text-headline-md font-headline-md text-primary uppercase tracking-tighter">CYBER</span>
</div>
<div className="flex items-center gap-4 p-4 mb-6 bg-surface-container rounded-xl border-2 border-secondary">
<div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden bg-white">
<img className="w-full h-full object-cover" alt="A stylized 3D avatar of a futuristic security officer in a playful, cartoonish style. The character wears a sleek white and pink visor with glowing red accents, symbolizing cybersecurity. The background is a clean, light blue studio setting with soft lighting, matching a professional yet friendly gamified aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF-se7tRhLSoUvdjPRxJE9qF-2kdIDKgi0cgakt3mCtdpiWiCyyn8XuFr_eaRCHMGygwB_i3yQTyksoY1-BYcN1kT-p9NUQAGcM03tkAKIdA2bvQqe9n86M7KSD9G1HCDsgsUvgOTk61UnWrykAyQ2lZDXd-UgSa-yhxQoCE_9aRTLfHnhSLBTCExWwXwSDk2efDxbJdM53PPi97X9hHRDXR939c0LhtZQXFEYSvarjL6SvyOG47ZCUP5su27vDu1fn6iCudsD-Pj4"/>
</div>
<div>
<p className="text-label-bold font-label-bold text-primary">ADMIN LVL 99</p>
<p className="text-[10px] text-secondary font-bold uppercase tracking-widest">Mainframe Access</p>
</div>
</div>
<nav className="flex-1 flex flex-col gap-2">
{/* Active State Logic: Dashboard */}
<a className="flex items-center gap-4 bg-primary-container text-on-primary-container rounded-xl border-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)] p-4 btn-3d" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-bold text-label-bold">Dashboard</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1 hover:text-primary group" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label-bold text-label-bold">Academy</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1 hover:text-primary group" href="#">
<span className="material-symbols-outlined">military_tech</span>
<span className="font-label-bold text-label-bold">Leaderboard</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1 hover:text-primary group" href="#">
<span className="material-symbols-outlined">explore</span>
<span className="font-label-bold text-label-bold">Quests</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1 hover:text-primary group" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-bold text-label-bold">Settings</span>
</a>
</nav>
<div className="mt-auto border-t-2 border-surface-container pt-4 flex flex-col gap-2">
<a className="flex items-center gap-4 text-secondary p-4 hover:text-primary transition-all" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-label-bold text-label-bold">Help</span>
</a>
<a className="flex items-center gap-4 text-error p-4 hover:scale-105 transition-all" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-label-bold text-label-bold">Logout</span>
</a>
</div>
</aside>
{/* Main Content Canvas */}
<main className="ml-64 flex-1 flex flex-col overflow-y-auto custom-scrollbar h-screen">
{/* TopNavBar Style Anchor */}
<header className="sticky top-0 bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-margin-desktop py-6 max-w-7xl mx-auto z-40 border-b-2 border-secondary/10">
<div>
<h1 className="text-headline-lg font-headline-lg text-on-surface">Bonjour, Admin!</h1>
<p className="text-body-md text-secondary">Voici l'état actuel de votre réseau CyberAmbassadeur.</p>
</div>
<div className="flex items-center gap-6">
<div className="flex items-center gap-4 px-4 py-2 bg-surface-container-low border-2 border-secondary rounded-full shadow-[2px_2px_0_0_rgba(88,96,98,1)]">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
<span className="font-bold text-on-surface">42 active</span>
</div>
<div className="flex items-center gap-2">
<button className="w-10 h-10 rounded-xl border-2 border-secondary flex items-center justify-center hover:bg-primary-container hover:text-white transition-all btn-3d shadow-[2px_2px_0_0_rgba(88,96,98,1)]">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="w-10 h-10 rounded-xl border-2 border-secondary flex items-center justify-center hover:bg-primary-container hover:text-white transition-all btn-3d shadow-[2px_2px_0_0_rgba(88,96,98,1)]">
<span className="material-symbols-outlined">monetization_on</span>
</button>
</div>
</div>
</header>
<section className="max-w-7xl w-full mx-auto px-margin-desktop py-8">
{/* Top Section: Stats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
<div className="bg-white p-card-padding rounded-xl border-2 border-secondary shadow-[4px_4px_0_0_rgba(88,96,98,1)] flex items-center gap-6 relative overflow-hidden group">
<div className="w-16 h-16 bg-primary/10 rounded-xl border-2 border-primary flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
</div>
<div>
<p className="text-display font-display text-primary leading-none">1,284</p>
<p className="text-label-bold text-secondary uppercase">Élèves Totaux</p>
</div>
<div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-[120px]">group</span>
</div>
</div>
<div className="bg-white p-card-padding rounded-xl border-2 border-secondary shadow-[4px_4px_0_0_rgba(88,96,98,1)] flex items-center gap-6 relative overflow-hidden group">
<div className="w-16 h-16 bg-tertiary/10 rounded-xl border-2 border-tertiary flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
</div>
<div>
<p className="text-display font-display text-tertiary leading-none">42</p>
<p className="text-label-bold text-secondary uppercase">Cohortes Actives</p>
</div>
<div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-[120px]">hub</span>
</div>
</div>
<div className="bg-primary-container p-card-padding rounded-xl border-2 border-secondary shadow-[4px_4px_0_0_rgba(88,96,98,1)] flex items-center justify-between group cursor-pointer hover:translate-y-1 transition-all">
<div>
<p className="text-white text-headline-md font-headline-md mb-2">Prêt pour une mission ?</p>
<p className="text-white/80 text-body-md mb-4">Lancez une nouvelle formation maintenant.</p>
<button className="bg-white text-primary px-6 py-3 rounded-xl border-b-4 border-secondary font-bold btn-3d uppercase text-sm tracking-widest">Nouvelle Cohorte</button>
</div>
<div className="w-24 h-24 relative animate-bounce">
<img className="w-full h-full object-contain" alt="A friendly, high-quality 3D rendered mascot robot in a sleek white and vibrant pink-red finish. The mascot has large digital eyes showing a happy expression and is giving a thumbs-up. The lighting is crisp and optimistic, with soft reflections on its metallic surface, fitting the CyberAmbassadeurs energetic and gamified-corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoJmCEQe-ynvmFJGe47Eoo1ozTEjh66KffkUPqkgnpAeeP8v7SYkWxvuDELpLYYWkAUvONWfbPW8NzDBxcB5b6yR6rb7C2Bec_houMGKm8cjkJfNUNfBiF8arjhRBeBvjHvfz1QB9OgOd4W7F5DufZHkwoMwOUXUQQUNwwhKG0ylito-qIEkedsu7iLpAANw2_WilgjtsFjcph07HumsTY1BmU07igX5l-78yG38MyriRImkcJyz1w_0R31CQ9Rv7AbVno5mu7c-Nt"/>
</div>
</div>
</div>
{/* Middle Section: Pending Actions Bento */}
<div className="mb-12">
<div className="flex items-center justify-between mb-6">
<h2 className="text-headline-md font-headline-md flex items-center gap-2">
<span className="material-symbols-outlined text-primary">warning</span>
                        Actions en attente
                    </h2>
<a className="text-primary font-bold hover:underline" href="#">Voir tout (12)</a>
</div>
<div className="bento-grid">
{/* Urgent Security Alert */}
<div className="col-span-12 lg:col-span-7 bg-error-container/20 border-2 border-error p-card-padding rounded-xl shadow-[6px_6px_0_0_rgba(186,26,26,1)] relative overflow-hidden">
<div className="flex justify-between items-start mb-6">
<div>
<span className="bg-error text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase mb-2 inline-block">Urgent</span>
<h3 className="text-headline-md font-headline-md text-on-error-container">Tentative d'intrusion détectée</h3>
<p className="text-body-md text-secondary">IP: 192.168.1.144 - Module Academy</p>
</div>
<span className="material-symbols-outlined text-error text-4xl">security</span>
</div>
<div className="flex gap-4">
<button className="flex-1 bg-error text-white font-bold py-4 rounded-xl border-b-4 border-on-error-container btn-3d flex items-center justify-center gap-2">
<span className="material-symbols-outlined">shield</span>
                                INSPECTER
                            </button>
<button className="px-6 bg-white border-2 border-secondary font-bold rounded-xl border-b-4 btn-3d">IGNORER</button>
</div>
</div>
{/* Content Revision */}
<div className="col-span-12 lg:col-span-5 bg-white border-2 border-secondary p-card-padding rounded-xl shadow-[4px_4px_0_0_rgba(88,96,98,1)]">
<h3 className="text-headline-sm font-headline-md mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary">edit_document</span>
                            Révisions de Contenu
                        </h3>
<div className="space-y-4">
<div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-lg border border-secondary/20">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-bold text-secondary">JS</div>
<div className="flex-1">
<p className="font-bold text-sm">Module Cyber-Harcèlement</p>
<p className="text-[12px] text-secondary">Par Julie S. • Il y a 2h</p>
</div>
<button className="text-primary font-bold text-sm hover:underline">REVIEW</button>
</div>
<div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-lg border border-secondary/20">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-bold text-secondary">ML</div>
<div className="flex-1">
<p className="font-bold text-sm">Quête: Phishing Pro</p>
<p className="text-[12px] text-secondary">Par Marc L. • Il y a 5h</p>
</div>
<button className="text-primary font-bold text-sm hover:underline">REVIEW</button>
</div>
</div>
</div>
</div>
</div>
{/* Bottom Section: Recent Activity & Utility */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/* Activity Timeline */}
<div className="lg:col-span-2 bg-white border-2 border-secondary p-card-padding rounded-xl shadow-[4px_4px_0_0_rgba(88,96,98,1)]">
<h3 className="text-headline-sm font-headline-md mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">history</span>
                        Activité Récente
                    </h3>
<div className="relative pl-8 space-y-6">
<div className="absolute left-[15px] top-0 bottom-0 w-1 bg-surface-container-highest"></div>
<div className="relative">
<div className="absolute -left-8 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-[0_0_0_2px_#ba0034]"></div>
<div>
<p className="text-body-md font-bold text-on-surface">Nouvelle Cohorte créée: "Lycée Saint-Exupéry"</p>
<p className="text-sm text-secondary">Par Admin System • 14:32</p>
</div>
</div>
<div className="relative">
<div className="absolute -left-8 w-4 h-4 rounded-full bg-tertiary border-4 border-white shadow-[0_0_0_2px_#00647c]"></div>
<div>
<p className="text-body-md font-bold text-on-surface">50 Badges "Gardien de l'Internet" distribués</p>
<p className="text-sm text-secondary">Processus Automatique • 12:05</p>
</div>
</div>
<div className="relative">
<div className="absolute -left-8 w-4 h-4 rounded-full bg-secondary border-4 border-white shadow-[0_0_0_2px_#586062]"></div>
<div>
<p className="text-body-md font-bold text-on-surface">Maintenance du serveur terminée</p>
<p className="text-sm text-secondary">System • Hier, 23:59</p>
</div>
</div>
</div>
</div>
{/* Large Utility Buttons */}
<div className="flex flex-col gap-6">
<button className="w-full bg-white border-2 border-secondary p-8 rounded-xl shadow-[4px_4px_0_0_rgba(88,96,98,1)] group hover:translate-y-1 hover:shadow-none transition-all flex flex-col items-center text-center">
<div className="w-16 h-16 bg-tertiary-fixed text-on-tertiary-fixed rounded-full flex items-center justify-center mb-4 border-2 border-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-3xl">download</span>
</div>
<h4 className="text-headline-sm font-headline-md mb-1">Rapport Export</h4>
<p className="text-body-md text-secondary">Générez un PDF complet des stats mensuelles.</p>
</button>
<button className="w-full bg-white border-2 border-secondary p-8 rounded-xl shadow-[4px_4px_0_0_rgba(88,96,98,1)] group hover:translate-y-1 hover:shadow-none transition-all flex flex-col items-center text-center">
<div className="w-16 h-16 bg-primary-fixed text-on-primary-fixed rounded-full flex items-center justify-center mb-4 border-2 border-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-3xl">add_moderator</span>
</div>
<h4 className="text-headline-sm font-headline-md mb-1">Gestion des Rôles</h4>
<p className="text-body-md text-secondary">Modifier les permissions des modérateurs.</p>
</button>
</div>
</div>
</section>
{/* Footer / Credits */}
<footer className="max-w-7xl w-full mx-auto px-margin-desktop py-12 border-t-2 border-secondary/5 text-center">
<p className="text-label-bold text-secondary opacity-40 uppercase tracking-widest">© 2024 CYBERAMBASSADEURS INTERFACE V2.4.0 - SECURE PROTOCOL ACTIVE</p>
</footer>
</main>
{/* Contextual FAB Suppression: Admin dashboard does not need a generic FAB */}


    </div>
  );
}
