import PageContainer from "@/components/layout/page-container";
import { CollectionSlug } from "@/features/collections/collection-slug-page";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: CollectionPageProps) {
  const { slug } = await params;
  return (
    <PageContainer>
      <CollectionSlug slug={slug} />
    </PageContainer>
  );
}
