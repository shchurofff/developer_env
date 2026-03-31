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
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Text,
} from "#ui";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { ProjectFormValues, projectSchema } from "#mod/projects/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  ControllerRenderProps,
  DefaultValues,
  useForm,
  useWatch,
} from "react-hook-form";
import { createProject, updateProject } from "#server/actions";
import { Technology } from "@/generated/prisma/browser";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { ProjectWithTaskCount } from "#server/services/projects";

interface ProjectCreateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  stack: Technology[];
  project?: ProjectWithTaskCount | null;
}

const getDefaultFormValues = (
  project?: ProjectWithTaskCount | null
): DefaultValues<ProjectFormValues> => ({
  name: project?.name ?? "",
  description: project?.description ?? "",
  stack: project?.stack.map((technology) => technology.id) ?? [],
  favicon: undefined,
  startDay: project?.startDay ? new Date(project.startDay) : undefined,
  endDay: project?.endDay ? new Date(project.endDay) : undefined,
  status: project?.status ?? "WORKING_NOW",
});

export const ProjectCreateModal: FC<ProjectCreateModalProps> = ({
  isOpen,
  onOpenChange,
  stack,
  project,
}) => {
  const isEdit = !!project;

  const [preview, setPreview] = useState<string | null | undefined>(undefined);
  const upload = useRef<HTMLInputElement | null>(null);
  const previewSrc =
    preview === undefined ? (project?.favicon ?? null) : preview;

  const onUploadFavicon = (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<ProjectFormValues>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      field.onChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const deleteUploadFavicon = (
    field: ControllerRenderProps<ProjectFormValues>
  ) => {
    setPreview(null);
    field.onChange(undefined);
    if (upload.current) upload.current.value = "";
  };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: getDefaultFormValues(project),
  });

  const status = useWatch({
    control: form.control,
    name: "status",
  });

  useEffect(() => {
    if (status === "WORKING_NOW") {
      form.setValue("endDay", undefined);
    }
  }, [form, status]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    form.reset(getDefaultFormValues(project));

    if (upload.current) {
      upload.current.value = "";
    }
  }, [form, isOpen, project]);

  const onFormSubmit = async (data: ProjectFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("startDay", data.startDay.toISOString());

    if (data.endDay) {
      formData.append("endDay", data.endDay.toISOString());
    }

    formData.append("status", data.status);

    data.stack.forEach((id) => formData.append("stack", id));
    if (data.favicon) formData.append("favicon", data.favicon);
    const result = isEdit
      ? await updateProject(project.id, formData)
      : await createProject(formData);

    if (!result.success) {
      toast.error(result.error as string);
      return;
    }
    toast.success(
      isEdit ? "Проект успешно обновлён" : "Проект успешно добавлен"
    );

    onOpenChange(false);
    form.reset(getDefaultFormValues(null));
    setPreview(undefined);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setPreview(undefined);
      form.reset(getDefaultFormValues(project));
    }

    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[80vh] min-w-2xl overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактирование проекта" : "Добавление проекта"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Измените данные проекта и сохраните обновления."
              : "В данной форме вы можете добавить всю подробную информацию о проекте, над которым работали"}
          </DialogDescription>
        </DialogHeader>

        <form
          id="project-create-form"
          onSubmit={form.handleSubmit(onFormSubmit)}
          className={
            form.formState.isSubmitting ? "pointer-events-none opacity-70" : ""
          }
        >
          <FieldGroup>
            <div className="flex gap-2">
              <Controller
                control={form.control}
                name="favicon"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="project-title">
                      Иконка проекта
                    </FieldLabel>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => onUploadFavicon(event, field)}
                      ref={upload}
                      className="hidden"
                    />

                    <div className="flex items-center gap-6">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => upload.current?.click()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            upload.current?.click();
                        }}
                        className="bg-muted hover:bg-muted/80 focus-visible:ring-ring relative flex size-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden border border-dashed transition-colors focus-visible:ring-2 focus-visible:outline-none"
                        title="Нажмите, чтобы выбрать файл"
                      >
                        {previewSrc ? (
                          <Image
                            fill
                            className="object-cover"
                            src={previewSrc}
                            alt="Preview favicon"
                          />
                        ) : (
                          <Text
                            variant={"muted"}
                            className="p-2 text-center text-xs"
                          >
                            Нет иконки
                          </Text>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => upload.current?.click()}
                        >
                          {previewSrc ? "Заменить иконку" : "Загрузить иконку"}
                        </Button>

                        {previewSrc && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteUploadFavicon(field)}
                          >
                            <XIcon className="mr-2 size-4" />
                            Удалить
                          </Button>
                        )}
                      </div>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="project-title">
                      Название проекта
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="project-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Введите название проекта"
                        autoComplete="off"
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
            </div>

            <Controller
              control={form.control}
              name="stack"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="project-stack">
                    Стек технологий
                  </FieldLabel>
                  <MultiSelect
                    values={field.value}
                    onValuesChange={field.onChange}
                  >
                    <MultiSelectTrigger>
                      <MultiSelectValue
                        overflowBehavior="cutoff"
                        placeholder="Выберите технологии"
                      />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                      <MultiSelectGroup>
                        {stack.map((tech) => (
                          <MultiSelectItem key={tech.id} value={tech.id}>
                            {tech.name}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="status"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="project-status">
                    Статус проекта
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="project-status"
                      aria-invalid={fieldState.invalid}
                      className="w-xs"
                    >
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WORKING_NOW">В работе</SelectItem>
                      <SelectItem value="WORKED">Завершён</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2 md:items-start">
              <Controller
                control={form.control}
                name="startDay"
                render={({ field, fieldState }) => (
                  <div>
                    <DatePickerSimple
                      label="Дата старта работы"
                      id={"project-start-date"}
                      value={field.value}
                      onChange={field.onChange}
                      isInvalid={fieldState.invalid}
                      className="w-full"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="endDay"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <DatePickerSimple
                      label="Дата завершения работы"
                      id={"project-end-date"}
                      value={field.value}
                      onChange={field.onChange}
                      isInvalid={fieldState.invalid}
                      disabled={status !== "WORKED"}
                      className="w-full"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="project-description">
                    Описание проекта
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="project-description"
                      placeholder="Введите описание"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align={"block-end"}>
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/150 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset(getDefaultFormValues(project))}
            >
              Отменить
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="project-create-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Spinner className="mr-2" />}
            {isEdit ? "Сохранить изменения" : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
