import { ProjectAvatar } from "#mod/projects/components";
import { getProjectBySlug } from "#server/services/projects";
import { Heading, Text } from "#ui";
import { notFound } from "next/navigation";
import { normalizeDate } from "@/lib/date-normalize";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  console.log(project);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-muted flex flex-col items-start gap-2 px-6 py-4">
        <div className="flex w-full justify-between">
          <div className="flex gap-4">
            <ProjectAvatar
              image={project.favicon ?? undefined}
              name={project.name}
            />
            <Heading>{project.name}</Heading>
          </div>
          <div className="flex items-center justify-center">
            <Text variant={"small"}>
              {normalizeDate(project.startDay)} –{" "}
              {project.endDay ? normalizeDate(project.endDay) : "По сей день"}
            </Text>
          </div>
        </div>
        <Text>{project.description}</Text>
      </div>
      <Heading className="mt-7" level={"h2"}>
        This page will be updated later
      </Heading>
    </div>
  );
}
