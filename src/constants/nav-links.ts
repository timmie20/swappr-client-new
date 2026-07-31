type NavItem = {
  name: string;
  href?: string;
  description?: string;
  subItems?: NavItem[];
  image?: string;
};

/**
 * Non-category static links shown alongside the dynamic category nav
 * (categories/subcategories are fetched from the API - see @/lib/category-nav).
 */
export const EXTRA_NAV_LINKS: NavItem[] = [{ name: "Deals", href: "deals" }];

export const MORE_LINKS: NavItem[] = [
  {
    name: "About Swappr",
    href: "/about",
    description: "Learn about our mission and values.",
  },
  // {
  //   name: "Check your iPhone's value",
  //   href: "/check-worth",
  //   description: "Find out how much your iPhone is worth.",
  // },
  {
    name: "Become a Vendor",
    href: "/vendor",
    description: "Join our network of trusted vendors.",
  },
  {
    name: "How it works",
    href: "/how-it-works",
    description: "Understand our simple selling process.",
  },
  // {
  //   name: "Privacy & Data Security",
  //   href: "/docs/selling",
  //   description: "Learn about our commitment to your privacy.",
  // },
];
