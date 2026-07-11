"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/forms/form-input";
import { useSession } from "@/lib/auth/session-client";
import {
  checkoutDeliverySchema,
  type CheckoutDeliveryFormValues,
} from "../../components/checkout/types";
import { TypographyP } from "../../components/typography/p";
import { TypographyMuted } from "../../components/typography/muted";
import { Separator } from "../../components/ui/separator";
import { Spinner } from "../../components/ui/spinner";

const DELIVERY_INFO_STORAGE_KEY = "swappr.delivery-info";

type StoredDeliveryInfo = Pick<
  CheckoutDeliveryFormValues,
  "contact_phone" | "delivery_address"
>;

const loadSavedDeliveryInfo = (): StoredDeliveryInfo | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(DELIVERY_INFO_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredDeliveryInfo;
  } catch {
    return null;
  }
};

const saveDeliveryInfoToStorage = (data: StoredDeliveryInfo) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(DELIVERY_INFO_STORAGE_KEY, JSON.stringify(data));
};

const clearSavedDeliveryInfo = () => {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(DELIVERY_INFO_STORAGE_KEY);
};

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
  const { user } = useSession();
  const [saveDeliveryInfo, setSaveDeliveryInfo] = useState(false);
  const [savedDeliveryInfo, setSavedDeliveryInfo] =
    useState<StoredDeliveryInfo | null>(() => loadSavedDeliveryInfo());

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

  const handleApplySavedInfo = () => {
    if (!savedDeliveryInfo) return;
    form.setValue("contact_phone", savedDeliveryInfo.contact_phone || "", {
      shouldValidate: true,
    });
    form.setValue(
      "delivery_address.street",
      savedDeliveryInfo.delivery_address?.street || "",
      { shouldValidate: true },
    );
    form.setValue(
      "delivery_address.city",
      savedDeliveryInfo.delivery_address?.city || "",
      { shouldValidate: true },
    );
    form.setValue(
      "delivery_address.state",
      savedDeliveryInfo.delivery_address?.state || "",
      { shouldValidate: true },
    );
    form.setValue(
      "delivery_address.postal_code",
      savedDeliveryInfo.delivery_address?.postal_code || "",
      { shouldValidate: true },
    );
  };

  const handleSubmit = (data: CheckoutDeliveryFormValues) => {
    if (saveDeliveryInfo) {
      const payload: StoredDeliveryInfo = {
        contact_phone: data.contact_phone,
        delivery_address: data.delivery_address,
      };

      saveDeliveryInfoToStorage(payload);
      setSavedDeliveryInfo(payload);
    }

    onSubmit(data);
  };

  const handleClearSavedInfo = () => {
    clearSavedDeliveryInfo();
    setSavedDeliveryInfo(null);
    setSaveDeliveryInfo(false);
  };

  return (
    <div className="bg-background flex h-dvh w-full justify-end-safe">
      <div className="w-full max-w-xl px-4 py-8 lg:px-8">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <TypographyP className="text-foreground text-lg font-semibold">
            Delivery details
          </TypographyP>
          <TypographyMuted>
            Provide your delivery address and contact phone number.
          </TypographyMuted>

          {savedDeliveryInfo && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                onClick={handleApplySavedInfo}
                className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium"
                variant="link"
              >
                Use saved delivery info
                <span className="text-muted-foreground text-xs">
                  (autofill)
                </span>
              </Button>
              <Button
                type="button"
                onClick={handleClearSavedInfo}
                className="cursor-pointer text-xs underline-offset-4"
                variant="destructive"
              >
                Clear saved info
              </Button>
            </div>
          )}

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

          <div className="mt-4 flex items-center gap-2">
            <input
              id="save-delivery-info"
              type="checkbox"
              checked={saveDeliveryInfo}
              onChange={(event) => setSaveDeliveryInfo(event.target.checked)}
              className="border-border text-primary size-4 accent-current"
            />
            <label
              htmlFor="save-delivery-info"
              className="text-muted-foreground text-sm"
            >
              Save delivery info for next time
            </label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="my-6 w-full cursor-pointer gap-2 rounded-full py-5"
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
