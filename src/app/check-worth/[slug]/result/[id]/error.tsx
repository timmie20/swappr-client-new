"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageError } from "@/components/page-error";

export default function Error() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <PageError
        title="Unable to Load Valuation Result"
        description="We couldn't load your valuation result. The result may have expired or there was an error retrieving it."
      >
        <Button onClick={() => window.location.reload()} variant="default">
          Try Again
        </Button>
        <Link href="/check-worth">
          <Button variant="outline">Check Another Device</Button>
        </Link>
      </PageError>
    </div>
  );
}
