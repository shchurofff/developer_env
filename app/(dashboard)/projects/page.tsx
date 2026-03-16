import { ProjectsView } from "#mod/projects";
import { getProjects } from "#server/services";
import { PageHero } from "#ui";

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
