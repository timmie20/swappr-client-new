"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FooterSectionProps {
  className?: string;
}

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const socials = [
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export function FooterSection({ className }: FooterSectionProps) {
  return (
    <footer
      aria-label="Site footer"
      className={cn(
        "bg-tertiary border-t border-white/10 px-6 py-12 text-white lg:px-8",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:items-start"
        >
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Image
              src="/assets/images/logo.png"
              alt="Swapp-logor"
              width={120}
              height={40}
              priority
            />
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              Nigeria&apos;s trusted platform for tech gadget trade-ins and
              purchases.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-white/40 uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="focus-visible:ring-offset-tertiary text-sm text-white/60 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-white/40 uppercase">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
                >
                  <Icon size={16} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#6B7280]">
            © {new Date().getFullYear()} Swappr Technologies Ltd · All rights
            reserved
          </p>
          <p className="text-xs text-white/35">Vendor Program — Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
