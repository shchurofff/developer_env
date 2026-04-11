"use client";

import {
  Button,
  DatePickerSimple,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  Spinner,
} from "#ui";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { TaskFormValues, taskSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTask } from "#server/actions/tasks";
import { toast } from "sonner";
import { XIcon } from "lucide-react";

interface TaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

export const TaskModal: FC<TaskModalProps> = ({
  isOpen,
  onOpenChange,
  projectId,
}) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      projectId: projectId,
      startDay: new Date(),
      endDay: undefined,
      status: "IN_PROGRESS",
    },
  });

  const onFormSubmit = async (data: TaskFormValues) => {
    form.clearErrors("root.serverError");
    const result = await createTask(data);

    if (result.success) {
      toast.success("Задача успешно создана");
      form.reset({
        name: "",
        description: "",
        projectId,
        startDay: new Date(),
        endDay: undefined,
        status: "IN_PROGRESS",
      });
      onOpenChange(false);
      return;
    }

    form.setError("root.serverError", {
      type: "server",
      message:
        result.error ??
        "Произошла ошибка при создании задачи, попробуйте повторно",
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[65vh] max-w-xl">
        <DialogHeader>
          <DialogTitle>Новая задача</DialogTitle>
          <DialogDescription>
            Запишите основные данные о задачи, чтобы вы могли фиксировать далее
            свои успехи и достижения в её выполнении
          </DialogDescription>
        </DialogHeader>
        <form
          id="task-form"
          onSubmit={form.handleSubmit(onFormSubmit)}
          className={
            form.formState.isSubmitting ? "pointer-events-none opacity-70" : ""
          }
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="task-name">
                    Название или номер задачи
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="task-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="TASK-001"
                      autoComplete="off"
                    />
                    {field.value.length > 0 && (
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          type="button"
                          aria-label="Delete-name"
                          title="Delete-name"
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
              name="startDay"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div>
                    <DatePickerSimple
                      label="Дата постановки задачи"
                      id={"task-stard-day"}
                      value={field.value}
                      onChange={field.onChange}
                      isInvalid={fieldState.invalid}
                      className="w-full"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="task-description">
                    Описание задачи
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="task-description"
                      placeholder="Введите описание"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align={"block-end"}>
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/300 characters
                      </InputGroupText>
                    </InputGroupAddon>
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
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Отменить
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="task-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Spinner className="mr-2" />}
            {/*{isEdit ? "Сохранить изменения" : "Сохранить"}*/} Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
