"use client";

import { useEffect } from "react";
import { EmptyState } from "@/components/empty-state";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Account error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-lg space-y-6">
        <EmptyState
          icon={<IconAlertTriangle className="size-12" />}
          title="Unable to load account"
          description="We couldn't load your account information. Please try again or contact support if the problem continues."
          variant="icon"
        />
        <div className="flex justify-center gap-4">
          <Button onClick={reset} variant="default">
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
