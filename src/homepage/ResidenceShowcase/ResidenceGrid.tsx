"use client";

import GalleryItem from "@/src/homepage/ResidenceShowcase/CollectionGalleryItem";
import { getCollection } from "@/src/data/getCollection";
import Link from "next/link";
import EditorialLink from "@/components/ui/EditorialLink";

export default function ResidenceGrid() {
  const products = getCollection("Residence").filter(
    (product) => product.slug !== "residence-polo"
  );

  const layout = [
    {
      eyebrow: "Layer",
      description:
        "Built through layered construction and engineered for everyday permanence.",
      image: "/sweatshirt.jpg",
      className: "lg:col-span-6",
    },
    {
      eyebrow: "Essential",
      description:
        "The foundation of the Residence collection, defined by proportion and longevity.",
      image: "/tee.jpg",
      className: "lg:col-span-6 lg:pt-32",
    },
    {
      eyebrow: "Statement",
      description:
        "Performance-inspired minimalism elevated through restrained reflective detailing.",
      image: "/tank.jpg",
      className: "lg:col-span-6 lg:pt-32",
    },
    {
      eyebrow: "Expression",
      description:
        "Heavyweight denim elevated through restrained embellishment.",
      image: "/jorts.jpg",
      className: "lg:col-span-6",
    },
  ];

  return (
    <>
      {/* Supporting Garments */}
      <section className="mt-40">
        <div
          className="
            grid
            gap-15
            lg:grid-cols-12
          "
        >
          {products.map((product, index) => {
            const item = layout[index];

            return (
              <div
                key={product.slug}
                className={item.className}
              >
                <GalleryItem
                price=""
                  editorial
                  eyebrow={item.eyebrow}
                  title={product.name}
                  description={item.description}
                  image={item.image}
                  href={`/products/${product.slug}`}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Foundation Piece */}
      <section className="mt-32"></section>

      {/* Chapter CTA */}
<section
  className="
    mt-32
    flex
    justify-center
  "
>
  <EditorialLink
    href="/collections/residence"
    cursorLabel="ENTER"
  >
    Explore the Full Residence Collection
  </EditorialLink>
</section>
    </>
  );
}