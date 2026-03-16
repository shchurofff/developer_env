import { getProjects } from "#server/services";
import { PageHero } from "#ui";
import { ProjectsView } from "@/components/projects";

export default async function ProjectsPage() {
  const data = await getProjects();
  console.log(data);
  return (
    <div className="flex flex-col gap-4">
      <PageHero
        title="Проекты"
        subTitle="Заносите информацию о проектах, над которыми работали, фиксируйте
      задачи и трекайте время."
      />
      <ProjectsView initialProjects={data} />
    </div>
  );
}
