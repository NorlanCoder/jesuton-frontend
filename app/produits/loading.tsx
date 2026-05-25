export default function Loading() {
  return (
    <div className="container-page pt-32 pb-24 md:pt-40">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[28px] border border-char/10 bg-bone-50"
          >
            <div className="aspect-[5/4] animate-pulse bg-char/10" />
            <div className="space-y-3 p-6">
              <div className="h-3 w-1/4 animate-pulse rounded-full bg-char/10" />
              <div className="h-6 w-3/4 animate-pulse rounded-full bg-char/15" />
              <div className="h-3 w-full animate-pulse rounded-full bg-char/10" />
              <div className="h-3 w-5/6 animate-pulse rounded-full bg-char/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
