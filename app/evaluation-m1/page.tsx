import { M1EvaluationForm } from "@/components/forms/M1EvaluationForm";

export const dynamic = "force-dynamic";

export default function M1EvaluationPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff1f2_0,_#f7f9fc_38%,_#eceef1_100%)] px-4 py-6 text-on-background sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between gap-4">
          <a className="flex items-center gap-3" href="/">
            <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary bg-primary font-display text-xl font-black text-white shadow-[0_4px_14px_rgba(181,18,63,0.22)]">C</span>
            <span className="font-display text-lg font-extrabold uppercase tracking-[-0.02em] text-primary sm:text-xl">Cyberambassadeurs</span>
          </a>
          <a className="text-sm font-black text-primary hover:underline" href="/">Retour au site</a>
        </header>
        <section className="mt-8 rounded-2xl border-2 border-secondary bg-white p-5 shadow-[0_8px_0_0_rgba(88,96,98,1)] sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-primary">Suivi à M+1</p>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight text-brand-ink sm:text-5xl">Évaluation CyberAmbassador</h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-secondary sm:text-lg">
            Ce questionnaire prend environ 5 minutes. Il porte sur les changements observés depuis la fin de ta formation. Réponds selon ton expérience réelle : il n’y a pas de bonne ou de mauvaise réponse.
          </p>
          <div className="mt-5 rounded-xl border border-rose-200 bg-primary-fixed p-4 text-sm font-semibold leading-6 text-primary">
            Les réponses sont enregistrées comme déclarations personnelles. L’équipe pourra te recontacter uniquement si tu l’autorises.
          </div>
          <M1EvaluationForm />
        </section>
      </div>
    </main>
  );
}
