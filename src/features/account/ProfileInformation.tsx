"use client";

import CommerceButton from "@/src/features/commerce/CommerceButton";

export default function ProfileInformation() {
  return (
    <section
      className="
        border-t
        border-white/10
        pt-12
      "
    >
      <div className="space-y-10">

        <ProfileRow
          label="Name"
          value="John Doe"
        />

        <ProfileRow
          label="Email"
          value="john@example.com"
        />

        <ProfileRow
          label="Phone"
          value="+234 800 000 0000"
        />

      </div>

      <CommerceButton
        variant="secondary"
        className="mt-16"
      >
        Edit Profile
      </CommerceButton>
    </section>
  );
}

interface ProfileRowProps {
  label: string;
  value: string;
}

function ProfileRow({
  label,
  value,
}: ProfileRowProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-3

        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <span
        className="
          font-mono
          text-[11px]
          uppercase
          tracking-[0.35em]
          text-white/35
        "
      >
        {label}
      </span>

      <span
        className="
          text-lg
          tracking-[-0.02em]
        "
      >
        {value}
      </span>
    </div>
  );
}