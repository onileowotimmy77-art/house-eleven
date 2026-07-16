"use client";

import Link from "next/link";

interface EditorialLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function EditorialLink({
  href,
  children,
  className = "",
}: EditorialLinkProps) {
  return (
    <Link
      href={href}
      className={`
        inline-flex
        items-center
        gap-3
        font-mono
        text-[11px]
        uppercase
        tracking-[0.45em]
        text-white/60
        transition-all
        duration-500
        hover:text-white
        group

        ${className}
      `}
    >
      <span>{children}</span>

      <span
        className="
          transition-transform
          duration-500
          group-hover:translate-x-2
        "
      >
        →
      </span>
    </Link>
  );
}