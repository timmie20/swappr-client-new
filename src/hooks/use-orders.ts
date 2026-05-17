"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { ordersEndpoints } from "@/endpoints/orders";
import type { ApiResponse } from "@/types/api";
import type {
  CreateOrderPayload,
  CreateOrderResponseData,
  Order,
} from "@/types/orders";

export const ordersKeys = {
  all: ["orders"] as const,
  create: () => [...ordersKeys.all, "create"] as const,
  byId: (orderId: string | null | undefined) =>
    [...ordersKeys.all, "by-id", orderId] as const,
};

export function useCreateOrder() {
  return useMutation<
    ApiResponse<CreateOrderResponseData>,
    Error,
    CreateOrderPayload
  >({
    mutationKey: ordersKeys.create(),

    mutationFn: async (payload) => {
      const res = await ordersEndpoints.createOrder(payload);

      return res;
    },
  });
}

export function useOrder(orderId: string | null | undefined) {
  return useQuery<ApiResponse<Order>>({
    queryKey: ordersKeys.byId(orderId),

    enabled: !!orderId,

    queryFn: async () => {
      if (!orderId) {
        throw new Error("Missing order id");
      }

      const res = await ordersEndpoints.getOrderById(orderId);

      return res;
    },

    retry: 0,
  });
}
