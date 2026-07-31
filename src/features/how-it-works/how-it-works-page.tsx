"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Search, ShoppingBag, CreditCard, CheckCircle2, Truck, PackageCheck } from "lucide-react";
import { PageHero } from "@/components/content/page-hero";
import { Button } from "@/components/ui/button";

const buyingSteps = [
  {
    icon: Search,
    title: "Browse or search",
    description:
      "Categories are organized across 15+ device and accessory categories, and search is typo-tolerant — a slightly misspelled model name still finds the right listing.",
  },
  {
    icon: ShoppingBag,
    title: "Select a listing",
    description:
      "See vendor, condition, price, and specs in a structured format.",
  },
  {
    icon: CreditCard,
    title: "Checkout",
    description: "Pay by card, bank transfer, or USSD.",
  },
  {
    icon: CheckCircle2,
    title: "Confirmation",
    description:
      "The order is created and you get confirmation of what happens next.",
  },
  {
    icon: Truck,
    title: "Delivery or pickup",
    description:
      "The vendor arranges either delivery or pickup and provides tracking or a pickup code directly.",
  },
  {
    icon: PackageCheck,
    title: "Receiving",
    description: "You receive the device and the order is marked complete.",
  },
];

export function HowItWorksPage() {
  return (
    <main>
      <PageHero
        eyebrow="How it works"
        title="How Swappr works"
        supportingHeadline="Buy directly, or swap your device for something new."
        intro="Every vendor on Swappr is verified before they can sell. Here's what happens from browsing to delivery."
        ctas={[{ label: "Start browsing", href: "/" }]}
      />

      {/* Buying steps */}
      <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="mb-14 text-center"
          >
            <span className="text-app-primary inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium">
              Buying
            </span>
            <h2 className="text-tertiary mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From browsing to your doorstep
            </h2>
          </motion.div>

          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {buyingSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-app-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white">
                      <Icon size={16} aria-hidden />
                    </span>
                    <span className="text-app-primary text-xs font-semibold tracking-wider uppercase">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="text-tertiary text-base font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {step.description}
                  </p>
                </motion.li>
              );
            })}
          </ol>

          <p className="mt-6 text-center text-sm text-gray-400">
            Delivery details, including timeframes and fees, are provided by
            the vendor at checkout.
          </p>
        </div>
      </section>

      {/* Swapping overview */}
      <section className="bg-tertiary px-6 py-20 text-white lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-blue-400">
            Swapping
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Or trade what you have instead
          </h2>
          <p className="text-base leading-relaxed text-white/70">
            Swapping means offering your own device — sometimes with a cash
            top-up — in exchange for a vendor&apos;s listing, rather than
            paying the full price outright. It happens directly through a
            vendor&apos;s listing, not as a separate flow.
          </p>
          <Button
            asChild
            size="lg"
            className="group bg-app-primary hover:bg-app-primary/90 mt-2 h-12 gap-2 rounded-full px-8 text-base font-semibold text-white"
          >
            <Link href="/swap">
              See how swapping works
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
