"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface CommerceNotificationProps {
  open: boolean;
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  message: string;

  ctaLabel: string;
  ctaHref: string;
}

export default function CommerceNotification({
  open,
  image,
  eyebrow,
  title,
  subtitle,
  message,
  ctaLabel,
  ctaHref,
  actionLabel,
  onAction,
}: CommerceNotificationProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              fixed
              inset-0
              z-[190]
              bg-black/30
              backdrop-blur-[2px]
            "
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 16,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 12,
              filter: "blur(8px)",
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              left-1/2
              bottom-10
              z-[200]
              w-[min(92vw,520px)]
              -translate-x-1/2
              overflow-hidden
              border
              border-white/10
              bg-[#080808]/95
              backdrop-blur-2xl
            "
          >
            <div className="flex gap-6 p-6">
              <div
                className="
                  relative
                  h-28
                  w-24
                  shrink-0
                  overflow-hidden
                  bg-white/[0.03]
                "
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div className="flex-1">
                <p
                  className="
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-[0.45em]
                    text-white/35
                  "
                >
                  {eyebrow}
                </p>

                <h3
                  className="
                    mt-4
                    text-2xl
                    font-semibold
                    tracking-[-0.04em]
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-white/50
                  "
                >
                  {subtitle}
                </p>

                <p
                  className="
                    mt-6
                    leading-relaxed
                    text-white/75
                  "
                >
                  {message}
                </p>

                <Link
                  href={ctaHref}
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-3
                    border-b
                    border-white/15
                    pb-2
                    font-mono
                    text-[11px]
                    uppercase
                    tracking-[0.35em]
                    text-white/75
                    transition-all
                    duration-300
                    hover:gap-5
                    hover:border-white/50
                    hover:text-white
                  "
                  >
                  {ctaLabel} →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}