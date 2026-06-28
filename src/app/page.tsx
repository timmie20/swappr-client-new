import PageContainer from "@/components/layout/page-container";
import { FeedPage } from "@/features/feed";
import { queryKeys } from "@/lib/api/query-keys";
import { getProducts } from "@/server-actions/product";
import { getCart } from "@/server-actions/cart";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPrimaryCategories } from "@/server-actions/category";

export const revalidate = 60;

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () => getPrimaryCategories(),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.cart.lists(),
    queryFn: () => getCart(),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeys.products.list({ limit: 20 }), // no page — matches hook's key shape
    queryFn: ({ pageParam }) => getProducts({ page: pageParam, limit: 20 }),
    initialPageParam: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNextPageParam: (lastPage: any) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.limit);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <FeedPage />
      </PageContainer>
    </HydrationBoundary>
  );
}
