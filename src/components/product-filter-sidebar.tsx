"use client";

import { useState } from "react";
import { IconFilter } from "@tabler/icons-react";
import ProductFilter from "@/components/product-filter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useProductFilters } from "@/hooks/use-product-filters";
import { cn } from "@/lib/utils";
import type { ProductFacets } from "@/types/product";

interface ProductFilterSidebarProps {
  facets?: ProductFacets;
  loading?: boolean;
}

export function ProductFilterSidebar({
  facets,
  loading,
}: ProductFilterSidebarProps) {
  const [open, setOpen] = useState(false);
  const { categories, subcategories, brand, condition, minPrice, maxPrice } =
    useProductFilters();

  const hasSelection =
    categories.length > 0 ||
    subcategories.length > 0 ||
    !!brand ||
    !!condition ||
    minPrice != null ||
    maxPrice != null;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden shrink-0 lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-10rem)] lg:min-h-100 lg:w-64 lg:overflow-y-auto">
        <ProductFilter facets={facets} loading={loading} />
      </aside>

      {/* Mobile floating trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open filters"
        className={cn(
          "bg-primary text-primary-foreground fixed bottom-6 left-4 z-40 flex size-12 items-center justify-center rounded-full shadow-lg lg:hidden",
        )}
      >
        <IconFilter size={20} />
        {hasSelection && (
          <span className="border-background absolute top-0 right-0 size-3 rounded-full border-2 bg-red-500" />
        )}
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="flex flex-col overflow-y-auto p-0">
          <SheetHeader className="border-border border-b">
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription className="sr-only">
              Filter products by category, brand, condition and price
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <ProductFilter facets={facets} loading={loading} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
