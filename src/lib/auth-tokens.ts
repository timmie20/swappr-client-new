/**
 * Authentication Token Management
 *
 * Handles storing and retrieving access and refresh tokens from the custom Google OAuth flow.
 * Tokens are stored in httpOnly cookies for security (when set from server) or localStorage as fallback.
 */

import Cookies from "js-cookie";

const TOKEN_KEYS = {
  ACCESS_TOKEN: "swappr_access_token",
  REFRESH_TOKEN: "swappr_refresh_token",
  TOKEN_EXPIRY: "swappr_token_expiry",
} as const;

// Tokens stored with secure settings
const TOKEN_OPTIONS = {
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  expires: 7, // 7 days for refresh token
};

const AUTH_CHANGED_EVENT = "swappr-auth-changed";

function notifyAuthChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Save authentication tokens with expiry time
 * Call this after successful OAuth callback
 */
export function saveAuthTokens(
  accessToken: string,
  refreshToken: string,
  expiresIn: number = 3600, // Default 1 hour in seconds
): void {
  const expiryTime = Date.now() + expiresIn * 1000;

  // Store in cookies (accessible from both client and server)
  Cookies.set(TOKEN_KEYS.ACCESS_TOKEN, accessToken, {
    ...TOKEN_OPTIONS,
    expires: 1, // Access token expires in 1 day
  });
  Cookies.set(TOKEN_KEYS.REFRESH_TOKEN, refreshToken, TOKEN_OPTIONS);
  Cookies.set(TOKEN_KEYS.TOKEN_EXPIRY, expiryTime.toString(), {
    ...TOKEN_OPTIONS,
    expires: 1,
  });

  // Also store in localStorage for client-side access
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(TOKEN_KEYS.TOKEN_EXPIRY, expiryTime.toString());
  }

  notifyAuthChanged();
}

/**
 * Retrieve authentication tokens
 * Returns null if tokens are missing
 */
export function getAuthTokens(): AuthTokens | null {
  // Try cookies first
  let accessToken = Cookies.get(TOKEN_KEYS.ACCESS_TOKEN);
  let refreshToken = Cookies.get(TOKEN_KEYS.REFRESH_TOKEN);

  // Fallback to localStorage
  if (typeof window !== "undefined" && (!accessToken || !refreshToken)) {
    accessToken = localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN) || undefined;
    refreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN) || undefined;
  }

  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

/**
 * Get only the access token
 */
export function getAccessToken(): string | null {
  const tokens = getAuthTokens();
  return tokens?.accessToken || null;
}

/**
 * Get only the refresh token
 */
export function getRefreshToken(): string | null {
  const tokens = getAuthTokens();
  return tokens?.refreshToken || null;
}

/**
 * Get token expiry timestamp
 */
export function getTokenExpiry(): number | null {
  const cookieExpiry = Cookies.get(TOKEN_KEYS.TOKEN_EXPIRY);
  if (cookieExpiry) {
    return parseInt(cookieExpiry, 10);
  }

  if (typeof window !== "undefined") {
    const localExpiry = localStorage.getItem(TOKEN_KEYS.TOKEN_EXPIRY);
    return localExpiry ? parseInt(localExpiry, 10) : null;
  }

  return null;
}

/**
 * Check if token is expired or about to expire (within 5 minutes)
 */
export function isTokenExpired(): boolean {
  const expiry = getTokenExpiry();
  if (!expiry) return true;

  // Add 5 minute buffer before actual expiry
  const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  return Date.now() >= expiry - bufferTime;
}

/**
 * Clear authentication tokens
 * Call this on logout
 */
export function clearAuthTokens(): void {
  Cookies.remove(TOKEN_KEYS.ACCESS_TOKEN);
  Cookies.remove(TOKEN_KEYS.REFRESH_TOKEN);
  Cookies.remove(TOKEN_KEYS.TOKEN_EXPIRY);

  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.TOKEN_EXPIRY);
  }

  notifyAuthChanged();
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthTokens();
}

/**
 * Update access token and expiry (after refresh)
 */
export function updateAccessToken(
  newAccessToken: string,
  expiresIn: number = 3600,
): void {
  const expiryTime = Date.now() + expiresIn * 1000;

  Cookies.set(TOKEN_KEYS.ACCESS_TOKEN, newAccessToken, {
    ...TOKEN_OPTIONS,
    expires: 1,
  });
  Cookies.set(TOKEN_KEYS.TOKEN_EXPIRY, expiryTime.toString(), {
    ...TOKEN_OPTIONS,
    expires: 1,
  });

  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, newAccessToken);
    localStorage.setItem(TOKEN_KEYS.TOKEN_EXPIRY, expiryTime.toString());
  }

  notifyAuthChanged();
}
