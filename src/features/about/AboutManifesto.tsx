"use client";

import EditorialSection from "@/components/editorial/EditorialSection";
import { Eyebrow, Display, Body } from "@/components/ui/typography";

export default function AboutManifesto() {
  return (
    <EditorialSection padding="py-56">

      <Eyebrow>Manifesto</Eyebrow>

      <Display className="mt-10 max-w-5xl">
        House Eleven believes that clothing should earn its place through
        proportion, craftsmanship, and longevity—not noise.
      </Display>

      <div className="mt-24 max-w-3xl space-y-10">

        <Body className="text-white/70">
          We reject the idea that luxury must announce itself. The most
          enduring garments are often the quietest—defined not by excess,
          but by the precision of every decision behind them.
        </Body>

        <Body className="text-white/70">
          Every Chapter begins with a question rather than a trend.
          Every garment is refined until nothing unnecessary remains.
          Every detail exists because it serves a purpose.
        </Body>

        <Body className="text-white/70">
          We design for years, not seasons. We believe confidence is
          expressed through restraint, and that timelessness is achieved
          through discipline rather than decoration.
        </Body>

      </div>

    </EditorialSection>
  );
}