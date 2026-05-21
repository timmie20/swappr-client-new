import PageContainer from "@/components/layout/page-container";
import CollectionPage from "@/features/collections/collection-page";
import { queryKeys } from "@/lib/api/query-keys";
import { getSubCategories } from "@/server-actions/category";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () => getSubCategories(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <CollectionPage />
      </PageContainer>
    </HydrationBoundary>
  );
}
