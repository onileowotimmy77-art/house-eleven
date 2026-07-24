import CommerceHeader from "@/src/features/commerce/CommerceHeader";
import BagItems from "@/src/features/bag/BagItems";
import BagSummarySection from "@/src/features/bag/BagSummarySection";

export default function BagPage() {
  return (
    <main className="bg-black text-white">

      <CommerceHeader
        eyebrow="Selection"
        title="Selected Pieces"
        description="Everything here has been chosen with intention."
      />

      <BagSummarySection>
        <BagItems />
      </BagSummarySection>

    </main>
  );
}