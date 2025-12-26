/**
 * Variation API Endpoints
 *
 * Service layer for variation-related API calls.
 */

import { api } from "@/lib/api/client";
import type {
  Variation,
  CreateVariationDto,
  UpdateVariationDto,
  PaginatedResponse,
  PaginationParams,
  ApiResponse,
} from "@/types/api";

export const variationEndpoints = {
  /**
   * Get all variations (paginated)
   */
  async getAll(
    params?: PaginationParams
  ): Promise<PaginatedResponse<Variation>> {
    const { data } = await api.get<PaginatedResponse<Variation>>(
      "/variations",
      {
        params,
      }
    );
    return data;
  },

  /**
   * Get variations by model ID
   */
  async getByModel(
    modelId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Variation>> {
    const { data } = await api.get<PaginatedResponse<Variation>>(
      `/models/${modelId}/variations`,
      { params }
    );
    return data;
  },

  /**
   * Get a single variation by ID
   */
  async getById(id: string): Promise<Variation> {
    const { data } = await api.get<ApiResponse<Variation>>(`/variations/${id}`);
    return data.data;
  },

  /**
   * Get a single variation by slug
   */
  async getBySlug(slug: string): Promise<Variation> {
    const { data } = await api.get<ApiResponse<Variation>>(
      `/variations/slug/${slug}`
    );
    return data.data;
  },

  /**
   * Create a new variation (admin only)
   */
  async create(dto: CreateVariationDto): Promise<Variation> {
    const { data } = await api.post<ApiResponse<Variation>>("/variations", dto);
    return data.data;
  },

  /**
   * Update a variation (admin only)
   */
  async update(id: string, dto: UpdateVariationDto): Promise<Variation> {
    const { data } = await api.patch<ApiResponse<Variation>>(
      `/variations/${id}`,
      dto
    );
    return data.data;
  },

  /**
   * Delete a variation (admin only)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/variations/${id}`);
  },
};
