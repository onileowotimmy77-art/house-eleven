"use client";

import { getProduct } from "@/src/data/getProduct";

interface ConfirmationItem {
  productSlug: string;
  size: string;
  quantity: number;
}

interface ConfirmationItemsProps {
  items: ConfirmationItem[];
}

export default function ConfirmationItems({
  items,
}: ConfirmationItemsProps) {
  return (
    <section
      className="
        mt-40
        border-t
        border-white/10
        pt-16
      "
    >
      <p
        className="
          font-mono
          text-[11px]
          uppercase
          tracking-[0.35em]
          text-white/40
        "
      >
        Your Selection
      </p>

      <div
        className="
          mt-12
          divide-y
          divide-white/10
          border-y
          border-white/10
        "
      >
        {items.map((item) => {
          const product =
            getProduct(
              item.productSlug
            );

          if (!product) {
            return null;
          }

          const itemTotal =
            product.priceValue *
            item.quantity;

          const formattedItemTotal =
            new Intl.NumberFormat(
              "en-NG"
            ).format(
              itemTotal
            );

          return (
            <article
              key={`
                ${item.productSlug}-
                ${item.size}
              `}
              className="
                flex
                flex-col
                gap-8
                py-10

                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-xl
                    font-medium
                    tracking-[-0.03em]
                  "
                >
                  {product.name}
                </p>

                <p
                  className="
                    mt-3
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-[0.3em]
                    text-white/40
                  "
                >
                  {product.color}
                  {" · "}
                  Size {item.size}
                  {" · "}
                  Quantity {item.quantity}
                </p>
              </div>

              <p
                className="
                  text-lg
                  tracking-[-0.02em]
                  text-white/80
                "
              >
                ₦{formattedItemTotal}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}