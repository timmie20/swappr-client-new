"use client";

import { motion } from "motion/react";
import { ShieldCheck, LayoutGrid, ReceiptText } from "lucide-react";
import { PageHero } from "@/components/content/page-hero";

const problems = [
  {
    icon: ShieldCheck,
    title: "No verification",
    description:
      "Anyone can claim to be selling anything in a DM. Swappr requires vendors to verify their business and identity before they can list a single product.",
  },
  {
    icon: LayoutGrid,
    title: "No structure",
    description:
      "Comparing devices across scattered posts and stalls is slow and unreliable. Swappr gives every listing the same structured format: condition, price, specs, photos.",
  },
  {
    icon: ReceiptText,
    title: "No accountability",
    description:
      "Informal resale has no paper trail. Swappr gives every purchase an order record.",
  },
];

export function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Swappr"
        title="About Swappr"
        supportingHeadline="A marketplace for pre-owned tech, built on verification instead of guesswork."
        intro="Swappr connects buyers with verified vendors selling pre-owned phones, laptops, and accessories — starting in markets like Computer Village, Lagos."
        ctas={[
          { label: "Browse listings", href: "/" },
          { label: "Become a vendor", href: "/vendor", variant: "secondary" },
        ]}
      />

      {/* What is Swappr / Why it exists */}
      <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <span className="text-app-primary inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium">
              What is Swappr
            </span>
            <p className="text-tertiary mt-4 text-base leading-relaxed">
              Swappr is a marketplace for buying pre-owned phones, laptops,
              and accessories from verified vendors — starting in markets
              like Computer Village, Lagos, where most of Nigeria&apos;s
              device resale already happens, just without any structure
              around it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <span className="text-app-primary inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium">
              Why Swappr exists
            </span>
            <p className="text-tertiary mt-4 text-base leading-relaxed">
              Buying a used phone in Nigeria today usually means a DM, a
              WhatsApp group, or a walk through a market stall — with no
              listing history, no verified identity behind the seller, and no
              way to compare options before you commit. Swappr exists to put
              structure around that trade: real vendor verification, real
              listings, and a real order flow, without losing the market
              itself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What problems we solve */}
      <section className="bg-gray-light px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="mb-14 text-center"
          >
            <span className="text-app-primary inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium">
              What we solve
            </span>
            <h2 className="text-tertiary mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              What problems we solve
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {problems.map((problem, i) => {
              const Icon = problem.icon;
              return (
                <motion.article
                  key={problem.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <span className="text-app-primary flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <Icon size={22} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-tertiary text-base font-semibold">
                      {problem.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                      {problem.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What makes Swappr different */}
      <section className="bg-tertiary px-6 py-20 text-white lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-blue-400">
            What makes us different
          </span>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Every vendor on Swappr goes through identity and business
            verification before they can sell — not after a complaint, not
            optionally, up front. Combined with structured listings and a
            real order history, Swappr turns a market that ran entirely on
            trust-your-gut into one with an actual trust layer underneath it.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
