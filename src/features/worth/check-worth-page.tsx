import { apiClient } from "@/lib/api/client";
import { getAuthHeaders } from "@/lib/api/server";
import CheckWorth from "./check-worth";
import type { Brand, Model, PaginatedResponse } from "@/types/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";

const getBrands = async (): Promise<{ brands: Brand[] }> => {
  const headers = await getAuthHeaders();
  const response = await apiClient.instance.get<Promise<{ brands: Brand[] }>>(
    "/brands",
    {
      params: { limit: 100 },
      ...(headers && { headers }),
    },
  );
  return response.data;
};

const getModels = async (): Promise<PaginatedResponse<Model, "models">> => {
  const headers = await getAuthHeaders();
  const response = await apiClient.instance.get<
    PaginatedResponse<Model, "models">
  >("/models", {
    params: {},
    ...(headers && { headers }),
  });
  return response.data;
};

export default async function CheckWorthPage() {
  const queryClient = new QueryClient();
  const brands = (await getBrands()).brands;
  // const models = await getModels();

  // Prefetch models data for React Query cache
  await queryClient.prefetchQuery({
    queryKey: queryKeys.models.list({}),
    queryFn: () => getModels(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CheckWorth brands={brands || []} />
    </HydrationBoundary>
  );
}
