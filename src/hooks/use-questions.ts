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
 * Fetch questions by brand ID
 */
export function useQuestionsByBrand(
  brandId: string,
  options?: Omit<
    UseQueryOptions<ApiResponser<{ questions: Question[] }>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: queryKeys.questions.byBrand(brandId),
    queryFn: () => questionEndpoints.getByBrand(brandId),
    staleTime: 86400_000, // 24 hours - questions rarely change
    enabled: !!brandId,
    ...options,
  });
}

/**
 * @deprecated Use useQuestionsByBrand instead (matches API parameter naming)
 * Fetch questions by model ID (backward compatibility alias)
 */
export const useQuestionsByModel = useQuestionsByBrand;
