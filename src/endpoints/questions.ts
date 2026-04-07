/**
 * Question API Endpoints
 *
 * Service layer for question-related API calls.
 */

import { api } from "@/lib/api/client";
import type {
  Question,
  PaginatedResponse,
  PaginationParams,
  ApiResponser,
} from "@/types/api";

export const questionEndpoints = {
  /**
   * Get all questions (paginated)
   */
  async getAll(
    params?: PaginationParams & { modelId?: string; variationId?: string },
  ): Promise<PaginatedResponse<Question>> {
    const { data } = await api.get<PaginatedResponse<Question>>("/questions", {
      params,
    });
    return data;
  },

  /**
   *
   */
  async getByBrand(
    brandId: string,
  ): Promise<ApiResponser<{ questions: Question[] }>> {
    const { data } = await api.get<ApiResponser<{ questions: Question[] }>>(
      `/questions/brand/${brandId}/with-general`,
    );
    return data;
  },
};
