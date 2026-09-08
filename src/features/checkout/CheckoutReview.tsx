"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Reveal from "@/components/motion/Reveal";

import CommerceButton from "@/src/features/commerce/CommerceButton";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import ReviewItems from "./ReviewItems";
import ReviewTotals from "./ReviewTotals";

import { useBagStore } from "@/src/lib/stores/useBagStore";

import { placeOrder } from "@/src/lib/commerce/placeOrder";

import { getProduct } from "@/src/data/getProduct";

import type { CheckoutPaymentMethod } from "./CheckoutSection";

type CheckoutAccessError =
  | "unauthenticated"
  | "email_unconfirmed"
  | null;

interface CheckoutReviewProps {
  paymentMethod: CheckoutPaymentMethod;
}

export default function CheckoutReview({
  paymentMethod,
}: CheckoutReviewProps) {
  const router = useRouter();

  const items = useBagStore(
    (state) => state.items
  );

  const [
    inventoryError,
    setInventoryError,
  ] = useState(false);

  const [
    accessError,
    setAccessError,
  ] = useState<CheckoutAccessError>(null);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const reviewItems = useMemo(() => {
    return items
      .map((item) => {
        const product = getProduct(
          item.productSlug
        );

        if (!product) {
          return null;
        }

        return {
          id: `${item.productSlug}-${item.size}`,
          name: product.name,
          color: product.color,
          size: item.size,
          quantity: item.quantity,
          price: product.price,
        };
      })
      .filter(
        (
          item
        ): item is {
          id: string;
          name: string;
          color: string;
          size: string;
          quantity: number;
          price: string;
        } => item !== null
      );
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => {
        const product = getProduct(
          item.productSlug
        );

        if (!product) {
          return total;
        }

        return (
          total +
          product.priceValue *
            item.quantity
        );
      },
      0
    );
  }, [items]);

  const total = subtotal;

  async function handleConfirmOrder() {
    if (isSubmitting) {
      return;
    }

    if (items.length === 0) {
      router.push("/bag");
      return;
    }

    setInventoryError(false);
    setAccessError(null);
    setIsSubmitting(true);

    const result =
      await placeOrder(paymentMethod);

    /*
     * ------------------------------------------------------
     * Verification / authentication result.
     *
     * These states are returned before the database
     * checkout transaction begins, so the bag must remain
     * completely untouched.
     * ------------------------------------------------------
     */

    if (
      result &&
      !("orderNumber" in result)
    ) {
      setAccessError(
        result.status
      );

      setIsSubmitting(false);

      return;
    }

    /*
     * ------------------------------------------------------
     * Checkout failed.
     *
     * A null result here represents the existing inventory
     * or checkout failure path. placeOrder() has already
     * performed the authoritative inventory reconciliation.
     * ------------------------------------------------------
     */

    if (!result) {
      setInventoryError(true);
      setIsSubmitting(false);

      return;
    }

    /*
     * ------------------------------------------------------
     * Checkout succeeded.
     * ------------------------------------------------------
     */

    router.push(
      "/checkout/confirmation"
    );
  }

  function handleReturnToBag() {
    /*
     * placeOrder() has already performed
     * the authoritative inventory
     * reconciliation when checkout fails.
     *
     * That reconciliation may have:
     *
     * - removed unavailable pieces
     * - reduced partially available
     *   quantities
     * - created the inventory notice
     *
     * Do NOT reconcile again here.
     *
     * A second reconciliation would replace
     * the existing inventory notice and could
     * cause the customer to return to the Bag
     * without seeing why a piece was removed.
     */
    router.push("/bag");
  }

  return (
    <section className="py-40">
      <Reveal>
        <Eyebrow>
          Chapter IV
        </Eyebrow>

        <Display className="mt-8">
          Review
        </Display>

        <Body
          className="
            mt-8
            max-w-2xl
          "
        >
          Take one final look before your order begins its journey.
        </Body>
      </Reveal>

      <div className="mt-24">
        <ReviewItems
          items={reviewItems}
        />

        <ReviewTotals
          subtotal={`₦${new Intl.NumberFormat(
            "en-NG"
          ).format(subtotal)}`}
          shipping="Calculated at checkout"
          total={`₦${new Intl.NumberFormat(
            "en-NG"
          ).format(total)}`}
        />

        {accessError ===
          "email_unconfirmed" && (
          <div
            className="
              mt-16
              border
              border-white/10
              bg-white/[0.03]
              px-6
              py-6
            "
          >
            <p
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/45
              "
            >
              Email Confirmation Required
            </p>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-white/70
              "
            >
              Confirm your email address before
              completing your order. Your
              selection will remain in your Bag
              while you complete this step.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/account/profile"
                )
              }
              className="
                mt-6
                border-b
                border-white/15
                pb-2
                font-mono
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/65
                transition-colors
                duration-300
                hover:border-white/50
                hover:text-white
              "
            >
              Go to Your Profile
            </button>
          </div>
        )}

        {accessError ===
          "unauthenticated" && (
          <div
            className="
              mt-16
              border
              border-white/10
              bg-white/[0.03]
              px-6
              py-6
            "
          >
            <p
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/45
              "
            >
              House Eleven Account Required
            </p>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-white/70
              "
            >
              Sign in to your House Eleven
              account before completing your
              order. Your selection will remain
              in your Bag.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/account/profile"
                )
              }
              className="
                mt-6
                border-b
                border-white/15
                pb-2
                font-mono
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/65
                transition-colors
                duration-300
                hover:border-white/50
                hover:text-white
              "
            >
              Enter the House
            </button>
          </div>
        )}

        {inventoryError && (
          <div
            className="
              mt-16
              border
              border-white/10
              bg-white/[0.03]
              px-6
              py-5
            "
          >
            <p
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/45
              "
            >
              Selection Updated
            </p>

            <p
              className="
                mt-3
                text-sm
                leading-relaxed
                text-white/70
              "
            >
              One or more pieces in your
              selection are no longer
              available in the requested
              quantity. Return to your Bag
              to review the current
              availability.
            </p>

            <button
              type="button"
              onClick={
                handleReturnToBag
              }
              className="
                mt-6
                border-b
                border-white/15
                pb-2
                font-mono
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/65
                transition-colors
                duration-300
                hover:border-white/50
                hover:text-white
              "
            >
              Return to Bag
            </button>
          </div>
        )}

        <CommerceButton
          onClick={
            handleConfirmOrder
          }
          disabled={
            isSubmitting ||
            accessError !== null
          }
          className="mt-20 w-full"
        >
          {isSubmitting
            ? "Confirming Order"
            : "Confirm Order"}
        </CommerceButton>
      </div>
    </section>
  );
}