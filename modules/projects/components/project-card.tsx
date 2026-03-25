"use client";

import { ProjectWithTaskCount } from "#server/services/projects/index";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "#ui";
import { CheckCheck, MoveRight, Trash2, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { FC, useTransition } from "react";
import { STATUS_CONFIG } from "../utils";
import { ProjectAvatar } from "./project-avatar";
import { cn } from "@/lib/utils";
import { ProjectStack } from "./project-stack";

interface ProjectCardProps {
  favicon?: string;
  project: ProjectWithTaskCount;
  onDelete: (id: string) => Promise<void>;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  favicon,
  project,
  onDelete,
}) => {
  const [isPending, startTransition] = useTransition();

  const projectStatus = STATUS_CONFIG[project.status] || {
    label: "Неизвестно",
    variant: "secondary",
    icon: CheckCheck,
  };
  const StatusIcon = projectStatus.icon;

  const deleteConfirm = () => {
    startTransition(async () => {
      await onDelete(project.id);
    });
  };
  return (
    <Card
      className={cn(
        "transition-opacity",
        isPending && "pointer-events-none opacity-50"
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-4 pb-2">
          <ProjectAvatar name={project.name} image={favicon} />
          <Heading className="flex-1" level={"h3"}>
            {project.name}
          </Heading>
        </CardTitle>
        <CardDescription>
          <Text variant={"muted"}>{project.description}</Text>
        </CardDescription>
        <CardAction>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon-lg"}
                className="cursor-pointer opacity-50 hover:opacity-100"
                disabled={isPending}
              >
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <Trash2Icon />
                </AlertDialogMedia>
                <AlertDialogTitle>Вы точно уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                  Действие нельзя будет отменить. Вы точно хотите удалить все
                  записи о проекте {project.name}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant={"default"}>
                  Отменить
                </AlertDialogCancel>
                <AlertDialogAction
                  variant={"destructive"}
                  onClick={deleteConfirm}
                >
                  {isPending ? "Удаление..." : "Подтвердить"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant={"ghost"} asChild>
            <Link href={`./projects/${project.slug}`}>
              <MoveRight />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Text>Задач закрыто: {project.tasksCount}</Text>
        <ProjectStack stack={project.stack} />

        <Badge data-icon="inline-start" variant={projectStatus.variant}>
          <StatusIcon /> {projectStatus.label}
        </Badge>
      </CardContent>
    </Card>
  );
};
