import { api } from "@/lib/api/client";
import type {
  ApiResponse,
  ValuationResponse,
  SubmitAnswersDto,
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
};
