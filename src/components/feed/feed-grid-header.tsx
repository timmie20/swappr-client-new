"use client";

import { Spinner } from "../ui/spinner";
import { FeedModeToggle } from "./feed-mode-toggle";
import { useFeedStore } from "@/store/feed-store";

interface FeedGridHeaderProps {
  resultCount: number;
  loading?: boolean;
}

export function FeedGridHeader({ resultCount, loading }: FeedGridHeaderProps) {
  const activeCategory = useFeedStore((s) => s.activeCategory);

  return (
    <div className="mb-6 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-switzer text-xl font-bold text-[#1A1A1A] sm:text-2xl">
          {activeCategory.id === "" ? "All Listings" : activeCategory.label}
        </h2>

        <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
          {loading ? (
            <span className="flex items-center gap-1">
              <Spinner />
              Loading...
            </span>
          ) : (
            `${resultCount <= 0 ? "No" : resultCount} listing${resultCount !== 1 ? "s" : ""} available`
          )}
        </p>
      </div>
      <FeedModeToggle />
    </div>
  );
}
