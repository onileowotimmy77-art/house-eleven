import { ReactNode } from "react";
import clsx from "clsx";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export default function Eyebrow({
  children,
  className,
}: EyebrowProps) {
  return (
    <p
      className={clsx(
        `
        font-mono
        text-xs
        uppercase
        tracking-[0.45em]
        text-white/45
        `,
        className
      )}
    >
      {children}
    </p>
  );
}