/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function AdminMobileScreen() {
  return (
    <div className={"bg-background text-on-background font-body-md text-body-md overflow-x-hidden pb-24"}>

{/* TopAppBar */}
<header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b-2 border-secondary px-margin-mobile py-4 flex justify-between items-center w-full">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden bg-primary-container flex items-center justify-center">
<img className="w-full h-full object-cover" alt="A friendly, 3D-styled digital shield mascot with large expressive eyes and a cheerful smile. The mascot is rendered in vibrant turquoise and sapphire blue gradients with a glowing halo, fitting a gamified education aesthetic. High quality 3D render, white background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi1_ZY4xwXbixgzpl2-nZCaV5uFpfl-EQfAoLgOmldz6u8gsvqUNegzpY9R9GTP3zvP0wy3uaR5hKwvjfbhpKKLURbVcJ2vzbn7KIwEZRJdfo-QyC9xT-s1WYlzpJflRswN_GPBQGEGrFxmYr8IJFcMWMSQJqJ-IvrY5M8lcf8HHykUP4-gdgElXYZ_8rQVTh8EEA5jTkcYce4UDFM_nQ8Lf3lZL7HPM6evlMoKhHItU31fwx3kHc27vJXEhjZZmJb_jKwSvF05R9I"/>
</div>
<h1 className="font-headline-lg-mobile text-headline-lg-mobile font-black text-primary">CyberSafe</h1>
</div>
<div className="flex items-center gap-2">
<button className="material-symbols-outlined text-secondary text-2xl p-2 hover:bg-surface-container rounded-full transition-colors">notifications</button>
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-surface-container-highest flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" alt="Close-up professional 3D avatar of a young adult admin from Cameroon, wearing a smart-casual dark blue polo. The background is a clean, neutral gradient. Lighting is soft and professional, high-fidelity 3D modeling style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsA6zT38nDT78eZu3aIzSwBkbKpaec50coZsMDFJ-KNoZohLl525SYEsRiEuaANOP9j3i7cIRsdE4VNGjV2bQhPBCAkDdlU_L0momZHAS9fb_tEwJlpXRdD067ND42lwwuNrwrURrC4DPElCpxsZlEudzY9R-7RzSPzdjvKA6pyA04LZbOQ142i3K04Sh2zuONJZjkfnXDYBo-xBhSYeW4V_aoeRixCU5UlWX2iRo0FpCSVuGazUw10HTglqEy_DCaq0iIM3s10Kf9"/>
</div>
</div>
</header>
<main className="mt-24 px-margin-mobile space-y-8">
{/* Welcome Section */}
<section className="space-y-1">
<p className="font-label-bold text-label-bold text-secondary uppercase tracking-wider">CAMEROUN CENTRAL HUB</p>
<h2 className="font-headline-md text-headline-md text-on-surface">Bonjour, Admin !</h2>
<div className="flex items-center gap-2 mt-2">
<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
<span className="text-secondary font-label-bold text-[12px]">SYSTÈME OPÉRATIONNEL</span>
</div>
</section>
{/* High-Level Stats Bento Grid */}
<section className="grid grid-cols-2 gap-4">
<div className="tactile-card bg-primary-container p-4 rounded-xl flex flex-col justify-between h-32 text-on-primary-container relative overflow-hidden group">
<div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
</div>
<span className="material-symbols-outlined text-2xl">groups</span>
<div>
<div className="text-2xl font-black">1,284</div>
<div className="font-label-bold text-[12px] opacity-90 uppercase">Élèves Totaux</div>
</div>
</div>
<div className="tactile-card bg-tertiary-container p-4 rounded-xl flex flex-col justify-between h-32 text-on-tertiary-container relative overflow-hidden group">
<div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
</div>
<span className="material-symbols-outlined text-2xl">hub</span>
<div>
<div className="text-2xl font-black">42</div>
<div className="font-label-bold text-[12px] opacity-90 uppercase">Cohortes Actives</div>
</div>
</div>
</section>
{/* Pending Actions Section */}
<section className="space-y-4">
<div className="flex justify-between items-center">
<h3 className="font-headline-md text-headline-md">Actions en attente</h3>
<span className="bg-primary text-on-primary text-[10px] font-black px-2 py-1 rounded-full">3 NOUVELLES</span>
</div>
<div className="space-y-3">
{/* Security Flag Alert */}
<div className="tactile-card bg-surface-container-lowest p-4 rounded-xl flex items-start gap-4 border-l-8 border-l-error">
<div className="bg-error-container text-error p-2 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>report</span>
</div>
<div className="flex-1">
<p className="font-label-bold text-on-surface">Alerte de Sécurité</p>
<p className="text-[13px] text-secondary">Tentative de connexion suspecte détectée à Douala.</p>
<div className="mt-3 flex gap-2">
<button className="tactile-button bg-error text-on-error font-label-bold text-[11px] px-3 py-1 rounded-lg uppercase">Inspecter</button>
<button className="font-label-bold text-secondary text-[11px] px-3 py-1 uppercase">Ignorer</button>
</div>
</div>
</div>
{/* Content Review Alert */}
<div className="tactile-card bg-surface-container-lowest p-4 rounded-xl flex items-start gap-4 border-l-8 border-l-tertiary">
<div className="bg-tertiary-fixed text-on-tertiary-fixed-variant p-2 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rate_review</span>
</div>
<div className="flex-1">
<p className="font-label-bold text-on-surface">Révision de Contenu</p>
<p className="text-[13px] text-secondary">Nouveaux projets de la Cohorte #12 en attente de validation.</p>
<div className="mt-3 flex gap-2">
<button className="tactile-button bg-tertiary text-on-tertiary font-label-bold text-[11px] px-3 py-1 rounded-lg uppercase">Réviser</button>
</div>
</div>
</div>
</div>
</section>
{/* Recent Activity Feed */}
<section className="space-y-4">
<h3 className="font-headline-md text-headline-md">Activité Récente</h3>
<div className="space-y-0 relative">
{/* Timeline vertical line */}
<div className="absolute left-6 top-2 bottom-2 w-0.5 bg-secondary opacity-20"></div>
{/* Activity Items */}
<div className="relative flex items-start gap-4 pl-12 py-3 group">
<div className="absolute left-[18px] top-4 w-3 h-3 rounded-full border-2 border-primary bg-background z-10"></div>
<div className="flex-1">
<div className="flex justify-between items-center">
<span className="font-label-bold text-on-surface">Inscriptions (8)</span>
<span className="text-[10px] text-secondary">Il y a 10m</span>
</div>
<p className="text-body-md text-[13px] text-secondary">Nouveaux élèves ont rejoint le module 'Vie Privée'.</p>
</div>
</div>
<div className="relative flex items-start gap-4 pl-12 py-3 group">
<div className="absolute left-[18px] top-4 w-3 h-3 rounded-full border-2 border-tertiary bg-background z-10"></div>
<div className="flex-1">
<div className="flex justify-between items-center">
<span className="font-label-bold text-on-surface">Challenge Terminé</span>
<span className="text-[10px] text-secondary">Il y a 2h</span>
</div>
<p className="text-body-md text-[13px] text-secondary">M. Abena a complété le 'Labyrinthe du Phishing'.</p>
</div>
</div>
<div className="relative flex items-start gap-4 pl-12 py-3 group">
<div className="absolute left-[18px] top-4 w-3 h-3 rounded-full border-2 border-secondary bg-background z-10"></div>
<div className="flex-1">
<div className="flex justify-between items-center">
<span className="font-label-bold text-on-surface">Mise à jour Système</span>
<span className="text-[10px] text-secondary">Aujourd'hui, 09:00</span>
</div>
<p className="text-body-md text-[13px] text-secondary">Le correctif de sécurité v2.4 a été déployé avec succès.</p>
</div>
</div>
</div>
<button className="w-full tactile-button bg-surface-container-high py-3 rounded-xl font-label-bold text-secondary uppercase text-[12px] flex items-center justify-center gap-2">
                Voir tout l'historique
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</section>
{/* Quick Actions Grid */}
<section className="grid grid-cols-2 gap-4 pb-8">
<button className="tactile-button bg-surface border-2 border-secondary rounded-xl p-4 flex flex-col items-center gap-2">
<span className="material-symbols-outlined text-primary text-3xl">add_circle</span>
<span className="font-label-bold text-[11px] uppercase">Nouvelle Cohorte</span>
</button>
<button className="tactile-button bg-surface border-2 border-secondary rounded-xl p-4 flex flex-col items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-3xl">download</span>
<span className="font-label-bold text-[11px] uppercase">Rapport Export</span>
</button>
</section>
</main>
{/* BottomNavBar */}
<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface border-t-2 border-secondary px-margin-mobile pb-safe">
<div className="flex flex-col items-center justify-center text-secondary pt-3 pb-2 flex-1">
<span className="material-symbols-outlined">school</span>
<span className="font-label-bold text-[10px] mt-1">Apprendre</span>
</div>
<div className="flex flex-col items-center justify-center text-secondary pt-3 pb-2 flex-1">
<span className="material-symbols-outlined">emoji_events</span>
<span className="font-label-bold text-[10px] mt-1">Quêtes</span>
</div>
<div className="flex flex-col items-center justify-center text-secondary pt-3 pb-2 flex-1">
<span className="material-symbols-outlined">family_restroom</span>
<span className="font-label-bold text-[10px] mt-1">Famille</span>
</div>
{/* Active Tab: Admin */}
<div className="flex flex-col items-center justify-center text-primary border-t-4 border-primary pt-2 pb-2 flex-1 translate-y-0.5 transition-transform duration-75">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
<span className="font-label-bold text-[10px] mt-1">Admin</span>
</div>
<div className="flex flex-col items-center justify-center text-secondary pt-3 pb-2 flex-1">
<span className="material-symbols-outlined">person</span>
<span className="font-label-bold text-[10px] mt-1">Profil</span>
</div>
</nav>


    </div>
  );
}
