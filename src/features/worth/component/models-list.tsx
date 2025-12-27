"use client";

import { useModelsByBrandSuspense } from "@/hooks";
import { Model } from "@/types/api";
import ModelCard from "./model-card";

type ModelsListProps = {
  brandId: string;
};

export default function ModelsList({ brandId }: ModelsListProps) {
  const { data: modelsData } = useModelsByBrandSuspense(brandId);

  const models: Model[] = modelsData?.models || [];

  if (models.length === 0) {
    return (
      <div className="my-10 text-center text-gray-500">
        No models available for this brand
      </div>
    );
  }

  return (
    <div className="my-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {models.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  );
}
