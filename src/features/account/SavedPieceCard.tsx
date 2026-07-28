"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

export default function SavedPieceCard({
  image,
  name,
  collection,
  price,
  href,
  onMoveToBag,
  onRemove,
}: SavedPieceCardProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  function handleMove() {
    setIsLeaving(true);

    window.setTimeout(() => {
      onMoveToBag();
    }, 320);
  }

  function handleRemovePiece() {
    setIsLeaving(true);

    window.setTimeout(() => {
      onRemove();
    }, 320);
  }

  return (
    <AnimatePresence>
      {!isLeaving && (
        <motion.article
          layout
          initial={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
            y: 16,
            filter: "blur(10px)",
            transition: {
              duration: 0.32,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <Link
            href={href}
            className="group block"
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
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-[1.02]
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
                onClick={handleMove}
                className="
                  font-mono
                  text-[11px]
                  uppercase
                  tracking-[0.4em]
                  text-white/45
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Move to Bag →
              </button>

              <button
                type="button"
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
                "
              >
                Remove
              </button>
            </div>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
}