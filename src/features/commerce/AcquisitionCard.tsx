"use client";

import CommerceNotification from "./CommerceNotification";

interface AcquisitionCardProps {
  open: boolean;
  image: string;
  name: string;
  size: string;
  price: string;
}

export default function AcquisitionCard({
  open,
  image,
  name,
  size,
  price,
}: AcquisitionCardProps) {
  return (
    <CommerceNotification
      open={open}
      image={image}
      eyebrow="House Eleven"
      title={name}
      subtitle={`Size ${size} • ${price}`}
      message="This piece has entered your Residence."
      ctaLabel="View Bag"
      ctaHref="/bag"
    />
  );
}