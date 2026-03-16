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
      <CardHeader>
        <CardTitle>
          <Text variant={"large"}>{title}</Text>
        </CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent>
        <Text variant={"muted"}>
          {content}:{dataCount}
        </Text>
      </CardContent>
    </Card>
  );
};
