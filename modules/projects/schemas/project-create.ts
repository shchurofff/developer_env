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
  stack: z.array(z.string()).min(1, "Выберите хотя бы одну технологию"),
  startDate: z.date({
    error: "Пожалуйста, укажите дату старта работы",
  }),
  status: z.enum(["WORKING_NOW", "WORKED"]),
  favicon: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Максимальный размер 5МБ")
    .refine(
      (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
      "Только файлы формата JPG, PNG или WebP"
    )
    .nullable()
    .optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
