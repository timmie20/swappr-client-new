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
    data?.categories?.map((sub) => ({
      label: sub.name,
      value: sub.id,
    })) ?? [];

  const categoriesToDisplay = [{ label: "All", value: "" }, ...categories];

  return (
    <div className="top-16 z-40 w-full py-3 sm:flex sm:items-center sm:justify-center">
      <div
        ref={scrollRef}
        className="no-scrollbar flex items-center gap-4 overflow-x-auto px-4"
      >
        {categoriesToDisplay.map((cat) => {
          const isActive = activeCategory?.id === cat.value;
          return (
            <Button
              key={cat.value || "all"}
              onClick={() =>
                setActiveCategory({ id: cat.value, label: cat.label })
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
