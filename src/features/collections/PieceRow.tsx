"use client";

import { CollectionPiece } from "@/types/collection";

interface PieceRowProps {
  piece: CollectionPiece;
  active: boolean;
  onHover: () => void;
  rowRef: (node: HTMLButtonElement | null) => void;
 
}

export default function PieceRow({
  piece,
  active,
  onHover,
  rowRef,
 
}: PieceRowProps) {
  return (
    <button
      ref={rowRef}
      onMouseEnter={onHover}
      className={`
        group
        relative
        flex
        w-full
        items-end
        justify-between
        border-b
        border-white/10
        py-16
        text-left
        transition-all
        duration-500
        

        ${
          active
            ? "translate-x-3"
            : "translate-x-0 hover:translate-x-2"
        }
      `}
    >
      <div className="max-w-xl">
        <p
          className={`
            font-mono
            text-[11px]
            uppercase
            tracking-[0.45em]
            transition-colors
            duration-500

            ${
              active
                ? "text-white/80"
                : "text-white/35"
            }
          `}
        >
          {piece.code}
        </p>

        <h3
          className={`
            mt-5
            text-5xl
            font-black
            uppercase
            tracking-[-0.04em]
            transition-opacity
            duration-500

            ${
              active
                ? "opacity-100"
                : "opacity-60 group-hover:opacity-100"
            }
          `}
        >
          {piece.name}
        </h3>

        <p
          className="
            mt-4
            font-mono
            text-[10px]
            uppercase
            tracking-[0.4em]
            text-white/30
          "
        >
          {piece.chapter} · {piece.category} · {piece.season}
        </p>

        <p
          className={`
            mt-6
            max-w-md
            leading-8
            transition-colors
            duration-500

            ${
              active
                ? "text-white/75"
                : "text-white/45"
            }
          `}
        >
          {piece.description}
        </p>
      </div>

    
    </button>
  );
}