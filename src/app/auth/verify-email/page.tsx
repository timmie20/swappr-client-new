import { Suspense } from "react";
import VerifyEmail from "@/components/auth/verify-email";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
