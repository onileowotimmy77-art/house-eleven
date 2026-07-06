"use client";

import { AnimatePresence, motion } from "framer-motion";
import LoaderWordmark from "./LoaderWordmark";
import useLoading from "@/hooks/useLoading";

export default function Loader() {
  const loading = useLoading();

  return (
    <AnimatePresence>

      {loading && (
        <motion.div
          initial={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -60,
            transition: {
              duration: 3,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-black
          "
        >

          {/* Background Glow */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />

          {/* Grid */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.03]
              [background-image:
                linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),
                linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)]
              [background-size:72px_72px]
            "
          />

          {/* Vignette */}

          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,0.75)_100%)]" />

          <div className="relative z-20">
            <LoaderWordmark />
          </div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}