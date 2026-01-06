/**
 * Cookie Management Utilities
 *
 * Handles saving and retrieving model and variation IDs for the questionnaire flow.
 * Cookies expire in 30 minutes to ensure fresh data.
 */

import Cookies from "js-cookie";

const COOKIE_KEYS = {
  MODEL_ID: "swappr_model_id",
  VARIATION_ID: "swappr_variation_id",
} as const;

// Cookie expires in 30 minutes
const COOKIE_OPTIONS = {
  expires: 30 / (24 * 60), // 30 minutes converted to days
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export interface QuestionnaireContext {
  modelId: string;
  variationId: string;
}

/**
 * Save model and variation IDs to cookies
 * Call this before navigating to the questionnaire page
 */
export function saveQuestionnaireContext(
  modelId: string,
  variationId: string,
): void {
  Cookies.set(COOKIE_KEYS.MODEL_ID, modelId, COOKIE_OPTIONS);
  Cookies.set(COOKIE_KEYS.VARIATION_ID, variationId, COOKIE_OPTIONS);
}

/**
 * Retrieve model and variation IDs from cookies
 * Returns null if cookies are missing or expired
 */
export function getQuestionnaireContext(): QuestionnaireContext | null {
  const modelId = Cookies.get(COOKIE_KEYS.MODEL_ID);
  const variationId = Cookies.get(COOKIE_KEYS.VARIATION_ID);

  if (!modelId || !variationId) {
    return null;
  }

  return { modelId, variationId };
}

/**
 * Clear questionnaire context cookies
 * Call this after successful submission or when user cancels
 */
export function clearQuestionnaireContext(): void {
  Cookies.remove(COOKIE_KEYS.MODEL_ID);
  Cookies.remove(COOKIE_KEYS.VARIATION_ID);
}

/**
 * Check if questionnaire context exists
 */
export function hasQuestionnaireContext(): boolean {
  return !!(
    Cookies.get(COOKIE_KEYS.MODEL_ID) && Cookies.get(COOKIE_KEYS.VARIATION_ID)
  );
}
