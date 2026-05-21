import { categoriesEndpoints } from "@/endpoints/categories";
import { queryKeys } from "@/lib/api/query-keys";
import { ProductSubcategory } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export function useSubCategories() {
  return useQuery<{
    subCategories: ProductSubcategory[];
  }>({
    queryKey: queryKeys.categories.list(),
    queryFn: () => categoriesEndpoints.getSubCategories(),
  });
}
