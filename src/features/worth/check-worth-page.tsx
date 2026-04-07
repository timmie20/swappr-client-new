import CheckWorth from "./check-worth";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { getBrands, getModels } from "@/server-actions/model";

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
