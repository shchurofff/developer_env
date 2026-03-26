import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

const headingVariants = cva("scroll-m-20 tracking-tight", {
  variants: {
    level: {
      h1: "text-center text-4xl font-extrabold  text-balance",
      h2: "border-b pb-2 text-3xl font-semibold  first:mt-0",
      h3: "text-2xl font-semibold ",
    },
  },
  defaultVariants: {
    level: "h1",
  },
});

interface HeadingProps
  extends
    HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

export const Heading: FC<PropsWithChildren<HeadingProps>> = ({
  level,
  className,
  children,
  ...props
}) => {
  const Component = level || "h1";
  return (
    <Component className={cn(headingVariants({ level, className }))} {...props}>
      {children}
    </Component>
  );
};
