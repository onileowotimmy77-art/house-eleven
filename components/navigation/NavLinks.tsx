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
        gap-14
        xl:gap-16
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