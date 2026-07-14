"use client";

import NavLink from "./NavLink";
import { navItems } from "./navItems";

export default function NavLinks() {
  return (
    <nav
      className="
        hidden
        lg:flex
        items-center
        gap-12
        xl:gap-14
      "
    >
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          cursor={item.cursor}
        />
      ))}
    </nav>
  );
}