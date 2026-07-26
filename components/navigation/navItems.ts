import { CursorLabel, CursorLabels } from "@/lib/cursor";

export interface NavItem {
  href: string;
  label: string;
  cursor: CursorLabel;

  description: string;
}

export const navItems: NavItem[] = [
  {
    href: "/collections",
    label: "Collections",
    cursor: CursorLabels.ENTER,

    description:
      "Explore every House Eleven collection, from Residence to future chapters. Each garment is presented as part of a living editorial archive.",
  },

  {
    href: "/journal",
    label: "Journal",
    cursor: CursorLabels.READ,

    description:
      "Notes, observations, conversations and visual essays documenting the evolving language of the House.",
  },

  {
    href: "/archive",
    label: "Archive",
    cursor: CursorLabels.VIEW,

    description:
      "Every collection begins long before production. The Archive preserves sketches, ideas, references and the evolution behind each chapter.",
  },

  {
    href: "/about",
    label: "About",
    cursor: CursorLabels.VIEW,

    description:
      "Discover the philosophy of House Eleven—an approach to clothing shaped by restraint, proportion and permanence rather than trend.",
  },

  {
    href: "/account",
    label: "Account",
    cursor: CursorLabels.ENTER,

    description:
      "Access your House Eleven account, manage your profile, orders, saved pieces and future invitations from the House.",
  },
];