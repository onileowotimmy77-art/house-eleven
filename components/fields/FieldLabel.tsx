"use client";

import clsx from "clsx";

interface FieldLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

export default function FieldLabel({
  children,
  htmlFor,
  required = false,
  className,
}: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        `
        flex
        items-center
        gap-2

        font-mono
        text-[11px]
        uppercase
        tracking-[0.35em]

        text-white/45
        `,
        className
      )}
    >
      <span>{children}</span>

      {required && (
        <span
          aria-hidden="true"
          className="text-white/25"
        >
          *
        </span>
      )}
    </label>
  );
}