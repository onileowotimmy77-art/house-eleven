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


export interface CreateCheckoutOrderInput {
  orderId: string;
  orderNumber: string;
  total: number;
  paymentMethod: string;
  estimatedDelivery: string;
  items: InventoryClaimItem[];
}

export async function createCheckoutOrder(
  input: CreateCheckoutOrderInput
): Promise<boolean> {
  if (input.items.length === 0) {
    return false;
  }

  const { data, error } =
    await supabase.rpc(
      "create_checkout_order",
      {
        p_order_id:
          input.orderId,

        p_order_number:
          input.orderNumber,

        p_total:
          input.total,

        p_payment_method:
          input.paymentMethod,

        p_estimated_delivery:
          input.estimatedDelivery,

        p_items:
          input.items,
      }
    );

  if (error) {
    throw new Error(
      `Failed to create checkout order: ${error.message}`
    );
  }

  return data === true;
}