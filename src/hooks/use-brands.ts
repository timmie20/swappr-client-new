/**
 * Brand Hooks
 *
 * Custom React Query hooks for brand-related data fetching and mutations.
 * These hooks provide a clean interface for components to interact with brand data.
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import {
  Brand,
  CreateBrandDto,
  UpdateBrandDto,
  PaginationParams,
  PaginatedResponse,
} from "@/types/api";
import { brandEndpoints } from "@/endpoints";

// ============================================
// Query Hooks (Data Fetching)
// ============================================

/**
 * Fetch all brands with pagination
 */
export function useBrands(
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Brand>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: queryKeys.brands.list(params),
    queryFn: () => brandEndpoints.getAll(params),
    ...options,
  });
}

/**
 * Fetch a single brand by ID
 */
export function useBrand(
  id: string,
  options?: Omit<UseQueryOptions<Brand>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.brands.detail(id),
    queryFn: () => brandEndpoints.getById(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * Fetch a single brand by slug
 */
export function useBrandBySlug(
  slug: string,
  options?: Omit<UseQueryOptions<Brand>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.brands.detail(slug),
    queryFn: () => brandEndpoints.getBySlug(slug),
    enabled: !!slug,
    ...options,
  });
}

// ============================================
// Mutation Hooks (Data Modifications)
// ============================================

/**
 * Create a new brand (admin only)
 */
export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateBrandDto) => brandEndpoints.create(dto),
    onSuccess: () => {
      // Invalidate all brand lists to refetch with new data
      queryClient.invalidateQueries({ queryKey: queryKeys.brands.lists() });
    },
  });
}

/**
 * Update a brand (admin only)
 */
export function useUpdateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateBrandDto }) =>
      brandEndpoints.update(id, dto),
    onSuccess: (data, variables) => {
      // Invalidate the specific brand detail
      queryClient.invalidateQueries({
        queryKey: queryKeys.brands.detail(variables.id),
      });
      // Invalidate all brand lists
      queryClient.invalidateQueries({ queryKey: queryKeys.brands.lists() });
    },
  });
}

/**
 * Delete a brand (admin only)
 */
export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => brandEndpoints.delete(id),
    onSuccess: () => {
      // Invalidate all brand-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.brands.all });
    },
  });
}
