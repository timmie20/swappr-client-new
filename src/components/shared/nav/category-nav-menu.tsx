"use client";

import * as React from "react";
import Link from "next/link";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

import { useCategories } from "@/hooks/use-categories";
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from "@/lib/category-icons";
import { productsHref } from "@/lib/category-nav";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CategoryNavMenu() {
  const [open, setOpen] = React.useState(false);
  const [activeCategoryId, setActiveCategoryId] = React.useState<
    string | null
  >(null);
  const { data, isLoading, isError } = useCategories();

  const categories = data?.categories ?? [];
  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) ?? categories[0];

  const disabled = isLoading || isError || categories.length === 0;

  const close = () => setOpen(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        aria-label="All categories"
        className={cn(
          navigationMenuTriggerStyle(),
          "shrink-0 gap-1.5 whitespace-nowrap",
          disabled && "text-muted-foreground cursor-not-allowed opacity-50",
        )}
      >
        <Icons.category size={17} />
        All categories
        <IconChevronDown
          size={13}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </PopoverTrigger>

      {!disabled && (
        <PopoverContent className="w-160 p-4">
          <div className="flex gap-0">
            <div
              role="tablist"
              aria-label="Categories"
              className="flex w-50 shrink-0 flex-col gap-0.5 overflow-y-auto border-r pr-3"
            >
              {categories.map((category) => {
                const CategoryIcon =
                  CATEGORY_ICONS[category.slug] ?? DEFAULT_CATEGORY_ICON;
                const isActive = category.id === activeCategory?.id;

                return (
                  <button
                    key={category.id}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onMouseEnter={() => setActiveCategoryId(category.id)}
                    onFocus={() => setActiveCategoryId(category.id)}
                    onClick={() => setActiveCategoryId(category.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px]",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    <CategoryIcon
                      size={16}
                      className={cn(
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    {category.name}
                    <IconChevronRight
                      size={13}
                      className="text-muted-foreground ml-auto"
                    />
                  </button>
                );
              })}
            </div>

            {activeCategory && (
              <div className="min-w-0 flex-1 pl-5">
                <Link
                  href={productsHref({ categorySlug: activeCategory.slug })}
                  onClick={close}
                  className="mb-3 block text-sm font-medium"
                >
                  {activeCategory.name}
                </Link>
                <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                  {activeCategory.sub_categories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={productsHref({
                        categorySlug: activeCategory.slug,
                        subcategorySlug: sub.slug,
                      })}
                      onClick={close}
                      className="text-muted-foreground hover:text-foreground text-[13px]"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-3.5 flex items-center gap-2 border-t pt-3">
            <Icons.exchange size={16} className="text-muted-foreground" />
            <Link
              href="/check-worth"
              onClick={close}
              className="text-foreground text-[13px]"
            >
              Trade in your old device instead
            </Link>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
