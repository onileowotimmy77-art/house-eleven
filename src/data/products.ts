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

  order: number;

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

  //Residence Polo
  {
    slug: "residence-polo",

    order: 1,

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
  order: 2,

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
},

//Residence tee
{
  slug: "residence-tee",
  order: 3,

  name: "Residence Tee",

  subtitle: "Heavyweight Cotton Jersey",

  description:
    "A foundational garment defined by proportion, restraint and everyday permanence.",

  price: "₦75,000",

  chapter: "CHAPTER I",

  collection: "Residence",

  edition: "First Release",

  color: "Midnight Black",

  material: "Heavyweight Cotton Jersey",

  fit: "Relaxed",

  madeIn: "Lagos, Nigeria",

  sizes: ["S", "M", "L", "XL"],

  heroImage: "/products/residence-tee/hero.jpg",

  story:
    "The Residence Tee represents the purest expression of House Eleven. Free from unnecessary detail, every decision focuses on proportion, weight and longevity. Designed to become the garment reached for instinctively, season after season.",

  craftsmanship: [
    {
      title: "Heavyweight Jersey",
      description:
        "Premium cotton jersey selected for structure, softness and long-term durability.",
    },
    {
      title: "Balanced Proportions",
      description:
        "A relaxed silhouette designed to drape naturally while maintaining a refined shape.",
    },
    {
      title: "Everyday Permanence",
      description:
        "Created to become a lasting wardrobe foundation rather than a seasonal statement.",
    },
    {
      title: "Quiet Construction",
      description:
        "Every seam, neckline and finish has been refined to prioritize longevity and comfort.",
    },
  ],

  specs: [
    {
      label: "Material",
      value: "100% Heavyweight Cotton Jersey",
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
      image: "/products/residence-tee/gallery-1.jpg",
      alt: "Residence Tee Campaign",
      aspect: "landscape",
    },
    {
      image: "/products/residence-tee/gallery-2.jpg",
      alt: "Residence Tee Detail",
      aspect: "portrait",
    },
    {
      image: "/products/residence-tee/gallery-3.jpg",
      alt: "Residence Tee Fabric",
      aspect: "portrait",
    },
    {
      image: "/products/residence-tee/gallery-4.jpg",
      alt: "Residence Tee Editorial",
      aspect: "landscape",
    },
  ],

  // Reserved for Phase II
  // variants: [
  //   {
  //     name: "Short Sleeve",
  //   },
  //   {
  //     name: "Long Sleeve",
  //   },
  // ],
},


//Reflective Tanktop
{
  slug: "house11-reflective-tank-top",
  order: 4,

  name: "House 11 Reflective Tank Top",

  subtitle: "Reflective Technical Jersey",

  description:
    "A minimalist performance-inspired silhouette elevated through reflective detailing and architectural restraint.",

  price: "₦65,000",

  chapter: "CHAPTER I",

  collection: "Residence",

  edition: "First Release",

  color: "Midnight Black",

  material: "Premium Cotton Technical Jersey",

  fit: "Athletic Relaxed",

  madeIn: "Lagos, Nigeria",

  sizes: ["S", "M", "L", "XL"],

  heroImage:
    "/products/house11-reflective-tank-top/hero.jpg",

  story:
    "The House 11 Reflective Tank Top explores the balance between utility and luxury. Designed to remain understated by day while revealing subtle reflective detailing under light, it reflects the House Eleven philosophy that identity never needs to shout.",

  craftsmanship: [
    {
      title: "Reflective Identity",
      description:
        "Precision reflective detailing reveals itself only when illuminated, creating quiet distinction rather than constant visibility.",
    },
    {
      title: "Premium Jersey",
      description:
        "A dense cotton jersey selected to combine softness with long-lasting structure.",
    },
    {
      title: "Architectural Silhouette",
      description:
        "Cut to frame the shoulders while maintaining an effortless drape throughout the body.",
    },
    {
      title: "Minimal Construction",
      description:
        "Every seam has been simplified to allow proportion and material to become the focus.",
    },
  ],

  specs: [
    {
      label: "Material",
      value: "Premium Cotton Technical Jersey",
    },
    {
      label: "Fit",
      value: "Athletic Relaxed",
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
      image:
        "/products/house11-reflective-tank-top/gallery-1.jpg",
      alt: "House 11 Reflective Tank Campaign",
      aspect: "landscape",
    },
    {
      image:
        "/products/house11-reflective-tank-top/gallery-2.jpg",
      alt: "Reflective Detail",
      aspect: "portrait",
    },
    {
      image:
        "/products/house11-reflective-tank-top/gallery-3.jpg",
      alt: "Construction Detail",
      aspect: "portrait",
    },
    {
      image:
        "/products/house11-reflective-tank-top/gallery-4.jpg",
      alt: "Editorial Campaign",
      aspect: "landscape",
    },
  ],
},


//Rhinestone Jorts
{
  slug: "residence-rhinestone-jorts",
  order: 5,

  name: "Residence Rhinestone Jorts",

  subtitle: "Heavyweight Denim with Hand-Applied Rhinestones",

  description:
    "A structured denim silhouette elevated through restrained embellishment, balancing craftsmanship with quiet expression.",

  price: "₦125,000",

  chapter: "CHAPTER I",

  collection: "Residence",

  edition: "First Release",

  color: "Vintage Black",

  material: "14oz Premium Cotton Denim",

  fit: "Relaxed",

  madeIn: "Lagos, Nigeria",

  sizes: ["S", "M", "L", "XL"],

  heroImage:
    "/products/residence-rhinestone-jorts/hero.jpg",

  story:
    "The Residence Rhinestone Jorts challenge the idea that embellishment must be excessive. Each stone is intentionally placed to catch light subtly, allowing craftsmanship rather than decoration to define the garment. Built as an expressive counterpart within the Residence collection, the silhouette remains grounded in House Eleven's philosophy of restraint.",

  craftsmanship: [
    {
      title: "Premium Denim",
      description:
        "Constructed from heavyweight cotton denim chosen for structure, durability and graceful ageing.",
    },
    {
      title: "Hand-Applied Rhinestones",
      description:
        "Each rhinestone is individually positioned to create depth and light without overwhelming the garment.",
    },
    {
      title: "Architectural Fit",
      description:
        "Relaxed proportions allow effortless movement while maintaining a strong silhouette.",
    },
    {
      title: "Built To Age",
      description:
        "Designed so both the denim and embellishment develop character through continued wear.",
    },
  ],

  specs: [
    {
      label: "Material",
      value: "14oz Premium Cotton Denim",
    },
    {
      label: "Fit",
      value: "Relaxed",
    },
    {
      label: "Color",
      value: "Vintage Black",
    },
    {
      label: "Origin",
      value: "Made in Lagos, Nigeria",
    },
  ],

  gallery: [
    {
      image:
        "/products/residence-rhinestone-jorts/gallery-1.jpg",
      alt: "Residence Rhinestone Jorts Campaign",
      aspect: "landscape",
    },
    {
      image:
        "/products/residence-rhinestone-jorts/gallery-2.jpg",
      alt: "Rhinestone Detail",
      aspect: "portrait",
    },
    {
      image:
        "/products/residence-rhinestone-jorts/gallery-3.jpg",
      alt: "Denim Construction",
      aspect: "portrait",
    },
    {
      image:
        "/products/residence-rhinestone-jorts/gallery-4.jpg",
      alt: "Residence Rhinestone Jorts Editorial",
      aspect: "landscape",
    },
  ],
}

];
