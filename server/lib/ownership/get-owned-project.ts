import { prisma } from "#server/db/db";
import { Project, User } from "@/generated/prisma/client";

export async function getOwnedProject(
  projectId: Project["id"],
  userId: User["id"]
) {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      userId: userId,
    },
    select: {
      id: true,
      slug: true,
    },
  });
}
