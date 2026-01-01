"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Brand } from "@/types/api";
import { useState, Suspense } from "react";
import Heading from "@/components/shared/heading";
import ModelsSection from "./component/models-section";
import ModelsListSkeleton from "@/components/skeletons/model-list-skeleton";

type CheckWorthProps = {
  brands: Brand[];
};

export default function CheckWorth({ brands }: CheckWorthProps) {
  const [brandId, setBrandId] = useState<string>("");

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

      <Suspense fallback={<ModelsListSkeleton />}>
        <ModelsSection brandId={brandId} />
      </Suspense>
    </div>
  );
}
