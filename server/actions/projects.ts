"use server";

import { ProjectFormValues } from "#mod/projects/schemas";
import { prisma } from "#server/db/db";
import { Project } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import slugify from "slugify";

type ActionResult = { success: true } | { success: false; error: string };

export async function createProject(data: FormData) {
  try {
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const stack = data.getAll("stack") as string[];
    const favicon = data.get("favicon") as File | null;

    const slug = slugify(name, { lower: true, strict: true });

    let faviconUrl: string | undefined = undefined;

    if (favicon && favicon.size > 0) {
      const { url } = await put(`projects/${favicon.name}`, favicon, {
        access: "public",
        addRandomSuffix: true,
      });
      faviconUrl = url;
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        slug,
        status: "WORKING_NOW",
        favicon: faviconUrl,
        stack: {
          connect: stack.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/projects");

    return { success: true, project };
  } catch (error) {
    console.error("Create Project Error:", error);
    return { error: error };
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
