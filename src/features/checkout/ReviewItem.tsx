"use client";

interface ReviewItemProps {
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: string;
}

export default function ReviewItem({
  name,
  color,
  size,
  quantity,
  price,
}: ReviewItemProps) {
  return (
    <article
      className="
        border-b
        border-white/10
        py-10
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-10
        "
      >
        <div>
          <h3
            className="
              text-[1.4rem]
              font-medium
              tracking-[-0.03em]
            "
          >
            {name}
          </h3>

          <p
            className="
              mt-4
              font-mono
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-white/40
            "
          >
            {color}

            <span className="mx-3 text-white/20">
              •
            </span>

            {size}

            <span className="mx-3 text-white/20">
              •
            </span>

            Qty {quantity}
          </p>
        </div>

        <p
          className="
            whitespace-nowrap
            text-lg
            font-medium
            tracking-[-0.02em]
          "
        >
          {price}
        </p>
      </div>
    </article>
  );
}