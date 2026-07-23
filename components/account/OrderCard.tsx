"use client";

import Link from "next/link";

interface OrderCardProps {
  orderNumber: string;
  placedOn: string;
  status: string;
  total: string;
  href: string;
}

export default function OrderCard({
  orderNumber,
  placedOn,
  status,
  total,
  href,
}: OrderCardProps) {
  return (
    <Link
      href={href}
      className="
        group
        block

        border-b
        border-white/10

        py-10

        transition-colors
        duration-300
      "
    >
      <div
        className="
          flex
          flex-col
          gap-8

          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>

          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-white/35
            "
          >
            {orderNumber}
          </p>

          <h2
            className="
              mt-4
              text-[1.5rem]
              font-medium
              tracking-[-0.03em]
            "
          >
            {status}
          </h2>

          <p
            className="
              mt-3
              text-white/50
            "
          >
            Placed {placedOn}
          </p>

        </div>

        <div
          className="
            flex
            items-center
            gap-8
          "
        >
          <p
            className="
              text-lg
              tracking-[-0.02em]
            "
          >
            {total}
          </p>

          <span
            className="
              text-xl
              transition-transform
              duration-300

              group-hover:translate-x-1
            "
          >
            →
          </span>
        </div>

      </div>
    </Link>
  );
}