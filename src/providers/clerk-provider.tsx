"use client";

import { apiClient } from "@/lib/api/client";
import { ClerkProvider as BaseClerkProvider } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect, type ReactNode } from "react";

/**
 * Clerk Provider with API Token Integration
 *
 * Wraps the application with ClerkProvider and automatically
 * configures the API client to use Clerk session tokens.
 */

function TokenSetter() {
  const { getToken } = useAuth();

  useEffect(() => {
    // Set the token getter function in the API client
    apiClient.setTokenGetter(async () => {
      try {
        return await getToken();
      } catch (error) {
        console.error("Failed to get token:", error);
        return null;
      }
    });
  }, [getToken]);

  return null;
}

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    <BaseClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#000000",
        },
      }}
    >
      <TokenSetter />
      {children}
    </BaseClerkProvider>
  );
}
