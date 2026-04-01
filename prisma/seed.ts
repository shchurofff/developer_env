import { Prisma, PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});

const ALL_TECHNOLOGIES = [
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Tailwind", icon: "tailwind" },
  { name: "Prisma", icon: "prisma" },
  { name: "Node.js", icon: "nodejs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Docker", icon: "docker" },
  { name: "Zustand", icon: "zustand" },
  { name: "Shadcn UI", icon: "shadcn" },
  { name: "Chakra UI", icon: "chakraui" },
  { name: "Vue", icon: "vue" },
  { name: "Chart.js", icon: "chartdotjs" },
  { name: "TanStack", icon: "tanstack" },
];

const seedUser = await prisma.user.upsert({
  where: { email: "demo@example.com" },
  update: {},
  create: {
    id: "seed-user",
    name: "demo user",
    email: "demo@example.com",
    emailVerified: true,
  },
});

const projectsData: Prisma.ProjectCreateInput[] = [
  {
    name: "FireFlow",
    slug: "fireflow",
    description:
      "Площадка для менеджмента сотрудников. Включает дашборды и систему контроля доступов.",
    status: "WORKED",
    user: {
      connect: {
        id: seedUser.id,
      },
    },
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
    user: {
      connect: {
        id: seedUser.id,
      },
    },
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

  for (const tech of ALL_TECHNOLOGIES) {
    await prisma.technology.upsert({
      where: { name: tech.name },
      update: {},
      create: tech,
    });
  }

  for (const p of projectsData) {
    await prisma.project.create({ data: p });
  }
}

main();
