import PageContainer from "@/components/layout/page-container";
import { CollectionView } from "@/features/collections/collection-view";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  return (
    <PageContainer>
      <CollectionView slug={slug} />
    </PageContainer>
  );
}
