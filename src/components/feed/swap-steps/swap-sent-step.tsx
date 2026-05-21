"use client";

import { motion } from "motion/react";
import { Lottie } from "@/components/lottie";
import successCheckAnimation from "@/lottie/success-check.json";

export function SwapSentStep() {
  return (
    <motion.div
      key="sent"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 py-12 text-center"
    >
      <Lottie
        animationData={successCheckAnimation}
        autoPlay
        className="size-30"
      />

      <div>
        <h3 className="font-switzer text-lg font-bold text-[#1A1A1A]">
          Swap Offer Sent! 🎉
        </h3>
        <p className="mt-1 text-sm text-[#6B7280]">
          The seller will respond within 48 hours. We&apos;ll notify you.
        </p>
      </div>
    </motion.div>
  );
}
