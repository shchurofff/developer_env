"use server";

import {
  taskSchema,
  TimeEntryFormValues,
  timeEntrySchema,
  type TaskFormValues,
} from "#mod/tasks/schemas";
import { prisma } from "#server/db/db";
import { requireSession } from "@/lib/auth";
import type { ActionResult } from "./projects";
import { revalidatePath } from "next/cache";
import { Task } from "@/generated/prisma/client";
import { getOwnedProject, getOwnedTask } from "#server/lib/ownership";

export async function createTask(data: TaskFormValues): Promise<ActionResult> {
  const session = await requireSession();
  try {
    const parsedData = taskSchema.parse(data);

    const project = await getOwnedProject(
      parsedData.projectId,
      session.user.id
    );

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

export async function updateTask(
  taskId: Task["id"],
  data: TaskFormValues
): Promise<ActionResult> {
  const session = await requireSession();

  try {
    const exitingTask = await getOwnedTask(taskId, session.user.id);
    if (!exitingTask) {
      return {
        success: false,
        error: "Редактируемая задача не найдена, или у вас нет к ней доступа",
      };
    }
    const parsedData = taskSchema.parse(data);

    await prisma.task.update({
      where: { id: exitingTask.id },
      data: {
        name: parsedData.name,
        description: parsedData.description,
        startDay: parsedData.startDay,
        endDay: parsedData.endDay ?? null,
        status: parsedData.status,
      },
    });
    revalidatePath(`/projects/${exitingTask.project.slug}`);
    return { success: true };
  } catch (error) {
    console.error(`Update task error: ${error}`);
    return { success: false, error: "Ошибка при обновлении задачи" };
  }
}

export async function deleteTask(id: string): Promise<ActionResult> {
  const session = await requireSession();
  try {
    const task = await getOwnedTask(id, session.user.id);

    if (!task) {
      return {
        success: false,
        error: "Задача не найдена или у вас нет к ней доступа",
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

export async function createTimeEntry(
  taskId: Task["id"],
  data: TimeEntryFormValues
) {
  const session = await requireSession();

  try {
    const parsedData = timeEntrySchema.parse(data);

    const task = await getOwnedTask(taskId, session.user.id);

    if (!task) {
      return {
        success: false,
        error: "Задача не найдена или у вас нет доступа",
      };
    }

    await prisma.timeEntry.create({
      data: {
        date: parsedData.date,
        duration: parsedData.duration,
        description: parsedData.description,
        task: {
          connect: {
            id: task.id,
          },
        },
      },
    });
    revalidatePath(`/projects/${task.project.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Create Time Entry Error:", error);

    return {
      success: false,
      error: "Не удалось создать запись времени",
    };
  }
}
