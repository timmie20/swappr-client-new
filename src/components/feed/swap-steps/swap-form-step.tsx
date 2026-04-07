"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { Product } from "@/features/feed/types";
import type { Valuation } from "@/types/api";
import { useValuations } from "@/hooks/use-valuation";
import { EmptyState } from "@/components/empty-state";
import { IconDeviceMobile } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/error-state";

export interface SwapOffer {
  valuationId: string;
  additionalNote: string;
}

interface SwapFormStepProps {
  product: Product;
  offer: SwapOffer;
  onOfferChange: (offer: SwapOffer) => void;
  selectedValuation: Valuation | null;
  onValuationSelect: (valuation: Valuation) => void;
}

export function SwapFormStep({
  offer,
  onOfferChange,
  selectedValuation,
  onValuationSelect,
}: SwapFormStepProps) {
  const { data: valuations, isLoading, error } = useValuations();

  if (isLoading) {
    return (
      <motion.div
        key="form"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col gap-4"
      >
        <p className="text-muted-foreground text-sm font-semibold">
          Loading your valuations...
        </p>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl bg-[#F3F4F6]"
            />
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        key="form"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col gap-4"
      >
        <ErrorState
          title="Unable to load valuations"
          description="There was an error loading your valuation history. Please try again."
        />
        <div className="flex justify-center">
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!valuations || valuations.length === 0) {
    return (
      <motion.div
        key="form"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col gap-4"
      >
        <EmptyState
          icon={<IconDeviceMobile className="size-6" />}
          title="No valuations yet"
          description="Check your device worth to create a valuation that you can use for swap offers."
        />
        <div className="flex justify-center">
          <Link href="/check-worth">
            <Button variant="outline">Check Device Worth</Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-4"
    >
      <p className="text-muted-foreground text-sm font-semibold">
        Select a device from your valuation history
      </p>

      {/* Valuations List */}
      <div className="flex flex-col gap-2">
        {valuations.map((valuation) => (
          <ValuationCard
            key={valuation.id}
            valuation={valuation}
            isSelected={selectedValuation?.id === valuation.id}
            onSelect={() => {
              onValuationSelect(valuation);
              onOfferChange({ ...offer, valuationId: valuation.id });
            }}
          />
        ))}
      </div>

      {/* Additional Notes */}
      {selectedValuation && (
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#374151]">
            Additional Note (optional)
          </label>
          <textarea
            value={offer.additionalNote}
            onChange={(e) =>
              onOfferChange({ ...offer, additionalNote: e.target.value })
            }
            placeholder="Any extra info about your device or the swap..."
            rows={3}
            className="focus:border-primary focus:ring-primary/20 w-full resize-none rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#1A1A1A] placeholder-[#9CA3AF] transition-all outline-none focus:ring-2"
          />
        </div>
      )}
    </motion.div>
  );
}

interface ValuationCardProps {
  valuation: Valuation;
  isSelected: boolean;
  onSelect: () => void;
}

function ValuationCard({
  valuation,
  isSelected,
  onSelect,
}: ValuationCardProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <button
      onClick={onSelect}
      className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
        isSelected
          ? "border-primary ring-primary/20 bg-primary/5 ring-2"
          : "hover:border-primary/50 border-[#E5E7EB] bg-white hover:bg-[#F9FAFB]"
      }`}
    >
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wide text-[#9CA3AF] uppercase">
            {valuation.device.brand}
          </span>
          <span className="text-[10px] text-[#D1D5DB]">•</span>
          <span className="text-xs text-[#6B7280]">
            {valuation.device.storage}GB
          </span>
        </div>
        <p className="text-sm font-bold text-[#1A1A1A]">
          {valuation.device.model}
        </p>
        <p className="text-[11px] text-[#9CA3AF]">
          {formatDate(valuation.created_at)}
        </p>
      </div>

      <div
        className={`rounded-lg px-3 py-1.5 ${
          isSelected ? "bg-primary" : "bg-[#F3F4F6]"
        }`}
      >
        <p
          className={`text-xs font-bold ${
            isSelected ? "text-white" : "text-primary"
          }`}
        >
          ₦{valuation.final_value.toLocaleString()}
        </p>
      </div>
    </button>
  );
}
