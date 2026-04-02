"use client";

import { Controller, useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { authClient } from "@/lib/auth";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { translateAuthError } from "../utils";
import { SiGithub, SiGoogle } from "react-icons/si";

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
      const error = translateAuthError(result.error);
      form.setError("root.serverError", {
        type: "server",
        message: error ?? result.error.message,
      });
      return;
    }
    toast.success("Вы успешно вошли");
    router.replace("/projects");
    router.refresh();
  };

  const handleGuestStart = async () => {
    const result = await authClient.signIn.anonymous();
    if (result.error) {
      console.error(result.error);
      toast.error("Не удалось войти в гостевой режим");
      return;
    }

    toast.success("Гостевой режим активирован");
    router.push("/projects");
    router.refresh();
  };
  const handleGitHubLogIn = async () => {
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
    <div>
      <div className="mb-6 space-y-2">
        <Heading level="h2">С возвращением</Heading>
        <Text variant="muted">
          Войдите в аккаунт, чтобы продолжить работу над своими проектами.
        </Text>
      </div>

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
                  Используйте пароль, который указывали при регистрации.
                </FieldDescription>
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

          {form.formState.errors.root?.serverError && (
            <FieldError>
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
            Войти
          </Button>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleGitHubLogIn}
            disabled={form.formState.isSubmitting}
          >
            <SiGithub />
            Войти через GitHub
          </Button>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleGoogleLogIn}
            disabled={form.formState.isSubmitting}
          >
            <SiGoogle />
            Войти через Google
          </Button>

          <Text variant="muted" className="text-center">
            или
          </Text>

          <Button
            variant="secondary"
            type="button"
            className="w-full"
            onClick={handleGuestStart}
          >
            Войти как гость
          </Button>

          <Text variant="muted" className="text-center">
            Ещё нет аккаунта?
          </Text>

          <Button
            asChild
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            <Link href="/register">Создать аккаунт</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};
