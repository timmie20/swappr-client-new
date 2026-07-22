import { z } from "zod";

// ─── Zod schema ──────────────────────────────────────────────────────────────

export const applicationSchema = z
  .object({
    // Step 2 – account details
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ApplicationFormData = z.infer<typeof applicationSchema>;

// Fields that belong to the account step (used by trigger())
export const ACCOUNT_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "password",
  "confirmPassword",
] as const;

// API submission payload — mirrors the backend VendorSignupDto
export interface VendorSignupPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export function buildPayload(data: ApplicationFormData): VendorSignupPayload {
  return {
    email: data.email,
    password: data.password,
    first_name: data.firstName,
    last_name: data.lastName,
  };
}
