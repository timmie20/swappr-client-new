import { collectionsEndpoints } from "@/endpoints/collections";
import { queryKeys } from "@/lib/api/query-keys";
import { CollectionsQueryParams } from "@/types/collections";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import { useMemo } from "react";
import { mapApiProductToFeedProduct } from "./use-products";

export function useCollections(params?: CollectionsQueryParams) {
  return useQuery({
    queryKey: queryKeys.collections.list(),
    queryFn: () => collectionsEndpoints.getAll(),
    staleTime: Infinity,
  });
}

export function useInfiniteCollectionProducts(
  slug: string,
  params?: Omit<CollectionsQueryParams, "page">,
) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.collections.products(slug, params),

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      collectionsEndpoints.getCollectionProducts(slug, {
        ...params,
        page: pageParam,
        limit: params?.limit ?? 20,
      }),

    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.limit);

      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },

    staleTime: 60_000,
    refetchOnReconnect: true,
    placeholderData: keepPreviousData,
  });

  const collection = query.data?.pages[0]?.collection;
  const total = query.data?.pages[0]?.total;
  const facets = query.data?.pages[query.data.pages.length - 1]?.facets;

  const products = useMemo(
    () =>
      query.data?.pages.flatMap((page) =>
        page.products.map(mapApiProductToFeedProduct),
      ) ?? [],
    [query.data],
  );

  return {
    ...query,
    collection,
    products,
    total,
    facets,
  };
}
