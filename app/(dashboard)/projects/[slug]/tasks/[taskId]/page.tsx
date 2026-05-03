import { getTaskById } from "#server/services/tasks";
import {
  Badge,
  BreadcrumbNavigation,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Heading,
  Text,
} from "#ui";
import { requireSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock3, ListTodo, PencilRuler } from "lucide-react";

interface TaskPageProps {
  params: Promise<{
    slug: string;
    taskId: string;
  }>;
}

export default async function TaskPage({ params }: TaskPageProps) {
  const session = await requireSession();

  const { slug, taskId } = await params;
  const task = await getTaskById(taskId, session.user.id);

  if (!task) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <BreadcrumbNavigation
        items={[
          { label: "Проекты", href: "/projects" },
          { label: "Текущий проект", href: `/projects/${slug}` },
          { label: task.name },
        ]}
      />

      <Card className="bg-background/90 border">
        <CardHeader className="gap-4">
          <div className="space-y-2">
            <Badge variant="outline" className="w-fit">
              Task details in progress
            </Badge>
            <CardTitle>
              <Heading level="h1">{task.name}</Heading>
            </CardTitle>
            <Text variant="muted" className="max-w-3xl text-balance">
              Страница задачи уже выделена в отдельный маршрут, чтобы дальше
              здесь можно было полноценно собрать рабочий контекст: описание,
              историю time entries, быстрые действия и редактирование.
            </Text>
          </div>
        </CardHeader>
      </Card>

      <Empty className="bg-background/70 border px-6 py-12">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ListTodo />
          </EmptyMedia>
          <EmptyTitle>Детальная карточка задачи скоро появится</EmptyTitle>
          <EmptyDescription>
            Сейчас данные задачи уже существуют и доступны по маршруту, а
            следующим шагом здесь появится полноценный рабочий экран для
            описания, заметок по выполнению и учёта времени.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="flex-col items-center gap-4">
          <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-base">Описание и статус</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="muted">
                  Основные данные задачи, сроки, текущее состояние и контекст
                  выполнения.
                </Text>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-base">Записи времени</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="muted">
                  Лента time entries с указанием даты, длительности и коротких
                  рабочих заметок.
                </Text>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-base">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="muted">
                  Редактирование задачи, добавление времени и управление
                  прогрессом в одном месте.
                </Text>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" data-icon="inline-start">
              <Clock3 />
              {task._count.timeEntries} time entries
            </Badge>
            <Badge variant="outline" data-icon="inline-start">
              <PencilRuler />В разработке
            </Badge>
          </div>

          <Button asChild variant="outline">
            <Link href={`/projects/${task.project.slug}`}>
              <ArrowLeft />
              Вернуться к проекту
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
