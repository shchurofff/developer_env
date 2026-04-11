import type { ProjectDetails } from "#server/services/projects";
import type { ReactNode } from "react";

export type Task = ProjectDetails["tasks"][number];

export interface TaskTableColumn {
  key: string;
  header: string;
  className?: string;
  render: (row: Task) => ReactNode;
}
