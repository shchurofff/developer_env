import * as z from "zod";

export const timeEntrySchema = z.object({
  date: z.date({ error: "Пожалуйста, укажите дату" }),
  duration: z
    .number()
    .int("Введите целое число")
    .min(1, "Минимальная продолжительность - 1 минута")
    .max(1440, "Продолжительность не может быть более суток"),
  description: z
    .string()
    .trim()
    .min(5, "Добавьте описание выполненной работы")
    .max(500, "Описание не должно превышать 500 символов"),
});

export type TimeEntryFormValues = z.infer<typeof timeEntrySchema>;
