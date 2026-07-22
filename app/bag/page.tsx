import CommerceHeader from "@/components/commerce/CommerceHeader";
import BagItems from "@/components/bag/BagItems";
import BagSummarySection from "@/components/bag/BagSummarySection";

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