/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
export function QuizScreen() {
  return (
    <div className={"bg-background text-on-background min-h-screen"}>

{/* TopNavBar (JSON Mapping) */}
<header className="bg-surface fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 border-b-2 border-secondary">
<div className="flex items-center gap-4">
<span className="font-display text-headline-md text-primary">Cyberambassadeurs</span>
</div>
<div className="flex items-center gap-4">
<button className="active:translate-y-[2px] transition-all text-on-surface-variant hover:text-primary">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="active:translate-y-[2px] transition-all text-on-surface-variant hover:text-primary">
<span className="material-symbols-outlined">settings</span>
</button>
<div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" alt="A stylized 3D avatar of a young tech-savvy student wearing a futuristic visor and a red hoodie, set against a clean studio background with soft cinematic lighting. The character design is energetic and professional, matching the Cyberambassadeurs gamified aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL9XrNGqvJ338xjXCRYrp23uAYVaAV2xRESFU9WjkY-FJoeF01lTz0mkK07SLbPGCICAw4UJiteHPfBHd5ipSEeWE65vBTBpPWNfoD4-uzMfH4Uxfa4WAmQANa1ujhETnvBH-Qd_tccY58L1S69M36LZcLHFDQ8NqvBf8a5OepDHbjYrGVnoLDmdOWRYR9Pwd2p9QBzh8p6ulSVDMKmG4L1FQWHWbnQ9CDf9rDo7e4TdpFVRIbsKXxt5WYa8fYQvGYH6KV05mQP3Ju"/>
</div>
</div>
</header>
{/* SideNavBar (JSON Mapping) */}
<aside className="hidden lg:flex flex-col h-screen fixed left-0 top-0 p-4 gap-4 bg-surface-container-lowest w-64 border-r-2 border-secondary sidenav-shadow pt-24">
<div className="mb-6 px-2">
<p className="font-label-bold text-label-bold text-primary">Recruit</p>
<p className="text-on-surface-variant opacity-70">Level 4 • 1,200 XP</p>
</div>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-3 bg-primary text-on-primary rounded-xl p-3 border-b-4 border-on-primary-fixed-variant translate-y-[2px]" href="#">
<span className="material-symbols-outlined">rocket_launch</span>
<span className="font-label-bold text-label-bold">Missions</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all" href="#">
<span className="material-symbols-outlined">military_tech</span>
<span className="font-label-bold text-label-bold">Levels</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all" href="#">
<span className="material-symbols-outlined">storefront</span>
<span className="font-label-bold text-label-bold">Shop</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-label-bold text-label-bold">Squad</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all" href="#">
<span className="material-symbols-outlined">workspace_premium</span>
<span className="font-label-bold text-label-bold">Trophies</span>
</a>
</nav>
<div className="mt-auto flex flex-col gap-2">
<button className="bg-primary text-on-primary font-label-bold py-3 rounded-xl border-b-4 border-on-primary-fixed-variant active:translate-y-[2px] active:border-b-0 transition-all">
                Start Mission
            </button>
<div className="h-[2px] bg-secondary opacity-20 my-2"></div>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-label-bold text-label-bold">Help</span>
</a>
<a className="flex items-center gap-3 text-secondary p-3 hover:bg-surface-container-high rounded-xl transition-all" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-label-bold text-label-bold">Logout</span>
</a>
</div>
</aside>
{/* Main Content Canvas */}
<main className="lg:ml-64 pt-24 px-margin-mobile md:px-margin-desktop pb-12 kinetic-horizon min-h-screen">
<div className="max-w-4xl mx-auto">
{/* Quiz Progress Section */}
<div className="mb-10">
<div className="flex justify-between items-end mb-4">
<div>
<span className="font-label-bold text-label-bold text-primary uppercase tracking-widest">Phishing Expert</span>
<h1 className="font-headline-lg text-headline-lg md:text-headline-lg text-on-surface">Question 2 of 5</h1>
</div>
<div className="text-right">
<span className="font-headline-md text-headline-md text-secondary">40%</span>
</div>
</div>
{/* Chunky Progress Bar */}
<div className="h-6 w-full bg-surface-container-highest rounded-full border-2 border-secondary overflow-hidden p-1 shadow-inner">
<div className="h-full bg-primary rounded-full progress-fill-animate" style={{ width: "40%" }}></div>
</div>
</div>
{/* Quiz Layout: Bento Grid Style */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
{/* Question Card */}
<div className="md:col-span-8 space-y-gutter">
<div className="bg-surface-container-lowest border-2 border-secondary p-card-padding rounded-xl drop-block relative overflow-hidden">
<div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
<h2 className="font-headline-md text-headline-md text-on-surface mb-6">Which of these is a sign of a phishing attempt?</h2>
<div className="grid grid-cols-1 gap-4">
{/* Choice Buttons */}
<button className="choice-btn group w-full text-left bg-surface border-2 border-secondary p-4 rounded-xl flex items-center gap-4 transition-all active-press drop-block">
<div className="w-10 h-10 rounded-lg bg-surface-container-high border-2 border-secondary flex items-center justify-center font-bold text-secondary group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-colors">A</div>
<span className="font-body-lg text-body-lg text-on-surface">A generic greeting like "Dear Valued Customer"</span>
</button>
<button className="choice-btn group w-full text-left bg-surface border-2 border-secondary p-4 rounded-xl flex items-center gap-4 transition-all active-press drop-block">
<div className="w-10 h-10 rounded-lg bg-surface-container-high border-2 border-secondary flex items-center justify-center font-bold text-secondary group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-colors">B</div>
<span className="font-body-lg text-body-lg text-on-surface">A lock icon in the browser address bar</span>
</button>
<button className="choice-btn group w-full text-left bg-surface border-2 border-secondary p-4 rounded-xl flex items-center gap-4 transition-all active-press drop-block">
<div className="w-10 h-10 rounded-lg bg-surface-container-high border-2 border-secondary flex items-center justify-center font-bold text-secondary group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-colors">C</div>
<span className="font-body-lg text-body-lg text-on-surface">An email coming from your friend's real address</span>
</button>
<button className="choice-btn group w-full text-left bg-surface border-2 border-secondary p-4 rounded-xl flex items-center gap-4 transition-all active-press drop-block">
<div className="w-10 h-10 rounded-lg bg-surface-container-high border-2 border-secondary flex items-center justify-center font-bold text-secondary group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-colors">D</div>
<span className="font-body-lg text-body-lg text-on-surface">The email contains no links or attachments</span>
</button>
</div>
</div>
</div>
{/* Mascot & Feedback Side */}
<div className="md:col-span-4 flex flex-col gap-gutter">
{/* Mascot Container */}
<div className="bg-tertiary-container text-on-tertiary-container border-2 border-secondary p-6 rounded-xl drop-block flex flex-col items-center text-center relative overflow-hidden min-h-[320px] justify-center">
<div className="mb-4 relative w-48 h-48">
<img className="w-full h-full object-contain drop-shadow-2xl floating-animation" alt="A heroic 3D metallic shield mascot character with friendly animated eyes and small robotic arms. The shield is chrome red with a white cyber emblem. It is posed dynamically with one arm giving a thumbs up, floating in front of a glowing digital hex pattern background. Vibrant lighting and high-quality 3D render style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2zysYNJLqumVlVSgBcaRvv-6Utu4HROJpVCLoaxcMmqdYnzez5TLNC9Pp3f8mzRjLVm04x7hDFbfA3yJQWYNin1DKyNI5ZiSS3a7DWgtc1JDmCB713Ayv_SdPd9Ru1-yanFd2RnyjWgd1yGhaP9sL-KErE32pbOGb-cQxj-30dDlWtnNu9gxcnCbcRPnVg3brxfpZgOqnh5X9KEUrmYy0Hf4gxyDZZAttLWhnrybScH-Ms6cbagD-bGU6pEShdAe0x331tXCke62p"/>
</div>
<div className="bg-surface-container-lowest text-on-surface border-2 border-secondary p-4 rounded-xl relative">
{/* Speech bubble tail */}
<div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface-container-lowest border-t-2 border-l-2 border-secondary rotate-45"></div>
<p className="font-body-md text-body-md font-bold italic">"You're doing great, Recruit! Look closely at the details of the sender's tone!"</p>
</div>
</div>
{/* Action Card */}
<div className="bg-surface-container border-2 border-secondary p-6 rounded-xl drop-block">
<h3 className="font-label-bold text-label-bold mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">tips_and_updates</span>
                            CYBER TIP
                        </h3>
<p className="font-body-md text-body-md text-on-surface-variant">
                            Phishers often use urgent language to make you panic and act without thinking. Stay calm!
                        </p>
</div>
</div>
</div>
{/* Bottom Navigation/Action */}
<div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
<button className="w-full md:w-auto px-8 py-4 bg-surface border-2 border-secondary rounded-xl font-label-bold text-label-bold active-press drop-block flex items-center justify-center gap-2">
<span className="material-symbols-outlined">arrow_back</span>
                    PREVIOUS
                </button>
<button className="w-full md:w-auto px-12 py-4 bg-primary text-on-primary border-2 border-on-primary-fixed-variant rounded-xl font-headline-md text-headline-md active-press-primary drop-block-primary flex items-center justify-center gap-3" id="nextBtn">
                    NEXT QUESTION
                    <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
</main>
{/* Success Modal (Hidden by default) */}
<div className="fixed inset-0 z-[100] flex items-center justify-center bg-on-surface/50 backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300" id="successModal">
<div className="bg-surface-container-lowest border-4 border-secondary p-10 rounded-2xl drop-block max-w-sm w-full text-center scale-90 transition-transform">
<div className="w-24 h-24 bg-tertiary-container rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-secondary">
<span className="material-symbols-outlined text-on-tertiary-container !text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<h2 className="font-display text-headline-md mb-2">CORRECT!</h2>
<p className="font-body-lg text-body-lg mb-8 text-on-surface-variant">Generic greetings are a classic red flag for phishing attempts.</p>
<button className="w-full py-4 bg-primary text-on-primary border-b-4 border-on-primary-fixed-variant rounded-xl font-headline-md active-press-primary transition-all">
                CONTINUE
            </button>
</div>
</div>
{/* Mobile Bottom Navigation (JSON Policy: Suppressed for task-focused page, but logic check: This is a quiz subpage) */}


    </div>
  );
}
