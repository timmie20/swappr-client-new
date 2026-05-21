import { Skeleton } from "@/components/ui/skeleton";

export function OrdersListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="border-border border-t">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border-border border-b px-4 py-5 last:border-b-0"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
            <Skeleton className="h-8 w-28 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
