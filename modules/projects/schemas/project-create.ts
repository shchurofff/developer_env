import * as z from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(3, "Название проекта должно быть не менее 3 символов")
    .max(32, "Название слишком длинное"),
  description: z
    .string()
    .min(20, "Описание должно быть более информативным")
    .max(100, "Описание не должно превышать 100 символов"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
