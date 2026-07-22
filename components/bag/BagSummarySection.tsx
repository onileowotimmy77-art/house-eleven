"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CommerceSummary from "@/components/commerce/CommerceSummary";

interface BagSummarySectionProps {
  children: React.ReactNode;
}

export default function BagSummarySection({
  children,
}: BagSummarySectionProps) {
  return (
    <Section customPadding="pb-56">

      <Container>

        <div
          className="
            grid
            gap-20

            lg:grid-cols-[minmax(0,2fr)_420px]
            lg:items-start
          "
        >

          <div>

            {children}

          </div>

          <div className="lg:sticky lg:top-32">

            <CommerceSummary
              subtotal={290000}
              shipping={0}
              total={290000}
              cta="Proceed to Checkout"
              href="/checkout"
            />

          </div>

        </div>

      </Container>

    </Section>
  );
}