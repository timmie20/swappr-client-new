/**
 * Option Hooks
 *
 * Custom React Query hooks for option-related data fetching and mutations.
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { optionEndpoints } from "@/endpoints";
import { queryKeys } from "@/lib/api/query-keys";
import type {
  Option,
  CreateOptionDto,
  UpdateOptionDto,
  PaginationParams,
  PaginatedResponse,
} from "@/types/api";

// ============================================
// Query Hooks (Data Fetching)
// ============================================

/**
 * Fetch all options with pagination
 */
export function useOptions(
  params?: PaginationParams & { modelId?: string; variationId?: string },
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Option>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: queryKeys.options.list(params),
    queryFn: () => optionEndpoints.getAll(params),
    ...options,
  });
}

/**
 * Fetch options by model ID
 */
export function useOptionsByModel(
  modelId: string,
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Option>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: queryKeys.options.byModel(modelId, params),
    queryFn: () => optionEndpoints.getByModel(modelId, params),
    enabled: !!modelId,
    ...options,
  });
}

/**
 * Fetch options by variation ID
 */
export function useOptionsByVariation(
  variationId: string,
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Option>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: queryKeys.options.byVariation(variationId, params),
    queryFn: () => optionEndpoints.getByVariation(variationId, params),
    enabled: !!variationId,
    ...options,
  });
}

/**
 * Fetch a single option by ID
 */
export function useOption(
  id: string,
  options?: Omit<UseQueryOptions<Option>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.options.detail(id),
    queryFn: () => optionEndpoints.getById(id),
    enabled: !!id,
    ...options,
  });
}

// ============================================
// Mutation Hooks (Data Modifications)
// ============================================

/**
 * Create a new option (admin only)
 */
export function useCreateOption() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateOptionDto) => optionEndpoints.create(dto),
    onSuccess: () => {
      // Invalidate all option lists
      queryClient.invalidateQueries({ queryKey: queryKeys.options.lists() });
    },
  });
}

/**
 * Update an option (admin only)
 */
export function useUpdateOption() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateOptionDto }) =>
      optionEndpoints.update(id, dto),
    onSuccess: (data, variables) => {
      // Invalidate the specific option detail
      queryClient.invalidateQueries({
        queryKey: queryKeys.options.detail(variables.id),
      });
      // Invalidate all option lists
      queryClient.invalidateQueries({ queryKey: queryKeys.options.lists() });
    },
  });
}

/**
 * Delete an option (admin only)
 */
export function useDeleteOption() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => optionEndpoints.delete(id),
    onSuccess: () => {
      // Invalidate all option-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.options.all });
    },
  });
}
