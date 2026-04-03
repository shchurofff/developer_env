import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "#ui";
import { FC } from "react";

interface StatusCardProps {
  title: string;
  content: string;
  dataCount: string | number;
}

export const StatusCard: FC<StatusCardProps> = ({
  title,
  content,
  dataCount,
}) => {
  return (
    <Card size="sm">
      <CardHeader className="space-y-1">
        <CardTitle>
          <Text variant={"muted"}>{title}</Text>
        </CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="space-y-1">
        <Text variant={"large"} className="text-2xl font-semibold">
          {dataCount}
        </Text>
        <Text variant={"muted"}>{content}</Text>
      </CardContent>
    </Card>
  );
};
