"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface HeroSectionProps {
  className?: string;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay },
  }),
};

const VENDOR_APP_URL = process.env.NEXT_PUBLIC_VENDOR_APP_URL;

export function HeroSection({ className }: HeroSectionProps) {
  const router = useRouter();

  function handleCTA() {
    router.push("/vendor/apply");
  }

  function handleLearnMore() {
    const el = document.getElementById("who-is-vendor");
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      aria-label="Hero"
      className={cn(
        "bg-tertiary relative overflow-hidden text-white",
        className,
      )}
    >
      {/* Subtle radial gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-10%,rgba(59,130,253,0.18),transparent)]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        {/* Left column — text */}
        <div className="flex flex-col gap-6">
          <motion.span
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-blue-400 backdrop-blur-sm"
          >
            <span className="size-2.5 animate-pulse rounded-full bg-green-600"></span>
            Now accepting vendor applications
          </motion.span>

          <motion.h1
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Grow Your Tech <br />
            <span className="text-primary">Store Nationwide</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Join Swappr as a verified vendor and connect with thousands of
            active buyers looking to trade in and purchase quality tech gadgets
            all from one trusted platform.
          </motion.p>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              onClick={handleCTA}
              className="group bg-app-primary hover:bg-app-primary/90 h-12 gap-2 rounded-full px-8 text-base font-semibold text-white"
              aria-label="Become a vendor — sign in or apply"
            >
              Become a Vendor
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={handleLearnMore}
              className="h-12 gap-2 rounded-full border border-white/20 bg-transparent px-8 text-base font-medium text-white hover:bg-white/10 hover:text-white"
              aria-label="Learn more about the vendor program"
            >
              Learn More
              <ChevronDown size={18} />
            </Button>
          </motion.div>

          <motion.a
            href={VENDOR_APP_URL}
            target="_blank"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            custom={0.35}
            className="w-fit text-sm text-white/50 underline-offset-4 hover:text-white/80 hover:underline focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
            aria-label="Sign in to your vendor dashboard"
          >
            Already a vendor? Sign in to your dashboard
          </motion.a>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="flex items-center gap-6 border-t border-white/10 pt-6 text-sm text-white/50"
          >
            <span>✅ No listing fees</span>
            <span>✅ Instant approval</span>
            <span>✅ Nigeria-wide reach</span>
          </motion.div>
        </div>

        {/* Right column — image placeholder */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={0.15}
          className="flex items-center justify-center"
        >
          {/* TODO: Replace with actual hero image */}
          <div className="relative w-full max-w-lg">
            <div
              className="relative min-h-70 w-full overflow-hidden rounded-md border border-white/10 bg-white/5 backdrop-blur-sm sm:min-h-85 lg:min-h-120 lg:rounded-2xl"
              style={{ aspectRatio: "4/3" }}
              aria-label="Hero image placeholder"
            >
              <Image
                src="/assets/images/Hero.jpeg"
                alt="Hero image of floating gadgets"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* <span className="text-sm font-medium text-white/30">
                Image Placeholder
              </span> */}
            </div>
            {/* Floating stat cards */}
            {/* <div className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-[#0e2233] px-4 py-3 shadow-xl">
              <p className="text-xs text-white/50">Active Buyers</p>
              <p className="text-xl font-bold text-white">10,000+</p>
            </div>
            <div className="absolute -top-10 -right-4 rounded-xl border border-white/10 bg-[#0e2233] px-4 py-3 shadow-xl lg:top-50">
              <p className="text-xs text-white/50">Avg. Approval</p>
              <p className="text-xl font-bold text-white">48hrs</p>
            </div> */}
          </div>
        </motion.div>
      </div>

      {/* Bottom wave divider */}
      <div aria-hidden className="pointer-events-none">
        <svg
          className="w-full"
          viewBox="0 0 1440 56"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 56L1440 56L1440 0C1440 0 1080 56 720 56C360 56 0 0 0 0L0 56Z"
            fill="#f8f9fb"
          />
        </svg>
      </div>
    </section>
  );
}
