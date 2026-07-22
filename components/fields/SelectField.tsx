"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export default function SelectField({
  className,
  children,
  ...props
}: SelectFieldProps) {
  return (
    <div className="relative">

      <select
        {...props}
        className={clsx(
          `
          h-14
          w-full

          appearance-none

          border-b
          border-white/10

          bg-transparent

          px-0
          pb-3
          pr-10

          text-lg
          tracking-[-0.02em]
          text-white

          transition-colors
          duration-300

          outline-none

          hover:border-white/20
          focus:border-white

          disabled:cursor-not-allowed
          disabled:border-white/5
          disabled:text-white/25
          `,
          className
        )}
      >
        {children}
      </select>

      <ChevronDown
        size={16}
        strokeWidth={1.5}
        className="
          pointer-events-none
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          text-white/35
        "
      />

    </div>
  );
}