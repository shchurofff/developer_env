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
import { ArrowUpRightIcon, FolderX } from "lucide-react";
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

  const filteredProjects = initialProjects.filter((p) =>
    p.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const result = await deleteProject(id);

    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Проект успешно удалён");
  };

  return (
    <div className="space-y-4">
      <div className="grid w-full grid-cols-3 gap-4">
        <StatusCard
          title="Проектов"
          content="Всего"
          dataCount={initialProjects.length}
        />
        <StatusCard
          title="Задач "
          content="Всего"
          dataCount={initialProjects.reduce(
            (acc, proj) => acc + proj.tasksCount,
            0
          )}
        />
        <StatusCard
          title="Проектов"
          content="Всего"
          dataCount={initialProjects.length}
        />
      </div>
      <ProjectsFilters
        searchValue={searchValue}
        setSeachValue={setSearchValue}
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
      />
      {filteredProjects.map((proj) => (
        <ProjectCard key={proj.id} project={proj} onDelete={handleDelete} />
      ))}
      {!filteredProjects.length && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderX />
            </EmptyMedia>
            <EmptyTitle>No Projects Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any projects yet. Get started by creating
              your first project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button>Create Project</Button>
            <Button variant="outline">Import Project</Button>
          </EmptyContent>
          <Button
            variant="link"
            asChild
            className="text-muted-foreground"
            size="sm"
          >
            <a href="#">
              Learn More <ArrowUpRightIcon />
            </a>
          </Button>
        </Empty>
      )}

      <ProjectCreateModal
        isOpen={showCreateModal}
        stack={stack}
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
};
