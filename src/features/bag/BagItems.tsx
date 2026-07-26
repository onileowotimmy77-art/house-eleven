"use client";

import { useMemo } from "react";

import BagItem from "./BagItem";

import CommerceEmpty from "../commerce/CommerceEmpty";

import { useBag } from "@/src/lib/hooks/useBag";

import { getProduct } from "@/src/data/getProduct";

export default function BagItems() {
  const {
    items,
    removeFromBag,
    updateBagQuantity,
  } = useBag();

  const bagItems = useMemo(() => {
    return items
      .map((item) => {
        const product = getProduct(item.productSlug);

        if (!product) {
          return null;
        }

        return {
          id: ${item.productSlug}-${item.size},

          image: product.bagImage,

          name: product.name,

          collection: product.collection,

          colour: product.color,

          size: item.size,

          quantity: item.quantity,

          price: product.priceValue,

          productSlug: item.productSlug,
        };
      })
      .filter(
        (
          item
        ): item is NonNullable<typeof item> =>
          item !== null
      );
  }, [items]);

  if (bagItems.length === 0) {
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
      {bagItems.map((item) => (
        <BagItem
          key={item.id}
          image={item.image}
          name={item.name}
          collection={item.collection}
          colour={item.colour}
          size={item.size}
          quantity={item.quantity}
          price={item.price}
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
      ))}
    </div>
  );
}