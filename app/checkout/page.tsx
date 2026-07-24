import CommerceHeader from "@/src/features/commerce/CommerceHeader";

import CheckoutProgress from "@/src/features/checkout/CheckoutProgress";
import CheckoutSection from "@/src/features/checkout/CheckoutSection";

export default function CheckoutPage() {
  return (
    <main className="bg-black text-white">

      <CommerceHeader
        eyebrow="Checkout"
        title="Complete Your Order"
        description="One final step before these pieces become yours."
      />

      <CheckoutProgress />

      <CheckoutSection />

    </main>
  );
}