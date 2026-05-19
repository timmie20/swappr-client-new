"use client";

import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
  type QueryKey,
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

export function useOrder(orderId: string | null | undefined) {
  return useQuery<ApiResponse<Order>>({
    queryKey: queryKeys.orders.detail(orderId ?? ""),

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

type CancelContext = {
  previousLists: Array<
    [QueryKey, OrderListResponse | InfiniteData<OrderListResponse> | undefined]
  >;
  previousOrder?: ApiResponse<Order>;
};

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Order>,
    Error,
    { orderId: string },
    CancelContext
  >({
    mutationKey: ordersMutationKeys.cancel(),
    mutationFn: ({ orderId }) => ordersEndpoints.cancelOrder(orderId),
    onMutate: async ({ orderId }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.orders.lists() });

      const previousLists = queryClient.getQueriesData<
        OrderListResponse | InfiniteData<OrderListResponse>
      >({ queryKey: queryKeys.orders.lists() });

      const previousOrder = queryClient.getQueryData<ApiResponse<Order>>(
        queryKeys.orders.detail(orderId),
      );

      const markCancelled = (order: Order) => ({
        ...order,
        status: "cancelled",
        cancelled_at: order.cancelled_at ?? new Date().toISOString(),
        cancellation_reason: order.cancellation_reason ?? "Cancelled by user",
      });

      queryClient.setQueriesData<
        OrderListResponse | InfiniteData<OrderListResponse>
      >({ queryKey: queryKeys.orders.lists() }, (old) => {
        if (!old) return old;

        if ("pages" in old) {
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              orders: page.orders.map((order) =>
                order.id === orderId ? markCancelled(order) : order,
              ),
            })),
          };
        }

        return {
          ...old,
          orders: old.orders.map((order) =>
            order.id === orderId ? markCancelled(order) : order,
          ),
        };
      });

      if (previousOrder) {
        queryClient.setQueryData<ApiResponse<Order>>(
          queryKeys.orders.detail(orderId),
          {
            ...previousOrder,
            data: markCancelled(previousOrder.data),
          },
        );
      }

      return { previousLists, previousOrder };
    },
    onError: (error, variables, context) => {
      if (context?.previousLists) {
        context.previousLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }

      if (context?.previousOrder) {
        queryClient.setQueryData(
          queryKeys.orders.detail(variables.orderId),
          context.previousOrder,
        );
      }

      toast.error(error.message || "Unable to cancel order");
    },
    onSuccess: (res) => {
      toast.success(res.message || "Order cancelled");
    },
    onSettled: (_res, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.lists() });
      if (variables?.orderId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.orders.detail(variables.orderId),
        });
      }
    },
  });
}
