import { cartEndpoints } from "@/endpoints/cart";
import { ApiResponse } from "@/types/api";
import { Cart } from "@/types/cart";
import { UseBaseQueryOptions, useQuery } from "@tanstack/react-query";

export const useCart = (
  options?: Omit<
    UseBaseQueryOptions<ApiResponse<Cart>>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => cartEndpoints.getCart(),
    ...options,
  });
};
