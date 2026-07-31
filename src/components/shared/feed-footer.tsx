import Link from "next/link";
import { Icons } from "../icons";
import Image from "next/image";
import { ASSETS } from "@/constants/assets";

const FOOTER_LINKS = {
  Marketplace: [
    { label: "All Listings", path: "#" },
    { label: "iPhone", path: "#" },
    { label: "Android", path: "#" },
    { label: "MacBook", path: "#" },
    { label: "iPad", path: "#" },
    { label: "Watches", path: "#" },
    { label: "Audio", path: "#" },
  ],
  Swappr: [
    {
      label: "Become a vendor",
      path: "/vendor",
    },
    { label: "Valuation", path: "/check-worth" },
    { label: "How Swappr Works", path: "/how-it-works" },
    { label: "Swap Offers", path: "/swap" },
    { label: "Condition Guide", path: "#" },
  ],
  Support: [
    { label: "FAQ", path: "/faq" },
    { label: "Contact Us", path: "/contact" },
    { label: "Trust & Safety", path: "/trust-safety" },
    { label: "Returns Policy", path: "#" },
    { label: "Warranty Claims", path: "#" },
    { label: "Seller Guide", path: "#" },
  ],
  Company: [
    { label: "About Us", path: "/about" },
    // { label: "Blog", path: "#" },
    // { label: "Careers", path: "#" },
    // { label: "Press", path: "#" },
    { label: "Privacy Policy", path: "#" },
    { label: "Terms of Service", path: "#" },
  ],
};

export function FeedFooter() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#1A1A1A] text-white">
      <div className="mx-auto max-w-screen-2xl px-4 py-12 lg:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-5">
          {/* Brand col */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={ASSETS.LOGO_LIGHT}
                alt="Swappr logo"
                width={120}
                height={40}
                className="h-auto w-auto cursor-pointer"
              />
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-[#9CA3AF]">
              Nigeria&apos;s first peer-to-peer device marketplace. Buy, sell,
              and swap premium pre-owned tech — all prices in NGN.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {[
                { icon: <Icons.instagram size={18} />, href: "#" },
                { icon: <Icons.x size={18} />, href: "#" },
                { icon: <Icons.tiktok size={18} />, href: "#" },
                { icon: <Icons.whatsapp size={18} />, href: "#" },
                { icon: <Icons.linkedin size={18} />, href: "#" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border border-[#3A3A3A] text-[#9CA3AF] transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 text-xs font-bold tracking-widest text-[#6B7280] uppercase">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label} className="text-sm">
                    <Link
                      href={link.path}
                      className="text-sm text-[#9CA3AF] transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#2D2D2D] pt-8 sm:flex-row">
          <p className="text-xs text-[#6B7280]">
            © {new Date().getFullYear()} Swappr Technologies Limited · All
            rights reserved
          </p>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#3A3A3A] px-2 py-0.5 text-[10px] text-[#6B7280]">
              🇳🇬 NGN
            </span>
            <span className="rounded-full border border-[#3A3A3A] px-2 py-0.5 text-[10px] text-[#6B7280]">
              EN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
