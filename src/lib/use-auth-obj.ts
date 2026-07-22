import { UserSession } from "@/types/auth";

/**
 * Utility function to get full name from user object
 */
export const getFullName = (user: UserSession | null | undefined): string => {
  if (!user) return "";
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`.trim();
};
