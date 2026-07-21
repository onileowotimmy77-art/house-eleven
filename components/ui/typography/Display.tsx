import clsx from "clsx";
import { ElementType } from "react";
import { TypeScale } from "@/lib/typography";

interface DisplayProps {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}

export default function Display({
  children,
  className,
  as: Component = "h2",
}: DisplayProps) {
  return (
    <Component
      className={clsx(
        TypeScale.display,
        className
      )}
    >
      {children}
    </Component>
  );
}