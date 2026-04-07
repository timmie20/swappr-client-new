import { serverFetch } from "@/lib/api/server";
import { ApiResponser, Question } from "@/types/api";

export type QuestionsByBrandResponse = ApiResponser<{ questions: Question[] }>;

export const getQuestionsByBrand = async (
  brandId: string,
): Promise<QuestionsByBrandResponse> => {
  return serverFetch<QuestionsByBrandResponse>(
    `/questions/brand/${brandId}/with-general`,
    undefined,
    { revalidate: 86400 }, // 24 hours - questions rarely change
  );
};
