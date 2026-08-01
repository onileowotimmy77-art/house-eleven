import {
  canAcquireQuantity,
  getSizeStock,
} from "@/src/lib/commerce/inventory";

import type {
  BagItem,
} from "@/src/lib/stores/useBagStore";

export interface BagInventoryIssue {
  productSlug: string;
  size: string;
  requestedQuantity: number;
  availableStock: number;
}

export interface BagInventoryValidation {
  valid: boolean;
  issues: BagInventoryIssue[];
}

export function validateBagInventory(
  items: BagItem[]
): BagInventoryValidation {
  const issues =
    items.reduce<
      BagInventoryIssue[]
    >((currentIssues, item) => {
      const isValid =
        canAcquireQuantity(
          item.productSlug,
          item.size,
          item.quantity
        );

      if (isValid) {
        return currentIssues;
      }

      return [
        ...currentIssues,
        {
          productSlug:
            item.productSlug,
          size:
            item.size,
          requestedQuantity:
            item.quantity,
          availableStock:
            getSizeStock(
              item.productSlug,
              item.size
            ),
        },
      ];
    }, []);

  return {
    valid:
      issues.length === 0,
    issues,
  };
}