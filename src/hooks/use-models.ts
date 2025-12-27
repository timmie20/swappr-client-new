/**
 * Model Hooks
 *
 * Custom React Query hooks for model-related data fetching and mutations.
 */

import { modelEndpoints } from "@/endpoints";
import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import type {
  Model,
  CreateModelDto,
  UpdateModelDto,
  PaginationParams,
  PaginatedResponse,
} from "@/types/api";
import { queryKeys } from "@/lib/api/query-keys";

// ============================================
// Query Hooks (Data Fetching)
// ============================================

/**
 * Fetch all models with pagination
 */
export function useModels(
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Model>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: queryKeys.models.list(params),
    queryFn: () => modelEndpoints.getAll(params),
    ...options,
  });
}

/**
 * Fetch models by brand ID
 */
export function useModelsByBrand(
  brandId: string,
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Model, "models">>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: queryKeys.models.byBrand(brandId, params),
    queryFn: () => modelEndpoints.getByBrand(brandId, params),
    enabled: !!brandId,
    ...options,
  });
}

/**
 * Fetch models by brand ID with Suspense support
 */
export function useModelsByBrandSuspense(
  brandId: string,
  params?: PaginationParams,
  options?: Omit<
    UseSuspenseQueryOptions<PaginatedResponse<Model, "models">>,
    "queryKey" | "queryFn"
  >,
) {
  return useSuspenseQuery({
    queryKey: queryKeys.models.byBrand(brandId, params),
    queryFn: () => modelEndpoints.getByBrand(brandId, params),
    ...options,
  });
}

/**
 * Fetch a single model by ID
 */
export function useModel(
  id: string,
  options?: Omit<UseQueryOptions<Model>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: queryKeys.models.detail(id),
    queryFn: () => modelEndpoints.getById(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * Fetch a single model by slug
 */
export function useModelBySlug(
  slug: string,
  options?: Omit<UseQueryOptions<Model>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: queryKeys.models.detail(slug),
    queryFn: () => modelEndpoints.getBySlug(slug),
    enabled: !!slug,
    ...options,
  });
}

// ============================================
// Mutation Hooks (Data Modifications)
// ============================================

/**
 * Create a new model (admin only)
 */
// export function useCreateModel() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (dto: CreateModelDto) => modelEndpoints.create(dto),
//     onSuccess: (data: Model) => {
//       // Invalidate all model lists
//       queryClient.invalidateQueries({ queryKey: queryKeys.models.lists() });
//       // Also invalidate brand's models
//       if (data.brandId) {
//         queryClient.invalidateQueries({
//           queryKey: queryKeys.models.byBrand(data.brandId),
//         });
//       }
//     },
//   });
// }

/**
 * Update a model (admin only)
 */
export function useUpdateModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateModelDto }) =>
      modelEndpoints.update(id, dto),
    onSuccess: (data, variables) => {
      // Invalidate the specific model detail
      queryClient.invalidateQueries({
        queryKey: queryKeys.models.detail(variables.id),
      });
      // Invalidate all model lists
      queryClient.invalidateQueries({ queryKey: queryKeys.models.lists() });
    },
  });
}

/**
 * Delete a model (admin only)
 */
export function useDeleteModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => modelEndpoints.delete(id),
    onSuccess: () => {
      // Invalidate all model-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.models.all });
    },
  });
}
