import PageContainer from "@/components/layout/page-container";
import { CollectionSlug } from "@/features/collections/collection-slug-page";
import { queryKeys } from "@/lib/api/query-keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCollectionProducts } from "@/server-actions/collections";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: CollectionPageProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;

  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeys.collections.products(slug, { limit: 20 }),
    queryFn: ({ pageParam }) =>
      getCollectionProducts(slug, { page: pageParam, limit: 20 }),
    initialPageParam: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNextPageParam: (lastPage: any) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.limit);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
    staleTime: 60_000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <CollectionSlug slug={slug} />
      </PageContainer>
    </HydrationBoundary>
  );
}
