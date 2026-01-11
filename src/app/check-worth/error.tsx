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
    console.error("Check worth error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-lg space-y-6">
        <EmptyState
          icon={<IconAlertTriangle className="size-12" />}
          title="Unable to load device"
          description="We couldn't load the device information. The device might not exist or there was an error loading the data."
        />
        <div className="flex justify-center gap-4">
          <Button onClick={reset} variant="default">
            Try Again
          </Button>
          <Link href="/check-worth">
            <Button variant="outline">Check Another Device</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
