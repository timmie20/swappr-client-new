"use client";

import { motion } from "motion/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  getAvailableColors,
  getAvailableStorage,
  isColorInStock,
  isStorageInStock,
  formatStorage,
} from "@/lib/utils/product-helpers";
import type { ProductVariant, SelectedVariant } from "@/types/product";
import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selected: SelectedVariant;
  onChange: (updated: SelectedVariant) => void;
}

export function VariantSelector({
  variants,
  selected,
  onChange,
}: VariantSelectorProps) {
  const colors = getAvailableColors(variants);
  const storageOptions = getAvailableStorage(variants, selected.color);

  const handleColorChange = (color: string) => {
    if (!color) return;
    // If current storage isn't available for new color, reset it
    const storagesForColor = getAvailableStorage(variants, color);
    const storageStillValid =
      selected.storage && storagesForColor.includes(selected.storage);
    onChange({
      color,
      storage: storageStillValid
        ? selected.storage
        : (storagesForColor[0] ?? null),
    });
  };

  const handleStorageChange = (val: string) => {
    if (!val) return;
    onChange({ ...selected, storage: parseInt(val, 10) });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 }}
      className="space-y-5"
    >
      {/* Color selection */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#1A1A1A]">
          Color:{" "}
          <span className="font-normal text-[#6B7280]">
            {selected.color ?? "Select a color"}
          </span>
        </p>
        <ToggleGroup
          type="single"
          value={selected.color ?? ""}
          onValueChange={handleColorChange}
          className="flex flex-wrap gap-2"
        >
          {colors.map((color) => {
            const inStock = isColorInStock(variants, color);
            return (
              <ToggleGroupItem
                key={color}
                value={color}
                aria-label={`Select color ${color}`}
                disabled={!inStock}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-all",
                  !inStock && "line-through opacity-40",
                )}
              >
                {color}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </div>

      {/* Storage selection */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#1A1A1A]">
          Storage:{" "}
          <span className="font-normal text-[#6B7280]">
            {selected.storage
              ? formatStorage(selected.storage)
              : "Select storage"}
          </span>
        </p>
        <ToggleGroup
          type="single"
          value={selected.storage?.toString() ?? ""}
          onValueChange={handleStorageChange}
          className="flex flex-wrap gap-2"
        >
          {storageOptions.map((gb) => {
            const inStock = isStorageInStock(variants, gb, selected.color);
            return (
              <ToggleGroupItem
                key={gb}
                value={gb.toString()}
                aria-label={`Select ${formatStorage(gb)} storage`}
                disabled={!inStock}
                className={cn(
                  "min-w-16 rounded-xl border px-4 py-1.5 text-sm font-medium transition-all",
                  !inStock && "line-through opacity-40",
                )}
              >
                {formatStorage(gb)}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </div>
    </motion.div>
  );
}
