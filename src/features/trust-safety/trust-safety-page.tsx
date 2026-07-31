"use client";

import { motion } from "motion/react";
import { BadgeCheck, Lock, RotateCcw, LifeBuoy } from "lucide-react";
import { PageHero } from "@/components/content/page-hero";

const pillars = [
  {
    icon: BadgeCheck,
    title: "Vendors are verified before they can sell",
    points: [
      "Every vendor must complete business registration (CAC) and identity verification before they can list a product this isn't optional and there's no tiered exception.",
      "Verification happens before approval, not after a complaint.",
    ],
  },
  {
    icon: Lock,
    title: "Payments and data are handled securely",
    points: [
      "Payments are processed through Paystack, a licensed payment processor, Swappr doesn't handle your card data directly.",
      "All data collected from the point of account creation is stored securely with Swappr.",
    ],
  },
  {
    icon: RotateCcw,
    title: "Cancellations are straightforward",
    points: [
      "You can cancel any unpaid order at any time, for any reason. Once an order is paid and confirmed by the vendor, you can no longer cancel it directly.",
      "A vendor may still cancel a paid order at their own discretion. When that happens, you'll see the reason in your order details and by email, and Swappr follows up about a full refund.",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Real support when something's wrong",
    points: [
      "Reach Swappr support directly at support@swappr.com.ng for order disputes or delivery issues, and for mediation if a device doesn't match its listing.",
      "The vendor's email and/or store phone number is included in every order's details, so you can reach them directly too.",
    ],
  },
];

export function TrustSafetyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Trust & Safety"
        title="How we keep Swappr trustworthy"
        supportingHeadline="Verified vendors, structured listings — here's what that means for you."
        intro="Every vendor on Swappr is verified before they can sell. If a vendor cancels a paid order, we follow up about a full refund. And if something's not right with your order including a device that doesn't match its listing our team is there to help mediate."
        ctas={[
          {
            label: "Email support@swappr.com.ng",
            href: "mailto:support@swappr.com.ng",
          },
        ]}
      />

      <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <span className="text-app-primary flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <Icon size={22} aria-hidden />
                </span>
                <div>
                  <h3 className="text-tertiary text-base font-semibold">
                    {pillar.title}
                  </h3>
                  <ul className="mt-2 flex flex-col gap-2">
                    {pillar.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm leading-relaxed text-gray-500"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
