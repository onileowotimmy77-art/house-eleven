"use client";

import BagItem from "./BagItem";
import CommerceEmpty from "@/src/features/commerce/CommerceEmpty";

const bagItems = [
  {
    id: "residence-polo-black",

    image: "/products/residence-polo/01.jpg",

    name: "Residence Polo",

    collection: "Residence",

    colour: "Black",

    size: "M",

    quantity: 1,

    price: 145000,
  },

  {
    id: "residence-polo-cream",

    image: "/products/residence-polo/02.jpg",

    name: "Residence Polo",

    collection: "Residence",

    colour: "Cream",

    size: "L",

    quantity: 1,

    price: 145000,
  },
];

export default function BagItems() {
  if (bagItems.length === 0) {
    return (
      <CommerceEmpty
        eyebrow="Selection"
        title="Nothing Has Been Selected."
        description="The House is waiting. Explore the collection and discover the pieces that belong with you."
        cta="Explore Collections"
        href="/collections"
      />
    );
  }

  return (
    <div>
      {bagItems.map((item) => (
        <BagItem
          key={item.id}
          image={item.image}
          name={item.name}
          collection={item.collection}
          colour={item.colour}
          size={item.size}
          quantity={item.quantity}
          price={item.price}
          onIncrease={() => {}}
          onDecrease={() => {}}
          onRemove={() => {}}
        />
      ))}
    </div>
  );
}