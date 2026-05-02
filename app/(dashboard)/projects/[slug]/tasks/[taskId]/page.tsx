import { getTaskById } from "#server/services/tasks";
import { Text } from "#ui";
import { requireSession } from "@/lib/auth";
import { notFound } from "next/navigation";

interface TaskPageProps {
  params: Promise<{
    taskId: string;
  }>;
}

export default async function TaskPage({ params }: TaskPageProps) {
  const session = await requireSession();

  const { taskId } = await params;
  const task = await getTaskById(taskId, session.user.id);

  if (!task) {
    notFound();
  }
  console.log(task);
  return <Text>Hello Task</Text>;
}
