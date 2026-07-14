export interface NavItem {
  href: string;
  label: string;
  cursor: string;
}

export const navItems: NavItem[] = [
  {
    href: "/collections",
    label: "Collections",
    cursor: "GO",
  },
  {
    href: "/manifesto",
    label: "Manifesto",
    cursor: "READ",
  },
  {
    href: "/journal",
    label: "Journal",
    cursor: "GO",
  },
  {
    href: "/residents",
    label: "Residents",
    cursor: "GO",
  },
];