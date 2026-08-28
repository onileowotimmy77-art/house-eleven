"use client";

import { useEffect, useState } from "react";

import BagItem from "./BagItem";

import CommerceEmpty from "@/src/features/commerce/CommerceEmpty";
import CommerceNotification from "@/src/features/commerce/CommerceNotification";

import {
  useBagStore,
} from "@/src/lib/stores/useBagStore";

import {
  getProduct,
} from "@/src/data/getProduct";

import {
  canAcquireQuantity,
} from "@/src/lib/commerce/inventory";

import {
  useInventoryStore,
} from "@/src/lib/stores/useInventoryStore";

import { 
  getLiveInventory,
} from "@/src/lib/supabase/inventory";

interface RemovedBagItem {
  productSlug: string;
  size: string;
  quantity: number;
  index: number;
}

export default function BagItems() {
  const items =
    useBagStore(
      (state) =>
        state.items
    );

  const restoreToBag =
    useBagStore(
      (state) =>
        state.restoreToBag
    );

  const removeFromBag =
    useBagStore(
      (state) =>
        state.removeFromBag
    );

  const inventoryItems =
    useInventoryStore(
      (state) =>
        state.inventory
    );

  const updateQuantity =
    useBagStore(
      (state) =>
        state.updateQuantity
    );

  const inventoryNotice =
    useBagStore(
      (state) =>
        state.inventoryNotice
    );

  const clearInventoryNotice =
    useBagStore(
      (state) =>
        state.clearInventoryNotice
    );

  const [
    removedItem,
    setRemovedItem,
  ] =
    useState<RemovedBagItem | null>(
      null
    );

    const [
  undoUnavailable,
  setUndoUnavailable,
] =
  useState(false);

  useEffect(() => {
    if (!removedItem) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setRemovedItem(null);
      }, 5000);

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [removedItem]);

  function handleRemove(
    productSlug: string,
    size: string,
    quantity: number,
    index: number
  ) {
    removeFromBag(
      productSlug,
      size
    );

    setRemovedItem({
      productSlug,
      size,
      quantity,
      index,
    });
  }

 async function handleUndoRemove() {
  if (!removedItem) {
    return;
  }

  try {
    /*
     * Undo is an acquisition attempt.
     *
     * Refresh inventory directly from Supabase
     * before restoring the removed piece so that
     * the decision is based on current stock,
     * not a potentially stale client snapshot.
     */
    const liveInventory =
      await getLiveInventory();

    const inventoryStore =
      useInventoryStore.getState();

    /*
     * Update the client inventory store so
     * the Bag UI and the restoration decision
     * use the same inventory state.
     *
     * Keep the existing product/size structure
     * and replace only the live stock values.
     */
    const mergedInventory =
      inventoryStore.inventory.map(
        (product) => ({
          ...product,

          sizes:
            product.sizes.map(
              (size) => {
                const liveRow =
                  liveInventory.find(
                    (row) =>
                      row.product_slug ===
                        product.productSlug &&
                      row.size ===
                        size.size
                  );

                return {
                  ...size,
                  stock:
                    liveRow?.stock ?? 0,
                };
              }
            ),
        })
      );

    useInventoryStore.setState({
      inventory:
        mergedInventory,
      hasLoaded: true,
      isLoading: false,
    });

    /*
     * restoreToBag() now validates against
     * the freshly synchronized inventory.
     */
    const restored =
      useBagStore
        .getState()
        .restoreToBag(
          {
            productSlug:
              removedItem.productSlug,

            size:
              removedItem.size,

            quantity:
              removedItem.quantity,
          },
          removedItem.index
        );

    if (!restored) {
      setUndoUnavailable(true);
      return;
    }

    setRemovedItem(null);
  } catch (error) {
    /*
     * If live inventory cannot be checked,
     * do not restore the piece.
     *
     * We never want a failed inventory request
     * to become an accidental acquisition.
     */
    console.error(
      "House Eleven undo inventory check failed:",
      error
    );

    setUndoUnavailable(true);
  }
}

  function getAvailableStock(
    productSlug: string,
    size: string
  ) {
    const productInventory =
      inventoryItems.find(
        (item) =>
          item.productSlug ===
          productSlug
      );

    const sizeInventory =
      productInventory?.sizes.find(
        (item) =>
          item.size ===
          size
      );

    return (
      sizeInventory?.stock ??
      0
    );
  }

  const removedProduct =
    removedItem
      ? getProduct(
          removedItem.productSlug
        )
      : null;

  const inventoryNoticeProduct =
    inventoryNotice
      ? getProduct(
          inventoryNotice.productSlug
        )
      : null;

  return (
    <>
      {items.length === 0 ? (
        <CommerceEmpty
          eyebrow="Selection"
          title="Nothing Has Been Selected."
          description="
            The House is waiting.
            Explore the collection and
            discover the pieces that
            belong with you.
          "
          cta="Explore Collections"
          href="/collections"
        />
      ) : (
        <div>
          {items.map(
            (
              item,
              index
            ) => {
              const product =
                getProduct(
                  item.productSlug
                );

              if (!product) {
                return null;
              }

              const availableStock =
                getAvailableStock(
                  item.productSlug,
                  item.size
                );

              const canIncrease =
                item.quantity <
                availableStock;

              return (
                <BagItem
                  key={`${item.productSlug}-${item.size}`}
                  image={
                    product.bagImage
                  }
                  name={
                    product.name
                  }
                  collection={
                    product.collection
                  }
                  colour={
                    product.color
                  }
                  size={
                    item.size
                  }
                  quantity={
                    item.quantity
                  }
                  price={
                    product.priceValue
                  }
                  onIncrease={() => {
                    const nextQuantity =
                      item.quantity +
                      1;

                    if (
                      !canIncrease
                    ) {
                      return;
                    }

                    if (
                      !canAcquireQuantity(
                        item.productSlug,
                        item.size,
                        nextQuantity
                      )
                    ) {
                      return;
                    }

                    updateQuantity(
                      item.productSlug,
                      item.size,
                      nextQuantity
                    );
                  }}
                  onDecrease={() =>
                    updateQuantity(
                      item.productSlug,
                      item.size,
                      item.quantity -
                        1
                    )
                  }
                  onRemove={() =>
                    handleRemove(
                      item.productSlug,
                      item.size,
                      item.quantity,
                      index
                    )
                  }
                />
              );
            }
          )}
        </div>
      )}

      {inventoryNoticeProduct &&
        inventoryNotice && (
          <CommerceNotification
            open
            image={
              inventoryNoticeProduct.bagImage
            }
            eyebrow="Selection Updated"
            title={
              inventoryNoticeProduct.name
            }
            subtitle={
              `Size ${inventoryNotice.size}`
            }
            message={
              inventoryNotice.reason ===
              "unavailable"
                ? "This piece was removed from your selection because it is no longer available in the requested quantity."
                : `Only ${inventoryNotice.currentQuantity} ${
                    inventoryNotice.currentQuantity ===
                    1
                      ? "piece"
                      : "pieces"
                  } ${
                    inventoryNotice.size
                  } ${
                    inventoryNoticeProduct.name
                  } ${
                    inventoryNotice.currentQuantity ===
                    1
                      ? "remain"
                      : "remain"
                  }. Your selection has been updated.`
            }
            actionLabel="Understood"
            onAction={clearInventoryNotice}
            onDismiss={clearInventoryNotice}
          />
        )}

      {removedProduct && (
        <CommerceNotification
          open
          image={
            removedProduct.bagImage
          }
          eyebrow="Selection"
          title={
            removedProduct.name
          }
          subtitle={
            `Size ${removedItem?.size}`
          }
          message="
            This piece has been removed
            from your selection.
          "
          actionLabel="Undo"
          onAction={
            handleUndoRemove
          }
          onDismiss={() =>
            setRemovedItem(null)
          }
        />
      )}

      {undoUnavailable && removedProduct && (
  <CommerceNotification
    open
    image={
      removedProduct.bagImage
    }
    eyebrow="Selection Updated"
    title={
      removedProduct.name
    }
    subtitle={
      `Size ${removedItem?.size}`
    }
    message="
      This piece is no longer
      available in the requested
      quantity, so it could not be
      restored to your selection.
    "
    actionLabel="Understood"
    onAction={() => {
      setUndoUnavailable(false);
      setRemovedItem(null);
    }}
    onDismiss={() => {
      setUndoUnavailable(false);
      setRemovedItem(null);
    }}
  />
)}
    </>
  );
}