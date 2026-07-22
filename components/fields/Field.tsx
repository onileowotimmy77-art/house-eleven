"use client";

import clsx from "clsx";

interface FieldProps {
  children: React.ReactNode;
  className?: string;
}

export default function Field({
  children,
  className,
}: FieldProps) {
  return (
    <div
      className={clsx(
        `
        flex
        flex-col
        gap-4
        `,
        className
      )}
    >
      {children}
    </div>
  );
}