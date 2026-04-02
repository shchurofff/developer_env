"use client";

import { cn } from "@/lib/utils";
import { Briefcase, GraduationCap, Loader } from "lucide-react";
import { FC } from "react";
import { HomeCard, HomeCardProps } from "./home-card";
import { Button, Text } from "#ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth";
import { toast } from "sonner";

interface HomeCardBlockProps {
  user: {
    email: string | null;
    name: string | null;
  } | null;
  className?: string;
}

const sections: HomeCardProps[] = [
  {
    icon: Briefcase,
    title: "Работа с проектами",
    description:
      "Управляй проектами: добавляй информацию и данные о проделанной работе. Трекай задачи и время без VPN и Jira. Фокусируйся на важном и не теряй время зря.",
    href: "/projects",
  },
  {
    icon: GraduationCap,
    title: "База знаний и заметок",
    description:
      "Добавляй заметки с разделами знаний, в которых имеешь пробелы. Сохраняй статьи и ссылки на документацию, которые ты больше не потеряешь в заметках. Структурируй информацию, чтобы наиболее эффективней готовиться к собеседованиям.",
    href: "/repository",
  },
  {
    icon: Loader,
    title: "Блок на этапе согласования",
    description: "",
    href: "/",
  },
];

export const HomeCardBlock: FC<HomeCardBlockProps> = ({ className, user }) => {
  const router = useRouter();

  const handleGuestStart = async () => {
    const result = await authClient.signIn.anonymous();
    if (result.error) {
      console.error(result.error);
      toast.error("Не удалось войти в гостевой режим");
      return;
    }

    toast.success("Гостевой режим активирован");
    router.push("/projects");
    router.refresh();
  };
  return (
    <>
      <div
        className={cn(
          "mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {sections.map((section, index) => (
          <HomeCard
            key={index}
            icon={section.icon}
            title={section.title}
            description={section.description}
            href={section.href}
          />
        ))}
      </div>
      <div className="flex flex-col items-center gap-3">
        {user ? (
          <>
            <Text variant="muted">
              Вы вошли как {user.name ?? "пользователь"}
              {user.email ? ` (${user.email})` : ""}
            </Text>
          </>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleGuestStart}>
              Попробовать как гость
            </Button>

            <Button asChild>
              <Link href="/login">Войти или зарегистрироваться</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
