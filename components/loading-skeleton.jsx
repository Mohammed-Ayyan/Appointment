export default function LoadingSkeleton({ type = "card" }) {
  if (type === "card") {
    return (
      <div className="rounded-xl border border-border/60 bg-card p-5 animate-fade-in">
        <div className="flex gap-4 mb-4">
          <div className="h-14 w-14 rounded-xl animate-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded-md animate-shimmer" />
            <div className="h-3 w-1/2 rounded-md animate-shimmer" />
            <div className="h-3 w-1/3 rounded-md animate-shimmer" />
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-24 rounded-full animate-shimmer" />
          <div className="h-6 w-20 rounded-full animate-shimmer" />
        </div>
        <div className="h-10 w-full rounded-md animate-shimmer" />
      </div>
    );
  }

  if (type === "profile") {
    return (
      <div className="rounded-xl border border-border/60 bg-card p-6 animate-fade-in">
        <div className="flex gap-6 mb-6">
          <div className="h-24 w-24 rounded-2xl animate-shimmer" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-1/2 rounded-md animate-shimmer" />
            <div className="h-4 w-1/3 rounded-md animate-shimmer" />
            <div className="flex gap-4">
              <div className="h-4 w-20 rounded-md animate-shimmer" />
              <div className="h-4 w-24 rounded-md animate-shimmer" />
              <div className="h-4 w-16 rounded-md animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "table-row") {
    return (
      <div className="flex items-center gap-4 py-4 px-4 animate-fade-in">
        <div className="h-8 w-8 rounded-full animate-shimmer" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 rounded-md animate-shimmer" />
          <div className="h-3 w-20 rounded-md animate-shimmer" />
        </div>
        <div className="h-4 w-20 rounded-md animate-shimmer" />
        <div className="h-6 w-16 rounded-full animate-shimmer" />
        <div className="h-4 w-16 rounded-md animate-shimmer" />
      </div>
    );
  }

  if (type === "metric") {
    return (
      <div className="rounded-xl border border-border/60 bg-card p-6 animate-fade-in">
        <div className="flex justify-between items-start">
          <div className="space-y-3 flex-1">
            <div className="h-3 w-24 rounded-md animate-shimmer" />
            <div className="h-8 w-20 rounded-md animate-shimmer" />
            <div className="h-3 w-32 rounded-md animate-shimmer" />
          </div>
          <div className="h-10 w-10 rounded-lg animate-shimmer" />
        </div>
      </div>
    );
  }

  return null;
}
