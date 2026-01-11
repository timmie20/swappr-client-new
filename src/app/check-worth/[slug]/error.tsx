"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageError } from "@/components/page-error";

export default function Error() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <PageError
        title="Unable to Load Device Details"
        description="We couldn't load the device details. The device may not exist or there was an error retrieving the information."
      >
        <Button onClick={() => window.location.reload()} variant="default">
          Try Again
        </Button>
        <Link href="/check-worth">
          <Button variant="outline">Browse Devices</Button>
        </Link>
      </PageError>
    </div>
  );
}
