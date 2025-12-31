"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field } from "@/components/ui/field";
import { GoogleSignUpButton } from "./google-oauth";
import { Separator } from "@/components/ui/separator";

const signUpSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
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

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: SignUpFormValues) {
    console.log("Form submitted successfully:", values);
    // This only logs if validation passes
  }

  return (
    <div className="w-full space-y-6">
      <GoogleSignUpButton />

      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-sm">OR</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <FormInput
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="John"
            required
          />

          <FormInput
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            required
          />

          <FormInput
            control={form.control}
            name="email"
            type="email"
            label="Email"
            placeholder="john.doe@example.com"
            required
          />

          <FormInput
            control={form.control}
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            showPasswordToggle
            required
          />

          <FormInput
            control={form.control}
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            showPasswordToggle
            required
          />
        </FieldGroup>

        <Field orientation="horizontal">
          <Button
            type="submit"
            className="w-full"
            // disabled={form.formState.isSubmitting}
            size="lg"
          >
            Creating account
          </Button>
        </Field>
      </form>
    </div>
  );
}
