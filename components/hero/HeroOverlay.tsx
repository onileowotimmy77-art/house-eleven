export default function HeroOverlay() {
  return (
    <>
      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
    </>
  );
}