import { api } from "@/lib/api/client";
import { ProductSubcategory } from "@/types/product";

const getSubCategories = async (): Promise<{
  subCategories: ProductSubcategory[];
}> => {
  const { data } = await api.get<{
    subCategories: ProductSubcategory[];
  }>("/categories/subcategories");
  return data;
};

export const categoriesEndpoints = {
  getSubCategories,
};
