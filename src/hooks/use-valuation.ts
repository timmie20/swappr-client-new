import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { valuationEndpoints } from "@/endpoints/valuation";
import { queryKeys } from "@/lib/api/query-keys";
import type { SubmitAnswersDto, PaginationParams } from "@/types/api";
import { toast } from "sonner";
import { clearPendingValuationRef } from "@/lib/pending-valuation";
import { useRouter } from "next/navigation";

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

export function useClaimPendingValuation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (reference: string) => {
      const response = await valuationEndpoints.claim(reference);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Your valuation has been claimed!", {
        id: "claim-valuation",
        description: "You can view it in your drafts now.",
        action: {
          label: "View Drafts",
          onClick: () => {
            router.push("/account?tab=drafts");
          },
        },
      });
      clearPendingValuationRef();
      // Invalidate valuations list to refetch after claiming valuation
      queryClient.invalidateQueries({ queryKey: queryKeys.valuations.list() });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.submissions() });
    },

    onError: (error) => {
      console.log("Error claiming valuation:", error);
    },
  });
}
