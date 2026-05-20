"use client";

import { useRef } from "react";
import { useFeedStore } from "@/store/feed-store";
import { Button } from "../ui/button";
import { useSubCategories } from "@/hooks/use-categories";

export function CategoryFilterBar() {
  const activeSubCategoryId = useFeedStore((s) => s.activeSubCategoryId);
  const setActiveSubCategory = useFeedStore((s) => s.setActiveSubCategory);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data } = useSubCategories();

  const subCategories = data?.subCategories?.map((sub) => ({
    label: sub.name,
    value: sub.id,
  })) as Array<{
    label: string;
    value: string;
    icon?: React.ComponentType<{ color?: string }>;
  }>;

  const categoriesToDisplay = [{ label: "All", value: "" }, ...subCategories];

  return (
    <div className="top-16 z-40 w-full py-3 sm:flex sm:items-center sm:justify-center">
      <div
        ref={scrollRef}
        className="no-scrollbar flex items-center gap-4 overflow-x-auto px-4"
      >
        {categoriesToDisplay.map((cat) => {
          const isActive = activeSubCategoryId === cat.value;
          return (
            <Button
              key={cat.value || "all"}
              onClick={() =>
                setActiveSubCategory({ id: cat.value, label: cat.label })
              }
              variant={isActive ? "default" : "outline"}
              className="shrink-0 cursor-pointer whitespace-nowrap transition-all duration-200"
            >
              {/* <span>{cat.icon && <cat.icon color="#F4762A" />}</span> */}
              <span>{cat.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
