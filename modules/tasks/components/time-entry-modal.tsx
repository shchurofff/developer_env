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
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
  Spinner,
} from "#ui";
import { FC } from "react";
import { Task } from "../types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimeEntryFormValues, timeEntrySchema } from "../schemas";
import { createTimeEntry } from "#server/actions";
import { toast } from "sonner";

interface TimeEntryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task;
  taskId: Task["id"];
}

export const TimeEntryModal: FC<TimeEntryModalProps> = ({
  isOpen,
  onOpenChange,
  taskId,
}) => {
  const form = useForm<TimeEntryFormValues>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      date: new Date(),
      duration: 0,
      description: "",
    },
  });

  const onFormSubmit = async (data: TimeEntryFormValues) => {
    form.clearErrors("root.serverError");
    // const result = isEdit
    //   ? await updateTask(task.id, data)
    //   : await createTask(data);
    const result = await createTimeEntry(taskId, data);

    if (result.success) {
      toast.success(
        // isEdit ? "Задача успешно обновлена" : "Задача успешно создана"
        "Запись времени успешно сохранена"
      );
      // form.reset(getDefaultFormValues(projectId, null));
      form.reset();
      onOpenChange(false);
      return;
    }

    form.setError("root.serverError", {
      type: "server",
      message:
        result.error ??
        // (isEdit
        //   ? "Произошла ошибка при обновлении задачи, попробуйте повторно"
        //   : "Произошла ошибка при создании задачи, попробуйте повторно"),
        "Произошла ошибка при создании записи, попробуйте повторно",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[65vh] max-w-xl">
        <DialogHeader>
          <DialogTitle>Добавление временной записи</DialogTitle>
          <DialogDescription>
            Запишите временные рамки выполнения задачи, а также небольшой
            комментарий о выполненной работе, чтобы всегда помнить о выполненных
            действиях в любой день
          </DialogDescription>
        </DialogHeader>

        <form
          id="time-entry-form"
          onSubmit={form.handleSubmit(onFormSubmit)}
          className={
            form.formState.isSubmitting ? "pointer-events-none opacity-70" : ""
          }
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="duration"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="time-entry-duration">
                    Длительность выполнения
                  </FieldLabel>

                  {/*<InputGroup>
                    <InputGroupInput
                      {...field}
                      id="time-entry-duration"
                      aria-invalid={fieldState.invalid}
                      placeholder="5"
                      autoComplete="off"
                    />
                  </InputGroup>*/}
                  <Input
                    {...field}
                    id="time-entry-duration"
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.valueAsNumber || Number(e.target.value)
                      )
                    }
                    type="number"
                    placeholder=""
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="time-entry-description">
                    Описание проделанной работы
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="time-entry-description"
                      placeholder="Введите описание"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align={"block-end"}>
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/500 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="date"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div>
                    <DatePickerSimple
                      label="Дата выполнения работ"
                      id={"time-entry-stard-day"}
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
            form="time-entry-form"
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
