"use client";

interface ReviewTotalsProps {
  subtotal: string;
  shipping: string;
  total: string;
}

export default function ReviewTotals({
  subtotal,
  shipping,
  total,
}: ReviewTotalsProps) {
  return (
    <section
      className="
        mt-20
        border-t
        border-white/10
        pt-10
      "
    >
      <div className="space-y-8">

        <div className="flex items-center justify-between">
          <span
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-white/40
            "
          >
            Subtotal
          </span>

          <span
            className="
              text-lg
              tracking-[-0.02em]
            "
          >
            {subtotal}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-white/40
            "
          >
            Shipping
          </span>

          <span
            className="
              text-lg
              tracking-[-0.02em]
            "
          >
            {shipping}
          </span>
        </div>

        <div
          className="
            mt-8
            border-t
            border-white/10
            pt-8
          "
        >
          <div className="flex items-center justify-between">

            <span
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-white/40
              "
            >
              Total
            </span>

            <span
              className="
                text-[clamp(1.6rem,2vw,2rem)]
                font-medium
                tracking-[-0.04em]
              "
            >
              {total}
            </span>

          </div>
        </div>

      </div>
    </section>
  );
}