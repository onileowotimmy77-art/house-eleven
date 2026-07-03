"use client";

import Link from "next/link";
import Container from "./Container";

const links = [
  { name: "Shop", href: "#" },
  { name: "Journal", href: "#" },
  { name: "Residents", href: "#" },
  { name: "Archive", href: "#" },
  { name: "About", href: "#" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between">

          <Link
            href="/"
            className="text-xl font-semibold tracking-[0.35em] text-white"
          >
            HOUSE ELEVEN
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-[0.25em] text-white/70 transition hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button className="rounded-full border border-white px-5 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-black">
            Enter
          </button>

        </div>
      </Container>
    </nav>
  );
}