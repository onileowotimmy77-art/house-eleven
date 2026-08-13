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

export interface InventoryClaimItem {
  productSlug: string;
  size: string;
  quantity: number;
}

export async function claimOrderInventory(
  items: InventoryClaimItem[]
): Promise<boolean> {
  if (items.length === 0) {
    return false;
  }

  const { data, error } =
    await supabase.rpc(
      "claim_order_inventory",
      {
        p_items: items,
      }
    );

  if (error) {
    throw new Error(
      `Failed to claim inventory: ${error.message}` 
    );
  }

  return data === true;
}