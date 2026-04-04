import Link from "next/link";
import Image from "next/image";
import { Icons } from "../icons";

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
    { label: "How Swapping Works", path: "#" },
    { label: "Swap Offers", path: "#" },
    { label: "Condition Guide", path: "#" },
    { label: "Valuation", path: "#" },
  ],
  Support: [
    { label: "FAQ", path: "#" },
    { label: "Contact Us", path: "#" },
    { label: "Returns Policy", path: "#" },
    { label: "Warranty Claims", path: "#" },
    { label: "Seller Guide", path: "#" },
  ],
  Company: [
    { label: "About Us", path: "#" },
    { label: "Blog", path: "#" },
    { label: "Careers", path: "#" },
    { label: "Press", path: "#" },
    { label: "Privacy Policy", path: "#" },
    { label: "Terms of Service", path: "#" },
  ],
};

export function FeedFooter() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#1A1A1A] text-white">
      {/* E-waste banner */}
      {/* <div className="to-swappr-teal-light bg-linear-to-r from-[#1A6B5A] px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-1 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-bold text-white">
              ♻️ 1,500,000+ kg of e-waste saved through swapping
            </p>
            <p className="text-xs text-white/75">
              Every swap prevents a device from landfill — thanks for being part
              of the movement.
            </p>
          </div>
          <Link
            href="#"
            className="mt-2 shrink-0 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 sm:mt-0"
          >
            Learn More →
          </Link>
        </div>
      </div> */}

      <div className="mx-auto max-w-screen-2xl px-4 py-12 lg:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-5">
          {/* Brand col */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/images/logo.png"
                alt="Swapp-logor"
                width={120}
                height={40}
                priority
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
