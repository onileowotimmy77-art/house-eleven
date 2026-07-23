"use client";

interface TimelineStep {
  title: string;
  description: string;
  complete: boolean;
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
                  h-3
                  w-3
                  rounded-full
                  transition-colors
                  duration-500

                  ${
                    step.complete
                      ? "bg-white"
                      : "bg-white/15"
                  }
                `}
              />

              {index < steps.length - 1 && (
                <div
                  className={`
                    mt-4
                    w-px
                    flex-1
                    min-h-16

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

              <h3
                className="
                  text-lg
                  font-medium
                  tracking-[-0.02em]
                "
              >
                {step.title}
              </h3>

              <p
                className="
                  mt-3
                  max-w-xl
                  leading-7
                  text-white/50
                "
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