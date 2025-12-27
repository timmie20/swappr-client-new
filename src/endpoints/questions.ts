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
  ApiResponse,
  SubmitAnswersDto,
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
   * This func is supposed to get questions by model ID but it uses brand Id
   */
  async getByBrand(
    brandId: string,
  ): Promise<ApiResponse<{ questions: Question[] }>> {
    const { data } = await api.get<ApiResponse<{ questions: Question[] }>>(
      `/questions/brand/${brandId}/with-general`,
    );
    return data;
  },

  /**
   * Submit answers to questions (member only)
   */
  async submitAnswers(dto: SubmitAnswersDto): Promise<unknown> {
    const { data } = await api.post<ApiResponse<unknown>>(
      "/questions/submit",
      dto,
    );
    return data.data;
  },
};
