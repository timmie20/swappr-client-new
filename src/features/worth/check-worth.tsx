"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Brand } from "@/lib/api/types";
import { Suspense, useState } from "react";
import Heading from "@/components/shared/heading";
import ModelsList from "./component/models-list";
import ModelsListSkeleton from "@/components/skeletons/model-list-skeleton";

type CheckWorthProps = {
  brands: Brand[];
};

export default function CheckWorth({ brands }: CheckWorthProps) {
  const [brandId, setBrandId] = useState<string>(brands[0].id);

  return (
    <div className="py-12 sm:px-6">
      <div className="text-center">
        <Heading>Find out how much your device is worth</Heading>
      </div>

      <div className="mt-6 flex justify-center">
        <Select value={brandId} onValueChange={setBrandId}>
          <SelectTrigger className="w-56" defaultValue={brandId}>
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.length > 0 ? (
              brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.brand_name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-brands" disabled>
                No brands available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {brandId ? (
        <Suspense key={brandId} fallback={<ModelsListSkeleton />}>
          <ModelsList brandId={brandId} />
        </Suspense>
      ) : (
        <div className="my-10 text-center text-gray-400">
          Select a brand to view available models
        </div>
      )}
    </div>
  );
}
