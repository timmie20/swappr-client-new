import { categoriesEndpoints } from "@/endpoints/categories";
import { queryKeys } from "@/lib/api/query-keys";
import { useQuery } from "@tanstack/react-query";

export function usePrimaryCategories() {
  return useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () => categoriesEndpoints.getPrimaryCategories(),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.tree(),
    queryFn: () => categoriesEndpoints.getCategories(),
    staleTime: Infinity,
  });
}
