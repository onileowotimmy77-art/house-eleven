export default function ArchiveTimeline() {
  return (
    <section className="bg-[#090909] px-6 py-40 text-[#F5F5F2]">
      <div className="mx-auto max-w-5xl">
        <p className="mb-6 mt-15 text-xs uppercase tracking-[0.5em] text-white/40">
          TIMELINE
        </p>

        <div className="border-l border-white/10 pl-10">
          <div className="mb-24">
            <span className="mb-4 block text-5xl font-semibold">2026</span>

            <h3 className="mb-3 text-2xl font-medium">
              Chapter 01 — The Foundation
            </h3>

            <p className="max-w-xl leading-8 text-white/60">
              The inaugural chapter of House Eleven. A study in identity,
              restraint, and the beginning of a living archive.
            </p>
          </div>

          <div className="opacity-30">
            <span className="mb-4 block text-5xl font-semibold">Future</span>

            <p className="text-white/60">
              New chapters will be added as the House evolves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}