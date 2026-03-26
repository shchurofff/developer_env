import { cn } from "@/lib/utils";
import { Briefcase, GraduationCap, Loader } from "lucide-react";
import { FC } from "react";
import { HomeCard, HomeCardProps } from "./home-card";

interface HomeCardBlockProps {
  className?: string;
}

export const HomeCardBlock: FC<HomeCardBlockProps> = ({ className }) => {
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
  return (
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
  );
};
