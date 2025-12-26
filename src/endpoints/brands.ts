/**
 * Brand API Endpoints
 *
 * Service layer for brand-related API calls.
 * All methods return promises that can be used with React Query.
 */

import { api } from "@/lib/api/client";

import type {
  Brand,
  CreateBrandDto,
  UpdateBrandDto,
  PaginatedResponse,
  PaginationParams,
  ApiResponse,
} from "@/types/api";

export const brandEndpoints = {
  /**
   * Get all brands (paginated)
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Brand>> {
    const { data } = await api.get<PaginatedResponse<Brand>>("/brands", {
      params,
    });
    return data;
  },

  /**
   * Get a single brand by ID
   */
  async getById(id: string): Promise<Brand> {
    const { data } = await api.get<ApiResponse<Brand>>(`/brands/${id}`);
    return data.data;
  },

  /**
   * Get a single brand by slug
   */
  async getBySlug(slug: string): Promise<Brand> {
    const { data } = await api.get<ApiResponse<Brand>>(`/brands/slug/${slug}`);
    return data.data;
  },

  /**
   * Create a new brand (admin only)
   */
  async create(dto: CreateBrandDto): Promise<Brand> {
    const { data } = await api.post<ApiResponse<Brand>>("/brands", dto);
    return data.data;
  },

  /**
   * Update a brand (admin only)
   */
  async update(id: string, dto: UpdateBrandDto): Promise<Brand> {
    const { data } = await api.patch<ApiResponse<Brand>>(`/brands/${id}`, dto);
    return data.data;
  },

  /**
   * Delete a brand (admin only)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/brands/${id}`);
  },
};
