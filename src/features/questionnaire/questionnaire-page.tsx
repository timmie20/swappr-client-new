"use client";

import React, { useEffect } from "react";
import Questions from "./questions";
import { useQuestionsByBrand } from "@/hooks/use-questions";
import { useQuestionStore } from "@/store/question-store";
import PageLoader from "@/components/page-loader";
import { ErrorState } from "@/components/error-state";

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
      <ErrorState
        title="An Error Occured"
        description=" Failed to load questions. Please try again."
      />
    );
  }

  return (
    <div className="h-[80vh] md:my-auto md:h-[90vh]">
      <Questions questions={data.questions} />
    </div>
  );
}
