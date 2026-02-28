"use client";

import { motion } from "motion/react";
import { UseFormReturn } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/forms/form-input";
import { ApplicationFormData, STEP_3_FIELDS } from "./types";

interface StepAccountDetailsProps {
  form: UseFormReturn<ApplicationFormData>;
  onNext: () => Promise<void>;
  onBack: () => void;
  direction: number;
  isSubmitting: boolean;
}

export function StepAccountDetails({
  form,
  onNext,
  onBack,
  direction,
  isSubmitting,
}: StepAccountDetailsProps) {
  const { trigger } = form;

  const handleNext = async () => {
    const valid = await trigger([...STEP_3_FIELDS]);
    if (valid) await onNext();
  };

  const slideVariants = {
    enter: { opacity: 0, x: direction > 0 ? 60 : -60 },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      x: direction > 0 ? -60 : 60,
      transition: {
        duration: 0.22,
        ease: [0.36, 0, 0.66, 0] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900">
            Create your account
          </CardTitle>
          <p className="text-sm text-gray-500">
            You&apos;ll use these credentials to log in to your vendor account.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <FieldGroup>
            {/* Name row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormInput
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="John"
                required
              />
              <FormInput
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                required
              />
            </div>

            <FormInput
              control={form.control}
              name="email"
              type="email"
              label="Email Address"
              placeholder="vendor@example.com"
              required
            />

            <FormInput
              control={form.control}
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              showPasswordToggle
              required
            />

            <FormInput
              control={form.control}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              showPasswordToggle
              required
            />
          </FieldGroup>

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              className="flex-1 gap-2 rounded-full"
              disabled={isSubmitting}
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={handleNext}
              className="flex-1 gap-2 rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting…" : "Submit Application"}
              {!isSubmitting && <ArrowRight size={16} />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
