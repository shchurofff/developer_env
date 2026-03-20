import { ProjectWithTaskCount } from "#server/services";
import { FC } from "react";
import { TECH_ICONS } from "../utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "#ui";

interface ProjectStackProps {
  stack: ProjectWithTaskCount["stack"];
}

export const ProjectStack: FC<ProjectStackProps> = ({ stack }) => {
  return (
    <div className="flex gap-4">
      {stack.map((tech) => {
        const Icon = TECH_ICONS[tech.icon];

        if (!Icon) return null;

        return (
          <div key={tech.id} className="group relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <Icon className="text-muted-foreground hover:text-primary size-5 transition-colors duration-200" />
              </TooltipTrigger>
              <TooltipContent className="bg-popover-foreground text-popover px-2 py-1">
                {tech.name}
              </TooltipContent>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};
