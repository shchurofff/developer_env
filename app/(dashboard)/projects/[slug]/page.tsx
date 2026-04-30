import { ProjectDetailsView } from "#mod/projects/components";
import { getProjectBySlug } from "#server/services/projects";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const session = await requireSession();

  const { slug } = await params;
  const project = await getProjectBySlug(slug, session.user.id);

  if (!project) {
    notFound();
  }
  return <ProjectDetailsView project={project} />;
}
