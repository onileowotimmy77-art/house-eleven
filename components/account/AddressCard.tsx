"use client";

interface AddressCardProps {
  label: string;
  recipient: string;
  address: string;
  city: string;
  country: string;
  isDefault?: boolean;
}

export default function AddressCard({
  label,
  recipient,
  address,
  city,
  country,
  isDefault = false,
}: AddressCardProps) {
  return (
    <article
      className="
        border
        border-white/10
        p-10
        transition-colors
        duration-300
        hover:border-white/20
      "
    >
      <div className="flex items-start justify-between gap-6">

        <div>

          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-white/35
            "
          >
            {label}
          </p>

          <h2
            className="
              mt-5
              text-[1.35rem]
              font-medium
              tracking-[-0.03em]
            "
          >
            {recipient}
          </h2>

        </div>

        {isDefault && (
          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-white/45
            "
          >
            Default
          </span>
        )}

      </div>

      <p
        className="
          mt-8
          leading-8
          text-white/60
        "
      >
        {address}
        <br />
        {city}
        <br />
        {country}
      </p>
    </article>
  );
}