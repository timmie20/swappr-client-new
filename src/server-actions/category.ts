import { serverFetch } from "@/lib/api/server";
import { Category } from "@/types/categories";

export type CategoriesResponse = {
  categories: Category[];
};

export async function getPrimaryCategories(): Promise<CategoriesResponse> {
  return serverFetch<CategoriesResponse>("/categories/primary");
}
