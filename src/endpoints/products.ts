/**
 * Product API Endpoints
 */

import { api } from "@/lib/api/client";
import type { ProductDetailResponse } from "@/types/product";

export const productEndpoints = {
  async getBySlug(slug: string): Promise<ProductDetailResponse> {
    const { data } = await api.get<ProductDetailResponse>(`/products/${slug}`);
    return data;
  },

  async getById(id: string): Promise<ProductDetailResponse> {
    const { data } = await api.get<ProductDetailResponse>(`/products/${id}`);
    return data;
  },
};
