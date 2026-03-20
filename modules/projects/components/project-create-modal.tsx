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
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "#ui";
import { FC } from "react";
import { ProjectFormValues, projectSchema } from "#mod/projects/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { createProject } from "#server/actions";

interface ProjectCreateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectCreateModal: FC<ProjectCreateModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
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
      <DialogContent showCloseButton={false} className="max-h-[80vh] min-w-2xl">
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
                  <Input
                    {...field}
                    id="project-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Введите название проекта"
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
