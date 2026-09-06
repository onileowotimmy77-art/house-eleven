"use client";

import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { useInventoryStore } from "@/src/lib/stores/useInventoryStore";

interface SavedPieceCardProps {
  productSlug: string;
  image: string;
  name: string;
  collection: string;
  price: string;
  href: string;

  onMoveToBag: (
    size: string
  ) => boolean;

  onRemove: () => void;
}

type PendingAction =
  | "move"
  | "remove"
  | null;

export default function SavedPieceCard({
  productSlug,
  image,
  name,
  collection,
  price,
  href,
  onMoveToBag,
  onRemove,
}: SavedPieceCardProps) {
  const hydrateInventory =
    useInventoryStore(
      (state) =>
        state.hydrateInventory
    );

  const inventory =
    useInventoryStore((state) =>
      state.inventory.find(
        (item) =>
          item.productSlug ===
          productSlug
      )
    );

  const inventoryLoaded =
    useInventoryStore(
      (state) =>
        state.hasLoaded
    );

  const [pendingAction, setPendingAction] =
    useState<PendingAction>(null);

  const [selectingSize, setSelectingSize] =
    useState(false);

  const [selectedSize, setSelectedSize] =
    useState<string | null>(null);

  const isLeaving =
    pendingAction !== null;

  useEffect(() => {
    void hydrateInventory();
  }, [hydrateInventory]);

  useEffect(() => {
    if (!selectedSize || !inventory) {
      return;
    }

    const selectedInventory =
      inventory.sizes.find(
        (item) =>
          item.size ===
          selectedSize
      );

    if (
      !selectedInventory ||
      selectedInventory.stock <= 0
    ) {
      setSelectedSize(null);
    }
  }, [
    inventory,
    selectedSize,
  ]);

  function handleMoveToBag() {
    if (isLeaving) {
      return;
    }

    setSelectingSize(
      (current) => !current
    );

    setSelectedSize(null);
  }

  function handleSelectSize(
    size: string,
    stock: number
  ) {
    if (
      isLeaving ||
      stock <= 0
    ) {
      return;
    }

    setSelectedSize(size);

    const wasAdded =
      onMoveToBag(size);

    if (!wasAdded) {
      setSelectedSize(null);
      return;
    }

    setSelectingSize(false);
    setPendingAction("move");
  }

  function handleRemovePiece() {
    if (isLeaving) {
      return;
    }

    setPendingAction("remove");
  }

  function handleAnimationComplete() {
    if (pendingAction === "move") {
      setPendingAction(null);
      return;
    }

    if (pendingAction === "remove") {
      onRemove();
    }
  }

  return (
    <motion.article
      layout
      initial={false}
      animate={
        isLeaving
          ? {
              opacity: 0,
              scale: 0.985,
              y: 18,
              filter: "blur(10px)",
            }
          : {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }
      }
      transition={{
        duration: 0.36,
        ease: [0.22, 1, 0.36, 1],
      }}
      onAnimationComplete={
        isLeaving
          ? handleAnimationComplete
          : undefined
      }
    >
      <Link
        href={href}
        className="
          group
          block
        "
      >
        <div
          className="
            relative
            aspect-[4/5]
            overflow-hidden
            bg-white/[0.03]
          "
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="
              (min-width: 1280px) 28vw,
              (min-width: 768px) 44vw,
              92vw
            "
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-[1.02]
            "
          />
        </div>
      </Link>

      <div className="mt-8">
        <p
          className="
            font-mono
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-white/35
          "
        >
          {collection}
        </p>

        <Link href={href}>
          <h2
            className="
              mt-4
              text-[1.4rem]
              font-medium
              tracking-[-0.03em]
              transition-colors
              duration-300
              hover:text-white/70
            "
          >
            {name}
          </h2>
        </Link>

        <p
          className="
            mt-3
            text-white/55
          "
        >
          {price}
        </p>

        {selectingSize && (
          <div
            className="
              mt-8
              border-t
              border-white/10
              pt-6
            "
          >
            <p
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/35
              "
            >
              Select Size
            </p>

            {!inventoryLoaded ? (
              <p
                className="
                  mt-5
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-white/30
                "
              >
                Checking availability
              </p>
            ) : inventory?.sizes.length ? (
              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {inventory.sizes.map(
                  ({
                    size,
                    stock,
                  }) => {
                    const isSelected =
                      selectedSize ===
                      size;

                    const isUnavailable =
                      stock <= 0;

                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={
                          isUnavailable ||
                          isLeaving
                        }
                        onClick={() =>
                          handleSelectSize(
                            size,
                            stock
                          )
                        }
                        className={`
                          min-w-[64px]
                          border
                          px-5
                          py-3
                          font-mono
                          text-[10px]
                          uppercase
                          tracking-[0.3em]
                          transition-all
                          duration-300

                          ${
                            isUnavailable
                              ? `
                                cursor-not-allowed
                                border-white/5
                                text-white/15
                              `
                              : isSelected
                              ? `
                                border-white
                                bg-white
                                text-black
                              `
                              : `
                                border-white/10
                                text-white/55
                                hover:border-white/40
                                hover:text-white
                              `
                          }
                        `}
                      >
                        {size}
                      </button>
                    );
                  }
                )}
              </div>
            ) : (
              <p
                className="
                  mt-5
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-white/30
                "
              >
                No sizes currently available
              </p>
            )}

            <button
              type="button"
              onClick={() => {
                setSelectingSize(false);
                setSelectedSize(null);
              }}
              className="
                mt-6
                font-mono
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/25
                transition-colors
                duration-300
                hover:text-white/60
              "
            >
              Cancel
            </button>
          </div>
        )}

        {!selectingSize && (
          <div
            className="
              mt-8
              flex
              items-center
              gap-8
            "
          >
            <button
              type="button"
              disabled={isLeaving}
              onClick={handleMoveToBag}
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.4em]
                text-white/45
                transition-colors
                duration-300
                hover:text-white
                disabled:cursor-default
                disabled:opacity-30
              "
            >
              Move to Bag →
            </button>

            <button
              type="button"
              disabled={isLeaving}
              onClick={handleRemovePiece}
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.4em]
                text-white/25
                transition-colors
                duration-300
                hover:text-white/60
                disabled:cursor-default
                disabled:opacity-20
              "
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}