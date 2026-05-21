import { Suspense } from "react";
import { ModelDetailSkeleton } from "@/components/skeletons/model-detail-skeleton";
import { ModelDetail } from "@/features/worth/model-detail";
import Container from "@/components/layout/container";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CheckWorthModelPage(props: PageProps) {
  const { slug } = await props.params;

  return (
    <Container>
      <div className="mt-8 sm:px-6">
        <Suspense fallback={<ModelDetailSkeleton />}>
          <ModelDetail slug={slug} />
        </Suspense>
      </div>
    </Container>
  );
}
