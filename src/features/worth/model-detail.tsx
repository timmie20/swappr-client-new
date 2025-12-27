"use client";

import { useModelBySlugSuspense } from "@/hooks";
import { Button } from "@/components/ui/button";

import { formatStorageCapacity } from "@/lib/format";
import Link from "next/link";
import Image from "next/image";
import WorthOverviewCard from "./component/worth-overview";
import { useState } from "react";

type ModelDetailProps = {
  slug: string;
};

export function ModelDetail({ slug }: ModelDetailProps) {
  const { data: model } = useModelBySlugSuspense(slug);
  const [selectedVariationId, setSelectedVariationId] = useState<string | null>(
    model.variations?.[0]?.id || null,
  );

  const handleSelect = (id: string) => {
    setSelectedVariationId(id);
  };

  return (
    <div className="mx-auto mt-6 max-w-163.75 space-y-5 md:space-y-10">
      <div className="bg-yellow-light/10 mx-auto flex h-fit w-full max-w-163.75 items-center gap-2 rounded-lg py-2">
        <Image
          src="../assets/icons/Vector.svg"
          alt="Warning icon"
          width={16}
          height={16}
          className="ml-4"
        />
        <span className="text-xs font-medium text-[#9C7E1C]">
          We&apos;re going to ask you a couple of questions to estimate how much
          your phone&apos;s worth. This&apos;ll only take 3mins :)
        </span>
      </div>

      <WorthOverviewCard model={model} selected={selectedVariationId} />

      <div className="space-y-4">
        <p className="text-small">{model.desc}</p>
        <h3 className="text-tertiary/48 text-xl">
          Available storage for this model
        </h3>
        <p className="text-small">
          Choose your device&apos;s storage capacity below. The estimated value
          will automatically adjust based on your selection.
        </p>

        <div className="flex flex-wrap gap-3 overflow-hidden px-1 py-2">
          {model.variations?.map((variation) => (
            <Button
              key={variation.id}
              variant={
                selectedVariationId === variation.id ? "default" : "outline"
              }
              onClick={() => handleSelect(variation.id)}
            >
              {formatStorageCapacity(variation.storage_capacity)}
            </Button>
          ))}
        </div>
      </div>

      <Link href={`/check-worth/form`}>
        <Button size="lg" className="w-full sm:w-fit">
          Check your phones worth{" "}
        </Button>
      </Link>
    </div>
  );
}
