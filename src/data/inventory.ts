export type InventoryStatus =
  | "coming-soon"
  | "available"
  | "low-stock"
  | "sold-out";

export interface InventorySize {
  size: string;
  stock: number;
}

export interface ProductInventory {
  productSlug: string;

  status: InventoryStatus;

  sizes: InventorySize[];
}

export const inventory: ProductInventory[] = [
  {
    productSlug: "residence-polo",

    status: "available",

    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 8 },
      { size: "L", stock: 3 },
      { size: "XL", stock: 0 },
    ],
  },

  {
    productSlug: "double-layered-sweatshirt",

    status: "available",

    sizes: [
      { size: "S", stock: 2 },
      { size: "M", stock: 5 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 1 },
    ],
  },

  {
    productSlug: "residence-tee",

    status: "low-stock",

    sizes: [
      { size: "S", stock: 1 },
      { size: "M", stock: 2 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
  },

  {
    productSlug: "house11-reflective-tank-top",

    status: "coming-soon",

    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
  },

  {
    productSlug: "residence-rhinestone-jorts",

    status: "sold-out",

    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
  },
];