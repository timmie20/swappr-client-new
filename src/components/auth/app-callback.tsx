"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveAuthTokens } from "@/lib/auth-tokens";
import { Spinner } from "@/components/ui/spinner";
import { getPendingValuationRef } from "@/lib/pending-valuation";
import { useClaimPendingValuation } from "@/hooks/use-valuation";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const { mutate: claimPendingValuation } = useClaimPendingValuation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract tokens from URL query parameters
        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");
        const expiresIn = searchParams.get("expires_in");
        const redirect = searchParams.get("state") || "/";

        // Validate tokens are present
        if (!accessToken || !refreshToken) {
          setError("Authentication failed - missing tokens");
          return;
        }

        // Parse expires_in or default to 1 hour (3600 seconds)
        const expirySeconds = expiresIn ? parseInt(expiresIn, 10) : 3600;

        // Save tokens to cookies and localStorage with expiry
        saveAuthTokens(accessToken, refreshToken, expirySeconds);

        const pendingRef = getPendingValuationRef();
        if (pendingRef) {
          claimPendingValuation(pendingRef);
        }
        // Redirect to the requested path or fall back to home
        // Backend may return the redirect via "redirect" or "state" param
        router.replace(redirect);
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError("Failed to complete authentication. Please try again.");
      }
    };

    handleCallback();
  }, [searchParams, router, claimPendingValuation]);

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-destructive text-lg">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="text-primary underline"
        >
          Return to home
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Spinner className="size-8" />
      <p className="text-muted-foreground mt-4 text-sm">
        Please wait while we complete your sign-in...
      </p>
    </div>
  );
}
