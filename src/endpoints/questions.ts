/**
 * Question API Endpoints
 *
 * Service layer for question-related API calls.
 */

import { api } from "@/lib/api/client";
import type {
  Question,
  CreateQuestionDto,
  UpdateQuestionDto,
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
    params?: PaginationParams & { modelId?: string; variationId?: string }
  ): Promise<PaginatedResponse<Question>> {
    const { data } = await api.get<PaginatedResponse<Question>>("/questions", {
      params,
    });
    return data;
  },

  /**
   * Get questions by model ID
   */
  async getByModel(
    modelId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Question>> {
    const { data } = await api.get<PaginatedResponse<Question>>(
      `/models/${modelId}/questions`,
      { params }
    );
    return data;
  },

  /**
   * Get questions by variation ID
   */
  async getByVariation(
    variationId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Question>> {
    const { data } = await api.get<PaginatedResponse<Question>>(
      `/variations/${variationId}/questions`,
      { params }
    );
    return data;
  },

  /**
   * Get a single question by ID
   */
  async getById(id: string): Promise<Question> {
    const { data } = await api.get<ApiResponse<Question>>(`/questions/${id}`);
    return data.data;
  },

  /**
   * Submit answers to questions (member only)
   */
  async submitAnswers(dto: SubmitAnswersDto): Promise<unknown> {
    const { data } = await api.post<ApiResponse<unknown>>(
      "/questions/submit",
      dto
    );
    return data.data;
  },

  /**
   * Create a new question (admin only)
   */
  async create(dto: CreateQuestionDto): Promise<Question> {
    const { data } = await api.post<ApiResponse<Question>>("/questions", dto);
    return data.data;
  },

  /**
   * Update a question (admin only)
   */
  async update(id: string, dto: UpdateQuestionDto): Promise<Question> {
    const { data } = await api.patch<ApiResponse<Question>>(
      `/questions/${id}`,
      dto
    );
    return data.data;
  },

  /**
   * Delete a question (admin only)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/questions/${id}`);
  },
};
