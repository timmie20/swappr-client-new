/**
 * Question Hooks
 *
 * Custom React Query hooks for question-related data fetching and mutations.
 */

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { questionEndpoints } from "@/endpoints";
import { queryKeys } from "@/lib/api/query-keys";
import type { Question, ApiResponser } from "@/types/api";

/**
 * Fetch questions by model ID
 */
export function useQuestionsByModel(
  brandId: string,
  options?: Omit<
    UseQueryOptions<ApiResponser<{ questions: Question[] }>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: queryKeys.questions.byModel(brandId),
    queryFn: () => questionEndpoints.getByBrand(brandId),
    enabled: !!brandId,
    ...options,
  });
}
