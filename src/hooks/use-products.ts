import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
  type UseInfiniteQueryOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { productEndpoints } from "@/endpoints";
import { queryKeys } from "@/lib/api/query-keys";
import type { PaginationParams } from "@/types/api";
import {
  ProductMode,
  type ProductDetail,
  type ProductListResponse,
  type ProductDetailResponse,
} from "@/types/product";
import type { Product } from "@/features/feed/types";

export function mapApiProductToFeedProduct(product: ProductDetail): Product {
  const variants = product.variants ?? [];
  const imageUrl = product.images?.[0] ?? "";
  const numericPrice = Number(product.base_price) || 0;

  return {
    id: product.id,
    brand: product.brand?.brand_name ?? "Unknown",
    name: product.name,
    slug: product.slug,
    title: product.name,
    description: product.description,
    imageUrl,
    images: product.images ?? [],
    price: numericPrice,
    rating: Number(product.vendor?.rating ?? 0),
    reviewCount: 0,
    colors: variants.map((variant) => ({
      name: variant.color,
      hex: "#9CA3AF",
    })),
    storage: [...new Set(variants.map((variant) => variant.storage))],
    condition:
      product.condition === "NEW"
        ? "New"
        : product.condition === "UK_USED"
          ? "UK Used"
          : product.condition === "NIGERIAN_USED"
            ? "Nigerian Used"
            : "Refurbished",
    mode:
      product.mode === ProductMode.SALE
        ? "sale"
        : product.mode === ProductMode.SALE_SWAP
          ? "sale_swap"
          : "all",
    swapStatus: product.is_swappable ? "available" : "none",
    category: product.category?.name || "all",
    subCategory: product.subcategory ? product.subcategory.name : undefined,
    seller: {
      id: product.vendor?.id ?? "",
      username: product.vendor?.business_name ?? "vendor",
      rating: Number(product.vendor?.rating ?? 0),
      verified: !!product.vendor?.is_verified,
      totalSales: 0,
    },
    listed_at: product.created_at,
    specs: product.specifications,
    isSoldOut: product.total_stock <= 0 && product.status === "out_of_stock",
  };
}

export function useProducts(
  params?: PaginationParams,
  options?: Omit<UseQueryOptions<ProductListResponse>, "queryKey" | "queryFn">,
) {
  return useQuery<ProductListResponse>({
    queryKey: queryKeys.products.list(params),
    queryFn: () =>
      productEndpoints.getAll({
        ...params,
        page: params?.page ?? 1,
        limit: params?.limit ?? 20,
      }),
    staleTime: 60_000, // 1 minute
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useInfiniteProducts(
  params?: Omit<PaginationParams, "page">,
  options?: Omit<
    UseInfiniteQueryOptions<
      ProductListResponse,
      Error,
      InfiniteData<ProductListResponse>,
      readonly ["products", "list", PaginationParams?],
      number
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >,
) {
  return useInfiniteQuery({
    queryKey: queryKeys.products.list(params),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      productEndpoints.getAll({
        ...params,
        page: pageParam,
        limit: params?.limit ?? 20,
      }),

    getNextPageParam: (lastPage) => {
      const { page, total } = lastPage;
      const totalPages = Math.ceil(total / lastPage.limit);
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 60_000, // 1 minute
    ...options,
  });
}

export function useProductSearch(
  query: string,
  options?: Omit<
    UseQueryOptions<ProductListResponse, Error, Product[]>,
    "queryKey" | "queryFn" | "select"
  >,
) {
  return useQuery<ProductListResponse, Error, Product[]>({
    queryKey: ["products", "search", query], // completely separate key from feed
    queryFn: () => productEndpoints.search(query),
    enabled: query.trim().length > 1, // don't fire on empty or single char
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: keepPreviousData,
    select: (data) => data.products.map(mapApiProductToFeedProduct), // map to feed product shape
    ...options,
  });
}

export function useProduct(
  slug: string,
  options?: Omit<
    UseQueryOptions<ProductDetailResponse>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery<ProductDetailResponse>({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => productEndpoints.getBySlug(slug),
    staleTime: 60_000, // 1 minute
    ...options,
  });
}
