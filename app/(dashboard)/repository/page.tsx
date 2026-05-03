import Link from "next/link";
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
import { BookMarked, MoveRight } from "lucide-react";

export default async function RepositoryPage() {
  return (
    <div className="space-y-6">
      <BreadcrumbNavigation
        items={[
          { label: "Проекты", href: "/projects" },
          { label: "Repository of knowledge" },
        ]}
      />

      <Card className="bg-background/90 border">
        <CardHeader className="gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                In development
              </Badge>
              <CardTitle>
                <Heading level="h1">Repository of Knowledge</Heading>
              </CardTitle>
              <Text variant="muted" className="max-w-3xl text-balance">
                Этот блок станет личным хранилищем знаний: заметок, ссылок на
                документацию, разборов тем для собеседований и коротких
                шпаргалок по технологиям.
              </Text>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Empty className="bg-background/70 border px-6 py-12">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BookMarked />
          </EmptyMedia>
          <EmptyTitle>Раздел готовится к следующему этапу</EmptyTitle>
          <EmptyDescription>
            Сначала я довожу до законченного состояния блок управления
            проектами, задачами и трекингом времени. После этого здесь появятся
            коллекции заметок, структурированные разделы знаний и быстрый поиск
            по материалам.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="flex-col items-center gap-4">
          <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-base">Заметки и конспекты</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="muted">
                  Короткие записи по темам, которые хочется удерживать под рукой
                  каждый день.
                </Text>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-base">
                  Ссылки на документацию
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="muted">
                  Подборки полезных ресурсов без потери ссылок в браузерных
                  закладках и заметках.
                </Text>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-base">
                  Подготовка к интервью
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="muted">
                  Вопросы, разборы и личная база знаний по темам, которые нужно
                  повторять регулярно.
                </Text>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              Следующий крупный этап после завершения task-flow.
            </div>

            <Button asChild variant="outline">
              <Link href="/projects">
                Вернуться к проектам
                <MoveRight />
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
