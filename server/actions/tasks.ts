"use server";

import { taskSchema, type TaskFormValues } from "#mod/tasks/schemas";
import { prisma } from "#server/db/db";
import { requireSession } from "@/lib/auth";
import type { ActionResult } from "./projects";
import { revalidatePath } from "next/cache";

export async function createTask(data: TaskFormValues): Promise<ActionResult> {
  const session = await requireSession();
  try {
    const parsedData = taskSchema.parse(data);

    const project = await prisma.project.findFirst({
      where: {
        id: parsedData.projectId,
        userId: session.user.id,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Проект не найден или у вас нет доступа",
      };
    }

    await prisma.task.create({
      data: {
        name: parsedData.name,
        description: parsedData.description,
        startDay: parsedData.startDay,
        endDay: parsedData.endDay ?? null,
        status: parsedData.status,
        project: {
          connect: {
            id: project.id,
          },
        },
      },
    });
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Create Task Error:", error);

    return {
      success: false,
      error: "Не удалось создать задачу",
    };
  }
}

export async function deleteTask(id: string): Promise<ActionResult> {
  const session = await requireSession();
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: id,
        project: {
          userId: session.user.id,
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

    if (!task) {
      return {
        success: false,
        error: "Задача не найдена",
      };
    }

    await prisma.task.delete({
      where: {
        id: task.id,
      },
    });
    revalidatePath(`/projects/${task.project.slug}`);
    return { success: true };
  } catch (error) {
    console.error(`Delete task error: ${error}`);
    return { success: false, error: "Не удалось удалить задачу" };
  }
}
