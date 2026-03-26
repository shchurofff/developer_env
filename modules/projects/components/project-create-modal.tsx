"use client";

import {
  Button,
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
} from "#ui";
import { FC } from "react";
import { ProjectFormValues, projectSchema } from "#mod/projects/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { createProject } from "#server/actions";
import { Technology } from "@/generated/prisma/browser";
import { XIcon } from "lucide-react";

interface ProjectCreateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  stack: Technology[];
}

export const ProjectCreateModal: FC<ProjectCreateModalProps> = ({
  isOpen,
  onOpenChange,
  stack,
}) => {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      stack: [],
    },
  });

  const onFormSubmit = async (data: ProjectFormValues) => {
    const result = await createProject(data);

    if (result.error) {
      alert(result.error);
      return;
    }

    console.log("Create Project with data:", data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[80vh] min-w-2xl overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Добавление проекта</DialogTitle>
          <DialogDescription>
            В данной форме вы можете добавить всю подробную информацию о
            проекте, над которым работали
          </DialogDescription>
        </DialogHeader>

        <form
          id="project-create-form"
          onSubmit={form.handleSubmit(onFormSubmit)}
        >
          <FieldGroup>
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
                        {field.value.length}/100 characters
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
              onClick={() => form.reset()}
            >
              Отменить
            </Button>
          </DialogClose>
          <Button type="submit" form="project-create-form">
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
