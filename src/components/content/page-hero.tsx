"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeroCta {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  supportingHeadline: string;
  intro: string;
  ctas?: PageHeroCta[];
  className?: string;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay },
  }),
};

export function PageHero({
  eyebrow,
  title,
  supportingHeadline,
  intro,
  ctas,
  className,
}: PageHeroProps) {
  return (
    <section
      aria-label={title}
      className={cn(
        "bg-tertiary relative overflow-hidden text-white",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-10%,rgba(59,130,253,0.18),transparent)]"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 py-20 text-center lg:px-8 lg:py-28">
        <motion.span
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-blue-400 backdrop-blur-sm"
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={0.18}
          className="text-app-primary text-base font-medium sm:text-lg"
        >
          {supportingHeadline}
        </motion.p>

        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={0.26}
          className="max-w-xl text-base leading-relaxed text-white/70"
        >
          {intro}
        </motion.p>

        {ctas && ctas.length > 0 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            custom={0.34}
            className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            {ctas.map((cta) => (
              <Button
                key={cta.label}
                asChild
                size="lg"
                variant={cta.variant === "secondary" ? "ghost" : "default"}
                className={cn(
                  "group h-12 gap-2 rounded-full px-8 text-base font-semibold",
                  cta.variant === "secondary"
                    ? "border border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    : "bg-app-primary hover:bg-app-primary/90 text-white",
                )}
              >
                <Link href={cta.href}>
                  {cta.label}
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            ))}
          </motion.div>
        )}
      </div>

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
