export function RectangleSkeleton({ classes }) {
  return (
    <span
      className={`inline-block animate-pulse bg-[#d3dce3] text-transparent ${classes}`}
    >
      Loading...
    </span>
  );
}

export function CardsSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-md">
      <div className="h-28 w-full rounded bg-gray-300"></div>
      <div className="h-28 w-full rounded bg-gray-300"></div>
      <div className="h-28 w-full rounded bg-gray-300"></div>
      <div className="h-28 w-full rounded bg-gray-300"></div>
    </div>
  );
}
