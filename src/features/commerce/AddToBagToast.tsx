"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface AddToBagToastProps {
  open: boolean;
  productName: string;
  size: string;
}

export default function AddToBagToast({
  open,
  productName,
  size,
}: AddToBagToastProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: 32,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 20,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
            fixed
            bottom-8
            right-8
            z-[200]
            w-[380px]
            border
            border-white/10
            bg-black/95
            p-8
            backdrop-blur-xl
          "
        >
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.4em]
              text-white/45
            "
          >
            Added to Bag
          </p>

          <h3
            className="
              mt-5
              text-2xl
              font-semibold
              tracking-[-0.03em]
            "
          >
            {productName}
          </h3>

          <p
            className="
              mt-3
              text-white/55
            "
          >
            Size {size}
          </p>

          <Link
            href="/bag"
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              font-mono
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-white/75
              transition-all
              duration-300
              hover:gap-5
              hover:text-white
            "
          >
            View Bag →
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}