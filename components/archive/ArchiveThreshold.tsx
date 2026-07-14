import Section from "@/components/layout/Section";
import Stagger from "@/components/motion/Stagger";
import Eyebrow from "@/components/ui/typography/Eyebrow";

import ArchiveFrame from "./ArchiveFrame";
import ArchiveDivider from "./ArchiveDivider";

export default function ArchiveThreshold() {
  return (
    <Section padding="py-0">
      <ArchiveFrame>
        <div
          className="
            flex
            min-h-screen
            flex-col
            justify-center
            -translate-y-[8vh]
          "
        >
          <Stagger>
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
              <Eyebrow className="mb-8 justify-center">
                HOUSE ELEVEN
              </Eyebrow>

              <h1
                className="
                  text-6xl
                  font-semibold
                  tracking-[-0.04em]
                  sm:text-7xl
                  md:text-8xl
                  lg:text-9xl
                "
              >
                ARCHIVE
              </h1>

              <ArchiveDivider className="my-12" />

              <p
                className="
                  max-w-[30rem]
                  text-lg
                  leading-9
                  text-white/65
                "
              >
                Every chapter begins
                <br />
                long before it is seen.
              </p>
            </div>
          </Stagger>
        </div>
      </ArchiveFrame>
    </Section>
  );
}