import { serverFetch } from "@/lib/api/server";
import { ProductListResponse, ProductDetailResponse } from "@/types/product";
import { PaginationParams } from "@/lib/api/types";

export const getProducts = async (
  params?: PaginationParams,
): Promise<ProductListResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return serverFetch<ProductListResponse>("/products", params as any);
};

export const getProduct = async (
  slug: string,
): Promise<ProductDetailResponse> => {
  return serverFetch<ProductDetailResponse>(`/products/slug/${slug}`);
};
