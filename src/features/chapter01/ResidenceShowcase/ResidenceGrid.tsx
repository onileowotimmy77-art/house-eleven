"use client";

import GalleryItem from "@/src/features/chapter01/ResidenceShowcase/CollectionGalleryItem";
import { getCollection } from "@/src/data/getCollection";


export default function ResidenceGrid() {
  const products = getCollection("Residence");

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
          {/* Sweatshirt */}
        <div className="lg:col-span-6">
          <GalleryItem
            editorial
            eyebrow="Layer"
            title="Double Layered Sweatshirt"
            description="Built with a structured silhouette and engineered for everyday wear."
            price=""
            image="/sweatshirt.jpg"
            href="#"
          />
        </div>

          {/* Hoodie */}
         <div className="lg:col-span-6 lg:pt-32">
          <GalleryItem
            editorial
            eyebrow="Layer"
            title="Residence Hoodie"
            description="Relaxed proportions with the same quiet identity as the chapter's signature pieces."
            price=""
            image="/hoodie.jpg"
            href="#"
          />
        </div>

          {/* Tee 01 */}
         <div className="lg:col-span-6 lg:pt-32">
          <GalleryItem
            editorial
            eyebrow="Essential"
            title="Residence Tee I"
            description="A refined everyday staple available in multiple seasonal colourways."
            price=""
            image="/tee1.jpg"
            href="#"
          />
         </div>
          {/* Tee 02 */}
        <div className="lg:col-span-6">
          <GalleryItem
            editorial
            eyebrow="Essential"
            title="Residence Tee II"
            description="Designed to pair effortlessly with every garment in Chapter 01."
            price=""
            image="/tee2.jpg"
            href="#"
          />
        </div>
        </div>

      </section>

      {/* Foundation Piece */}
      <section className="mt-32">

      </section>

      {/* Chapter CTA */}
      <section className="mt-32">

      </section>
    </>
  );
}