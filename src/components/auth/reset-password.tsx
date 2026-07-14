"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForgotPassword, useResetPassword } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput } from "@/components/forms/form-input";
import { FieldGroup } from "@/components/ui/field";
import { IconCircleCheck, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { TypographyH1 } from "../typography/h1";

// Schema for email submission (forgot password)
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Schema for password reset
const resetPasswordSchema = z
  .object({
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

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const forgotPassword = useForgotPassword();
  const resetPassword = useResetPassword();
  const [emailSent, setEmailSent] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Form for email submission
  const forgotForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form for password reset
  const resetForm = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onForgotPasswordSubmit(values: ForgotPasswordValues) {
    forgotPassword.mutate(values.email, {
      onSuccess: () => {
        setEmailSent(true);
      },
    });
  }

  function onResetPasswordSubmit(values: ResetPasswordValues) {
    if (!token) return;

    resetPassword.mutate(
      { token, newPassword: values.password },
      {
        onSuccess: () => {
          setResetSuccess(true);
        },
      },
    );
  }

  // Show success screen after password reset
  if (resetSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <IconCircleCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle>Password Reset Successfully!</CardTitle>
            <CardDescription>
              Your password has been updated. You can now sign in with your new
              password.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/sign-in" className="w-full">
              <Button className="w-full">Continue to Sign In</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Show email sent confirmation
  if (emailSent && !token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <IconMail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle>Check Your Email</CardTitle>
            <CardDescription>
              We&apos;ve sent a password reset link to your email address.
              Please check your inbox and click the link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-col gap-2">
            <Link href="/sign-in" className="w-full">
              <Button variant="outline" className="w-full">
                Back to Sign In
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setEmailSent(false)}
            >
              Resend Link
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Show password reset form when token is present
  if (token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
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

          <TypographyH1 className="text-center">
            Reset Your Password
          </TypographyH1>

          <Card>
            <CardHeader>
              <CardDescription>
                Enter your new password below. Make sure it&apos;s strong and
                secure.
              </CardDescription>
            </CardHeader>
            <form
              onSubmit={resetForm.handleSubmit(onResetPasswordSubmit)}
              className="space-y-6 px-6 pb-6"
            >
              <FieldGroup>
                <FormInput
                  control={resetForm.control}
                  name="password"
                  type="password"
                  label="New Password"
                  placeholder="••••••••"
                  showPasswordToggle
                  required
                />

                <FormInput
                  control={resetForm.control}
                  name="confirmPassword"
                  type="password"
                  label="Confirm New Password"
                  placeholder="••••••••"
                  showPasswordToggle
                  required
                />
              </FieldGroup>

              <Button
                type="submit"
                className="h-12 w-full"
                disabled={resetPassword.isPending}
                size="lg"
              >
                {resetPassword.isPending ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </Card>

          <p className="text-muted-foreground text-center text-sm">
            Remember your password?{" "}
            <Link
              href="/sign-in"
              className="hover:text-primary font-medium underline underline-offset-4"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Show email input form (forgot password)
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
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

        <TypographyH1 className="text-center">Forgot Password?</TypographyH1>

        <Card>
          <CardHeader>
            <CardDescription>
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </CardDescription>
          </CardHeader>
          <form
            onSubmit={forgotForm.handleSubmit(onForgotPasswordSubmit)}
            className="space-y-6 px-6 pb-6"
          >
            <FieldGroup>
              <FormInput
                control={forgotForm.control}
                name="email"
                type="email"
                label="Email"
                placeholder="john.doe@example.com"
                required
              />
            </FieldGroup>

            <Button
              type="submit"
              className="h-12 w-full"
              disabled={forgotPassword.isPending}
              size="lg"
            >
              {forgotPassword.isPending ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Card>

        <p className="text-muted-foreground text-center text-sm">
          Remember your password?{" "}
          <Link
            href="/sign-in"
            className="hover:text-primary font-medium underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
