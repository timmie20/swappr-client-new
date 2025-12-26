"use client";

import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import AppleIcon from "@/components/icon/apple-icon";
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
import { useModelsByBrand } from "@/hooks";
import { Model } from "@/types/api";

type CheckWorthProps = {
  brands: Brand[];
};

export default function CheckWorth({ brands }: CheckWorthProps) {
  const [brandId, setBrandId] = useState<string>(brands[0].id);

  const { data: modelsData, isLoading } = useModelsByBrand(brandId);

  const models: Model[] = modelsData?.models || [];

  return (
    <div className="py-12 sm:px-6">
      <div className="w-full text-center">
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

      {isLoading && brandId && (
        <div className="my-10 text-center text-gray-500">Loading models...</div>
      )}

      {!isLoading && models.length > 0 && (
        <div className="my-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {models.map((model) => (
            <Link key={model.id} href={`/check-worth/${model.id}`}></Link>
          ))}
        </div>
      )}

      {!isLoading && brandId && models.length === 0 && (
        <div className="my-10 text-center text-gray-500">
          No models available for this brand
        </div>
      )}

      {!brandId && (
        <div className="my-10 text-center text-gray-400">
          Select a brand to view available models
        </div>
      )}
    </div>
  );
}
