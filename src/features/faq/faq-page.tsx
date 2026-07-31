"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/content/page-hero";
import { FAQ_CATEGORIES } from "./faq-data";

export function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        supportingHeadline="Have questions? We've got answers."
        intro="Browse by topic below, or reach out to support@swappr.com.ng if you can't find what you're looking for."
      />

      <section className="bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Jump links */}
          <nav
            aria-label="FAQ categories"
            className="mb-14 flex flex-wrap justify-center gap-2"
          >
            {FAQ_CATEGORIES.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="text-app-primary rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-blue-100"
              >
                {category.title}
              </a>
            ))}
          </nav>

          {/* Categories */}
          <div className="flex flex-col gap-16">
            {FAQ_CATEGORIES.map((category) => (
              <motion.div
                key={category.id}
                id={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="scroll-mt-24"
              >
                <h2 className="text-tertiary mb-4 text-2xl font-bold tracking-tight">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-tertiary text-left text-base font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-500">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
