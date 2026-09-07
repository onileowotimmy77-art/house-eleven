"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { useAuth } from "@/components/providers/AuthProvider";

import { useSavedPiecesStore } from "@/src/lib/stores/useSavedPiecesStore";
import { signOut } from "@/src/lib/supabase/auth";

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

  const { user } = useAuth();

  const savedPiecesCount = useSavedPiecesStore(
    (state) => state.pieces.length
  );

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  }

  return (
    <nav aria-label="Account navigation">
      <ul className="space-y-2">
        {navigation.map((item) => {
          const active = pathname === item.href;

          const isSavedPieces =
            item.href === "/account/saved";

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
                <span className="tracking-[-0.02em]">
                  {item.label}
                </span>

                <div
                  className="
                    flex
                    items-center
                    gap-5
                  "
                >
                  {isSavedPieces &&
                    savedPiecesCount > 0 && (
                      <span
                        className={clsx(
                          `
                            font-mono
                            text-[10px]
                            tracking-[0.2em]
                            transition-opacity
                            duration-300
                          `,
                          active
                            ? "text-white/60"
                            : "text-white/30 group-hover:text-white/50"
                        )}
                      >
                        {String(
                          savedPiecesCount
                        ).padStart(2, "0")}
                      </span>
                    )}

                  <span
                    className={clsx(
                      `
                        text-lg
                        transition-all
                        duration-300
                      `,
                      active
                        ? "translate-x-0 opacity-100"
                        : `
                          -translate-x-1
                          opacity-0

                          group-hover:translate-x-0
                          group-hover:opacity-100
                        `
                    )}
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {user && (
        <div
          className="
            mt-12
            border-t
            border-white/10
            pt-8
          "
        >
          <button
            type="button"
            onClick={handleSignOut}
            className="
              group
              flex
              w-full
              items-center
              justify-between

              py-4

              text-left
              text-white/35

              transition-colors
              duration-300

              hover:text-white
            "
          >
            <span
              className="
                text-xs
                uppercase
                tracking-[0.25em]
              "
            >
              Sign Out
            </span>

            <span
              className="
                text-lg
                opacity-0
                -translate-x-1

                transition-all
                duration-300

                group-hover:translate-x-0
                group-hover:opacity-100
              "
              aria-hidden
            >
              →
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}