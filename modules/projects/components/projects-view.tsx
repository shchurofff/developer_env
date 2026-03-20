"use client";

import { FC, useState } from "react";
import { StatusCard } from "./status-card";
import { ProjectsFilters } from "./projects-filters";
import { ProjectCard } from "./project-card";
import { ProjectWithTaskCount } from "#server/services";
import { ProjectCreateModal } from "./project-create-modal";

interface ProjectsViewProps {
  initialProjects: ProjectWithTaskCount[];
}

export const ProjectsView: FC<ProjectsViewProps> = ({ initialProjects }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  return (
    <div className="space-y-4">
      <div className="grid w-full grid-cols-3 gap-4">
        <StatusCard
          title="Проектов"
          content="Всего"
          dataCount={initialProjects.length}
        />
        <StatusCard
          title="Проектов"
          content="Всего"
          dataCount={initialProjects.length}
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
      {initialProjects
        .filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}

      <ProjectCreateModal
        isOpen={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
};
