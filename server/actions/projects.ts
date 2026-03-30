"use server";

import { projectServerSchema } from "#mod/projects/schemas";
import { prisma } from "#server/db/db";
import { Project } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import slugify from "slugify";
import { parseFormData } from "#mod/projects/utils";

type ActionResult = { success: true } | { success: false; error: string };

export async function createProject(formData: FormData): Promise<ActionResult> {
  try {
    const raw = parseFormData(formData);
    const data = projectServerSchema.parse(raw);

    const slug = slugify(data.name, { lower: true, strict: true });

    let faviconUrl: string | undefined;

    if (data.favicon && data.favicon.size > 0) {
      const { url } = await put(
        `/projects/${Date.now()}-${data.favicon.name}`,
        data.favicon,
        { access: "public" }
      );
      faviconUrl = url;
    }
    await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        slug,
        startDay: data.startDate,
        endDay: data.status === "WORKED" ? data.endDate : null,
        status: data.status,
        favicon: faviconUrl,
        stack: {
          connect: data.stack.map((id) => ({
            id,
          })),
        },
      },
    });
    revalidatePath("/");
    revalidatePath("/projects");
    return { success: true };
  } catch {
    return {
      success: false,
      error: `Ошибка при создании проекта.`,
    };
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
  } catch {
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
