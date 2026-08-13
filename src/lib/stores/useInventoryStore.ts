return state;
            }

            return {
              inventory:
                state.inventory.map(
                  (item) => {
                    if (
                      item.productSlug !==
                      productSlug
                    ) {
                      return item;
                    }

                    const updatedSizes =
                      item.sizes.map(
                        (
                          inventorySize
                        ) =>
                          inventorySize.size ===
                          size
                            ? {
                                ...inventorySize,

                                stock:
                                  inventorySize.stock -
                                  quantity,
                              }
                            : inventorySize
                      );

                    return {
                      ...item,

                      sizes:
                        updatedSizes,

                      status:
                        getInventoryStatus(
                          updatedSizes
                        ),
                    };
                  }
                ),
            };
          }),

      /*
       * Temporary client-side claim.
       *
       * This remains here so existing
       * callers continue compiling.
       *
       * We will replace the actual
       * checkout authority with a
       * Supabase atomic operation.
       */
      claimInventory:
        (items) => {
          let claimed = false;

          set((state) => {
            const requested =
              new Map<
                string,
                number
              >();

            for (
              const item of items
            ) {
              const key =
                ${item.productSlug}::${item.size};

              requested.set(
                key,
                (requested.get(
                  key
                ) ?? 0) +
                  item.quantity
              );
            }

            for (
              const [
                key,
                quantity,
              ] of requested
            ) {
              const [
                productSlug,
                size,
              ] = key.split("::");

              const product =
                state.inventory.find(
                  (item) =>
                    item.productSlug ===
                    productSlug
                );

              if (!product) {
                return state;
              }

              const sizeInventory =
                product.sizes.find(
                  (item) =>
                    item.size ===
                    size
                );

              if (
                !sizeInventory ||
                sizeInventory.stock <
                  quantity
              ) {
                return state;
              }
            }

            const updatedInventory =
              state.inventory.map(
                (product) => {
                  const updatedSizes =
                    product.sizes.map(
                      (
                        sizeInventory
                      ) => {
                        const key =
                          ${product.productSlug}::${sizeInventory.size};

                        const quantity =
                          requested.get(
                            key
                          ) ?? 0;

                        if (
                          quantity <= 0
                        ) {
                          return sizeInventory;
                        }

                        return {
                          ...sizeInventory,

                          stock:
                            sizeInventory.stock -
                            quantity,
                        };
                      }
                    );

                  return {
                    ...product,

                    sizes:
                      updatedSizes,
                      