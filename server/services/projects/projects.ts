import { prisma } from "#server/db/db";
import { Project } from "@/generated/prisma/client";

export const getProjects = async () => {
  const projects = await prisma.project.findMany({
    include: {
      _count: {
        select: { tasks: true },
      },
      stack: true,
    },
    orderBy: {
      startDay: "desc",
    },
  });
  return projects.map(({ _count, stack, ...project }) => ({
    ...project,
    stack,
    tasksCount: _count.tasks,
  }));
};

export type ProjectWithTaskCount = Awaited<ReturnType<typeof getProjects>>[0];

export const getProjectBySlug = async (slug: Project["slug"]) => {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      tasks: true,
      stack: true,
    },
  });

  if (!project) {
    return null;
  }

  return project;
};
