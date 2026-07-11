import { api } from "@/lib/api/client";
import type { ApiResponse, PaginationParams } from "@/types/api";
import type {
  CancelOrder,
  CreateOrderPayload,
  CreateOrderResponseData,
  Order,
  OrderListResponse,
} from "@/types/orders";

export const ordersEndpoints = {
  async createOrder(
    payload: CreateOrderPayload,
  ): Promise<ApiResponse<CreateOrderResponseData>> {
    const { data } = await api.post("/orders", payload);
    return data;
  },

  // backend resolves GET /orders/:id by order_number, not uuid
  async getOrderByNumber(orderNumber: string): Promise<ApiResponse<Order>> {
    const { data } = await api.get(`/orders/${orderNumber}`);
    return data;
  },

  async getMyOrders(params?: PaginationParams): Promise<OrderListResponse> {
    const { data } = await api.get<
      ApiResponse<OrderListResponse> | OrderListResponse
    >("/orders/my", {
      params,
    });

    if (typeof data === "object" && data && "data" in data) {
      return (data as ApiResponse<OrderListResponse>).data;
    }

    return data as OrderListResponse;
  },

  async cancelOrder(payload: CancelOrder): Promise<ApiResponse<Order>> {
    const { data } = await api.patch(`/orders/${payload.orderId}/cancel`, {
      cancellation_reason: payload.cancellation_reason,
    });
    return data;
  },
};
