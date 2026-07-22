import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-6 py-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="space-y-3">
          <Skeleton className="bg-muted/70 aspect-square w-full rounded-2xl" />

          <div className="flex gap-2 overflow-hidden pb-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="bg-muted/70 size-16 shrink-0 rounded-lg sm:size-20"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="bg-muted/70 h-6 w-20 rounded-full" />
          <Skeleton className="bg-muted/70 h-6 w-16 rounded-full" />
          <Skeleton className="bg-muted/70 h-6 w-24 rounded-full" />
        </div>

        <div className="space-y-3">
          <Skeleton className="bg-muted/70 h-8 w-4/5" />
          <Skeleton className="bg-muted/70 h-8 w-2/3" />
        </div>

        <div className="flex items-baseline gap-3">
          <Skeleton className="bg-muted/70 h-10 w-36" />
        </div>

        <Skeleton className="bg-muted/70 h-5 w-28" />

        <Skeleton className="bg-muted/70 h-px w-full" />

        <div className="space-y-4">
          <div className="space-y-3">
            <Skeleton className="bg-muted/70 h-10 w-full rounded-2xl" />
            <Skeleton className="bg-muted/70 h-10 w-full rounded-2xl" />
          </div>

          <Skeleton className="bg-muted/70 h-12 w-full rounded-2xl" />
        </div>

        <div className="space-y-4">
          <div className="border-border rounded-2xl border p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="bg-muted/70 size-10 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="bg-muted/70 h-4 w-40" />
                <Skeleton className="bg-muted/70 h-3 w-24" />
              </div>
              <Skeleton className="bg-muted/70 h-9 w-24 rounded-full" />
            </div>
          </div>

          <div className="border-border rounded-2xl border p-4">
            <Skeleton className="bg-muted/70 mb-4 h-4 w-28" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <Skeleton className="bg-muted/70 h-4 w-32" />
                  <Skeleton className="bg-muted/70 h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
