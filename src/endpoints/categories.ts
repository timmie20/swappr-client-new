import { api } from "@/lib/api/client";
import { Category } from "@/types/categories";

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
};
