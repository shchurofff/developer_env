import { getProjectBySlug } from "#server/services/projects";
import { Heading, Text } from "#ui";
import { notFound } from "next/navigation";

// interface ProjectPageProps {
//   params: {
//     slug: string;
//   };
// }
//
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
      <Heading>{project.name}</Heading>
      <Text>{project.description}</Text>
    </div>
  );
}
