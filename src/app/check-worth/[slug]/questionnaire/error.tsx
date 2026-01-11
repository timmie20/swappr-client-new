"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageError } from "@/components/page-error";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <PageError
        title="Unable to Load Questionnaire"
        description="We couldn't load the valuation questionnaire. The questions may be unavailable or there was an error loading them."
      >
        <Button onClick={() => window.location.reload()} variant="default">
          Try Again
        </Button>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
      </PageError>
    </div>
  );
}
