"use client";

import AccountLayout from "@/components/account/AccountLayout";
import AddressCard from "@/components/account/AddressCard";

export default function AddressesPage() {
  return (
    <AccountLayout
      title="Addresses"
      description="Manage the destinations where your Residence will arrive."
    >
      <div className="space-y-8">

        <div className="space-y-8">

  <AddressCard
    label="Home"
    recipient="John Doe"
    address="15 Admiralty Way"
    city="Lekki, Lagos"
    country="Nigeria"
    isDefault
  />

  <AddressCard
    label="Office"
    recipient="John Doe"
    address="22 Marina Road"
    city="Lagos Island, Lagos"
    country="Nigeria"
  />

</div>

      </div>
    </AccountLayout>
  );
}