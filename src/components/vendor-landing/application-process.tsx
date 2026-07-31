"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { UserPlus, FileText, ClipboardCheck, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplicationProcessProps {
  className?: string;
}

interface Step {
  step: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    step: 1,
    icon: UserPlus,
    title: "Sign Up or Sign In",
    description:
      "Create your Swappr account or sign in to your existing one. It takes less than a minute.",
  },
  {
    step: 2,
    icon: ClipboardCheck,
    title: "Verification",
    description:
      "A verification mail will be sent to your email. Click the link to verify your account and gain access to the vendor dashboard.",
  },
  {
    step: 3,
    icon: ClipboardCheck,
    title: "Go through Onboarding",
    description:
      "Complete the onboarding process by providing your business and identity details, provide details about your store locations and operation system.",
  },
  {
    step: 4,
    icon: ShoppingBag,
    title: "Start Selling",
    description:
      "Once approved, access your vendor dashboard, list your products, and start reaching buyers across Nigeria.",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: EASE_OUT,
      delay: i * 0.15,
    },
  }),
};

export function ApplicationProcess({ className }: ApplicationProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-heading"
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
            Getting Started
          </span>
          <h2
            id="process-heading"
            className="text-tertiary mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            How to Get Started
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
            Our onboarding process is straightforward. From sign-up to your
            first listing — here&apos;s how it works.
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl">
          {/* Steps */}
          <ol className="flex flex-col gap-0" aria-label="Application steps">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              return (
                <motion.li
                  key={step.step}
                  custom={i}
                  variants={stepVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="relative flex gap-5"
                >
                  {/* Connector line */}
                  {!isLast && (
                    <div
                      aria-hidden
                      className="absolute top-12 left-5 h-[calc(100%-12px)] w-px bg-gray-200"
                    />
                  )}

                  {/* Icon badge */}
                  <div className="bg-app-primary relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md">
                    <Icon size={18} aria-hidden />
                  </div>

                  {/* Content */}
                  <div className={cn("flex-1 pb-10", isLast && "pb-0")}>
                    <div className="flex items-center gap-2">
                      <span className="text-app-primary text-xs font-semibold tracking-wider uppercase">
                        Step {step.step}
                      </span>
                    </div>
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
      </div>
    </section>
  );
}
