import { CheckCircle2, CircleDashed, Clock3, PauseCircle } from "lucide-react";

export const TASK_STATUS_CONFIG = {
  TODO: {
    label: "К выполнению",
    variant: "outline" as const,
    icon: CircleDashed,
  },
  IN_PROGRESS: {
    label: "В работе",
    variant: "default" as const,
    icon: Clock3,
  },
  DONE: {
    label: "Готово",
    variant: "secondary" as const,
    icon: CheckCircle2,
  },
  POSTPONED: {
    label: "Отложено",
    variant: "destructive" as const,
    icon: PauseCircle,
  },
};
