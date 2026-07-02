export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center max-w-3xl">

        <p className="uppercase tracking-[0.6em] text-xs text-neutral-500">
          DROP 001
        </p>

        <h1 className="mt-8 text-6xl md:text-8xl lg:text-9xl uppercase tracking-[0.18em] font-bold">
          HOUSE
          <br />
          ELEVEN
        </h1>

        <p className="mt-8 text-neutral-400 text-lg md:text-xl">
          Modern Streetwear for the Next Generation.
        </p>

        <p className="mt-5 text-neutral-500 max-w-xl mx-auto leading-8">
          Quiet confidence. Elevated essentials. Designed for people who don't
          chase attention—they naturally attract it.
        </p>

        <import Button from "./Button";

      </div>
    </section>
  );
}