import QuestionnairePage from "@/features/questionnaire/questionnaire-page";
import { getQuestionsByBrand } from "@/server-actions/questionnaire";
import { queryKeys } from "@/lib/api/query-keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Container from "@/components/layout/container";

type PageProps = {
  searchParams: Promise<{ brandId?: string }>;
};

// ISR - revalidate every 24 hours since questions rarely change
export const revalidate = 86400;

export default async function Page({ searchParams }: PageProps) {
  const { brandId } = await searchParams;

  if (!brandId) {
    return (
      <div className="py-12 text-center">
        <p>Brand information is required. Please go back and select a model.</p>
      </div>
    );
  }

  // Create QueryClient for this request
  const queryClient = new QueryClient();

  // Prefetch questions on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.questions.byBrand(brandId),
    queryFn: () => getQuestionsByBrand(brandId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container>
        <QuestionnairePage brandId={brandId} />
      </Container>
    </HydrationBoundary>
  );
}
