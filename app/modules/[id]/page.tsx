import { redirect } from "next/navigation";

type ModuleAliasPageProps = {
  params: {
    id: string;
  };
};

export default function ModuleAliasPage({ params }: ModuleAliasPageProps) {
  redirect(`/student/modules/${params.id}`);
}
