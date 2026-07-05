/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function AccueilScreen() {
  return (
    <div className={"bg-background text-on-background font-body-md overflow-x-hidden"}>

{/* TopAppBar */}
<header className="bg-surface sticky top-0 z-50 border-b-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)]">
<div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-[1200px] mx-auto">
<div className="flex items-center gap-2">
<span className="font-display text-headline-md font-black text-primary">Cyberambassadeurs</span>
</div>
<nav className="hidden md:flex gap-8">
<a className="font-label-bold text-label-bold text-primary border-b-4 border-primary pb-1" href="#">Accueil</a>
<a className="font-label-bold text-label-bold text-secondary hover:text-primary transition-colors pb-1" href="#">Missions</a>
<a className="font-label-bold text-label-bold text-secondary hover:text-primary transition-colors pb-1" href="#">Labo</a>
</nav>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-secondary hover:bg-surface-container-high p-2 rounded-xl transition-all">notifications</button>
<div className="hidden md:flex items-center gap-2 bg-secondary-container px-4 py-2 rounded-full border-2 border-secondary shadow-[0_2px_0_0_rgba(88,96,98,1)]">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
<span className="font-label-bold text-on-secondary-container">Cyber-Éclaireur</span>
</div>
<img className="w-10 h-10 rounded-full border-2 border-secondary" alt="A detailed 3D friendly avatar profile picture of a young cybersecurity student wearing a blue hoodie and tech glasses, set against a vibrant yellow circular background in a playful gamified style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6Er-uKZ6q8t4Pz2pZWWi41QhmCZHOid2DnGFdGhtM64O8gkIfZPYg51STnA384ymk9k3Wy6qqjEugKxCbXeRgWglvfUV84kz5ZdWYEybI76oB_xCHMNwyW72w7kAZ62qdcuW9kcHMr3kkYA-M2bMnYtdnDvYavM5OuHPVNgYA87tKrRnbq9of3bK9kBQj3_vLerwoERNQt3MqmpCbDGvqm4My98tXZlukw6SDMONZSXtN9a-n9PxmDiK9ZgAhf3YLyt1It21XILAG"/>
</div>
</div>
</header>
<main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-16">
{/* Hero Section */}
<section className="flex flex-col lg:flex-row items-center gap-12 mb-24">
<div className="lg:w-1/2 space-y-8 text-center lg:text-left">
<h1 className="font-display text-display leading-tight text-on-surface">
                    Deviens l'élite de la <span className="text-primary">Souveraineté Numérique</span>
</h1>
<p className="font-body-lg text-body-lg text-secondary max-w-xl mx-auto lg:mx-0">
                    Apprends à protéger ton identité, défends tes données et gagne tes galons de Cyberambassadeur dans l'aventure numérique ultime.
                </p>
<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
<button className="tactile-button bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-display font-black text-xl border-b-4 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)] uppercase tracking-wider">
                        Commencer l'aventure
                    </button>
<button className="tactile-button bg-surface border-2 border-secondary px-8 py-4 rounded-xl font-display font-black text-xl border-b-4 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)] uppercase tracking-wider">
                        Voir le labo
                    </button>
</div>
</div>
<div className="lg:w-1/2 relative flex justify-center">
<div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>
<img alt="Shield Character" className="w-full max-w-md floating-shield drop-shadow-2xl z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNTCInqMpUh3R4j87ITPAnpGTkzZpLufueOUzzAwjSYedHFdvOJjr-F_CISqGdyCV9_glIlSSJSMC0ErwEnhoElhROW6rG5znVb4cradCxWYpYFNmuqJX_-zATohJF9ETMdL6XW3OiK4trBS_HMyZoipjXkGt3QfQGoumv8mpwSSTMZAD1FW7Smt2aN9pWi5ZYL38KG_9rvaabj_ODnmXn2TPT48wvlJsQVKP_eFRNWrhzBuqvCB-thEBOhgOT8mDpYPmrNNWJIr14"/>
</div>
</section>
{/* The Journey Section */}
<section className="mb-24">
<div className="text-center mb-16">
<h2 className="font-display text-headline-lg mb-4 uppercase tracking-tight">Ton Parcours de Héros</h2>
<div className="h-2 w-24 bg-primary mx-auto rounded-full"></div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
{/* Step 1: Je me forme */}
<div className="bg-surface-container-lowest p-8 rounded-2xl border-2 border-secondary shadow-[0_8px_0_0_rgba(88,96,98,1)] flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
<div className="w-20 h-20 bg-tertiary-fixed rounded-full border-2 border-secondary mb-6 flex items-center justify-center shadow-[0_4px_0_0_rgba(88,96,98,1)]">
<span className="material-symbols-outlined text-4xl text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
</div>
<span className="bg-secondary text-surface px-4 py-1 rounded-full font-label-bold text-xs mb-4 uppercase">Niveau 01</span>
<h3 className="font-display text-headline-md mb-4">Je me forme</h3>
<p className="text-secondary font-body-md">Découvre les secrets du web et apprends à repérer les pièges numériques à travers des défis interactifs.</p>
</div>
{/* Step 2: J'agis */}
<div className="bg-surface-container-lowest p-8 rounded-2xl border-2 border-secondary shadow-[0_8px_0_0_rgba(88,96,98,1)] flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
<div className="w-20 h-20 bg-primary-fixed rounded-full border-2 border-secondary mb-6 flex items-center justify-center shadow-[0_4px_0_0_rgba(88,96,98,1)]">
<span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
</div>
<span className="bg-primary text-surface px-4 py-1 rounded-full font-label-bold text-xs mb-4 uppercase">En cours</span>
<h3 className="font-display text-headline-md mb-4">J'agis</h3>
<p className="text-secondary font-body-md">Mets tes connaissances en pratique avec des missions réelles pour sécuriser ton environnement numérique.</p>
</div>
{/* Step 3: Je certifie */}
<div className="bg-surface-container-lowest p-8 rounded-2xl border-2 border-secondary shadow-[0_8px_0_0_rgba(88,96,98,1)] flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
<div className="w-20 h-20 bg-yellow-100 rounded-full border-2 border-secondary mb-6 flex items-center justify-center shadow-[0_4px_0_0_rgba(88,96,98,1)]">
<span className="material-symbols-outlined text-4xl text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
</div>
<span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full font-label-bold text-xs mb-4 uppercase">Verrouillé</span>
<h3 className="font-display text-headline-md mb-4">Je certifie</h3>
<p className="text-secondary font-body-md">Obtiens ton badge officiel de Cyberambassadeur et rejoins le panthéon des gardiens du numérique.</p>
</div>
</div>
</section>
{/* Stats & Social Proof Bento */}
<section className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 mb-24">
<div className="md:col-span-2 bg-inverse-surface p-8 rounded-3xl border-2 border-secondary shadow-[0_8px_0_0_rgba(25,28,30,1)] flex flex-col justify-between">
<h4 className="text-surface font-display text-headline-md">Impact Communautaire</h4>
<div className="flex items-end gap-4 mt-8">
<div className="text-5xl font-black text-primary-fixed-dim">12,450</div>
<div className="text-surface/70 font-label-bold pb-2 uppercase">Missions réussies</div>
</div>
<div className="mt-6 flex -space-x-4">
<div className="w-12 h-12 rounded-full border-4 border-inverse-surface bg-gray-300"></div>
<div className="w-12 h-12 rounded-full border-4 border-inverse-surface bg-gray-400"></div>
<div className="w-12 h-12 rounded-full border-4 border-inverse-surface bg-gray-500"></div>
<div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-inverse-surface bg-primary text-white font-bold text-xs">+4k</div>
</div>
</div>
<div className="bg-surface-container-high p-8 rounded-3xl border-2 border-secondary shadow-[0_8px_0_0_rgba(88,96,98,1)] flex flex-col items-center justify-center text-center">
<span className="material-symbols-outlined text-primary text-5xl mb-4">military_tech</span>
<p className="font-display text-headline-md">45 Badges</p>
<p className="text-secondary text-sm uppercase font-bold">À collectionner</p>
</div>
<div className="bg-tertiary p-8 rounded-3xl border-2 border-secondary shadow-[0_8px_0_0_rgba(88,96,98,1)] flex flex-col items-center justify-center text-center">
<span className="material-symbols-outlined text-white text-5xl mb-4">family_restroom</span>
<p className="text-white font-display text-headline-md">Parents</p>
<p className="text-white/70 text-sm uppercase font-bold">Inclus</p>
</div>
<div className="md:col-span-2 bg-primary-container p-8 rounded-3xl border-2 border-secondary shadow-[0_8px_0_0_rgba(88,96,98,1)] flex items-center gap-6">
<div className="flex-1">
<h4 className="text-on-primary-container font-display text-headline-md mb-2">Prêt pour ton premier défi ?</h4>
<p className="text-on-primary-container/80 mb-4">Le labo t'attend pour une simulation de phishing en temps réel.</p>
<button className="bg-surface text-primary px-6 py-2 rounded-xl font-bold border-b-4 border-secondary shadow-[0_2px_0_0_rgba(88,96,98,1)]">Entrer au Labo</button>
</div>
<div className="hidden sm:block w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-6xl text-white">bolt</span>
</div>
</div>
<div className="md:col-span-2 bg-surface border-2 border-secondary p-8 rounded-3xl shadow-[0_8px_0_0_rgba(88,96,98,1)]">
<div className="flex items-center gap-4 mb-4">
<span className="material-symbols-outlined text-primary">verified</span>
<span className="font-display font-bold">Souveraineté Numérique</span>
</div>
<p className="text-secondary italic">"Une plateforme exceptionnelle qui parle le langage des jeunes tout en enseignant des compétences cruciales pour leur avenir numérique."</p>
<div className="mt-4 flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary"></div>
<span className="font-label-bold text-sm">Directeur Académique</span>
</div>
</div>
</section>
</main>
{/* Footer */}
<footer className="bg-surface-container-lowest border-t-2 border-secondary py-12 mt-16">
<div className="max-w-[1200px] mx-auto px-margin-desktop">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
<div>
<h3 className="font-display text-headline-md font-black text-primary mb-2">Cyberambassadeurs</h3>
<p className="text-secondary max-w-sm">La mission de sécurité numérique pour la prochaine génération de citoyens connectés.</p>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
<div className="flex flex-col gap-3">
<span className="font-label-bold uppercase text-secondary/50 text-xs">Aventure</span>
<a className="font-label-bold hover:text-primary transition-colors" href="#">Missions</a>
<a className="font-label-bold hover:text-primary transition-colors" href="#">Labo</a>
<a className="font-label-bold hover:text-primary transition-colors" href="#">Inventaire</a>
</div>
<div className="flex flex-col gap-3">
<span className="font-label-bold uppercase text-secondary/50 text-xs">Communauté</span>
<a className="font-label-bold hover:text-primary transition-colors" href="#">Classement</a>
<a className="font-label-bold hover:text-primary transition-colors" href="#">Écoles</a>
<a className="font-label-bold hover:text-primary transition-colors" href="#">Parents</a>
</div>
<div className="flex flex-col gap-3">
<span className="font-label-bold uppercase text-secondary/50 text-xs">Légal</span>
<a className="font-label-bold hover:text-primary transition-colors" href="#">Mentions</a>
<a className="font-label-bold hover:text-primary transition-colors" href="#">Sécurité</a>
<a className="font-label-bold hover:text-primary transition-colors" href="#">Confidentialité</a>
</div>
<div className="flex flex-col gap-3">
<span className="font-label-bold uppercase text-secondary/50 text-xs">Support</span>
<a className="font-label-bold hover:text-primary transition-colors" href="#">Aide</a>
<a className="font-label-bold hover:text-primary transition-colors" href="#">Contact</a>
<a className="font-label-bold hover:text-primary transition-colors" href="#">FAQ</a>
</div>
</div>
</div>
<div className="pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
<p className="font-label-bold text-secondary">© 2024 Cyberambassadeurs - Mission de Sécurité Numérique</p>
<div className="flex gap-4">
<button className="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-[0_2px_0_0_rgba(88,96,98,1)] active:translate-y-[2px] active:shadow-none">
<span className="material-symbols-outlined">share</span>
</button>
<button className="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-[0_2px_0_0_rgba(88,96,98,1)] active:translate-y-[2px] active:shadow-none">
<span className="material-symbols-outlined">public</span>
</button>
</div>
</div>
</div>
</footer>
{/* Mobile Navigation Bar */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-secondary px-6 py-4 flex justify-between items-center z-50">
<button className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
<span className="text-[10px] font-bold uppercase">Missions</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">science</span>
<span className="text-[10px] font-bold uppercase">Labo</span>
</button>
<div className="relative -top-8">
<button className="w-14 h-14 bg-primary-container rounded-full border-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)] flex items-center justify-center text-white active:translate-y-[4px] active:shadow-none transition-all">
<span className="material-symbols-outlined text-3xl">add</span>
</button>
</div>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">emoji_events</span>
<span className="text-[10px] font-bold uppercase">Top</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">inventory_2</span>
<span className="text-[10px] font-bold uppercase">Sac</span>
</button>
</nav>


    </div>
  );
}
