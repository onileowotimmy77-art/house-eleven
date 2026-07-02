export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <h1 className="text-[#F5F2EA] text-xl font-bold tracking-[0.25em] uppercase">
          House Eleven
        </h1>

        <div className="hidden md:flex items-center gap-10 uppercase tracking-[0.2em] text-sm text-neutral-300">
          <a href="#" className="hover:text-white transition">
            Shop
          </a>

          <a href="#" className="hover:text-white transition">
            Lookbook
          </a>

          <a href="#" className="hover:text-white transition">
            About
          </a>

          <a
            href="#"
            className="border border-white/20 px-5 py-2 hover:bg-white hover:text-black transition"
          >
            Residents Club
          </a>
        </div>

      </div>
    </nav>
  );
}