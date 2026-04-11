import { prisma } from "#server/db/db";
import { Task, User } from "@/generated/prisma/client";

export const getTaskById = async (taskId: Task["id"], userId: User["id"]) => {
  return prisma.task.findFirst({
    where: { id: taskId, project: { userId: userId } },
    include: {
      project: {
        select: {
          id: true,
          slug: true,
          status: true,
        },
      },
      timeEntries: {
        orderBy: {
          date: "desc",
        },
      },
      _count: {
        select: {
          timeEntries: true,
        },
      },
    },
  });
};

export type TaskDetails = NonNullable<Awaited<ReturnType<typeof getTaskById>>>;
