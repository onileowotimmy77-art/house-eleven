import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import ArchiveFrame from "./ArchiveFrame";

export default function ArchivePrologue() {
  return (
    <Section padding="py-52">
      <ArchiveFrame>
        <div className="grid grid-cols-12">

          {/* Heading */}
          <div className="col-span-12">
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-white/40">
              PROLOGUE
            </p>

            <h2
              className="
                max-w-[38rem]
                text-[2.5rem]
                font-semibold
                leading-[1.02]
                tracking-[-0.03em]
                md:text-[4rem]
                lg:text-[5rem]
              "
            >
              Before every
              <br />
              collection,
              <br />
              there is
              <br />
              an idea.
            </h2>
          </div>

          {/* Editorial Body */}
          <div
            className="
              col-span-12
              mt-24
              lg:col-span-7
              lg:col-start-2
            "
          >
            <Reveal>
              <div className="max-w-[34rem] space-y-10">
                <p className="text-lg leading-9 text-white/60 md:text-xl md:leading-10">
                  House Eleven does not begin with garments.
                  Every chapter starts as a question, a thought,
                  or an observation waiting to take form.
                </p>

                <p className="text-lg leading-9 text-white/60 md:text-xl md:leading-10">
                  The Archive exists to preserve that journey...
                  from concept to object, and from object
                  to memory.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Reserved Editorial Column */}
          <aside
            aria-hidden="true"
            className="
              hidden
              lg:block
              lg:col-span-3
              lg:col-start-10
            "
          >
            {/* Reserved for:
                - Chapter metadata
                - Collection year
                - Editorial notes
                - Sketches
                - Future archive artifacts
            */}
          </aside>

        </div>
      </ArchiveFrame>
    </Section>
  );
}