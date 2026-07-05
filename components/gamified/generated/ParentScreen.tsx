/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function ParentScreen() {
  return (
    <div className={"bg-background text-on-background font-body-md min-h-screen"}>

{/* Persistent SideNavBar */}
<aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest border-r-2 border-secondary flex flex-col gap-unit p-6 z-50 shadow-[4px_0_0_0_rgba(88,96,98,1)]">
<div className="mb-8">
<h1 className="text-headline-md font-headline-md text-primary tracking-tighter">CyberAmbassadeurs</h1>
</div>
<div className="flex flex-col gap-2 mb-8">
<div className="flex items-center gap-4 p-2 bg-surface-container rounded-xl border-2 border-secondary mb-4">
<div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
<img className="w-full h-full object-cover" alt="A friendly 3D cartoon avatar of a parental figure with kind eyes and professional yet approachable attire. The character is set against a clean, light-mode background with soft shadows and high-saturation primary red accents, maintaining a gamified but trustworthy aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-VhIdzYGZ3UXimLWFRW89Oh2f9SJ1WbnN1lwi2Grw6ldnNoTif1Txraa_6wjscxvqhFr_Bn45bQS1y6zYt9i9plobSpXSiPsruEkiCP7W6hUpdVLPV0_8QC1wQMA_AJMY-WPrFsomil9H9Ps3Oo7UGMpi0Vb1YlLxr5lWWquSMDfvhhU_afoQvZNrZObiAen71PP6IPqqhMp0twxVDv6z9IqTYxfwfPD70zan0P4DjD0J01qZMFg5mZs2XPImQjdRG5tQaWKkyrDF"/>
</div>
<div>
<p className="text-label-bold font-label-bold text-on-surface">Parent</p>
<p className="text-xs text-secondary font-bold">Lvl 12</p>
</div>
</div>
</div>
<nav className="flex flex-col gap-2 flex-1">
<a className="flex items-center gap-4 bg-primary-container text-on-primary-container rounded-xl border-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)] p-4 active:translate-y-1 active:shadow-none transition-all" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-label-bold text-label-bold uppercase">Dashboard</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high hover:translate-x-1 rounded-xl transition-all font-label-bold text-label-bold uppercase" href="#">
<span className="material-symbols-outlined" data-icon="school">school</span>
<span>Academy</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high hover:translate-x-1 rounded-xl transition-all font-label-bold text-label-bold uppercase" href="#">
<span className="material-symbols-outlined" data-icon="military_tech">military_tech</span>
<span>Leaderboard</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high hover:translate-x-1 rounded-xl transition-all font-label-bold text-label-bold uppercase" href="#">
<span className="material-symbols-outlined" data-icon="explore">explore</span>
<span>Quests</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high hover:translate-x-1 rounded-xl transition-all font-label-bold text-label-bold uppercase" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span>Settings</span>
</a>
</nav>
<div className="mt-auto pt-6 flex flex-col gap-2 border-t-2 border-secondary-fixed">
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold uppercase" href="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
<span>Help</span>
</a>
<a className="flex items-center gap-4 text-secondary p-4 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold uppercase" href="#">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
<span>Logout</span>
</a>
</div>
</aside>
{/* Main Content Area */}
<main className="ml-64 p-margin-desktop min-h-screen max-w-7xl">
{/* Header / Stats Bar */}
<header className="flex justify-between items-center mb-12">
<div>
<h2 className="text-display font-display text-on-surface uppercase">Dashboard</h2>
<p className="text-body-lg font-body-lg text-secondary">Suivi de la progression familiale</p>
</div>
<div className="flex gap-4">
<div className="bg-surface-container-lowest p-4 rounded-xl border-2 border-secondary chunky-shadow flex items-center gap-3">
<span className="material-symbols-outlined text-primary" data-icon="local_fire_department" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
<span className="font-headline-md text-headline-md">7 JOURS</span>
</div>
<div className="bg-surface-container-lowest p-4 rounded-xl border-2 border-secondary chunky-shadow flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary" data-icon="monetization_on" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
<span className="font-headline-md text-headline-md">1,250</span>
</div>
</div>
</header>
{/* Bento Grid Layout */}
<div className="grid grid-cols-12 gap-gutter">
{/* Hero Section: Child's Progress */}
<section className="col-span-8 bg-surface-container-lowest border-2 border-secondary chunky-shadow rounded-xl p-card-padding relative overflow-hidden">
<div className="relative z-10">
<div className="flex items-center gap-4 mb-6">
<div className="w-16 h-16 rounded-full border-4 border-primary p-1 bg-white overflow-hidden chunky-shadow-sm">
<img className="w-full h-full object-cover rounded-full" alt="A portrait of a young cyber ambassador, 'Marc Dupont', as a 3D Pixar-style character with goggles and a determined expression. The background is a vibrant gradient of deep red and soft white, matching the CyberAmbassadeurs energetic and gamified visual identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlU3oWZnGuQx_NV1U7pN5jXlVk_4yRamDPpvcD7QiXJWhfKGqtjofFA8nB9rGKViO4OPSwcT6sQxAQuOu9O0RCduGYGxIJ4hiYOnABg6okoRG0xVDW4Ig3Jpsi_SQrJ1RKH65-IDmjinxXqLfZjcHFp7pL9pLjIcwck9qS9eRbhkzujUNWwAXMnt0GkmVme-5AjG4UP9Z8R1M8H8jkcu6tz7EHohmq2bFFSt-eSRdudbU3foAVpfIblbDaVm7enb0sKhGr3VZ891rF"/>
</div>
<div>
<h3 className="text-headline-lg font-headline-lg text-on-surface">Marc Dupont</h3>
<p className="text-label-bold font-label-bold text-primary uppercase">AMBASSADEUR NIVEAU 14</p>
</div>
</div>
<div className="mb-8">
<div className="flex justify-between mb-2">
<span className="text-label-bold font-label-bold">XP TOTAL: 12,450</span>
<span className="text-label-bold font-label-bold text-secondary">550 XP restant</span>
</div>
<div className="w-full h-8 bg-surface-container border-2 border-secondary rounded-full overflow-hidden">
<div className="h-full bg-primary-container w-[85%] rounded-r-full transition-all duration-1000"></div>
</div>
</div>
<div className="grid grid-cols-3 gap-4">
<div className="bg-surface-container-low p-4 rounded-xl border-2 border-secondary text-center">
<span className="material-symbols-outlined text-primary text-3xl mb-1" data-icon="verified">verified</span>
<p className="text-xs font-bold uppercase text-secondary">Modules</p>
<p className="text-xl font-black">24/30</p>
</div>
<div className="bg-surface-container-low p-4 rounded-xl border-2 border-secondary text-center">
<span className="material-symbols-outlined text-tertiary text-3xl mb-1" data-icon="stars">stars</span>
<p className="text-xs font-bold uppercase text-secondary">Badges</p>
<p className="text-xl font-black">12</p>
</div>
<div className="bg-surface-container-low p-4 rounded-xl border-2 border-secondary text-center">
<span className="material-symbols-outlined text-on-surface text-3xl mb-1" data-icon="trending_up">trending_up</span>
<p className="text-xs font-bold uppercase text-secondary">Rang</p>
<p className="text-xl font-black">Top 15%</p>
</div>
</div>
</div>
{/* 3D Mascot Decorative */}
<div className="absolute bottom-0 right-0 w-48 h-48 opacity-20 pointer-events-none transform translate-x-8 translate-y-8">
<img className="w-full h-full object-contain" alt="A stylized 3D robot mascot from the CyberAmbassadeurs universe, featuring rounded forms, glowing pink sensors, and a friendly posture. The aesthetic is high-gloss with hard-edge shading, consistent with the gamified-corporate design system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfYZsdHQWOGCb46TF0JbGxwJXaV7kIelUFAsQOP05AwxD4JhRJpULe6s4oAWaVrgn3TzT-lzwpoE15x1V5Ht5a1zhzgf7RNlgSYSwWHQNu1FyjSZPZy6evmazIii0P5-zK0lbYlH9oy10VCJquzCGl8cPg0TqeXdYPopwiWqOgrlZLcHRRIPmMKBSNqNLAOEBMW22rXjB3TFJdb2FhASoGMHuIMs5moXuAxStoEPtSOAScR3XnSrOYW-_oSkwkvXPp3VETDMxJXaa9"/>
</div>
</section>
{/* Side Widgets Column */}
<div className="col-span-4 flex flex-col gap-gutter">
{/* Monthly Reports */}
<button className="bg-surface-container-lowest border-2 border-secondary rounded-xl p-card-padding chunky-shadow hover:translate-y-1 hover:shadow-none transition-all text-left group">
<div className="flex items-center gap-4 mb-2">
<div className="bg-tertiary-container p-3 rounded-lg border-2 border-secondary group-hover:rotate-3 transition-transform">
<span className="material-symbols-outlined text-on-tertiary-container" data-icon="analytics" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
</div>
<h4 className="text-headline-md font-headline-md text-on-surface leading-tight">Rapports Mensuels</h4>
</div>
<p className="text-body-md font-body-md text-secondary">Consultez les analyses d'activité de Marc.</p>
</button>
{/* Manage Family */}
<button className="bg-surface-container-lowest border-2 border-secondary rounded-xl p-card-padding chunky-shadow hover:translate-y-1 hover:shadow-none transition-all text-left group">
<div className="flex items-center gap-4 mb-2">
<div className="bg-secondary-container p-3 rounded-lg border-2 border-secondary group-hover:-rotate-3 transition-transform">
<span className="material-symbols-outlined text-on-secondary-container" data-icon="family_restroom">family_restroom</span>
</div>
<h4 className="text-headline-md font-headline-md text-on-surface leading-tight">Gérer la Famille</h4>
</div>
<p className="text-body-md font-body-md text-secondary">Ajouter des comptes ou modifier les droits.</p>
</button>
</div>
{/* Approvals Section */}
<section className="col-span-12 bg-surface-container-lowest border-2 border-secondary chunky-shadow rounded-xl p-card-padding">
<div className="flex items-center justify-between mb-8">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary text-4xl" data-icon="notification_important" style={{ fontVariationSettings: "'FILL' 1" }}>notification_important</span>
<h3 className="text-headline-lg font-headline-lg text-on-surface">Validations en attente</h3>
</div>
<span className="bg-error-container text-on-error-container px-4 py-1 rounded-full font-bold text-label-bold uppercase">2 Actions Requises</span>
</div>
<div className="space-y-4">
{/* Approval Item 1 */}
<div className="flex items-center justify-between p-6 bg-surface-container-low border-2 border-secondary rounded-xl border-dashed">
<div className="flex items-center gap-6">
<div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center border-2 border-secondary chunky-shadow-sm">
<span className="material-symbols-outlined text-on-primary-container" data-icon="assignment_turned_in">assignment_turned_in</span>
</div>
<div>
<h5 className="text-headline-md font-headline-md text-on-surface">Quiz Final : Sécurité Réseaux</h5>
<p className="text-body-md font-body-md text-secondary">Complété le 15 Octobre • Score : 95%</p>
</div>
</div>
<button className="bg-primary text-on-primary font-label-bold text-label-bold px-8 py-3 rounded-xl border-b-4 border-on-primary-fixed-variant border-x-2 border-t-2 border-secondary chunky-shadow-sm active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest">
                            Valider
                        </button>
</div>
{/* Approval Item 2 */}
<div className="flex items-center justify-between p-6 bg-surface-container-low border-2 border-secondary rounded-xl border-dashed">
<div className="flex items-center gap-6">
<div className="w-12 h-12 bg-tertiary-container rounded-lg flex items-center justify-center border-2 border-secondary chunky-shadow-sm">
<span className="material-symbols-outlined text-on-tertiary-container" data-icon="phishing">phishing</span>
</div>
<div>
<h5 className="text-headline-md font-headline-md text-on-surface">Mission : Phishing Expert</h5>
<p className="text-body-md font-body-md text-secondary">Complété le 14 Octobre • Détecté 12/12 menaces</p>
</div>
</div>
<button className="bg-primary text-on-primary font-label-bold text-label-bold px-8 py-3 rounded-xl border-b-4 border-on-primary-fixed-variant border-x-2 border-t-2 border-secondary chunky-shadow-sm active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest">
                            Valider
                        </button>
</div>
</div>
</section>
{/* Community / Motivation Footer Card */}
<section className="col-span-12 mt-4">
<div className="bg-on-tertiary-fixed text-on-tertiary-container rounded-3xl p-8 border-2 border-secondary chunky-shadow relative flex items-center gap-8 overflow-hidden">
<div className="flex-1 relative z-10">
<h3 className="text-display font-display text-tertiary-fixed mb-4">"Marc est sur une lancée incroyable !"</h3>
<p className="text-body-lg font-body-lg opacity-90 max-w-2xl">
                            Il a passé plus de 4 heures à apprendre la cybersécurité cette semaine. En validant ses missions, vous encouragez sa progression vers le grade de <span className="font-black text-primary">Cyber Expert</span>.
                        </p>
<div className="mt-6 flex items-center gap-2">
<div className="flex -space-x-4">
<div className="w-10 h-10 rounded-full border-2 border-white bg-secondary overflow-hidden">
<img className="w-full h-full object-cover" alt="A small circular profile icon of a person." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyEIKDXrpyAOLdNZRGNFcYfkjRSABQRrNDdemJxeDQOgemxpK-EcWJieN7Klq3Ua26uGOHYIsR4fTE-IZ7nXjPBY3-Qi1oJpIUC89hxD8hXQMTvK70Bm4ugKUHKLy_X19LGBIOrTn6cvooaPY25Xk2r3lHas2Z1ZqMMrwyGUKzj790kG0UifhYKUVI2E9531lbsqud152xs--I-W2qM1DKuovjx7igNgMt4J9JhAQ4sdfT4LP6CXnaBnxw0A7qypKPB4IZ34N7nYvv"/>
</div>
<div className="w-10 h-10 rounded-full border-2 border-white bg-primary overflow-hidden">
<img className="w-full h-full object-cover" alt="A small circular profile icon of another person." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoSRcGroAFzEAk-2ZJs4t71yZcrZHwQx9hZJB3ocw06lZvanjJlL_jDb09mzRq4iNoavyPV8T9PwvpTU8HSzmlbR7L5j2U-KYklY_WfR1MQZNBN85nKkOpUgmI7o8yzkzotmOjm0RfbNxAQwA3r1eOw_CSPRvVMBKS-t1s35bArVabbMYcV3tB-HDz3jCTDLr9Epc58gMve3PpjsEIAhHXyzQIgBXCqEHtkh1KeoOVVkoB1tkA_wN5MaO2qZ1M4XJvhhSfm5Irm6Je"/>
</div>
<div className="w-10 h-10 rounded-full border-2 border-white bg-tertiary overflow-hidden">
<img className="w-full h-full object-cover" alt="A small circular profile icon of a third person." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkCtSOxouGJFcfQZQue3lEwVtXsBh9TbVCvVv9rYKcQYbcnwE593-9W8C6gSnhs6fgfxVY_a4G8t6tis8DSAl40m7rjSkpQVVfXZscRblSBKQiqSWvTKRgyoDT84EYjLse5Ea-IQlutv2YlhKqWBf_FqIcEYPV17jiDB358zjkrH5mA7z_QAQaaU-2C11yd9Jnh1UidOm6PiJs0_cjeDCgX0F5C-MT3h3mL5EViQd09H_eg2ijrwa9jE07isRX-UAc6WJMxilkGReE"/>
</div>
</div>
<span className="text-label-bold font-label-bold ml-4">Partagé par 420 autres parents cette semaine</span>
</div>
</div>
<div className="w-48 h-48 relative z-10">
<div className="w-full h-full bg-surface-container rounded-full border-4 border-tertiary-fixed p-2 chunky-shadow-sm flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" alt="A friendly cyber-security mascot character, a small high-tech fox with glowing blue digital eyes, winking and giving a thumbs up. The character is highly rendered with 3D depth, soft fur textures, and metallic armor pieces, set against a dark, tech-inspired background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYlMhrcZrPKuWTum_PIld5f2V-9Ychj7zjIzV97fzxDaDXZr-Z5vkGI-ip5RbanTKHfhpUSMzKMe7f9Kdp8bHYsB3N-Y8mkSqHlTYs6JddvltJzCG3ujlOBWMbQd1h-bVhP9QFb7h9Z2Dni5L6SRQOHhmArRgP7_FXGgZDtcRP2r4BtSV_ps6a4wQ-OX_XQURwcVXljgt7fCH9ADCJpvSiINSEtD5R2tgKKJOwur9I1iJEcyWoQfge4GVINNqTLxA95wGjGxlegjHl"/>
</div>
</div>
{/* Decorative Grid Pattern */}
<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
</div>
</section>
</div>
</main>


    </div>
  );
}
