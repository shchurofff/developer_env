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
import { Task } from "#mod/tasks/types";

interface ProjectDetailsViewProps {
  project: ProjectDetails;
}

export const ProjectDetailsView = ({ project }: ProjectDetailsViewProps) => {
  const [searchValue, setSearchValue] = useState("");
  const deferredSearch = useDeferredValue(searchValue);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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
    setEditingTask(null);
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

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
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
            <TasksTable
              tasks={filteredTasks}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
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
          task={editingTask}
          isOpen={showTaskModal}
          onOpenChange={setShowTaskModal}
        />
      )}
    </div>
  );
};
