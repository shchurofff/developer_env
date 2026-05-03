import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "#ui";
import { FC, useState, useTransition } from "react";
import { Task, TaskTableColumn } from "#mod/tasks/types";
import { TASK_STATUS_CONFIG } from "#mod/tasks/utils";
import { PenBoxIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { normalizeDate } from "@/lib/date-normalize";
import Link from "next/link";

interface TasksTableProps {
  tasks: Task[];
  onDelete: (id: string) => Promise<string | undefined>;
  onEdit: (task: Task) => void;
  addTimeEntry: (id: Task["id"]) => void;
  projectSlug: string;
}

export const TasksTable: FC<TasksTableProps> = ({
  tasks,
  onDelete,
  onEdit,
  addTimeEntry,
  projectSlug,
}) => {
  const [isPending, startTransition] = useTransition();
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);

  const handleDeleteTask = (taskId: string) => {
    setPendingTaskId(taskId);
    startTransition(async () => {
      const error = await onDelete(taskId);

      if (error) {
        setPendingTaskId(null);
      }
    });
  };

  const columns: TaskTableColumn[] = [
    {
      key: "startDay",
      header: "Дата постановки",
      render: (row) => <Text>{normalizeDate(row.startDay)}</Text>,
    },
    {
      key: "name",
      header: "Название",
      render: (row) => (
        <Link
          className="underline underline-offset-4"
          href={`/projects/${projectSlug}/tasks/${row.id}`}
        >
          {row.name}
        </Link>
      ),
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
    {
      key: "timeEntries",
      header: "Записи времени",
      render: (row) => (
        <Text className="text-center">{row._count.timeEntries}</Text>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant={"ghost"}
            size={"icon-lg"}
            onClick={() => addTimeEntry(row.id)}
          >
            <PlusIcon />
          </Button>

          <Button
            variant={"ghost"}
            size={"icon-lg"}
            onClick={() => onEdit(row)}
          >
            <PenBoxIcon />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon-lg"}
                className="cursor-pointer opacity-50 hover:opacity-100"
              >
                <Trash2Icon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Вы точно уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                  Действие нельзя будет отменить. Вы точно хотите удалить задачу
                  и все записи в ней?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant={"default"}>
                  Отменить
                </AlertDialogCancel>
                <AlertDialogAction
                  variant={"destructive"}
                  onClick={() => handleDeleteTask(row.id)}
                >
                  Удалить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
        {tasks.map((task) => {
          const isRowPending = isPending && pendingTaskId === task.id;

          return (
            <TableRow
              key={task.id}
              id={task.id}
              className={
                isRowPending ? "pointer-events-none opacity-50" : undefined
              }
            >
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.render(task)}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
