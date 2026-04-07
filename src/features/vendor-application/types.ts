import { z } from "zod";

export const NIGERIAN_STATES = [
  // "Abia",
  // "Adamawa",
  // "Akwa Ibom",
  // "Anambra",
  // "Bauchi",
  // "Bayelsa",
  // "Benue",
  // "Borno",
  // "Cross River",
  // "Delta",
  // "Ebonyi",
  // "Edo",
  // "Ekiti",
  // "Enugu",
  // "FCT",
  // "Gombe",
  // "Imo",
  // "Jigawa",
  // "Kaduna",
  // "Kano",
  // "Katsina",
  // "Kebbi",
  // "Kogi",
  // "Kwara",
  "Lagos",
  // "Nasarawa",
  // "Niger",
  // "Ogun",
  // "Ondo",
  // "Osun",
  // "Oyo",
  // "Plateau",
  // "Rivers",
  // "Sokoto",
  // "Taraba",
  // "Yobe",
  // "Zamfara",
] as const;

export const ID_TYPES = [
  { value: "nin", label: "National Identity Number (NIN)" },
  { value: "drivers_license", label: "Driver's License" },
  { value: "voters_card", label: "Voter's Card" },
  { value: "international_passport", label: "International Passport" },
] as const;

export type IdType =
  | "nin"
  | "drivers_license"
  | "voters_card"
  | "international_passport";

// ─── Zod schema ──────────────────────────────────────────────────────────────

export const applicationSchema = z
  .object({
    // Step 2 – basic info
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
    rcNumber: z
      .string()
      .regex(
        /^RC\d{7,}$/,
        "RC number must start with 'RC' followed by at least 7 digits (e.g. RC1234567)",
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

    // Step 3 – documents (reserved for later)
    // idType: z.enum(
    //   ["nin", "drivers_license", "voters_card", "international_passport"],
    //   { message: "Please select an ID type" },
    // ),
    // idDocumentUrl: z.string().min(1, "Please upload your ID document"),
    // cacDocuments: z
    //   .array(z.string())
    //   .min(1, "Please upload at least one CAC document")
    //   .max(3, "Maximum 3 CAC documents allowed"),
    // storePhotos: z
    //   .array(z.string())
    //   .min(2, "Please upload at least 2 store photos")
    //   .max(5, "Maximum 5 store photos allowed"),
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
  "rcNumber",
] as const;

export const STEP_3_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "password",
  "confirmPassword",
] as const;

// Document fields – reserved for later
// export const STEP_3_DOC_FIELDS = [
//   "idType",
//   "idDocumentUrl",
//   "cacDocuments",
//   "storePhotos",
// ] as const;

// API submission payload
export interface VendorApplicationPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  business_name: string;
  business_address: string;
  state: string;
  city: string;
  contact_number: string;
  rc_number: string;
}

export function buildPayload(
  data: ApplicationFormData,
): VendorApplicationPayload {
  return {
    email: data.email,
    password: data.password,
    first_name: data.firstName,
    last_name: data.lastName,
    business_name: data.businessName,
    business_address: data.businessAddress,
    state: data.state,
    city: data.city,
    contact_number: data.contactNumber,
    rc_number: data.rcNumber,
  };
}
