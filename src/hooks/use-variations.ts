/**
 * Variation Hooks
 *
 * Custom React Query hooks for variation-related data fetching and mutations.
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { variationEndpoints } from "@/endpoints";
import { queryKeys } from "@/lib/api/query-keys";
import type {
  Variation,
  UpdateVariationDto,
  PaginationParams,
  PaginatedResponse,
} from "@/types/api";

// ============================================
// Query Hooks (Data Fetching)
// ============================================

/**
 * Fetch all variations with pagination
 */
export function useVariations(
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Variation>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: queryKeys.variations.list(params),
    queryFn: () => variationEndpoints.getAll(params),
    ...options,
  });
}

/**
 * Fetch variations by model ID
 */
export function useVariationsByModel(
  modelId: string,
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Variation>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: queryKeys.variations.byModel(modelId, params),
    queryFn: () => variationEndpoints.getByModel(modelId, params),
    enabled: !!modelId,
    ...options,
  });
}

/**
 * Fetch a single variation by ID
 */
export function useVariation(
  id: string,
  options?: Omit<UseQueryOptions<Variation>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: queryKeys.variations.detail(id),
    queryFn: () => variationEndpoints.getById(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * Fetch a single variation by slug
 */
export function useVariationBySlug(
  slug: string,
  options?: Omit<UseQueryOptions<Variation>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: queryKeys.variations.detail(slug),
    queryFn: () => variationEndpoints.getBySlug(slug),
    enabled: !!slug,
    ...options,
  });
}

// ============================================
// Mutation Hooks (Data Modifications)
// ============================================

/**
 * Create a new variation (admin only)
 */
// export function useCreateVariation() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (dto: CreateVariationDto) => variationEndpoints.create(dto),
//     onSuccess: (data: Variation) => {
//       // Invalidate all variation lists
//       queryClient.invalidateQueries({ queryKey: queryKeys.variations.lists() });
//       // Also invalidate model's variations
//       if (data.modelId) {
//         queryClient.invalidateQueries({
//           queryKey: queryKeys.variations.byModel(data.modelId),
//         });
//       }
//     },
//   });
// }

/**
 * Update a variation (admin only)
 */
export function useUpdateVariation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateVariationDto }) =>
      variationEndpoints.update(id, dto),
    onSuccess: (data, variables) => {
      // Invalidate the specific variation detail
      queryClient.invalidateQueries({
        queryKey: queryKeys.variations.detail(variables.id),
      });
      // Invalidate all variation lists
      queryClient.invalidateQueries({ queryKey: queryKeys.variations.lists() });
    },
  });
}

/**
 * Delete a variation (admin only)
 */
export function useDeleteVariation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => variationEndpoints.delete(id),
    onSuccess: () => {
      // Invalidate all variation-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.variations.all });
    },
  });
}
