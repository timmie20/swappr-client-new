"use client";

import Link from "next/link";
import { useState } from "react";

import { useScrollDetection } from "@/hooks/use-scroll-detection";
import { cn } from "@/lib/utils";
import { Icons } from "../../icons";
import NavActionButtons from "./action-buttons";
import { NavigationLinks } from "../nav-items";
import MobileNavMenu from "./mobile-nav-menu";
import Image from "next/image";
import { ASSETS } from "@/constants/assets";

export function AppNavbar() {
  const scrolled = useScrollDetection(10);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 right-0 left-0 z-50 h-fit transition-all duration-300",
          scrolled
            ? "bg-white/80 shadow-sm backdrop-blur-md"
            : "border-b border-[#E5E7EB] bg-white",
        )}
      >
        <div className="mx-auto w-full max-w-screen-2xl px-4 lg:px-6 lg:py-4 xl:py-0">
          <div className="flex h-16 w-full items-center justify-between gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="inline-flex lg:hidden"
            >
              <Icons.menu size={30} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="ml-14 flex flex-none shrink-0 items-center gap-2 lg:ml-0"
            >
              <Image
                src={ASSETS.LOGO_DARK}
                alt="Swappr logo"
                width={120}
                height={40}
                priority
                className="h-auto w-auto cursor-pointer"
              />
            </Link>

            {/* nav links - desktop only */}
            <NavigationLinks />

            {/* Right icons */}
            <NavActionButtons />
          </div>
        </div>

        {/* Mobile nav menu */}
        <MobileNavMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16 md:h-16" />
    </>
  );
}
