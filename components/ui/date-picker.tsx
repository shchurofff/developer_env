"use client";

import { format } from "date-fns";
import {
  Button,
  Calendar,
  Field,
  FieldLabel,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#ui";
import { cn } from "@/lib/utils";

interface DatePickerSimpleProps {
  label: string;
  id?: string;
  value?: Date;
  onChange: (value?: Date) => void;
  isInvalid?: boolean;
  disabled?: boolean;
  className?: string;
}

export function DatePickerSimple({
  id,
  value,
  onChange,
  isInvalid,
  disabled,
  label,
  className,
}: DatePickerSimpleProps) {
  return (
    <Field
      data-invalid={isInvalid}
      data-disabled={disabled}
      className={cn("w-auto", className)}
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            className="w-full justify-start font-normal data-[disabled=true]:opacity-60"
            aria-invalid={isInvalid}
            disabled={disabled}
          >
            {value ? (
              format(value, "dd.MM.yyyy")
            ) : (
              <span>Выберите дату</span>
            )}{" "}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="h-72 w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={disabled ? undefined : onChange}
            defaultMonth={value}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
