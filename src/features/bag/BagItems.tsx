"use client";

import { useEffect, useState } from "react";

import BagItem from "./BagItem";

import CommerceEmpty from "@/src/features/commerce/CommerceEmpty";
import CommerceNotification from "@/src/features/commerce/CommerceNotification";

import { useBagStore } from "@/src/lib/stores/useBagStore";

import { getProduct } from "@/src/data/getProduct";

interface RemovedBagItem {
  productSlug: string;
  size: string;
  quantity: number;
}

export default function BagItems() {
  const items = useBagStore(
    (state) => state.items
  );

  const addToBag = useBagStore(
    (state) => state.addToBag
  );

  const removeFromBag = useBagStore(
    (state) => state.removeFromBag
  );

  const updateQuantity = useBagStore(
    (state) => state.updateQuantity
  );

  const [removedItem, setRemovedItem] =
    useState<RemovedBagItem | null>(null);

  useEffect(() => {
    if (!removedItem) {
      return;
    }

    const timer = window.setTimeout(() => {
      setRemovedItem(null);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [removedItem]);

  function handleRemove(
    productSlug: string,
    size: string,
    quantity: number
  ) {
    removeFromBag(
      productSlug,
      size
    );

    setRemovedItem({
      productSlug,
      size,
      quantity,
    });
  }

  function handleUndoRemove() {
    if (!removedItem) {
      return;
    }

    addToBag({
      productSlug:
        removedItem.productSlug,
      size:
        removedItem.size,
      quantity:
        removedItem.quantity,
    });

    setRemovedItem(null);
  }

  const removedProduct = removedItem
    ? getProduct(
        removedItem.productSlug
      )
    : null;

  return (
    <>
      {items.length === 0 ? (
        <CommerceEmpty
          eyebrow="Selection"
          title="Nothing Has Been Selected."
          description="The House is waiting. Explore the collection and discover the pieces that belong with you."
          cta="Explore Collections"
          href="/collections"
        />
      ) : (
        <div>
          {items.map((item) => {
            const product = getProduct(
              item.productSlug
            );

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
                  handleRemove(
                    item.productSlug,
                    item.size,
                    item.quantity
                  )
                }
              />
            );
          })}
        </div>
      )}

      {removedProduct && (
        <CommerceNotification
          open
          image={removedProduct.bagImage}
          eyebrow="Selection"
          title={removedProduct.name}
          subtitle={`Size ${removedItem?.size}`}
          message="This piece has been removed from your selection."
          actionLabel="Undo"
          onAction={handleUndoRemove}
        />
      )}
    </>
  );
}