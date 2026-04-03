import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Введите корректный email"),
  password: z.string().min(8, "Минимум 8 символов"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
