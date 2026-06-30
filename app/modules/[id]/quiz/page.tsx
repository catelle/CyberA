import { redirect } from "next/navigation";

type ModuleQuizAliasPageProps = {
  params: {
    id: string;
  };
};

export default function ModuleQuizAliasPage({ params }: ModuleQuizAliasPageProps) {
  redirect(`/student/modules/${params.id}/quiz`);
}
