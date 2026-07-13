/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function CommunauteScreen() {
  return (
    <div className={"bg-background text-on-background font-body-md kinetic-bg"}>

{/* TopNavBar */}
<header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b-2 border-secondary flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4">
<div className="flex items-center gap-4">
<h1 className="font-display text-headline-md text-primary">Cyberambassadeurs</h1>
</div>
<div className="flex items-center gap-4 md:gap-8">
<nav className="hidden md:flex gap-6 items-center">
<a className="text-primary font-bold border-b-2 border-primary font-label-bold text-label-bold" href="#">Hub</a>
<a className="text-on-surface-variant hover:text-primary transition-colors font-label-bold text-label-bold" href="#">Missions</a>
<a className="text-on-surface-variant hover:text-primary transition-colors font-label-bold text-label-bold" href="#">Shop</a>
</nav>
<div className="flex items-center gap-3">
<button className="material-symbols-outlined text-secondary hover:text-primary p-2">notifications</button>
<button className="material-symbols-outlined text-secondary hover:text-primary p-2">settings</button>
<div className="w-10 h-10 rounded-full border-2 border-secondary bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover" alt="A portrait of a young cyber-security student wearing modern glasses and a tech-oriented outfit, rendered in a friendly, high-quality 3D digital art style consistent with a modern educational gaming platform. The background is a soft, blurred tech laboratory." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6RF69-T0-4XPeugH8FWkXNflr3hcx_H0YbN40Jp8Vgsyp_zs62qcTsdg_9Z0QeU7M_PdFNGJhGNjyrijyxf99sMpJOEDqYKcvYIIqI1QqlkGmGlNwz38BSz_6a0Or3_f98rS64uugoP3qBYYR52O5JE555JiFChxCHivnfQP16h1RFmE4w-Pn4HD2j38tb66YQxmCmweYFNkOreKIN8tKNJUxV4mNqU9zH72syChdhT3tC0aUPDlTEavaNQVLeglvNEF6kCvKZjN"/>
</div>
</div>
</div>
</header>
{/* SideNavBar (Desktop) */}
<aside className="hidden lg:flex flex-col h-screen fixed left-0 top-0 p-4 gap-4 bg-surface-container-lowest border-r-2 border-secondary shadow-[4px_0_0_0_#586062] w-64 pt-24">
<div className="p-4 bg-surface-container rounded-xl border-2 border-secondary mb-4">
<div className="flex items-center gap-3 mb-2">
<div className="w-12 h-12 rounded-lg border-2 border-primary bg-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
</div>
<div>
<p className="font-label-bold text-label-bold text-primary uppercase">Recruit</p>
<p className="text-on-surface-variant text-xs">Level 4 • 1,200 XP</p>
</div>
</div>
<div className="w-full bg-surface-container-high h-4 rounded-full border-2 border-secondary overflow-hidden">
<div className="bg-primary h-full w-3/4 rounded-r-full"></div>
</div>
</div>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">rocket_launch</span> Missions
            </a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">military_tech</span> Levels
            </a>
<a className="flex items-center gap-3 bg-primary text-on-primary rounded-xl p-3 border-b-4 border-on-primary-fixed-variant translate-y-[2px] font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span> Community Hub
            </a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">storefront</span> Shop
            </a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">workspace_premium</span> Trophies
            </a>
</nav>
<div className="mt-auto flex flex-col gap-2 border-t-2 border-surface-variant pt-4">
<a className="flex items-center gap-3 text-secondary p-2 hover:text-primary font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">help</span> Help
            </a>
<a className="flex items-center gap-3 text-secondary p-2 hover:text-error font-label-bold text-label-bold" href="#">
<span className="material-symbols-outlined">logout</span> Logout
            </a>
</div>
</aside>
{/* Main Content Canvas */}
<main className="lg:ml-64 pt-24 px-margin-mobile md:px-margin-desktop pb-12">
<div className="max-w-[1200px] mx-auto">
{/* Hero Section: Ambassador of the Month (Asymmetric Layout) */}
<section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-16">
<div className="lg:col-span-8 bg-surface-container-lowest border-2 border-secondary p-card-padding rounded-xl drop-block relative overflow-hidden flex flex-col justify-center min-h-[320px]">
<div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">

</div>
<span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-xs font-label-bold uppercase w-fit mb-4 border-2 border-secondary">Monthly Spotlight</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Ambassadeur du Mois</h2>
<p className="text-body-lg text-on-surface-variant mb-6 max-w-md">Félicitations à <strong>Marc N.</strong> de Douala pour ses 15 interventions de sensibilisation réussies ce mois-ci !</p>
<div className="flex gap-4">
<button className="bg-primary text-on-primary px-6 py-3 rounded-lg border-2 border-secondary border-b-4 border-on-primary-fixed-variant active:translate-y-[2px] active:border-b-2 font-label-bold transition-all">Voir son Profil</button>
<button className="bg-surface text-secondary px-6 py-3 rounded-lg border-2 border-secondary border-b-4 active:translate-y-[2px] active:border-b-2 font-label-bold transition-all">Lui Dire Bravo</button>
</div>
</div>
<div className="lg:col-span-4 bg-primary-fixed border-2 border-secondary p-card-padding rounded-xl drop-block flex flex-col items-center justify-center text-center">
<div className="w-48 h-48 bg-surface-container rounded-full border-4 border-primary mb-4 relative overflow-hidden shadow-inner">
<img className="w-full h-full object-cover" alt="A detailed 3D avatar character of a young male student named Marc, wearing a cool tech hoodie with a cyber-shield emblem. The character is giving a thumbs up with a confident smile, rendered in a vibrant Pixar-style animation aesthetic. High quality lighting and textures." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNNraAkPOZ3Nfd_2h4eSLiMo0p7joGfB6ME8dv7denpvmctpML9eleuQ7So7RwJpksCW_vidWxA5QfbJeOPFavsY0vbfx-SEjR-8ynCbu61eWXmb_vbEKuo0CM1RuwpduBoWpI9qAyUcsUmSQzeCe87G5bSuiHqIhjtbALKs-j1B8bwYtWm5xgGyO50YJbFj4TwEarCI7y8gzWogzncyTn5acqMDBEPSw0QFARRd4dHAh1nDLEQMlKk_Ej5OYtYDewAoC0js0kDnh3"/>
</div>
<p className="font-headline-md text-headline-md text-primary mb-1">Marc N.</p>
<div className="flex gap-1 justify-center">
<span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
<span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
<span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
</div>
<p className="text-label-bold font-label-bold text-on-primary-fixed-variant mt-2 uppercase">Elite Guardian</p>
</div>
</section>
{/* Forum Style Activity Feed & Clubs (Bento Grid) */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
{/* Left: Regional Clubs */}
<section className="md:col-span-1 space-y-6">
<h3 className="font-headline-md text-headline-md mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">location_on</span> Clubs Régionaux
                    </h3>
{/* Club Card 1 */}
<div className="bg-surface-container-lowest border-2 border-secondary p-4 rounded-xl drop-block hover:scale-[1.02] transition-transform">
<div className="h-32 w-full rounded-lg bg-secondary-container mb-4 overflow-hidden border-2 border-secondary">
<div className="w-full h-full bg-cover bg-center" aria-label="A cinematic photo of a modern technology hub in Douala, Cameroon, featuring young students collaborating around bright screens and fiber optic light installations. The atmosphere is energetic, professional, and optimistic, with bright daylight and high-contrast styling." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQgg4M3dG1ag1yiZdRrjDATztBrkoQpYc12wbr55hmHrMP1YZIzJD536grj7IRMfiDQhwxpD_-5dOj7-dEB5nZzEcpGwRZFHxShHovYeTjOE14Tzd1CG8g89BJFlUdvDWglfL8v1nBHjszTucQG37A9syRfjClwn6XTDstgOfi5RmKTT4i3HgFsJKw-uYIWbrReIfZVVHBHS35roh4fedOaGgNJZnO674r7iCy5ZOu2DMFLDaFLu8SUdBLQrrKw7LisHx3pti2ej0z')" }}></div>
</div>
<h4 className="font-label-bold text-lg text-on-surface mb-1">Douala Tech Hub</h4>
<p className="text-sm text-on-surface-variant mb-4">42 Membres • 5 Missions actives</p>
<button className="w-full bg-secondary text-on-secondary py-2 rounded-lg border-2 border-on-secondary-container border-b-4 active:translate-y-[2px] active:border-b-2 font-label-bold uppercase text-xs tracking-wider">Rejoindre</button>
</div>
{/* Club Card 2 */}
<div className="bg-surface-container-lowest border-2 border-secondary p-4 rounded-xl drop-block hover:scale-[1.02] transition-transform">
<div className="h-32 w-full rounded-lg bg-secondary-container mb-4 overflow-hidden border-2 border-secondary">
<div className="w-full h-full bg-cover bg-center" aria-label="A modern university campus architecture in Yaoundé, Cameroon, stylized as a digital growth platform interface. Soft sunset lighting, glowing digital elements floating in the air, representing a connected community of cyber-ambassadors." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcivPj57ccFpcx7ow_j8ekXRV6Jm6QrQe8s3LNObMS3C6vMfAj2mpIcFD3anIuL3Ynge6oRTTK0X6woPUsZHN1HeluIhWAmjewxKjMZR9tQLqCfVSeGnDOyYC7GPvM52a50UyrhEhLTnuaj4ZcaapLFr4GbvZaMqjfs7QVzojX9tkUiF-acxorFJzIZ2GNjyRuTw2CSoq5D6O-RDN3EFC3A5_1tTAuppbLtpsxj5-DoN65oZ3aMkcWYha8mRrGmqe_9lqSdsRYWXlR')" }}></div>
</div>
<h4 className="font-label-bold text-lg text-on-surface mb-1">Yaoundé Cyber</h4>
<p className="text-sm text-on-surface-variant mb-4">38 Membres • 3 Missions actives</p>
<button className="w-full bg-secondary text-on-secondary py-2 rounded-lg border-2 border-on-secondary-container border-b-4 active:translate-y-[2px] active:border-b-2 font-label-bold uppercase text-xs tracking-wider">Rejoindre</button>
</div>
</section>
{/* Center: Forum / Activity Feed */}
<section className="md:col-span-2 space-y-6">
<div className="flex justify-between items-center mb-4">
<h3 className="font-headline-md text-headline-md flex items-center gap-2">
<span className="material-symbols-outlined text-primary">forum</span> Fil d'Actualité
                        </h3>
<div className="flex gap-2">
<button className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-label-bold border-2 border-secondary">Récent</button>
<button className="px-3 py-1 bg-surface text-on-surface-variant rounded-full text-xs font-label-bold border-2 border-secondary opacity-50">Populaire</button>
</div>
</div>
{/* Forum Post 1 */}
<div className="bg-surface-container-lowest border-2 border-secondary p-card-padding rounded-xl drop-block">
<div className="flex items-start gap-4 mb-4">
<div className="w-12 h-12 rounded-full border-2 border-secondary bg-surface overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" alt="3D avatar of a cheerful female cyber security student with braided hair and cool digital visors, professional and gamified aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDayJ0wnnZxwTLbYXlopeCjv7sJvboCOx2_ZQ3XPAwWBNorWvSrQm9T6yn2cz4n7W6b6qNyq5vldgPn5ZkJDvOS40w-cDyq1AD7orP69WoVW4yqc5Ta-gw0FCWw16Z7m29CKwap2KT67p97Mh2O8R5dTspWWHlOEJlwjGq-Qsds4So3QZRaC6jsOW305nx-xo4CxGY44Ghv8pIEN1Sj27mxonSUbxFECnMKNFpl-rDyqpzsHATeHiqapq53sEaSKodRucNH8jUVC1eK"/>
</div>
<div className="flex-grow">
<div className="flex items-center gap-2 mb-1">
<span className="font-label-bold text-on-surface">Alice_Sec</span>
<span className="bg-primary-fixed text-primary px-2 py-0.5 rounded text-[10px] font-bold border border-primary">VETERAN</span>
<span className="text-xs text-on-surface-variant">• il y a 2h</span>
</div>
<h4 className="font-bold text-lg mb-2">Comment repérer un phishing sur WhatsApp ?</h4>
<p className="text-body-md text-on-surface-variant mb-4">J'ai créé une petite infographie pour ma classe aujourd'hui. Les gens cliquent encore trop sur les faux liens de promo...</p>
<div className="flex gap-6 border-t-2 border-surface-container pt-4">
<button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm font-label-bold">
<span className="material-symbols-outlined text-lg">thumb_up</span> 24
                                    </button>
<button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm font-label-bold">
<span className="material-symbols-outlined text-lg">chat_bubble</span> 8 Réponses
                                    </button>
<button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm font-label-bold">
<span className="material-symbols-outlined text-lg">share</span> Partager
                                    </button>
</div>
</div>
</div>
</div>
{/* Forum Post 2 */}
<div className="bg-surface-container-lowest border-2 border-secondary p-card-padding rounded-xl drop-block">
<div className="flex items-start gap-4 mb-4">
<div className="w-12 h-12 rounded-full border-2 border-secondary bg-surface overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" alt="3D avatar of a tech-savvy student with a headset and a focused expression, high fidelity textures, bright studio lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrATIWhNOfmVkf-n4c9j-J4Oby1-JsNKV1ZVbilGnjfV9AJeJz45Nds5BkHAIg2ZoN8MkBTxB1OdDN3mSKiFLvTXxNgBY9IbosiQOFh2Gym6Zg8lBJqrXtAsv81CWOQIOVCiyrXUwfuAalNyJEw4r894KbL_wwpgtNLISkDlfg0cN-NFJjp04CT4W7Wu49uKgcOdxI4lzpHFXWnfQ8vAM6wP9GwP9Wh6khNDVF_V69HwYt-nHE_6DuULN3oLzlul0e9JBOCTNkn1zC"/>
</div>
<div className="flex-grow">
<div className="flex items-center gap-2 mb-1">
<span className="font-label-bold text-on-surface">CyberSam</span>
<span className="bg-tertiary-fixed text-tertiary px-2 py-0.5 rounded text-[10px] font-bold border border-tertiary">GUARDIAN</span>
<span className="text-xs text-on-surface-variant">• il y a 5h</span>
</div>
<h4 className="font-bold text-lg mb-2">Atelier Netiquette à Yaoundé ce Samedi !</h4>
<p className="text-body-md text-on-surface-variant mb-4">On se retrouve à la bibliothèque centrale pour une session de jeu de rôle sur la sécurité. Qui vient ?</p>
<div className="w-full h-40 bg-surface-container rounded-lg border-2 border-secondary overflow-hidden mb-4">
<div className="w-full h-full bg-cover bg-center" aria-label="A colorful, digital poster design for a Cyber Security workshop. It features stylized icons of shields, locks, and community figures. Bold typography and vibrant primary colors." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzPeaoconGy-6EhL8SavqI_CY_Rxb74mEBQ6XkFey4crUGhRh6Vxdo2f9UBDrB-_iAiv-z0RsmO8A1x99zzZHglK-kd_vtLnErfGfSUoc9ezEvW0JrsLpTXyGmYRwUlK6c0Ny6dMP1P8Zs0MwTsfMyPZWmjzaiPMhqRpEicswKk6nADtllYb_rReVlYbvgzwtb6W7IH-s6HPNvwgScpuPPzXZuVwYep7hJ44vp0ULgIMtOHCeMb8T1uQxZD4opVHkHdlBOU7v8SvHp')" }}></div>
</div>
<div className="flex gap-6 border-t-2 border-surface-container pt-4">
<button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm font-label-bold">
<span className="material-symbols-outlined text-lg">thumb_up</span> 56
                                    </button>
<button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm font-label-bold">
<span className="material-symbols-outlined text-lg">chat_bubble</span> 15 Réponses
                                    </button>
</div>
</div>
</div>
</div>
{/* Safety Netiquette Board (Horizontal Scroll or Grid) */}
<section className="mt-12 bg-tertiary-container border-2 border-secondary p-card-padding rounded-2xl drop-block-primary">
<div className="flex items-center gap-3 mb-6">
<div className="p-2 bg-on-tertiary-container rounded-lg border-2 border-secondary">
<span className="material-symbols-outlined text-surface" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-tertiary-container">Le Code de la Netiquette</h3>
</div>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
<div className="bg-surface-container-lowest border-2 border-secondary p-4 rounded-xl flex flex-col items-center text-center">
<span className="material-symbols-outlined text-primary mb-2 text-3xl">sentiment_satisfied</span>
<p className="font-label-bold text-xs uppercase">Respect</p>
<p className="text-[10px] mt-1">Sois toujours poli et bienveillant.</p>
</div>
<div className="bg-surface-container-lowest border-2 border-secondary p-4 rounded-xl flex flex-col items-center text-center">
<span className="material-symbols-outlined text-primary mb-2 text-3xl">privacy_tip</span>
<p className="font-label-bold text-xs uppercase">Vie Privée</p>
<p className="text-[10px] mt-1">Ne partage jamais tes mots de passe.</p>
</div>
<div className="bg-surface-container-lowest border-2 border-secondary p-4 rounded-xl flex flex-col items-center text-center">
<span className="material-symbols-outlined text-primary mb-2 text-3xl">gavel</span>
<p className="font-label-bold text-xs uppercase">Vérité</p>
<p className="text-[10px] mt-1">Vérifie tes sources avant de poster.</p>
</div>
<div className="bg-surface-container-lowest border-2 border-secondary p-4 rounded-xl flex flex-col items-center text-center">
<span className="material-symbols-outlined text-primary mb-2 text-3xl">handshake</span>
<p className="font-label-bold text-xs uppercase">Entraide</p>
<p className="text-[10px] mt-1">Aide les nouveaux membres.</p>
</div>
</div>
</section>
</section>
</div>
</div>
</main>
{/* Floating Action Button (FAB) */}
<button className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full border-2 border-secondary shadow-[0_4px_0_0_#920027] flex items-center justify-center active:translate-y-[2px] active:shadow-none transition-all z-50 group">
<span className="material-symbols-outlined text-3xl">add_comment</span>
<span className="absolute right-20 bg-secondary text-on-secondary px-4 py-2 rounded-lg text-sm font-label-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-2 border-on-secondary-container">Nouveau Post</span>
</button>
{/* BottomNavBar (Mobile Only) */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-secondary px-6 py-4 flex justify-between items-center z-50">
<a className="flex flex-col items-center gap-1 text-primary" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
<span className="text-[10px] font-label-bold">Hub</span>
</a>
<a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span className="material-symbols-outlined">rocket_launch</span>
<span className="text-[10px] font-label-bold">Missions</span>
</a>
<a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span className="material-symbols-outlined">storefront</span>
<span className="text-[10px] font-label-bold">Shop</span>
</a>
<a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span className="material-symbols-outlined">person</span>
<span className="text-[10px] font-label-bold">Profil</span>
</a>
</nav>


    </div>
  );
}
