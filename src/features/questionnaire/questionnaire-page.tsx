import React from "react";
import Questions from "./questions";
import { getAuthHeaders } from "@/lib/api/server";
import { Question } from "@/lib/api/types";
import { apiClient } from "@/lib/api/client";

type QuestionnairePageProps = {
  brandId: string;
};

export type QuestionsProps = {
  questions: Question[];
};

const getQuestions = async (brandId: string): Promise<QuestionsProps> => {
  const headers = await getAuthHeaders();
  const response = await apiClient.instance.get<Promise<QuestionsProps>>(
    `/questions/brand/${brandId}/with-general`,
    {
      ...(headers && { headers }),
    },
  );
  return response.data;
};

export default async function QuestionnairePage({
  brandId,
}: QuestionnairePageProps) {
  const questions = (await getQuestions(brandId)).questions;
  return (
    <div className="h-[80vh] md:my-auto md:h-[70vh]">
      <Questions questions={questions} />
    </div>
  );
}
