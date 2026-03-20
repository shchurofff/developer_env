"use server";

import { prisma } from "#server/db/prisma";
import { Project } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

type ActionResult = { success: true } | { success: false; error: string };

export async function createProject(
  data: Pick<Project, "name" | "description">
) {
  try {
    const slug = slugify(data.name, { lower: true, strict: true });
    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        slug: slug,
        status: "WORKING_NOW",
      },
    });
    revalidatePath("/");
    return { success: true, project };
  } catch (error) {
    console.error("Create Project Error:", error);
    return { error: "Не удалось создать проект" };
  }
}

export async function updateProject(
  id: string,
  data: Partial<Pick<Project, "name" | "description" | "status" | "endDay">>
) {
  try {
    await prisma.project.update({
      where: { id },
      data,
    });

    revalidatePath(`/projects/${id}`);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Ошибка при обновлении проекта" };
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete Project Error:", error);
    return {
      success: false,
      error: "Не удалось удалить проект",
    };
  }
}
