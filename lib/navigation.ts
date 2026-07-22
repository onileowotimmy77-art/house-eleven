export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Primary site navigation
 * Used by:
 * - Navbar
 * - Concierge
 */
export const primaryNavigation: NavigationItem[] = [
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "Archive",
    href: "/archive",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Residents",
    href: "/residents",
  },
];

/**
 * Finale navigation
 * Intentionally shorter than the main navigation.
 */
export const finaleNavigation: NavigationItem[] = [
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const socialNavigation: NavigationItem[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/stfu_milooo?igsh=cjRzem9qOHpxMGsy&utm_source=qr",
    external: true,
  },
];