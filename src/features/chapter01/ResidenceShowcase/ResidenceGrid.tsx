"use client";

import GalleryItem from "@/src/features/product/CollectionGalleryItem";

export default function ResidenceGrid() {
  return (
    <>
    

      {/* Supporting Garments */}
      <section className="mt-40">

        <div
          className="
            grid
            gap-24
            
            lg:grid-cols-12
          "
        >
          {/* Sweatshirt */}
        <div className="lg:col-span-7">
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
         <div className="lg:col-span-5 lg:pt-32">
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
         <div className="lg:col-span-5 lg:pt-32">
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
        <div className="lg:col-span-7">
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