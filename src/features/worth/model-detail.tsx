"use client";

import { useModelBySlugSuspense } from "@/hooks";
import { Button } from "@/components/ui/button";
import { formatStorageCapacity } from "@/lib/format";
import {
  saveQuestionnaireContext,
  getQuestionnaireContext,
} from "@/lib/cookies";
import Image from "next/image";
import WorthOverviewCard from "./component/worth-overview";
import { useState } from "react";
import GoRack from "@/components/route-back-btn";
import { useRouter } from "next/navigation";
import { useQuestionsByModel } from "@/hooks/use-questions";
import { useQuestionStore } from "@/store/question-store";
import { toast } from "sonner";
import PageLoader from "@/components/page-loader";

type ModelDetailProps = {
  slug: string;
};

export function ModelDetail({ slug }: ModelDetailProps) {
  const { data: model } = useModelBySlugSuspense(slug);
  const router = useRouter();

  // Check if there's a saved variation in cookies, otherwise use first variation
  const getSavedOrDefaultVariation = () => {
    const context = getQuestionnaireContext();

    // If we have saved context and it matches this model, use saved variation
    if (context && context.modelId === model.id) {
      // Verify the saved variation exists in this model
      const variationExists = model.variations?.some(
        (v) => v.id === context.variationId,
      );
      if (variationExists) {
        return context.variationId;
      }
    }

    // Default to first variation
    return model.variations?.[0]?.id || null;
  };

  const [selectedVariationId, setSelectedVariationId] = useState<string | null>(
    () => getSavedOrDefaultVariation(),
  );

  const initializeQuestions = useQuestionStore((s) => s.initializeQuestions);

  // Fetch questions using React Query hook
  const { refetch: refetchQuestions, isFetching: isLoadingQuestions } =
    useQuestionsByModel(model.brand?.id || "", {
      enabled: false, // Don't fetch automatically, only on button click
    });

  const handleSelect = (id: string) => {
    setSelectedVariationId(id);
  };

  const handleCheckWorth = async () => {
    if (!selectedVariationId) {
      toast.error("Please select a storage capacity");
      return;
    }

    if (!model.brand?.id) {
      toast.error("Brand information is missing");
      return;
    }

    try {
      // Fetch questions for this brand
      const { data: response } = await refetchQuestions();
      if (!response?.questions || response.questions.length === 0) {
        toast.error("No questions available for this device");
        return;
      }

      // Initialize questions in store
      initializeQuestions(response.questions);

      // Save model and variation to cookies
      saveQuestionnaireContext(model.id, selectedVariationId);

      // Navigate to questionnaire
      router.push(
        `/check-worth/${slug}/questionnaire?brandId=${model.brand.id}`,
      );
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      toast.error("Failed to load questions. Please try again.");
    }
  };

  return (
    <>
      {/* <PageLoader
        isLoading={isLoadingQuestions}
        text="Loading questions, Hang on..."
      /> */}

      <div className="mx-auto max-w-170 pb-6">
        <GoRack />

        <div className="bg-yellow-light/10 mx-auto mb-4 flex h-fit w-full items-center gap-2 rounded-lg py-2 pr-2">
          <Image
            src="../assets/icons/Vector.svg"
            alt="Warning icon"
            width={16}
            height={16}
            className="ml-2"
          />
          <span className="text-xs font-medium text-[#9C7E1C]">
            We&apos;re going to ask you a couple of questions to estimate how
            much your phone&apos;s worth. This&apos;ll only take 3minutes :)
          </span>
        </div>

        <WorthOverviewCard model={model} selected={selectedVariationId} />

        <div className="mt-6 space-y-2">
          <p className="text-small">{model.desc}</p>
          <h3 className="text-tertiary/48 text-xl">
            Available storage for this model
          </h3>
          <p className="text-small">
            Choose your device&apos;s storage capacity below. The estimated
            value will automatically adjust based on your selection. To begin
            click the start assessment button 👇.
          </p>

          <div className="mb-4 flex flex-wrap gap-3 overflow-hidden px-1 py-2 sm:px-0">
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

        <Button
          size="lg"
          className="w-full sm:w-fit"
          onClick={handleCheckWorth}
          disabled={!selectedVariationId || isLoadingQuestions}
        >
          {isLoadingQuestions ? "Loading questions..." : "Start assessment"}
        </Button>
      </div>
    </>
  );
}
