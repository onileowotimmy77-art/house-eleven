"use client";

import EditorialSection from "@/components/editorial/EditorialSection";
import { Eyebrow, Display } from "@/components/ui/typography";

const principles = [
  {
    number: "01",
    title: "Timeless over Trend.",
  },
  {
    number: "02",
    title: "Craft before Hype.",
  },
  {
    number: "03",
    title: "Restraint creates Confidence.",
  },
  {
    number: "04",
    title: "Every Detail earns its Place.",
  },
  {
    number: "05",
    title: "Luxury is Experienced, not Announced.",
  },
];

export default function AboutPrinciples() {
  return (
    <EditorialSection padding="py-56">

      <Eyebrow>Principles</Eyebrow>

      <div className="mt-20 border-t border-white/10">

        {principles.map((principle) => (
          <div
            key={principle.number}
            className="border-b border-white/10 py-14"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/35">
              {principle.number}
            </p>

            <Display className="mt-6 max-w-5xl">
              {principle.title}
            </Display>
          </div>
        ))}

      </div>

    </EditorialSection>
  );
}