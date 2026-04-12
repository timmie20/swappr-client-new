/**
 * Product API Endpoints
 */

import { api } from "@/lib/api/client";
import type { PaginationParams } from "@/types/api";
import type {
  ProductDetailResponse,
  ProductListResponse,
} from "@/types/product";

export const productEndpoints = {
  async getAll(params?: PaginationParams): Promise<ProductListResponse> {
    const { data } = await api.get<ProductListResponse>("/products", {
      params,
    });
    return data;
  },

  async getBySlug(slug: string): Promise<ProductDetailResponse> {
    const { data } = await api.get<ProductDetailResponse>(
      `/products/slug/${slug}`,
    );
    return data;
  },

  async getById(id: string): Promise<ProductDetailResponse> {
    const { data } = await api.get<ProductDetailResponse>(`/products/${id}`);
    return data;
  },
};

// ── Server version (used in ISR prefetchQuery) ──────────────────
// Called only in Server Components / page.tsx
