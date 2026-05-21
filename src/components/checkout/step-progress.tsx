"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
}

const STEPS: Step[] = [
  { number: 1, label: "Delivery & Contact" },
  { number: 2, label: "Payment" },
];

export function CheckoutProgressIndicator({
  currentStep,
  className,
}: {
  currentStep: number;
  className?: string;
}) {
  const clampedStep = Math.min(Math.max(currentStep, 1), 2);

  return (
    <div
      className={cn("flex items-center gap-0", className)}
      role="progressbar"
      aria-valuenow={clampedStep}
      aria-valuemin={1}
      aria-valuemax={2}
      aria-label={`Step ${clampedStep} of 2`}
    >
      {STEPS.map((step, idx) => {
        const isComplete = clampedStep > step.number;
        const isActive = clampedStep === step.number;
        const isLast = idx === STEPS.length - 1;

        return (
          <div key={step.number} className="flex flex-1 items-center gap-0">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  backgroundColor: isComplete
                    ? "var(--primary)"
                    : isActive
                      ? "var(--background)"
                      : "var(--muted)",
                  borderColor:
                    isComplete || isActive ? "var(--primary)" : "var(--border)",
                }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                  isComplete && "text-primary-foreground",
                  isActive && "text-foreground",
                  !isComplete && !isActive && "text-muted-foreground",
                )}
              >
                {isComplete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </motion.div>
                ) : (
                  step.number
                )}
              </motion.div>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div className="bg-muted relative mx-1 h-0.5 flex-1 overflow-hidden rounded-full">
                <motion.div
                  className="bg-primary absolute inset-y-0 left-0"
                  animate={{ width: isComplete ? "100%" : "0%" }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
