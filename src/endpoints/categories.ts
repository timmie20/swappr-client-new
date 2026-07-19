import { api } from "@/lib/api/client";
import { Category, CategoryTreeNode } from "@/types/categories";

export const categoriesEndpoints = {
  /**
   *
   * @returns All primary categories for easy product discovery
   */
  async getPrimaryCategories(): Promise<{
    categories: Category[];
  }> {
    const { data } = await api.get<{
      categories: Category[];
    }>("/categories/primary");
    return data;
  },

  /**
   * @returns All categories with their subcategories, pre-sorted by display_order then name
   */
  async getCategories(): Promise<{
    categories: CategoryTreeNode[];
  }> {
    const { data } = await api.get<{
      categories: CategoryTreeNode[];
    }>("/categories/tree");
    return data;
  },
};
