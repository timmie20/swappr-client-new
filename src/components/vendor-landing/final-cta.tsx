"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FinalCtaProps {
  className?: string;
}

export function FinalCta({ className }: FinalCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const router = useRouter();

  function handleApply() {
    router.push("/vendor/apply");
  }

  function handleSignIn() {
    router.push("/sign-in");
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cta-heading"
      className={cn(
        "bg-tertiary relative overflow-hidden px-6 py-24 text-white lg:px-8 lg:py-32",
        className,
      )}
    >
      {/* Background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_120%,rgba(59,130,253,0.25),transparent)]"
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Text + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="flex flex-col gap-6"
        >
          <h2
            id="cta-heading"
            className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl"
          >
            Ready to Grow <br />
            <span className="text-app-primary">Your Business?</span>
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
            Join hundreds of verified tech vendors already using Swappr to reach
            more buyers, close more sales, and build a stronger brand — all from
            one platform.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              onClick={handleApply}
              className="group bg-app-primary hover:bg-app-primary/90 h-12 gap-2 rounded-full px-8 text-base font-semibold text-white"
              aria-label="Apply to become a vendor"
            >
              Apply Now
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </div>

          <button
            onClick={handleSignIn}
            className="w-fit text-sm text-white/50 underline-offset-4 hover:text-white/80 hover:underline focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
            aria-label="Sign in to an existing account"
          >
            Already have an account? Sign in
          </button>
        </motion.div>

        {/* Image placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : undefined}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            delay: 0.15,
          }}
          className="flex items-center justify-center"
        >
          {/* TODO: Replace with actual success/handshake illustration */}
          <div
            className="flex aspect-4/3 w-full max-w-md items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            aria-label="Success illustration placeholder"
          >
            <span className="text-sm font-medium text-white/30">
              Image Placeholder
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
