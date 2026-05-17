import PageContainer from "@/components/layout/page-container";
import { FeedPage } from "@/features/feed";
import { queryKeys } from "@/lib/api/query-keys";
import { getProducts } from "@/server-actions/product";
import { getSubCategories } from "@/server-actions/category";
import { getCart } from "@/server-actions/cart";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const revalidate = 60;

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () => getSubCategories(),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.cart.lists(),
    queryFn: () => getCart(),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.list({ page: 1, limit: 20 }),
    queryFn: () =>
      getProducts({
        page: 1,
        limit: 20,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <FeedPage />
      </PageContainer>
    </HydrationBoundary>
  );
}
