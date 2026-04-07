"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FaqSectionProps {
  className?: string;
}

const faqs = [
  {
    id: "faq-1",
    question: "What documents do I need to apply?",
    answer:
      "You'll need your CAC (Corporate Affairs Commission) certificate, a valid government-issued ID (e.g., NIN slip, international passport, or driver's license), proof of your business address (utility bill or lease agreement), and clear photos of your store or business premises.",
  },
  {
    id: "faq-2",
    question: "How long does approval take?",
    answer:
      "Our vendor review team processes applications within 48 hours of submission. You'll receive an email notification with the outcome. If additional information is needed, we'll reach out to you directly.",
  },
  {
    id: "faq-3",
    question: "Are there any fees to join?",
    answer:
      "There are absolutely no listing fees or monthly charges. Swappr only earns a 7% commission on successfully completed sales. If a transaction doesn't complete, you pay nothing.",
  },
  {
    id: "faq-4",
    question: "What products can I sell?",
    answer:
      "Swappr is strictly for tech gadgets. Approved product categories include smartphones, tablets, laptops, smartwatches, earphones, chargers, phone accessories, and other related electronics. Non-tech products will be removed.",
  },
  {
    id: "faq-5",
    question: "How do I receive payments?",
    answer:
      "All payments go through Swappr's secure escrow system. When a buyer places an order, funds are held safely in escrow. Once the buyer confirms receipt and satisfaction, funds are released directly to your verified bank account within 24 hours.",
  },
  {
    id: "faq-6",
    question: "Can I sell nationwide?",
    answer:
      "Yes! Once approved, your listings are visible to buyers across all states in Nigeria. You'll handle shipping arrangements, and Swappr will connect you with verified logistics partners to simplify delivery.",
  },
  {
    id: "faq-7",
    question: "What if I'm not approved?",
    answer:
      "If your application is unsuccessful, you'll receive an email explaining which requirements weren't met. You're welcome to address those concerns and reapply. Our team is always happy to guide you on what's needed.",
  },
];

export function FaqSection({ className }: FaqSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="faq-heading"
      className={cn("bg-gray-light px-6 py-20 lg:px-8 lg:py-28", className)}
    >
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mb-14 text-center"
        >
          <span className="text-app-primary inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium">
            FAQs
          </span>
          <h2
            id="faq-heading"
            className="text-tertiary mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-gray-500">
            Have questions? We&apos;ve got answers. If you don&apos;t find what
            you&apos;re looking for, feel free to reach out to us.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            delay: 0.15,
          }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-tertiary text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-gray-500">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
