import Link from "next/link";
import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, List, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Language } from "@/types/auth";

type LessonItem = {
  id: string;
  order: number;
  title: string;
  estimatedMins: number;
};

type Props = {
  children: ReactNode;
  completedLessonIds: string[];
  currentLessonId: string;
  moduleId: string;
  moduleTitle: string;
  lessons: LessonItem[];
  language?: Language;
};

export function LessonLearningSpace({ children, completedLessonIds, currentLessonId, moduleId, moduleTitle, lessons, language = "fr" }: Props) {
  const t = getDictionary(language);
  const completed = new Set(completedLessonIds);
  const currentIndex = lessons.findIndex((lesson) => lesson.id === currentLessonId);
  const previous = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const current = lessons[currentIndex];

  return (
    <div className="mx-auto max-w-[1500px]">
      <nav aria-label="Fil d’Ariane" className="mb-5 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
        <Link className="hover:text-brand-blue" href="/student/modules">{language === "en" ? "My modules" : "Mes modules"}</Link>
        <ChevronRight className="h-4 w-4" />
        <Link className="hover:text-brand-blue" href={`/student/modules/${moduleId}`}>{moduleTitle}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-brand-ink">{current?.title}</span>
      </nav>

      <details className="mb-4 rounded-xl border-2 border-secondary bg-white shadow-[0_4px_0_0_rgba(88,96,98,1)] lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-black text-brand-blue">
          <span className="flex items-center gap-2"><List className="h-5 w-5" />{t.moduleLessons}</span>
          <span>{currentIndex + 1}/{lessons.length}</span>
        </summary>
        <LessonNavigator completed={completed} currentLessonId={currentLessonId} language={language} lessons={lessons} moduleId={moduleId} />
      </details>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_22rem]">
        <main className="min-w-0">
          {children}
          <nav aria-label="Navigation entre les leçons" className="mt-6 grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2">
            {previous ? <Link className="flex min-h-16 items-center gap-3 rounded-xl border-2 border-secondary bg-white px-4 font-black text-brand-blue shadow-[0_3px_0_0_rgba(88,96,98,1)] transition hover:-translate-y-0.5" href={`/student/modules/${moduleId}/lesson/${previous.id}`}><ChevronLeft className="h-5 w-5 shrink-0" /><span><small className="block text-xs uppercase text-slate-400">{t.previousLesson}</small>{previous.title}</span></Link> : <span />}
            {next ? <Link className="flex min-h-16 items-center justify-end gap-3 rounded-xl border-2 border-secondary bg-brand-blue px-4 text-right font-black text-white shadow-[0_3px_0_0_rgba(88,96,98,1)] transition hover:-translate-y-0.5" href={`/student/modules/${moduleId}/lesson/${next.id}`}><span><small className="block text-xs uppercase text-white/60">{t.nextLesson}</small>{next.title}</span><ChevronRight className="h-5 w-5 shrink-0" /></Link> : null}
          </nav>
        </main>

        <aside className="sticky top-5 hidden max-h-[calc(100vh-2.5rem)] overflow-hidden rounded-xl border-2 border-secondary bg-[#151515] text-white shadow-[0_6px_0_0_rgba(88,96,98,1)] lg:block">
          <div className="border-b border-white/10 bg-[#202020] p-4">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-300">{t.moduleContent}</p>
            <p className="mt-2 font-display text-lg font-black leading-tight">{moduleTitle}</p>
            <p className="mt-2 text-xs font-bold text-white/55">{completed.size} / {lessons.length} {t.lessonsCompleted}</p>
          </div>
          <div className="max-h-[calc(100vh-10rem)] overflow-y-auto"><LessonNavigator completed={completed} currentLessonId={currentLessonId} language={language} lessons={lessons} moduleId={moduleId} /></div>
        </aside>
      </div>
    </div>
  );
}

function LessonNavigator({ completed, currentLessonId, lessons, moduleId, language }: { completed: Set<string>; currentLessonId: string; lessons: LessonItem[]; moduleId: string; language: Language }) {
  const t = getDictionary(language);
  return <ol className="grid gap-px bg-slate-200/20 p-2">{lessons.map((lesson) => {
    const isCurrent = lesson.id === currentLessonId;
    const isCompleted = completed.has(lesson.id);
    return <li key={lesson.id}><Link aria-current={isCurrent ? "page" : undefined} className={`grid grid-cols-[2.25rem_1fr_auto] items-center gap-2 rounded-lg p-3 transition ${isCurrent ? "bg-[#3a3a3a] text-white" : "text-slate-300 hover:bg-white/10"}`} href={`/student/modules/${moduleId}/lesson/${lesson.id}`}><span className={`grid h-8 w-8 place-items-center rounded-md ${isCurrent ? "bg-[#2f91ff] text-white" : isCompleted ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/60"}`}>{isCompleted ? <CheckCircle2 className="h-4 w-4" /> : isCurrent ? <BookOpen className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5 opacity-40" />}</span><span className="min-w-0"><small className="block text-[10px] font-black uppercase tracking-wider opacity-55">{t.lesson} {lesson.order}</small><strong className="block text-sm leading-5">{lesson.title}</strong></span><small className="font-bold opacity-50">{lesson.estimatedMins}m</small></Link></li>;
  })}</ol>;
}
