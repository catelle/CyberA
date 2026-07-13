/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function AcademieScreen() {
  return (
    <div className={"bg-surface text-on-surface"}>

{/* Side Navigation (Authority: SideNavBar JSON) */}
<aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest border-r-2 border-secondary shadow-[4px_0_0_0_rgba(88,96,98,1)] flex-col gap-unit p-6 z-50">
<div className="mb-8">
<h1 className="text-headline-md font-headline-md text-primary tracking-tighter font-black">CYBER</h1>
<h1 className="text-headline-md font-headline-md text-primary tracking-tighter font-black mt-[-8px]">AMBASSADEURS</h1>
</div>
<div className="mb-8 p-4 bg-surface-container-high rounded-xl border-2 border-secondary">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-tertiary-fixed flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" alt="A 3D stylized character portrait of a friendly digital ambassador mascot, wearing a headset and a bright blue uniform, clean clay-style render with soft lighting on a white background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAajARBQAAHsd1GgIpVm0XereFw0QuAiVtgYjdUAnwpUjublvU3X3A6iR-P-EifMyXjp8nLb4_NxBqOrkduSttxqlsTUvaMLVrjSLWvfmS9EppwA7SDPPOadPLIb6kwxFc8iIMuit_3Qd_HNrfreenrAY8800h7Er_cJb9nSGKuz-drVCOoDaDwlBfBa5r3z9qEV2vqE7-EplYw1QtPn1gHjdLP25VjxKo0zMtKj-HoMZSSWV48840BoGKdfBBkzD808dmmzlnuwGhP"/>
</div>
<div>
<p className="text-label-bold font-label-bold text-on-surface">Ambassador Lvl 12</p>
<p className="text-[10px] text-secondary font-bold">2,450 XP to Lvl 13</p>
</div>
</div>
<div className="mt-3 progress-track">
<div className="progress-fill bg-primary" style={{ width: "65%" }}></div>
</div>
</div>
<nav className="flex flex-col gap-2 flex-grow">
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-bold">Dashboard</span>
</a>
<a className="flex items-center gap-4 bg-primary-container text-on-primary-container rounded-xl border-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)] p-4 translate-y-1 shadow-none" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label-bold">Academy</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1" href="#">
<span className="material-symbols-outlined">military_tech</span>
<span className="font-label-bold">Leaderboard</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1" href="#">
<span className="material-symbols-outlined">explore</span>
<span className="font-label-bold">Quests</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high rounded-xl transition-all hover:translate-x-1" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-bold">Settings</span>
</a>
</nav>
<div className="mt-auto flex flex-col gap-2 pt-6 border-t-2 border-secondary-fixed">
<a className="flex items-center gap-4 text-secondary p-2 hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-label-bold">Help</span>
</a>
<a className="flex items-center gap-4 text-secondary p-2 hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-label-bold">Logout</span>
</a>
</div>
</aside>
{/* Main Content Canvas */}
<main className="md:ml-64 min-h-screen">
{/* TopNavBar (Authority: TopNavBar JSON) */}
<header className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-7xl mx-auto border-b-2 border-secondary bg-surface shadow-[0_4px_0_0_rgba(88,96,98,1)] sticky top-0 z-40">
<div className="md:hidden">
<span className="text-headline-md font-black text-primary uppercase tracking-tighter">CYBER</span>
</div>
<div className="hidden md:flex items-center gap-8">
<a className="text-secondary font-bold pb-1 hover:text-primary-container transition-colors" href="#">Missions</a>
<a className="text-primary font-bold border-b-4 border-primary pb-1" href="#">Modules</a>
<a className="text-secondary font-bold pb-1 hover:text-primary-container transition-colors" href="#">Shop</a>
</div>
<div className="flex items-center gap-4">
<div className="hidden sm:flex items-center gap-2 bg-secondary-container px-3 py-1 rounded-full border-2 border-secondary">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
<span className="font-bold">5 Jours</span>
</div>
<div className="flex items-center gap-2 bg-tertiary-fixed px-3 py-1 rounded-full border-2 border-secondary">
<span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
<span className="font-bold">1,250</span>
</div>
<button className="material-symbols-outlined text-secondary hover:text-primary">notifications</button>
<div className="w-10 h-10 rounded-xl border-2 border-secondary bg-white overflow-hidden shadow-[2px_2px_0_0_rgba(88,96,98,1)]">
<img className="w-full h-full object-cover" alt="A diverse young woman with braided hair holding a tablet, smiling, 3D character design, clay-like smooth texture, vibrant blue and purple clothing, soft studio lighting, high resolution game asset style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoZao1ob9abIlioGaZwblG0rvV-UkUATFse12DrQQqqFQ5xvx_c3kimYLPvrqOPajsbyjEvBw6WtGbBeJyWPVU7TEavTNh22JXlTCO7rMwLfyDaieOAH2ak1I7fXRUMPuZksPq0-fyZkWp1PndIALjoFGH-PSQ1_saiK0SbA3wI_txvd4agUEYqEZup6nQzdaf65W3MNG9CEArm09vr9Pf0KXf4BcEkpJBJzCn0ymt6-fwjgXhAqf5-mZkSBwfwjn4KixTQ4rwzJI5"/>
</div>
</div>
</header>
<div className="max-w-6xl mx-auto p-margin-mobile md:p-margin-desktop space-y-12">
{/* Welcome Section */}
<section className="space-y-4">
<div className="flex items-center gap-4">
<h2 className="text-display font-display text-on-surface">Academy</h2>
<span className="bg-primary text-white px-4 py-1 rounded-full text-label-bold font-black border-2 border-secondary shadow-[3px_3px_0_0_rgba(88,96,98,1)]">Saison 1</span>
</div>
<p className="text-body-lg text-secondary max-w-2xl">
          Deviens un véritable gardien du Web. Termine les modules pour débloquer de nouveaux équipements et grimper dans le classement des CyberAmbassadeurs.
        </p>
</section>
{/* Mission Grid (Bento Pattern) */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
{/* Module 1: Completed */}
<div className="tactile-card bg-surface-container-lowest rounded-2xl p-card-padding flex flex-col gap-4 relative overflow-hidden group">
<div className="absolute top-4 right-4 bg-tertiary text-white p-2 rounded-full border-2 border-secondary z-10">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<div className="h-48 bg-tertiary-fixed rounded-xl border-2 border-secondary flex items-center justify-center overflow-hidden relative">
<img className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300" alt="A friendly 3D shield character mascot with a smiling face and glowing blue orbits, bright green and blue metallic finish, high-quality 3D render, playful tech aesthetic, white studio background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyGwAR_GyEM3Jw_WMzUYxTEWmW9L6oftyZs47cGO6Obq0Ryclk1N_ZbUtxG4HOcW4Gmm41HLOgTh_rwMignEOk80QqZmP8LKzoxoJLNDSxpLkb4uTyCTPrjufETNtmHbKEKNT2JvmaStTVp4vdCEwiEnXgLsLG9AkWMng8aTj2Gif37j2svQBS3c3AEUYpcY5S38zHFRyga899kkfF2sCdBGlf2LOjsqNcZfPBEJHxrQvFGC99Jk3EzHEcRqUNa67mzc2Mc1e2CsPB"/>
</div>
<div className="space-y-2">
<div className="flex justify-between items-center">
<span className="text-label-bold text-tertiary uppercase">Cyber-Fondation</span>
<span className="text-label-bold text-secondary">100%</span>
</div>
<h3 className="text-headline-md font-headline-md text-on-surface">Risques en ligne</h3>
<p className="text-body-md text-secondary">Apprends à identifier les menaces courantes et à protéger tes données personnelles.</p>
</div>
<button className="mt-auto tactile-button bg-tertiary-fixed text-tertiary font-black py-4 rounded-xl border-secondary">
            REVOIR LA MISSION
          </button>
</div>
{/* Module 2: In Progress */}
<div className="tactile-card bg-surface-container-lowest rounded-2xl p-card-padding flex flex-col gap-4 relative overflow-hidden group">
<div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full border-2 border-secondary z-10 text-label-bold">
            EN COURS
          </div>
<div className="h-48 bg-primary-fixed rounded-xl border-2 border-secondary flex items-center justify-center overflow-hidden relative">
<img className="w-40 h-40 object-contain group-hover:scale-110 transition-transform duration-300" alt="A cool 3D teen boy character mascot wearing a purple beanie and a jacket with glowing digital circuit patterns on the sleeves, holographic wrist display, friendly smile, clean 3D clay aesthetic, high saturation colors." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBSpTrlkV7WBMAcHjLHeHoP9T4t0htHMUPX0jisYOeuWCyyZAbGf-EfSPu1pfpa7myXCeuArx6E1lOqyI86pQvN2ZdMHmwJ2quCW6et1p_IkmGaF11fVOxdClYd_4cj-IYIqGRcuvJ6nqbEFah_bsWHd3GETRSfoQ46uXxrt5dyTttIag12PW8X5EXbRYRhchz-CrSBRwZEFSfxMltCGf7EbRsWD3Z2kpQxqLWMdhg-ReLZ2EJYwyiO59QQ1AGooKZOw2Hwjx1CMG4"/>
</div>
<div className="space-y-2">
<div className="flex justify-between items-center">
<span className="text-label-bold text-primary uppercase">Pratiques Saines</span>
<span className="text-label-bold text-secondary">45%</span>
</div>
<h3 className="text-headline-md font-headline-md text-on-surface">Hygiène numérique</h3>
<p className="text-body-md text-secondary">Mots de passe, mises à jour et double authentification. Les bases de ta sécurité.</p>
</div>
<div className="progress-track mt-2">
<div className="progress-fill bg-primary" style={{ width: "45%" }}></div>
</div>
<button className="mt-auto tactile-button bg-primary-container text-white font-black py-4 rounded-xl border-secondary">
            CONTINUER (NIV 12)
          </button>
</div>
{/* Module 3: Locked */}
<div className="tactile-card locked bg-surface-container-high rounded-2xl p-card-padding flex flex-col gap-4 relative overflow-hidden group grayscale">
<div className="absolute top-4 right-4 bg-secondary text-white p-2 rounded-full border-2 border-secondary z-10">
<span className="material-symbols-outlined">lock</span>
</div>
<div className="h-48 bg-secondary-fixed rounded-xl border-2 border-secondary flex items-center justify-center overflow-hidden relative">
<img className="w-40 h-40 object-contain" alt="An elderly woman 3D character mascot with grey hair, pointing at a floating holographic interface, wearing a smart watch, modern professional mentor style, clean clay render, soft lighting, tech-focused." src="https://lh3.googleusercontent.com/aida-public/AB6AXuARyCATmBGs5oQNj0Y5QlT9Q9r96TMmRAy710Knhq1it0RErwpRnZwiNQaiHMKztltU8NW72ZnO1cvO7jPdBkbe5OcKxlsxq7g5UdvKIz8q-naQaE2aFG7kZBO6Pf3CTAv_ppPM42qaXVzMd28p7-rb-ErrLQmeq124Xb6iTDRonxUEHwrSBI75CPEzIgL9r66DUtN5hxrTs0yRkHqj8-6mWNowa9D6L8q9LR-pahR-z9kyyiiJef9PXsdqviQPSRCkfTvOFmw3CBPO"/>
</div>
<div className="space-y-2 opacity-60">
<div className="flex justify-between items-center">
<span className="text-label-bold text-secondary uppercase">Expertise</span>
<span className="text-label-bold text-secondary">BLOQUÉ</span>
</div>
<h3 className="text-headline-md font-headline-md text-on-surface">Leadership Citoyen</h3>
<p className="text-body-md text-secondary">Comment accompagner les autres et devenir un pilier de ta communauté numérique.</p>
</div>
<div className="mt-auto bg-secondary/10 border-2 border-dashed border-secondary rounded-xl py-3 px-4 text-center">
<span className="text-label-bold text-secondary">DÉBLOQUE AU NIVEAU 15</span>
</div>
<button className="mt-2 tactile-button bg-surface-dim text-secondary font-black py-4 rounded-xl border-secondary opacity-50" disabled>
            BLOQUÉ
          </button>
</div>
</section>
{/* XP Path / Progress visualization */}
<section className="bg-surface-container-lowest border-2 border-secondary rounded-3xl p-8 shadow-[8px_8px_0_0_rgba(88,96,98,1)]">
<div className="flex flex-col md:flex-row items-center justify-between gap-8">
<div className="space-y-4 max-w-md">
<h3 className="text-headline-lg font-headline-lg text-on-surface">Ton Chemin</h3>
<p className="text-body-md text-secondary">Chaque mission complétée te rapproche du badge "Ambassadeur d'Or". Continue tes efforts !</p>
<div className="flex gap-4">
<div className="flex flex-col items-center gap-1">
<div className="w-14 h-14 rounded-full border-2 border-secondary bg-primary-fixed flex items-center justify-center shadow-[3px_3px_0_0_rgba(88,96,98,1)]">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
</div>
<span className="text-[10px] font-black uppercase text-secondary">Bronze</span>
</div>
<div className="flex flex-col items-center gap-1">
<div className="w-14 h-14 rounded-full border-2 border-secondary bg-secondary-fixed flex items-center justify-center shadow-[3px_3px_0_0_rgba(88,96,98,1)]">
<span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
</div>
<span className="text-[10px] font-black uppercase text-secondary">Argent</span>
</div>
<div className="flex flex-col items-center gap-1">
<div className="w-14 h-14 rounded-full border-2 border-secondary bg-surface-container-highest flex items-center justify-center grayscale">
<span className="material-symbols-outlined text-secondary">military_tech</span>
</div>
<span className="text-[10px] font-black uppercase text-secondary opacity-40">Or</span>
</div>
</div>
</div>
<div className="flex-grow flex items-center justify-center p-6 relative">
<div className="absolute inset-0 flex items-center px-10">
<div className="h-2 w-full bg-secondary-fixed rounded-full">
<div className="h-full bg-primary rounded-full w-2/3"></div>
</div>
</div>
<div className="w-full flex justify-between relative z-10">
<div className="w-10 h-10 rounded-full bg-primary border-2 border-secondary flex items-center justify-center text-white">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
</div>
<div className="w-12 h-12 rounded-full bg-primary-container border-2 border-secondary flex items-center justify-center text-white ring-4 ring-primary-fixed animate-pulse">
<span className="font-black text-sm">12</span>
</div>
<div className="w-10 h-10 rounded-full bg-surface border-2 border-secondary flex items-center justify-center text-secondary">
<span className="font-black text-sm">13</span>
</div>
<div className="w-10 h-10 rounded-full bg-surface border-2 border-secondary flex items-center justify-center text-secondary">
<span className="font-black text-sm">14</span>
</div>
</div>
</div>
</div>
</section>
</div>
{/* Mobile Navigation (Visible on md:hidden) */}
<nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t-2 border-secondary p-4 flex justify-around items-center z-50">
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-[10px] font-bold">Home</span>
</button>
<button className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
<span className="text-[10px] font-bold">Academy</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">explore</span>
<span className="text-[10px] font-bold">Quests</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined">military_tech</span>
<span className="text-[10px] font-bold">Rank</span>
</button>
</nav>
{/* Floating Action Button (Supressed on Details/Academy, but added here for the 'START MISSION' mandate in side nav footer) */}
<button className="hidden md:flex fixed bottom-8 right-8 bg-primary-container text-white px-8 py-4 rounded-full border-2 border-secondary shadow-[0_6px_0_0_rgba(88,96,98,1)] active:translate-y-1 active:shadow-none transition-all items-center gap-3 font-black z-50">
<span className="material-symbols-outlined">play_arrow</span>
      START MISSION
    </button>
</main>


    </div>
  );
}
