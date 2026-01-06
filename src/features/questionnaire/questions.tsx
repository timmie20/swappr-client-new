"use client";
import { QuestionsProps } from "./questionnaire-page";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import QuestionRenderer from "./components/question-renderer";
import { useQuestionStore } from "@/store/question-store";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import ProgressBar from "./components/progress-bar";
import GoRack from "@/components/route-back-btn";
import {
  buildValuationPayload,
  validatePayload,
} from "@/lib/questionnaire-submission";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { valuationEndpoints } from "@/endpoints/valuation";
import { clearQuestionnaireContext } from "@/lib/cookies";

export default function Questions({ questions }: QuestionsProps) {
  const router = useRouter(); // Uncomment when implementing navigation after submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initializeQuestions = useQuestionStore((s) => s.initializeQuestions);
  const currentQuestion = useQuestionStore((s) => s.currentQuestion);
  const currentStep = useQuestionStore((s) => s.currentStep);
  const nextStep = useQuestionStore((s) => s.nextStep);
  const answers = useQuestionStore((s) => s.answers); // Subscribe to answers
  const getAnswers = useQuestionStore((s) => s.getAnswers);
  const clearAnswers = useQuestionStore((s) => s.clearAnswers);

  // Check if current question has been answered (reacts to answers changes)
  const isCurrentQuestionAnswered = currentQuestion
    ? !!answers[currentQuestion.id]
    : false;

  // Check if we're on the last question
  const isLastQuestion = currentStep === questions.length;

  // Initialize questions in store when component mounts
  useEffect(() => {
    if (questions && questions.length > 0) {
      initializeQuestions(questions);
    }
  }, [questions, initializeQuestions]);

  const handleNext = () => {
    if (!isCurrentQuestionAnswered) {
      toast.error("Please select an answer before continuing");
      return;
    }
    nextStep();
  };

  const handleBack = () => {
    router.back();
    clearAnswers();
    // Additional cleanup or navigation logic can be added here
  };

  const handleSubmit = async () => {
    if (!isCurrentQuestionAnswered) {
      toast.error("Please select an answer before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build payload from store and cookies
      const answers = getAnswers();
      const payload = buildValuationPayload(answers);

      // Validate payload
      const validationError = validatePayload(payload);
      if (validationError) {
        toast.error(validationError);
        setIsSubmitting(false);
        return;
      }

      // Submit to API
      console.log("Submitting valuation payload:", payload);
      const response = await valuationEndpoints.calculateValue(payload!);

      // Clear answers and context after successful submission
      clearAnswers();
      clearQuestionnaireContext();

      toast.success("Valuation submitted successfully!");

      // Navigate to results page with valuation ID
      if (response.data?.valuation_id) {
        router.push(`/valuation-result/${response.data.valuation_id}`);
      } else {
        // Fallback if no valuation_id is returned
        console.warn("No valuation_id returned from API");
        router.push("/");
      }
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : "Failed to submit valuation. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentQuestion) return null;

  return (
    <>
      <div className="my-6 flex items-center gap-4">
        <Breadcrumb className="shrink-0">
          <GoRack handleClick={handleBack} />
          <BreadcrumbList>
            <BreadcrumbItem className="text-xs sm:text-sm">
              Question {currentStep}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-xs sm:text-sm">
              {questions.length} total
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage className="truncate text-xs capitalize sm:text-sm">
              {currentQuestion.slug.replace(/-/g, " ")}
            </BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="relative space-y-4">
        <ProgressBar />
        <QuestionRenderer />
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-50 block h-20 bg-linear-to-t from-white to-transparent blur-sm min-[460px]:hidden" />
      </div>
      <div className="mt-6 flex justify-center pb-7 sm:pb-0">
        <motion.div
          className="h-16 w-62.5 cursor-pointer rounded-full text-white"
          whileTap={{ scale: isCurrentQuestionAnswered ? 0.8 : 1 }}
        >
          <Button
            className="h-full w-full disabled:cursor-not-allowed"
            onClick={isLastQuestion ? handleSubmit : handleNext}
            type="button"
            size="lg"
            disabled={!isCurrentQuestionAnswered || isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : isLastQuestion
                ? "Calculate Value"
                : "Next"}
          </Button>
        </motion.div>
      </div>
    </>
  );
}
