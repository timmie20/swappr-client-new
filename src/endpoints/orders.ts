import { api } from "@/lib/api/client";
import type { ApiResponse } from "@/types/api";
import type {
  CreateOrderPayload,
  CreateOrderResponseData,
  Order,
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
};
