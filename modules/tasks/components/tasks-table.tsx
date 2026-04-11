import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "#ui";
import { FC } from "react";
import { Task, TaskTableColumn } from "#mod/tasks/types";
import { TASK_STATUS_CONFIG } from "#mod/tasks/utils";
import {
  EllipsisVerticalIcon,
  GhostIcon,
  PenBoxIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { normalizeDate } from "@/lib/date-normalize";

interface TasksTableProps {
  tasks: Task[];
}

export const TasksTable: FC<TasksTableProps> = ({ tasks }) => {
  const columns: TaskTableColumn[] = [
    {
      key: "startDay",
      header: "Дата постановки",
      render: (row) => <Text>{normalizeDate(row.startDay)}</Text>,
    },
    {
      key: "name",
      header: "Название",
      render: (row) => <Text>{row.name}</Text>,
    },
    {
      key: "description",
      header: "Описание задачи",
      className: "w-full",
      render: (row) => (
        <div className="min-w-0 space-y-1">
          <Text variant="muted" className="line-clamp-3 whitespace-normal">
            {row.description || "Описание к задаче пока не добавлено."}
          </Text>
        </div>
      ),
    },
    {
      key: "status",
      header: "Статус",
      render: (row) => {
        const status = row.status;
        const { label, icon: Icon, variant } = TASK_STATUS_CONFIG[status];
        return (
          <Badge variant={variant} data-icon="inline-start" className="w-fit">
            <Icon /> {label}
          </Badge>
        );
      },
    },
    // {
    //   key: "timeEntries",
    //   header: "Записи времени",
    //   render: (row) => <Text>{row._count.timeEntries}</Text>,
    // },
    {
      key: "actions",
      header: "",
      render: () => (
        <div className="flex gap-2">
          <Button variant={"ghost"} size={"icon-lg"}>
            <PlusIcon />
          </Button>

          <Button variant={"ghost"} size={"icon-lg"}>
            <GhostIcon />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon-lg"} variant="ghost">
                <EllipsisVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <PenBoxIcon />
                Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2Icon />
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
  return (
    <Table className="border">
      <TableHeader className="bg-muted/50">
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className={column.className}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} id={task.id}>
            {columns.map((column) => (
              <TableCell key={column.key} className={column.className}>
                {column.render(task)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
