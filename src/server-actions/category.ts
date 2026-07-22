import { serverFetch } from "@/lib/api/server";
import { Category, CategoryTreeNode } from "@/types/categories";

export type CategoriesResponse = {
  categories: Category[];
};

export type CategoriesTreeResponse = {
  categories: CategoryTreeNode[];
};

export async function getPrimaryCategories(): Promise<CategoriesResponse> {
  return serverFetch<CategoriesResponse>("/categories/primary");
}

export async function getCategories(): Promise<CategoriesTreeResponse> {
  return serverFetch<CategoriesTreeResponse>("/categories/tree");
}
