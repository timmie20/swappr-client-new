import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import ProductDetailPage from "@/features/product-detail/page";
import { generateProductMetadata } from "./metadata";
import { getProduct } from "@/server-actions/product";
import { queryKeys } from "@/lib/api/query-keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 60; // ISR - revalidate every 60 seconds

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return await generateProductMetadata(slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Create a new QueryClient for this request
  const queryClient = new QueryClient();

  // Prefetch product data on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => getProduct(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <ProductDetailPage slug={slug} />
      </PageContainer>
    </HydrationBoundary>
  );
}
