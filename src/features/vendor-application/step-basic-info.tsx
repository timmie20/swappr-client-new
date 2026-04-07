"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { UseFormReturn } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { FieldGroup } from "@/components/ui/field";

import { ApplicationFormData, NIGERIAN_STATES, STEP_2_FIELDS } from "./types";
import { FormInput } from "@/components/forms/form-input";
import { FormSelect } from "@/components/forms/form-select";

interface StepBasicInfoProps {
  form: UseFormReturn<ApplicationFormData>;
  onNext: () => void;
  onBack: () => void;
  direction: number;
}

export function StepBasicInfo({
  form,
  onNext,
  onBack,
  direction,
}: StepBasicInfoProps) {
  const {
    formState: { isSubmitting },
    // setValue,
    // watch,
    trigger,
  } = form;

  // Auto-focus first field on mount
  useEffect(() => {
    const el = document.getElementById("businessName");
    el?.focus();
  }, []);

  // Format phone as user types — strip non-digits, max 11 chars
  // const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
  //   setValue("contactNumber", raw, { shouldValidate: true });
  // };

  const handleNext = async () => {
    const valid = await trigger([...STEP_2_FIELDS]);
    if (valid) onNext();
  };

  // const selectedState = watch("state");

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
            Tell us about your business
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <FieldGroup>
            <FormInput
              control={form.control}
              name="businessName"
              label=" Registered Business Name"
              placeholder="Enter your CAC registered business name"
              required
            />
            <FormInput
              control={form.control}
              name="rcNumber"
              label="RC Number"
              placeholder="Enter your CAC registered RC number "
              required
            />
            <FormInput
              control={form.control}
              name="businessAddress"
              label=" Registered Business Address"
              placeholder="Full physical address of your store"
              required
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormSelect
                className="w-full"
                control={form.control}
                name="state"
                label="State"
                placeholder="Select your state"
                required
                options={NIGERIAN_STATES.map((state) => ({
                  value: state,
                  label: state,
                }))}
              />

              <FormInput
                control={form.control}
                name="city"
                label="City"
                placeholder="City where your business is located"
                required
              />
            </div>

            <FormInput
              control={form.control}
              name="contactNumber"
              type="tel"
              label="Business Contact Number"
              placeholder="08012345678"
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
              Continue
              <ArrowRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
