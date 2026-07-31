"use client";

import { motion } from "motion/react";
import {
  Search,
  MessageSquarePlus,
  ClipboardCheck,
  PackageCheck,
} from "lucide-react";
import { PageHero } from "@/components/content/page-hero";

const steps = [
  {
    icon: Search,
    title: "Find a swap-eligible listing",
    description: "Look for listings a vendor has marked as open to swaps.",
  },
  {
    icon: MessageSquarePlus,
    title: "Submit a swap request",
    description: "Describe the device you're offering in exchange.",
  },
  {
    icon: ClipboardCheck,
    title: "The vendor responds",
    description: "They can accept, reject, or counter your request.",
  },
  {
    icon: PackageCheck,
    title: "The exchange proceeds",
    description:
      "If accepted, it moves forward like a standard order — from confirmation through delivery or pickup.",
  },
];

export function SwapPage() {
  return (
    <main>
      <PageHero
        eyebrow="Swap"
        title="Trade in what you have"
        supportingHeadline="Swap your device for something better, directly with the vendor."
        intro="Some listings let you offer your own device plus cash, if needed instead of paying full price."
        ctas={[{ label: "See swap-eligible listings", href: "/" }]}
      />

      <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="mb-14 text-center"
          >
            <span className="text-app-primary inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium">
              How a swap works
            </span>
            <h2 className="text-tertiary mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From request to exchange
            </h2>
          </motion.div>

          <ol className="flex flex-col gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative flex gap-5"
                >
                  {!isLast && (
                    <div
                      aria-hidden
                      className="absolute top-12 left-5 h-[calc(100%-12px)] w-px bg-gray-200"
                    />
                  )}
                  <div className="bg-app-primary relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md">
                    <Icon size={18} aria-hidden />
                  </div>
                  <div className={`flex-1 pb-10 ${isLast ? "pb-0" : ""}`}>
                    <span className="text-app-primary text-xs font-semibold tracking-wider uppercase">
                      Step {i + 1}
                    </span>
                    <h3 className="text-tertiary mt-0.5 text-base font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-gray-light px-6 py-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm leading-relaxed text-gray-500">
            If a vendor rejects your swap request, you can adjust your offer or
            choose to buy the listing outright instead.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
