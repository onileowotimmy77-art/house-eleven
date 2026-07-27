"use client";

import ReviewItem from "./ReviewItem";

interface Item {
  id: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: string;
}

interface ReviewItemsProps {
  items: Item[];
}

export default function ReviewItems({
  items,
}: ReviewItemsProps) {
  return (
    <section>
      {items.map((item) => (
        <ReviewItem
          key={item.id}
          name={item.name}
          color={item.color}
          size={item.size}
          quantity={item.quantity}
          price={item.price}
        />
      ))}
    </section>
  );
}