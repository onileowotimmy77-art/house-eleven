"use client";

interface ReviewRowProps {
  label: string;
  value: React.ReactNode;
}

export default function ReviewRow({
  label,
  value,
}: ReviewRowProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between

        border-b
        border-white/10

        py-8
      "
    >
      <span
        className="
          font-mono
          text-[11px]
          uppercase
          tracking-[0.35em]
          text-white/40
        "
      >
        {label}
      </span>

      <span
        className="
          text-lg
          tracking-[-0.02em]
          text-white
          text-right
        "
      >
        {value}
      </span>
    </div>
  );
}