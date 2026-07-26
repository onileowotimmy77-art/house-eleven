"use client";

import BagItem from "./BagItem";

import CommerceEmpty from "@/src/features/commerce/CommerceEmpty";

import { useBag } from "@/src/lib/hooks/useBag";

import { getProduct } from "@/src/data/getProduct";

export default function BagItems() {
  const {
    items,
    removeFromBag,
    updateBagQuantity,
  } = useBag();

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
              updateBagQuantity(
                item.productSlug,
                item.size,
                item.quantity + 1
              )
            }
            onDecrease={() =>
              updateBagQuantity(
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