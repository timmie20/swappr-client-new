import { api } from "@/lib/api/client";
import type {
  ApiResponse,
  ValuationResponse,
  SubmitAnswersDto,
  Valuation,
} from "@/types/api";

export const valuationEndpoints = {
  /**
   * Get valuation of a device
   */
  async calculateValue(
    payload: SubmitAnswersDto,
  ): Promise<ApiResponse<ValuationResponse>> {
    const { data } = await api.post<ApiResponse<ValuationResponse>>(
      "/valuations/calculate",
      payload,
    );
    return data;
  },
  async getAll(): Promise<ApiResponse<Valuation[]>> {
    const { data } = await api.get<ApiResponse<Valuation[]>>("/valuations");
    return data;
  },
};
