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
} from "#ui";
import { XIcon } from "lucide-react";
import { authClient } from "@/lib/auth";
import { toast } from "sonner";

export const LoginForm = () => {
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
      toast.error(result.error.message as string);
      return;
    }
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
        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
};
