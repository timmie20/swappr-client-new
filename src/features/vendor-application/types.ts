import { z } from "zod";

export const NIGERIAN_STATES = ["Lagos"] as const;

// ─── Zod schema ──────────────────────────────────────────────────────────────

export const applicationSchema = z
  .object({
    // Step 2 – business info
    businessName: z
      .string()
      .min(3, "Business name must be at least 3 characters")
      .max(100, "Business name must be less than 100 characters"),
    businessAddress: z
      .string()
      .min(10, "Please provide a complete address")
      .max(500, "Address is too long"),
    state: z.string().min(1, "Please select a state"),
    city: z
      .string()
      .min(2, "City must be at least 2 characters")
      .max(50, "City name is too long"),
    contactNumber: z
      .string()
      .regex(
        /^0[7-9][0-1]\d{8}$/,
        "Enter a valid Nigerian number (e.g. 08012345678)",
      ),

    // Step 3 – account details
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

// Fields that belong to each step (used by trigger())
export const STEP_2_FIELDS = [
  "businessName",
  "businessAddress",
  "state",
  "city",
  "contactNumber",
] as const;

export const STEP_3_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "password",
  "confirmPassword",
] as const;

// API submission payload — mirrors the backend VendorSignupDto
export interface VendorSignupPayload {
  account: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  };
  business_name: string;
  business_address: string;
  state: string;
  city: string;
  contact_number: string;
}

export function buildPayload(data: ApplicationFormData): VendorSignupPayload {
  return {
    account: {
      email: data.email,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
    },
    business_name: data.businessName,
    business_address: data.businessAddress,
    state: data.state,
    city: data.city,
    contact_number: data.contactNumber,
  };
}
