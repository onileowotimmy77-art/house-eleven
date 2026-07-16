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
    <div className="relative h-full">
    <div
      className="
        
        aspect-[4/5]
        overflow-hidden
        rounded-sm
        bg-white/5
      "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={piece.image}
          initial={{
            opacity: 0,
            scale: 1.04,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
          }}
          transition={{
            duration: 0.32,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={piece.image}
            alt={piece.name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
    </div>
  );
}