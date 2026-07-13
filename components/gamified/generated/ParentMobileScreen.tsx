/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function ParentMobileScreen() {
  return (
    <div className={"bg-background text-on-background min-h-screen pb-24"}>

{/* TopAppBar */}
<header className="fixed top-0 left-0 w-full z-50 bg-surface dark:bg-background border-b-2 border-secondary dark:border-secondary-fixed flex justify-between items-center px-margin-mobile py-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden bg-primary-fixed flex items-center justify-center">
<img className="w-full h-full object-cover" alt="A friendly 3D character illustration of a smiling digital shield mascot with a green antenna, set against a clean studio background. The style is soft, tactile, and playful, matching the brand's gamified cyber-safety educational theme for teenagers." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA384uMy4Q5MxQeAjYBYoWmw0F5EKJQB2FNgVNR1H-ct3DDuFCA83xoUMbbFN9aB_xlyhiJiOvQYDk6rR5HYrxz9cRyMx2CuRPL6hHV3aUJ_rl0wQxPONxiFq9_reBrf5K7HkDvblKSFaE-AR_CZAUZIG_vwzSUsNhfwvqxuRBm52nYGuFFs_peMlwF1uUMorUxE7MNsEElvgUYsxcnxUEpvBFcn1pvQ_2s_3dy1FJImIe1vtRk_beB2VcMeCu_D3bVdE0700KRSu87"/>
</div>
<h1 className="font-headline-lg-mobile text-headline-lg-mobile font-black text-primary dark:text-inverse-primary tracking-tight">CyberSafe</h1>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-secondary">notifications</span>
</button>
</header>
{/* Main Content Canvas */}
<main className="pt-24 px-margin-mobile space-y-6 max-w-md mx-auto">
{/* Title Section */}
<div className="flex items-end justify-between">
<div>
<p className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">Tableau de bord</p>
<h2 className="font-headline-md text-headline-md text-on-surface">Bonjour, Parent !</h2>
</div>
<div className="p-2 bg-tertiary-fixed rounded-xl border-2 border-secondary">
<span className="material-symbols-outlined text-tertiary">family_restroom</span>
</div>
</div>
{/* Child Progress Card (Marc Dupont) */}
<section className="tactile-card bg-surface-container-lowest p-card-padding rounded-xl relative overflow-hidden">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-4">
<div className="w-14 h-14 rounded-full border-2 border-secondary bg-primary-fixed-dim overflow-hidden">
<img className="w-full h-full object-cover" alt="A friendly 3D avatar of a young teenage boy named Marc, wearing a cool blue hoodie and a beanie. The lighting is bright and optimistic, with a clean digital art aesthetic that feels high-quality and approachable." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjAQhNx9SDZQ5WfY80V-PWF1mD8ZRzrfhco3s-4vITSK3ESohYdbPiOb16HM3GymeShCNYQAURD-dQ5ltatRgR_SpBlwqoxuSW3aIdgHXu_0ZNIv_VQJXTBeNSw15wW-klqzDxMg-9Tvo5K41jgcjfbqCUbmgOQ5OfyNzQRaXHipME02Q8wR7huie8q4O-dDCLg9vxx22NGRGLSYOYFfCbeWpNqIpt2767e_xshQqxkLldH5C6JjJoQ0YwgMZp9iE-yvQiLLYZl0ys"/>
</div>
<div>
<h3 className="font-label-bold text-headline-md leading-tight text-on-surface">Marc Dupont</h3>
<span className="bg-tertiary-container text-on-tertiary-container text-[10px] px-2 py-0.5 rounded-full font-bold border border-secondary">NIVEAU 14</span>
</div>
</div>
<div className="text-right">
<p className="font-label-bold text-label-bold text-secondary">Aujourd'hui</p>
<p className="font-headline-md text-primary">+450 XP</p>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between items-end">
<span className="font-label-bold text-label-bold text-on-surface-variant">Progression vers le Rang Expert</span>
<span className="font-label-bold text-label-bold text-primary">75%</span>
</div>
<div className="progress-track rounded-full">
<div className="progress-fill rounded-full" id="prog-bar"></div>
</div>
</div>
<div className="mt-4 flex items-center gap-2 text-secondary">
<span className="material-symbols-outlined text-[18px]">verified</span>
<p className="font-body-md text-body-md italic">"Marc est en feu cette semaine !"</p>
</div>
</section>
{/* Pending Approvals Section */}
<section className="space-y-4">
<div className="flex items-center justify-between">
<h3 className="font-headline-md text-headline-md">Approbations</h3>
<span className="bg-error-container text-on-error-container text-[12px] font-bold px-3 py-1 rounded-full border-2 border-secondary">2 À VALIDER</span>
</div>
<div className="space-y-3">
{/* Approval Item 1 */}
<div className="tactile-card bg-surface-container-low p-4 rounded-xl flex items-center justify-between group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-white border-2 border-secondary rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>privacy_tip</span>
</div>
<div>
<p className="font-label-bold text-label-bold text-on-surface">Quiz Final: Vie Privée</p>
<p className="font-body-md text-[12px] text-secondary">Complété il y a 2h</p>
</div>
</div>
<button className="tactile-button bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-label-bold text-label-bold">
            VALIDER
          </button>
</div>
{/* Approval Item 2 */}
<div className="tactile-card bg-surface-container-low p-4 rounded-xl flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-white border-2 border-secondary rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
</div>
<div>
<p className="font-label-bold text-label-bold text-on-surface">Défi: Phishing Expert</p>
<p className="font-body-md text-[12px] text-secondary">Complété hier</p>
</div>
</div>
<button className="tactile-button bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-label-bold text-label-bold">
            VALIDER
          </button>
</div>
</div>
</section>
{/* Quick Links / Bento-ish Grid */}
<section className="grid grid-cols-2 gap-4">
<button className="tactile-card bg-secondary-container p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-surface-container-highest transition-colors text-left group">
<div className="w-full">
<span className="material-symbols-outlined text-secondary text-3xl">analytics</span>
</div>
<p className="w-full font-label-bold text-label-bold leading-tight text-on-secondary-container">Rapports Mensuels</p>
</button>
<button className="tactile-card bg-tertiary-fixed p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-tertiary-fixed-dim transition-colors text-left">
<div className="w-full">
<span className="material-symbols-outlined text-tertiary text-3xl">manage_accounts</span>
</div>
<p className="w-full font-label-bold text-label-bold leading-tight text-on-tertiary-fixed-variant">Gérer la Famille</p>
</button>
</section>
{/* Encouragement Box */}
<div className="relative bg-surface-variant border-2 border-secondary rounded-xl p-6 mt-8 flex gap-4 overflow-hidden">
<div className="absolute -right-4 -bottom-4 w-24 h-24 opacity-20 transform rotate-12">
<span className="material-symbols-outlined text-9xl">security</span>
</div>
<div className="shrink-0">
<div className="w-16 h-16 bg-white border-2 border-secondary rounded-full flex items-center justify-center p-1 shadow-inner">
<img className="w-full h-full object-contain" alt="Close-up of the happy 3D cyber-shield mascot laughing with joy. The mascot is teal and blue with friendly digital eyes and a small antenna. Soft volumetric lighting and high-quality rendering make it look tangible and inviting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLIC3TnVhzoAAxGqRADYIcRviSoi0kCt26muwrFcxJYtNoj2neqrgPbgve2RyyTy4VD5CICRj7Rptu4N9RzAyOOAlC_kNzq8KlC7zRvITndvnRM3dpLsgqaAwRiCm9SkshQ81DaekGgKvz_l1jiRBG2QGMC84Ctpmw7eu8b5vgxP0qM6Pvg1aKWGJm1fBUnR-20bJq8fWblrlzXKZOld50-50epbjmB1zWUNorFO3ciQ_cqjM5aLEmx5w4XRdQWpGvQTLL4dFngTDG"/>
</div>
</div>
<div className="relative z-10">
<h4 className="font-label-bold text-on-surface mb-1">Bravo à toute l'équipe !</h4>
<p className="font-body-md text-[14px] text-secondary leading-snug">Votre famille a atteint 92% de score de cybersécurité ce mois-ci. Continuez ainsi !</p>
</div>
</div>
</main>
{/* BottomNavBar */}
<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface dark:bg-background px-margin-mobile pb-safe border-t-2 border-secondary dark:border-secondary-fixed rounded-t-xl h-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
<button className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed pt-3 pb-2 w-1/5 hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined">school</span>
<span className="font-label-bold text-[10px] mt-1">Learn</span>
</button>
<button className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed pt-3 pb-2 w-1/5 hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined">emoji_events</span>
<span className="font-label-bold text-[10px] mt-1">Quest</span>
</button>
<button className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed pt-3 pb-2 w-1/5 hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined">family_restroom</span>
<span className="font-label-bold text-[10px] mt-1">Family</span>
</button>
<button className="flex flex-col items-center justify-center text-primary dark:text-inverse-primary border-t-4 border-primary dark:border-inverse-primary pt-2 pb-2 w-1/5 translate-y-0.5 transition-transform duration-75">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
<span className="font-label-bold text-[10px] mt-1">Admin</span>
</button>
<button className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed pt-3 pb-2 w-1/5 hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined">person</span>
<span className="font-label-bold text-[10px] mt-1">Profile</span>
</button>
</nav>


    </div>
  );
}
