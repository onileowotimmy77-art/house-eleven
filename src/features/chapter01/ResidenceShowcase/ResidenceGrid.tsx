"use client";

import GalleryItem from "@/src/features/chapter01/ResidenceShowcase/CollectionGalleryItem";
import { getCollection } from "@/src/data/getCollection";


export default function ResidenceGrid() {
  const products = getCollection("Residence")
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