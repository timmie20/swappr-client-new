"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  href?: string;
  description?: string;
  subItems?: NavItem[];
};

const NAV_LINKS: NavItem[] = [
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

const MORE_LINKS: NavItem[] = [
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

export function NavigationLinks() {
  const pathname = usePathname();

  return (
    <NavigationMenu
      viewport={false}
      className="hidden w-full flex-auto flex-wrap items-center justify-center lg:flex"
    >
      <NavigationMenuList className="flex-wrap">
        {...NAV_LINKS.map((link) =>
          link.subItems ? (
            <NavigationMenuItem key={link.name}>
              <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-125 md:grid-cols-2 lg:w-150">
                  {link.subItems.map((sub) => (
                    <ListItem
                      key={sub.name}
                      title={sub.name}
                      href={sub.href!}
                      active={sub.href === pathname}
                    >
                      {sub.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={link.name}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
                active={link.href === pathname}
              >
                <Link
                  href={link.href!}
                  className={`${link.href === pathname ? "bg-primary/90 text-white" : ""} text-sm`}
                >
                  {link.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
        <NavigationMenuItem>
          <NavigationMenuTrigger>More on Swappr</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              {MORE_LINKS.map((link) => (
                <ListItem
                  key={link.name}
                  title={link.name}
                  href={link.href!}
                  active={link.href === pathname}
                >
                  {link.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  active,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; active: boolean }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild active={active}>
        <Link
          href={href}
          className={`${active ? "bg-primary/5 border-primary/30 border" : ""} `}
        >
          <div className="flex flex-col gap-1 text-[13px]">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
