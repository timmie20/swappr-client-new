"use client";

import { FeedModeToggle } from "./feed-mode-toggle";
import { useFeedStore } from "@/store/feed-store";

interface FeedGridHeaderProps {
  resultCount: number;
}

export function FeedGridHeader({ resultCount }: FeedGridHeaderProps) {
  const activeCategory = useFeedStore((s) => s.activeCategory);

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-switzer text-xl font-bold text-[#1A1A1A] sm:text-2xl">
          {activeCategory === "all" ? "All Listings" : activeCategory}
        </h2>
        <p className="mt-0.5 text-sm text-[#6B7280]">
          {resultCount} device{resultCount !== 1 ? "s" : ""} available
        </p>
      </div>
      <FeedModeToggle />
    </div>
  );
}
