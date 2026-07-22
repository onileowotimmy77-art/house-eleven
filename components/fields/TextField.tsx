"use client";

import clsx from "clsx";

interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function TextField({
  className,
  ...props
}: TextFieldProps) {
  return (
    <input
      {...props}
      className={clsx(
        `
        h-14
        w-full

        border-b
        border-white/10

        bg-transparent

        px-0
        pb-3

        text-lg
        tracking-[-0.02em]
        text-white

        placeholder:text-white/20

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
    />
  );
}