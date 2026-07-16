"use client";

import FadeUp from "@/components/ui/FadeUp";
import Editorial from "../ui/typography/Editorial";

interface ManifestoStatementsProps {
  full?: boolean;
}

const homepageStatements = [
  <>
    This is more than clothing.
    <br />
    It is a <span className="italic">house</span> built for those
    <br />
    creating lives of purpose.
  </>,

  <>
    Every silhouette is intentional.
    <br />
    Every detail is deliberate.
    <br />
    Every collection becomes another <span className="italic">chapter.</span>
  </>,
];

const fullStatements = [
  <>
    This is more than clothing.
    <br />
    It is a <span className="italic">house</span> built for those
    <br />
    creating lives of purpose.
  </>,

  <>
    We were never created
    <br />
    to chase fashion.
  </>,

  <>
    We exist
    <br />
    to slow it down.
  </>,

  <>
    Luxury
    <br />
    isn't attention.
    <br />
    It's intention.
  </>,

  <>
    Every silhouette is intentional.
    <br />
    Every detail is deliberate.
    <br />
    Every collection becomes another <span className="italic">chapter.</span>
  </>,

  <>
    We believe
    <br />
    restraint
    <br />
    is the highest form of confidence.
  </>,

  <>
    If something exists
    <br />
    only because it's trending,
    <br />
    it doesn't belong here.
  </>,

  <>
    We don't design
    <br />
    for seasons.
    <br />
    We design for permanence.
  </>,

  <>
    House Eleven
    <br />
    isn't something you wear.
    <br />
    It's something you become.
  </>,

  <>
    <span className="italic">
      Welcome Home.
    </span>
  </>,
];

export default function ManifestoStatements({
  full = false,
}: ManifestoStatementsProps) {
  const statements = full
    ? fullStatements
    : homepageStatements;

  return (
    <div className="mt-12 mb-20 space-y-32">
      {statements.map((statement, index) => {
        const isLast =
          full && index === statements.length - 1;

        let alignment = "mx-auto text-center";

        if (!isLast && full) {
          switch (index % 3) {
            case 0:
              alignment = "mx-auto text-center";
              break;

            case 1:
              alignment = "mr-auto text-left";
              break;

            case 2:
              alignment = "ml-auto text-right";
              break;
          }
        }

        return (
          <FadeUp
            key={index}
            delay={0.2 + index * 0.15}
          >
            <div
              className={`max-w-2xl ${alignment}`}
            >
              <Editorial>
                {statement}
              </Editorial>
            </div>
          </FadeUp>
        );
      })}
    </div>
  );
}