import * as z from "zod";

export const taskSchema = z.object({
  projectId: z.string().min(1, "Проект не найден, повторите попытку"),
  name: z
    .string()
    .trim()
    .min(3, "Добавьте название или номер задачи")
    .max(100, "Название не должно превышать 100 символов"),
  description: z
    .string()
    .trim()
    .min(20, "Введите описание задачи")
    .max(300, "Описание не должно превышать 300 символов"),
  startDay: z.date({ error: "Пожалуйста, укажите дату постановки задачи" }),
  endDay: z.date().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "POSTPONED"]),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
