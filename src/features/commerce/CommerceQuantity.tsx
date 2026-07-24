"use client";

import clsx from "clsx";

interface CommerceQuantityProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  className?: string;
}

export default function CommerceQuantity({
  quantity,
  onDecrease,
  onIncrease,
  className,
}: CommerceQuantityProps) {
  return (
    <div
      className={clsx(
        `
        inline-flex
        items-center
        border
        border-white/10
        `,
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrease}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          text-lg
          text-white/50
          transition-colors
          duration-300
          hover:text-white
        "
      >
        −
      </button>

      <span
        className="
          flex
          h-12
          min-w-[56px]
          items-center
          justify-center

          border-x
          border-white/10

          font-mono
          text-sm
          tracking-[0.2em]
          text-white
        "
      >
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrease}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          text-lg
          text-white/50
          transition-colors
          duration-300
          hover:text-white
        "
      >
        +
      </button>
    </div>
  );
}