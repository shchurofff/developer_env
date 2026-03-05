import { Prisma, PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const projectsData: Prisma.ProjectCreateInput[] = [
  {
    name: "FireFlow",
    description: "Площадка для менеджмента сотрудников",
    status: "WORKED",
    tasks: {
      create: {
        name: "Ознакомиться со структурой проекта",
        status: "DONE",
        comments: {
          create: {
            content: "Смотрел доку next",
          },
        },
      },
    },
  },
];

export async function main() {
  for (const p of projectsData) {
    await prisma.project.create({ data: p });
  }
}

main();
