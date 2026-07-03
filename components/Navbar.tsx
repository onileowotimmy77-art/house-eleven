import Container from "./Container";
import useScroll from "@/hooks/useScroll";

export default function Navbar() {
  const scrolled = useScroll();

  return (
    <nav
  className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
    scrolled
      ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
      : "bg-transparent"
  }`}
>

      <Container>

        <div className="flex h-20 items-center justify-between">

          <h1 className="uppercase tracking-[0.35em] font-bold">
            HOUSE ELEVEN
          </h1>

          <div className="hidden md:flex gap-10 uppercase tracking-[0.2em] text-sm">

            <a href="#">Shop</a>

            <a href="#">Lookbook</a>

            <a href="#">Journal</a>

            <a href="#">About</a>

          </div>

        </div>

      </Container>

    </nav>
  );
}