import { authEndpoints } from "@/endpoints/auth";
import { CreateAccount } from "@/types";
import { User } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getRefreshToken,
  clearAuthTokens,
  saveAuthTokens,
} from "@/lib/auth-tokens";
import { useRouter } from "next/navigation";
import { LoginCredentials, LoginResponse } from "@/types";

export const userKeys = {
  all: ["user"] as const,
  detail: () => [...userKeys.all, "detail"] as const,
};

export function useUserAccount() {
  return useQuery({
    queryKey: userKeys.detail(),
    queryFn: async () => {
      const response = await authEndpoints.getProfile();
      return response.user as User;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

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

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authEndpoints.login(credentials),
    onMutate: () => {
      toast.loading("Signing in...", { id: "login" });
    },
    onSuccess: (response: LoginResponse) => {
      const { access_token, refresh_token, expires_in } = response;

      // Save tokens with expiry
      saveAuthTokens(access_token, refresh_token, expires_in);

      toast.success("Signed in successfully", { id: "login" });

      // Invalidate user queries to fetch fresh data
      queryClient.invalidateQueries({ queryKey: userKeys.all });

      // Redirect to check-worth page
      router.push("/check-worth");
      router.refresh();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to sign in";
      toast.error(message, { id: "login" });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }
      return authEndpoints.logout(refreshToken);
    },
    onMutate: () => {
      toast.loading("Signing out...", { id: "logout" });
    },
    onSuccess: () => {
      clearAuthTokens();
      queryClient.clear();
      toast.success("Signed out successfully", { id: "logout" });
      router.push("/");
      router.refresh();
    },
    onError: (error: any) => {
      // Clear tokens even if logout request fails
      clearAuthTokens();
      queryClient.clear();
      const message = error?.response?.data?.message || "Failed to sign out";
      toast.error(message, { id: "logout" });
      router.push("/");
      router.refresh();
    },
  });
}
