import { serverFetch } from "@/lib/api/server";
import { ApiResponse } from "@/types/api";
import { Cart } from "@/types/cart";

export async function getCart(): Promise<ApiResponse<Cart>> {
  // revalidate: 0 — per-user data must never enter the shared fetch cache
  return serverFetch<ApiResponse<Cart>>("/cart", { revalidate: 0 });
}
