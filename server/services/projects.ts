import { prisma } from "#server/db/prisma";
import { Project } from "@/generated/prisma/client";

export const getProjects = async () => {
  const projects = await prisma.project.findMany({
    include: {
      _count: {
        select: { tasks: true },
      },
    },
    orderBy: {
      startDay: "desc",
    },
  });
  return projects.map(({ _count, ...project }) => ({
    ...project,
    tasksCount: _count.tasks,
  }));
};

export type ProjectWithTaskCount = Awaited<ReturnType<typeof getProjects>>[0];

export const getProjectById = async (id: Project["id"]) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: true,
    },
  });

  if (!project) {
    return null;
  }

  return project;
};
