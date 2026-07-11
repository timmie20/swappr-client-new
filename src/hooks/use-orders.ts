"use client";

import {
  keepPreviousData,
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
  type UseInfiniteQueryOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { ordersEndpoints } from "@/endpoints/orders";
import { queryKeys } from "@/lib/api/query-keys";
import type { ApiResponse, PaginationParams } from "@/types/api";
import type {
  CreateOrderPayload,
  CreateOrderResponseData,
  Order,
  OrderListResponse,
} from "@/types/orders";

export const ordersMutationKeys = {
  create: () => [...queryKeys.orders.all, "create"] as const,
  cancel: () => [...queryKeys.orders.all, "cancel"] as const,
};

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<CreateOrderResponseData>,
    Error,
    CreateOrderPayload
  >({
    mutationKey: ordersMutationKeys.create(),

    mutationFn: async (payload) => {
      const res = await ordersEndpoints.createOrder(payload);

      return res;
    },

    onSuccess: (res) => {
      toast.success(res.message || "Order created");

      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.cart.lists(),
      });
    },
  });
}

export function useOrders(
  params?: PaginationParams,
  options?: Omit<UseQueryOptions<OrderListResponse>, "queryKey" | "queryFn">,
) {
  return useQuery<OrderListResponse>({
    queryKey: queryKeys.orders.list(params),
    queryFn: () =>
      ordersEndpoints.getMyOrders({
        ...params,
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
      }),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useInfiniteOrders(
  params?: Omit<PaginationParams, "page">,
  options?: Omit<
    UseInfiniteQueryOptions<
      OrderListResponse,
      Error,
      InfiniteData<OrderListResponse>,
      readonly ["orders", "list", PaginationParams?],
      number
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >,
) {
  return useInfiniteQuery({
    queryKey: queryKeys.orders.list(params),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      ordersEndpoints.getMyOrders({
        ...params,
        page: pageParam,
        limit: params?.limit ?? 10,
      }),
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 60_000,
    refetchOnReconnect: true,
    ...options,
  });
}

export function useOrder(orderNumber: string) {
  return useQuery<ApiResponse<Order>>({
    queryKey: queryKeys.orders.detail(orderNumber),

    queryFn: async () => {
      if (!orderNumber) {
        throw new Error("Missing order number");
      }

      const res = await ordersEndpoints.getOrderByNumber(orderNumber);

      return res;
    },

    enabled: !!orderNumber,

    retry: 0,
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Order>,
    Error,
    { orderId: string; cancellation_reason?: string }
  >({
    mutationKey: ordersMutationKeys.cancel(),

    // note: cancel is the one order endpoint keyed by uuid (order.id),
    // while reads resolve by order_number
    mutationFn: ({ orderId, cancellation_reason }) =>
      ordersEndpoints.cancelOrder({
        orderId,
        cancellation_reason,
      }),

    onSuccess: (res) => {
      toast.success(res.message || "Order cancelled");

      // detail pages are keyed by order_number while the mutation receives
      // the uuid, so a detail(orderId) invalidation never matches — sweep
      // the whole orders scope (lists + any mounted detail) instead
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.all,
      });
    },

    onError: (error) => {
      toast.error(error.message || "Unable to cancel order");
    },
  });
}
