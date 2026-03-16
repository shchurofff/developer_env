import { ProjectWithTaskCount } from "#server/services";
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "#ui";
import { Project } from "@/generated/prisma/browser";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ProjectCardProps {
  favicon?: string;
  project: ProjectWithTaskCount;
}

export const ProjectCard: FC<ProjectCardProps> = ({ favicon, project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Heading level={"h3"}>{project.name}</Heading>
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
      <CardContent>
        <Text>Задач закрыто: {project.tasksCount}</Text>
      </CardContent>
      {/*<CardFooter>
        <p>Card Footer</p>
      </CardFooter>*/}
    </Card>
  );
};
