"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import { Collection } from "@/types/collection";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import PiecePreview from "./PiecePreview";
import PieceRow from "./PieceRow";

interface CollectionPiecesProps {
  collection: Collection;
}

export default function CollectionPieces({
  collection,
}: CollectionPiecesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const previewVisible = useRef(false);


  useEffect(() => {
 const updateActivePiece = () => {
  const viewportCenter = window.innerHeight / 2;

  let closestIndex = -1;
  let closestDistance = Number.POSITIVE_INFINITY;

  rowRefs.current.forEach((row, index) => {
    if (!row) return;

    const rect = row.getBoundingClientRect();

    const rowCenter = rect.top + rect.height / 2;

    const distance = Math.abs(
      rowCenter - viewportCenter
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  if (closestIndex === -1) {
    if (previewVisible.current) {
      previewVisible.current = false;
      setShowPreview(false);
    }
    return;
  }

  // Hysteresis:
  // Appear when very close to center.
  // Stay visible until much farther away.

  const ENTER_DISTANCE = 250;
  const EXIT_DISTANCE = 220;

  if (!previewVisible.current) {
    if (closestDistance <= ENTER_DISTANCE) {
      previewVisible.current = true;
      setShowPreview(true);
    }
  } else {
    if (closestDistance >= EXIT_DISTANCE) {
      previewVisible.current = false;
      setShowPreview(false);
    }
  }

  
    setActiveIndex((current) =>
      current === closestIndex
        ? current
        : closestIndex
    );
  }


    updateActivePiece();

    window.addEventListener(
      "scroll",
      updateActivePiece,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      updateActivePiece
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateActivePiece
      );

      window.removeEventListener(
        "resize",
        updateActivePiece
      );
    };
  }, []);

  if (!collection.pieces.length) {
    return null;
  }

  return (
    <Section customPadding="pt-40 pb-[55vh]">
      <Container>
        <div className="max-w-2xl">
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.45em]
              text-white/35
            "
          >
            Selected Pieces
          </p>

          <h2
            className="
              mt-8
              text-[clamp(3rem,7vw,5rem)]
              font-black
              uppercase
              tracking-[-0.05em]
            "
          >
            The Collection
          </h2>

          <p
            className="
              mt-8
              max-w-xl
              leading-8
              text-white/55
            "
          >
            Every piece exists for a reason.
            Nothing has been added for excess.
          </p>
        </div>

        <div className="relative mt-32">
          <div className="max-w-[58rem]">
            {collection.pieces.map((piece, index) => (
              <PieceRow
                key={piece.code}
                piece={piece}
                active={activeIndex === index}
                onHover={() => setActiveIndex(index)}
                rowRef={(node) => {
                  rowRefs.current[index] = node;
                }}
              />
            ))}
          </div>

          <motion.div
            initial={false}
            animate={{
              opacity: showPreview ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              hidden
              lg:block
              fixed
              top-25
              right-[max(2rem,calc((100vw-1440px)/2))]
              w-[280px]
              pointer-events-none
              z-20
            "
          >
            <PiecePreview
              piece={collection.pieces[activeIndex]}
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}