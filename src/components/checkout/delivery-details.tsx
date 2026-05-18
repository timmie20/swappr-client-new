"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/forms/form-input";
import { useUserAccount } from "@/hooks/use-auth";
import {
  checkoutDeliverySchema,
  type CheckoutDeliveryFormValues,
} from "./types";
import { TypographyP } from "../typography/p";
import { TypographyMuted } from "../typography/muted";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";

export type DeliveryDetailsProps = {
  submitLabel?: string;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
  hasItems?: boolean; // new prop to indicate if there are items in the cart
  onSubmit: (data: CheckoutDeliveryFormValues) => void | Promise<void>;
};

export default function DeliveryDetails({
  submitLabel,
  isSubmitting,
  submitDisabled,
  onSubmit,
}: DeliveryDetailsProps) {
  const { data: user } = useUserAccount();

  const form = useForm<CheckoutDeliveryFormValues>({
    resolver: zodResolver(checkoutDeliverySchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      delivery_address: {
        street: "",
        city: "",
        state: "",
        postal_code: "",
      },
      contact_phone: "",
      save_for_next_time: false,
    },
  });

  useEffect(() => {
    if (!user) return;
    form.setValue("firstName", user.firstName || "", { shouldValidate: true });
    form.setValue("lastName", user.lastName || "", { shouldValidate: true });
    form.setValue("email", user.email || "", { shouldValidate: true });
  }, [form, user]);

  useEffect(() => {
    const el = document.getElementById("delivery_address.full_address");
    el?.focus();
  }, []);

  const isBusy = isSubmitting ?? false;
  const isDisabled = submitDisabled ?? false;
  const label = submitLabel ?? "Pay Now";

  return (
    <div className="bg-background flex h-dvh w-full justify-end-safe">
      <div className="w-full max-w-xl px-4 py-8 lg:px-8">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TypographyP className="text-foreground text-lg font-semibold">
            Delivery details
          </TypographyP>
          <TypographyMuted>
            Provide your delivery address and contact phone number.
          </TypographyMuted>

          <Separator className="my-4" />

          <FieldGroup>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormInput
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="First name"
                required
                disabled={!!user?.firstName}
              />
              <FormInput
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Last name"
                required
                disabled={!!user?.lastName}
              />
            </div>

            <FormInput
              control={form.control}
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              required
              disabled={!!user?.email}
            />

            <FormInput
              control={form.control}
              name="delivery_address.street"
              label="Street"
              placeholder="Street"
              required
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormInput
                control={form.control}
                name="delivery_address.city"
                label="City"
                placeholder="City"
                required
              />
              <FormInput
                control={form.control}
                name="delivery_address.state"
                label="State"
                placeholder="State"
                required
              />
            </div>

            <FormInput
              control={form.control}
              name="contact_phone"
              type="tel"
              label="Contact Phone"
              placeholder="08012345678"
              required
            />

            <FormInput
              control={form.control}
              name="delivery_address.postal_code"
              label="Postal Code (optional)"
              placeholder="Postal code"
            />
          </FieldGroup>

          <Button
            type="submit"
            size="lg"
            className="mt-6 w-full cursor-pointer gap-2 rounded-full py-5"
            disabled={isBusy || isDisabled}
          >
            {isBusy ? (
              <span className="inline-flex items-center gap-2">
                <Spinner />
                Processing…
              </span>
            ) : (
              label
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
