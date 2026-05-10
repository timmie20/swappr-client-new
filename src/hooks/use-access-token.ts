"use client";

import { getAccessToken } from "@/lib/auth-tokens";
import { useSyncExternalStore } from "react";

const AUTH_CHANGED_EVENT = "swappr-auth-changed";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handle = () => onStoreChange();

  window.addEventListener(AUTH_CHANGED_EVENT, handle);
  window.addEventListener("storage", handle);

  return () => {
    window.removeEventListener(AUTH_CHANGED_EVENT, handle);
    window.removeEventListener("storage", handle);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return null;
  return getAccessToken();
}

function getServerSnapshot() {
  return null;
}

export function useAccessToken() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useIsAuthenticated() {
  return !!useAccessToken();
}
