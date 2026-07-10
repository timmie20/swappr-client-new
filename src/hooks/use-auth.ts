import { authEndpoints } from "@/endpoints/auth";
import { CreateAccount } from "@/types";
import { User } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { LoginCredentials, LoginResponse } from "@/types";
// import { useCartStore } from "@/store/cart-store";
// import { useCartSync } from "@/features/cart/hooks/use-cart-sync";

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
      const message = error?.message || "Failed to create account";
      toast.error(message, { id: "create-account" });
    },
  });
}

// export function useLogin() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (credentials: LoginCredentials) =>
//       authEndpoints.login(credentials),
//     onMutate: () => {
//       toast.loading("Signing in...", { id: "login" });
//     },
//     onSuccess: async (response: LoginResponse) => {
//       const { access_token, refresh_token, expires_in } = response;

//       // Save tokens with expiry
//       saveAuthTokens(access_token, refresh_token, expires_in);

//       toast.success("Signed in successfully", { id: "login" });

//       // Invalidate user queries to fetch fresh data
//       queryClient.invalidateQueries({ queryKey: userKeys.all });
//     },
//     onError: (error: Error) => {
//       const message =
//         (error as Error & { message?: string })?.message || "Failed to sign in";
//       toast.error(message, { id: "login" });
//       console.log(error);
//     },
//   });
// }

export function useLogout() {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authEndpoints.logout(),

    onSuccess: async (res) => {
      toast.success(res.message || "Logged out successfully");
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      router.push("/sign-in");
    },
    onError: (error: Error) => {
      // toast.error(getErrorMessage (error));
      toast.error(
        (error as Error & { message?: string })?.message || "Failed to log out",
      );
    },
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) => authEndpoints.verifyEmail(token),
    onMutate: () => {
      toast.loading("Verifying email...", { id: "verify-email" });
    },
    onSuccess: (res: { message: string }) => {
      toast.success(res.message || "Email verified successfully", {
        id: "verify-email",
      });
    },
    onError: (error: Error) => {
      const message =
        (error as Error & { message?: string })?.message ||
        "Failed to verify email";
      toast.error(message, { id: "verify-email" });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authEndpoints.forgotPassword(email),
    onMutate: () => {
      toast.loading("Sending reset link...", { id: "forgot-password" });
    },
    onSuccess: (res: { message: string }) => {
      toast.success(res.message || "Password reset link sent to your email", {
        id: "forgot-password",
      });
    },
    onError: (error: Error) => {
      const message =
        (error as Error & { message?: string })?.message ||
        "Failed to send reset link";
      toast.error(message, { id: "forgot-password" });
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) => authEndpoints.resetPassword(token, newPassword),
    onMutate: () => {
      toast.loading("Resetting password...", { id: "reset-password" });
    },
    onSuccess: (res: { message: string }) => {
      toast.success(res.message || "Password reset successfully", {
        id: "reset-password",
      });
    },
    onError: (error: Error) => {
      const message =
        (error as Error & { message?: string })?.message ||
        "Failed to reset password";
      toast.error(message, { id: "reset-password" });
    },
  });
}
