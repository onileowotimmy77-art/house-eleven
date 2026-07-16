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

      <div className="mt-8">

        {price && (
          <span className="text-xl font-semibold mb-6">
            {price}
          </span>
        )}

        <span
  className="
    inline-flex
    items-center
    gap-2
    
    text-[11px]
    uppercase
    tracking-[0.35em]
    text-white/45
    transition-colors
    duration-500
    hover:text-white
  "
>
  View Piece →
</span>
      </div>
    </div>
  );
}