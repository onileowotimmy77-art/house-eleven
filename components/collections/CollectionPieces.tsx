"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Collection } from "@/types/collection";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import PieceRow from "./PieceRow";
import PiecePreview from "./PiecePreview";

interface CollectionPiecesProps {
  collection: Collection;
}

export default function CollectionPieces({
  collection,
}: CollectionPiecesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hovering = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (hovering.current) return;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(
            entry.target.getAttribute("data-index")
          );

          setActiveIndex(index);
        });
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0,
      }
    );

    rowRefs.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => observer.disconnect();
  }, []);

  if (!collection.pieces.length) {
    return null;
  }

  return (
    <Section padding="py-40">
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

        <div
          className="
            mt-32
            grid
            gap-24
            lg:grid-cols-[1fr_520px]
          "
        >
          <div>
            {collection.pieces.map((piece, index) => (
              <PieceRow
                key={piece.code}
                piece={piece}
                active={activeIndex === index}
                onHover={() => {
                  hovering.current = true;
                  setActiveIndex(index);
                }}
                rowRef={(node) => {
                  rowRefs.current[index] = node;

                  if (node) {
                    node.setAttribute(
                      "data-index",
                      index.toString()
                    );
                  }
                }}
              />
            ))}
          </div>

          <div className="relative">
            <div className="sticky top-32">
              <PiecePreview
                piece={collection.pieces[activeIndex]}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}