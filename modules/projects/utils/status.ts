import { CheckCheck, Zap } from "lucide-react";

export const STATUS_CONFIG = {
  WORKING_NOW: {
    label: "Работаю сейчас",
    icon: Zap,
    variant: "default" as const,
  },
  WORKED: {
    label: "Работа завершена",
    icon: CheckCheck,
    variant: "secondary" as const,
  },
};
