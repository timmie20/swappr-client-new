"use client";
import { QuestionsProps } from "./questionnaire-page";
import React, { useEffect } from "react";
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
  // validatePayload,
} from "@/lib/questionnaire-submission";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { clearQuestionnaireContext } from "@/lib/cookies";
import { useSubmitAnswers } from "@/hooks/use-questions";
import { useResultStore } from "@/store/result-store";

/**
 * Extract error message from unknown error type
 * @param error - Error object of unknown type
 * @param defaultMessage - Default message if extraction fails
 * @returns User-friendly error message
 */
function getErrorMessage(error: unknown, defaultMessage: string): string {
  if (error && typeof error === "object" && "message" in error) {
    return (error as { message: string }).message;
  }
  return defaultMessage;
}

export default function Questions({ questions }: QuestionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: submitAnswers, isPending: isSubmitting } = useSubmitAnswers();
  const setResult = useResultStore((s) => s.setResult);

  // Extract model slug from pathname: /check-worth/[slug]/questionnaire
  const modelSlug = pathname.split("/")[2];

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

  // Check if we're on the last question (currentStep is 1-indexed)
  const isLastQuestion = currentStep >= questions.length;

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

    try {
      // Build payload from store and cookies
      const answers = getAnswers();
      const payload = buildValuationPayload(answers);

      // Validate payload
      // const validationError = validatePayload(payload);
      // if (validationError) {
      //   toast.error(validationError);
      //   return;
      // }

      // Submit to API using React Query mutation
      submitAnswers(payload!, {
        onSuccess: (response) => {
          // Store result in result store
          if (response.data) {
            setResult(response.data);

            // Clear answers and context after successful submission
            clearAnswers();
            clearQuestionnaireContext();

            toast.success("Valuation submitted successfully!");

            // Use setTimeout to ensure store update completes before navigation
            setTimeout(() => {
              router.push(
                `/check-worth/${modelSlug}/result/${response.data.valuation_id}`,
              );
            }, 0);
          } else {
            // Fallback if no valuation_id is returned
            console.warn("No valuation_id returned from API");
            toast.warning("No valuation data returned");
            router.push("/");
          }
        },
        onError: (error) => {
          console.error("Submission error:", error);
          const errorMessage = getErrorMessage(
            error,
            "Failed to submit valuation. Please try again.",
          );
          toast.error(errorMessage);
        },
      });
    } catch (error) {
      console.error("Payload building error:", error);
      toast.error("Failed to prepare submission. Please try again.");
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
