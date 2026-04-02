import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Text,
  Heading,
} from "#ui";
import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";
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
      className={cn(
        "bg-card/90 hover:border-primary/35 flex h-full w-full max-w-lg flex-col border transition-colors",
        className
      )}
    >
      <CardHeader className="flex gap-4">
        <div className="bg-primary/10 text-primary flex size-11 items-center justify-center border">
          <Icon size={22} className="shrink-0" />
        </div>
        <CardTitle className="flex items-center gap-4">
          <Heading level={"h3"} className="leading-tight text-balance">
            {title}
          </Heading>
        </CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="flex-1">
        <Text variant="muted" className="text-balance">
          {description}
        </Text>
      </CardContent>
      <CardFooter className="items-center justify-center pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between"
          asChild
        >
          <Link href={href} className="hover:bg-transparent">
            Приступить
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
