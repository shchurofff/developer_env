import { FC } from "react";
import { Heading, Text } from "#ui";

interface PageHeroProps {
  title: string;
  subTitle: string;
}

export const PageHero: FC<PageHeroProps> = ({ title, subTitle }) => {
  return (
    <div className="mx-auto flex w-3xl flex-col">
      <Heading>{title}</Heading>
      <Text variant={"muted"}>{subTitle}</Text>
    </div>
  );
};
