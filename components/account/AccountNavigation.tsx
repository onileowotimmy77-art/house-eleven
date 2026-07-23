"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navigation = [
  {
    label: "Orders",
    href: "/account/orders",
  },
  {
    label: "Saved Pieces",
    href: "/account/saved",
  },
  {
    label: "Addresses",
    href: "/account/addresses",
  },
  {
    label: "Profile",
    href: "/account/profile",
  },
];

export default function AccountNavigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-2">
        {navigation.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  `
                  group
                  flex
                  items-center
                  justify-between

                  border-b
                  border-white/5

                  py-5

                  transition-colors
                  duration-300
                  `,
                  active
                    ? "text-white"
                    : "text-white/45 hover:text-white"
                )}
              >
                <span
                  className="
                    tracking-[-0.02em]
                  "
                >
                  {item.label}
                </span>

                <span
                  className={clsx(
                    `
                    text-lg
                    transition-transform
                    duration-300
                    `,
                    active
                      ? "translate-x-0"
                      : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  )}
                >
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}