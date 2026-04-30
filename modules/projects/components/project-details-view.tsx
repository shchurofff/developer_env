"use client";

import { useDeferredValue, useState } from "react";
import { ProjectDetails } from "#server/services/projects";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Heading,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Text,
} from "#ui";
import {
  CalendarRange,
  FolderSearch,
  Plus,
  Search,
  TimerReset,
} from "lucide-react";
import { normalizeDate } from "@/lib/date-normalize";
import { ProjectAvatar } from "./project-avatar";
import { STATUS_CONFIG } from "../utils";
import { TaskModal, TasksTable } from "#mod/tasks/components";
import { deleteTask } from "#server/actions/tasks";
import { toast } from "sonner";

interface ProjectDetailsViewProps {
  project: ProjectDetails;
}

export const ProjectDetailsView = ({ project }: ProjectDetailsViewProps) => {
  const [searchValue, setSearchValue] = useState("");
  const deferredSearch = useDeferredValue(searchValue);

  const [showTaskModal, setShowTaskModal] = useState(false);

  const activeProjectStatus = STATUS_CONFIG[project.status];

  const normalizedQuery = deferredSearch.trim().toLowerCase();

  const filteredTasks = project.tasks.filter((task) => {
    if (!normalizedQuery) {
      return true;
    }

    const description = task.description.toLowerCase() ?? "";

    return (
      task.name.toLowerCase().includes(normalizedQuery) ||
      description.includes(normalizedQuery)
    );
  });

  const handleCreateTask = () => {
    setShowTaskModal(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    const result = await deleteTask(taskId);

    if (!result.success) {
      toast.error(result.error);
      return result.error;
    }
    toast.success("Задача успешно удалена");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-background/90 border">
        <CardHeader className="gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <ProjectAvatar
                image={project.favicon ?? undefined}
                name={project.name}
              />
              <div className="min-w-0 space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <Heading className="text-balance" level="h1">
                    {project.name}
                  </Heading>
                  <Badge
                    data-icon="inline-start"
                    variant={activeProjectStatus.variant}
                    className="w-fit"
                  >
                    <activeProjectStatus.icon />
                    {activeProjectStatus.label}
                  </Badge>
                </div>

                <Text variant="muted" className="max-w-3xl text-balance">
                  {project.description}
                </Text>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" data-icon="inline-start">
                <CalendarRange />
                {normalizeDate(project.startDay)} -{" "}
                {project.endDay ? normalizeDate(project.endDay) : "по сей день"}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/*<Card size="sm">
              <CardHeader className="space-y-1">
                <CardTitle>
                  <Text variant="muted">Период работы</Text>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Text variant="large" className="text-xl font-semibold">
                  {project.endDay ? "Завершён" : "Активный"}
                </Text>
                <Text variant="muted">
                  С {normalizeDate(project.startDay)}
                  {project.endDay ? ` по ${normalizeDate(project.endDay)}` : ""}
                </Text>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader className="space-y-1">
                <CardTitle>
                  <Text variant="muted">Прогресс по задачам</Text>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Text variant="large" className="text-xl font-semibold">
                  {doneTasks}/{totalTasks || 0}
                </Text>
                <Text variant="muted">Готово к текущему моменту</Text>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader className="space-y-1">
                <CardTitle>
                  <Text variant="muted">Фокус в работе</Text>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Text variant="large" className="text-xl font-semibold">
                  {inProgressTasks}
                </Text>
                <Text variant="muted">
                  Активных, отложено: {postponedTasks}
                </Text>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader className="space-y-1">
                <CardTitle>
                  <Text variant="muted">Технологии</Text>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Text variant="large" className="text-xl font-semibold">
                  {project.stack.length}
                </Text>
                <ProjectStack stack={project.stack} />
              </CardContent>
            </Card>*/}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background/90 border">
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <CardTitle>
              <Heading level="h2">Задачи проекта</Heading>
            </CardTitle>
            <Text variant="muted" className="max-w-2xl text-balance">
              Здесь удобно держать оперативный список задач по проекту: что
              делалось, когда началось и какой контекст был у каждой записи.
            </Text>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-md lg:flex-row">
            <InputGroup className="w-full lg:min-w-80">
              <InputGroupInput
                placeholder="Поиск по задаче, номеру или описанию"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>

            <Button
              type="button"
              className="lg:shrink-0"
              onClick={() => handleCreateTask()}
            >
              <Plus />
              Добавить задачу
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {filteredTasks.length > 0 ? (
            <TasksTable tasks={filteredTasks} onDelete={handleDeleteTask} />
          ) : (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  {searchValue ? <FolderSearch /> : <TimerReset />}
                </EmptyMedia>
                <EmptyTitle>
                  {searchValue ? "Совпадений не найдено" : "Пока нет задач"}
                </EmptyTitle>
                <EmptyDescription>
                  {searchValue
                    ? "Попробуйте изменить запрос или очистите поиск, чтобы увидеть все задачи проекта."
                    : "Когда добавите первую задачу, здесь появится рабочая лента проекта с поиском и статусами."}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex-row justify-center gap-2">
                {searchValue ? (
                  <Button variant="outline" onClick={() => setSearchValue("")}>
                    Сбросить поиск
                  </Button>
                ) : (
                  <Button onClick={handleCreateTask}>Добавить задачу</Button>
                )}
              </EmptyContent>
            </Empty>
          )}
        </CardContent>
      </Card>
      {showTaskModal && (
        <TaskModal
          projectId={project.id}
          isOpen={showTaskModal}
          onOpenChange={setShowTaskModal}
        />
      )}
    </div>
  );
};
