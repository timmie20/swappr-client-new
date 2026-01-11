"use client";

import { Model, PaginatedResponse } from "@/types/api";
import ModelCard from "./model-card";

type ModelsListProps = {
  models: PaginatedResponse<Model, "models">;
};

export default function ModelsList({ models }: ModelsListProps) {
  return (
    <div className="my-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {models?.models?.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  );
}
