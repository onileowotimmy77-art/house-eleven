"use client";

const steps = [
  {
    title: "Order Confirmed",
    description: "Your order has been received.",
    complete: true,
  },
  {
    title: "Preparing Garments",
    description: "Every piece is individually prepared.",
    complete: false,
  },
  {
    title: "Quality Inspection",
    description: "Each garment undergoes final inspection.",
    complete: false,
  },
  {
    title: "Dispatch",
    description: "Your Residence begins its journey.",
    complete: false,
  },
  {
    title: "Delivered",
    description: "Welcome home.",
    complete: false,
  },
];

export default function ConfirmationTimeline() {
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
                    step.complete
                      ? "bg-white"
                      : "bg-white/15"
                  }
                `}
              />

              {index < steps.length - 1 && (
                <div
                  className="
                    mt-4
                    h-20
                    w-px
                    bg-white/10
                  "
                />
              )}

            </div>

            {/* Content */}

            <div className="pb-8">

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