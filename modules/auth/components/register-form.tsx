"use client";

import { Controller, useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth";
import { toast } from "sonner";
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Spinner,
} from "#ui";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onFormSubmit = async (values: RegisterFormValues) => {
    const result = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
      callbackURL: "/projects",
    });
    if (result.error) {
      toast.error(result.error.message ?? "Не удалось зарегистрироваться");
      return;
    }

    toast.success("Аккаунт успешно создан");
    router.replace("/projects");
    router.refresh();
  };
  return (
    <div>
      <form id="register-form" onSubmit={form.handleSubmit(onFormSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Имя</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Иван Иванов"
                    autoComplete="name"
                    disabled={form.formState.isSubmitting}
                  />
                  {field.value.length > 0 && (
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        aria-label="Delete"
                        title="Delete"
                        size="icon-xs"
                        onClick={() => field.onChange("")}
                      >
                        <XIcon />
                      </InputGroupButton>
                    </InputGroupAddon>
                  )}
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                    autoComplete="email"
                    disabled={form.formState.isSubmitting}
                  />
                  {field.value.length > 0 && (
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        aria-label="Delete"
                        title="Delete"
                        size="icon-xs"
                        onClick={() => field.onChange("")}
                      >
                        <XIcon />
                      </InputGroupButton>
                    </InputGroupAddon>
                  )}
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Пароль</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Введите пароль"
                    type="password"
                    autoComplete="new-password"
                    disabled={form.formState.isSubmitting}
                  />
                  {field.value.length > 0 && (
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        aria-label="Delete"
                        title="Delete"
                        size="icon-xs"
                        onClick={() => field.onChange("")}
                      >
                        <XIcon />
                      </InputGroupButton>
                    </InputGroupAddon>
                  )}
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmPassword">
                  Подтвердите пароль
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="confirmPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Повторите пароль"
                    type="password"
                    autoComplete="new-password"
                    disabled={form.formState.isSubmitting}
                  />
                  {field.value.length > 0 && (
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        aria-label="Delete"
                        title="Delete"
                        size="icon-xs"
                        onClick={() => field.onChange("")}
                      >
                        <XIcon />
                      </InputGroupButton>
                    </InputGroupAddon>
                  )}
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner className="mr-2" />}
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};
