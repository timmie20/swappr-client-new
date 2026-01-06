/**
 * Question Hooks
 *
 * Custom React Query hooks for question-related data fetching and mutations.
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { questionEndpoints } from "@/endpoints";
import { queryKeys } from "@/lib/api/query-keys";
import type {
  Question,
  PaginationParams,
  ApiResponse,
  SubmitAnswersDto,
} from "@/types/api";
import { valuationEndpoints } from "@/endpoints/valuation";

// ============================================
// Query Hooks (Data Fetching)
// ============================================

/**
 * Fetch all questions with pagination
 */
// export function useQuestions(
//   params?: PaginationParams & { modelId?: string; variationId?: string },
//   options?: Omit<
//     UseQueryOptions<PaginatedResponse<Question>>,
//     "queryKey" | "queryFn"
//   >
// ) {
//   return useQuery({
//     queryKey: queryKeys.questions.list(params),
//     queryFn: () => questionEndpoints.getAll(params),
//     ...options,
//   });
// }

/**
 * Fetch questions by model ID
 */
export function useQuestionsByModel(
  brandId: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<{ questions: Question[] }>>,
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

// ============================================
// Mutation Hooks (Data Modifications)
// ============================================

/**
 * Submit answers to questions (member only)
 */
export function useSubmitAnswers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: SubmitAnswersDto) =>
      valuationEndpoints.calculateValue(dto),
    onSuccess: () => {
      // Optionally invalidate user submissions or related data
      queryClient.invalidateQueries({ queryKey: queryKeys.user.submissions() });
    },
  });
}
