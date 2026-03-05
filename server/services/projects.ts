import { prisma } from "#server/db/prisma";
import { Project } from "@/generated/prisma/client";

export const getProjects = async () => {
  return await prisma.project.findMany({
    include: {
      _count: {
        select: { tasks: true },
      },
    },
    orderBy: {
      startDay: "desc",
    },
  });
};

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
