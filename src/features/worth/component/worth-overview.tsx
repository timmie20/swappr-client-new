import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { formatNaira } from "@/lib/format";
import { Model } from "@/types/api";
import Image from "next/image";
import React from "react";

export default function WorthOverviewCard({
  model,
  selected,
}: {
  model: Model;
  selected: string | null;
}) {
  const selectedVariation = model.variations?.find(
    (variation) => variation.id === selected,
  );

  return (
    <div className="flex w-full flex-col gap-5 sm:flex-row">
      <Card className="bg-gray-light flex h-fit w-full p-6 sm:max-w-102.5 sm:shrink-0 sm:p-10">
        <CardContent>
          <Image
            src="/assets/images/iphone16.png"
            alt={`image of ${model.model_name}`}
            width={230}
            height={281}
            className="h-auto w-auto max-w-full object-contain"
          />
        </CardContent>
      </Card>

      <div className="space-y-2 sm:space-y-3 sm:self-end">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex flex-col">
            <span className="text-tertiary/42 text-sm font-medium tracking-tight">
              Brand
            </span>
            <span className="text-tertiary text-base font-medium tracking-tight">
              {model.brand?.brand_name}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-tertiary/42 text-sm font-medium tracking-tight">
              Model
            </span>
            <span className="text-tertiary text-base font-medium tracking-tight">
              {model.model_name}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-tertiary/42 text-sm font-medium tracking-tight">
            Estimated value
          </span>
          <span className="text-tertiary text-3xl font-semibold tracking-tight sm:text-3xl">
            {formatNaira(selectedVariation?.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
