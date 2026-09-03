"use client";

import Link from "next/link";
import clsx from "clsx";

interface CommerceButtonProps {
  children: React.ReactNode;

  href?: string;

  onClick?: () => void;

  disabled?: boolean;

  type?: "button" | "submit";

  variant?:
    | "primary"
    | "secondary";

  className?: string;
}

export default function CommerceButton({
  children,
  href,
  onClick,
  disabled = false,
  variant = "primary",
  className,
}: CommerceButtonProps) {
  const styles = clsx(
    `
      inline-flex
      items-center
      justify-center

      min-h-[56px]
      px-10

      text-[11px]
      font-medium
      uppercase
      tracking-[0.35em]

      transition-all
      duration-500

      focus:outline-none
    `,
    variant === "primary"
      ? `
          bg-white
          text-black
          hover:bg-white/90
        `
      : `
          border
          border-white/15
          text-white
          hover:border-white/40
          hover:bg-white/[0.03]
        `,
    disabled &&
      `
        cursor-not-allowed
        opacity-50
      `,
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={styles}
        aria-disabled={
          disabled
        }
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
          }
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
}