"use client";

import { motion } from "motion/react";
import type { SwapOffer } from "./swap-form-step";
import type { Valuation } from "@/types/api";

interface SwapConfirmStepProps {
  offer: SwapOffer;
  valuation: Valuation;
}

export function SwapConfirmStep({ offer, valuation }: SwapConfirmStepProps) {
  return (
    <motion.div
      key="confirm"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-4"
    >
      <h3 className="text-sm font-bold text-[#1A1A1A]">
        Confirm your swap offer
      </h3>

      {/* Valuation Details */}
      <div className="divide-y divide-[#F3F4F6] rounded-2xl border border-[#E5E7EB]">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs text-[#9CA3AF]">Brand</span>
          <span className="text-xs font-semibold text-[#1A1A1A]">
            {valuation.device.brand}
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs text-[#9CA3AF]">Model</span>
          <span className="text-xs font-semibold text-[#1A1A1A]">
            {valuation.device.model}
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs text-[#9CA3AF]">Storage</span>
          <span className="text-xs font-semibold text-[#1A1A1A]">
            {valuation.device.storage}GB
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs text-[#9CA3AF]">Estimated Value</span>
          <span className="text-primary text-xs font-bold">
            ₦{valuation.final_value.toLocaleString()}
          </span>
        </div>
        {offer.additionalNote && (
          <div className="flex flex-col gap-1 px-4 py-3">
            <span className="text-xs text-[#9CA3AF]">Additional Note</span>
            <span className="text-xs font-semibold text-[#1A1A1A]">
              {offer.additionalNote}
            </span>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#92400E]">
        By sending this offer, you agree to give the seller 48 hours to respond.
      </div>
    </motion.div>
  );
}
