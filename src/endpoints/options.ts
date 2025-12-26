/**
 * Option API Endpoints
 *
 * Service layer for option-related API calls.
 */

import { api } from "@/lib/api/client";
import type {
  Option,
  CreateOptionDto,
  UpdateOptionDto,
  PaginatedResponse,
  PaginationParams,
  ApiResponse,
} from "@/types/api";

export const optionEndpoints = {
  /**
   * Get all options (paginated)
   */
  async getAll(
    params?: PaginationParams & { modelId?: string; variationId?: string }
  ): Promise<PaginatedResponse<Option>> {
    const { data } = await api.get<PaginatedResponse<Option>>("/options", {
      params,
    });
    return data;
  },

  /**
   * Get options by model ID
   */
  async getByModel(
    modelId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Option>> {
    const { data } = await api.get<PaginatedResponse<Option>>(
      `/models/${modelId}/options`,
      { params }
    );
    return data;
  },

  /**
   * Get options by variation ID
   */
  async getByVariation(
    variationId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Option>> {
    const { data } = await api.get<PaginatedResponse<Option>>(
      `/variations/${variationId}/options`,
      { params }
    );
    return data;
  },

  /**
   * Get a single option by ID
   */
  async getById(id: string): Promise<Option> {
    const { data } = await api.get<ApiResponse<Option>>(`/options/${id}`);
    return data.data;
  },

  /**
   * Create a new option (admin only)
   */
  async create(dto: CreateOptionDto): Promise<Option> {
    const { data } = await api.post<ApiResponse<Option>>("/options", dto);
    return data.data;
  },

  /**
   * Update an option (admin only)
   */
  async update(id: string, dto: UpdateOptionDto): Promise<Option> {
    const { data } = await api.patch<ApiResponse<Option>>(
      `/options/${id}`,
      dto
    );
    return data.data;
  },

  /**
   * Delete an option (admin only)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/options/${id}`);
  },
};
