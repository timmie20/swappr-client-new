"use client";

import { motion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";

export function SwapSentStep() {
  return (
    <motion.div
      key="sent"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          damping: 12,
          stiffness: 200,
          delay: 0.1,
        }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F5F1]"
      >
        <IconCheck size={36} className="text-[#1A6B5A]" />
      </motion.div>
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
