"use client";

interface GalleryInfoProps {
  title: string;
  description: string;
  price?: string;
  

  availableColours?: number;
  availableFits?: string[];

  editorial?: boolean;
  eyebrow?: string;

  align?: "left" | "center";
}

export default function GalleryInfo({
  title,
  description,
  price,
  availableColours,
  availableFits,
  eyebrow = "Chapter 01",
  align = "left",
}: GalleryInfoProps) {
  return (
    <div className="mt-8">
      <p
        className="
          text-[11px]
          uppercase
          tracking-[0.35em]
          text-white/35
        "
      >
        {eyebrow}
      </p>

      <h3
        className="
          mt-5
          text-3xl
          font-black
          uppercase
          tracking-[-0.04em]
        "
      >
        {title}
      </h3>

      <p
        className={`
          mt-4
          max-w-2xl
          leading-8
          text-white/60
          ${align === "center" ? "text-center" : "text-left"}
        `}
      >
        {description}
      </p>

      {availableColours && (
        <p
          className={`
            mt-4
            text-white/45
            ${align === "center" ? "text-center" : "text-left"}
          `}
        >
          Available in {availableColours} colours
        </p>
      )}

      {availableFits && (
        <p
          className={`
            mt-2
            text-white/45
            ${align === "center" ? "text-center" : "text-left"}
          `}
        >
          {availableFits.join(" • ")}
        </p>
      )}

      <div className="mt-8 flex items-center">

        {price && (
          <span className="text-xl font-semibold">
            {price}
          </span>
        )}

        <span
  className="
    ml-auto
    text-sm
    uppercase
    tracking-[0.2em]
    text-white/45
    transition-colors
    duration-300
    hover:text-white
  "
>
  View Piece →
</span>
      </div>
    </div>
  );
}