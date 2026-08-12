import { supabase } from "./client";

export interface SupabaseInventoryRow {
  product_slug: string;
  size: string;
  stock: number;
}

export async function getLiveInventory() {
  const { data, error } = await supabase
    .from("inventory")
    .select("product_slug, size, stock")
    .order("product_slug")
    .order("size");

  if (error) {
    throw new Error(
      `Failed to fetch inventory: ${error.message}`
    );
  }

  return data as SupabaseInventoryRow[];
}