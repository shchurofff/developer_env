import { ProjectWithTaskCount } from "#server/services";
import {
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
import { CheckCheck, MoveRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { STATUS_CONFIG } from "../utils";
import { ProjectAvatar } from "./project-avatar";

interface ProjectCardProps {
  favicon?: string;
  project: ProjectWithTaskCount;
}

export const ProjectCard: FC<ProjectCardProps> = ({ favicon, project }) => {
  const projectStatus = STATUS_CONFIG[project.status] || {
    label: "Неизвестно",
    variant: "secondary",
    icon: CheckCheck,
  };
  const StatusIcon = projectStatus.icon;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4 pb-2">
          <ProjectAvatar name={project.name} />
          <Heading className="flex-1" level={"h3"}>
            {project.name}
          </Heading>
        </CardTitle>
        <CardDescription>
          <Text variant={"muted"}>{project.description}</Text>
        </CardDescription>
        <CardAction>
          <Button variant={"ghost"} asChild>
            <Link href={`./projects/${project.id}`}>
              <MoveRight />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Text>Задач закрыто: {project.tasksCount}</Text>
        <Badge data-icon="inline-start" variant={projectStatus.variant}>
          <StatusIcon /> {projectStatus.label}
        </Badge>
      </CardContent>
      {/*<CardFooter>
        <p>Card Footer</p>
      </CardFooter>*/}
    </Card>
  );
};
