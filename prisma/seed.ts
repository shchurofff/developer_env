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
    slug: "fireflow",
    description:
      "Площадка для менеджмента сотрудников. Включает дашборды и систему контроля доступов.",
    status: "WORKED",
    stack: {
      connectOrCreate: [
        { where: { name: "React" }, create: { name: "React", icon: "react" } },
        {
          where: { name: "TypeScript" },
          create: { name: "TypeScript", icon: "typescript" },
        },
        {
          where: { name: "Next.js" },
          create: { name: "Next.js", icon: "nextjs" },
        },
        {
          where: { name: "Tailwind" },
          create: { name: "Tailwind", icon: "tailwind" },
        },
      ],
    },
    tasks: {
      create: [
        {
          name: "Ознакомиться со структурой проекта",
          status: "DONE",
          comments: {
            create: {
              content: "Смотрел доку next",
            },
          },
          timeEntries: {
            create: [
              {
                duration: 120,
                description: "Проектирование схем моделей",
                date: new Date(),
              },
              {
                duration: 60,
                description: "Настройка миграций",
                date: new Date(),
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Developer Environment",
    slug: "developenv",
    description:
      "Площадка которая старается создать среду для облегчения и улучшения рутинных задач разработчика (Пет-проект)",
    status: "WORKING_NOW",
    stack: {
      connectOrCreate: [
        {
          where: { name: "Next.js" },
          create: { name: "Next.js", icon: "nextjs" },
        },
        {
          where: { name: "TypeScript" },
          create: { name: "TypeScript", icon: "typescript" },
        },
        {
          where: { name: "Tailwind" },
          create: { name: "Tailwind", icon: "tailwind" },
        },
        {
          where: { name: "Prisma" },
          create: { name: "Prisma", icon: "prisma" },
        },
      ],
    },
    tasks: {
      create: [
        {
          name: "Внедрение useTransition для удаления",
          status: "DONE",
          comments: {
            create: { content: "Сделал через локальный transition в карточке" },
          },
          timeEntries: {
            create: {
              duration: 45,
              description: "Рефакторинг ProjectCard",
              date: new Date(),
            },
          },
        },
        {
          name: "Настройка страницы проекта",
          status: "IN_PROGRESS",
          timeEntries: {
            create: {
              duration: 90,
              description: "Верстка таблицы задач",
              date: new Date(),
            },
          },
        },
      ],
    },
  },
];

export async function main() {
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  for (const p of projectsData) {
    await prisma.project.create({ data: p });
  }
}

main();
