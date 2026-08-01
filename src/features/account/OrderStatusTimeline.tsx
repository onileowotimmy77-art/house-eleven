"use client";

interface TimelineStep {
  title: string;
  description: string;

  complete: boolean;
  current: boolean;
}

interface OrderStatusTimelineProps {
  steps: TimelineStep[];
}

export default function OrderStatusTimeline({
  steps,
}: OrderStatusTimelineProps) {
  return (
    <section className="mt-20">
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
                  relative
                  flex
                  h-3
                  w-3
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-500

                  ${
                    step.complete
                      ? "bg-white"
                      : step.current
                      ? "bg-white"
                      : "bg-white/15"
                  }
                `}
              >
                {step.current && (
                  <span
                    className="
                      absolute
                      h-7
                      w-7
                      rounded-full
                      border
                      border-white/25
                    "
                  />
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`
                    mt-4
                    min-h-16
                    w-px
                    flex-1
                    transition-colors
                    duration-500

                    ${
                      step.complete
                        ? "bg-white/25"
                        : "bg-white/10"
                    }
                  `}
                />
              )}
            </div>

            {/* Content */}

            <div className="pb-10">
              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >
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
                        ? "text-white/75"
                        : "text-white/40"
                    }
                  `}
                >
                  {step.title}
                </h3>

                {step.current && (
                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.3em]
                      text-white/40
                    "
                  >
                    Current
                  </span>
                )}
              </div>

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
                      : step.complete
                      ? "text-white/45"
                      : "text-white/30"
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