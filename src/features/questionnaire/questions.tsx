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
import Link from "next/link";
import { IconArrowBackUp } from "@tabler/icons-react";
import GoRack from "@/components/route-back-btn";

export default function Questions({ questions }: QuestionsProps) {
  const initializeQuestions = useQuestionStore((s) => s.initializeQuestions);
  const currentQuestion = useQuestionStore((s) => s.currentQuestion);
  const currentStep = useQuestionStore((s) => s.currentStep);
  const nextStep = useQuestionStore((s) => s.nextStep);

  // Initialize questions in store when component mounts
  useEffect(() => {
    if (questions && questions.length > 0) {
      initializeQuestions(questions);
    }
  }, [questions, initializeQuestions]);

  const handleNext = () => {
    nextStep();
  };

  if (!currentQuestion) return null;

  return (
    <>
      <div className="my-6 flex items-center gap-4">
        <Breadcrumb className="shrink-0">
          <GoRack />
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
      <div className="mt-6 flex justify-center">
        <motion.div
          className="h-16 w-62.5 cursor-pointer rounded-full text-white"
          whileTap={{ scale: 0.8 }}
        >
          <Button
            className="h-full w-full"
            onClick={handleNext}
            type="button"
            size="lg"
          >
            OK
          </Button>
        </motion.div>
      </div>
    </>
  );
}
