"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { CollectionPiece } from "@/types/collection";

interface PiecePreviewProps {
  piece: CollectionPiece;
}

export default function PiecePreview({
  piece,
}: PiecePreviewProps) {
  return (
    <div
      className="
        relative
        aspect-[4/5]
        overflow-hidden
        rounded-sm
        bg-white/5
      "
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={piece.image}
          initial={{
            opacity: 0,
            scale: 1.008,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.995,
          }}
          transition={{
            duration: 0.14,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={piece.image}
            alt={piece.name}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}