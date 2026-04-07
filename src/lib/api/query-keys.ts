/**
 * Query Keys Factory
 *
 * Centralized query key management following TanStack Query best practices.
 * Ensures consistent cache key structure and makes cache invalidation easier.
 *
 * Pattern:
 * - Top level: resource type (e.g., 'brands')
 * - Second level: 'list' or 'detail'
 * - Third level: filters/params
 *
 * Example:
 * ['brands', 'list', { search: 'apple' }]
 * ['brands', 'detail', 'brand-id-123']
 */

import type { PaginationParams } from "./types";

export const queryKeys = {
  // ============================================
  // Brands
  // ============================================
  brands: {
    all: ["brands"] as const,
    lists: () => [...queryKeys.brands.all, "list"] as const,
    list: (params?: PaginationParams) =>
      [...queryKeys.brands.lists(), params] as const,
    details: () => [...queryKeys.brands.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.brands.details(), id] as const,
  },

  // ============================================
  // Models
  // ============================================
  models: {
    all: ["models"] as const,
    lists: () => [...queryKeys.models.all, "list"] as const,
    list: (params?: PaginationParams & { brandId?: string }) =>
      [...queryKeys.models.lists(), params] as const,
    details: () => [...queryKeys.models.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.models.details(), id] as const,
    byBrand: (brandId: string, params?: PaginationParams) =>
      [...queryKeys.models.lists(), { brandId, ...params }] as const,
  },

  // ============================================
  // Variations
  // ============================================
  variations: {
    all: ["variations"] as const,
    lists: () => [...queryKeys.variations.all, "list"] as const,
    list: (params?: PaginationParams & { modelId?: string }) =>
      [...queryKeys.variations.lists(), params] as const,
    details: () => [...queryKeys.variations.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.variations.details(), id] as const,
    byModel: (modelId: string, params?: PaginationParams) =>
      [...queryKeys.variations.lists(), { modelId, ...params }] as const,
  },

  // ============================================
  // Options
  // ============================================
  options: {
    all: ["options"] as const,
    lists: () => [...queryKeys.options.all, "list"] as const,
    list: (
      params?: PaginationParams & { modelId?: string; variationId?: string },
    ) => [...queryKeys.options.lists(), params] as const,
    details: () => [...queryKeys.options.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.options.details(), id] as const,
    byModel: (modelId: string, params?: PaginationParams) =>
      [...queryKeys.options.lists(), { modelId, ...params }] as const,
    byVariation: (variationId: string, params?: PaginationParams) =>
      [...queryKeys.options.lists(), { variationId, ...params }] as const,
  },

  // ============================================
  // Questions
  // ============================================
  questions: {
    all: ["questions"] as const,
    lists: () => [...queryKeys.questions.all, "list"] as const,
    list: (
      params?: PaginationParams & { modelId?: string; variationId?: string },
    ) => [...queryKeys.questions.lists(), params] as const,
    details: () => [...queryKeys.questions.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.questions.details(), id] as const,
    byBrand: (brandId: string) =>
      [...queryKeys.questions.lists(), { brandId }] as const,
    byModel: (modelId: string) =>
      [...queryKeys.questions.lists(), { modelId }] as const,
  },

  // ============================================
  // Valuations
  // ============================================
  valuations: {
    all: ["valuations"] as const,
    lists: () => [...queryKeys.valuations.all, "list"] as const,
    list: (params?: PaginationParams) =>
      [...queryKeys.valuations.lists(), params] as const,
    details: () => [...queryKeys.valuations.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.valuations.details(), id] as const,
  },

  // ============================================
  // Products
  // ============================================
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (params?: PaginationParams) =>
      [...queryKeys.products.lists(), params] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
  },

  // ============================================
  // User-specific queries (if needed)
  // ============================================
  user: {
    all: ["user"] as const,
    profile: () => [...queryKeys.user.all, "profile"] as const,
    submissions: (params?: PaginationParams) =>
      [...queryKeys.user.all, "submissions", params] as const,
  },
} as const;

/**
 * Utility function to invalidate related queries
 *
 * Example:
 * queryClient.invalidateQueries({ queryKey: queryKeys.brands.all })
 * This will invalidate all brand-related queries (lists and details)
 */
