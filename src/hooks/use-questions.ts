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
  CreateQuestionDto,
  UpdateQuestionDto,
  PaginationParams,
  PaginatedResponse,
  SubmitAnswersDto,
} from "@/types/api";

// ============================================
// Query Hooks (Data Fetching)
// ============================================

/**
 * Fetch all questions with pagination
 */
export function useQuestions(
  params?: PaginationParams & { modelId?: string; variationId?: string },
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Question>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: queryKeys.questions.list(params),
    queryFn: () => questionEndpoints.getAll(params),
    ...options,
  });
}

/**
 * Fetch questions by model ID
 */
export function useQuestionsByModel(
  modelId: string,
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Question>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: queryKeys.questions.byModel(modelId, params),
    queryFn: () => questionEndpoints.getByModel(modelId, params),
    enabled: !!modelId,
    ...options,
  });
}

/**
 * Fetch questions by variation ID
 */
export function useQuestionsByVariation(
  variationId: string,
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Question>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: queryKeys.questions.byVariation(variationId, params),
    queryFn: () => questionEndpoints.getByVariation(variationId, params),
    enabled: !!variationId,
    ...options,
  });
}

/**
 * Fetch a single question by ID
 */
export function useQuestion(
  id: string,
  options?: Omit<UseQueryOptions<Question>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.questions.detail(id),
    queryFn: () => questionEndpoints.getById(id),
    enabled: !!id,
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
    mutationFn: (dto: SubmitAnswersDto) => questionEndpoints.submitAnswers(dto),
    onSuccess: () => {
      // Optionally invalidate user submissions or related data
      queryClient.invalidateQueries({ queryKey: queryKeys.user.submissions() });
    },
  });
}

/**
 * Create a new question (admin only)
 */
export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateQuestionDto) => questionEndpoints.create(dto),
    onSuccess: () => {
      // Invalidate all question lists
      queryClient.invalidateQueries({ queryKey: queryKeys.questions.lists() });
    },
  });
}

/**
 * Update a question (admin only)
 */
export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateQuestionDto }) =>
      questionEndpoints.update(id, dto),
    onSuccess: (data, variables) => {
      // Invalidate the specific question detail
      queryClient.invalidateQueries({
        queryKey: queryKeys.questions.detail(variables.id),
      });
      // Invalidate all question lists
      queryClient.invalidateQueries({ queryKey: queryKeys.questions.lists() });
    },
  });
}

/**
 * Delete a question (admin only)
 */
export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => questionEndpoints.delete(id),
    onSuccess: () => {
      // Invalidate all question-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.questions.all });
    },
  });
}
