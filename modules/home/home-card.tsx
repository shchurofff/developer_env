import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "#ui";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export interface HomeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  className?: string;
}

export const HomeCard: FC<HomeCardProps> = ({
  icon: Icon,
  title,
  description,
  href,
  className,
}) => {
  return (
    <Card
      className={cn("bg-card flex h-full w-full max-w-lg flex-col", className)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Icon size={24} className="text-primary shrink-0" />
          <Heading level={"h3"} className="leading-tight text-balance">
            {title}
          </Heading>
        </CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="flex-1">
        <Text>{description}</Text>
      </CardContent>
      <CardFooter className="items-center justify-center">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={href}>Приступить</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
