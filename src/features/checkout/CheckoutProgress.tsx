"use client";

import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";

const chapters = [
  "Identity",
  "Delivery",
  "Payment",
  "Review",
];

export default function CheckoutProgress() {
  return (
    <Container>

      <Reveal>

        <div
          className="
            flex
            items-center
            justify-between

            border-y
            border-white/10

            py-8

            overflow-x-auto
          "
        >
          {chapters.map((chapter, index) => (
            <div
              key={chapter}
              className="
                flex
                items-center
                gap-6
                whitespace-nowrap
              "
            >
              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.35em]
                  text-white/35
                "
              >
                {chapter}
              </span>

              {index !== chapters.length - 1 && (
                <div className="h-px w-12 bg-white/10" />
              )}
            </div>
          ))}
        </div>

      </Reveal>
     </Container>
  );
}