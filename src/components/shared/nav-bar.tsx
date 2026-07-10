"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useScrollDetection } from "@/hooks/use-scroll-detection";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import NavActionButtons from "./nav/action-buttons";
import Logo from "./logo";

const NAV_LINKS = [
  { name: "Models", href: "/check-worth", icon: "phone" as const },
  { name: "Products Listings", href: "/", icon: "product" as const },
  { name: "How it Works", href: "/how-it-works", icon: "help" as const },
  { name: "Become a Vendor", href: "/vendor", icon: "store" as const },
];

export default function Navbar() {
  const scrolled = useScrollDetection(10);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 right-0 left-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/80 shadow-sm backdrop-blur-md"
            : "border-b border-[#E5E7EB] bg-white",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-4 xl:px-0">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#08161F] transition-colors hover:bg-[#F8F9FA] md:hidden"
              aria-label="Open menu"
            >
              <Icons.menu size={24} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="ml-14 flex flex-none shrink-0 items-center gap-2 lg:ml-0"
            >
              <Logo variant="dark" priority />
            </Link>

            <div className="hidden md:flex md:items-center md:gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-switzer relative text-sm font-medium transition-colors",
                    isActiveLink(link.href)
                      ? "text-primary after:bg-primary after:absolute after:right-0 after:bottom-[-4px] after:left-0 after:h-0.5"
                      : "text-muted-foreground hover:text-[#08161F]",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <NavActionButtons />
          </div>
        </div>
      </nav>

      {/* Mobile sidebar menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="fixed top-0 bottom-0 left-0 z-50 flex w-full flex-col bg-white shadow-2xl md:hidden"
            >
              {/* Sidebar header */}
              <div className="flex h-20 items-center justify-between border-b border-[#E5E7EB] px-4">
                <Logo variant="dark" priority />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#08161F] transition-colors hover:bg-[#F8F9FA]"
                  aria-label="Close menu"
                >
                  <Icons.close size={24} />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-col">
                {NAV_LINKS.map((link) => {
                  const IconComponent = Icons[link.icon];
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "font-switzer border-muted-foreground/50 flex items-center gap-3 border-b px-6 py-4 text-xl font-semibold transition-colors",
                        isActiveLink(link.href)
                          ? "bg-primary text-white"
                          : "text-[#08161F] hover:bg-[#F8F9FA]",
                      )}
                    >
                      <IconComponent size={24} />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Sign In button - pushed to bottom */}
              <Link
                href="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="font-switzer border-muted-foreground mt-auto flex items-center gap-3 border-t px-6 py-4 text-xl font-semibold text-[#08161F] transition-colors hover:bg-[#F8F9FA]"
              >
                <Icons.login size={24} />
                Sign In
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
