"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ValuationItem } from "./components/valuation-item";
import { EmptyState } from "@/components/empty-state";
import { IconDeviceMobile } from "@tabler/icons-react";
import { useValuations } from "@/hooks/use-valuation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ValuationListSkeleton } from "@/components/skeletons/valuation-list-skeleton";

export default function Drafts() {
  const { data: valuations, isLoading, error } = useValuations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Valuation History</CardTitle>
        <CardDescription>
          View and manage your device valuation checks
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ValuationListSkeleton />
        ) : error ? (
          <>
            <EmptyState
              icon={<IconDeviceMobile className="size-6" />}
              title="Unable to load valuations"
              description="There was an error loading your valuation history. Please try again."
              variant="icon"
            />
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Retry
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {!valuations || valuations.length === 0 ? (
              <div className="space-y-4">
                <EmptyState
                  icon={<IconDeviceMobile className="size-6" />}
                  title="No valuations yet"
                  description="Start by checking the worth of your device"
                  variant="icon"
                />
                <div className="flex justify-center">
                  <Link href="/check-worth">
                    <Button>Check Device Worth</Button>
                  </Link>
                </div>
              </div>
            ) : (
              valuations.map((valuation) => (
                <ValuationItem key={valuation.id} valuation={valuation} />
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
