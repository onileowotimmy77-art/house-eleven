import clsx from "clsx";
import { ElementType } from "react";
import { TypeScale } from "@/lib/typography";

interface BodyProps {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}

export default function Body({
  children,
  className,
  as: Component = "p",
}: BodyProps) {
  return (
    <Component
      className={clsx(
        TypeScale.body,
        className
      )}
    >
      {children}
    </Component>
  );
}