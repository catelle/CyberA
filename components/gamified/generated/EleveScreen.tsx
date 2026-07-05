/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function EleveScreen() {
  return (
    <div className={"bg-background text-on-background font-body-md min-h-screen flex overflow-hidden"}>

{/* Sidebar Navigation */}
<aside className="fixed left-0 top-0 h-full p-4 flex flex-col h-screen w-64 border-r-2 border-secondary bg-surface-container shadow-[4px_0_0_0_rgba(88,96,98,1)] z-50">
<div className="font-display text-headline-md font-black text-primary mb-8">Cyberambassadeurs</div>
<div className="flex flex-col gap-2 mb-auto">
{/* Active Mission Control (Missions) */}
<a className="flex items-center gap-4 bg-primary-container text-on-primary-container border-2 border-secondary rounded-xl px-4 py-3 shadow-[0_4px_0_0_rgba(88,96,98,1)] hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">rocket_launch</span>
<span className="font-body-lg text-body-lg">Missions</span>
</a>
<a className="flex items-center gap-4 text-secondary px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">science</span>
<span className="font-body-lg text-body-lg">Labo</span>
</a>
<a className="flex items-center gap-4 text-secondary px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">emoji_events</span>
<span className="font-body-lg text-body-lg">Classement</span>
</a>
<a className="flex items-center gap-4 text-secondary px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">inventory_2</span>
<span className="font-body-lg text-body-lg">Inventaire</span>
</a>
<a className="flex items-center gap-4 text-secondary px-4 py-3 hover:bg-surface-container-high rounded-xl hover:translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined">family_restroom</span>
<span className="font-body-lg text-body-lg">Parents</span>
</a>
</div>
<button className="tactile-button bg-primary text-on-primary font-label-bold py-3 px-4 rounded-xl mb-8 flex items-center justify-center gap-2">
<span className="material-symbols-outlined">add</span>
            Nouvelle Mission
        </button>
<div className="flex flex-col gap-2 border-t-2 border-secondary pt-4">
<a className="flex items-center gap-4 text-secondary px-4 py-2 hover:bg-surface-container-high rounded-xl" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-bold">Réglages</span>
</a>
<a className="flex items-center gap-4 text-secondary px-4 py-2 hover:bg-surface-container-high rounded-xl" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-label-bold">Déconnexion</span>
</a>
</div>
</aside>
{/* Main Content Canvas */}
<main className="flex-1 ml-64 overflow-y-auto custom-scrollbar h-screen">
{/* Header */}
<header className="sticky top-0 z-40 bg-surface px-margin-desktop py-4 flex justify-between items-center max-w-[1200px] mx-auto border-b-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)]">
<div className="flex flex-col">
<h1 className="font-display text-headline-md font-black text-primary">Mission Control</h1>
<p className="text-secondary font-label-bold">Status: Opérationnel • Localisation: HQ Digital</p>
</div>
<div className="flex items-center gap-6">
<div className="flex gap-4">
<button className="material-symbols-outlined text-secondary hover:text-primary transition-colors">notifications</button>
<button className="material-symbols-outlined text-secondary hover:text-primary transition-colors">military_tech</button>
<button className="material-symbols-outlined text-secondary hover:text-primary transition-colors">monetization_on</button>
</div>
<div className="flex items-center gap-3 bg-secondary-container px-4 py-2 rounded-full border-2 border-secondary">
<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">L12</div>
<span className="font-label-bold text-on-secondary-container">Cyber-Éclaireur</span>
</div>
</div>
</header>
<div className="max-w-[1200px] mx-auto px-margin-desktop py-12">
{/* User Hero Section */}
<section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12">
<div className="md:col-span-4 flex flex-col items-center">
<div className="relative w-full aspect-square tactile-card rounded-3xl overflow-hidden mb-4">
<img alt="Jean-Claude 3D Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNTCInqMpUh3R4j87ITPAnpGTkzZpLufueOUzzAwjSYedHFdvOJjr-F_CISqGdyCV9_glIlSSJSMC0ErwEnhoElhROW6rG5znVb4cradCxWYpYFNmuqJX_-zATohJF9ETMdL6XW3OiK4trBS_HMyZoipjXkGt3QfQGoumv8mpwSSTMZAD1FW7Smt2aN9pWi5ZYL38KG_9rvaabj_ODnmXn2TPT48wvlJsQVKP_eFRNWrhzBuqvCB-thEBOhgOT8mDpYPmrNNWJIr14"/>
<div className="absolute bottom-4 left-4 bg-primary text-white font-label-bold px-3 py-1 rounded-full border-2 border-secondary">Jean-Claude</div>
</div>
</div>
<div className="md:col-span-8 flex flex-col justify-center gap-6">
<div className="tactile-card p-card-padding rounded-3xl flex-1 flex flex-col justify-between">
<div>
<div className="flex justify-between items-end mb-2">
<h2 className="font-display text-headline-lg text-on-surface">Niveau 12</h2>
<span className="font-label-bold text-secondary">2,450 / 3,000 XP</span>
</div>
{/* Chunky Pink Progress Bar */}
<div className="w-full h-6 bg-secondary-container rounded-full border-2 border-secondary overflow-hidden">
<div className="h-full bg-primary-container rounded-full w-[81%] shadow-inner transition-all duration-1000"></div>
</div>
</div>
<div className="grid grid-cols-3 gap-4 mt-6">
<div className="flex flex-col items-center p-3 bg-surface-container rounded-xl border-2 border-secondary">
<span className="material-symbols-outlined text-primary text-3xl mb-1">local_fire_department</span>
<span className="font-label-bold text-secondary">7 Jours</span>
</div>
<div className="flex flex-col items-center p-3 bg-surface-container rounded-xl border-2 border-secondary">
<span className="material-symbols-outlined text-tertiary text-3xl mb-1">workspace_premium</span>
<span className="font-label-bold text-secondary">15 Badges</span>
</div>
<div className="flex flex-col items-center p-3 bg-surface-container rounded-xl border-2 border-secondary">
<span className="material-symbols-outlined text-on-surface-variant text-3xl mb-1">groups</span>
<span className="font-label-bold text-secondary">Top 5%</span>
</div>
</div>
</div>
</div>
</section>
{/* Missions & Daily Challenge Bento Grid */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
{/* Main Modules Column */}
<div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
<h3 className="font-display text-headline-md col-span-full text-secondary">Niveaux Déverrouillables</h3>
{/* Level 1 */}
<div className="tactile-card p-6 rounded-3xl group cursor-pointer">
<div className="w-16 h-16 bg-tertiary-fixed rounded-2xl border-2 border-secondary flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
<span className="material-symbols-outlined text-tertiary text-3xl">verified_user</span>
</div>
<h4 className="font-headline-md mb-2">Bases Cyber</h4>
<p className="text-secondary text-sm mb-4">Maîtrisez les fondamentaux de la protection des données.</p>
<div className="flex justify-between items-center">
<span className="font-label-bold text-tertiary">COMPLÉTÉ</span>
<span className="material-symbols-outlined text-tertiary fill-icon">check_circle</span>
</div>
</div>
{/* Level 2 */}
<div className="tactile-card p-6 rounded-3xl group cursor-pointer bg-primary/5">
<div className="w-16 h-16 bg-primary-fixed rounded-2xl border-2 border-secondary flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
<span className="material-symbols-outlined text-primary text-3xl">shield_person</span>
</div>
<h4 className="font-headline-md mb-2">Identité Digitale</h4>
<p className="text-secondary text-sm mb-4">Gérez votre réputation et vos traces en ligne.</p>
<div className="flex justify-between items-center">
<span className="font-label-bold text-primary">EN COURS</span>
<div className="w-12 h-2 bg-secondary-container rounded-full border-2 border-secondary overflow-hidden">
<div className="h-full bg-primary w-[45%]"></div>
</div>
</div>
</div>
{/* Level 3 Locked */}
<div className="tactile-card p-6 rounded-3xl bg-surface-container-high opacity-80 relative overflow-hidden">
<div className="absolute inset-0 flex items-center justify-center z-10">
<span className="material-symbols-outlined text-secondary text-4xl">lock</span>
</div>
<div className="blur-[2px]">
<div className="w-16 h-16 bg-secondary-container rounded-2xl border-2 border-secondary flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-secondary text-3xl">security_update_good</span>
</div>
<h4 className="font-headline-md mb-2">Phishing Expert</h4>
<p className="text-secondary text-sm mb-4">Devenez indétectable par les pirates.</p>
<span className="font-label-bold text-secondary">NIVEAU 15 REQUIS</span>
</div>
</div>
{/* Level 4 Locked */}
<div className="tactile-card p-6 rounded-3xl bg-surface-container-high opacity-80 relative overflow-hidden">
<div className="absolute inset-0 flex items-center justify-center z-10">
<span className="material-symbols-outlined text-secondary text-4xl">lock</span>
</div>
<div className="blur-[2px]">
<div className="w-16 h-16 bg-secondary-container rounded-2xl border-2 border-secondary flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-secondary text-3xl">hub</span>
</div>
<h4 className="font-headline-md mb-2">Réseaux Sécurisés</h4>
<p className="text-secondary text-sm mb-4">Tout sur les routeurs et les connexions VPN.</p>
<span className="font-label-bold text-secondary">NIVEAU 20 REQUIS</span>
</div>
</div>
</div>
{/* Right Sidebar / Challenge column */}
<div className="md:col-span-4 flex flex-col gap-8">
{/* Daily Challenge */}
<div className="tactile-card p-card-padding rounded-3xl bg-tertiary-container text-white">
<div className="flex items-center gap-3 mb-6">
<div className="w-12 h-12 bg-white rounded-xl border-2 border-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary text-2xl fill-icon">cleaning_services</span>
</div>
<h3 className="font-headline-md">Challenge Quotidien</h3>
</div>
<div className="mb-6">
<h4 className="font-display text-headline-md leading-tight mb-2 text-white">Nettoyage Numérique</h4>
<p className="text-on-tertiary-container text-body-md">Supprime 5 applications inutilisées et vide ton cache navigateur pour libérer de l'espace.</p>
</div>
<button className="tactile-button w-full bg-white text-tertiary font-label-bold py-4 rounded-xl flex items-center justify-center gap-2">
                            C'est parti !
                            <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
{/* Community Activity */}
<div className="tactile-card p-card-padding rounded-3xl">
<h3 className="font-label-bold text-secondary mb-4">FLUX RÉCENT</h3>
<div className="flex flex-col gap-4">
<div className="flex items-start gap-3">
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-surface-variant flex items-center justify-center text-sm font-bold">M</div>
<div>
<p className="text-sm"><strong>Mathieu</strong> a atteint le niveau 15 !</p>
<span className="text-xs text-secondary">Il y a 2 min</span>
</div>
</div>
<div className="flex items-start gap-3">
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-surface-variant flex items-center justify-center text-sm font-bold">L</div>
<div>
<p className="text-sm"><strong>Léa</strong> vient de gagner le badge "Gardienne".</p>
<span className="text-xs text-secondary">Il y a 10 min</span>
</div>
</div>
<div className="flex items-start gap-3">
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-surface-variant flex items-center justify-center text-sm font-bold">P</div>
<div>
<p className="text-sm">Nouveau labo disponible : <strong>IA Générative</strong>.</p>
<span className="text-xs text-secondary">Il y a 1h</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<footer className="w-full border-t-2 border-secondary bg-surface-container-lowest mt-12">
<div className="w-full max-w-[1200px] mx-auto px-margin-desktop py-8 flex flex-col md:flex-row justify-between items-center gap-4">
<div className="font-display text-headline-md font-black text-primary">Cyberambassadeurs</div>
<div className="flex flex-wrap justify-center gap-6">
<a className="font-label-bold text-secondary hover:text-primary transition-colors" href="#">Mentions Légales</a>
<a className="font-label-bold text-secondary hover:text-primary transition-colors" href="#">Charte de Sécurité</a>
<a className="font-label-bold text-secondary hover:text-primary transition-colors" href="#">Aide</a>
<a className="font-label-bold text-secondary hover:text-primary transition-colors" href="#">Contact</a>
</div>
<p className="font-label-bold text-secondary text-xs text-center md:text-right">© 2024 Cyberambassadeurs - Mission de Sécurité Numérique</p>
</div>
</footer>
</main>
{/* Character Cues (Floating) */}
<div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4 pointer-events-none">
<div className="tactile-card p-4 rounded-2xl bg-white max-w-xs animate-bounce pointer-events-auto">
<p className="text-sm font-medium">"Tu es en feu, Jean-Claude ! Plus que 550 XP pour le niveau 13 !"</p>
</div>
<div className="w-20 h-20 tactile-card rounded-full overflow-hidden pointer-events-auto border-4 border-primary shadow-lg">
<img className="w-full h-full object-cover" alt="A cute, friendly 3D robot character avatar with big expressive digital eyes and a shiny teal metallic surface, styled like a modern friendly tech mascot with bright, clean studio lighting. The robot has a small antenna on its head and a glowing heart core in the center of its chest, conveying a helpful and energetic personality in a gamified learning environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYARW7wXi6DOrQH6skdV-IS67V0r5sRaaNmh3y-wCLbhXKAdgIrrIfDvdS8gn9wWjwv5BMX2ENIVdFvpGolUx8CcsUq7jHUFdJetkxc7QYYpYvy-5UY02sn259mrlge5alV6at0mhBn9U_Q6EK9dXI4Ea5KVNBqyScGTN9ghTG5K231BftX7iXqu_8o-uhSs1ZdalRjdI18i5p-qd_nrQWjNkyHuPN8CJLUu9iPl1-S6NgqsT1VNegzUTG3JWgpIf-feGDbKjpfETf"/>
</div>
</div>


    </div>
  );
}
