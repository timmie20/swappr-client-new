export interface FacetFilterParams {
  categories?: string[];
  subcategories?: string[];
  brand?: string;
  condition?: string;
  min_price?: number;
  max_price?: number;
}

/**
 * GET /products and GET /collections/:slug/products both take identical facet
 * filter params - category/subcategory are sent as comma-joined filter_value
 * slugs, not arrays (the backend rejects bracket/repeated-key array syntax).
 */
export function serializeFacetParams<T extends FacetFilterParams>(
  params?: T,
): T | undefined {
  if (!params) return params;
  const { categories, subcategories, ...rest } = params;
  return {
    ...rest,
    ...(categories?.length ? { categories: categories.join(",") } : {}),
    ...(subcategories?.length
      ? { subcategories: subcategories.join(",") }
      : {}),
  } as T;
}
