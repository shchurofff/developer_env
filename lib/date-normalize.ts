import { format } from "date-fns";

export const normalizeDate = (date: Date) => {
  return format(new Date(date), "dd.MM.yyyy");
};
