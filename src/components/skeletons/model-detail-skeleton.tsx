import { Skeleton } from "@/components/ui/skeleton";

export function ModelDetailSkeleton() {
  return (
    <div className="mx-auto max-w-170 pb-5">
      {/* Back button skeleton */}
      <div className="mb-4">
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>

      {/* Warning banner skeleton */}
      <div className="mb-4">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* WorthOverviewCard skeleton */}
      <div className="mb-4 rounded-lg border p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Image skeleton */}
          <Skeleton className="h-40 w-full rounded-lg sm:w-40" />

          {/* Content skeleton */}
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      </div>

      {/* Description and storage section skeleton */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />

        {/* Storage buttons skeleton */}
        <div className="mb-4 flex flex-wrap gap-3 px-1 py-2 sm:px-0">
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>

      {/* CTA button skeleton */}
      <Skeleton className="h-12 w-full rounded-md sm:w-48" />
    </div>
  );
}
