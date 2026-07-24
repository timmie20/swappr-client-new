import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";

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
      username:
        product.vendor.trading_name ??
        product.vendor?.business_name ??
        "vendor",
      avatarUrl: product.vendor?.logo_url ?? undefined,
      storePhotos: product.vendor?.store_photos ?? [],
      city: product.vendor?.city ?? null,
      state: product.vendor?.state ?? null,
      rating: Number(product.vendor?.rating ?? 0),
      verified: !!product.vendor?.is_verified,
      inspectionVerified: !!product.vendor?.is_inspection_verified,
      totalSales: 0,
    },
    listed_at: product.created_at,
    specs: Object.fromEntries(
      (product.specifications ?? []).map((spec) => [spec.key, spec.value]),
    ),
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
  options?: Parameters<typeof useInfiniteQuery<ProductListResponse>>[0],
) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.products.list(params),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      productEndpoints.getAll({
        ...params,
        // pageParam is typed unknown because the options param widens the
        // TPageParam generic; initialPageParam and getNextPageParam only
        // ever produce numbers
        page: pageParam as number,
        limit: params?.limit ?? 20,
      }),
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.limit);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
    staleTime: 60_000,
    refetchOnReconnect: true,
    placeholderData: keepPreviousData,
    ...options,
  });

  const products = useMemo(
    () =>
      query.data?.pages.flatMap((page) =>
        page.products.map(mapApiProductToFeedProduct),
      ) ?? [],
    [query.data],
  );

  const facets = query.data?.pages[query.data.pages.length - 1]?.facets;
  const total = query.data?.pages[0]?.total;

  return {
    ...query,
    products,
    facets,
    total,
  };
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

/**
 * Debounced product search input state, shared by every search surface
 * (command dialog, inline navbar search, ...) so the debounce/reset
 * behavior stays in one place.
 */
export function useDebouncedProductSearch() {
  const [inputValue, setInputValueState] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Stable debounced setter across renders (lodash keeps internal timer state)
  const debouncedSetQueryRef = useRef(
    debounce((value: string) => setDebouncedQuery(value), 500),
  );

  useEffect(() => {
    const debounced = debouncedSetQueryRef.current;
    return () => {
      debounced.cancel();
    };
  }, []);

  const setInputValue = useCallback((value: string) => {
    setInputValueState(value);

    const trimmed = value.trim();
    if (trimmed.length < 2) {
      debouncedSetQueryRef.current.cancel();
      setDebouncedQuery(trimmed);
      return;
    }

    debouncedSetQueryRef.current(trimmed);
  }, []);

  const reset = useCallback(() => {
    debouncedSetQueryRef.current.cancel();
    setInputValueState("");
    setDebouncedQuery("");
  }, []);

  const { data: results = [], isLoading } = useProductSearch(debouncedQuery);

  return { inputValue, setInputValue, results, isLoading, reset };
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
