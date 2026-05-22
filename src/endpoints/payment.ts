import { api } from "@/lib/api/client";
import type { ApiResponse } from "@/types/api";
import type {
  PaymentInitiatePayload,
  PaymentInitiateResponseData,
  PaymentVerifyResponseData,
} from "@/types/payment";

export const paymentEndpoints = {
  async initiate(
    payload: PaymentInitiatePayload,
  ): Promise<PaymentInitiateResponseData> {
    const { data } = await api.post("/payments/initiate", payload);
    return data;
  },

  async verify(
    reference: string,
  ): Promise<ApiResponse<PaymentVerifyResponseData>> {
    const { data } = await api.get("/payments/verify", {
      params: { reference },
    });
    return data;
  },
};
