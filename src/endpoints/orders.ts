import { api } from "@/lib/api/client";
import type { ApiResponse, PaginationParams } from "@/types/api";
import type {
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

  async getOrderById(orderId: string): Promise<ApiResponse<Order>> {
    const { data } = await api.get(`/orders/${orderId}`);
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

  async cancelOrder(orderId: string): Promise<ApiResponse<Order>> {
    const { data } = await api.post(`/orders/${orderId}/cancel`);
    return data;
  },
};
