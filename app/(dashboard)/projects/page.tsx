import { ProjectsView } from "#mod/projects/components";
import {
  getProjects,
  getTechnologyStack,
} from "#server/services/projects/index";
import { PageHero } from "#ui";
import { requireSession } from "@/lib/auth";

export default async function ProjectsPage() {
  const session = await requireSession();
  const data = await getProjects(session.user.id);
  const stack = await getTechnologyStack();
  console.log(session);

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
