"use client";

import React, { useEffect } from "react";
import Questions from "./questions";
import { useQuestionsByBrand } from "@/hooks/use-questions";
import { useQuestionStore } from "@/store/question-store";
import PageLoader from "@/components/page-loader";

type QuestionnairePageProps = {
  brandId: string;
};

export default function QuestionnairePage({ brandId }: QuestionnairePageProps) {
  // Hydrate from React Query (data prefetched on server)
  const { data, isLoading, isError } = useQuestionsByBrand(brandId);

  const initializeQuestions = useQuestionStore((s) => s.initializeQuestions);

  // Initialize Zustand store when questions are loaded
  useEffect(() => {
    if (data?.questions) {
      initializeQuestions(data.questions);
    }
  }, [data?.questions, initializeQuestions]);

  if (isLoading) {
    return (
      // <div className="h-[80vh] md:my-auto md:h-[70vh]">
      //   <div className="flex h-full items-center justify-center">
      //     <div className="text-center">Loading questions...</div>
      //   </div>
      // </div>
      <PageLoader />
    );
  }

  if (isError || !data?.questions) {
    return (
      <div className="h-[80vh] md:my-auto md:h-[70vh]">
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-red-600">
            Failed to load questions. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[80vh] md:my-auto md:h-[70vh]">
      <Questions questions={data.questions} />
    </div>
  );
}
