"use client";

import { motion } from "motion/react";
import { Mail, Store } from "lucide-react";
import { PageHero } from "@/components/content/page-hero";

const channels = [
  {
    icon: Store,
    title: "Issue with a specific order?",
    description:
      "The vendor's email and phone number are in your order details — that's usually the fastest route to get it sorted.",
  },
  {
    icon: Mail,
    title: "Everything else",
    description:
      "For disputes, mediation, or anything support-related, reach Swappr directly at support@swappr.com.ng.",
  },
];

export function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        supportingHeadline="Questions about an order or a listing? We're here to help."
        intro="For issues with a specific order, the vendor's email and phone number are in your order details. For disputes, mediation, or anything support-related, reach Swappr directly."
        ctas={[{ label: "Email support@swappr.com.ng", href: "mailto:support@swappr.com.ng" }]}
      />

      <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {channels.map((channel, i) => {
            const Icon = channel.icon;
            return (
              <motion.article
                key={channel.title}
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
                    {channel.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                    {channel.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
