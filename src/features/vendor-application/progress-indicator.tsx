"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
}

const STEPS: Step[] = [
  { number: 1, label: "Requirements" },
  { number: 2, label: "Business Info" },
  { number: 3, label: "Documents" },
];

interface ProgressIndicatorProps {
  currentStep: number; // 1–3 (step 4 = success, passes 3)
  className?: string;
}

export function ProgressIndicator({
  currentStep,
  className,
}: ProgressIndicatorProps) {
  const clampedStep = Math.min(currentStep, 3);

  return (
    <div
      className={cn("flex items-center gap-0", className)}
      role="progressbar"
      aria-valuenow={clampedStep}
      aria-valuemin={1}
      aria-valuemax={3}
      aria-label={`Step ${clampedStep} of 3`}
    >
      {STEPS.map((step, i) => {
        const isComplete = clampedStep > step.number;
        const isActive = clampedStep === step.number;
        const isLast = i === STEPS.length - 1;

        return (
          <div key={step.number} className="flex flex-1 items-center gap-0">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  backgroundColor: isComplete
                    ? "#3b82f6"
                    : isActive
                      ? ""
                      : "#e5e7eb",
                  borderColor: isComplete || isActive ? "#3b82f6" : "#e5e7eb",
                }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                  isComplete && "text-white",
                  isActive && " ",
                  !isComplete && !isActive && "text-gray-400",
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
                  isActive ? "text-tertiary" : "text-gray-400",
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="relative mx-1 h-0.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-blue-500"
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
