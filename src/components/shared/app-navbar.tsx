"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { useFeedStore } from "@/store/feed-store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { UserNav } from "../auth/user-nav";

export function AppNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useFeedStore((s) => s.cartCount)();
  const wishlistIds = useFeedStore((s) => s.wishlistIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 shadow-sm backdrop-blur-md"
            : "border-b border-[#E5E7EB] bg-white",
        )}
      >
        <div className="mx-auto w-full max-w-screen-2xl px-4 lg:px-6">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <Image
                src="/assets/logos/Frame 2.png"
                alt="Swapp-logor"
                width={120}
                height={40}
                priority
              />
            </Link>

            {/* Search bar — desktop */}
            {/* <div className="hidden max-w-xl flex-1 md:flex">
              <div className="relative w-full">
                <IconSearch
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-[#6B7280]"
                  size={18}
                />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search devices, brands, models…"
                  className="h-10 w-full rounded-full border border-[#E5E7EB] bg-[#F8F9FA] pr-4 pl-10 text-sm text-[#1A1A1A] placeholder-[#9CA3AF] transition-all outline-none focus:border-[#1A6B5A] focus:ring-2 focus:ring-[#1A6B5A]/20"
                />
              </div>
            </div> */}

            {/* Right icons */}
            <div className="ml-auto flex items-center gap-1">
              {/* Wishlist */}
              <Button
                className="relative cursor-pointer"
                size="icon-lg"
                variant="ghost"
              >
                <Icons.bookmark size={36} />
                {wishlistIds.size > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F4762A] text-[10px] font-bold text-white">
                    {wishlistIds.size}
                  </span>
                )}
              </Button>

              {/* Notifications */}
              <Button
                className="hidden cursor-pointer sm:flex"
                variant="ghost"
                size="icon-lg"
              >
                <Icons.bell size={20} />
              </Button>

              {/* Cart */}
              <Button
                className="relative cursor-pointer"
                variant="ghost"
                size="icon-lg"
              >
                <Icons.product size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key="cart-count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1A6B5A] text-[10px] font-bold text-white"
                    >
                      {cartCount > 9 ? "9+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              {/* User */}

              <UserNav />

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] transition-colors hover:bg-[#F8F9FA] sm:hidden"
              >
                {mobileMenuOpen ? (
                  <Icons.close size={20} />
                ) : (
                  <Icons.menu size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="flex pb-3 md:hidden">
            <div className="relative w-full">
              <Icons.search
                className="absolute top-1/2 left-3 -translate-y-1/2 text-[#6B7280]"
                size={18}
              />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search devices, brands, models…"
                className="h-10 w-full rounded-full border border-[#E5E7EB] bg-[#F8F9FA] pr-4 pl-10 text-sm text-[#1A1A1A] placeholder-[#9CA3AF] outline-none focus:border-[#1A6B5A] focus:ring-2 focus:ring-[#1A6B5A]/20"
              />
            </div>
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
    </>
  );
}
