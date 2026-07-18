"use client";

import { useRef } from "react";
import { useFeedStore } from "@/store/feed-store";
import { Button } from "../ui/button";
import { usePrimaryCategories } from "@/hooks/use-categories";

export function CategoryFilterBar() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data } = usePrimaryCategories();
  const { activeCategory, setActiveCategory } = useFeedStore();

  const categories =
    data?.categories
      ?.filter((sub) => sub.slug)
      .map((sub) => ({
        label: sub.name,
        value: sub.slug as string,
      })) ?? [];

  const categoriesToDisplay = [{ label: "All", value: "" }, ...categories];

  return (
    <div className="top-16 z-40 w-full min-w-0 py-3">
      <div
        ref={scrollRef}
        className="no-scrollbar flex w-full min-w-0 items-center gap-4 overflow-x-auto px-4 sm:justify-center"
      >
        {categoriesToDisplay.map((cat) => {
          const isActive = activeCategory?.slug === cat.value;
          return (
            <Button
              key={cat.value || "all"}
              onClick={() =>
                setActiveCategory({ slug: cat.value, label: cat.label })
              }
              variant={isActive ? "default" : "outline"}
              className="shrink-0 cursor-pointer whitespace-nowrap transition-all duration-200"
            >
              <span>{cat.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
