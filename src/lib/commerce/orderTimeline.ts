import type { Order } from "@/src/lib/stores/useOrderStore";

export interface OrderTimelineStep {
  title: string;
  description: string;
  complete: boolean;
}

const timeline = [
  {
    status: "Order Confirmed",
    title: "Order Confirmed",
    description:
      "Your order has been received and reserved.",
  },
  {
    status: "Preparing Garments",
    title: "Preparing Garments",
    description:
      "Every piece is being prepared for inspection.",
  },
  {
    status: "Quality Inspection",
    title: "Quality Inspection",
    description:
      "Each garment is undergoing final inspection.",
  },
  {
    status: "Dispatch",
    title: "Dispatch",
    description:
      "Your Residence is being prepared for its journey.",
  },
  {
    status: "Delivered",
    title: "Delivered",
    description:
      "Your Residence has arrived. Welcome home.",
  },
] as const;

export function getOrderTimeline(
  order: Order
): OrderTimelineStep[] {
  const currentStepIndex =
    timeline.findIndex(
      (step) =>
        step.status === order.status
    );

  return timeline.map(
    (step, index) => ({
      title: step.title,
      description:
        step.description,
      complete:
        currentStepIndex >= 0 &&
        index <= currentStepIndex,
    })
  );
}