export interface ProductGalleryImage {
  image: string;
  alt: string;
  aspect: "landscape" | "portrait";
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductCraftsmanshipItem {
  title: string;
  description: string;
}

export interface Product {
  slug: string;

  name: string;
  subtitle: string;
  description: string;

  price: string;

  chapter: string;
  collection: string;
  edition: string;

  color: string;
  material: string;
  fit: string;
  madeIn: string;

  sizes: string[];

  heroImage: string;

  story: string;

  craftsmanship: ProductCraftsmanshipItem[];

  specs: ProductSpec[];

  gallery: ProductGalleryImage[];
}

export const products: Product[] = [
  {
    slug: "residence-polo",

    name: "Residence Polo",

    subtitle: "Heavyweight Cotton Piqué",

    description:
      "The defining garment of Chapter I",

    price: "₦95,000",

    chapter: "CHAPTER I",

    collection: "Residence",

    edition: "First Release",

    color: "Midnight Black",

    material: "Heavyweight Cotton Piqué",

    fit: "Relaxed",

    madeIn: "Lagos, Nigeria",

    sizes: ["S", "M", "L", "XL"],

    heroImage: "/products/residence-polo/hero.jpg",

    story:
  "Residence was never designed to compete for attention. It was created for those who understand that presence doesn't need permission. Every proportion, every material, and every decision reflects the belief that the pieces we return to most are the ones that quietly become part of our lives.",

    craftsmanship: [
  {
    title: "Heavyweight Cotton Piqué",
    description:
      "Selected for its structured hand feel, exceptional durability, and ability to become softer with every wear.",
  },
  {
    title: "Relaxed Silhouette",
    description:
      "Cut with generous proportions that create effortless movement while maintaining a refined shape.",
  },
  {
    title: "Precision Construction",
    description:
      "Every seam is carefully reinforced to ensure lasting structure, comfort, and everyday reliability.",
  },
  {
    title: "Quiet Identity",
    description:
      "Branding remains intentionally restrained, allowing craftsmanship and proportion to define the garment.",
  },
],
    specs: [
      {
        label: "Material",
        value: "100% Heavyweight Cotton Piqué",
      },
      {
        label: "Fit",
        value: "Relaxed",
      },
      {
        label: "Color",
        value: "Midnight Black",
      },
      {
        label: "Origin",
        value: "Made in Lagos, Nigeria",
      },
    ],

    gallery: [
      {
        image: "/products/residence-polo/gallery-1.jpg",
        alt: "Residence Polo Campaign",
        aspect: "landscape",
      },
      {
        image: "/products/residence-polo/gallery-2.jpg",
        alt: "Residence Polo Detail",
        aspect: "portrait",
      },
      {
        image: "/products/residence-polo/gallery-3.jpg",
        alt: "Residence Polo Fabric Detail",
        aspect: "portrait",
      },
      {
        image: "/products/residence-polo/gallery-4.jpg",
        alt: "Residence Polo Editorial",
        aspect: "landscape",
      },
    ],
  },


//Residence Sweatshirt

{
  slug: "double-layered-sweatshirt",

  name: "Double Layered Sweatshirt",

  subtitle: "Layered Heavyweight Cotton",

  description:
    "An architectural sweatshirt built through layered construction, balancing structure, weight and quiet confidence.",

  price: "₦145,000",

  chapter: "CHAPTER I",

  collection: "Residence",

  edition: "First Release",

  color: "Midnight Black",

  material: "Heavyweight Cotton",

  fit: "Oversized",

  madeIn: "Lagos, Nigeria",

  sizes: ["S", "M", "L", "XL"],

  heroImage:
    "/products/double-layered-sweatshirt/hero.jpg",

  story:
    "Designed around the idea that depth can exist without excess, the Double Layered Sweatshirt combines two carefully balanced layers into one architectural silhouette. Every proportion was considered to create presence through restraint rather than decoration.",

  craftsmanship: [
    {
      title: "Double Layer Construction",
      description:
        "Two integrated layers create visual depth while maintaining a clean exterior profile.",
    },
    {
      title: "Heavyweight Cotton",
      description:
        "Premium cotton selected for structure, warmth and long-term durability.",
    },
    {
      title: "Architectural Fit",
      description:
        "Oversized proportions engineered to drape naturally while preserving form.",
    },
    {
      title: "Refined Construction",
      description:
        "Built with precision finishing that allows the garment to age beautifully over time.",
    },
  ],

  specs: [
    {
      label: "Material",
      value: "100% Heavyweight Cotton",
    },
    {
      label: "Fit",
      value: "Oversized",
    },
    {
      label: "Color",
      value: "Midnight Black",
    },
    {
      label: "Origin",
      value: "Made in Lagos, Nigeria",
    },
  ],

  gallery: [
    {
      image: "/products/double-layered-sweatshirt/gallery-1.jpg",
      alt: "Double Layered Sweatshirt Campaign",
      aspect: "landscape",
    },
    {
      image: "/products/double-layered-sweatshirt/gallery-2.jpg",
      alt: "Double Layered Sweatshirt Detail",
      aspect: "portrait",
    },
    {
      image: "/products/double-layered-sweatshirt/gallery-3.jpg",
      alt: "Double Layered Sweatshirt Construction",
      aspect: "portrait",
    },
    {
      image: "/products/double-layered-sweatshirt/gallery-4.jpg",
      alt: "Double Layered Sweatshirt Editorial",
      aspect: "landscape",
    },
  ],
}

];
