"use client";

import {
  useEffect,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import Image from "next/image";
import Link from "next/link";

interface CommerceNotificationProps {
  open: boolean;

  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  message: string;

  ctaLabel?: string;
  ctaHref?: string;

  actionLabel?: string;
  onAction?: () => void;

  onDismiss?: () => void;
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
  onDismiss,
}: CommerceNotificationProps) {
  useEffect(() => {
    if (!open || !onDismiss) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onDismiss?.();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onDismiss]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Dismiss notification"
            onClick={() =>
              onDismiss?.();
            }}
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
              cursor-default
              bg-black/30
              backdrop-blur-[2px]
            "
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
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
                  sizes="96px"
                  className="
                    object-cover
                  "
                />
              </div>

              <div
                className="
                  min-w-0
                  flex-1
                "
              >
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

                {((ctaLabel &&
                  ctaHref) ||
                  (actionLabel &&
                    onAction)) && (
                  <div
                    className="
                      mt-8
                      flex
                      flex-wrap
                      items-center
                      gap-8
                    "
                  >
                    {ctaLabel &&
                      ctaHref && (
                        <Link
                          href={ctaHref}
                          className="
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
                          {ctaLabel}

                          <span
                            aria-hidden
                          >
                            →
                          </span>
                        </Link>
                      )}

                    {actionLabel &&
                      onAction && (
                        <button
                          type="button"
                          onClick={onAction}
                          className="
                            font-mono
                            text-[11px]
                            uppercase
                            tracking-[0.35em]
                            text-white/40
                            transition-colors
                            duration-300
                            hover:text-white
                          "
                        >
                          {actionLabel}
                        </button>
                      )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}