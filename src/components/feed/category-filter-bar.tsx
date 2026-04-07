"use client";

import { useRef } from "react";
import { useFeedStore } from "@/store/feed-store";
import { CATEGORIES } from "@/features/feed/mock-data";
import { Button } from "../ui/button";

export function CategoryFilterBar() {
  const activeCategory = useFeedStore((s) => s.activeCategory);
  const setActiveCategory = useFeedStore((s) => s.setActiveCategory);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-16 z-40 w-full border-b border-[#E5E7EB] bg-white py-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)] sm:flex sm:items-center sm:justify-center">
      <div
        ref={scrollRef}
        className="no-scrollbar flex items-center gap-4 overflow-x-auto px-4"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <Button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              variant={isActive ? "default" : "outline"}
              className="shrink-0 cursor-pointer whitespace-nowrap transition-all duration-200"
            >
              <span>{cat.icon && <cat.icon color="#F4762A" />}</span>
              <span>{cat.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
