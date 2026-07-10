"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyEmail } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconCircleCheck,
  IconAlertCircle,
  IconLoader2,
} from "@tabler/icons-react";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const verifyEmail = useVerifyEmail();

  useEffect(() => {
    if (token && !verifyEmail.isSuccess && !verifyEmail.isError) {
      verifyEmail.mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconAlertCircle className="text-destructive h-5 w-5" />
              <CardTitle>Invalid Link</CardTitle>
            </div>
            <CardDescription>
              No verification token found. Please check your email for the
              correct link.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/sign-in">
              <Button className="w-full">Go to Sign In</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (verifyEmail.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconLoader2 className="text-primary h-5 w-5 animate-spin" />
              <CardTitle>Verifying Email</CardTitle>
            </div>
            <CardDescription>
              Please wait while we verify your email address...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (verifyEmail.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconAlertCircle className="text-destructive h-5 w-5" />
              <CardTitle>Verification Failed</CardTitle>
            </div>
            <CardDescription>
              {(
                verifyEmail.error as Error & {
                  response?: { data?: { message?: string } };
                }
              )?.response?.data?.message ||
                "We couldn't verify your email. The link may have expired or is invalid."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-col gap-2">
            <Button
              onClick={() => router.push("/sign-up")}
              className="w-full"
            >
              Sign Up Again
            </Button>
            <Button
              onClick={() => router.push("/sign-in")}
              variant="outline"
              className="w-full"
            >
              Go to Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (verifyEmail.isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <div className="flex items-center justify-center">
            <DotLottieReact
              src="/assets/icons/success-check.json"
              loop
              autoplay
              className="size-24"
            />
          </div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconCircleCheck className="h-5 w-5 text-green-500" />
              <CardTitle>Email Verified!</CardTitle>
            </div>
            <CardDescription>
              Your email has been successfully verified. You can now sign in to
              your account.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/sign-in">
              <Button className="w-full">Continue to Sign In</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return null;
}
