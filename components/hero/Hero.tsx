export default function Hero() {
  return (
    <section className="flex min-h-screen items-center bg-black text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16 xl:px-24">

        <div className="mb-10 flex gap-8 text-xs uppercase tracking-[0.35em] text-white/50">
          <span>EST. 2026</span>
          <span>H11-FDN-001</span>
          <span>FW26</span>
        </div>

        <h1 className="max-w-5xl text-6xl font-bold uppercase leading-[0.9] tracking-tight md:text-8xl xl:text-[9rem]">
          EVERY
          <br />
          HOUSE
          <br />
          BEGINS
          <br />
          SOMEWHERE.
        </h1>

        <p className="mt-10 max-w-md text-lg text-white/70">
          Second To None.
        </p>

        <button className="mt-12 rounded-full border border-white px-8 py-4 text-sm uppercase tracking-[0.3em] transition duration-300 hover:bg-white hover:text-black">
          ENTER THE HOUSE
        </button>

      </div>
    </section>
  );
}