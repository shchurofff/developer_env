import { prisma } from "#server/db/db";
import { Project } from "@/generated/prisma/client";

export const getProjects = async (userId: Project["userId"]) => {
  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
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

export const getProjectBySlug = async (
  slug: Project["slug"],
  userId: Project["userId"]
) => {
  const project = await prisma.project.findFirst({
    where: { slug, userId },
    include: {
      tasks: {
        include: {
          _count: {
            select: {
              timeEntries: true,
            },
          },
        },
        orderBy: {
          startDay: "desc",
        },
      },
      stack: true,
    },
  });

  if (!project) {
    return null;
  }

  return project;
};

export type ProjectDetails = NonNullable<
  Awaited<ReturnType<typeof getProjectBySlug>>
>;
