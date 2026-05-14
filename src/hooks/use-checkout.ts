"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { cartEndpoints } from "@/endpoints/cart";
import type {
  CheckoutPayPayload,
  CheckoutPayResponseData,
  CheckoutSession,
  CheckoutVerifyResponseData,
} from "@/types/checkout";
import type { ApiResponse } from "@/types/api";

export const checkoutKeys = {
  all: ["checkout"] as const,
  verify: (reference: string | null) =>
    [...checkoutKeys.all, "verify", reference] as const,
};

export function useInitiateCheckout() {
  return useMutation<
    ApiResponse<CheckoutSession>,
    { message: string; statusCode: number }
  >({
    mutationKey: [...checkoutKeys.all, "initiate"],
    mutationFn: async () => {
      return await cartEndpoints.initiateCheckout();
    },
  });
}

export function useCheckoutPay() {
  return useMutation<
    ApiResponse<CheckoutPayResponseData>,
    { message: string; statusCode: number },
    CheckoutPayPayload
  >({
    mutationKey: [...checkoutKeys.all, "pay"],
    mutationFn: async (payload) => {
      return await cartEndpoints.checkoutPay(payload);
    },
  });
}

export function useVerifyCheckout(reference: string | null) {
  return useQuery<
    ApiResponse<CheckoutVerifyResponseData>,
    { message: string; statusCode: number }
  >({
    queryKey: checkoutKeys.verify(reference),
    enabled: !!reference,
    queryFn: async () => {
      if (!reference) throw new Error("Missing payment reference");
      return await cartEndpoints.verifyCheckout(reference);
    },
    retry: 0,
  });
}
