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
import { useLogin } from "@/hooks/use-auth";
import Image from "next/image";
import { TypographyH1 } from "../h1";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const login = useLogin();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? undefined;

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignInFormValues) {
    login.mutate(values);
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

      <TypographyH1 className="font-switzer">
        Let&apos;s get you Signed in
      </TypographyH1>

      <GoogleSignUpButton redirect={redirect} />

      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-sm">OR</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
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

          <div className="flex justify-end">
            <Link
              href="/auth/reset-password"
              className="text-primary hover:text-primary/80 text-sm font-medium hover:cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>
        </FieldGroup>

        <Field orientation="horizontal">
          <Button
            type="submit"
            className="h-12 w-full"
            disabled={login.isPending}
            size="lg"
          >
            {login.isPending ? "Signing in..." : "Sign in"}
          </Button>
        </Field>
      </form>
    </div>
  );
}
