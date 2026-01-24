import { User } from "@/types/api";

/**
 * Utility function to get full name from user object
 */
export const getFullName = (user: User | null | undefined): string => {
  if (!user) return "";
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`.trim();
};
