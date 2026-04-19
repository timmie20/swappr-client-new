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
import { MORE_LINKS, NAV_LINKS } from "@/constants/nav-links";

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
