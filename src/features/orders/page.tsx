"use client";

import { useMemo } from "react";
import { ArrowDown } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { OrdersListSkeleton } from "@/components/skeletons/orders-list-skeleton";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH2 } from "@/components/typography/h2";
import { TypographyMuted } from "@/components/typography/muted";
import { useInfiniteOrders } from "@/hooks/use-orders";
import { OrderCard } from "./components/order-card";

export default function OrdersPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteOrders({ limit: 10 });

  const orders = useMemo(() => {
    const pages = data?.pages ?? [];
    const merged = pages.flatMap((page) => page.orders);
    const seen = new Set<string>();
    return merged.filter((order) => {
      if (seen.has(order.id)) return false;
      seen.add(order.id);
      return true;
    });
  }, [data]);

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl space-y-6 pb-10">
      <div className="space-y-2">
        <TypographyH2 className="border-b-0 pb-0">Your Orders</TypographyH2>
        <TypographyMuted>
          Track your orders, payment status, and delivery progress.
        </TypographyMuted>
      </div>

      {isLoading ? (
        <OrdersListSkeleton />
      ) : isError ? (
        <div className="space-y-4">
          <ErrorState
            title="Unable to load orders"
            description={error?.message || "Please try again in a moment."}
          />
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="Your recent orders will show up here once you place one."
          variant="lottie"
          lottieType="ghost"
        />
      ) : (
        <div className="border-border border-t">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {orders.length > 0 && hasNextPage && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => void fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <span className="inline-flex items-center gap-2">
                <Spinner />
                Loading...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                Load more
                <ArrowDown className="size-4" />
              </span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
