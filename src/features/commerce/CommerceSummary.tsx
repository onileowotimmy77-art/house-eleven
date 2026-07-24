"use client";

import Container from "@/components/layout/Container";
import CommerceDivider from "./CommerceDivider";
import CommercePrice from "./CommercePrice";
import CommerceButton from "./CommerceButton";

interface CommerceSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  cta: string;
  onContinue?: () => void;
  href?: string;
}

export default function CommerceSummary({
  subtotal,
  shipping,
  total,
  cta,
  onContinue,
  href,
}: CommerceSummaryProps) {
  return (
    <aside
      className="
        border
        border-white/10
        bg-white/[0.02]
      "
    >
      <Container className="py-10">

        {/* Subtotal */}

        <div className="flex items-center justify-between">
          <span className="text-white/60">
            Subtotal
          </span>

          <CommercePrice
            price={subtotal}
            size="sm"
          />
        </div>

        <CommerceDivider className="my-8" />

        {/* Shipping */}

        <div className="flex items-center justify-between">
          <span className="text-white/60">
            Shipping
          </span>

          <CommercePrice
            price={shipping}
            size="sm"
          />
        </div>

        <CommerceDivider className="my-8" />

        {/* Total */}

        <div className="flex items-center justify-between">
          <span className="text-white">
            Estimated Total
          </span>

          <CommercePrice
            price={total}
            size="lg"
          />
        </div>

        <CommerceButton
          href={href}
          onClick={onContinue}
          className="mt-12 w-full"
        >
          {cta}
        </CommerceButton>

      </Container>
    </aside>
  );
}