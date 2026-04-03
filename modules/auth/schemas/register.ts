import * as z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Введите имя"),
    email: z.email("Введите корректный email"),
    password: z.string().min(8, "Пароль не может быть короче 8 символов"),
    confirmPassword: z.string().min(8, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
