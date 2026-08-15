"use client";

import type { Order } from "@/src/lib/stores/useOrderStore";

import { getOrderTimeline } from "@/src/lib/commerce/orderTimeline";

interface ConfirmationTimelineProps {
  order: Order;
}

export default function ConfirmationTimeline({
  order,
}: ConfirmationTimelineProps) {
  const steps = getOrderTimeline(order);

  return (
    <section className="mt-40">
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex gap-8"
          >
            {/* Progress */}

            <div className="flex flex-col items-center">
              <div
                className={`
                  h-3
                  w-3
                  rounded-full
                  transition-colors
                  duration-500

                  ${
                    step.complete ||
                    step.current
                      ? "bg-white"
                      : "bg-white/15"
                  }
                `}
              />

              {index < steps.length - 1 && (
                <div
                  className={`
                    mt-4
                    h-20
                    w-px
                    transition-colors
                    duration-500

                    ${
                      step.complete
                        ? "bg-white/40"
                        : "bg-white/10"
                    }
                  `}
                />
              )}
            </div>

            {/* Content */}

            <div className="pb-8">
              <h3
                className={`
                  text-lg
                  font-medium
                  tracking-[-0.02em]
                  transition-colors
                  duration-500

                  ${
                    step.current
                      ? "text-white"
                      : step.complete
                      ? "text-white/70"
                      : "text-white/40"
                  }
                `}
              >
                {step.title}
              </h3>

              <p
                className={`
                  mt-3
                  max-w-xl
                  leading-7
                  transition-colors
                  duration-500

                  ${
                    step.current
                      ? "text-white/60"
                      : "text-white/40"
                  }
                `}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}