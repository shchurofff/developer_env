import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

const textVariants = cva("[&:not(:first-child)]:mt-2", {
  variants: {
    variant: {
      default: "leading-7",
      lead: "text-muted-foreground text-xl",
      large: "text-lg font-semibold",
      small: "text-sm leading-none font-medium",
      muted: "text-muted-foreground text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TextProps
  extends
    HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

export const Text: FC<PropsWithChildren<TextProps>> = ({
  variant,
  className,
  children,
  ...props
}) => {
  return (
    <p className={cn(textVariants({ variant, className }))} {...props}>
      {children}
    </p>
  );
};
