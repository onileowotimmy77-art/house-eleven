"use client";

import clsx from "clsx";

interface FieldErrorProps {
  children: React.ReactNode;
  className?: string;
}

export default function FieldError({
  children,
  className,
}: FieldErrorProps) {
  return (
    <p
      role="alert"
      className={clsx(
        `
        text-sm
        leading-6
        text-red-300/90
        `,
        className
      )}
    >
      {children}
    </p>
  );
}