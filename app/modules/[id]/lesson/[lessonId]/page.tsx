import { redirect } from "next/navigation";

type LessonAliasPageProps = {
  params: {
    id: string;
    lessonId: string;
  };
};

export default function LessonAliasPage({ params }: LessonAliasPageProps) {
  redirect(`/student/modules/${params.id}/lesson/${params.lessonId}`);
}
