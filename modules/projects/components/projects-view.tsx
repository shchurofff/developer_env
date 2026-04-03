"use client";

import { FC, useState } from "react";
import { StatusCard } from "./status-card";
import { ProjectsFilters } from "./projects-filters";
import { ProjectCard } from "./project-card";
import { ProjectWithTaskCount } from "#server/services/projects/index";
import { ProjectCreateModal } from "./project-create-modal";
import { deleteProject } from "#server/actions";
import { toast } from "sonner";
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#ui";
import { FolderX } from "lucide-react";
import { Technology } from "@/generated/prisma/browser";

interface ProjectsViewProps {
  initialProjects: ProjectWithTaskCount[];
  stack: Technology[];
}

export const ProjectsView: FC<ProjectsViewProps> = ({
  initialProjects,
  stack,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] =
    useState<ProjectWithTaskCount | null>(null);

  const filteredProjects = initialProjects.filter((p) =>
    p.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const activeProjectsCount = initialProjects.filter(
    (project) => project.status === "WORKING_NOW"
  ).length;
  const finishedProjectsCount = initialProjects.length - activeProjectsCount;

  const handleDelete = async (id: string) => {
    const result = await deleteProject(id);

    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Проект успешно удалён");
  };

  const handeCreateProject = () => {
    setEditingProject(null);
    setShowCreateModal(true);
  };

  const handleEditProject = (project: ProjectWithTaskCount) => {
    setEditingProject(project);
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-5">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatusCard
          title="Проектов"
          content="Всего в рабочем пространстве"
          dataCount={initialProjects.length}
        />
        <StatusCard
          title="Задач"
          content="Закреплено за проектами"
          dataCount={initialProjects.reduce(
            (acc, proj) => acc + proj.tasksCount,
            0
          )}
        />
        <StatusCard
          title="Статус"
          content={`В работе: ${activeProjectsCount} • Завершено: ${finishedProjectsCount}`}
          dataCount={activeProjectsCount}
        />
      </div>
      <ProjectsFilters
        searchValue={searchValue}
        setSeachValue={setSearchValue}
        onCreate={handeCreateProject}
      />
      {filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onDelete={handleDelete}
              onEdit={handleEditProject}
            />
          ))}
        </div>
      )}
      {!filteredProjects.length && (
        <Empty className="mt-20">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderX />
            </EmptyMedia>
            <EmptyTitle>
              {searchValue ? "Ничего не найдено" : "Ещё нет проектов"}
            </EmptyTitle>
            <EmptyDescription>
              {searchValue
                ? "Попробуйте изменить запрос или очистите поиск, чтобы увидеть все проекты."
                : "Вы ещё не создали ни одного проекта. Начните с первого и постепенно соберите своё рабочее портфолио."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            {searchValue ? (
              <Button variant="outline" onClick={() => setSearchValue("")}>
                Сбросить поиск
              </Button>
            ) : (
              <Button onClick={handeCreateProject}>Создать проект</Button>
            )}
          </EmptyContent>
        </Empty>
      )}

      <ProjectCreateModal
        isOpen={showCreateModal}
        stack={stack}
        onOpenChange={setShowCreateModal}
        project={editingProject}
      />
    </div>
  );
};
