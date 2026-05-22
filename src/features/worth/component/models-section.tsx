"use client";

import { useModelsSuspense } from "@/hooks";
import ModelsList from "./models-list";
import { EmptyState } from "@/components/empty-state";

type ModelsSectionProps = {
  brandId: string;
};

export default function ModelsSection({ brandId }: ModelsSectionProps) {
  const { data: modelsData } = useModelsSuspense<"models">({
    brand_id: brandId || undefined,
  });

  if (modelsData.models.length === 0) {
    return (
      <EmptyState
        title="No models yet"
        description="This brand has no registered models"
        variant="lottie"
        lottieType="ghost"
      />
    );
  }

  return <ModelsList models={modelsData} />;
}
