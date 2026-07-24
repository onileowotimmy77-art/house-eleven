"use client";

import clsx from "clsx";

interface PaymentMethodCardProps {
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function PaymentMethodCard({
  title,
  description,
  selected = false,
  onClick,
}: PaymentMethodCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        `
        w-full

        border
        p-8

        text-left

        transition-all
        duration-300
        `,
        selected
          ? "border-white bg-white/[0.03]"
          : "border-white/10 hover:border-white/30"
      )}
    >
      <div className="flex items-start justify-between">

        <div>

          <h3
            className="
              text-lg
              font-medium
              tracking-[-0.02em]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-3
              leading-7
              text-white/50
            "
          >
            {description}
          </p>

        </div>

        <div
          className={clsx(
            `
            mt-1

            h-4
            w-4

            rounded-full
            border

            transition-all
            duration-300
            `,
            selected
              ? "border-white bg-white"
              : "border-white/25"
          )}
        />

      </div>

    </button>
  );
}