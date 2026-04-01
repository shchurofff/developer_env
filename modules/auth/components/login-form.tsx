"use client";

import { Controller, useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { authClient } from "@/lib/auth";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (values: LoginFormValues) => {
    const result = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: true,
      callbackURL: "/projects",
    });
    if (result.error) {
      toast.error(result.error.message ?? "Не удалось войти");
      return;
    }
    toast.success("Вы успешно вошли");
    router.replace("/projects");
    router.refresh();
  };
  return (
    <div>
      <form id="login-form" onSubmit={form.handleSubmit(onFormSubmit)}>
        <FieldGroup>
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
                    autoComplete="current-password"
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
        <div className="mt-2 flex items-center justify-end gap-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner className="mr-2" />}Войти
          </Button>
          <Button
            variant={"link"}
            asChild
            disabled={form.formState.isSubmitting}
          >
            <Link href={"./register"}>Ещё нет аккаунта?</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};
