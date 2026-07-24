"use client";

import clsx from "clsx";

interface CommercePriceProps {
  price: number;
  currency?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function CommercePrice({
  price,
  currency = "₦",
  className,
  size = "md",
}: CommercePriceProps) {
  const formatted = new Intl.NumberFormat("en-NG").format(price);

  return (
    <p
      className={clsx(
        "font-medium tracking-[-0.03em] text-white",
        {
          "text-lg": size === "sm",
          "text-xl": size === "md",
          "text-2xl": size === "lg",
        },
        className
      )}
    >
      <span className="mr-1 text-white/60">
        {currency}
      </span>

      {formatted}
    </p>
  );
}