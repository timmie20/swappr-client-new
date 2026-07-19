"use client";

import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";

const parsers = {
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  subcategories: parseAsArrayOf(parseAsString).withDefault([]),
  brand: parseAsString,
  condition: parseAsString,
  min_price: parseAsInteger,
  max_price: parseAsInteger,
};

function toggle(value: string, list: string[]): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function useProductFilters() {
  const [
    { categories, subcategories, brand, condition, min_price, max_price },
    setFilters,
  ] = useQueryStates(parsers, { history: "replace" });

  const toggleCategory = (filterValue: string) =>
    setFilters({ categories: toggle(filterValue, categories) });

  const toggleSubcategory = (filterValue: string) =>
    setFilters({ subcategories: toggle(filterValue, subcategories) });

  const toggleBrand = (filterValue: string) =>
    setFilters({ brand: brand === filterValue ? null : filterValue });

  const toggleCondition = (value: string) =>
    setFilters({ condition: condition === value ? null : value });

  const setPriceRange = (min: number | null, max: number | null) =>
    setFilters({ min_price: min, max_price: max });

  const clearAll = () =>
    setFilters({
      categories: [],
      subcategories: [],
      brand: null,
      condition: null,
      min_price: null,
      max_price: null,
    });

  return {
    categories,
    subcategories,
    brand,
    condition,
    minPrice: min_price,
    maxPrice: max_price,
    toggleCategory,
    toggleSubcategory,
    toggleBrand,
    toggleCondition,
    setPriceRange,
    clearAll,
  };
}
