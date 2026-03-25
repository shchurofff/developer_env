import { prisma } from "#server/db/prisma";

export const getTechnologyStack = async () => {
  try {
    return await prisma.technology.findMany({
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("Fetch Technogolies Error", error);
    return [];
  }
};
