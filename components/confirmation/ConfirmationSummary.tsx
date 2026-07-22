"use client";

interface ConfirmationSummaryProps {
  orderNumber: string;
  paymentMethod: string;
  estimatedDelivery: string;
  total: string;
}

export default function ConfirmationSummary({
  orderNumber,
  paymentMethod,
  estimatedDelivery,
  total,
}: ConfirmationSummaryProps) {
  return (
    <section
      className="
        mt-32

        border-t
        border-white/10
      "
    >
      <div
        className="
          divide-y
          divide-white/10
        "
      >
        <SummaryRow
          label="Order Number"
          value={orderNumber}
        />

        <SummaryRow
          label="Payment"
          value={paymentMethod}
        />

        <SummaryRow
          label="Estimated Delivery"
          value={estimatedDelivery}
        />

        <SummaryRow
          label="Total"
          value={total}
          emphasis
        />
      </div>
    </section>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

function SummaryRow({
  label,
  value,
  emphasis = false,
}: SummaryRowProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4

        py-8

        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <span
        className="
          font-mono
          text-[11px]
          uppercase
          tracking-[0.35em]
          text-white/40
        "
      >
        {label}
      </span>

      <span
        className={
          emphasis
            ? `
              text-[1.5rem]
              font-medium
              tracking-[-0.04em]
            `
            : `
              text-lg
              tracking-[-0.02em]
            `
        }
      >
        {value}
      </span>
    </div>
  );
}