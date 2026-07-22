"use client";

import clsx from "clsx";

interface FieldHintProps {
  children: React.ReactNode;
  className?: string;
}

export default function FieldHint({
  children,
  className,
}: FieldHintProps) {
  return (
    <p
      className={clsx(
        `
        text-sm
        leading-6
        text-white/40
        `,
        className
      )}
    >
      {children}
    </p>
  );
}