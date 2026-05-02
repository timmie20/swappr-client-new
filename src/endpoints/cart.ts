import { api } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import { Cart } from "@/types/cart";

export const cartEndpoints = {
  async getCart(): Promise<ApiResponse<Cart>> {
    const { data } = await api.get("/cart");
    return data;
  },

  async addToCart(
    productId: string,
    variandId: string,
    quantity: number,
  ): Promise<ApiResponse<Cart>> {
    const { data } = await api.post("/cart/add", {
      items: [
        {
          product_id: productId,
          variant_id: variandId,
          quantity,
        },
      ],
    });
    return data;
  },

  async updateCartItem(
    itemId: string,
    quantity: number,
  ): Promise<ApiResponse<Cart>> {
    const { data } = await api.patch(`/cart/items/${itemId}`, {
      increment: quantity,
    });
    return data;
  },

  async removeCartItem(itemId: string): Promise<ApiResponse<Cart>> {
    const { data } = await api.delete(`/cart/items/${itemId}`);
    return data;
  },
};
