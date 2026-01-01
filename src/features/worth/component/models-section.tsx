"use client";

import { useModelsSuspense } from "@/hooks";
import ModelsList from "./models-list";
import GhostLoading from "@/components/ghost-loading";

type ModelsSectionProps = {
  brandId: string;
};

export default function ModelsSection({ brandId }: ModelsSectionProps) {
  const { data: modelsData } = useModelsSuspense<"models">({
    brand_id: brandId || undefined,
  });

  if (modelsData.models.length === 0) {
    return <GhostLoading />;
  }

  return <ModelsList models={modelsData} />;
}
