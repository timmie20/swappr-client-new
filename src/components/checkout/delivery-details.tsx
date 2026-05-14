"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/forms/form-input";
import { FormCheckbox } from "@/components/forms/form-checkbox";
import { useUserAccount } from "@/hooks/use-auth";
import { useCheckoutStore } from "@/store/checkout-store";
import {
  checkoutDeliverySchema,
  type CheckoutDeliveryFormValues,
  // STEP_1_FIELDS,
} from "./types";
import { TypographyP } from "../typography/p";
import { TypographyMuted } from "../typography/muted";
import { Separator } from "../ui/separator";
import { useCheckoutPay } from "@/hooks";
import { CheckoutPayPayload } from "@/types/checkout";
import { CheckSquare, Square } from "lucide-react";
import { toast } from "sonner";

export default function DeliveryDetails() {
  const { data: user } = useUserAccount();
  const pay = useCheckoutPay();
  // const setPaystackReference = useCheckoutStore((s) => s.setPaystackReference);
  const resetCheckout = useCheckoutStore((s) => s.reset);

  const [agreed, setAgreed] = useState(false);

  const form = useForm<CheckoutDeliveryFormValues>({
    resolver: zodResolver(checkoutDeliverySchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      delivery_address: {
        full_address: "",
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

  // const handleNext = async () => {
  //   const valid = await form.trigger([...STEP_1_FIELDS]);
  //   if (!valid) return;

  //   const values = form.getValues();

  //   setDeliveryAddress({
  //     full_address: values.delivery_address.full_address,
  //     street: values.delivery_address.street,
  //     city: values.delivery_address.city,
  //     state: values.delivery_address.state,
  //     postal_code: values.delivery_address.postal_code || undefined,
  //   });
  //   setContactPhone(values.contact_phone);

  //   // TODO: Persist delivery/contact info for next time when backend support is ready.
  //   onNext();
  // };

  const onSubmit = async (data: CheckoutDeliveryFormValues) => {
    const payload: CheckoutPayPayload = {
      delivery_address: data.delivery_address,
      contact_phone: data.contact_phone,
    };

    console.log("PAYLOAD", payload);

    pay.mutate(payload, {
      onSuccess: (res) => {
        // setPaystackReference(res.data.reference);
        window.location.href = res.data.authorization_url;
      },
      onError: (err) => {
        if (err.statusCode === 404) {
          toast.error("Session not found. Restarting checkout.");
          resetCheckout();
          window.location.href = "/";
          return;
        }
        if (err.statusCode === 410) {
          toast.error("Your session has expired. Please restart checkout.");
          resetCheckout();
          window.location.href = "/";
          return;
        }
        if (err.statusCode === 500) {
          toast.error("Paystack initialization failed. Please try again.");
          return;
        }
        toast.error(err.message || "Unable to initialize payment");
      },
    });
  };

  // const slideVariants = {
  //   enter: { opacity: 0, x: direction > 0 ? 60 : -60 },
  //   center: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       duration: 0.3,
  //       ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  //     },
  //   },
  //   exit: {
  //     opacity: 0,
  //     x: direction > 0 ? -60 : 60,
  //     transition: {
  //       duration: 0.22,
  //       ease: [0.36, 0, 0.66, 0] as [number, number, number, number],
  //     },
  //   },
  // };

  return (
    // <motion.div
    //   variants={slideVariants}
    //   initial="enter"
    //   animate="center"
    //   exit="exit"
    // >

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
              name="delivery_address.full_address"
              label="Address"
              placeholder="House number / building"
              required
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
            disabled={pay.isPending}
          >
            Pay Now
          </Button>
        </form>
      </div>
    </div>
  );
}
