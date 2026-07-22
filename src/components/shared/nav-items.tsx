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
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { MORE_LINKS } from "@/constants/nav-links";
import { CategoryNavMenu } from "@/components/shared/nav/category-nav-menu";

export function NavigationLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden shrink-0 items-center gap-1 lg:flex">
      <CategoryNavMenu />

      <NavigationMenu viewport={false} className="items-center">
        <NavigationMenuList>
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
    </div>
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
