"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useCursorContext } from "@/components/cursor/CursorProvider";

interface EditorialLinkProps {
  href: string;
  children: React.ReactNode;

  cursorLabel?: string;
}

export default function EditorialLink({
  href,
  children,
  cursorLabel = "VIEW",
}: EditorialLinkProps) {
  const { setHovering, setLabel } = useCursorContext();

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      className="inline-block"
    >
      <Link
        href={href}
        onMouseEnter={() => {
          setHovering(true);
          setLabel(cursorLabel);
        }}
        onMouseLeave={() => {
          setHovering(false);
          setLabel("");
        }}
        className="inline-block"
      >
        <motion.div
          variants={{
            rest: {
              scale: 1,
            },
            hover: {
              scale: 1.03,
            },
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            inline-flex
            flex-col
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-3

              text-[11px]
              uppercase
              tracking-[0.45em]

              text-white/60
            "
          >
            {children}

            <motion.span
              variants={{
                rest: {
                  x: 0,
                },
                hover: {
                  x: 6,
                },
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              →
            </motion.span>
          </span>

          <motion.div
            variants={{
              rest: {
                scaleX: 0,
              },
              hover: {
                scaleX: 1,
              },
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              originX: 0,
            }}
            className="
              mt-3
              h-px
              bg-white
            "
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}