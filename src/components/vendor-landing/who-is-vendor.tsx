"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Building2, Smartphone, MapPin, BadgeCheck, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Lottie } from "../lottie";
import deliveryManAnimation from "@/lottie/Delivery Man.json";

interface WhoIsVendorProps {
  className?: string;
}

const eligibilityCriteria = [
  {
    icon: BadgeCheck,
    title: "CAC Registered Business",
    description:
      "Your business must be duly registered with the Corporate Affairs Commission (CAC).",
  },
  {
    icon: Smartphone,
    title: "Tech Gadgets Only",
    description:
      "Sell smartphones, tablets, accessories, and other tech products no other product categories.",
  },
  {
    icon: MapPin,
    title: "Based in Nigeria",
    description:
      "All vendor partners must operate within Nigeria to ensure reliable service and compliance.",
  },
  {
    icon: Store,
    title: "Physical Store or Verified Address",
    description:
      "You must have a physical store or a verifiable and stable business address.",
  },
  {
    icon: Building2,
    title: "Legitimate Business Operations",
    description:
      "Your store must have a track record of ethical trading and customer service.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export function WhoIsVendor({ className }: WhoIsVendorProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="who-is-vendor"
      ref={sectionRef}
      aria-labelledby="who-heading"
      className={cn("bg-gray-light px-6 py-20 lg:px-8 lg:py-28", className)}
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
            Vendor Eligibility
          </span>
          <h2
            id="who-heading"
            className="text-tertiary mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Who Can Become a Vendor?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
            Individuals with verified tech businesses across Nigeria.
            Here&apos;s what you need to qualify and get started on the
            platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Criteria grid */}
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            aria-label="Vendor eligibility criteria"
          >
            {eligibilityCriteria.map((item) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.title}
                  variants={itemVariants}
                  className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <span className="text-app-primary flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-tertiary text-sm font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
            className="overflow-hidden"
          >
            {/* TODO: Replace with actual vendor/store photo */}

            <Lottie
              animationData={deliveryManAnimation}
              autoplay
              loop
              className="size-96"
            />

            <p className="mt-4 text-center text-xs text-gray-400">
              A vendor&apos;s store featured on Swappr
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
