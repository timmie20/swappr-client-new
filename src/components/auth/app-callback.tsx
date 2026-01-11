"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const { getToken, userId, isLoaded } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!userId) {
      throw new Error("Authentication failed");
    }

    const handleCallback = async () => {
      try {
        // Get fresh token
        const token = await getToken();

        // Call your backend
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth-callback`,
          { clerk_user_id: userId },
          {
            headers: { Authorization: `Bearer ${token}` },
            // withCredentials: true,

            // Removed withCredentials: true temporarily. However, the proper fix is on the backend - it needs to return
            // the specific origin (http://localhost:3000) in the Access-Control-Allow-Origin header
            // instead of * when credentials are needed.
          },
        );

        router.replace("/check-worth");
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError("Failed to complete authentication. Please try again.");
      }
    };

    handleCallback();
  }, [isLoaded, userId, getToken, router]);

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
    <div className="flex h-full items-center justify-center">
      <p className="text-lg">Completing sign-in…</p>
    </div>
  );
}
