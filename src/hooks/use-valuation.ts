import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { valuationEndpoints } from "@/endpoints/valuation";
import { queryKeys } from "@/lib/api/query-keys";
import type { SubmitAnswersDto, PaginationParams } from "@/types/api";

/**
 * Hook to fetch all valuations for the current user
 */
export function useValuations(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.valuations.list(params),
    queryFn: async () => {
      const response = await valuationEndpoints.getAll();
      return response.data;
    },
  });
}

/**
 * Hook to calculate device valuation
 */

export function useCalculateValuation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SubmitAnswersDto) => {
      const response = await valuationEndpoints.calculateValue(payload);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate valuations list to refetch after new valuation
      queryClient.invalidateQueries({ queryKey: queryKeys.valuations.list() });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.submissions() });
    },
  });
}
