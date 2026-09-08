import { supabase } from "./client";

export interface SupabaseSavedPieceRow {
  id: string;
  user_id: string;
  product_slug: string;
  created_at: string;
}

export async function getSavedPieces() {
  const { data, error } = await supabase
    .from("saved_pieces")
    .select(
      "id, user_id, product_slug, created_at"
    )
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to fetch saved pieces: ${error.message}`
    );
  }

  return data as SupabaseSavedPieceRow[];
}

export async function saveSavedPiece(
  productSlug: string
) {
  const normalizedSlug =
    productSlug.trim();

  if (!normalizedSlug) {
    throw new Error(
      "Cannot save a piece without a product slug."
    );
  }

  const { error } = await supabase
    .from("saved_pieces")
    .insert({
      product_slug: normalizedSlug,
    });

  if (error) {
    throw new Error(
      `Failed to save piece: ${error.message}`
    );
  }
}

export async function removeSavedPiece(
  productSlug: string
) {
  const normalizedSlug =
    productSlug.trim();

  if (!normalizedSlug) {
    throw new Error(
      "Cannot remove a piece without a product slug."
    );
  }

  const { error } = await supabase
    .from("saved_pieces")
    .delete()
    .eq("product_slug", normalizedSlug);

  if (error) {
    throw new Error(
      `Failed to remove saved piece: ${error.message}`
    );
  }
}

export async function saveSavedPieces(
  productSlugs: string[]
) {
  const normalizedSlugs = [
    ...new Set(
      productSlugs
        .map((slug) => slug.trim())
        .filter(Boolean)
    ),
  ];

  if (normalizedSlugs.length === 0) {
    return;
  }

  const rows = normalizedSlugs.map(
    (productSlug) => ({
      product_slug: productSlug,
    })
  );

  const { error } = await supabase
    .from("saved_pieces")
    .upsert(rows, {
      onConflict:
        "user_id,product_slug",
      ignoreDuplicates: true,
    });

  if (error) {
    throw new Error(
      `Failed to save pieces: ${error.message}`
    );
  }
}