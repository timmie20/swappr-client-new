"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field } from "@/components/ui/field";
import { GoogleSignUpButton } from "./google-oauth";
import { Separator } from "@/components/ui/separator";
import { useCreateAccount } from "@/hooks/use-auth";
import { CreateAccount } from "@/types";
import Image from "next/image";
import { TypographyH1 } from "../h1";
import { useSearchParams } from "next/navigation";

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

interface SignUpFormProps {
  setMailSent: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUpForm({ setMailSent }: SignUpFormProps) {
  const createAccount = useCreateAccount();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? undefined;

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
    const payload: CreateAccount = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
    };

    createAccount.mutate(payload, {
      onSuccess: () => {
        form.reset();
        setMailSent(true);
      },
    });
  }

  return (
    <div className="w-full space-y-6 px-4 md:px-0">
      <div className="flex items-center justify-center">
        <Image
          src="/assets/images/swappr-logo-filled.png"
          alt="Swappr"
          width={120}
          height={40}
          priority
          className="h-10 w-auto"
        />
      </div>
      <TypographyH1>Create a swappr account</TypographyH1>

      <GoogleSignUpButton redirect={redirect} />

      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-sm">OR</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <div className="flex gap-4">
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
          </div>

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
            className="h-12 w-full"
            disabled={createAccount.isPending}
            size="lg"
          >
            {createAccount.isPending ? "Please wait..." : "Sign Up"}
          </Button>
        </Field>
      </form>
    </div>
  );
}
