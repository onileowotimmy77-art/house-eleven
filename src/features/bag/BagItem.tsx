"use client";

import Image from "next/image";

import CommerceDivider from "@/src/features/commerce/CommerceDivider";
import CommercePrice from "@/src/features/commerce/CommercePrice";
import CommerceQuantity from "@/src/features/commerce/CommerceQuantity";

interface BagItemProps {
  image: string;
  name: string;
  collection: string;
  colour: string;
  size: string;
  quantity: number;
  price: number;

  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function BagItem({
  image,
  name,
  collection,
  colour,
  size,
  quantity,
  price,
  onIncrease,
  onDecrease,
  onRemove,
}: BagItemProps) {
  return (
    <article>

      <div className="grid gap-10 md:grid-cols-[220px_minmax(0,1fr)]">

        {/* Image */}

        <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.03]">

          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="220px"
          />

        </div>

        {/* Content */}

        <div className="flex flex-col justify-between">

          <div>

            <p
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-white/40
              "
            >
              {collection}
            </p>

            <h2
              className="
                mt-5
                text-3xl
                font-semibold
                tracking-[-0.04em]
              "
            >
              {name}
            </h2>

            <div className="mt-10 space-y-4">

              <div className="flex justify-between">

                <span className="text-white/50">
                  Colour
                </span>

                <span>
                  {colour}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-white/50">
                  Size
                </span>

                <span>
                  {size}
                </span>

              </div>

            </div>

          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-8">

            <CommerceQuantity
              quantity={quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />

            <CommercePrice
              price={price}
              size="md"
            />

          </div>

          <button
            type="button"
            onClick={onRemove}
            className="
              mt-10
              w-fit

              text-[11px]
              uppercase
              tracking-[0.35em]

              text-white/35

              transition-colors
              duration-300

              hover:text-white
            "
          >
            Remove
          </button>

        </div>

      </div>

      <CommerceDivider className="my-16" />

    </article>
  );
}