"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { BadgeDollarSign, Users, ShieldCheck, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BenefitsSectionProps {
  className?: string;
}

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  accent: string;
  bg: string;
}

const benefits: Benefit[] = [
  {
    icon: BadgeDollarSign,
    title: "Zero Listing Fees",
    description:
      "List unlimited products at absolutely no cost. Pay only a small 7% commission on completed sales.",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Users,
    title: "Access to Active Buyers",
    description:
      "Reach 10,000+ verified buyers across Nigeria who are actively searching for quality tech devices.",
    accent: "text-app-primary",
    bg: "bg-blue-50",
  },
  {
    icon: ShieldCheck,
    title: "Verified Buyer Protection",
    description:
      "Every transaction is verified and monitored by our team, protecting you from fraudulent orders.",
    accent: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Globe,
    title: "Nationwide Reach",
    description:
      "Sell to customers from Lagos to Abuja and beyond — all from a single platform without logistics headaches.",
    accent: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description:
      "Our transparent escrow system holds funds safely until both parties confirm a successful trade.",
    accent: "text-teal-600",
    bg: "bg-teal-50",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export function BenefitsSection({ className }: BenefitsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="benefits-heading"
      className={cn("bg-white px-6 py-20 lg:px-8 lg:py-28", className)}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="mb-16 text-center"
        >
          <span className="text-app-primary inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium">
            Why Swappr?
          </span>
          <h2
            id="benefits-heading"
            className="text-tertiary mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Why Sell on Swappr?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
            We&apos;ve built a platform that genuinely works for vendors
            transparent fees, real buyers, and tools that help you grow.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Vendor benefits"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.article
                key={benefit.title}
                variants={cardVariants}
                role="listitem"
                className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                    benefit.bg,
                    benefit.accent,
                  )}
                >
                  <Icon size={22} aria-hidden />
                </span>
                <div>
                  <h3 className="text-tertiary text-base font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                    {benefit.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
