"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { ProgressIndicator } from "./progress-indicator";
import { StepAgreement } from "./step-agreement";
import { StepBasicInfo } from "./step-basic-info";
import { StepAccountDetails } from "./step-account-details";
import { SuccessScreen } from "./success-screen";
import { applicationSchema, ApplicationFormData, buildPayload } from "./types";
import { vendorApplicationEndpoints } from "@/endpoints/vendor-application";

const DEFAULT_VALUES: Partial<ApplicationFormData> = {
  businessName: "",
  businessAddress: "",
  state: "",
  city: "",
  contactNumber: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function ApplicationWizard() {
  const [currentStep, setCurrentStep] = useState(1); // 1–4
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    values: DEFAULT_VALUES as ApplicationFormData,
    mode: "onChange",
  });

  /* ── Navigation ────────────────────────────────────────────────── */

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ── Final submission ──────────────────────────────────────────── */

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = form.getValues();
      await vendorApplicationEndpoints.signup(buildPayload(data));
      setDirection(1);
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: unknown }).message)
          : "Signup failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Step label ────────────────────────────────────────────────── */

  const stepLabel =
    currentStep === 1
      ? "Review Requirements"
      : currentStep === 2
        ? "Business Information"
        : currentStep === 3
          ? "Create Your Account"
          : "Account Created";

  /* ── Render ────────────────────────────────────────────────────── */

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Become a Swappr Vendor
        </h1>
        {currentStep <= 3 && (
          <p className="text-sm text-gray-500" aria-live="polite">
            Step {currentStep} of 3 &mdash;{" "}
            <span className="font-medium text-gray-700">{stepLabel}</span>
          </p>
        )}
      </div>

      {/* Progress indicator (hidden on success screen) */}
      {currentStep <= 3 && (
        <ProgressIndicator currentStep={currentStep} className="mb-8" />
      )}

      {/* Step content — AnimatePresence for slide transitions */}
      <AnimatePresence mode="wait" custom={direction}>
        {currentStep === 1 && <StepAgreement key="step-1" onNext={goNext} />}

        {currentStep === 2 && (
          <StepBasicInfo
            key="step-2"
            form={form}
            onNext={goNext}
            onBack={goBack}
            direction={direction}
          />
        )}

        {currentStep === 3 && (
          <StepAccountDetails
            key="step-3"
            form={form}
            onNext={handleSubmit}
            onBack={goBack}
            direction={direction}
            isSubmitting={isSubmitting}
          />
        )}

        {currentStep === 4 && <SuccessScreen key="step-4" />}
      </AnimatePresence>
    </div>
  );
}
