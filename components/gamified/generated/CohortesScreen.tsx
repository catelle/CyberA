/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function CohortesScreen() {
  return (
    <div className={"bg-background text-on-background font-body-md kinetic-bg min-h-screen"}>

{/* TopNavBar */}
<header className="bg-surface border-b-2 border-secondary sticky top-0 z-50 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4">
<div className="flex items-center gap-4">
<span className="font-display text-headline-md text-primary">Cyberambassadeurs</span>
</div>
<div className="flex items-center gap-6">
<div className="hidden md:flex gap-8">
<a className="text-primary font-bold border-b-2 border-primary font-label-bold text-label-bold transition-all" href="#">Overview</a>
<a className="text-on-surface-variant hover:text-primary transition-colors font-label-bold text-label-bold" href="#">Cohorts</a>
<a className="text-on-surface-variant hover:text-primary transition-colors font-label-bold text-label-bold" href="#">Analytics</a>
</div>
<div className="flex items-center gap-3">
<button className="text-primary active:translate-y-[2px] transition-all"><span className="material-symbols-outlined">notifications</span></button>
<button className="text-primary active:translate-y-[2px] transition-all"><span className="material-symbols-outlined">settings</span></button>
<div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" alt="A professional studio headshot of a female administrator with a friendly expression, set against a clean, geometric background with subtle primary red accents. The lighting is crisp and modern, reflecting a high-end educational gaming platform aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB6t81yFNz7262ZeGGLWOkGvktMgFEwpaxOiPupZBMu2ZY_aRLRtY0CZWy6fLHppoPOzXtYM4Isnr90fQvjcQhHVvcAUUtNyUdi4UzAPrYPZ6qs8a24LVpQcynhnJjiwGNrrxWOgkwAG-iMPtgGNs3O2BZaJt-g8l_cpIzwIqyJIS8grHPJ5Zt9wqUAD0J-1tRLN7CZiZwmHfUPiqeiJEUaxfTL19G_KTDyYMLcHqnbSgSzR0e5CdUfhIhFyePv0KSw02rJsZC8Hi0"/>
</div>
</div>
</div>
</header>
<div className="flex">
{/* SideNavBar */}
<aside className="hidden lg:flex flex-col h-[calc(100vh-80px)] sticky top-20 left-0 p-4 gap-4 w-64 bg-surface-container-lowest border-r-2 border-secondary shadow-[4px_0_0_0_#586062]">
<div className="p-4 border-2 border-secondary rounded-xl bg-surface-container-low mb-2">
<div className="flex items-center gap-3 mb-2">
<div className="w-12 h-12 bg-primary rounded-lg border-2 border-on-primary-fixed flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined">shield_person</span>
</div>
<div>
<p className="font-label-bold text-label-bold text-primary">Admin Prime</p>
<p className="text-xs font-bold text-secondary">Level 12 • High Council</p>
</div>
</div>
<div className="w-full bg-secondary-container h-3 rounded-full overflow-hidden border border-secondary">
<div className="bg-tertiary-container h-full w-3/4 rounded-full"></div>
</div>
</div>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-3 bg-primary text-on-primary rounded-xl p-3 border-b-4 border-on-primary-fixed-variant translate-y-[2px]" href="#">
<span className="material-symbols-outlined">rocket_launch</span>
<span className="font-label-bold text-label-bold">Missions</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all active:translate-y-[2px]" href="#">
<span className="material-symbols-outlined">military_tech</span>
<span className="font-label-bold text-label-bold">Levels</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all active:translate-y-[2px]" href="#">
<span className="material-symbols-outlined">storefront</span>
<span className="font-label-bold text-label-bold">Shop</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all active:translate-y-[2px]" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-label-bold text-label-bold">Squad</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all active:translate-y-[2px]" href="#">
<span className="material-symbols-outlined">workspace_premium</span>
<span className="font-label-bold text-label-bold">Trophies</span>
</a>
</nav>
<div className="mt-auto border-t-2 border-surface-container-highest pt-4 flex flex-col gap-2">
<button className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all">
<span className="material-symbols-outlined">help</span>
<span className="font-label-bold text-label-bold">Help</span>
</button>
<button className="flex items-center gap-3 text-error p-3 hover:bg-error-container rounded-xl transition-all">
<span className="material-symbols-outlined">logout</span>
<span className="font-label-bold text-label-bold">Logout</span>
</button>
</div>
</aside>
{/* Main Content */}
<main className="flex-1 p-margin-mobile md:p-margin-desktop overflow-x-hidden">
<div className="max-w-[1200px] mx-auto">
{/* Welcome Section */}
<section className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<h1 className="font-display text-headline-lg text-primary mb-2">Cohort Command Center</h1>
<p className="font-body-lg text-on-surface-variant max-w-2xl">Manage your digital ambassadors, track regional growth, and monitor cybersecurity mission progress across Cameroon.</p>
</div>
<button className="bg-primary text-on-primary font-label-bold text-label-bold px-8 py-4 rounded-xl border-b-4 border-on-primary-fixed-variant flex items-center gap-2 active:translate-y-[2px] active:border-b-0 transition-all drop-block-primary">
<span className="material-symbols-outlined">add_circle</span>
                        NEW COHORT
                    </button>
</section>
{/* Metrics Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-16">
<div className="bg-surface-container-lowest border-2 border-secondary p-card-padding rounded-xl drop-block">
<p className="font-label-bold text-label-bold text-secondary mb-1">TOTAL AMBASSADORS</p>
<p className="font-display text-headline-lg text-on-surface">2,482</p>
<div className="mt-4 flex items-center text-tertiary font-bold text-sm">
<span className="material-symbols-outlined text-sm">trending_up</span>
                            +12% this month
                        </div>
</div>
<div className="bg-surface-container-lowest border-2 border-secondary p-card-padding rounded-xl drop-block">
<p className="font-label-bold text-label-bold text-secondary mb-1">AVG. SECURITY SCORE</p>
<p className="font-display text-headline-lg text-primary">84%</p>
<div className="mt-4 w-full bg-secondary-container h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[84%]"></div>
</div>
</div>
<div className="bg-surface-container-lowest border-2 border-secondary p-card-padding rounded-xl drop-block">
<p className="font-label-bold text-label-bold text-secondary mb-1">TIME SPENT / WEEK</p>
<p className="font-display text-headline-lg text-on-surface">4.2h</p>
<div className="mt-4 flex items-center text-tertiary font-bold text-sm">
<span className="material-symbols-outlined text-sm">schedule</span>
                            Optimal Engagement
                        </div>
</div>
<div className="bg-surface-container-lowest border-2 border-secondary p-card-padding rounded-xl drop-block">
<p className="font-label-bold text-label-bold text-secondary mb-1">ACTIVE MISSIONS</p>
<p className="font-display text-headline-lg text-tertiary-container">156</p>
<div className="mt-4 flex items-center text-tertiary font-bold text-sm">
<span className="material-symbols-outlined text-sm">verified</span>
                            98% Completion Rate
                        </div>
</div>
</div>
{/* Map and Activity Bento */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-16">
{/* Impact Map */}
<div className="lg:col-span-2 bg-surface border-2 border-secondary rounded-xl overflow-hidden drop-block flex flex-col h-[500px]">
<div className="p-6 border-b-2 border-secondary flex justify-between items-center bg-white">
<h2 className="font-headline-md text-headline-md text-on-surface">Regional Impact</h2>
<div className="flex gap-2">
<span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full border border-primary">Live</span>
<span className="px-3 py-1 bg-secondary/10 text-secondary font-bold text-xs rounded-full border border-secondary">Cameroon</span>
</div>
</div>
<div className="flex-1 relative bg-surface-container-high overflow-hidden">
<div className="absolute inset-0 z-0 opacity-40">

</div>
<div className="relative z-10 w-full h-full flex items-center justify-center p-8">
<div className="w-full h-full rounded-lg border-2 border-secondary overflow-hidden shadow-inner">
<img className="w-full h-full object-cover" alt="A stylized vector map of Cameroon with distinct regional boundaries, overlayed with glowing interactive data points and circular heat-map hotspots representing cyber ambassador concentrations. The visual style is clean and tech-forward, using the primary red and secondary gray palette with high contrast and bold outlines." data-location="Cameroon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjx5sgTURpy5g-5Ptq5XEf5ouACYe_KiQPIfLdhQjhdhL_T6kv-DVnHt_deEnsO_i-CKNSsZW-L6iRgPjstSQWFtG9bDopm2jiE0Xc1erTiAafsqSf_LB77lrMTdLXp9-8PlLjzWa7_YI2QNuIWWJYf6YK1xcRZ1sptaBy5O4NGaqgkLf2JM2rmUZ_ty6X7Siowkj4w53_WlXTAfJfGoGGKknUDB079lmhPoF-AsoIEWlA_dZziHgU-ijPHK0Ts_wRGOZvNaP5k5Nc"/>
</div>
</div>
{/* Map Overlay Stats */}
<div className="absolute bottom-6 left-6 flex flex-col gap-3">
<div className="bg-white/90 backdrop-blur-md p-3 border-2 border-secondary rounded-lg flex items-center gap-3">
<div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
<span className="font-label-bold text-label-bold text-sm">Yaoundé: 1.2k Active</span>
</div>
<div className="bg-white/90 backdrop-blur-md p-3 border-2 border-secondary rounded-lg flex items-center gap-3">
<div className="w-3 h-3 bg-tertiary rounded-full"></div>
<span className="font-label-bold text-label-bold text-sm">Douala: 850 Active</span>
</div>
</div>
</div>
</div>
{/* Recent Activity/Alerts */}
<div className="bg-surface-container-lowest border-2 border-secondary rounded-xl overflow-hidden drop-block flex flex-col h-[500px]">
<div className="p-6 border-b-2 border-secondary bg-white">
<h2 className="font-headline-md text-headline-md text-on-surface">Activity Logs</h2>
</div>
<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
{/* Activity Item */}
<div className="p-3 border-2 border-secondary rounded-lg bg-surface hover:bg-primary-fixed transition-colors">
<div className="flex gap-3">
<div className="w-10 h-10 bg-error-container text-error rounded-full flex items-center justify-center flex-shrink-0 border border-error">
<span className="material-symbols-outlined">warning</span>
</div>
<div>
<p className="text-sm font-bold text-on-surface">Phishing Alert: Bafoussam</p>
<p className="text-xs text-on-surface-variant mb-1">High detection rate in Cohort B.</p>
<span className="text-[10px] font-bold text-secondary uppercase tracking-widest">2 MINS AGO</span>
</div>
</div>
</div>
<div className="p-3 border-2 border-secondary rounded-lg bg-surface hover:bg-tertiary-fixed transition-colors">
<div className="flex gap-3">
<div className="w-10 h-10 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center flex-shrink-0 border border-tertiary">
<span className="material-symbols-outlined">star</span>
</div>
<div>
<p className="text-sm font-bold text-on-surface">Milestone Reached</p>
<p className="text-xs text-on-surface-variant mb-1">Promotion Yaoundé 2024-A reached Level 5.</p>
<span className="text-[10px] font-bold text-secondary uppercase tracking-widest">15 MINS AGO</span>
</div>
</div>
</div>
<div className="p-3 border-2 border-secondary rounded-lg bg-surface">
<div className="flex gap-3">
<div className="w-10 h-10 bg-secondary-container text-secondary rounded-full flex items-center justify-center flex-shrink-0 border border-secondary">
<span className="material-symbols-outlined">group_add</span>
</div>
<div>
<p className="text-sm font-bold text-on-surface">New Admissions</p>
<p className="text-xs text-on-surface-variant mb-1">42 students joined Garoua North cohort.</p>
<span className="text-[10px] font-bold text-secondary uppercase tracking-widest">1 HOUR AGO</span>
</div>
</div>
</div>
<div className="p-3 border-2 border-secondary rounded-lg bg-surface">
<div className="flex gap-3">
<div className="w-10 h-10 bg-primary-fixed text-primary rounded-full flex items-center justify-center flex-shrink-0 border border-primary">
<span className="material-symbols-outlined">lock_reset</span>
</div>
<div>
<p className="text-sm font-bold text-on-surface">Security Update</p>
<p className="text-xs text-on-surface-variant mb-1">Global 'Password Hygiene' module updated.</p>
<span className="text-[10px] font-bold text-secondary uppercase tracking-widest">3 HOURS AGO</span>
</div>
</div>
</div>
</div>
<button className="m-4 p-3 border-2 border-secondary rounded-xl font-label-bold text-label-bold hover:bg-surface-variant transition-all active:translate-y-[1px]">VIEW ALL LOGS</button>
</div>
</div>
{/* Cohort List */}
<section>
<div className="flex justify-between items-end mb-8">
<h2 className="font-headline-md text-headline-md text-on-surface">Active Cohorts</h2>
<div className="flex gap-4">
<select className="border-2 border-secondary rounded-lg font-label-bold text-sm focus:ring-primary focus:border-primary">
<option>All Regions</option>
<option>Centre</option>
<option>Littoral</option>
</select>
<div className="flex border-2 border-secondary rounded-lg overflow-hidden">
<button className="p-2 bg-primary text-on-primary"><span className="material-symbols-outlined">grid_view</span></button>
<button className="p-2 bg-white text-secondary border-l-2 border-secondary"><span className="material-symbols-outlined">list</span></button>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
{/* Cohort Card 1 */}
<div className="bg-surface-container-lowest border-2 border-secondary rounded-xl overflow-hidden drop-block flex flex-col hover:-translate-y-1 transition-transform cursor-pointer group">
<div className="h-32 bg-primary-container relative flex items-center justify-center overflow-hidden">
<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
<span className="material-symbols-outlined text-white text-6xl opacity-30 group-hover:scale-110 transition-transform">security</span>
<div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full border border-secondary text-xs font-bold text-primary">CENTRE REGION</div>
</div>
<div className="p-6">
<h3 className="font-headline-md text-headline-md mb-4">Promotion Yaoundé 2024-A</h3>
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="text-secondary font-label-bold text-xs uppercase tracking-wider">Engagement</span>
<span className="font-bold text-on-surface">92%</span>
</div>
<div className="w-full bg-secondary-container h-2 rounded-full overflow-hidden border border-secondary/10">
<div className="bg-primary h-full w-[92%]"></div>
</div>
<div className="grid grid-cols-2 gap-4 pt-2 border-t border-surface-variant">
<div>
<p className="text-[10px] font-bold text-secondary uppercase">Students</p>
<p className="font-bold text-on-surface">142</p>
</div>
<div>
<p className="text-[10px] font-bold text-secondary uppercase">Avg Rank</p>
<p className="font-bold text-on-surface">Diamond</p>
</div>
</div>
</div>
</div>
<div className="mt-auto p-4 border-t-2 border-secondary bg-surface-container-low flex justify-between items-center">
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full border-2 border-secondary bg-primary-fixed overflow-hidden"><img className="w-full h-full object-cover" alt="Avatar of a young male student wearing high-tech glasses." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw6voDU-UAE4jxsq8FXKDiJjmVC2j9u_x3gpmna0ZQzki4YMMU-jZ1kBnd7NRMU_KAXMwGoTNNBwJx03upX_vGFeYK7R--qSzqRhDAUjFy-gD_xtf3H7y5JwssNJantEmz7IKGMnSzyu6UVQHzsTzZheTsOAem2TqKKhiR3xLUuesaAlLhRbJ78_H5j4Fs4_blWHA7Q4bDQyLLWz4GciQ7Af8MSUinewbGLxlc5DP3NWvFuqXXRnjV2uwk1KubpAki6MWN6xi84Bke"/></div>
<div className="w-8 h-8 rounded-full border-2 border-secondary bg-tertiary-fixed overflow-hidden"><img className="w-full h-full object-cover" alt="Avatar of a young female student with a headset." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQdlc80lNbzL7eW8oVTZesixSWIUqU4mLne2h-YzhUVZ1HlVHp0zYIqyteReVgPE9q0e-Kvwc3TlJ76WxhXzigDIGnlTTwaVibDfeKn9Ewb433a3yFfvFXuFVCnlEwTMk_FM2wkuwM--PVd6kUhOUlNUOzvQFVzAKLYUjP-kOB2HpjI4JMwY8AdfqhFKobuHD4Ctu2PNP_FmAfwbrh-LU23fKqYmfi6Y2OAK1_Jg0-3cjQeMM9LqTBT2X4RXYUzlyoJocmhWgng_PR"/></div>
<div className="w-8 h-8 rounded-full border-2 border-secondary bg-secondary-fixed flex items-center justify-center text-[10px] font-black">+140</div>
</div>
<span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">arrow_forward</span>
</div>
</div>
{/* Cohort Card 2 */}
<div className="bg-surface-container-lowest border-2 border-secondary rounded-xl overflow-hidden drop-block flex flex-col hover:-translate-y-1 transition-transform cursor-pointer group">
<div className="h-32 bg-tertiary-container relative flex items-center justify-center overflow-hidden">
<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
<span className="material-symbols-outlined text-white text-6xl opacity-30 group-hover:scale-110 transition-transform">hub</span>
<div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full border border-secondary text-xs font-bold text-tertiary">LITTORAL REGION</div>
</div>
<div className="p-6">
<h3 className="font-headline-md text-headline-md mb-4">CyberSquad Douala 2024</h3>
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="text-secondary font-label-bold text-xs uppercase tracking-wider">Engagement</span>
<span className="font-bold text-on-surface">78%</span>
</div>
<div className="w-full bg-secondary-container h-2 rounded-full overflow-hidden border border-secondary/10">
<div className="bg-tertiary-container h-full w-[78%]"></div>
</div>
<div className="grid grid-cols-2 gap-4 pt-2 border-t border-surface-variant">
<div>
<p className="text-[10px] font-bold text-secondary uppercase">Students</p>
<p className="font-bold text-on-surface">210</p>
</div>
<div>
<p className="text-[10px] font-bold text-secondary uppercase">Avg Rank</p>
<p className="font-bold text-on-surface">Platinum</p>
</div>
</div>
</div>
</div>
<div className="mt-auto p-4 border-t-2 border-secondary bg-surface-container-low flex justify-between items-center">
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full border-2 border-secondary bg-primary-fixed overflow-hidden"><img className="w-full h-full object-cover" alt="Avatar of a male student with a futuristic cap." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgABZ7UIxQ0KgsafcKC0aQblAQFXh4fEt5swwy7h4ebekxQF2erkxahvh0vhphFDYMqgTyeBx_ztf4isrATkdK6KLBNrE51hOxPXWpyFR5PrGdR7vYAHtWxS5_Y_lr6IQANXWzFlxvRS_nDr_QFyWG-x38U2W5T0CzVstChJsO1guqh6joG7RBv5qwHw8r8CkBnStUcUezcZH6BZPiJK7QxMyw4plGWcjAdcBzIAZYVZlg19lMolDBYdg_6MtfsS1fMkrADDKp7-3O"/></div>
<div className="w-8 h-8 rounded-full border-2 border-secondary bg-tertiary-fixed overflow-hidden"><img className="w-full h-full object-cover" alt="Avatar of a female student wearing a lab coat." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9AjuUPLJRxvcHhda7hwz-Jjedjyr01LPy9oFPhAWzwJvatKZklVZNA5utC0noRzF0KQ3xrszttYCcpdEgXk-t3fAnAC4bipS7GBj2fPc5f5t4kzF9kFyIgz1A0TQzzJLW9mg8uap62mUPqjrJJ8V4r-Y6Bn_g-e3WKAE6XUL3DWSQNCObbGnN0A2GJtDcwzTKAPXn-zzSd9c28Fb17AskRLxFlBi7ISvutVhCONonv2jXQbC3aK1mbX-sXZIEW4iXW941NUNtBwDd"/></div>
<div className="w-8 h-8 rounded-full border-2 border-secondary bg-secondary-fixed flex items-center justify-center text-[10px] font-black">+208</div>
</div>
<span className="material-symbols-outlined text-secondary group-hover:text-tertiary transition-colors">arrow_forward</span>
</div>
</div>
{/* Cohort Card 3 (Empty State Mock) */}
<div className="bg-surface-container border-2 border-dashed border-secondary rounded-xl flex flex-col items-center justify-center p-8 gap-4 hover:bg-surface-container-high transition-colors cursor-pointer active-push">
<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-secondary">
<span className="material-symbols-outlined text-secondary text-4xl">add</span>
</div>
<div className="text-center">
<p className="font-headline-md text-headline-md text-secondary">Launch New Cohort</p>
<p className="text-sm text-on-surface-variant mt-2">Deploy missions to a new region or institution.</p>
</div>
</div>
</div>
</section>
{/* Gamified Status Bar */}
<div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-on-surface text-white px-8 py-4 rounded-2xl border-4 border-primary shadow-2xl flex items-center gap-8 z-40 max-w-full overflow-x-auto whitespace-nowrap">
<div className="flex items-center gap-3">
<div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
<span className="font-label-bold text-xs uppercase tracking-tighter">SERVER STATUS: OPTIMAL</span>
</div>
<div className="w-[2px] h-6 bg-white/20"></div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">bolt</span>
<span className="font-label-bold text-xs">LIVE TRAFFIC: 4.2k Events/sec</span>
</div>
<div className="w-[2px] h-6 bg-white/20"></div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary-fixed-dim">workspace_premium</span>
<span className="font-label-bold text-xs">GLOBAL RANK: #1 Ed-Tech Africa</span>
</div>
</div>
</div>
</main>
</div>
{/* Floating Action Button for Mobile */}
<button className="fixed bottom-6 right-6 lg:hidden w-16 h-16 bg-primary text-on-primary rounded-full border-b-4 border-on-primary-fixed-variant shadow-lg flex items-center justify-center z-50 active:translate-y-1 active:border-b-0 transition-all">
<span className="material-symbols-outlined text-3xl">add</span>
</button>


    </div>
  );
}
