"use client";

import BagItem from "./BagItem";

import CommerceEmpty from "@/src/features/commerce/CommerceEmpty";

import { useBagStore } from "@/src/lib/stores/useBagStore";

import { getProduct } from "@/src/data/getProduct";

export default function BagItems() {
  const items = useBagStore((state) => state.items);

  const removeFromBag = useBagStore(
    (state) => state.removeFromBag
  );

  const updateQuantity = useBagStore(
    (state) => state.updateQuantity
  );

  if (items.length === 0) {
    return (
      <CommerceEmpty
        eyebrow="Selection"
        title="Nothing Has Been Selected."
        description="The House is waiting. Explore the collection and discover the pieces that belong with you."
        cta="Explore Collections"
        href="/collections"
      />
    );
  }

  return (
    <div>
      {items.map((item) => {
        const product = getProduct(item.productSlug);

        if (!product) {
          return null;
        }

        return (
          <BagItem
            key={`${item.productSlug}-${item.size}`}
            image={product.bagImage}
            name={product.name}
            collection={product.collection}
            colour={product.color}
            size={item.size}
            quantity={item.quantity}
            price={product.priceValue}
            onIncrease={() =>
              updateQuantity(
                item.productSlug,
                item.size,
                item.quantity + 1
              )
            }
            onDecrease={() =>
              updateQuantity(
                item.productSlug,
                item.size,
                item.quantity - 1
              )
            }
            onRemove={() =>
              removeFromBag(
                item.productSlug,
                item.size
              )
            }
          />
        );
      })}
    </div>
  );
}