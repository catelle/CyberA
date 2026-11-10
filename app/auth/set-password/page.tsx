import { SetInvitedPasswordForm } from "@/components/auth/SetInvitedPasswordForm";

export default function SetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <section className="w-full max-w-md rounded-2xl border-2 border-secondary bg-white p-6 shadow-[0_5px_0_0_rgba(88,96,98,1)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-black text-white">C</div>
        <p className="mt-5 text-sm font-black uppercase text-brand-gold">Compte selectionne</p>
        <h1 className="mt-2 text-3xl font-black text-brand-ink">Configure ton mot de passe</h1>
        <p className="mt-3 leading-7 text-slate-600">Ce lien ne peut etre utilise qu&apos;une fois. Ensuite, connecte-toi avec l&apos;email de ta candidature et ce mot de passe.</p>
        <SetInvitedPasswordForm />
      </section>
    </main>
  );
}
