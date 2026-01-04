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

      // TODO: Submit to API
      console.log("Submitting valuation payload:", payload);

      // Example API call (uncomment when ready):
      // const response = await fetch('/api/valuations', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      //
      // if (!response.ok) throw new Error('Submission failed');
      //
      // const result = await response.json();

      // Clear answers after successful submission
      clearAnswers();

      toast.success("Valuation submitted successfully!");

      // Navigate to results page (adjust URL as needed)
      // router.push(`/valuation-result/${result.id}`);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit valuation. Please try again.");
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
