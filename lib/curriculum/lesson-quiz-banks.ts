import type { LessonQuizQuestion } from "@/lib/program";
import { moduleOneLessonQuizBanks } from "@/lib/curriculum/module-one-quiz-banks";
import { moduleTwoLessonQuizBanks } from "@/lib/curriculum/module-two-quiz-banks";
import { moduleThreeLessonQuizBanks } from "@/lib/curriculum/module-three-quiz-banks";
import { moduleFourLessonQuizBanks } from "@/lib/curriculum/module-four-quiz-banks";
import { moduleTwo } from "@/lib/curriculum/module-two";

const digitalSurvivorQuizBanks = Object.fromEntries(
  moduleTwo.lessons.map((lesson) => [lesson.id, [lesson.quiz]])
);

export const lessonQuizBanks: Record<string, LessonQuizQuestion[]> = {
  ...moduleOneLessonQuizBanks,
  ...moduleTwoLessonQuizBanks,
  ...digitalSurvivorQuizBanks,
  ...moduleThreeLessonQuizBanks,
  ...moduleFourLessonQuizBanks,
};

export function getLessonQuizBank(lessonId: string): LessonQuizQuestion[] | undefined {
  return lessonQuizBanks[lessonId];
}

export const lessonQuizQuestionsById: Record<string, LessonQuizQuestion & { lessonId: string }> =
  Object.fromEntries(
    Object.entries(lessonQuizBanks).flatMap(([lessonId, questions]) =>
      questions.map((question) => [question.id!, { ...question, lessonId }])
    )
  );
