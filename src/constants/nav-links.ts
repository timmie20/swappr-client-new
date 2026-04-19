type NavItem = {
  name: string;
  href?: string;
  description?: string;
  subItems?: NavItem[];
};

export const NAV_LINKS: NavItem[] = [
  { name: "Deals", href: "deals" },
  {
    name: "iPhone",
    href: "#",
    subItems: [
      {
        name: "Explore all iPhones",
        href: "/collections/iphones",
        description: "Browse our full range of iPhones.",
      },
      {
        name: "iPhone SE",
        href: "/collections/iPhone-se",
        description:
          "Get the latest iPhone SE (2nd and 3rd gen) in a compact design.",
      },
      {
        name: "iPhone 17",
        href: "/collections/iPhone-17",
        description:
          "Discover the latest iPhone 17 with cutting-edge features.",
      },
      {
        name: "iPhone 16",
        href: "/collections/iPhone-16",
        description:
          "Explore the powerful iPhone 16 with enhanced performance.",
      },
      {
        name: "iPhone 15",
        href: "/collections/iPhone-15",
      },
      {
        name: "iPhone 14",
        href: "/collections/iPhone-14",
      },
      {
        name: "iPhone 13",
        href: "/collections/iPhone-13",
      },
      {
        name: "iPhone 12",
        href: "/collections/iPhone-12",
      },
      {
        name: "iPhone 11",
        href: "/collections/iPhone-11",
      },
      {
        name: "iPhone X",
        href: "/collections/iPhone-X",
      },
    ],
  },
  {
    name: "Android",
    href: "#",
    subItems: [
      {
        name: "Explore all Androids",
        href: "/collections/androids",
        description: "Browse our full range of Android phones.",
      },
      { name: "Samsung Galaxy", href: "/collections/samsung-galaxy" },
      { name: "Google Pixel", href: "/collections/google-pixel" },
    ],
  },
  { name: "iPad", href: "/contact" },
  { name: "MacBooks", href: "/collections/macbooks" },
  { name: " Watches", href: "/collections/watches" },
  { name: " Audio", href: "/collections/audios" },
  { name: " Accessories", href: "/collections/accessories" },
];

export const MORE_LINKS: NavItem[] = [
  {
    name: "About Swappr",
    href: "/docs",
    description: "Learn about our mission and values.",
  },
  {
    name: "Check your iPhone's value",
    href: "/check-worth",
    description: "Find out how much your iPhone is worth.",
  },
  {
    name: "Become a Vendor",
    href: "/vendor",
    description: "Join our network of trusted vendors.",
  },
  {
    name: "How it works",
    href: "/docs/selling",
    description: "Understand our simple selling process.",
  },
  {
    name: "Privacy & Data Security",
    href: "/docs/selling",
    description: "Learn about our commitment to your privacy.",
  },
];
