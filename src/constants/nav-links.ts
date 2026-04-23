type NavItem = {
  name: string;
  href?: string;
  description?: string;
  subItems?: NavItem[];
  image?: string;
};

export const NAV_LINKS: NavItem[] = [
  { name: "Deals", href: "deals" },
  {
    name: "Smartphones",
    href: "#",
    subItems: [
      {
        name: "Explore all iPhones",
        href: "/collections/iphones",
        description: "Browse our full range of iPhones.",
      },
      {
        name: "Explore all Androids",
        href: "/collections/iphones",
        description: "Browse our full range of Androids",
      },
      {
        name: "iPhone 17 & Air",
        href: "/collections/iPhone-17",
        description:
          "Discover the latest iPhone 17 with cutting-edge features.",
      },
      {
        name: "iPhone SE",
        href: "/collections/iPhone-se",
        description:
          "Get the latest iPhone SE (2nd and 3rd gen) in a compact design.",
      },
      {
        name: "iPhone 16",
        href: "/collections/iPhone-16",
        description:
          "Explore the powerful iPhone 16 with enhanced performance.",
      },
    ],
  },
  {
    name: "Laptops",
    href: "#",
    subItems: [
      {
        name: "Explore all MacBooks",
        href: "/collections/macbooks",
        description: "Browse our various collection of MacBooks",
      },
      {
        name: "Explore Windows",
        href: "/collections/macbooks",
        description: "Browse our various collection of Windows laptops",
      },
    ],
  },
  {
    name: "Tablets & iPads",
    href: "#",
    subItems: [
      {
        name: "Explore all iPads",
        href: "/collections/iPads",
        description: "Browse our various collection of iPads",
      },
      {
        name: "Android Tablets",
        href: "/collections/androids-tablets",
        description: "Browse our various collection of android tablets",
      },
    ],
  },
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
