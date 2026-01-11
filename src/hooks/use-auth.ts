import { authEndpoints } from "@/endpoints/auth";
import { CreateAccount } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const userKeys = {
  all: ["user"] as const,
  detail: () => [...userKeys.all, "detail"] as const,
};

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAccount) =>
      authEndpoints.createAccount(payload),
    onMutate: () => {
      toast.loading("Creating account...", { id: "create-account" });
    },
    onSuccess: (res: { message: string }) => {
      toast.success(res.message || "Account created successfully", {
        id: "create-account",
      });
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to create account";
      toast.error(message, { id: "create-account" });
    },
  });
}
