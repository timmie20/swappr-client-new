"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageError } from "@/components/page-error";

export default function Error() {
  return (
    <div className="flex h-dvh min-h-[60vh] items-center justify-center px-4">
      <PageError
        title="Unable to load device"
        description="We couldn't load the device information. The device might not exist or there was an error loading the data."
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
