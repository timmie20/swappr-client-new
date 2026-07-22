import { z } from "zod";

export const nigerianPhoneSchema = z
  .string()
  .regex(
    /^0[7-9][0-1]\d{8}$/,
    "Enter a valid Nigerian number (e.g. 08012345678)",
  );

export const checkoutDeliverySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),

  delivery_address: z.object({
    street: z.string().min(2, "Street is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    postal_code: z.string().optional(),
  }),

  contact_phone: nigerianPhoneSchema,

  fulfillment_type: z.enum(["pickup", "delivery"]),

  save_for_next_time: z.boolean().optional(),
});

export type CheckoutDeliveryFormValues = z.infer<typeof checkoutDeliverySchema>;

export const STEP_1_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "delivery_address.street",
  "delivery_address.city",
  "delivery_address.state",
  "delivery_address.postal_code",
  "contact_phone",
] as const;
