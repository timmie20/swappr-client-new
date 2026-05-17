import { serverFetch } from "@/lib/api/server";
import { ApiResponse } from "@/types/api";
import { CartItem } from "@/types/cart";

export async function getCart(): Promise<ApiResponse<CartItem[]>> {
  return serverFetch<ApiResponse<CartItem[]>>("/cart");
}
