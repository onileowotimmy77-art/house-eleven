import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";

import ArchiveFrame from "./ArchiveFrame";
import ArchiveDivider from "./ArchiveDivider";

export default function ArchiveTimeline() {
  return (
    <Section customPadding="pt-20 pb-28">
      <ArchiveFrame>
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.5em] text-white/40">
              CHRONOLOGY
            </p>

            <h2
              className="
                mt-8
                text-[2.5rem]
                font-semibold
                leading-[1.02]
                tracking-[-0.03em]
                md:text-[4rem]
              "
            >
              Every collection enters
              the permanent record
              of the House.
            </h2>

            <p
              className="
                mt-10
                max-w-2xl
                text-lg
                leading-9
                text-white/60
              "
            >
              The Archive preserves the evolution of
              House Eleven—from its first collection to
              every chapter that follows.
            </p>
          </div>
        </Reveal>

        
        <div className="border-l border-white/10 pl-10">

          <article className="mb-28 mt-28">

            <span className="block text-5xl font-semibold">
              2026
            </span>

            <p className="mt-8 text-xs uppercase tracking-[0.45em] text-white/40">
              CHAPTER 01
            </p>

            <h3 className="mt-5 text-3xl font-medium">
              Residence
            </h3>

            <p className="mt-8 max-w-xl text-lg leading-9 text-white/60">
              The inaugural collection.
              A study of permanence,
              restraint and identity.
            </p>

          </article>

          <article className="opacity-35">

            <span className="block text-5xl font-semibold">
              Future
            </span>

            <p className="mt-8 max-w-xl text-lg leading-9 text-white/60">
              Awaiting the next chapter
              of the House.
            </p>

          </article>

        </div>
      </ArchiveFrame>
    </Section>
  );
}