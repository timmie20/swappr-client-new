/**
 * Token Refresh Service
 *
 * Handles automatic token refresh logic with request queuing
 * to prevent multiple simultaneous refresh requests.
 */

import axios from "axios";
import {
  getAuthTokens,
  saveAuthTokens,
  clearAuthTokens,
  isTokenExpired,
} from "@/lib/auth-tokens";
import { isPublicPageRoute } from "@/lib/public-routes";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

/**
 * Add callback to queue for when token refresh completes
 */
function subscribeTokenRefresh(callback: (token: string) => void): void {
  refreshSubscribers.push(callback);
}

/**
 * Notify all queued requests that token has been refreshed
 */
function onTokenRefreshed(token: string): void {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

/**
 * Refresh the access token using the refresh token
 * Queues multiple simultaneous requests to prevent race conditions
 */
export async function refreshAccessToken(): Promise<string | null> {
  const tokens = getAuthTokens();

  if (!tokens?.refreshToken) {
    clearAuthTokens();
    return null;
  }

  // If already refreshing, wait for the refresh to complete
  if (isRefreshing) {
    return new Promise((resolve) => {
      subscribeTokenRefresh((token: string) => {
        resolve(token);
      });
    });
  }

  isRefreshing = true;

  try {
    const response = await axios.post<RefreshResponse>(
      `${API_URL}/auth/refresh`,
      {
        refresh_token: tokens.refreshToken,
      },
    );

    const { access_token, refresh_token, expires_in } = response.data;

    // Save new tokens
    saveAuthTokens(access_token, refresh_token, expires_in);

    // Notify all queued requests
    onTokenRefreshed(access_token);
    isRefreshing = false;

    return access_token;
  } catch (error) {
    isRefreshing = false;
    clearAuthTokens();

    // Redirect to sign-in on refresh failure (only for protected routes)
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      // Don't redirect if on auth pages or public routes
      if (
        !currentPath.startsWith("/auth/") &&
        !isPublicPageRoute(currentPath)
      ) {
        window.location.href = `/auth/sign-in?redirect_url=${encodeURIComponent(window.location.href)}`;
      }
    }

    console.error("Token refresh failed:", error);
    return null;
  }
}

/**
 * Get a valid access token, refreshing if necessary
 * Use this before making API requests
 */
export async function getValidAccessToken(): Promise<string | null> {
  const tokens = getAuthTokens();

  if (!tokens?.accessToken) {
    return null;
  }

  // Check if token is expired or about to expire
  if (isTokenExpired()) {
    return await refreshAccessToken();
  }

  return tokens.accessToken;
}
