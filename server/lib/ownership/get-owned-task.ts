import { prisma } from "#server/db/db";
import { Task, User } from "@/generated/prisma/client";

export async function getOwnedTask(taskId: Task["id"], userId: User["id"]) {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      project: {
        userId: userId,
      },
    },
    select: {
      id: true,
      project: {
        select: {
          id: true,
          slug: true,
        },
      },
    },
  });
}
