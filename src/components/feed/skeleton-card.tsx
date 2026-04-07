export function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      {/* Image area */}
      <div className="aspect-square bg-[#F3F4F6]" />

      {/* Body */}
      <div className="flex flex-col gap-3 p-3">
        {/* Brand row */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-14 rounded-full bg-[#F3F4F6]" />
          <div className="h-4 w-16 rounded-full bg-[#F3F4F6]" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <div className="h-3.5 w-full rounded-full bg-[#F3F4F6]" />
          <div className="h-3.5 w-3/4 rounded-full bg-[#F3F4F6]" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-sm bg-[#F3F4F6]" />
          ))}
          <div className="ml-1 h-3 w-16 rounded-full bg-[#F3F4F6]" />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 rounded-full bg-[#F3F4F6]" />
          <div className="h-3 w-16 rounded-full bg-[#F3F4F6]" />
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 w-4 rounded-full bg-[#F3F4F6]" />
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-2 pt-1">
          <div className="h-9 flex-1 rounded-xl bg-[#F3F4F6]" />
          <div className="h-9 w-12 rounded-xl bg-[#F3F4F6]" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
