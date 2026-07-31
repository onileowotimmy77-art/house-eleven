"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface SavedPieceCardProps {
  image: string;
  name: string;
  collection: string;
  price: string;
  href: string;

  onMoveToBag: () => void;
  onRemove: () => void;
}

type PendingAction =
  | "move"
  | "remove"
  | null;

export default function SavedPieceCard({
  image,
  name,
  collection,
  price,
  href,
  onMoveToBag,
  onRemove,
}: SavedPieceCardProps) {
  const [pendingAction, setPendingAction] =
    useState<PendingAction>(null);

  const isLeaving =
    pendingAction !== null;

  function handleMoveToBag() {
    if (isLeaving) {
      return;
    }

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
      onMoveToBag();
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
      </div>
    </motion.article>
  );
}