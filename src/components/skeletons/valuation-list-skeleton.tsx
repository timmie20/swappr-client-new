import { Skeleton } from "@/components/ui/skeleton";

export function ValuationListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="border-border border-b py-2 last:border-b-0"
        >
          <div className="flex items-start justify-between gap-4">
            {/* Device Info */}
            <div className="flex flex-1 items-start gap-4">
              <Skeleton className="size-12 rounded-md" />

              <div className="flex-1 space-y-2">
                <div>
                  <Skeleton className="h-5 w-48" />
                  <div className="mt-2 flex items-center gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="hidden h-4 w-4 rounded-full sm:block" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Skeleton className="size-10 rounded-md" />
              <Skeleton className="size-10 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
