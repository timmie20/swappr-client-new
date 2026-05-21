"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { paymentEndpoints } from "@/endpoints/payment";
import type { ApiResponse } from "@/types/api";
import type {
  PaymentInitiatePayload,
  PaymentInitiateResponseData,
  PaymentVerifyResponseData,
} from "@/types/payment";

export const paymentKeys = {
  all: ["payment"] as const,
  initiate: () => [...paymentKeys.all, "initiate"] as const,
  verify: (reference: string | null) =>
    [...paymentKeys.all, "verify", reference] as const,
};

export function useInitiatePayment() {
  return useMutation<
    PaymentInitiateResponseData,
    { message: string; statusCode: number },
    PaymentInitiatePayload
  >({
    mutationKey: paymentKeys.initiate(),

    mutationFn: (payload) => paymentEndpoints.initiate(payload),
  });
}

export function useVerifyPayment(reference: string | null) {
  return useQuery<
    ApiResponse<PaymentVerifyResponseData>,
    { message: string; statusCode: number }
  >({
    queryKey: paymentKeys.verify(reference),
    enabled: !!reference,
    queryFn: async () => {
      if (!reference) throw new Error("Missing payment reference");
      return await paymentEndpoints.verify(reference);
    },
    retry: 0,
  });
}
