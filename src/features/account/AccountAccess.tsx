"use client";

import { useAuth } from "@/components/providers/AuthProvider";

export default function AccountAccess() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return null;
  }

  return (
    <section
      className="
        border-t
        border-white/10
        pt-12
      "
    >
      <div className="max-w-xl space-y-6">
        <p
          className="
            font-mono
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-white/35
          "
        >
          House Eleven Account
        </p>

        <h2
          className="
            text-3xl
            tracking-[-0.03em]
          "
        >
          Enter the House.
        </h2>

        <p
          className="
            max-w-md
            text-sm
            leading-7
            text-white/50
          "
        >
          Sign in to access your profile, saved pieces,
          addresses, and order history.
        </p>
      </div>
    </section>
  );
}