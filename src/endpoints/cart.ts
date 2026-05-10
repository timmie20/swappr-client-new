import { api } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import { AddCartItemPayload, Cart, CartItem } from "@/types/cart";

export const cartEndpoints = {
  async getCart(): Promise<ApiResponse<Cart>> {
    const { data } = await api.get("/cart");
    return data;
  },

  async addToCart(payload: AddCartItemPayload): Promise<ApiResponse<CartItem>> {
    const { data } = await api.post("/cart/add", payload);
    return data;
  },

  async syncCart(
    payload: AddCartItemPayload[],
  ): Promise<ApiResponse<CartItem[]>> {
    const { data } = await api.post("/cart/add-batch", {
      items: payload,
    });
    return data;
  },

  async updateCartItem(
    itemId: string,
    quantity: number,
  ): Promise<ApiResponse<{ id: string; quantity: number }>> {
    const { data } = await api.patch(`/cart/items/${itemId}`, {
      increment: quantity,
    });
    return data;
  },

  async removeCartItem(itemId: string): Promise<ApiResponse<CartItem>> {
    const { data } = await api.delete(`/cart/items/${itemId}`);
    return data;
  },

  async clearCart(): Promise<ApiResponse<null>> {
    const { data } = await api.delete("/cart/clear");
    return data;
  },
};
