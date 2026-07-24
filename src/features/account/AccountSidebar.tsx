"use client";

import AccountNavigation from "./AccountNavigation";

export default function AccountSidebar() {
  return (
    <div
      className="
        lg:sticky
        lg:top-32
      "
    >
      {/* Account Identity */}

      <div
        className="
          border-b
          border-white/10
          pb-10
        "
      >
        <p
          className="
            font-mono
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-white/35
          "
        >
          House Eleven
        </p>

        <h2
          className="
            mt-5
            text-[1.75rem]
            font-medium
            tracking-[-0.04em]
          "
        >
          Your House
        </h2>

        <p
          className="
            mt-4
            leading-7
            text-white/50
          "
        >
          Manage your orders, archive and personal details.
        </p>
      </div>

      {/* Navigation */}

      <div className="mt-12">
        <AccountNavigation />
      </div>
    </div>
  );
}