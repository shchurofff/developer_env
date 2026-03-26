import { ProjectsView } from "#mod/projects/components";
import {
  getProjects,
  getTechnologyStack,
} from "#server/services/projects/index";
import { PageHero } from "#ui";

export default async function ProjectsPage() {
  const data = await getProjects();
  const stack = await getTechnologyStack();
  console.log(data);
  console.log(stack);

  return (
    <div className="flex flex-col gap-4">
      <PageHero
        title="Проекты"
        subTitle="Заносите информацию о проектах, над которыми работали, фиксируйте
      задачи и трекайте время."
      />
      <ProjectsView initialProjects={data} stack={stack} />
    </div>
  );
}
