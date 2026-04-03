"use client";

import { Controller, useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth";
import { toast } from "sonner";
import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Heading,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Spinner,
  Text,
} from "#ui";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { translateAuthError } from "../utils";
import { SiGithub, SiGoogle } from "react-icons/si";

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
    form.clearErrors("root.serverError");
    const result = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
      callbackURL: "/projects",
    });
    if (result.error) {
      const error = translateAuthError(result.error);
      form.setError("root.serverError", {
        type: "server",
        message: error ?? result.error.message,
      });
      return;
    }

    toast.success("Аккаунт успешно создан");
    router.replace("/projects");
    router.refresh();
  };

  const handleGitHubLogIn = async () => {
    form.clearErrors("root.serverError");
    const result = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/projects",
    });
    if (result.error) {
      const error = translateAuthError(result.error);
      form.setError("root.serverError", {
        type: "server",
        message: error ?? result.error.message,
      });
      return;
    }
  };

  const handleGoogleLogIn = async () => {
    form.clearErrors("root.serverError");
    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/projects",
    });
    if (result.error) {
      const error = translateAuthError(result.error);
      form.setError("root.serverError", {
        type: "server",
        message: error ?? result.error.message,
      });
      return;
    }
  };
  return (
    <div className="space-y-6">
      <div className="mb-6 space-y-2">
        <Heading level="h2">Создайте аккаунт</Heading>
        <Text variant="muted">
          Зарегистрируйтесь, чтобы сохранять свои проекты и продолжать работу с
          любого устройства.
        </Text>
      </div>

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
                        type="button"
                        aria-label="Очистить имя"
                        title="Очистить имя"
                        size="icon-xs"
                        onClick={() => field.onChange("")}
                        disabled={form.formState.isSubmitting}
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
                        type="button"
                        aria-label="Очистить email"
                        title="Очистить email"
                        size="icon-xs"
                        onClick={() => field.onChange("")}
                        disabled={form.formState.isSubmitting}
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
                <FieldDescription>
                  Минимум 8 символов. Лучше использовать уникальный пароль.
                </FieldDescription>
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
                        type="button"
                        aria-label="Очистить пароль"
                        title="Очистить пароль"
                        size="icon-xs"
                        onClick={() => field.onChange("")}
                        disabled={form.formState.isSubmitting}
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
                        type="button"
                        aria-label="Очистить подтверждение пароля"
                        title="Очистить подтверждение пароля"
                        size="icon-xs"
                        onClick={() => field.onChange("")}
                        disabled={form.formState.isSubmitting}
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
          {form.formState.errors.root?.serverError && (
            <FieldError className="border-destructive/20 bg-destructive/5 rounded-xl border px-3 py-2">
              {form.formState.errors.root.serverError.message}
            </FieldError>
          )}
        </FieldGroup>
        <div className="mt-5 space-y-3">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting && <Spinner className="mr-2" />}
            Зарегистрироваться
          </Button>

          <div className="relative py-1">
            <div className="border-border absolute inset-x-0 top-1/2 border-t" />
            <div className="bg-background relative mx-auto w-fit px-3">
              <Text
                variant="muted"
                className="text-xs tracking-[0.18em] uppercase"
              >
                или продолжить через
              </Text>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleGitHubLogIn}
            disabled={form.formState.isSubmitting}
          >
            <SiGithub />
            Продолжить с GitHub
          </Button>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleGoogleLogIn}
            disabled={form.formState.isSubmitting}
          >
            <SiGoogle />
            Продолжить с Google
          </Button>

          <Text variant="muted" className="pt-1 text-center">
            Уже есть аккаунт?
          </Text>

          <Button
            variant="outline"
            asChild
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            <Link href="/login">Войти</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};
