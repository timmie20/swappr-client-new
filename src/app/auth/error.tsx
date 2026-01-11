"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageError } from "@/components/page-error";

export default function Error() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <PageError
        title="Authentication Error"
        description="We encountered an issue with the authentication process. Please try again or contact support if the problem persists."
      >
        <Button onClick={() => window.location.reload()} variant="default">
          Try Again
        </Button>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </PageError>
    </div>
  );
}
