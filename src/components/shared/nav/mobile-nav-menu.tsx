"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { MORE_LINKS, NAV_LINKS } from "@/constants/nav-links";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { ASSETS } from "@/constants/assets";

type MobileNavMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type NavItem = {
  name: string;
  href?: string;
  description?: string;
  subItems?: NavItem[];
};

function normalizeHref(href?: string) {
  if (!href || href === "#") return undefined;
  return href.startsWith("/") ? href : `/${href}`;
}

function NavItemRow({
  item,
  isOpen,
  onToggle,
  onNavigate,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const label = item.name.trim();
  const href = normalizeHref(item.href);
  const hasSubItems = (item.subItems?.length ?? 0) > 0;

  if (hasSubItems) {
    return (
      <div className="border-border border-b">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between px-5 py-4 text-left"
        >
          <span className="text-foreground text-base font-semibold">
            {label}
          </span>
          <Icons.chevronRight
            size={18}
            className={cn(
              "text-muted-foreground transition-transform",
              isOpen && "rotate-90",
            )}
          />
        </button>

        {isOpen && (
          <div className="relative pb-4">
            <div className="bg-border/50 absolute top-0 bottom-0 left-7 w-px" />
            <div className="flex flex-col gap-1 pr-5 pl-10">
              {item.subItems?.map((sub) => {
                const subHref = normalizeHref(sub.href);
                if (!subHref) return null;

                return (
                  <Link
                    key={`${label}-${sub.name}`}
                    href={subHref}
                    onClick={onNavigate}
                    className="hover:bg-muted rounded-lg px-3 py-2"
                  >
                    <div className="text-foreground text-sm font-medium">
                      {sub.name.trim()}
                    </div>
                    {sub.description && (
                      <div className="text-muted-foreground mt-0.5 text-xs">
                        {sub.description}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!href) return null;

  return (
    <div className="border-border border-b">
      <Link
        href={href}
        onClick={onNavigate}
        className="flex w-full items-center justify-between px-5 py-4"
      >
        <span className="text-foreground text-base font-semibold">{label}</span>
        {/* <Icons.chevronRight size={18} className="text-muted-foreground" /> */}
      </Link>
    </div>
  );
}

export default function MobileNavMenu({ open, setOpen }: MobileNavMenuProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const topLinks = useMemo(() => NAV_LINKS as NavItem[], []);
  const moreLinks = useMemo(() => MORE_LINKS as NavItem[], []);

  const handleNavigate = () => {
    setOpen(false);
    setOpenGroup(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setOpenGroup(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        showCloseButton={false}
        forceMount
        className="w-full! max-w-none! border-0 p-0 sm:max-w-sm!"
      >
        <SheetHeader className="border-border border-b p-5">
          <SheetTitle>
            <Image
              src={ASSETS.LOGO_DARK}
              alt="Swappr logo"
              width={120}
              height={40}
              priority
              className="h-auto w-auto cursor-pointer"
            />
          </SheetTitle>
          <SheetDescription className="sr-only">
            Mobile navigation menu
          </SheetDescription>
          <button
            onClick={() => handleOpenChange(false)}
            className="absolute top-4 right-4"
          >
            <Icons.close size={30} />
            <span className="sr-only">Close</span>
          </button>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="flex flex-col">
            {topLinks.map((item) => {
              const key = item.name.trim();
              const isGroupOpen = openGroup === key;
              return (
                <NavItemRow
                  key={key}
                  item={item}
                  isOpen={isGroupOpen}
                  onToggle={() =>
                    setOpenGroup((current) => (current === key ? null : key))
                  }
                  onNavigate={handleNavigate}
                />
              );
            })}
          </div>

          <div className="px-5 py-3">
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              More
            </div>
          </div>

          <div className="flex flex-col">
            {moreLinks.map((item) => {
              const key = `more-${item.name.trim()}`;
              const isGroupOpen = openGroup === key;
              return (
                <NavItemRow
                  key={key}
                  item={item}
                  isOpen={isGroupOpen}
                  onToggle={() =>
                    setOpenGroup((current) => (current === key ? null : key))
                  }
                  onNavigate={handleNavigate}
                />
              );
            })}
          </div>
        </div>

        <div className="border-border border-t p-5">
          <Button asChild className="w-full">
            <Link href="/sign-in" onClick={handleNavigate}>
              <Icons.user size={18} />
              Sign In
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
