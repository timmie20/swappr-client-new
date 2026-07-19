"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { useProductFilters } from "@/hooks/use-product-filters";
import { deslug, formatNaira } from "@/lib/format";
import type { ProductFacets } from "@/types/product";

interface ProductFilterProps {
  facets?: ProductFacets;
  /** True only while the very first product request is in flight (no data to derive facets from yet). */
  loading?: boolean;
}

function FacetRow({
  id,
  label,
  count,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  count: number;
  checked: boolean;
  onCheckedChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
        <Label htmlFor={id}>{label}</Label>
      </div>
      <span className="text-sm">({count})</span>
    </div>
  );
}

function PriceFacet({
  range,
  minPrice,
  maxPrice,
  onCommit,
}: {
  range: { min: number; max: number };
  minPrice: number | null;
  maxPrice: number | null;
  onCommit: (min: number, max: number) => void;
}) {
  const bounds = { minPrice, maxPrice, min: range.min, max: range.max };
  const [prevBounds, setPrevBounds] = useState(bounds);
  const [value, setValue] = useState<[number, number]>([
    minPrice ?? range.min,
    maxPrice ?? range.max,
  ]);

  if (
    prevBounds.minPrice !== bounds.minPrice ||
    prevBounds.maxPrice !== bounds.maxPrice ||
    prevBounds.min !== bounds.min ||
    prevBounds.max !== bounds.max
  ) {
    setPrevBounds(bounds);
    setValue([minPrice ?? range.min, maxPrice ?? range.max]);
  }

  if (range.min >= range.max) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 px-1 py-1">
      <Slider
        min={range.min}
        max={range.max}
        value={value}
        onValueChange={(v) => setValue(v as [number, number])}
        onValueCommit={(v) => onCommit(v[0], v[1])}
      />
      <div className="text-muted-foreground flex justify-between text-xs">
        <span>{formatNaira(value[0])}</span>
        <span>{formatNaira(value[1])}</span>
      </div>
    </div>
  );
}

export default function ProductFilter({
  facets,
  loading = false,
}: ProductFilterProps) {
  const {
    categories: selectedCategories,
    subcategories: selectedSubcategories,
    brand: selectedBrand,
    condition: selectedCondition,
    minPrice,
    maxPrice,
    toggleCategory,
    toggleSubcategory,
    toggleBrand,
    toggleCondition,
    setPriceRange,
    clearAll,
  } = useProductFilters();

  const categories = facets?.categories ?? [];
  const subcategories = facets?.subcategories ?? [];
  const brands = facets?.brands ?? [];
  const conditions = facets?.conditions ?? [];
  const priceRange = facets?.price_range;

  const hasSelection =
    selectedCategories.length > 0 ||
    selectedSubcategories.length > 0 ||
    !!selectedBrand ||
    !!selectedCondition ||
    minPrice != null ||
    maxPrice != null;

  const hasAnyFacets =
    categories.length > 0 ||
    subcategories.length > 0 ||
    brands.length > 0 ||
    conditions.length > 0 ||
    !!priceRange;

  if (loading && !hasAnyFacets) {
    return (
      <div className="flex w-full flex-col gap-3 rounded-2xl border p-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  if (!hasAnyFacets) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-medium">Filters</span>
        {hasSelection && (
          <Button
            size="sm"
            variant="link"
            className="cursor-pointer px-0"
            onClick={clearAll}
          >
            Clear filters
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={[
          "categories",
          "subcategories",
          "brands",
          "conditions",
          "price",
        ]}
      >
          {categories.length > 0 && (
            <AccordionItem value="categories">
              <AccordionTrigger>Categories</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3">
                  {categories.map((category) => (
                    <FacetRow
                      key={category.id}
                      id={`category-${category.id}`}
                      label={category.name}
                      count={category.count}
                      checked={selectedCategories.includes(
                        category.filter_value,
                      )}
                      onCheckedChange={() =>
                        toggleCategory(category.filter_value)
                      }
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {subcategories.length > 0 && (
            <AccordionItem value="subcategories">
              <AccordionTrigger>Subcategories</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3">
                  {subcategories.map((subcategory) => (
                    <FacetRow
                      key={subcategory.id}
                      id={`subcategory-${subcategory.id}`}
                      label={subcategory.name}
                      count={subcategory.count}
                      checked={selectedSubcategories.includes(
                        subcategory.filter_value,
                      )}
                      onCheckedChange={() =>
                        toggleSubcategory(subcategory.filter_value)
                      }
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {brands.length > 0 && (
            <AccordionItem value="brands">
              <AccordionTrigger>Brand</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3">
                  {brands.map((brand) => (
                    <FacetRow
                      key={brand.id}
                      id={`brand-${brand.id}`}
                      label={brand.name}
                      count={brand.count}
                      checked={selectedBrand === brand.filter_value}
                      onCheckedChange={() => toggleBrand(brand.filter_value)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {conditions.length > 0 && (
            <AccordionItem value="conditions">
              <AccordionTrigger>Condition</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3">
                  {conditions.map((condition) => (
                    <FacetRow
                      key={condition.value}
                      id={`condition-${condition.value}`}
                      label={deslug(condition.value, ["UK"])}
                      count={condition.count}
                      checked={selectedCondition === condition.value}
                      onCheckedChange={() => toggleCondition(condition.value)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {priceRange && (
            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                <PriceFacet
                  range={priceRange}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onCommit={setPriceRange}
                />
              </AccordionContent>
            </AccordionItem>
          )}
      </Accordion>
    </div>
  );
}
