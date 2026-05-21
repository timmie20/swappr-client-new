import { serverFetch } from "@/lib/api/server";
import type { ProductSubcategory } from "@/types/product";

export type SubCategoriesResponse = {
  subCategories: ProductSubcategory[];
};

export async function getSubCategories(): Promise<SubCategoriesResponse> {
  return serverFetch<SubCategoriesResponse>("/categories/subcategories");
}
