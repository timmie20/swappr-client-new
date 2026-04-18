"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { useScrollDetection } from "@/hooks/use-scroll-detection";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Icons } from "../../icons";
import { SearchDialog } from "../../search-dialog";
import NavActionButtons from "./action-buttons";
import { NavigationLinks } from "../nav-items";

export function AppNavbar() {
  const scrolled = useScrollDetection(10);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

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
            {/* mobile menu button */}
            <Icons.menu size={30} className="block lg:hidden" />

            {/* Logo */}
            <Link
              href="/"
              className="ml-14 flex flex-none shrink-0 items-center gap-2 lg:ml-0"
            >
              <Image
                src="/assets/logos/logo-dark.png"
                alt="Swapp-logo"
                width={120}
                height={40}
                priority
              />
            </Link>

            {/* nav links - desktop only */}
            <NavigationLinks />

            {/* Right icons */}
            <NavActionButtons setOpen={setOpen} />
          </div>
        </div>

        {/* Mobile nav menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[#E5E7EB] bg-white sm:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                <Link
                  href="/auth/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-[#1A1A1A] hover:bg-[#F8F9FA]"
                >
                  <Icons.user size={18} />
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 items-center gap-2 rounded-lg bg-[#1A6B5A] px-3 text-sm font-medium text-white"
                >
                  Create Account
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16 md:h-16" />

      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
